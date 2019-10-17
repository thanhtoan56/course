<template>
	<div id="cateMain">
		<div class="has-categories-list" v-if="listProducts != ''">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="breadcrumb">
								<li><nuxt-link to='/'>TRANG CHỦ</nuxt-link></li>
								<li style="width: 50%;"><a href="javascript:void(0)"><span>SẢN PHẨM CỦA SHOP {{this.shop.name_shop.toUpperCase()}} </span></a></li>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<template v-if="checkResponsive">
					<div class="row">
						<div class="col-md-12" :style="checkTablet ? { 'padding-top': 15 + 'px' } : {}">
							<div class="info-shop" :style="checkTablet ? { } : { 'margin-top': 15 + 'px' }">
								<div class="info-left col-md-4">
									<h2>{{ $t('shop.title-1')}}</h2>
									<ul>
										<li><span>{{ $t('shop.nameShop')}}: <nuxt-link :to="'/shop/' + this.shop.link">{{this.shop.name_shop}}</nuxt-link></span></li>
										<li><span>{{ $t('shop.phoneShop')}}: {{this.shop.phone_number}}</span></li>
										<li><span>{{ $t('shop.contact')}}: {{this.shop.email}}</span></li>
										<li><span>{{ $t('shop.address')}}: {{this.shop.address_shop}}</span></li>
									</ul>
								</div>
								<div class="info-right col-md-8">
									<h2>{{ $t('shop.description')}}</h2>
									<div  v-html="shop.description"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="title col-md-12"><h2>{{ $t('shop.title-2')}} {{this.shop.name_shop.toUpperCase()}}</h2></div>
						<div class="col-md-12">
							<div class="content-had" v-if="listProducts != ''">
								<div v-for="product in listProducts" v-bind:key="product.id_number" class="item col-xs-4 col-md-5ths">
									<div class="item-product" @click="seenProductDetail(product)">
										<div class="image-product">
											<nuxt-link :to="'/product/'+ product.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + product.image_main" alt="" /></a></nuxt-link>	 
										</div>
										<div class="info-product">
											<h2>{{product.name_product}}</h2>
											<div class="box-price">
												<template v-if="!checkPricePromotion(product)">
													<span class="priceSale">{{formatNumber(product.price_origin)}}</span><span class="blood"> blood</span>
												</template>
												<template v-else>
													<span class="price">{{formatNumber(product.price_origin)}} <span class="blood"> blood</span></span>
													<span class="priceSale">{{formatNumber(product.price_promotion)}}<span class="blood"> blood</span></span>
												</template>
											</div>
											<div class="quantity-freeShip">
												<i>{{ $t('shop.rest')}}: </i><span>{{product.total_quantity}}</span>
												<img src="/images/free-ship.png" alt="" v-if="product.freeShip">
											</div>
										</div>
										<div class="promotion" v-if="product.price_promotion > 0">
											<div class="content">
												<div class="number">{{mathPercent(product.price_origin,product.price_promotion)}}</div>
												<div class="text">{{ $t('shop.sale')}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>	
							<div class="content-nohad" v-else>
								<div class="updating">
									{{ $t('shop.message')}}
								</div>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="row">
						<div class="info-shop">
							<div class="info-left">
								<h2>{{ $t('shop.title-1')}}</h2>
								<ul>
									<li><span>{{ $t('shop.nameShop')}}: <nuxt-link :to="'/shop/' + this.shop.link">{{this.shop.name_shop}}</nuxt-link></span></li>
									<li><span>{{ $t('shop.phoneShop')}}: {{this.shop.phone_number}}</span></li>
									<li><span>{{ $t('shop.contact')}}: {{this.shop.email}}</span></li>
									<li><span>{{ $t('shop.address')}}: {{this.shop.address_shop}}</span></li>
								</ul>
							</div>
							<div class="info-right">
								<h2>{{ $t('shop.description')}}</h2>
								<div  v-html="shop.description"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="title" style="width: 100%; margin: 15px"><h2 style="margin: 0; padding: 0 5px">{{ $t('shop.title-2')}} {{this.shop.name_shop.toUpperCase()}}</h2></div>
						<div class="content-had" v-if="listProducts != ''">
							<div v-for="product in listProducts" v-bind:key="product.id_number" class="item col-6 col-xs-6 col-sm-4 col-lg-3 col-xl-3">
								<div class="item-product" @click="seenProductDetail(product)">
									<div class="image-product">
										<nuxt-link :to="'/product/'+ product.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + product.image_main" alt="" /></a></nuxt-link>	 
									</div>
									<div class="info-product">
										<h2>{{product.name_product}}</h2>
										<div class="box-price">
											<template v-if="!checkPricePromotion(product)">
												<div><span class="priceSale">{{formatNumber(product.price_origin)}}</span><span class="blood"> blood</span></div>
											</template>
											<template v-else>
												<div><span class="priceSale">{{formatNumber(product.price_promotion)}}<span class="blood"> blood</span></span></div>
												<div><span class="price">{{formatNumber(product.price_origin)}} <span class="blood"> blood</span></span></div>
											</template>
										</div>
										<div class="quantity-freeShip" style="margin-top: 5px">
											<i>{{ $t('shop.rest')}}: </i><span>{{product.total_quantity}}</span>
											<img src="/images/free-ship.png" alt="" v-if="product.freeShip">
										</div>
									</div>
									<div class="promotion" v-if="product.price_promotion > 0">
										<div class="content">
											<div class="number">{{mathPercent(product.price_origin,product.price_promotion)}}</div>
											<div class="text">{{ $t('shop.sale')}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>	
						<div class="content-nohad" v-else>
							<div class="updating">
								{{ $t('shop.message')}}
							</div>
						</div>
					</div>
				</template>
				<div class="row" v-if="pages > 1">
					<div id="app" :class="{'col-md-12': checkResponsive}" :style="checkResponsive ? {}:{'margin-top': 0}">
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
	import i18n from '~/lang/i18n.js';
	
	Vue.component('paginate', Paginate)

	export default {
		components:{ SliderIndex, ErrorComponent },
		i18n,
		head(){
			return{
				title: 'SẢN PHẨM CỦA BLOOD SHOPPING MALL | BLOOD SHOPPING MALL',
				meta:
				[
					{name:'description',content:'This is Register BLood Exchange'},
					{name:'keywords',content:'BLood Exchange, Blood Wallet'}
				]
			}
		},
		data(){
			return{
				listProducts: [],
				shop: "",
				count: 1,
				pages: 1,
				pageCurrent: 0
			}
		},
		created(){
			this.fetchDataProductByShop();
		},
		mounted(){
			this.pageCurrent = Number(this.$route.params.id)
		},
		methods:{
			
			checkPricePromotion(list){
				if(list.price_promotion != "" && list.price_promotion != null && list.price_promotion != 0){ return list.price_promotion } 
				else return false
			},

			fetchDataProductByShop(){
				axios.post(`${this.$store.state.apiLink}/products/list-product-shop/${this.$route.params.id}`, {"offset": this.pages} )
				.then(data => {
					if (data.data.successes) {
						this.listProducts = data.data.data
						this.shop = data.data.shop
						this.pages = Math.ceil(data.data.length/20);
					}
				})
				.catch(err =>{ console.log(err) })
			},

			formatNumber(number) {
				number = parseInt(number);
			  	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			},

            mathRound(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
			},
			
            mathPercent(priceOrigin,pricePromotion){
                priceOrigin = Number(priceOrigin)
                pricePromotion = Number(pricePromotion)
                var contact = 0
                contact = 100 - ((pricePromotion/priceOrigin) * 100)
                return this.mathRound(contact,0) + "%"
			},
			
			clickCallback(page) {
				this.pages = page
				this.fetchDataProductByShop()
			}
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