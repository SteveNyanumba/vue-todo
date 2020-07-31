import Axios from 'axios'
import Swal from 'sweetalert2'
import Vue from 'vue'
import router from './router'
import store from './storage/store'

require('./bootstrap.js')
Vue.config.productionTip = false
Vue.prototype.$http = Axios;


const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}


const app = new Vue({
    el:'#app',
    router,
    store
})

window.Toast = Swal.mixin({
    toast:true,
    position:'top-right',
    timer:4000,
    timerProgressBar:true
})
