import Axios from "axios";

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    try {
      const response = await Axios.get(
        '/api/todos'
      );
     console.log(response)
      
      commit('setTodos', response.data);
  
    } catch (err) {
      console.log(err)
    }
  },
  async addTodo({ commit }, todo) {
    try {
      const response = await Axios.post(
        '/api/todos',
        todo
      )
      if(response.data.success){
        Toast.fire({
          icon:'success',
          title:response.data.message
        })
      }else{
        Toast.fire({
          icon:'question',
          title:response.data.message
        })
      }
      commit('newTodo', todo)
    } catch (err) {
      Toast.fire({
        icon:'error',
        title:err
      })
    }

    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, id) {
    try {
      const response = await Axios.delete(`/api/todos/${id}`);
      Toast.fire({
        icon:'success',
        message:response.data.message
      })
      commit('removeTodo', id);
    } catch (err) {
      Toast.fire({
        icon:'error',
        title:err
      })
    }
  },
};

const mutations = {
  setTodos(state, todos){
      state.todos = todos
    },
  newTodo(state, todo){
      state.todos.unshift(todo)
    },
  removeTodo(state, id){
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
};

export default {
  state,
  getters,
  actions,
  mutations
};