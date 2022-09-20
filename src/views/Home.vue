<template>
  <div>
    <div class="top-0 left-0 p-4 position-absolute">
      <img src="~/@/assets/logo.svg" style="max-width: 220px;" />
    </div>
   
    <div class="hero py-10">
      <div class="container-lg p-responsive pt-10">
        <div class="col-md-5">
          <h1 class="eyebrow mb-4">HEALTHCHECKER</h1>
          <h2 class="eyebrow mb-3">Protect Your Employees And Customers.</h2>
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
          <div class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2" style="height: 260px;" />
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6">
          <h6 class="eyebrow mb-4">Was bietet dir meine Seite?</h6>
          <h2>Title 1</h2>
          <h5>
            Täglich neue Bilder und Videos die von Erotik bis zur Pornografie reichen! Du hast
            ausserdem die Möglichkeit, Wunschbilder und Videoanfragen zu stellen.
          </h5>
        </div>
      </div>
      <div class="overflow-hidden py-10">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6">
          <h6 class="eyebrow mb-4">Subtitle 2</h6>
          <h2>Subscription bundles</h2>
          <h5>
            Das kannst du jederzeit über die Privatnachrichtenfunktion machen, jede Nachricht wird
            von mir persönlich beantwortet, denn ich bin täglich mehrmals online und habe genügend
            Zeit.
          </h5>
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
