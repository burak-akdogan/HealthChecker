<template>
  <div>
    <Top :title="'settings'" />
    <div>
      <a
        @click="logout"
        class="d-flex border-bottom v-align-middle px-4 py-3 text-red"
        v-text="'logout'"
      />
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
