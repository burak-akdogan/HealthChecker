<template>
  <div>
    <Top  :title="'Self Report'" />
    
    <div v-if="hasReported">You already reported today</div>
    <div v-else>
      <div style="border: 2px solid ;padding: 20px; border-radius: 25px; background: grey;:">
      <div v-if="step===1">1) Do you or the person you are inquiring about have any of the following symptoms: severe difficulty breathing.(e.g., struggling for each breath, speaking in single words), chest pain, confusion, extreme drowsiness or loss of consciousness?)
      
      </div>
      <div  v-if="step===2">2) Do you or the person you are inquiring about have shortness of breath at rest or difficulty breathing when lying down?</div>
      
      <div v-if="step===3">3) Do you have a new onset or worsening of any of the following symptoms?</div>

      <div v-if="step===4">4) Do you have a new onset of 2 or more of any of the following symptoms?</div>

      <div v-if="step===5">5) Have you tested positive for COVID-19 in the previous 10 days either by rapid test or laboratory-based test?</div>

      <div v-if="step===6">6) Have you recently received a positive result on an at-home rapid test?</div>

      <div v-if="step===7">7) Are you currently awaiting results from a COVID-19 test?</div>
      <div v-if="step!==8"><button  class="btn-outline-mktg" @click="setQuestion('Yes')">Yes</button> <button class="btn-outline-mktg" @click="setQuestion('No')">No</button></div>
      <br>
      <button :disabled="step!==8" class="btn-mktg mb-3" @click="submitReport()">Submit</button>
    </div>
  </div></div>
</template>

<script>
import client from '@/helpers/client';
export default {
  data() {
    return {
      form:{},
      step:1,
      isVerified: !!this.$store.state.settings.account.meta.is_verified,
      lastReport: this.$store.state.settings.report
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
      return (today.getFullYear()===oldReport.getFullYear() && today.getMonth()===oldReport.getMonth() && today.getDate()===oldReport.getDate())
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
        const result = await client.request('submit_report', this.form);
        this.$store.dispatch('init');
      } catch (error) {
        this.error = error;
        console.log(error)
        this.isLoading = false;

      }
    }
  }
  
};
</script>
