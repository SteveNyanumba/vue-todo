import axios from 'axios'

const state = {
    status:'',
    user:{},
    cookie:'',
}
const actions = {
    login({commit}, user){
        commit('authRequest')
        axios.post('/api/login', {
            username: user.username,
            password:user.password
        })
        .then((res) => {
            if(res.data.success){
                console.log(res.data)
                const cookie = res.cookies.user_sid
                const user = req.session.user
                axios.defaults.headers.common['Authorization'] = cookie
                commit('authSuccess', cookie, user)
            }else{
                Toast.fire({
                    icon:'error',
                    title: res.data.message
                })
                commit('authErr')
            }
            
        }).catch((err) => {
            commit('authErr')
            console.log(err)
        });
    },

    register({commit}, user){
        commit('authRequest')
        axios.post('/api/register', user)
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            commit('authErr')
            console.log(err)
        });
    },

    logout({commit}){
        commit('logout')
        delete axios.defaults.headers.common['Authorization']
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