import Axios from "axios";
import router from "../../router";

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
}
const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
}
const actions = {
    async login({commit}, user){
        commit('authRequest')
        try {
           const response = await Axios.post('/api/login', user)
           if(response.data === undefined){
               Toast.fire({
                   icon:'question',
                   response:'what is going on here?'
               })
           }
           if(response.data.success){
               const token = response.data.token
               const user = response.data.user
               localStorage.setItem('token', token)
               Axios.defaults.headers.common['Authorization'] = token
               Toast.fire({
                   icon:'success',
                   title:response.data.message
                })
                commit('authSuccess', token, user)
           }
           else{
               Toast.fire({
                   icon:'warning',
                   title: response.data.message
               })
           }
           return response
       } catch (err) {
           commit('authErr', err)
           Toast.fire({
               icon:'error',
               title:err
            })
       }
        
    },
    async register({commit}, user){
        try {
            commit('registerRequest')
            let response = await axios.post('/api/register', user)
            if(response.data.success){
                router.push('/login')
                Toast.fire({
                    icon:'success',
                    title: response.data.message
                })
                commit('registerSuccess')
            }
            return response
        } catch (err) {
            commit('authErr', err)
            Toast.fire({
                icon:'error',
                title: err
            })
            return err
        }
    },

    async logout({commit}){
        try {
            await localStorage.removeItem('token');
            commit('logout');
            delete axios.defaults.headers.common['Authorization'];
            router.push('/login');
            return
        } catch (err) {
            commit('authErr')
            console.log(err)
        }
    }
}

const mutations = {
    authRequest(state) {
        state.error = null
        state.status = 'loading'
    },
    authSuccess(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    authErr(state, err) {
        state.error = err
    },
    registerRequest(state) {
        state.error = null
        state.status = 'loading'
    },
    registerSuccess(state) {
        state.error = null
        state.status = 'success'
    },
    registerError(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}