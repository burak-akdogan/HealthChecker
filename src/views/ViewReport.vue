<template>
  <div class="wrapper">
    <div class="Box-header mx-auto text-center">Reports</div>
    <br>
    <div class="text-center">
      <div class="BtnGroup">
  <button class="btn BtnGroup-item text-center green" style="background-color:green; " type="button" @click="filters.name.value='green'">Green</button>
  <button class="btn BtnGroup-item text-center" style="background-color:yellow" type="button"  @click="filters.name.value='yellow'">Yellow </button>
  <button class="btn BtnGroup-item text-center" style="background-color:tomato" type="button" @click="filters.name.value='red'">Red</button>
  <button class="btn BtnGroup-item text-center" type="button" @click="filters.name.value=''">All</button>
      </div>
        </div>
        
      <v-table
        :data="reports"
        :currentPage.sync="currentPage"
        :pageSize="4"
        @totalPagesChanged="totalPages = $event"
        :filters="filters"
      >
        <thead slot="head">
          <th style="border: 1px solid black;background-color: #2980b9 ;color:black">Report</th>
          <th style="border: 1px solid black;background-color: #2980b9;color:black">Date</th>
          <th style="border: 1px solid black;background-color: #2980b9;color:black">Status</th>
          
        </thead>
        <tbody slot="body" slot-scope="{displayData}">
        <tr v-for="row in displayData" :key="row.guid">
          <td style="width: 80%; max-width: 800px; table-layout: fixed;">
      <div class="d-flex v-align-middle px-4 py-3" style="background-color:tomato; color: white;border: 1px solid black;width: 100%;" v-if="row.meta[1]==='Yes' && row.meta[2]==='Yes' && row.meta[3]==='Yes' && row.meta[4]==='Yes' && row.meta[5]==='Yes' "> Please Stay at Home and Contact a Supervisor.</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:yellow; color: black;border: 1px solid black;width: 100%;" v-else-if="row.meta[1]==='Yes' && row.meta[2]==='Yes' && row.meta[3]==='Yes' && row.meta[4]==='No' && row.meta[5]==='No' "> Please Consult your Supervisor!</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:yellow; color: black;border: 1px solid black;width: 100%;" v-else-if="row.meta[1]==='Yes' && row.meta[2]==='No' && row.meta[3]==='Yes' && row.meta[4]==='No' && row.meta[5]==='No' "> Please Consult your Supervisor!</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:yellow; color: black;border: 1px solid black;width: 100%;" v-else-if="row.meta[1]==='Yes' && row.meta[2]==='No' && row.meta[3]==='No' && row.meta[4]==='No' && row.meta[5]==='No' "> Please Consult your Supervisor!</div> 
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:green; color: white;border: 1px solid black;width: 100%;" v-else-if="row.meta[1]==='No' && row.meta[2]==='No' && row.meta[3]==='No' && row.meta[4]==='No' && row.meta[5]==='No' "> You are Approved to go workplace.</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:tomato; color: white;border: 1px solid black;width: 100%;" v-else-if="row.meta[1]==='Yes' && row.meta[2]==='No' && row.meta[3]==='Yes' && row.meta[4]==='Yes' && row.meta[5]==='No' ">Please Stay at home and Contact a Supervisor.</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:grey; color: white;border: 1px solid black;width: 100%;" v-else> Please Contact Your Supervisor </div>
          </td>
          <td style="border: 1px solid;background-color: azure; width: 70%; max-width: 700px; table-layout: fixed;">{{new Date(row.created).toLocaleString()}}</td>
           <td class="text-center " style="border: 1px solid;background-color:azure;width: 70%; max-width: 700px; table-layout: fixed;;" >{{row.color}}</td> 

        </tr>
        </tbody>
      </v-table>
      <smart-pagination
        :currentPage.sync="currentPage"
        :totalPages="totalPages"
        
      />
      <div class="d-flex border-bottom py-13 "></div>
    </div>

<!-- <div > 'Only for Test Purpose'
    <Top :title="'Reports'"/>
 
  <div class="Box-header mx-auto text-center">Reports</div>
  <div  v-for="report in reports" :key="report.report_id" >

  {{report.meta}}
  {{report.created}}
  </div>
  <div class="d-flex border-bottom py-12"></div>
     </div> -->
   
</template>

<script>
import client from '@/helpers/client';
export default {
  data() {
    return {
      user: this.$route.params.userid,
      account: this.$store.state.settings.account,
      reports: [],
      currentPage: 1,
      totalPages: 0,
      filters: {
      name: { value: '', keys: ['color'] }
    }
    };
  },
 async mounted(){
    let rawReports = await client.request('get_user_reports',this.user)
    rawReports.forEach(element => {
      element.meta=JSON.parse(element.meta)
      this.reports.push(element)
    });
   
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
