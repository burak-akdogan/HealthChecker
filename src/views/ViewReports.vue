<template>
 
  <div class="wrapper">
  <div class="Box-header mx-auto text-center">Users</div>

  <label>Filter by Color:</label>
  <input class="form-control" v-model="filters"/>
  <div v-for="user in users" :key="user.id">

  <div style="border: 1px solid black;background-color:#2980b9;color:white"> {{user.username}} {{user.email}}
  <router-link  class="btn " style="color:black;" :to="'/report/'+user.id">View Reports</router-link></div> 
    <div> 
    
</div>  
  </div>
  
  <div class="d-flex border-bottom py-12"></div>
  
  <div class="Box-header mx-auto text-center">Total </div>
 
  <!-- <div>
  <table>
<br>
    <div class="flash flash-full flash-success"> GO  GOGOGOG</div> 
    <br>
    <div class="flash flash-full flash-warn"> warning  warningwarningwarning</div>
    <br>
    <div class="flash flash-full flash-error"> ALERT ALERTALERTALERT</div>
  
  </table>
</div> -->

     </div>  
     
</template>

<script>

import client from '@/helpers/client';
export default {
  data() {
    return {
      users:[],
      account: this.$store.state.settings.account,
      filters: {
      name: { value: '', keys: ['user.username'] }
    }
      
    };
  },
 async mounted(){
    this.users = await client.request('get_users',this.account.company_id) 
    
    console.log(this.users) 
  },
  
  
};


</script>
<style >
  .smart-pagination{
    display: block;
    font-size: 1rem;
  }
  .pagination{
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    margin-top: 0;
    margin-bottom: 1rem;
    line-height: 1.7;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    font-size: 1rem;
    margin-left: 200px;

    
  }
  .page-item{
    display: list-item;
    text-align: -webkit-match-parent;
    font-size: 1rem;
    
  }
  .page-link {
    position: relative;
    float: left;
    padding: 7px 12px;
    margin-left: -1px;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    color: #0366d6;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #fff;
    border: 1px solid #e1e4e8;
    
  }

  .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    font-size: 1rem;
    
    
  }
  .pagination a, .pagination span, .pagination em {
    position: relative;
    float: left;
    padding: 7px 12px;
    margin-left: -1px;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    color: #0366d6;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #fff;
    border: 1px solid #e1e4e8;
    
    }
  .wrapper{
  margin: 0 auto;
  padding : 20px;
  max-width: 1000px;

  }
 

</style>

