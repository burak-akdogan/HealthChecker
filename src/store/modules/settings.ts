import Vue from 'vue';
import client from '@/helpers/client';
import { TOKEN_LOCALSTORAGE_KEY } from '@/helpers/utils';

const state = {
  isInit: false,
  isLoading: false,
  isAuthenticated: false,
  token: false,
  account: false,
  report: {},
  profiles: {}
};

const mutations = {
  isInit(_state) {
    Vue.set(_state, 'isInit', true);
  },
  isLoading(_state, payload) {
    Vue.set(_state, 'isLoading', payload);
  },
  login(_state, { account, token }) {
    Vue.set(_state, 'account', account);
    Vue.set(_state, 'isAuthenticated', true);
    Vue.set(_state, 'token', token);
  },
  logout(_state) {
    Vue.set(_state, 'account', false);
    Vue.set(_state, 'isAuthenticated', false);
    Vue.set(_state, 'token', false);
  },
  addReport(_state, payload) {   /*report*/
    Vue.set(_state, 'report', payload);
    
  },
  addProfile(_state, { username, user }) {
    Vue.set(_state.profiles, username, user);
  },
};

const actions = {
  init: async ({ commit, state, dispatch }) => {
    commit('isLoading', true);
    await dispatch('login');
    // await dispatch('getReport');
    commit('isLoading', false);
    commit('isInit');
  },
  login: ({ commit }) => {
    return new Promise<void>((resolve, reject) => {
      const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
      if (!token) return resolve();
      client
        .request('verify', token)
        .then(result => {
          // @ts-ignore
          const { account } = result;
          account.meta = JSON.parse(account.meta);
          commit('login', { account,  token });
          resolve();
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
          return resolve();
        });
    });
  },
  logout: ({ commit }) => {
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
    client.request('logout');
    commit('logout');
  },
  getReport: ({ commit }) => {
    return new Promise<void>((resolve, reject) => {
      client.request('get_report').then(report => {
        commit('addReport',report[0]);
        resolve();
      });
    });
  },
  getProfile: ({ commit }, username) => {
    return new Promise<void>((resolve, reject) => {
      client.request('get_profile', username).then(user => {
        commit('addProfile', { username, user });
        resolve();
      });
    });
  },
  
};

export default {
  state,
  mutations,
  actions
};
//vue store management