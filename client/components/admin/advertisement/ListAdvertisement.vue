<template>
  <div class="row">
    <notifications group="cate"/>
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom"><h6 class="m-0">List Advertisement</h6></div>
        <div class="card-body p-0 pb-3 text-center">
          <div id="categories-table">
            <v-client-table :data="categories" :columns="columns" :options="options">
              <img v-if="props.row.image_advertisement" slot="image_advertisement" slot-scope="props" v-bind:src="$store.state.apiApp + 'advertisements/' + props.row.image_advertisement" alt="" style="max-width: 100px">
              <div  slot="update" slot-scope="props">
                <span @click="updateAdvertisement(props.row)"><nuxt-link to="#">Update</nuxt-link></span>
                <span @click="deleteAdvertisement(props.row.id_number)"><nuxt-link to="#">Delete</nuxt-link></span>
              </div>
              <div  slot="posision" slot-scope="props">
                <div v-for="(data, index) in dataPositions" :key="index" v-if="data.id == Number(props.row.posision)">{{data.name}}</div>
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
      columns: ['name_advertisement', 'link', 'image_advertisement',"posision","update"],
      options: {
        headings: {
          name_category: 'Name',
          tags: 'Tags',
          image_advertisement: 'Image',
          posision: 'Posision',
        },
        sortable: ['name_advertisement', 'link'],
        filterable: ['name_advertisement', 'link'],
      },
      dataPositions:
      [
        {"id":1,"name":"Header"},
        {"id":2,"name":"Footer"},
        {"id":3,"name":"Content"},
        {"id":4,"name":"Sidebar"}
      ]
    }
  },
  created () {
    this.fetchData()
    
    this.$nuxt.$on('fetchData', (data) => { if (data === true) { this.fetchData() }})
  },
  methods:{
    
    fetchData(){
      axios.get(`${this.$store.state.apiLink}/advertisements/list-advertisement`)
      .then(res => { this.categories = res.data.data })
      .catch(err => console.log(err));
    },
    
    deleteAdvertisement(idnumber){
      axios.post(`${this.$store.state.apiLink}/advertisements/remove-advertisement`, {"token": localStorage.token || null, "id_number": idnumber})
      .then(data=>{
        if (data.data.successes) {
          this.$notify({group: 'cate',type: 'success', title: 'Notice',text: "Delete Successed"})
          this.fetchData()
        }
        else { this.$notify({group: 'cate',type: 'success', title: 'Notice',text: data.data.reason || "Delete not Successed"})}
      })
      .catch(err=>{ console.log(err)})
    },
    
    updateAdvertisement(category){ this.$nuxt.$emit("updateAdvertisement",category) },
  }
};
</script>
