<template>
    <div class="category">
		<template v-if="checkResponsive">
			<div class="col-md-12">
				<div v-for="(category, index) in categories" :key="index" class="item col-md-2 col-sm-3 col-xs-3" style="padding: 0;">
					<div class="types-product">
						<nuxt-link :to="'categories/'+category.link + '/1'">
							<div><img v-bind:src="$store.state.apiApp + 'categories/' + category.image " v-bind:alt="category.name_category"></div>
							<div class="title">{{category.name_category}}</div>
						</nuxt-link>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div v-for="(category, index) in categories" :key="index" class="item col-sm-3 col-xs-4" style="padding: 0;">
				<div class="types-product">
					<nuxt-link :to="'categories/'+ category.link + '/1'">
						<div><img v-bind:src="$store.state.apiApp + 'categories/' + category.image " v-bind:alt="category.name_category"></div>
						<div class="title">{{category.name_category}}</div>
					</nuxt-link>
				</div>
			</div>
		</template>
    </div>
</template>

<script>

import Vue from "vue"
import axios from "axios"

export default {
	data(){
		return {
			categories: []
		}
	},
	created(){
		this.fetchDataCategories()
	},
	
	methods:{
		fetchDataCategories(){
			axios.get(`${this.$store.state.apiLink}/categories/list-categories`)
			.then(data => { if (data.data.successes) { this.categories = data.data.data } })
			.catch(err => { console.log(err) })
		}
	}
}
</script>