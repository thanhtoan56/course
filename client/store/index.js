import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vuex);

export let state = () => ({

    // apiLink: "http://localhost:8000/api",
    // apiApp: "http://localhost:8000/", 

    apiLink: "https://server-course-19-20.herokuapp.com/api",
    apiApp: "https://server-course-19-20.herokuapp.com/", 
    
    userInfo: [],
    dataAdds: [],
    buttonOrder: 0,

    count: 0,
    pages: 0,
    pageCurrent: 0,
    userNotification: [],
})

const actions = {
  
  // notification: ({commit, state}, offset) => {
  //   axios.post(`${state.apiLink}/payments/notification`, { "token": localStorage.token, "offset": offset != 0 && offset != null && offset != "" && offset != undefined ? offset : 1})
  //   .then(data => {  commit('GET_NOTIFICATIONS', data.data, offset); })
  // },

  loginUser:({commit, state}, dataLogin) =>{
    axios.post(`${state.apiLink}/users/user-info`,{ "token": dataLogin || null })
    .then(data => { 
      commit('SET_USER', data.data); 
    })
    .catch( err => { commit('OUT_USER', true); })
  },

  clearAutUser:({commit}, authUser) => { commit("CLEAR_AUTH_USER") },
  
  storeAdve({ commit }, data = {}) { commit("ADD_STORE_ADVISE", { data }) },
  
  buttonOrder({commit}){ commit("showButtonOrder") },

  buttonUpdateOrder({commit}){ commit("showButtonUpdateOrder") },
};

const mutations = {
  
  // GET_NOTIFICATIONS ( state, data, offset) { 
  //   if(data.data && data.data != "") { 
  //     state.pageCurrent = offset
  //     state.count = data.count
  //     state.pages = Math.ceil(data.count/5)
  //     state.userNotification = data.data 
  //   }
  //   else state.userNotification = [] 
  // },

  SET_USER (state, authUser) { state.userInfo = authUser },

  OUT_USER(state,authUser){
  	if (authUser === true) { localStorage.clear() }
    state.userInfo = []
  },
  
  CLEAR_AUTH_USER(state, authUser){
    state.userInfo = {"successes" : false}
    
    axios.post(`${state.apiLink}/user/logout`, {"token":localStorage.token || null})
    .then(data=> {})
    .catch(err => {});
    localStorage.clear()
  }, 
   
  ADD_STORE_ADVISE(state, dataAdd){ state.dataAdds = dataAdd.data },

  showButtonOrder(state){ state.buttonOrder = 0 }, // = 0

  showButtonUpdateOrder(state){ state.buttonOrder =  1 }, // = 1
}
const getters = {
  authentication(state) { return state.userInfo.successes }
}

export default { state, mutations, actions, getters}