import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

axios.defaults.timeout = 30000

export default async function ({store, route }) {
  await axios.post(`${store.state.apiLink}/user/user-info`,{ "token":localStorage.token || null })
  .then(data => { 
    store.dispatch('notification');
    store.commit('SET_USER', data.data);

  })
  .catch(err=> { store.commit('OUT_USER', true); })
}
