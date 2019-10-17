<template>
    <div class="page-header row no-gutters py-4">
    	<notifications group="categories" />
        <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
	        <span class="text-uppercase page-subtitle">Overview</span>
	        <h3 class="page-title">List Category</h3>
	        <div class="button-add-cate">
	            <button class="btn btn-primary" style="width: 150px!important;" @click="showPopupAddCate">Add Categories</button>
	        </div>
        </div>

	    <modal name="FormAddCategory" height="auto" :scrollable="true">
	        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
	          <div class="card-header border-bottom">
	            <h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Account Details</h6>
	          </div>
	          <ul class="list-group list-group-flush">
	            <li class="list-group-item p-3">
		            <div class="row">
		                <div class="col">
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      <label for="feFirstName">Name category</label>
			                      <input type="text" class="form-control" placeholder="Name category" v-model="name_category"/>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feLastName">Link</label>
			                      	<input type="text" class="form-control" placeholder="link" v-model="linkAccent" ref="link" readonly />
			                    </div>
		                  	</div>
		                  	<div class="form-row">
			                    <div class="form-group col-md-12">
			                      <label for="feFirstName" style="display: inline-block;width: 100%">Description</label>
			                      <textarea name="description" id="description" v-model="description" style="width: 100%;height: 100px;max-width: 100%;max-height: 100%;border: 1px solid #ddd"></textarea>
			                    </div>
		                  	</div>
		                  	<div class="form-row">
			                    <div class="form-group col-md-6" style="margin-bottom: 0;">
			                      	<label for="feInputAddress">image</label>
			                      	<input type="file" name="file" id="file">
			                      	<label for="feFirstName"></label>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feEmailAddress">tags</label>
			                      	<input type="email" class="form-control" placeholder="tags" v-model="tags"/>
			                    </div>
		                  	</div>
		                  	<div class="button-add-user">
		                    	<button class="btn btn-accent btn-danger" @click="hideFormAddUser()">Cancel</button>
		                    	<button class="btn btn-accent btn-primary" :disabled="!checkingButton" @click="addCategories">Add User</button>
		                  	</div>
		                </div>
		            </div>
	            </li>
	          </ul>
	        </div>
	    </modal>

	    <modal name="FormUpdateCategories" height="auto" :scrollable="true">
	        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
	          <div class="card-header border-bottom"> <h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Account Details</h6></div>
	          <ul class="list-group list-group-flush">
	            <li class="list-group-item p-3">
		            <div class="row">
		                <div class="col">
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      <label for="feFirstName">Name category</label>
			                      <input type="text" class="form-control" placeholder="Name category" v-model="dataUpdateCate.name_category" ref="categoriesUpdate"/>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feLastName">Link</label>
			                      	<input type="text" class="form-control" placeholder="link" v-model="linkAccentUpdate" ref="linkCategoriesUpdate" readonly />
			                    </div>
		                  	</div>
		                  	<div class="form-row">
			                    <div class="form-group col-md-12">
			                      <label for="feFirstName" style="display: inline-block;width: 100%">Description</label>
			                      <textarea name="description" id="description" ref="descriptionCateUpdate" v-model="dataUpdateCate.description" style="width: 100%;height: 100px;max-width: 100%;max-height: 100%;border: 1px solid #ddd"></textarea>
			                    </div>
		                  	</div>
		                  	<div class="form-row" style="margin-bottom: 20px;">
			                    <div class="form-group col-md-6" style="margin-bottom: 0">
			                      	<label for="feInputAddress">image</label>
			                      	<div class="checkButton-delete" v-if="!deleteImage">
				                      	<div class="img-update" v-if="dataUpdateCate.image">
				                      		<img style="max-width: 150px;" v-bind:src="$store.state.apiApp + 'categories/' + dataUpdateCate.image" alt="">
				                      		<button @click="removeImages(dataUpdateCate.id_number)" type="button" class="btn btn-danger" style="width: 110px;font-size: 12px">Remove image</button>
				                      	</div>
				                      	<div class="file" v-if="!dataUpdateCate.image">
				                      		<input type="file" name="file" id="file">
				                      	</div>
			                      	</div>
			                      	<div class="checkButton-delete" v-else>
				                      	<input type="file" name="file" id="file">
			                      	</div>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feEmailAddress">tags</label>
			                      	<input type="email" class="form-control" placeholder="tags" v-model="dataUpdateCate.tags" ref="tagsCateUpdate"/>
			                    </div>
		                  	</div>
		                  	<div class="button-add-user">
		                    	<button class="btn btn-accent btn-danger" @click="hideFormAddUser()">Cancel</button>
		                    	<button class="btn btn-accent btn-primary" @click="updateCategories(dataUpdateCate.id_number)">Update User</button>
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
    		name_category: "",
    		tags: "",
    		description: "",
    		dataUpdateCate: [],
    		deleteImage: false
    	}
    },
    created(){
    	this.$nuxt.$on("updateCate", data =>{
    		this.deleteImage = false
    		this.dataUpdateCate = data
    		this.$modal.show('FormUpdateCategories')
    	})
    },
    computed:{
    	checkingButton(){ return this.name_category && this.tags },
		
		linkAccent(){ return this.cleanAccents(this.name_category) },
		
		linkAccentUpdate(){ return this.cleanAccents(this.dataUpdateCate.name_category)},
    },
    methods:{
		
		showPopupAddCate(){ this.$modal.show('FormAddCategory'); },
		
		addCategories(){
			var formData = new FormData();
			var imagefile = document.querySelector('#file');
			formData.append("file", imagefile.files[0]);
			formData.append("name_category",this.name_category)
			formData.append("link",this.$refs.link.value)
			formData.append("tags",this.tags)
			formData.append("token",localStorage.token || null)
			formData.append("description",this.description)
			
			axios.post(`${this.$store.state.apiLink}/categories/add-categories`, formData, { headers:{'Content-Type': 'multipart/form-data'}})
		    .then(data => {
		    	if (data.data.success){
		    		this.$notify({group: 'categories',type: 'success', title: 'Notice',text: "Delete Successed"})
		    		this.$modal.hide('FormAddCategory');
		    		this.$nuxt.$emit("fetchData",true)
		    	} else { this.$notify({group: 'categories',type: 'success', title: 'Notice',text: data.data.reason||"Add not Successed"})}
	    		this.name_category = ""
	    		this.link = ""
	    		this.tags = ""
	    		this.description = ""
			})
			.catch(err => {console.log(err)})
    	},
		
		cleanAccents(str){
	    	if (str && str !== "") {
		        str= str.toLowerCase();
		        str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
		        str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
		        str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
		        str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
		        str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
		        str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
		        str= str.replace(/đ/g,"d");
		        str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
		        str= str.replace(/-+-/g,"-"); 
		        str= str.replace(/^\-+|\-+$/g,"");
	    	}
	    	return str
	    },
		
		hideFormAddUser(){
	    	this.$modal.hide('FormAddCategory');
	    	this.$modal.hide('FormUpdateCategories');
	    },
		
		removeImages(id){
	    	axios.post(`${this.$store.state.apiLink}/categories/remove-image`,{"token":localStorage.token || null,"id_number":id})
	    	.then(data => {
	    		if (data.data.successes) {
					this.$notify({group: 'categories',type: 'success', title: 'Notice',text: "Removed image !"})
					this.deleteImage = true
	    		} else { this.$notify({group: 'categories',type: 'error', title: 'Notice',text: data.data.reason||"Removed image not successes!"})}
	    	})
	    	.catch(err => {console.log(err)})
	    },
		
		updateCategories(id){
	    	const name_category = this.$refs.categoriesUpdate.value
			const link = this.$refs.linkCategoriesUpdate.value
			const description = this.$refs.descriptionCateUpdate.value
			const tags = this.$refs.tagsCateUpdate.value
			var formData = new FormData();
			var imagefile = document.querySelector('#file');
			
			if (imagefile !== null && imagefile.files.length > 0) {formData.append("file", imagefile.files[0]);}
			
			formData.append("name_category",name_category)
			formData.append("id_number",id)
			formData.append("link",link)
			formData.append("tags",description)
			formData.append("token",localStorage.token || null)
			formData.append("description",description)
		    axios.post(`${this.$store.state.apiLink}/categories/update-categories`, formData, { headers: {'Content-Type': 'multipart/form-data'}
		    })
		    .then(data =>{
		    	this.hideFormAddUser()
		    	if (data.data.successes === true) {
		    		this.$notify({group: 'categories',type: 'success', title: 'Notice',text: "Update category successes !"})
    				this.$nuxt.$emit('fetchData',true)
		    	} else { this.$notify({group: 'categories',type: 'error', title: 'Notice',text: data.data.reason||"Update category no successes!"}) }
			})
			.catch(err => { this.hideFormAddUser() })
	    }
    },
}
</script>