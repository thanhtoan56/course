<template>
  <div class="row">
    <notifications group="tags"/>
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom"><h6 class="m-0">List Tags</h6></div>
        <div class="card-body p-0 pb-3 text-center">
          <table class="table mb-0">
            <thead class="bg-light">
              <tr>
                <th scope="col" class="border-0">#</th>
                <th scope="col" class="border-0">Name</th>
                <th scope="col" class="border-0">Link</th>
                <th scope="col" class="border-0">Edit</th>
              </tr>
            </thead>
            <tbody v-for="(tag, index) in tags" :key="index">
              <tr>
                <td>{{tags.indexOf(tag) + 1 }}</td>
                <td>{{tag.name_tag}}</td>
                <td><nuxt-link to="">{{tag.link}}</nuxt-link></td>
                <td>
                  <span @click="updateTags(tag)"><nuxt-link to="#">Update</nuxt-link></span>
                  <span @click="deleteTags(tag.id_number)"><nuxt-link to="#">Delete</nuxt-link></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import axios from 'axios'
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';

Vue.use(VModal);
Vue.use(Notifications);

export default {
  data () {
    return {
      tags: [],
    }
  },
  created () {
    this.fetchData()
    
    this.$nuxt.$on('fetchData', (data) => { if (data === true) { this.fetchData() }})
  },
  methods:{
    fetchData(){
      axios.get(`${this.$store.state.apiLink}/tags/list-tags`)
      .then(res => this.tags = res.data.data)
      .catch(err => console.log(err));
    },
    
    deleteTags(idnumber){
      axios.post(`${this.$store.state.apiLink}/tags/remove-tag`,{"token":localStorage.token|| null,"id_number":idnumber})
      .then(data => {
        if (data.data.successes === true) {
          this.$notify({group: 'cate',type: 'success', title: 'Notice',text: "Delete Successed"})
          this.fetchData()
        } else { this.$notify({group: 'cate',type: 'success', title: 'Notice',text: data.data.reason || "Delete not Successed"}) }
      })
      .catch(err=>{ console.log(err)})
    },
    
    updateTags(tag){ this.$nuxt.$emit("updateTag",tag) }
  }
};
</script>
