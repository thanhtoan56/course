<template>
	<div id="search-page">
		<div class="has-keySearch" v-if="checkKeySearch">
			<div class="full-breadcumb" style="margin-bottom: 0;">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							    <li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								<li><nuxt-link to='#'>Search</nuxt-link></li>
								<li style="width: 50%;"><a href="javascript:void(0)"><span>{{keySearch}}</span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<template v-if="checkResponsive">
						<div class="content" v-if="dataSearchPage != ''">
							<div class="title-search">
								<div style="margin: 10px 0"> {{dataSearchPage.length}} {{ $t('search.messageFound')}}: "{{keySearch}}"</div>
								<div class="content-search-product">
									<div v-for="list in dataSearchPage" v-bind:key="list.id_inumber" class="item col-xs-4 col-md-5ths">
										<div class="item-product" @click="seenProductDetail(list)">
											<div class="image-product">
												<nuxt-link :to="'/product/'+ list.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + list.image_main" alt="" /></a></nuxt-link>
											</div>
											<div class="info-product">
												<h2>{{list.name_product | truncate(70) }}</h2>
												<div class="box-price">
													<template v-if="!checkPricePromotion(list)">
														<span class="priceSale">{{formatNumber(list.price_origin)}}</span><span class="blood"> blood</span>
													</template>
													<template v-else>
														<span class="price">{{formatNumber(list.price_origin)}} <span class="blood"> blood</span></span>
														<span class="priceSale">{{formatNumber(list.price_promotion)}}<span class="blood"> blood</span></span>
													</template>
												</div>
												<div class="quantity-freeShip">
													<i>{{ $t('search.rest')}}: </i><span>{{list.total_quantity}}</span>
													<img src="/images/free-ship.png" alt="" v-if="list.freeShip">
												</div>
											</div>
											<div class="promotion" v-if="list.price_promotion > 0">
												<div class="content" style="margin-top: 0;">
													<div class="number">{{mathPercent(list.price_origin,list.price_promotion)}}</div>
													<div class="text">{{ $t('search.sale')}}</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="content content-no-product-key-search" v-else>
							<div class="col-md-12">
								<div class="title-search-no" style="margin-top: 15px;">
									{{ $t('search.messageNotFound')}}: "{{keySearch}}"
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="content" v-if="dataSearchPage != ''" style="padding: 0;">
							<div class="title-search" style="margin-top: 0;">
								<div class="result-keySearch">{{dataSearchPage.length}} {{ $t('search.messageFound')}}: "<i>{{keySearch}}</i>"</div>
								<div class="content-search-product">
									<div v-for="list in dataSearchPage" v-bind:key="list.id_inumber" class="item col-6 col-xs-6 col-sm-4 col-md-3" style="margin: 0; border: none; border-bottom: 1px solid #eee;">
										<div class="item-product" @click="seenProductDetail(list)" style="padding: 0;">
											<div class="image-product">
												<nuxt-link :to="'/product/'+ list.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + list.image_main" alt="" /></a></nuxt-link>
											</div>
											<div class="info-product">
												<h2>{{list.name_product | truncate(70) }}</h2>
												<div class="box-price">
													<template v-if="!checkPricePromotion(list)">
														<div><span class="priceSale">{{formatNumber(list.price_origin)}}</span><span class="blood"> blood</span></div>
													</template>
													<template v-else>
														<div><span class="priceSale">{{formatNumber(list.price_promotion)}}<span class="blood"> blood</span></span></div>
														<div><span class="price">{{formatNumber(list.price_origin)}} <span class="blood"> blood</span></span></div>
													</template>
												</div>
												<div class="quantity-freeShip" style="margin-top: 5px">
													<i>{{ $t('search.rest')}}: </i><span>{{list.total_quantity}}</span>
													<img src="/images/free-ship.png" alt="" v-if="list.freeShip">
												</div>
											</div>
											<div class="promotion" v-if="list.price_promotion > 0">
												<div class="content" style="margin-top: 0">
													<div class="number">{{mathPercent(list.price_origin,list.price_promotion)}}</div>
													<div class="text">{{ $t('search.sale')}}</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="content content-no-product-key-search" v-else style="margin-top: 42px; width: 100%; padding: 0;">
							<div class="result-keySearch" style="color: black; background: white;"> {{ $t('search.messageNotFound')}}: "{{keySearch}}" </div>
						</div>
					</template>
				</div>
			</div>
		</div>
		<div class="nohas-keySearch" v-else> <errorContent/> </div>
	</div>
</template>
<script>

	import Vue from "vue"
	import axios from "axios"
	import VueTruncate from'vue-truncate-filter'
	import Method from "~/functions/seenDetailProduct";
	import i18n from '~/lang/i18n.js';
	
	Vue.use(VueTruncate)
	export default {
		i18n,
		head(){
			return { title: "Có " + this.dataSearchPage.length + " Sản phẩm với từ khóa là '" + this.keySearch + "'" + " | BLOOD SHOPPING MALL"  }
		},
		data(){
			return {
				dataSearchPage: [],
				keySearch: "",
			}
		},
		computed:{
			checkKeySearch(){ return this.keySearch && this.keySearch !== "" && this.keySearch !== undefined && this.keySearch !== null },
		},
		created(){
			this.keySearch = this.$route.params.id
			this.fetchDataSearch();
		},
		methods:{
			checkPricePromotion(list){
				if(list.price_promotion != "" && list.price_promotion != null && list.price_promotion != 0){ return list.price_promotion } 
				else return false
			},
			fetchDataSearch(){
				axios.get(`${this.$store.state.apiLink}/products/search/${this.keySearch}`)
				.then(data => { if (data.data.successes) { this.dataSearchPage = data.data.data } })
				.catch(err => { console.log(err) })
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
		}
	}
</script>