<template>
  <div class="row">
    <notifications group="mainBanner" />
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom">
          <h6 class="m-0">List Users</h6>
        </div>
        <div class="card-body p-0 pb-3 text-center">
          <table class="table mb-0">
            <thead class="bg-light">
              <tr>
                <th scope="col" class="border-0">ID</th>
                <th scope="col" class="border-0">Name</th>
                <th scope="col" class="border-0">Image</th>
                <th scope="col" class="border-0">Type</th>
                <th scope="col" class="border-0">Edit</th>
              </tr>
            </thead>
            <tbody v-for="(banner, index) in banners" :key="index">
              <tr>
                <td>{{banner.id_number}}</td>
                <td>{{banner.name_banner}}</td>
                <td><img v-bind:src="$store.state.apiApp + 'banners/' + banner.image_banner" alt="" style="max-width: 200px;"></td>
                <td>{{banner.type == 1 ? 'Slider' : "banner"}}</td>
                <td>
                  <span @click="updateBanner(banner)"><nuxt-link to="#">Update</nuxt-link></span>
                  <span @click="deleteBanner(banner.id_number)"><nuxt-link to="#">Delete</nuxt-link></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
        
    <modal name="FormAddBannerUpdate" height="auto" :scrollable="true">
      <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
        <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Banner Details</h6></div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item p-3">
            <div class="row">
                <div class="col">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feFirstName">Name banner</label>
                        <input type="text" class="form-control" placeholder="Name banner" v-model="dataBanner.name_banner" ref="name_banner"/>
                      </div>
                      <div class="form-group col-md-6">
                          <label for="feLastName">Link</label>
                          <input type="text" class="form-control" placeholder="link" v-model="dataBanner.url" ref="url_banner" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feFirstName" style="display: inline-block;width: 100%">Type</label>
                        <select name="type" id="type" ref="positionUpdate" style="width: 100%;height: 38px;border: 1px solid #ddd;border-radius: 4px">
                          <option value="0">Please select position</option>
                          <option v-for="(type, index) in types" :key="index" :value="type.id" :selected="type.id == dataBanner.type">{{type.name}}</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="feFirstName" style="display: inline-block;width: 100%">Image</label>
                        <div class="image-banner-had" v-if="!removeBannerImg">
                          <div class="had-file" v-if="dataBanner.image_banner">
                            <img v-bind:src="$store.state.apiApp + 'banners/' + dataBanner.image_banner" alt="" style="max-width: 100px">
                            <button type="button" class="btn btn-danger" @click="removeImageBanner(dataBanner.id_number)">Remove Image</button>
                          </div>
                          <div class="havnotfile" v-else>
                            <input type="file" name="fileUpdate" id="fileUpdate">
                          </div>
                        </div>
                        <div class="not-file-hav" v-else>
                          <input type="file" name="fileUpdate" id="fileUpdate">
                        </div>
                      </div>
                    </div>
                    <div class="button-add-user">
                      <button class="btn btn-accent btn-danger" @click="hideFormBanner()">Cancel</button>
                      <button class="btn btn-accent btn-primary" @click="UpdateBannerSubmit(dataBanner.id_number)" style="width: auto">Update banner</button>
                    </div>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </modal>
  </div>
</template>
<script>
import Vue from "vue"
import axios from 'axios'
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(Notifications);

export default {
  data () {
    return {
      banners: [],
      showPopupBanner: false,
      dataBanner: [],
      removeBannerImg: false,
      types: 
      [ 
        { "id": "1", "name": "Slider" },
        { "id": "2", "name": "Banner" }
      ],
    }
  },
  created () {
    this.fetchDataBanner()
    
    this.$nuxt.$on("loadApiBanner", data => { if (data === true) { this.fetchDataBanner() } })
  },
  methods:{
    fetchDataBanner(){
      axios.get(`${this.$store.state.apiLink}/banners/list-banners`)
      .then(res => this.banners = res.data.data)
      .catch(err => console.log(err));
    },
    
    deleteBanner(id){
      axios.post(`${this.$store.state.apiLink}/banners/remove-banner`,{"token":localStorage.token || null , "id_number":id})
      .then(data => {
        if (data.data.successes) {
          this.$notify({group: 'mainBanner',type: 'success', title: 'Notice',text: "Removed banner !"})
          this.fetchDataBanner()
        }
        else { this.$notify({group: 'mainBanner',type: 'error', title: 'Notice',text: data.data.reason || "Remove banner error !"}) }
      })
      .catch(err => {console.log(err)})
    },
    
    hideFormBanner(){ this.$modal.hide('FormAddBannerUpdate'); },

    updateBanner(banner){
      this.dataBanner = banner
      this.showPopupBanner = !this.showPopupBanner
      this.$modal.show('FormAddBannerUpdate');
    },
    
    UpdateBannerSubmit(id){
      if (this.name_banner !== "" && this.link !== "") {
        var formData = new FormData();
        var imagefile = document.querySelector('#fileUpdate');
        
        if (imagefile !== "" && imagefile !== null) { formData.append("image_banner", imagefile.files[0]); }
        else { formData.append("image_banner", "");  }
        
        formData.append("name_banner",this.$refs.name_banner.value)
        formData.append("id_number",id)
        formData.append("url",this.$refs.url_banner.value)
        formData.append("type",this.$refs.positionUpdate.value)
        formData.append("token",localStorage.token || null)
        
        axios.post(`${this.$store.state.apiLink}/banners/update-banner`, formData, { headers:{'Content-Type': 'multipart/form-data'}})
        .then( data => {
          if (data.data.successes) {
            this.$notify({group: 'mainBanner',type: 'success', title: 'Notice',text:"Add banner Successed"})
            this.hideFormBanner()
            this.$nuxt.$emit("loadApiBanner",true)
          } else { this.$notify({group: 'mainBanner',type: 'error', title: 'Notice',text: data.data.reason || "Add banner no success"})}
        })
        .catch( err => { console.log(err) })
      } else { this.$notify({group: 'mainBanner',type: 'error', title: 'Notice',text: data.data.reason || "Enter your full information"})}
    },

    removeImageBanner(id){
      axios.post(`${this.$store.state.apiLink}/banners/remove-image`,{
        "token":localStorage.token || null,
        "id_number":id
      })
      .then(data => {
        if (data.data.successes) {
          this.$notify({group: 'mainBanner',type: 'success', title: 'Notice',text:"Removed Image"})
          this.removeBannerImg = !this.removeBannerImg
        } else { this.$notify({group: 'mainBanner',type: 'error', title: 'Notice',text: data.data.reason || "Remove Image no success"})}
      })
      .catch(err => { console.log(err) })
    }
  }
};
</script>
