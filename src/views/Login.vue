<template>
  <div class="container-sm p-responsive">
    <div class="text-center mb-4">
      <img src="~/@/assets/logov10.png" style="max-width: 480px;" />
    </div>
    <h4 class="text-center eyebrow mb-4" v-text="'Login'" />
    <form @submit.prevent="handleSubmit" style="max-width: 360px;" class="mx-auto">
      <dl class="form-group">
        <input
          class="form-control input-lg input-block"
          type="email"
          placeholder="Email"
          v-model="form.email"
        />
      </dl>
      <dl class="form-group">
        <input
          class="form-control input-lg input-block"
          type="password"
          placeholder="Password"
          v-model="form.password"
        />
      </dl>
      <dl class="flash flash-error" v-if="error" v-text="error" />
      <div class="form-actions">
        <button
          type="submit"
          class="btn-mktg btn-block"
          :disabled="isLoading"
          v-text="'Login'"
        />
      </div>
      <dl class="form-group text-center">Or, <router-link to="/signup">Sign up</router-link></dl>
    </form>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { login } from '@/../common/schemas';
import { TOKEN_LOCALSTORAGE_KEY } from '@/helpers/utils';

export default {
  data() {
    return {
      error: '',
      form: {},
      isLoading: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true;
        const values = await login.validateAsync(this.form);
        this.error = '';
        this.submit(values);
      } catch (error) {
        this.error = error.details[0].message;
        this.isLoading = false;
      }
    },
    async submit(values) {
      try {
        const result = await client.request('login', values);
        console.log(result)
        localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, result.access_token);
        this.$store.dispatch('init').then(() => {
          console.log(this.$store.state.settings.account)
          const redirect = this.$route.query.redirect;
          if(this.$store.state.settings.account.role==='hr')
          this.$router.push(redirect || '/'+this.$store.state.settings.account.username);
          else
          this.$router.push(redirect || '/report');
        });
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>
