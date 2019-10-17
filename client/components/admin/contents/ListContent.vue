<template>
  <div class="row">
    <notifications group="contentDelete" />
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom"><h6 class="m-0">Active Content</h6></div>
        <div class="card-body p-0 pb-3 text-center">
          <table class="table mb-0">
            <thead class="bg-light">
              <tr>
                <th scope="col" class="border-0">#</th>
                <th scope="col" class="border-0">Name Content</th>
                <th scope="col" class="border-0">Category</th>
                <th scope="col" class="border-0">Image</th>
                <th scope="col" class="border-0">Edit</th>
              </tr>
            </thead>
            <tbody v-for="(content, index) in contents" :key="index">
              <tr>
                <td>{{contents.indexOf(content) + 1 }}</td>
                <td v-bind:title=content.name_content>{{content.name_content | truncate(30)}}</td>
                <td>{{content.cate}}</td>
                <td><img v-bind:src="$store.state.apiApp + 'contents/' + content.image_content" v-if="content.image_content" alt="" style="max-width: 80px"></td>
                <td>
                  <span @click="activeDetailContent(content)"><a href="#" >Update</a></span>
                  <span @click="deleteContent(content.id_number)"><nuxt-link to="#">Delete</nuxt-link></span>
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

import Vue from "vue";
import axios from 'axios'
import SlimDialog from 'v-slim-dialog'
import Notifications from 'vue-notification';
import VueTruncate from "vue-truncate-filter"
import 'v-slim-dialog/dist/v-slim-dialog.css'

Vue.use(SlimDialog)
Vue.use(VueTruncate)
Vue.use(Notifications);

export default {
  data() {
    return {
      contents: [],
    }
  },
  created(){
    this.fetchData()
  },
  mounted(){
    this.$nuxt.$on("showUpdate",data => { if (data === true) { setTimeout(this.showNoticeUpdate, 100)}})
  },
  methods:{
    activeDetailContent(content){
      this.$root.$router.push({ path: `/admin/contents/detail/${content.link}`});
    },
    fetchData(){
      axios.get(`${this.$store.state.apiLink}/contents/list-contents`)
      .then( res =>  this.contents = res.data.data )
      .catch(err => console.log(err))
    },
    
    deleteContent(id){
      const options = {title: 'Notice.', cancelLabel: 'No'}
      this.$dialogs.confirm('Do yo want remove content ?', options)
      .then(res => {
        if (res.ok === true) {
          axios.post(`${this.$store.state.apiLink}/contents/remove-content`, { "token":localStorage.token || null, "id_number":id })
          .then(data =>{
            if (data.data.successes) {
              this.$notify({group: 'contentDelete',type: 'success', title: 'Notice',text: "Delete content success"})
              this.fetchData()
            } else { this.$notify({group: 'contentDelete',type: 'success', title: 'Notice',text: data.data.reason || "Delete content no success"})}
          })
          .catch(err => {console.log(err)})
        }
      })
    },
    
    showNoticeUpdate(){ this.$notify({group: 'contentDelete',type: 'success', title: 'Notice',text: "Update Successfully !"})}
  }
};
</script>
