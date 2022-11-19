<template>
  <div >
    <Top :title="'Self Report'" />
    
    <div class="Box-header d-flex border-bottom v-align-middle px-4 py-3 text-red" v-if="hasReported">You already reported today!</div>
    <div v-else>
      <div class="Box-header">
<!-- Quiz section -->
      <div v-if="step===1">  1)	Have you travelled internationally in the last 14 days?</div> 
      <!-- If yes --- Yellow  // Not --- (Green) -->
      <div v-if="step===2">  2) Are you currently awaiting results from a COVID-19 test?</div>   
      <!-- If yes --- Yellow  // Not --- (Green) -->
      <div v-if="step===3">  3) Do you have shortness of breath at rest or difficulty breathing when lying down?</div>
      <!-- If yes --- Yellow  // Not --- (Green) -->
      <div v-if="step===4">  4) Have you tested positive for COVID-19 in the previous 10 days by rapid test or laboratory-based test?</div>
      <!-- If yes --- Red  // Not --- (Green) -->
      <div v-if="step===5">  5) Do you have any of the following symptoms: severe difficulty breathing, chest pain, confusion, extreme drowsiness or loss of consciousness? </div>
      <!-- If yes --- Red  // Not --- (Green) -->
      
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:red; color: white;" v-if="form[1]==='Yes' && form[2]==='Yes' && form[3]==='Yes' && form[4]==='Yes' && form[5]==='Yes' "> <i class="fa-solid fa-triangle-exclamation"></i>  Dear {{account.meta.name}}, Please Stay at home and contact a supervisor.</div>

     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:yellow; color: black;" v-else-if="form[1]==='Yes' && form[2]==='Yes' && form[3]==='Yes' && form[4]==='No' && form[5]==='No' "> <i class="fa-solid fa-phone"></i>  Dear {{account.meta.name}}, Please consult your supvervisor!</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:yellow; color: black;" v-else-if="form[1]==='Yes' && form[2]==='No' && form[3]==='Yes' && form[4]==='No' && form[5]==='No' "> <i class="fa-solid fa-phone"></i>  Dear {{account.meta.name}}, Please consult your supvervisor!</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:yellow; color: black;" v-else-if="form[1]==='Yes' && form[2]==='No' && form[3]==='No' && form[4]==='No' && form[5]==='No' "><i class="fa-sharp fa-solid fa-check"></i>  Dear {{account.meta.name}}, Please consult your supvervisor!</div>
     
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:green; color: white;" v-else-if="form[1]==='No' && form[2]==='No' && form[3]==='No' && form[4]==='No' && form[5]==='No' "><i class="fa-sharp fa-solid fa-check"></i> Dear {{account.meta.name}},  You are approved to go workplace.</div>
    
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:red; color: white;" v-else-if="form[1]==='Yes' && form[2]==='No' && form[3]==='Yes' && form[4]==='Yes' && form[5]==='No' "><i class="fa-solid fa-triangle-exclamation"></i>  Dear {{account.meta.name}}, Please Stay at home and contact a supervisor.</div>
     <div class="d-flex  v-align-middle px-4 py-3" style="background-color:grey; color: black;" v-else-if="step>5"><i class="fa-solid fa-phone"></i> Dear {{account.meta.name}}, Contant your Supervisor or Human Resources</div>
      <br>
      <div v-if="step!==6"><button  class="btn-outline-mktg" @click="setQuestion('Yes')">Yes</button><button class="btn-outline-mktg" @click="setQuestion('No')">No</button></div>
      <br>
      <button v-if="!submitted" :disabled="step!==6" class="btn-mktg mb-3" @click="submitReport()">Submit</button>
    </div>
  </div> 
   
  
     </div>
        
</template>

<script>

import client from '@/helpers/client';
export default {
  data() {
    return {
      form:{},
      step:1,
      isVerified: !!this.$store.state.settings.account.meta.is_verified,
      lastReport: this.$store.state.settings.report,
      account: this.$store.state.settings.account,
      submitted: false,
      
    };
  },
  mounted(){
    this.$store.dispatch('getReport')
  },
  computed: {   
    hasReported() {
      if (!this.$store.state.settings.report || !this.$store.state.settings.report.created)
      return false
      let today = new Date()
      let oldReport= new Date(this.$store.state.settings.report.created)
      return (today.getFullYear()===oldReport.getFullYear() && today.getMonth()===oldReport.getMonth() && today.getDate()===oldReport.getDate()) // rep.allow only one time in a day.
    },
  },
  methods: {
    setQuestion(value){
this.form[this.step]=value
this.step++
console.log(this.form)
    },
    async submitReport() {
      try {
        let color='green'
         if (this.form[1]==='Yes' && this.form[2]==='Yes' && this.form[3]==='Yes' && this.form[4]==='Yes' && this.form[5]==='Yes' )
          { 
             color='red'
            } else if (this.form[1]==='Yes' && this.form[2]==='No' && this.form[3]==='Yes' && this.form[4]==='No' && this.form[5]==='No')
            {
              color='yellow'
            } else if (this.form[1]==='Yes' && this.form[2]==='No' && this.form[3]==='No' && this.form[4]==='No' && this.form[5]==='No')
            {
              color='yellow'
            } else if (this.form[1]==='No' &&  this.form[2]==='No' &&  this.form[3]==='No' &&  this.form[4]==='No' &&  this.form[5]==='No')
            {
              color='green'
            } else if(this.form[1]==='Yes' && this.form[2]==='No' && this.form[3]==='Yes' && this.form[4]==='Yes' && this.form[5]==='No' )
            {
              color='red'
            } else {color="grey"}
            
  
    //  <div class="d-flex  v-align-middle px-4 py-3" style="background-color:blue; color: white;" v-else-if="step>5"><i class="fa-solid fa-phone"></i> Contant your HR</div>
        this.isLoading = true;
        const result = await client.request('submit_report',{form:this.form,company_id:this.account.company_id,color:color});
        // this.$store.dispatch('init');
        this.submitted = true
      } catch (error) {
        this.error = error;
        console.log(error)
        this.isLoading = false;

      }
    }
 
  }
  
};
</script>
