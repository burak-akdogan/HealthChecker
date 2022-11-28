<template>
  <div>
    <Top :title="'Settings'" />
    <a class="Box-header d-flex border-bottom text-blue" href="mailto:report@healthchecker.com">Report Bug</a>
    <a class="Box-header d-flex border-bottom text-green" href="https://www.termsandconditionsgenerator.com/live.php?token=xfNi7ePyx3WA2sY06cifTWkXkeC2nNMp" target="_blank">Terms and Conditions</a>
    <a @click="logout" class="Box-header d-flex border-bottom v-align-middle px-4 py-3 text-red" v-text="'Logout'"/>
    
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      isVerified: !!this.$store.state.settings.account.meta.is_verified
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>
