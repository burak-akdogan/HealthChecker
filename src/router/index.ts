import Vue from 'vue';
import VueRouter from 'vue-router';
import { ifAuthenticated, ifNotAuthenticated } from '@/helpers/utils'; /*Login Page */

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Signup = () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue');
const Signup2 = () => import(/* webpackChunkName: "signup2" */ '@/views/Signup2.vue');
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue');
const Profile = () => import(/* webpackChunkName: "timeline" */ '@/views/Profile.vue');
const EditProfile = () => import(/* webpackChunkName: "edit-profile" */ '@/views/EditProfile.vue');
const Settings = () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue');
const Report = () => import(/* webpackChunkName: "report" */ '@/views/Report.vue');
const ViewReports = () => import(/* webpackChunkName: "view-reports" */ '@/views/ViewReports.vue');
const ViewReport = () => import(/* webpackChunkName: "view-report" */ '@/views/ViewReport.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { light: true },
    
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { light: true },
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup2',
    name: 'signup2',
    component: Signup2,
    meta: { light: true },
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { light: true },
    beforeEnter: ifNotAuthenticated
  },

  { path: '/profile', name: 'edit-profile', component: EditProfile, beforeEnter: ifAuthenticated },
  { path: '/report', name: 'report', component: Report, beforeEnter: ifAuthenticated },
  { path: '/report/:userid', name: 'viewreport', component: ViewReport, beforeEnter: ifAuthenticated },
  { path: '/viewreports', name: 'view-reports', component: ViewReports, beforeEnter: ifAuthenticated },
  { path: '/settings', name: 'settings', component: Settings, beforeEnter: ifAuthenticated },
  { path: '/:username', name: 'profile', component: Profile, beforeEnter: ifAuthenticated },
  { path: '/*', name: 'error-404', beforeEnter: (to, from, next) => next('/') }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
