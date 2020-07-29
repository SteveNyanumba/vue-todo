import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth'
import todos from './modules/todos';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  strict:true,
  modules: {
    todos,
    auth
  }
});
