<template>
    <div class="page-header row no-gutters py-4">
    	<notifications group="tags" />
        <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
	        <span class="text-uppercase page-subtitle">Overview</span>
	        <h3 class="page-title">List Tags</h3>
	        <div class="button-add-cate">
	            <button class="btn btn-primary" style="width: 150px!important;" @click="showPopupAddTag">Add Tag</button>
	        </div>
        </div>
	    <modal name="FormAddtag" height="auto" :scrollable="true">
	        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
	          <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Tag Details</h6></div>
	          <ul class="list-group list-group-flush">
	            <li class="list-group-item p-3">
		            <div class="row">
		                <div class="col">
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      <label for="feFirstName">Name tag</label>
			                      <input type="text" class="form-control" placeholder="Name tag" v-model="name_tag"/>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feLastName">Link</label>
			                      	<input type="text" class="form-control" placeholder="link" v-model="link" />
			                    </div>
		                  	</div>
		                  	<div class="button-add-user">
		                    	<button class="btn btn-accent btn-danger" @click="hideFormAddUser()">Cancel</button>
		                    	<button class="btn btn-accent btn-primary" :disabled="!checkingButton" @click="addTag">Add tag</button>
		                  	</div>
		                </div>
		            </div>
	            </li>
	          </ul>
	        </div>
	    </modal>
	    <modal name="FormUpdatetags" height="auto" :scrollable="true">
	        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
	          <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Tag Details</h6></div>
	          <ul class="list-group list-group-flush">
	            <li class="list-group-item p-3">
		            <div class="row">
		                <div class="col">
		                  	<div class="form-row">
			                    <div class="form-group col-md-6">
			                      <label for="feFirstName">Name tag</label>
			                      <input type="text" class="form-control" placeholder="Name tag" v-model="dataUpdateTag.name_tag" ref="tagsUpdate"/>
			                    </div>
			                    <div class="form-group col-md-6">
			                      	<label for="feLastName">Link</label>
			                      	<input type="text" class="form-control" placeholder="link" v-model="dataUpdateTag.link" ref="linktagsUpdate" />
			                    </div>
		                  	</div>

		                  	<div class="button-add-user">
		                    	<button class="btn btn-accent btn-danger" @click="hideFormAddUser()">Cancel</button>
		                    	<button class="btn btn-accent btn-primary" @click="updatetags(dataUpdateTag.id_number)">Update tag</button>
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
import axios from "axios"
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'

Vue.use(VModal)
Vue.use(Notifications)

export default {
    data(){
    	return{
    		name_tag: "",
    		link: "",
    		dataUpdateTag: [],
    	}
    },
    created(){
    	this.$nuxt.$on("updateTag",data =>{
    		this.dataUpdateTag = data
    		this.$modal.show('FormUpdatetags')
    	})
    },
    computed:{
    	checkingButton(){ return this.name_tag && this.link},
    },
    methods:{
    	showPopupAddTag(){ this.$modal.show('FormAddtag')},
		
		addTag(){
		    axios.post(`${this.$store.state.apiLink}/tags/add-tag`, {
		    	"token":localStorage.token || null,
		    	"name_tag":this.name_tag,
		    	"link":this.link
		    })
		    .then(data=>{
		    	if (data.data.successes) {
		    		this.$notify({group: 'tags',type: 'success', title: 'Notice',text: "Delete Successed"})
		    		this.$modal.hide('FormAddtag')
		    		this.$nuxt.$emit("fetchData",true)
		    	} else { this.$notify({group: 'tags',type: 'success', title: 'Notice',text: data.data.reason||"Add not Successed"})}
				
				this.name_tag = ""
	    		this.link = ""
			})
			.catch(err =>{ console.log(err) })
    	},
		
		hideFormAddUser(){
	    	this.$modal.hide('FormAddtag');
	    	this.$modal.hide('FormUpdatetags');
	    },
		
		updatetags(id){
	    	const name_tag = this.$refs.tagsUpdate.value
			const link = this.$refs.linktagsUpdate.value
		    axios.post(`${this.$store.state.apiLink}/tags/update-tag`,{
		    	"token":localStorage.token || null,
		    	"name_tag":name_tag,
		    	"link":link,
		    	"id_number":id
		    })
		    .then(data =>{
		    	this.hideFormAddUser()
		    	if (data.data.successes) {
		    		this.$notify({group: 'tags',type: 'success', title: 'Notice',text: "Update tag successes !"})
    				this.$nuxt.$emit('fetchData',true)
		    	} else { this.$notify({group: 'tags',type: 'error', title: 'Notice',text: data.data.reason ||"Update tag no successes!"}) }
			})
			.catch(err => { 
				this.$notify({group: 'tags',type: 'error', title: 'Notice', text: err })
				this.hideFormAddUser()
			})
	    }
    },
}
</script>