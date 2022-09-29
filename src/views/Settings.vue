<template>
  <div>
    <Top :title="'Settings'" />
    <div>
      <a
        @click="logout"
        class="Box-header d-flex border-bottom v-align-middle px-4 py-3 text-red"
        v-text="'Logout'"/>
    </div>
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
