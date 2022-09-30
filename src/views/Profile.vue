<template>
  <div class="pb-8">
    
    <Cover :key="$route.params.username" :username="$route.params.username" />
    <div class="Box-header d-flex border-bottom v-align-middle px-4 py-3 ">Here is your company ID : {{account.company_id}} </div>
    <Stories :key="`_${$route.params.username}`" :username="$route.params.username" />
    
  </div>
</template>

<script>
  import client from '@/helpers/client';
  export default {
    data() {
      return {
        users:[],
        account: this.$store.state.settings.account
      };
    },
   async mounted(){
      this.users = await client.request('get_users',this.account.company_id) 
      
      console.log(this.users) 
    },
    
    
  };
  </script>
