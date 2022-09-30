<template>
  <div >
    <Top :title="'Reports'"/>
 
  <div class="Box-header mx-auto text-center">Reports</div>
  
  <!-- {{reports}} {{user.email}} {{user.id}} -->
  {{reports}} 
  <div class="d-flex border-bottom py-12"></div>
     </div>
        
</template>

<script>
import client from '@/helpers/client';
export default {
  data() {
    return {
      user: this.$route.params.userid,
      account: this.$store.state.settings.account,
      reports: [],
    
      
      
      
    };
  },
 async mounted(){
    this.reports = await client.request('get_user_reports',this.user)
    
   
  },
  
  
};
</script>
