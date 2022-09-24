<template>
  <div class="py-5 border-top " style="background: #171717 ;">
    <div class="container-lg p-responsive d-flex">
      <div class="flex-auto" style="color: white;">HealthChecker © 2022</div >
      <div>
        <a v-for="(link, i) in links" :key="i" :href="link" class="text-black" target="_blank">
          <Icon :name="i" class="ml-4 " />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import pkg from '@/../package.json';

export default {
  data() {
    return {
      pkg,
      links: {
        instagram: 'https://www.instagram.com/healthcheck__',
        facebook: 'https://www.facebook.com/',
        amazon: 'https://www.amazon.com/gp/registry/wishlist/1ZLGDOANI46KD/ref=cm_wl_huc_view',
        
        
      }
    };
  }
};
</script>
