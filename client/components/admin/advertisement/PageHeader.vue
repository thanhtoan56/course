<template>
    <div class="page-header row no-gutters py-4">
    	<notifications group="advertisement" />
        <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
	        <span class="text-uppercase page-subtitle">Overview</span>
	        <h3 class="page-title">List Advertisement</h3>
	        <div class="button-add-cate">
	            <button class="btn btn-primary" @click="showPopupAddCate">Add Advertisement</button>
	        </div>
        </div>

	    <modal name="FormAddAdvertisement" height="auto" :scrollable="true">
	        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
	          <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Advertisement Details</h6></div>
	          <ul class="list-group list-group-flush">
	            <li class="list-group-item p-3">
		            <div class="row">
		                <div class="col">
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      <label for="feFirstName">Name Advertisement</label>
			                      <input type="text" class="form-control" placeholder="Name Advertisement" v-model="name_advertisement"/>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feLastName">Link</label>
			                      	<input type="text" class="form-control" placeholder="link" v-model="link" />
			                    </div>
		                  	</div>
		                  	<div class="form-row">
			                    <div class="form-group col-md-6" style="margin-bottom: 0;">
			                      	<label for="feInputAddress">Posision</label>
			                      	<select name="position" v-model="position" id="position" style="width: 100%;display: inline-block;height: 40px;border: 1px solid #ccc">
			                      		<option value="0">Please select position</option>
			                      		<option v-for="option in positionArr" v-bind:key="option.id" :value="option.id">{{option.name}}</option>
			                      	</select>
			                    </div>

			                    <div class="form-group col-md-6" style="margin-bottom: 0;">
			                      	<label for="feInputAddress">image</label>
			                      	<input type="file" name="file" id="file">
			                      	<label for="feFirstName"></label>
			                    </div>
		                  	</div>
		                  	<div class="button-add-user">
		                    	<button class="btn btn-accent btn-danger" @click="hideFormAdvertisement()">Cancel</button>
		                    	<button class="btn btn-accent btn-primary" :disabled="!checkingButton" @click="addAdvertisement" style="width: auto">Add Advertisement</button>
		                  	</div>
		                </div>
		            </div>
	            </li>
	          </ul>
	        </div>
	    </modal>

	    <modal name="FormUpdateAdvertisement" height="auto" :scrollable="true">
	        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
	          <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Account Details</h6></div>
	          <ul class="list-group list-group-flush">
	            <li class="list-group-item p-3">
		            <div class="row">
		                <div class="col">
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      <label for="feFirstName">Name Advertisement</label>
			                      <input type="text" class="form-control" placeholder="Name Advertisement" v-model="dataAdvertisement.name_advertisement" ref="AdvertisementUpdate"/>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feLastName">Link</label>
			                      	<input type="text" class="form-control" placeholder="link" ref="linkAdvertisementUpdate" v-model="dataAdvertisement.link"/>
			                    </div>
		                  	</div>
		                  	<div class="form-row" style="margin-bottom: 20px;">
			                    <div class="form-group col-md-6" style="margin-bottom: 0;">
			                      	<label for="feInputAddress">Posision</label>
			                      	<select name="position" v-model="dataAdvertisement.posision" ref="positionAdvertisementUpdate" id="position" style="width: 100%;display: inline-block;height: 40px;border: 1px solid #ccc">
			                      		<option value="0">Please select position</option>
			                      		<option v-for="option in positionArr" v-bind:key="option.id" :selected="option.id == dataAdvertisement.posision" :value="option.id">{{option.name}}</option>
			                      	</select>
			                    </div>
			                    <div class="form-group col-md-6" style="margin-bottom: 0">
			                      	<label for="feInputAddress">image</label>
			                      	<div class="checkButton-delete" v-if="!deleteImage">
				                      	<div class="img-update" v-if="dataAdvertisement.image_advertisement">
				                      		<img style="max-width: 150px;" v-bind:src="$store.state.apiApp + 'advertisements/' + dataAdvertisement.image_advertisement" alt="">
				                      		<button @click="removeImages(dataAdvertisement.id_number)" type="button" class="btn btn-danger" style="width: 110px;font-size: 12px">Remove image</button>
				                      	</div>
				                      	<div class="file" v-if="!dataAdvertisement.image_advertisement">
				                      		<input type="file" name="file" id="file">
				                      	</div>
			                      	</div>
			                      	<div class="checkButton-delete" v-else>
				                      	<input type="file" name="file" id="file">
			                      	</div>
			                    </div>
		                  	</div>
		                  	<div class="button-add-user">
		                    	<button class="btn btn-accent btn-danger" @click="hideFormAdvertisement()">Cancel</button>
		                    	<button class="btn btn-accent btn-primary" @click="updateAdvertisement(dataAdvertisement.id_number)" style="width: auto;">Update Advertisement</button>
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
Vue.use(Notifications);

