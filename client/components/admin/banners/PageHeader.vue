<template>
    <div class="page-header row no-gutters py-4">
    	<notifications group="banner" />
        <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
	        <span class="text-uppercase page-subtitle">Overview</span>
	        <h3 class="page-title">Banner</h3>
	        <button type="button" class="btn btn-primary" style="margin: 10px 0 0" @click="addBanner">Add banner</button>
        </div>
	    <modal name="FormAddBanner" height="auto" :scrollable="true">
	        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
	          <div class="card-header border-bottom">
	            <h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Banner Details</h6>
	          </div>
	          <ul class="list-group list-group-flush">
	            <li class="list-group-item p-3">
		            <div class="row">
		                <div class="col">
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      <label for="feFirstName">Name banner</label>
			                      <input type="text" class="form-control" placeholder="Name banner" v-model="name_banner" ref="categoriesUpdate"/>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feLastName">Link</label>
			                      	<input type="text" class="form-control" placeholder="link" v-model="link" ref="link" />
			                    </div>
		                  	</div>
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      	<label for="feFirstName" style="display: inline-block;width: 100%">Type</label>
			                      	<select name="type" id="type" ref="position" style="width: 100%;height: 38px;border: 1px solid #ddd;border-radius: 4px">
			                      	<option value="0">Please select position</option>
			                      	<option value="1">Slider</option>
			                      	<option value="2">Banner</option>
			                      	</select>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feFirstName" style="display: inline-block;width: 100%">Image</label>
			                      	<input type="file" name="fileAdd" id="fileAdd">
			                    </div>
		                  	</div>
		                  	<div class="button-add-user">
		                    	<button class="btn btn-accent btn-danger" @click="hideFormBanner()">Cancel</button>
		                    	<button class="btn btn-accent btn-primary" @click="addBannerSubmit">Add banner</button>
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
import Vue from "vue";
import axios from "axios";
import Notifications from 'vue-notification';
import VModal from 'vue-js-modal';

Vue.use(VModal);
Vue.use(Notifications)

export default {
    data(){
    	return {
    		name_banner: "",
    		link: "",
    	}
    },
    methods:{
    	addBanner(){ this.$modal.show('FormAddBanner'); },
		
		addBannerSubmit(){
    		if (this.name_banner !== "" && this.link !== "") {
				var formData = new FormData();
				var imagefile = document.querySelector('#fileAdd');
				
				if (imagefile !== "" && imagefile !== null) { formData.append("image_banner", imagefile.files[0]); }
				else { formData.append("image_banner", "");	}
				
				formData.append("name_banner",this.name_banner)
				formData.append("url",this.link)
				formData.append("type",this.$refs.position.value)
				formData.append("token",localStorage.token || null)
				
				axios.post(`${this.$store.state.apiLink}/banners/add-banner`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
				.then( data => {
			    	if (data.data.successes) {
			    		this.$notify({group: 'banner',type: 'success', title: 'Notice',text:"Add banner Successed"})
			    		this.hideFormBanner()
			    		this.$nuxt.$emit("loadApiBanner",true)
			    	} else { this.$notify({group: 'banner',type: 'error', title: 'Notice',text: data.data.reason || "Add banner no success"})}
				})
				.catch(err=>{ console.log(err)})
    		} else { this.$notify({group: 'banner',type: 'error', title: 'Notice',text: data.data.reason || "Enter your full information"})}
    	},
		
		hideFormBanner(){ this.$modal.hide('FormAddBanner');}
    }
}
</script>