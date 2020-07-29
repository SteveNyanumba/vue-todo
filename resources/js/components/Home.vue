<template>
  <div>
      <Navbar/>

      <div class="container my-5">
        <h1 class="text-center">Welcome to this Todo App</h1>
        <div class="mt-3">
          <div class="card">
            <div class="card-body">
              <div class="row justify-content-center">
                <div class="col-6">
                  <router-link class="btn btn-lg btn-primary m-auto" to="/register">Register</router-link>
                </div>
                <div class="col-6">
                  <router-link to="/todos" class="btn btn-lg btn-secondary m-auto">Todos</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

import Navbar from './sub/Navbar'
export default {
name: 'Home',
components:{
    Navbar
}

}
</script>

<style>

</style>