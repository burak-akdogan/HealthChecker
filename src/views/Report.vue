<template>
  <div >
    <Top :title="'Self Report'" />
    
    <div class="Box-header d-flex border-bottom v-align-middle px-4 py-3 text-red" v-if="hasReported">You already reported today!</div>
    <div v-else>
      <div class="Box-header">

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
     <div  style="color:red"    v-if="form[1]==='Yes' && form[2]==='Yes' && form[3]==='Yes' && form[4]==='Yes' && form[5]==='Yes' "> Stay at home and contact a supervisor.</div>

     <div style="color:yellow" v-else-if="form[1]==='Yes' && form[2]==='Yes' && form[3]==='Yes' && form[4]==='No' && form[5]==='No' "> Please consult your supvervisor!</div>
     <div style="color:yellow" v-else-if="form[1]==='Yes' && form[2]==='No' && form[3]==='Yes' && form[4]==='No' && form[5]==='No' "> Please consult your supvervisor!</div>
     <div style="color:yellow" v-else-if="form[1]==='Yes' && form[2]==='No' && form[3]==='No' && form[4]==='No' && form[5]==='No' "> You are approved to go workplace.</div>
     
     <div style="color:green" v-else-if="form[1]==='No' && form[2]==='No' && form[3]==='No' && form[4]==='No' && form[5]==='No' "> You are approved to go workplace.</div>
    
     <div style="color:green" v-else-if="form[1]==='Yes' && form[2]==='No' && form[3]==='Yes' && form[4]==='Yes' && form[5]==='No' "> Stay at home and contact a supervisor.</div>
     <div style="color:blue" v-else-if="step>5"> Contant your HR</div>

      <br>
      <div v-if="step!==6"><button  class="btn-outline-mktg" @click="setQuestion('Yes')">Yes</button> <button class="btn-outline-mktg" @click="setQuestion('No')">No</button></div>
      <br>
      <button v-if="!submitted" :disabled="step!==6" class="btn-mktg mb-3" @click="submitReport()">Submit</button>
      
    </div>
  </div> 
   <!-- Report  logs section with paginations-->
  
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
      submitted: false
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
      return (today.getFullYear()===oldReport.getFullYear() && today.getMonth()===oldReport.getMonth() && today.getDate()===oldReport.getDate()) //allow only one time in a day.
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
        this.isLoading = true;
        const result = await client.request('submit_report',{form:this.form,company_id:this.account.company_id});
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
