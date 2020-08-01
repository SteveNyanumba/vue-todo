<template>
  <div>
      <Navbar/>
      <div class="container my-5" id="getTodos">
          <div class="row d-flex justify-content-center">
              <div class="col-lg-12">
                  <div class="card px-3">
                      <div class="card-body">
                          <h4 class="card-title text-center">Todo App</h4>
                          <div class="box-body table-responsive">
                            <table class="table table-hover">
                                <tbody>
                                    <tr>
                                        <th>Title</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th><b>Actions</b></th>
                                    </tr>
                                    <tr v-for="todo in allTodos" :key="todo.id" @dblclick="on2Click(todo)">
                                        <td>{{ todo.title }}</td>
                                        <td>{{ todo.deadline }}</td>
                                        <td>
                                            <span class="alert alert-success text-center" v-if="todo.completed">Completed</span>
                                            <span class="alert alert-danger text-center" v-else>incomplete</span>
                                        </td>
                                        <td>{{ todo.description }}</td>
                                        <td><button @click="deleteTodo(todo.id)" class="btn"><i  class="fas fa-trash-alt"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
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
        
        
    }
},
methods:{
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    on2Click(todo){
        todo.completed = !todo.completed
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