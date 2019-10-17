import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueCookies)

const state = () => ({
    historySeen: JSON.parse(localStorage.getItem('HISTORY_BLOOD_SHOPPINGMALL')) || [],
})

const actions = {
    async HistorySeen({ commit }) { return commit("listHistorySeen") },
    async DeleteHistorySeen({ commit }) { return commit("deleteListHistorySeen") },
}
const mutations = {
    listHistorySeen(state) { state.historySeen = JSON.parse(localStorage.getItem('HISTORY_BLOOD_SHOPPINGMALL')); }, 
    deleteListHistorySeen(state) { 
        state.historySeen = [] 
        localStorage.removeItem('HISTORY_BLOOD_SHOPPINGMALL'); 
    } 
}

export default { state,mutations,actions }
