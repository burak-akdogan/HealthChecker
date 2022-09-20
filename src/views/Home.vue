<template>
  <div>
    <div class="top-0 left-0 p-4 position-absolute">
      <img src="~/@/assets/logov4.png" style="max-width: 500px;" />
    </div>
   
    <div class="hero py-10">
      <div class="container-lg p-responsive pt-10">
        <div class="col-md-5">
          <h1 class="eyebrow-mb-4">HEALTHCHECKER</h1>
          <h2 class="eyebrow-mb-3">Protect Your Employees And Customers.</h2>
          <br>
          <h1 class="mb-4" v-text="'Welcome'" />
          <router-link v-if="!isAuthenticated" to="/signup" class="btn-mktg mb-3">Signup</router-link>
          <router-link v-else to="/report" class="btn-mktg mb-3">Report</router-link>
          <p v-if="!isAuthenticated">Or, <router-link to="/login">log in</router-link></p> 
        </div>
      </div>
    </div>
    <div class="container-lg p-responsive overflow-hidden">
      <div class="overflow-hidden py-10 border-bottom">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 text-center">
          <div class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2" style="height: 500px;" />
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6">
          <h2>Why HealthChecker is free?</h2>
          <h5>You can use this application free of charge to prevent epidemics. With this application we have developed to protect the health of your employees and customers in your workplace, you can prevent epidemic diseases such as Covid 19.</h5>
          <h5>One of the main reasons why this application is free is that approximately 6.53 million people died in Covid-19, we decided to make this application free so that more people would not die.</h5>
          
        </div>
      </div>
      <div class="overflow-hidden py-10">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6" >
          <h2>Do you want to contribute too?</h2>
          <h5 style="white-space: nowrap;">By sharing HealthChecker on social media platforms, you can get more people to see HealthChecker.</h5>
            <h5 style="white-space: nowrap;">Please do not hesitate to contact us if you have any advice or suggestions.</h5>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

export default {
  computed: {   
    isAuthenticated() {
      return this.$store.state.settings.isAuthenticated;
    },
  },

};
</script>

<style scoped lang="scss">
.hero {
  background: linear-gradient(#f05674 70%, rgba(176, 0, 0, 0.4));
  background-size: cover;
  background-position: center;
}
</style>
