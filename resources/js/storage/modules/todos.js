import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      '/api/todos'
    );

    commit('setTodos', response.data);
  },
  async addTodo({ commit }, todo) {
    const response = await axios.post(
      '/api/todos',
      todo
    );

    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`/api/todos/${id}`);

    commit('removeTodo', id);
  },
  async updateTodo({ commit }, updateTodo) {
    const response = await axios.put(
      `/api/todos/${updateTodo.id}`,
      updateTodo
    );

    console.log(response.data);

    commit('updateTodo', response.data);
  }
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
  updateTodo(state, updateTodo){
    const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updateTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};