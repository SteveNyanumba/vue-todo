<template>
  <div class="my-5">
      <div class="row justify-content-center">
          <div class="col-md-8 col-sm-10">
              <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg text-center"><b>Sign in to start your session</b></p>

      <form @submit.prevent="">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Username" name="password" v-model="username">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Password" name="password" v-model="password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block" @click.prevent="signin()">Sign In</button>
          </div>
          <div class="col-4">
            <router-link to="/register" class="btn btn-warning btn-block" >Register</router-link>
          </div>
          <!-- /.col -->
        </div>
      </form>
      </div>
      </div>
      </div>

  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
name: 'Home',
computed: mapGetters(["isloggedIn"]),
created(){
    console.log('component mounted');
},
data(){
    return{
        username:'',
        password:'',
    }
},
methods:{
    ...mapActions(["login"]),
    signin(){
      let user = {
        username: this.username,
        password: this.password
      }
      this.login(user)
      .then((res)=>{
        if(res.data.success){
          this.$router.push('/todos')
        }
      }).catch((err) => {
        console.log(err)
      });
    },
  }
}
</script>

<style>

</style>