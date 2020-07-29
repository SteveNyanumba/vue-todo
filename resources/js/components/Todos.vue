<template>
  <div>
      <Navbar/>
      <div class="container my-5" id="getTodos">
          <div class="row d-flex justify-content-center">
              <div class="col-lg-12">
                  <div class="card px-3">
                      <div class="card-body">
                          <h4 class="card-title text-center">Todo App</h4>
                          <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="todo in allTodos" :key="todo.id" v-bind:class="{'active':todo.completed}" @dblclick="on2Click">
                                {{ todo.title }}
                                <span class="badge badge-light badge-pill">{{ todo.deadline }}</span>
                            </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <div class="text-center">
          <AddTodo/>
      </div>
  </div>
</template>

<script>
import Navbar from './sub/Navbar'
import AddTodo from './sub/AddTodo'
import { mapGetters, mapActions } from 'vuex'
export default {
name: 'Todos',
components:{
    Navbar,
    AddTodo
},
computed: mapGetters(["allTodos"]),
data(){
    return {
        todo: {
            id:'',
            title:'',
            description:'',
            deadline:'',
            userId:'',

        }
    }
},
methods:{
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    on2Click(todo){
        const updateTodo = {
            id: todo.id,
            completed: !todo.completed
        }
        this.updateTodo(todo)
    }
},
created(){
    this.fetchTodos()
}

}
</script>

<style>

</style>