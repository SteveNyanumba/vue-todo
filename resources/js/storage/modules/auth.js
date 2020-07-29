import Axios from "axios";

const state = {
    status:'',
    user:{},
    cookie: document.cookie
}
const actions = {
    async login({commit}, user){
       try {
           commit('authRequest')
           if(!user.username || !user.password){
            Toast.fire({
                icon:'error',
                title:'You have empty fields!'
              })
              return
           }
           const response = await Axios.post('/api/login', user)
           if(response.data.success){
               const cookie = document.cookie
               this.$router.push('/login')
               Toast.fire({
                   icon:'success',
                   title:response.data.message
                })
                commit('authSuccess', cookie, user)
           }else{
            Toast.fire({
                icon:'warning',
                title:response.data.message
              })
           }

       } catch (err) {
           commit('authErr')
           Toast.fire({
               icon:'error',
               title:err
            })
       }
        
    },
    // commit('authRequest')
       
    // if(!user.username || !user.password){
    //     Toast.fire({
    //         icon:'error',
    //         title: 'Empty Fields'
    //     })
    //     return
    // }
    // Axios.post('/api/login', user)
    // .then((res) => {
    //     if (res.data.success){
    //         user = res.data.user
    //         console.log(res)
            
    //     }else{
    //         console.log(res)
    //     }








    async register({commit}, user){
        try {
            const response = await axios.post('/api/register', user)
            .then((res) => {
                Toast.fire({
                    icon:'success',
                    title: res.data.message
                })
                
            }).catch((err) => {
                commit('authErr')
                console.log(err)
            });
            commit('authRequest')
        } catch (err) {
            Toast.fire({
                icon:'error',
                title: err
            })
        }
    },

    async logout({commit}){
        try {
            const response = await delete axios.defaults.headers.common['Authorization']
            commit('logout')
        } catch (err) {
            
        }
    }
}
const getters = {
    isloggedIn: state=> !!state.cookie,
    authStatus: state=>state.status
}

const mutations = {
    authRequest(state){
        state.status = 'loading'
    },
    authSuccess(state,cookie,user){
        state.status = 'success'
        state.cookie = cookie
        state.user = user
    },
    authErr(state){
        state.status = 'error'

    },

    logout(state){
        state.status = '',
        state.cookie = ''
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}