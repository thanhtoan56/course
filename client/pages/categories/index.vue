<template>
	<div id="cateMain">
		<div class="has-categories-list" v-if="listProducts != ''">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							    <li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								<li style="width: 50%;"><a href="javascript:void(0)"><span>{{nameCategories}}</span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<template v-if="checkResponsive">
						<div class="title col-md-12"><h2>{{nameCategories}}</h2></div>
						<div class="col-md-12">
							<div class="content-had" v-if="listProducts != ''">
								<div v-for="product in listProducts" v-bind:key="product.id_number" class="item col-xs-4 col-md-5ths">
									<div class="item-product" @click="seenProductDetail(product)">
										<div class="image-product">
											<nuxt-link :to="'/product/'+product.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + product.image_main" alt="" /></a></nuxt-link>	 
										</div>
										<div class="info-product">
											<h2>{{product.name_product}}</h2>
											<div class="box-price">
												<div>
													<template v-if="!checkPricePromotion(product)">
														<span class="priceSale">{{formatNumber(product.price_origin)}}</span><span class="vnd"> blood</span>
													</template>
													<template v-else>
														<span class="price">{{formatNumber(product.price_origin)}}</span>
														<span class="priceSale">{{formatNumber(product.price_promotion)}}<span class="vnd"> blood</span></span>
													</template>
													<img src="/images/free-ship.png" alt="" v-if="product.freeShip">
												</div>
											</div>
											<div style="font-size: 12px; color: #888; padding: 0 12px;"><i>Còn lại: </i><span style="font-weight: 600;">{{product.total_quantity}}</span></div>
										</div>
										<div class="promotion" v-if="product.price_promotion > 0">
											<div class="content">
												<div class="number">{{mathPercent(product.price_origin,product.price_promotion)}}</div>
												<div class="text">Giảm</div>
											</div>
										</div>
									</div>
								</div>
							</div>	
							<div class="content-nohad" v-else>
								<div class="updating">
									Đang cập nhật ...
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="title" style="margin: 15px 0 10px 0; width: 100%;">
							<h2 style="margin-bottom: 0; padding: 0 10px;">{{nameCategories}}</h2>
						</div>
						<div class="content-had" v-if="listProducts != ''">
							<!-- <div v-for="product in listProducts" :key="product.id_number" class="item col-6 col-xs-6 col-sm-4 col-lg-3 col-xl-3"> -->
							<div v-for="product in listProducts" :key="product.id_number" class="item col-6 col-md-6 col-xs-6 col-sm-4 col-lg-3 col-xl-3">
								<div class="item-product" @click="seenProductDetail(product)">
									<div class="image-product">
										<nuxt-link :to="'/product/'+product.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + product.image_main" alt="" /></a></nuxt-link>	 
									</div>
									<div class="info-product">
										<h2>{{product.name_product}}</h2>
										<div class="box-price">
											<div>
												<template v-if="!checkPricePromotion(product)">
													<span class="priceSale">{{formatNumber(product.price_origin)}}</span><span class="vnd"> blood</span>
												</template>
												<template v-else>
													<span class="price">{{formatNumber(product.price_origin)}}</span>
													<span class="priceSale">{{formatNumber(product.price_promotion)}}<span class="vnd"> blood</span></span>
												</template>
												<img src="/images/free-ship.png" alt="" v-if="product.freeShip">
											</div>
										</div>
										<div style="font-size: 10px; color: #888; padding: 0 12px;"><i>Còn lại: </i><span style="font-weight: 600;">{{product.total_quantity}}</span></div>
									</div>
									<div class="promotion" v-if="product.price_promotion > 0">
										<div class="content">
											<div class="number">{{mathPercent(product.price_origin,product.price_promotion)}}</div>
											<div class="text">Giảm</div>
										</div>
									</div>
								</div>
							</div>
						</div>	
						<div class="content-nohad" v-else>
							<div class="updating">
								Đang cập nhật ...
							</div>
						</div>
					</template>
				</div>
				<div class="row" v-if="pages > 1">
					<div id="app" style="padding: 0 15px;">
						<paginate v-model= pageCurrent :page-count="pages" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"></paginate>
					</div>
				</div>
			</div>
		</div>
		<div class="nohas-categories-list" v-else>
			<ErrorComponent/>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import ErrorComponent from "~/components/client/error"
	import axios from "axios"
	import SliderIndex from "~/components/client/categories/list"
	import Paginate from 'vuejs-paginate'
	import Method from "~/functions/seenDetailProduct";

	Vue.component('paginate', Paginate)
	
	export default {
		components:{ SliderIndex, ErrorComponent},
		head(){
			return{
				title:this.nameCategories + ' | BLOOD SHOPPING MALL',
				meta:
				[
					{name:'description',content:'This is Register BLood Exchange'},
					{name:'keywords',content:'BLood Exchange, Blood Wallet'}
				]
			}
		},
		data(){
			return {
				listProducts: [],
				nameCategories: "",
				pages: 0,
				pageCurrent: 0,
				nameCate:''
			}
		},
		created(){
			console.log(location);
			this.fetchDataProductByCate();
		},
		mounted(){
			this.pageCurrent = Number(this.$route.params.id)
		},
		methods:{
			checkPricePromotion(list){
				if(list.price_promotion != "" && list.price_promotion != null && list.price_promotion != 0){ return list.price_promotion } 
				else return false
			},
			// fetchDataProductByCate(){
			// 	axios.get(`${this.$store.state.apiLink}/categories/by-categories/${this.$route.params.id}`)
			// 	.then(data => {
			// 		if (data.data.successes) {
			// 			this.listProducts = data.data.data
			// 			this.nameCategories = data.data.name_category
			// 		}
			// 	})
			// 	.catch(err => { console.log(err) })
			// },

			fetchDataProductByCate(){
				this.nameCate= this.$route.fullPath.split('/', 3)[2]
				axios.get(`${this.$store.state.apiLink}/categories/by-categories/${this.nameCate}/${this.$route.params.id}`)
				.then(data => {
					if (data.data.successes) {
						this.listProducts = data.data.data
						this.nameCategories = data.data.name_category
						this.pages = Math.ceil(data.data.count/5);
					}
				})
				.catch(err => { console.log(err) })
			},

			formatNumber(number) {
				number = parseInt(number);
			  	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			},
			
			mathRound(value, decimals) { return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals); },
			
			mathPercent(priceOrigin,pricePromotion){
                priceOrigin = Number(priceOrigin)
                pricePromotion = Number(pricePromotion)
                var contact = 0
                contact = 100 - ((pricePromotion/priceOrigin) * 100)
                return this.mathRound(contact,0) + "%"
			},
			clickCallback(page) { this.$router.push(`/categories/${this.nameCate}/${page}`) },
		},
	}
</script>
<style>
	#app { 
		display: flex;
		justify-content: center;
		margin-top: 0px !important;
		margin: 0 auto;
	}
</style>