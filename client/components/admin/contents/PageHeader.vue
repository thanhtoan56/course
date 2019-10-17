<template>
    <div class="page-header row no-gutters py-4">
        <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        	<span class="text-uppercase page-subtitle">Overview</span>
        	<h3 class="page-title">List Contents </h3>
        	<div class="button-add" style="display: inline-block;width: 100%;margin: 10px 0">
        		<nuxt-link to="contents/add"><a class="btn btn-primary" style="color: white;width: 120px;">Add Content</a></nuxt-link>	
        	</div>
        </div>
    </div>    
</template>

<script>

import Vue from "vue";
import axios from "axios";
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';


Vue.use(VModal);
Vue.use(Notifications);
export default {
    data(){
    	return {}
    },
    created(){},
    
    methods:{}
}
</script>
