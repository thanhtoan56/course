import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueCookies)

const state = () => ({
    info_buyer: JSON.parse(localStorage.getItem('INFO_BUYER_BLOOD_SHOPPINGMALL')) || [],
})

const actions = {
    async InfoBuyer({ commit }) { return commit("infoBuyer") },
}
const mutations = {
    infoBuyer(state) { 
        state.info_buyer = JSON.parse(localStorage.getItem('INFO_BUYER_BLOOD_SHOPPINGMALL')); 
    } 
}

export default { state, mutations, actions }
