<template>
  <div class="my-5">
      <div class="row justify-content-center">
          <div class="col-md-8 col-sm-10">
              <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg text-center"><b>Register yourself as a new User</b></p>

      <form @submit.prevent="register()">
        <div class="input-group mb-3">
          <input type="text" name="username" class="form-control" placeholder="Enter your Username" v-model="username">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="email" name="email" class="form-control" placeholder="Enter your email address" v-model="email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" name="password" class="form-control" placeholder="Enter your Password" v-model="password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" name="confirmPassword" class="form-control" placeholder="Confirm your password" v-model="confirmPassword">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block" @click.prevent="signup()">Sign In</button>
          </div>
          <div class="col-4">
            <router-link to="/login" type="submit" class="btn btn-warning btn-block" >Log In</router-link>
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
import Navbar from './sub/Navbar'
import { mapActions } from 'vuex'
export default {
name: 'Home',
components:{
    Navbar
},
data(){
  return {
    username:'',
    password:'',
    confirmPassword:'',
    email:''
  }
},
methods:{
  ...mapActions(["register"]),
  signup(){
    let user = {
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    this.register(user)
    
  },
}
}
</script>

<style>

</style>