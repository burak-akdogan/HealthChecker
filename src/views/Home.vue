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
          <h1 class="mb-4"  v-text="'Welcome'"/> 
          <router-link v-if="!isAuthenticated" to="/signup" class="btn-mktg mb-3">Signup </router-link>
          <router-link v-else to="/report" class="btn-mktg mb-3">Report </router-link>
          <p v-if="!isAuthenticated">Or, <router-link to="/login">Log in</router-link></p> 
        </div>
      </div>
    </div>
<!-- Section one -->
    <div class="anim-fade-in container-lg p-responsive overflow-hidden">
      <div class="overflow-hidden py-10 border-bottom">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 text-center">
          <img class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2 border " src="~/@/assets/firstpic.png" style="height: 500px;" />
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6">
          <h2>Why HealthChecker is free?</h2>
          <h5>HealthChecker is developed to protect the health of your employees and customers in your workplace in order to prevent epidemic diseases such as Covid 19. Aapproximately 6.53 million people died during the Covid-19 pandemic, therefore we have decided to make this application free of cost. </h5>
          <br>
          <h5>You can also use this application to protect your employees and customers from other epidemics such as monkeypox and ebola.</h5> 
        </div>
      </div>
      <!-- Section one ends -->
<!-- Section two -->
      <div class="overflow-hidden py-7">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6" >
          <h2>Do you want to contribute too?</h2>
          <h5 style="white-space: nowrap;">By sharing HealthChecker on social media platforms, you can get more people to see HealthChecker.</h5>
            <h5 style="white-space: nowrap;">Please do not hesitate to contact us if you have any advice or suggestions.</h5>
        </div>
      </div>
    </div>
    <div class="container-lg p-responsive overflow-hidden">
      <div class="overflow-hidden py-10 border-bottom">
        <div class="col-md-6 float-right pr-md-6 pr-lg-6 text-center"> <!--right-->
          <div class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2" style="height: 250px; width:250px;" />   <!--right-->
        </div>
        <div class="col-md-6 float-right pr-md-6 pr-lg-12 text-center"> <!--left-->
        <div class="bg-red mx-auto ml-2 hide-sm hide-md rounded-2" style="height: 250px; width:250px;">   <!--left-->        

        </div>
        </div>
      </div>
      <!-- Section two ends -->
<!-- Section tree starts -->
<div class="container-lg clearfix ">
  <div class="col-4 float-right  p-3">
    <img class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2 border " src="~/@/assets/firstpic.png" style="height: 300px;  "/>
    <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, sequi!1</p> 
  </div>
  <div class="col-4 float-right  p-3">
    <img class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2 border " src="~/@/assets/firstpic.png" style="height: 300px;  "/>
    <p >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, sequi!2</p> 
  </div>
  <div class="col-4 float-right  p-3">
    <img class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2 border  " src="~/@/assets/firstpic.png" style="height: 300px; "/>
    <p >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, sequi!3</p> 
  
  </div>
</div>
   
      <!-- Section tree ends -->

      <div class="overflow-hidden py-10">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6"  style="padding-left: 3%" >
          <iframe  width="890" height="500" src="https://www.youtube.com/embed/bPITHEiFWLc" style="text-align:center"></iframe>
          
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
  background: linear-gradient(#ee4365 70%, rgba(12, 7, 7, 0.925));
  background-size: cover;
  background-position: center;
}
</style>
