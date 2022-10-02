<template>
  <div >
    <Top :title="'Users'" />
    
  <div class="d-flex border-bottom py-4"></div>
  <div class="Box-header mx-auto text-center">Users</div>
  <div v-for="user in users" :key="user.id" >
  <div> {{user.username}} {{user.email}}  <router-link :to="'/report/'+user.id">View Reports</router-link> </div>

  
  </div>
  <div class="d-flex border-bottom py-12"></div>
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
