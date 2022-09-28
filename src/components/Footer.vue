<template>
  <div class="py-5 border-top " style="background: #303247 ;">
    <div class="container-lg p-responsive d-flex">
      <div class="flex-auto" style="color: white;">HealthChecker © 2022</div >
        <div class="flex-auto" style="color: white;">We Care About Humanity!</div>
        
      <div>
        <a href="https://www.facebook.com/WHO/"><i class="fab fa-facebook fa-xl pr-3"></i></a>
        <a href="https://twitter.com/WHO"><i class="fab fa-twitter fa-xl pr-3"></i></a>
        <a href="https://covid19responsefund.org/en/"><i class="fas fa-donate fa-xl pr-3"></i></a>
       
        
      </div>
        <a v-for="(link, i) in links" :key="i" :href="link" class="text-black" target="_blank">
          <Icon :name="i" class="ml-4" />
          
        </a>
      </div>
    </div>
  
</template>

<script>
import pkg from '@/../package.json';

export default {
  data() {
    return {
      pkg,
      
    };
  }
};
</script>