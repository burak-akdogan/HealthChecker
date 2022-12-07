<template>
 <!-- View All users here-->
  <div class="wrapper">
  <div class="Box-header mx-auto text-center">Users </div>
<!-- pagination -->
  <v-table
        :data="users"
        :currentPage.sync="currentPage"
        :pageSize="5"
        @totalPagesChanged="totalPages = $event"
        :filters="filters"
      >
        <thead slot="head">
          <th style="width:30%;border: 1px solid black;background-color: #2980b9 ;color:black"> Username</th>
          <th style="width:100%;border: 1px solid black;background-color: #2980b9;color:black"> Contact</th>
          <th style="width:100%;border: 1px solid black;background-color: #2980b9;color:black"> Action</th>
          
        </thead>
        <tbody slot="body" slot-scope="{displayData}">
        <tr v-for="row in displayData" :key="row.guid">
          <td style="border: 1px solid;background-color:azure; max-width: 800px; table-layout: fixed;">{{row.meta.name}}</td>
           <td class="text-left " style="height: 40px;border: 1px solid;background-color:azure;width: 70%; max-width: 700px; table-layout: fixed;" >{{row.email}}</td> 
          <td><router-link  class="btn btn-primary" style="color: black;" :to="'/report/'+row.id">View Reports</router-link></td>
        </tr>
        </tbody>
      </v-table>
      <smart-pagination
        :currentPage.sync="currentPage"
        :totalPages="totalPages"/>
      <div class="d-flex border-bottom py-13 "></div>
 
  <!-- https://vue-chartjs.org/ ref  Chart -->
  <div class="d-flex border-bottom py-1"></div>
  <div class="Box-header mx-auto text-center">Total </div>
  <Chart :chartData="data"/>
 
 

     </div>  
     
</template>

<script>

import client from '@/helpers/client';
export default {
  data() {
    return {
      users:[],
      reports:{},
      
      data:{
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          }
        ]
      },
      account: this.$store.state.settings.account,
      currentPage: 1,
      totalPages: 0,
      filters: {
      name: { value: '', keys: ['color'] }
    }
      
    };
  },
 async mounted(){

    const tempusers = await client.request('get_users',this.account.company_id) 
    tempusers.forEach(element => {
      try {
        element.meta=JSON.parse(element.meta)
      } catch (error) {
        console.log(error)
      }
this.users.push(element)
    });
    this.reports =await client.request('get_all_reports',this.account.company_id) 
    this.reports.forEach(element => {
      this.data.labels.push(element.color)
      this.data.datasets[0].data.push(element.count)
      this.data.datasets[0].backgroundColor.push(element.color)
    });
    console.log(this.users) 
    console.log(this.reports) 
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

