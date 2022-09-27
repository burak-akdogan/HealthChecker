<template>
  <div>
    
    <div class="top-0 left-0 p-4 position-absolute" >
    </div>
    <!-- <div class="hero py-6" > -->
      <div class="hero py-2" >
      <div class="container-lg p-responsive pt-10">
        <div class="col-md-5">
          <div></div><img class="eyebrow-mb-2" src="~/@/assets/logov4.png"><div></div>
          <h2 class="eyebrow-mb-3" style="color:aliceblue">Protect Your Employees And Customers.</h2>
          <br>
          <h1 class="mb-4" style="color:aliceblue" v-text="'Welcome'"/> 
          <router-link v-if="!isAuthenticated" to="/signup" class="btn-mktg mb-3 ">Signup</router-link>
          <router-link v-else to="/report" class="btn-mktg mb-3 ">Report </router-link>
          <p style="color:aliceblue" v-if="!isAuthenticated">Or, <router-link to="/login" >Log in</router-link></p> 
        </div>
      </div>
    </div>
    <!-- 7f white proxi font use-->
<!-- Section one -->
    <div class="anim-fade-in container-lg p-responsive overflow-hidden">
      <div class="overflow-hidden py-10">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 text-center">
          <img class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2 border " src="~/@/assets/firstpic.png" style="height: 500px;" />
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6">
          <h2>Why is HealthChecker free?</h2>
          <h5>HealthChecker is developed to protect the health of your employees and customers in your workplace in order to prevent epidemic diseases such as Covid 19. Approximately 6.53 million people died during the Covid-19 pandemic, therefore we have decided to make this application free of cost. </h5>
          <br>
          <h5>You can also use this application to protect your employees and customers from other epidemics such as monkeypox and ebola.</h5> 
        </div>
      </div></div>
      <!-- Section one ends -->
<!-- Section two -->
      <!-- <div class="overflow-hidden py-7">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6" >
          <h2>Do you want to contribute too?</h2>
          <h5 style="white-space: nowrap;">By sharing HealthChecker on social media platforms, you can get more people to see HealthChecker.</h5>
            <h5 style="white-space: nowrap;">Please do not hesitate to contact us if you have any advice or suggestions.</h5>
        </div>
      </div>
    </div> -->
  
    <div class="container-lg p-responsive overflow-hidden">
      <div class="main-content border-top"></div>
  <div > 
    <div class="container ">
      <h1>Why HealthChecker?</h1>
      <div class="row">
        <div class="service">
          <i class="fas fa-briefcase-medical"></i>
          <h2>IMMEDIATE ACTION</h2>
        </div>
        <div class="service">
          <i class="fas fa-user-shield "></i>
          <h2>PROTECT YOUR STAFF</h2>
        </div>
        <div class="service">
          <i class="fas fa-file-medical-alt"></i>
          <h2>MONITOR IN REAL TIME</h2>
        </div>
        <div class="service">
          <i class="fas fa-comment-medical"></i>
          <h2>PROTECT CUSTOMERS HEALTH</h2>
        </div>
        <div class="service">
          <i class="fas fa-balance-scale"></i>
          <h2>GUAD THE COMPANY AGAINS LEGAL RISKS</h2>
        </div>
        <div class="service">
          <i class="fas fa-mail-bulk"></i>
          <h2>GET REPORT EMPLOYEE'S TEST</h2>
        </div></div></div></div >
      <br><br>

      <!-- Section How works -->
      <div class="container-lg p-responsive overflow-hidden border-top">
        <br>
      <h2 >How does HealthChecker work?</h2>
      <!-- offset-1 -->
      <div class="d-flex offset-1 flex-column flex-md-row flex-items-center flex-md-items-center"> 
  <div class="col-3 d-flex flex-items-center flex-items-center flex-md-items-start">
    <div style="background-color: green; height: 150px; width:150px;" />
  </div>
  <div class="col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-4">
    <h2 class="text-normal lh-condensed">You are approved to go workplace.</h2>
    
  </div>
</div>
<br>
<!-- offset-2 -->
<div class="d-flex offset-2 flex-column flex-md-row flex-items-center flex-md-items-center">
  <div class="col-3 d-flex flex-items-center flex-items-center flex-md-items-start">
    <div style="background-color: yellow; height: 150px; width:150px;" />
  </div>
  <div class="col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-4">
    <h2 class="text-normal lh-condensed">Please consult your supvervisor!</h2>
    
  </div>
</div>    
<br>
<!-- offset-3 -->
<div class="d-flex offset-3 flex-column flex-md-row flex-items-center flex-md-items-center" >
  <div class="col-3 d-flex flex-items-center flex-items-center flex-md-items-start" >
    <div style="background-color: tomato; height: 150px; width:150px;" />
     
  </div>
  <div class="col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-4">
    <h2 class="text-normal lh-condensed">Stay at home and contact a supervisor</h2>
  </div>
</div></div>
<br><br>    
      <!-- Section How works ENDS -->

<!-- Youtube section -->

      <div class="overflow-hidden py-10 border-top">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6"  style="padding-left: 3%" >
          <iframe  width="890" height="500" src="https://www.youtube.com/embed/bPITHEiFWLc" style="text-align:center"></iframe>
          <!-- Youtube section  ends-->
        </div>
      </div>
    </div>
    <Footer/> 
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
  background-image: url('~@/assets/Back.jpg');
  background-size: cover;
  background-position: center;
 // background: linear-gradient(#ee4365 70%, rgba(12, 7, 7, 0.925));
  
}
</style>
