import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './storage/store';

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
        component:require('./components/Login.vue').default,
        meta: {
            requiresGuest: true
          }
    },
    {
        path:'/register',
        component:require('./components/Register.vue').default,
        meta: {
            requiresGuest: true
          }
    },
]
const router = new VueRouter({
    mode:'history',
    routes,
    
})



router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        // Redirect to the Login Page
        next('/login');
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      if (store.getters.isLoggedIn) {
        // Redirect to the Todos Page
        next('/todos');
      } else {
        next();
      }
    } else {
      next()
    }
  })


  export default router