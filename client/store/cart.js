import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vuex)

const state = () => ({
    arrayCart: JSON.parse($cookies.get("cart")) || [],
    cartNumber:0,
    countProduct: 0,
})

const actions = {
    async addCart({ commit }, data) { return commit("counterCart", data) },
    
    async cartDispath({commit}){ return commit("counterCartDispath") },

    async cartDispathOnce({commit}){ return commit("counterCartDispathOnce") },
}

const mutations = {
    counterCart(state, data) { 
        state.arrayCart =  data
        for(let i = 0; i < data.length; i ++){ state.countProduct += data[i].quantity;  }
    },
    
    counterCartDispath(state){
    	if (state.arrayCart !== "") {
            for (var i = 0; i < state.arrayCart.length; i++) { state.cartNumber += state.arrayCart[i].quantity }
    	}
    },

    cartDispathOnce(state){ state.arrayCart = state.arrayCart + 1 },
}

export default { state, mutations, actions }
