<template>
  <!-- Signup as employee -->
  <div class="container-sm p-responsive">
    <div class="text-center mb-4">
      <img class="anim-pulse" src="~/@/assets/logov10.png" style="max-width: 480px;" />
    </div>
    <h4 class="text-center eyebrow mb-4" v-text="'Sign Up'" />
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
      <dl class="form-group">
        <input
          class="form-control input-lg input-block"
          type="text"
          placeholder="Name"
          v-model="form.name"
        />
      </dl>
      <dl class="form-group">
        <input
          class="form-control input-lg input-block"
          type="text"
          placeholder="CompanyID"
          v-model="form.company"
        />
      </dl>
      <dl class="form-group text-center">Company ID given by your Company</dl>
      <dl class="flash flash-error" v-if="error" v-text="error" />
      <div class="form-actions">
        <button
          type="submit"
          class="btn-mktg btn-block"
          :disabled="isLoading"
          v-text="'Sign Up'"
        />
      </div>
      <dl class="form-group text-center"><router-link to="/signup2">Register My Company </router-link>Or <router-link to="/login"> Log in</router-link></dl>
    </form>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { signup } from '@/../common/schemas';
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
        const values = await signup.validateAsync(this.form);
        // CompanyID check for employee reg.
        const companyExist = await client.request('check_company', values);
       if (Object.keys(companyExist).length === 0) {
        this.error = 'This Company does not exist'
        this.isLoading = false
       } else {
        this.error = '';
        this.submit(values);
       }
        
      } catch (error) {
        this.error = error.details[0].message;
        this.isLoading = false;
      }
    },
    async submit(values) {
      try {
        const result = await client.request('signup', values);
        localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, result.access_token);
        this.$store.dispatch('init').then(() => this.$router.push('/report'));
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};

</script>
