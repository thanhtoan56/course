<template>
  <div class="row">
    <notifications group="cate"/>
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom"><h6 class="m-0">List Users</h6></div>
        <div class="card-body p-0 pb-3 text-center">
          <div id="categories-table">
            <v-client-table :data="categories" :columns="columns" :options="options">
              <img v-if="props.row.image" slot="image" slot-scope="props" v-bind:src="$store.state.apiApp + 'categories/' + props.row.image" alt="" style="max-width: 100px">
              <div slot="update" slot-scope="props">
                <span @click="updateCategories(props.row)"><nuxt-link to="#">Update</nuxt-link></span>
                <span @click="deleteCategories(props.row.id_number)"><nuxt-link to="#">Delete</nuxt-link></span>
              </div>
            </v-client-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from "vue"
import axios from 'axios'
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

Vue.use(ClientTable);
Vue.use(VModal)
Vue.use(Notifications)

export default {
  data () {
    return {
      categories: [],
      page: 1,
      lengthCate: 2,
        columns: [ 'name_category', 'tags', 'image',"update"],
        options: {
          headings: {
            name_category: 'Name',
            tags: 'Tags'
          },
          sortable: ['name_category', 'tags'],
          filterable: ['name_category', 'tags']
        }
    }
  },
  created () {
    this.fetchData()

    this.$nuxt.$on('fetchData', data => { if (data === true) {this.fetchData()}})
  },
  methods:{
    fetchData(){
      axios.get(`${this.$store.state.apiLink}/categories/list-categories`)
      .then(res => { this.categories = res.data.data })
      .catch(err => console.log(err));
    },
    
    deleteCategories(idnumber){
      axios.post(`${this.$store.state.apiLink}/categories/remove-categories`,{"token":localStorage.token|| null,"id_number":idnumber})
      .then(data=>{
        if (data.data.successes) {
          this.$notify({group: 'cate',type: 'success', title: 'Notice',text: "Delete Successed"})
          this.fetchData()
        } else { this.$notify({group: 'cate',type: 'success', title: 'Notice',text: data.data.reason || "Delete not Successed"}) }
      })
      .catch(err=>{console.log(err)})
    },
    
    updateCategories(category){ this.$nuxt.$emit("updateCate",category) },
  }
};
</script>
