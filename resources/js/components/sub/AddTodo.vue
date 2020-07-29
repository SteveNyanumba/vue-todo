<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#newTodo">
          Add new Todo
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="newTodo" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">Add New Todo</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                             <form @submit.prevent="onSubmit">
                                <div class="form-group">
                                     <input type="text" v-model="title" placeholder="Todo Title" class="form-control">
                                </div>
                                 <div class="form-group">
                                     <textarea class="form-control" v-model="description" placeholder="Here lies your description"></textarea>
                                 </div>
                                 <div class="form-group">
                                     <input class="form-control" type="date" v-model="deadline" placeholder="Enter your deadline date">
                                 </div>
                                 <input type="submit" class="btn btn-primary" value="Submit">
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    name: 'AddTodo',
    mounted(){
        console.log('AddTodo is mounted');
    },
    data(){
        return{
            newTodo:{
                title:'',
                description:'',
                deadline:'',
            }
        }
    },
    methods:{
        ...mapActions(['addTodo']),

        onSubmit(){
            this.addTodo(this.newTodo)
        }
    }
}
</script>