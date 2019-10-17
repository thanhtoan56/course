<template>
  <div class="main-content-container container-fluid px-4">
    <notifications group="products" />
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Add Many Image</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-small mb-4">

          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
              <div class="row">
                <div class="col">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="feFirstName">Images</label>
                        <input type="file" id="images" v-if="uploadReady" ref="fileupload" multiple/>
                      </div>
                    </div>
                    <button type="button" class="btn btn-success" @click="addImages">Add</button>
                    <button type="button" class="btn btn-primary" @click="saveImages">Save</button>
                  </form>
                </div>
              </div>
            </li>
          </ul>
          <div class="list-img">
            <ul>
              <li v-for="(data, index) in arrImage" :key="index">
                <img v-bind:src="$store.state.apiApp + 'images/products/' + data.filename" alt="">
                <span class="close close-image" @click="deleteIMG(data._id)">X</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Notifications from 'vue-notification';
import mixinDecentralize from '~/functions/decentralize'

Vue.use(Notifications);
export default {
  layout:"admin",
  mixins: [mixinDecentralize],
  data(){
    return {
      arrImage: [],
      linkProduct: 0,
      idProduct: 0,
      uploadReady: true
    }
  },
  
  created(){

    this.linkProduct = this.$route.params.id
    
    this.fetchDataImage()
  },
  methods:{
    addImages(){
      var formData = new FormData();
      var imagefile = document.querySelector('#images');

      if (imagefile && imagefile !== "" && imagefile !== undefined && imagefile !== null) {
        for( var i = 0; i < imagefile.files.length; i++ ){
          formData.append('files', imagefile.files[i]);
        }
        formData.append("id_product", this.linkProduct);
        formData.append("token",localStorage.token || null)
      }
      axios.post(`${this.$store.state.apiLink}/images/add-images`,formData).then(data =>{
        if (data.data.successes) {
          this.fetchDataImage()
          this.uploadReady = false
          this.$nextTick( () => { this.uploadReady = true })
          this.$notify({group: 'products', title: 'Notice',text: "Add images is success",type: 'success'})
        } else { this.$notify({group: 'products',type: 'error', title: 'Notice',text: data.data.reason || "Update no success"}) }
      })
      .catch(err => { console.log(err) })
    },
    
    saveImages(){
      this.$notify({group: 'products', title: 'Notice',text: "Save images and Update is success",type: 'success'})
      setTimeout(() => { this.$router.back() }, 1000)
    },

    fetchDataImage(){
      axios.get(`${this.$store.state.apiLink}/products/${this.$route.params.id}`)
      .then(data => {
        if (data.data.successes) {
          this.arrImage = data.data.data[0].infoImages
          this.idProduct = data.data.data[0].id_number
        }
      })
      .catch(err => { console.log(err) })
    },

    deleteIMG(id){
      axios.post(`${this.$store.state.apiLink}/images/remove-image-product`,{ "token":localStorage.token || null, "id_product":this.idProduct, "_id":id })
      .then(data => {
        if(!data.data.successes){ return this.$notify({group: 'products',type: 'error', title: 'Notice',text: data.data.reason || "Remove no success"}) }
        this.$notify({group: 'products',type: 'success', title: 'Notice',text: "Remove Successfully"})
        this.fetchDataImage()
      })
      .catch(err => { console.log(err) })
    },
  },
}
</script>