export default {
    data(){
    	return{
    		name_advertisement: "",
    		link: "",
    		position: 0,
    		dataAdvertisement: [],
			linkAdd: "",
			deleteImage: false,
			linkUpdate: "",
			positionArr:
			[
				{"id":1,"name":"Header"},
				{"id":2,"name":"Footer"},
				{"id":3,"name":"Content"},
				{"id":4,"name":"Sidebar"}
			]
    	}
    },
    created(){
    	this.$nuxt.$on("updateAdvertisement",data =>{
    		this.dataAdvertisement = data
    		this.$modal.show('FormUpdateAdvertisement')
    		this.deleteImage = false
    	})
    },
    computed:{
    	checkingButton(){ return this.name_advertisement},
    },
    methods:{
    	showPopupAddCate(){ this.$modal.show('FormAddAdvertisement');},
		
		addAdvertisement(){
			var formData = new FormData();
			var imagefile = document.querySelector('#file');
			formData.append("file", imagefile.files[0]);
			formData.append("name",this.name_advertisement)
			formData.append("link",this.link)
			formData.append("token",localStorage.token || null)
			formData.append("posision",this.position)
		    axios.post(`${this.$store.state.apiLink}/advertisements/add-advertisement`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
		    .then(data => {
		    	if (data.data.success) {
		    		this.$notify({group: 'advertisement',type: 'success', title: 'Notice',text: "Delete Successed"})
		    		this.$modal.hide('FormAddAdvertisement');
		    		this.$nuxt.$emit("fetchData",true)
				}
				else { this.$notify({group: 'advertisement',type: 'success', title: 'Notice',text: data.data.reason||"Add not Successed"})}
	    		this.name_advertisement = ""
	    		this.link = ""
	    		this.tags = ""
	    		this.position = ""
			})
			.catch(err => { console.log(err)})
    	},
		
		hideFormAdvertisement(){
	    	this.$modal.hide('FormAddAdvertisement');
	    	this.$modal.hide('FormUpdateAdvertisement');
	    },
		
		removeImages(id){
	    	axios.post(`${this.$store.state.apiLink}/advertisements/remove-image`,{"token":localStorage.token || null,"id_number":id})
	    	.then(data => {
	    		if (data.data.successes) {
					this.$notify({group: 'advertisement',type: 'success', title: 'Notice',text: "Removed image !"})
					this.deleteImage = true
				}
				else { this.$notify({group: 'advertisement',type: 'error', title: 'Notice',text: data.data.reason||"Removed image not successes!"})}
	    	})
	    	.catch(err => { console.log(err)})
	    },
		
		updateAdvertisement(id){
	    	const name_advertisement = this.$refs.AdvertisementUpdate.value
			const link = this.$refs.linkAdvertisementUpdate.value
			const position = this.$refs.positionAdvertisementUpdate.value
			var formData = new FormData();
			var imagefile = document.querySelector('#file');
			if (imagefile !== null && imagefile.files.length > 0) {
				formData.append("file", imagefile.files[0]);
			}
			formData.append("name",name_advertisement)
			formData.append("id_number",id)
			formData.append("link",link)
			formData.append("token",localStorage.token || null)
			formData.append("posision",position)
		    axios.post(`${this.$store.state.apiLink}/advertisements/update-advertisement`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
		    .then(data => {
		    	this.hideFormAdvertisement()
		    	if (data.data.successes) {
		    		this.$notify({group: 'advertisement',type: 'success', title: 'Notice',text: "Update Advertisement successes !"})
    				this.$nuxt.$emit('fetchData',true)
				}
				else { this.$notify({group: 'advertisement',type: 'error', title: 'Notice',text: data.data.reason||"Update Advertisement no successes!"})}
			})
			.catch(err =>{ this.hideFormAdvertisement() })
	    }
    },
}
</script>