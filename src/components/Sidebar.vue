<template>
  <div id="sidebar" class="position-fixed py-lg-4">
    <router-link :to="`/`" class="hide-sm hide-md hide-lg" >
      <img  src="~/@/assets/onlylogo2.png" style="max-width: 220px;" class="mb-2 anim-pulse" />
    </router-link>
    <ul class="list-style-none border-top border-lg-top-0 text-center text-lg-left">
      <li class="col-3 col-lg-12">
        <router-link :to="`/`" class="p-3 d-block">
          <Icon name="home" />
          <span class="hide-sm hide-md hide-lg ml-3" v-text="'Home'" />
        </router-link>
      </li>
      <li v-if="account.role==='employee'" class="col-3 col-lg-12" >
        <router-link to="/report" class="p-3 d-block">
          <Icon name="pen" />
          <span class="hide-sm hide-md hide-lg ml-3">Report</span>
        </router-link>
      </li>
      <li v-if="account.role==='hr'" class="col-3 col-lg-12" >
        <router-link to="/viewreports" class="p-3 d-block">
          <Icon name="pen" />
          <span class="hide-sm hide-md hide-lg ml-3">View Reports</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12" >
        <router-link :to="`/${account.username}`" class="p-3 d-block">
          <Icon name="user" />
          <span class="hide-sm hide-md hide-lg ml-3" v-text="'Profile'" />
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="/settings" class="p-3 d-block">
          <Icon name="settings"/>
          <span class="hide-sm hide-md hide-lg ml-3" v-text="'Settings'" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import pkg from '@/../package.json';

export default {
  data() {
    return {
      model: pkg.name,
      account: this.$store.state.settings.account
    };
  }
};
</script>

<style lang="scss">
@import '../vars.scss';

#sidebar {
  font-family: $font-mktg;
  width: 260px;

  a {
    color: $color;

    &.router-link-exact-active {
      color: rgb(255, 0, 0);
    }
  }

  @media (max-width: 1012px - 1) {
    background-color: $bg-color;
    width: auto;
    left: 0;
    right: 0;
    bottom: 0;

    ul {
      display: flex;
    }
  }
}
</style>
