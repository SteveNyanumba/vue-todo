<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link class="navbar-brand" to="/">Todo App</router-link>
      <button class="navbar-toggler hidden-lg-up fas fa-bars" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation"></button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link class="nav-link" to="/todos">Todos <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item active" v-if="isLoggedIn">
            <button class="btn btn-default" @click.prevent="signout()"><i class="fa fa-power-off" aria-hidden="true"></i></button>
          </li>
        </ul>
        
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
name:'Navbar',
computed:mapGetters(["isLoggedIn"]),
methods:{
  ...mapActions(["logout"]),
  signout(){
    this.logout()
    .then(() => {
      this.$router.push('/login')
    }).catch((err) => {
      console.log(err)
    });
  }
}


}
</script>

<style>

</style>