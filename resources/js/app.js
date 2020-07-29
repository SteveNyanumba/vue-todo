const { default: store } = require('./storage/store.js')
const Swal = require('sweetalert2').default
window.Vue = require('vue')
require('./bootstrap.js')

const VueRouter = require('vue-router').default

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:require('./components/Home.vue').default
    },
    {
        path:'/todos',
        component:require('./components/Todos.vue').default,
        meta:{
            requiresAuth: true
        }
    },
    {
        path:'/login',
        component:require('./components/Login.vue').default
    },
    {
        path:'/register',
        component:require('./components/Register.vue').default
    },
]
const router = new VueRouter({
    mode:'history',
    routes,
    
})



// router.beforeEach((to, from, next)=>{
//     if(to.matched.some(rec=> rec.meta.requiresAuth)){
//         if (store.getters.isLoggedIn){
//             next()
//         }else{
//             next('/login')
//         }
        
//     }else{
//         next()
//     }
// })

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