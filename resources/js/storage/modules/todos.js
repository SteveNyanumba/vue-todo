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
      const response = await Axios.get('/api/todos');
      
      commit('setTodos', response.data.todos);
  
    } catch (err) {
      console.log(err)
    }
  },
  async addTodo({ commit }, todo) {
    try {
      commit('newTodo', todo)
      const response = await Axios.post('/api/todos', todo )
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
    } catch (err) {
      Toast.fire({
        icon:'error',
        title:err
      })
    }
  },
  async updateTodo({commit}, todo){
    try {
      commit('markCompleted', todo)
      const response = await Axios.put(`/api/todos/${todo.id}`, todo)
      if(response.data.success){
        Toast.fire({
          icon:'success',
          title:response.data.message
        })
      }else{
        Toast.fire({
          icon:'warning',
          title:'An little error occured!'
        })
      }
    } catch (err) {
      Toast.fire({
        icon:'error',
        title:err
      })
    }
  },
  async deleteTodo({ commit }, id) {
    try {
      commit('removeTodo', id);
      const response = await Axios.delete(`/api/todos/${id}`);
      if (response.data.success){
        Toast.fire({
          icon:'success',
          message:response.data.message
        })
      }
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
  markCompleted(state, update){
    const index = state.todos.findIndex(todo=>todo.id === update.id)
    if (index !== -1){
      state.todos.splice(index, 1, update)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};