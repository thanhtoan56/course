<template>
	<div id="detail-product">
		<div class="has-product-detail" v-if="detailProduct != ''">
			<div class="full-breadcumb" style="margin-bottom: 0;">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							    <li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								<li><nuxt-link :to="'/categories/' + link">{{getCategory}}</nuxt-link></li>
								<li style="width: 50%;"><a href="javascript:void(0)"><span>{{detailProduct.name_product}}</span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<template v-if="checkResponsive">
					<div class="row">
						<div class="col-md-12" :style="checkTablet ? { 'position': 'unset', 'margin-top': '42px', 'padding-top': 15 + 'px' } : {'margin-top': '42px','position': 'unset',}">
							<div class="content-white">
								<div class="left-detail-product col-md-5 col-sm-5 col-xs-5" style="position: unset">
									<template v-if="checkResponsive"> 
										<div class="pic-box" @click="openLightbox">
											<pic-zoom :url="images" :scale="2"></pic-zoom>
										</div>
										<div class="thumb-img">
											<ul>
												<li @click="changeImageZoom(imageMain)">
													<img v-bind:src="imageMain" v-bind:alt="title_main">
												</li>
												<li v-for="image in detailProduct.infoImages" v-bind:key="image._id" @click="changeImageZoom($store.state.apiApp + 'images/products/' + image.filename)">
													<img v-bind:src="$store.state.apiApp + 'images/products/' + image.filename" alt="">
												</li>
											</ul>
										</div>
										<div id="my-strictly-unique-vue-image-lightbox-carousel" style="text-align: center;">
											<vue-image-lightbox-carousel
												ref="lightbox"
												:show="showLightbox"
												@close="showLightbox = false"
												:images="imagess"
												@change="changeImage"
												>
											</vue-image-lightbox-carousel>
										</div>
									</template>
									<template v-else>
										<div style="text-align: center; margin-top: 42px;">
											<carousel  :per-page="1" :mouse-drag="true" :autoplay="true" :interval=5000 :loop="true">
												<slide v-for="(image, index) in imagesMobile" :key="index" >
													<template v-if="index == 0">
														<img style="max-width: 70%" :src="$store.state.apiApp + 'products/'+ image" alt="">
													</template>
													<template v-else>
														<img style="max-width: 70%" :src="$store.state.apiApp + 'images/products/'+ image" alt="">
													</template>
												</slide>
											</carousel>
										</div>
									</template>
								</div>
								<div class="right-detail-product col-md-7 col-sm-7 col-xs-7">
									<div class="content">
										<h2 class="name-product">{{detailProduct.name_product}}</h2>
										<p class="description"> {{detailProduct.description}}</p>
										<div class="brand-sku">
											<template v-if="checkResponsive">
												<span class="brand">{{ $t('product.brand') }}: <span>{{detailProduct.brand}}</span></span>
												<span class="sku">{{ $t('product.sku') }}: {{detailProduct.sku}}</span>
												<span class="made">{{ $t('product.madeIn') }}: <strong>{{detailProduct.made}}</strong></span>
												<span class="name-product">{{ $t('product.nameShop') }}: <nuxt-link :to="'/shop/'+ shop_info.link">{{shop_info.name_shop}} </nuxt-link> </span>
											</template>
											<template v-else>
												<div class="row">
													<span class="brand" style="margin-right: 10px; float: left">{{ $t('product.brand') }}: <span>{{detailProduct.brand}}</span></span>
													<span class="made" style="margin-right: 0; float: left">{{ $t('product.madeIn') }}: <strong>{{detailProduct.made}}</strong></span>
												</div>
												<div class="row">
													<span class="name-product" style="margin-right: 10px; float: left">{{ $t('product.nameShop') }}: <nuxt-link :to="'/shop/'+ shop_info.link">{{shop_info.name_shop}} </nuxt-link> </span>
													<span class="sku" style="margin-right: 0; float: left">{{ $t('product.sku') }}: {{detailProduct.sku}}</span>
												</div>
											</template>
										</div>
										<hr>
										<div class="box-price-detail">
											<template v-if="checkResponsive">
												<template v-if="checkPricePromotion">
													<p class="price-origin">{{ $t('product.priceOrigin') }}: <span>{{formatNumber(detailProduct.price_origin)}} blood</span></p>
													<p class="price-promotion">{{ $t('product.pricePromotion') }}: <span>{{formatNumber(detailProduct.price_promotion)}} blood</span></p>
													<p class="saving">{{ $t('product.saving') }}: <span>{{mathPercent(detailProduct.price_origin,detailProduct.price_promotion)}}</span> ( {{formatNumber(detailProduct.price_origin - detailProduct.price_promotion)}} VNĐ)</p>
												</template>
												<template v-else>
													<p class="price-origin" style="font-size: 19px; color: #ff3425;">{{ $t('product.priceOrigin') }}: {{formatNumber(detailProduct.price_origin)}} blood</p>
												</template>
													<p class="saving">{{ $t('product.rest') }}: <span>{{detailProduct.total_quantity}}</span></p>
											</template>
											<template v-else>
												<template v-if="checkPricePromotion">
													<p class="price-origin">{{ $t('product.priceOrigin') }}: <span style="color: #666">{{formatNumber(detailProduct.price_origin)}} blood</span></p>
													<p class="price-promotion">{{ $t('product.pricePromotion') }}: <span style="color: #ff3425; ">{{formatNumber(detailProduct.price_promotion)}} </span></p>
													<span style="font-size: 13px; float: left; color: #666">{{ $t('product.saving') }}: <span style="font-size: 15px; color: #ff3425;">{{mathPercent(detailProduct.price_origin,detailProduct.price_promotion)}}</span> ( {{formatNumber(detailProduct.price_origin - detailProduct.price_promotion)}} Blood)</span>
												</template>
												<template v-else>
													<span class="price-origin" style="font-size: 15px; color: #ff3425;">{{ $t('product.priceOrigin') }}: {{formatNumber(detailProduct.price_origin)}} blood</span>
												</template>
													<span style="font-size: 13px; color: #888; ">{{ $t('product.rest') }}: <span style="font-size: 15px; color: rgb(255, 52, 37);">{{detailProduct.total_quantity}}</span></span>
											</template>
										</div>
										<div class="box-select-buy">
											<div class="input-text">
												<NumberInputSpinner :min= "1" :max="100" :integerOnly="false"  v-model="quantity" refs="quantityOnce"/>
											</div>
											<div class="buttonClickBuyCart" style="display: flex;">
												<button type="button" id="clickBuyCart" @click="clickBuyCart"><img src="/images/icart.png" alt="" style="margin: 0 5px;"><span>{{ $t('product.buttonBuyCart') }}</span></button>
												<button type="button" id="clickBuyCart" @click="clickBuyNow" style="background: #ff3945 !important; border: #ff3945 !important;"><span>MUA NGAY</span></button>
											</div>
										</div>
										<hr>
										<div class="box-add-info">
											<img src="https://salt.tikicdn.com/desktop/img/icon-svg/icon-warning.svg" alt="">
											<span>{{ $t('product.message') }} <nuxt-link to="/">{{ $t('product.clickHere') }}</nuxt-link></span>
										</div>
										<div class="tags">
											<p style="margin: 5px;">Tags: {{detailProduct.tags}}</p>
										</div>
										<hr>
										<div class="detail">
											<div v-html=detailProduct.detail></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="content-white">
								<div class="specification">
									<h2>{{ $t('product.infoDetailProduct') }}</h2>
									<div style="width: 100%" v-html=detailProduct.specifications></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12" style="padding-bottom: 15px">
							<div class="description_detail">
								<h2>{{ $t('product.descriptionProduct') }}</h2>
								<div v-html=detailProduct.detail></div>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="row">
						<div style="position: unset; margin-top: 42px;">
							<div class="content-white">
								<div class="left-detail-product col-sm-5 col-xs-5" >
									<template v-if="checkResponsive">
										<div class="pic-box">
											<pic-zoom v-bind:url="images" :scale="2" ></pic-zoom>
										</div>
										<div class="thumb-img">
											<ul>
												<li @click="changeImageZoom(imageMain)">
													<img v-bind:src="imageMain" v-bind:alt="title_main">
												</li>
												<li v-for="image in detailProduct.infoImages" v-bind:key="image._id" @click="changeImageZoom($store.state.apiApp + 'images/products/' + image.filename)">
													<img v-bind:src="$store.state.apiApp + 'images/products/' + image.filename" alt="">
												</li>
											</ul>
										</div>
									</template>
									<template v-else>
										<div style="text-align: center; margin-top: 42px;">
											<carousel  :per-page="1" :mouse-drag="true" :autoplay="true" :interval= 5000 :loop="true">
												<slide v-for="(image, index) in imagesMobile" :key="index" >
													<template v-if="index == 0">
														<img style="max-width: 70%" :src="$store.state.apiApp + 'products/'+ image" alt="">
													</template>
													<template v-else>
														<img style="max-width: 70%" :src="$store.state.apiApp + 'images/products/'+ image" alt="">
													</template>
												</slide>
											</carousel>
										</div>
									</template>
								</div>
								<div class="right-detail-product col-sm-7 col-xs-7">
									<div class="content">
										<h2 class="name-product">{{detailProduct.name_product}}</h2>
										<p class="description"> {{detailProduct.description}}</p>
										<div class="brand-sku">
											<template v-if="checkResponsive">
												<span class="brand">{{ $t('product.brand')}}: <span>{{detailProduct.brand}}</span></span>
												<span class="sku">SKU: {{detailProduct.sku}}</span>
												<span class="made">Xuất xứ: <strong>{{detailProduct.made}}</strong></span>
												<span class="name-product">Tên Shop: <nuxt-link :to="'/shop/'+ shop_info.link">{{shop_info.name_shop}} </nuxt-link> </span>
											</template>
											<template v-else>
												<div class="row">
													<div class="made col-5" >{{ $t('product.madeIn')}}: <strong>{{detailProduct.made}}</strong></div>
													<div class="brand col-7">{{ $t('product.brand')}}: <span>{{detailProduct.brand}}</span></div>
												</div>
												<div class="row">
													<div class="sku col-5"><span >{{ $t('product.sku')}}: {{detailProduct.sku}}</span></div>
													<div class="name-product col-7">{{ $t('product.nameShop')}}: <nuxt-link :to="'/shop/'+ shop_info.link">{{shop_info.name_shop}} </nuxt-link></div>
												</div>
											</template>
										</div>
										<hr>
										<div class="box-price-detail">
											<template v-if="checkPricePromotion">
												<div style="height: 25px; font-size: 12px;" class="row">
													<div class="price-origin-m col-4" >{{ $t('product.priceOrigin')}}: <span style="color: #666; text-decoration: line-through;">{{formatNumber(detailProduct.price_origin)}} blood</span></div>
													<div class="price-promotion-m col-8">{{ $t('product.pricePromotion')}}: <span style="color: #ff3425; ">{{formatNumber(detailProduct.price_promotion)}} blood</span></div>
												</div>
												<div style="height: 25px; font-size: 12px; padding: 5px 0;" class="row">
													<div style="color: #888; padding: 0 5px; text-align: left;" class="col-4">{{ $t('product.rest')}}: <span style="font-size: 15px; color: rgb(255, 52, 37);">{{detailProduct.total_quantity}} </span>sp</div>
													<div style="color: #666; text-align: left; padding: 0;" class="col-8">{{ $t('product.saving')}}: <span style="font-size: 15px; color: #ff3425;">{{mathPercent(detailProduct.price_origin,detailProduct.price_promotion)}}</span> ( {{formatNumber(detailProduct.price_origin - detailProduct.price_promotion)}} blood)</div>
												</div >
											</template>
											<template v-else>
												<span class="price-origin" style="font-size: 15px; color: #ff3425; margin: 0; margin-left: 5px">{{ $t('product.priceOrigin')}}: {{formatNumber(detailProduct.price_origin)}} blood</span>
												<span style="font-size: 13px; color: #888; position: relative; right: 4%;">{{ $t('product.rest')}}: <span style="font-size: 15px; color: rgb(255, 52, 37);">{{detailProduct.total_quantity}} </span>sp</span>
											</template>
										</div>
										<div class="box-select-buy">
											<div class="input-text">
												<NumberInputSpinner :min= "1" :max="100" :integerOnly="false"  v-model="quantity" refs="quantityOnce" />
											</div>
											<div class="buttonClickBuyCart" style="display: flex;">
												<button type="button" id="clickBuyCart" @click="clickBuyCart"><img src="/images/icart.png" alt="" style="margin: 0 3px;"><span>{{ $t('product.buttonBuyCart')}}</span></button>
												<button type="button" id="clickBuyCart" @click="clickBuyNow" style="background: #ff3945 !important; border: #ff3945 !important;"><img src="/images/icart.png" alt="" style="margin: 0 3px;"><span>MUA NGAY</span></button>
											</div>
										</div>
										<hr>
										<div class="box-add-info">
											<img src="https://salt.tikicdn.com/desktop/img/icon-svg/icon-warning.svg" alt="">
											<span>{{ $t('product.message')}} <nuxt-link to="/">{{ $t('product.clickHere')}}</nuxt-link></span>
										</div>
										<div class="tags">
											<p style="margin: 5px;">Tags: {{detailProduct.tags}}</p>
										</div>
										<hr>
										<div class="detail">
											<div v-html=detailProduct.detail></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="content-white">
							<div class="specification">
								<h2>{{ $t('product.infoDetailProduct')}}</h2>
								<div style="width: 100%" v-html=detailProduct.specifications></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="description_detail">
							<h2>{{ $t('product.descriptionProduct')}}</h2>
							<div v-html=detailProduct.detail></div>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div id="nohas-product-detail" v-else>
			<ErrorComponent/>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import axios from "axios";
	import swal from 'sweetalert';
	import PicZoom from 'vue-piczoom';
	import VueCookies from 'vue-cookies';
	import VueCarousel from 'vue-carousel';
	import fancybox from '@fancyapps/fancybox';
	import mixxinControl from '~/functions/general';
	import ErrorComponent from "~/components/client/error";
	import VueImageLightboxCarousel from 'vue-image-lightbox-carousel'
	import NumberInputSpinner from '~/components/plugins/NumberInputSpinner.vue';
	import i18n from '~/lang/i18n.js';
	
	Vue.use(VueCookies);
	Vue.use(VueCarousel);
	
	export default {
		mixins:[mixxinControl],
		components: { PicZoom, NumberInputSpinner, ErrorComponent,VueImageLightboxCarousel },
		i18n,
		head(){ return { title: this.title_main  || "Không tìm thấy trang bạn cần đến " + '| BLOOD SHOPPING MALL' } },
		data(){
			return {
				detailProduct: [],
				images: "",
				imageMain: "",
				title_main: "",
				quantity: 1,
				arrCart: [],
				arrHistory: [],
				itemHis: [],
				shop_info: "",
				listCategories: [],
				link: "",

				imagesMobile: [],
				showLightbox: false,
				imagess: [],

				show: false
			}
		},
		created(){
			(async() =>{
				await this.fetchDataDefault()
				await this.fetCategories()
			})()
			this.images = ""
			
			$(".mouse-cover-canvas").css("display","none")
		},
		computed: {
			checkZoom(){
				return (this.$route.name !== 'product-id') ? $(".mouse-cover-canvas").css("z-index","0") : 0
			},
			getCategory() {
				for(let i = 0; i < this.listCategories.length; i++){
					if(this.listCategories[i].id_number == this.detailProduct.id_categories){
						this.link =  this.listCategories[i].link
						return this.listCategories[i].name_category
					}
				}
			},

			checkPricePromotion(){
				if(this.detailProduct.price_promotion != "" && this.detailProduct.price_promotion != null && this.detailProduct.price_promotion != 0){ return this.detailProduct.price_promotion } 
				else return false
			},
		},
		
		methods:{
			openLightbox () {
				this.showLightbox = true
				this.$refs.lightbox.showImage(1)
				for( let i = 0; i < this.imagesMobile.length; i++){
					if (i == 0){ 
						this.imagess.push(this.$store.state.apiApp + 'products/'+ this.imagesMobile[i])
					}
					else this.imagess.push(this.$store.state.apiApp + 'images/products/'+ this.imagesMobile[i])
				}
			},
			changeImage (index) {},

			fetchDataDefault(){
				axios.get(`${this.$store.state.apiLink}/products/${this.$route.params.id}`)
				.then(data =>{
					if (data.data.successes) {
						this.detailProduct = data.data.data[0]
						this.title_main = data.data.data[0].name_product

						this.imagesMobile.push(this.detailProduct.image_main) 
						this.detailProduct.infoImages.filter(element => this.imagesMobile.push(element.filename) )

						this.images = this.$store.state.apiApp + 'products/' + this.detailProduct.image_main
						this.imageMain = this.$store.state.apiApp + 'products/' + this.detailProduct.image_main	
						this.listProductHistory(this.detailProduct)

						axios.post(`${this.$store.state.apiLink}/users/shop-info`, {"id_number": this.detailProduct.user_id})
						.then(result => { if(result.data.successes) this.shop_info = result.data.data })
						.catch( err => { console.log(err) })
					}
				})
				.catch(err => { console.log(err) })
			},

			fetCategories(){
				axios.get(`${this.$store.state.apiLink}/categories/list-categories`)
				.then(data => { if(data.data.successes) this.listCategories = data.data.data })
				.catch(err => console.log(err))
			},

			mathRound(value, decimals) { return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals); },

			mathPercent(priceOrigin,pricePromotion){
				priceOrigin = Number(priceOrigin)
				pricePromotion = Number(pricePromotion)
				var contact = 0
				contact = 100 - ((pricePromotion/priceOrigin) * 100)
				return this.mathRound(contact,0) + "%"
			},

			changeImageZoom(value){ this.images = value },

			checkingCartDuplicate(it,arrCart){
				var dataCallback = []
				for (let i = 0; i < arrCart.length; i++) {
					if (it.id === arrCart[i].id ) { dataCallback.push(i) }
				}
				if (dataCallback != "") { return dataCallback[0] }
				else { return false }
			},

			checkingHistoryDuplicate(item,arrHistory){
				var data = []
				for (let i = 0; i < arrHistory.length; i++) {
					if (item.id === arrHistory[i].id ) { data.push(i) }
				}
				if (data == "") { return item } 
				else { return data[0]; }
			},

			clickBuyCart(){
				if(this.quantity <= this.detailProduct.total_quantity ){
					axios.post(`${this.$store.state.apiLink}/carts/add-cart`, { 
						"idProduct":this.detailProduct.id_number,
						"quantity": this.quantity,
						"appId": $cookies.isKey("appId") ? $cookies.get("appId") : ""
					})
					.then(data => { 
						if (data.data.successes) { 
							$cookies.set("appId", data.data.appId)
							$cookies.set("cart", JSON.stringify(data.data.listCart))
							this.$nuxt.$emit("addNumberCart", data.data.listCart)
							this.$store.dispatch('cart/addCart', data.data.listCart)
							swal("Thêm giỏ hàng thành công", "", "success");
						} 
					})
					.catch(err =>{ swal("Thêm không thành công", "", "error"); })
				} else { swal("Thêm không thành công vì lớn hơn số hàng còn lại trong kho", "", "error"); }
			},

			clickBuyNow(){
				this.clickBuyCart()
				this.$router.push({path: "/cart"})
			},

			listProductHistory(arr){
				var item = {"name":arr.name_product,"price_origin":arr.price_origin,"price_promotion":arr.price_promotion,"sku":arr.sku,"made":arr.made,"link":arr.link,"image_main":arr.image_main,"id":arr.id_number,"brand":arr.brand,"total_quantity":arr.total_quantity, "freeShip": arr.freeShip, "quantity":Number(this.quantity)}
				
				var checkHistory = localStorage.getItem("HISTORY_BLOOD_SHOPPINGMALL")
				if(checkHistory !== null){
					this.arrHistory = JSON.parse(localStorage.getItem('HISTORY_BLOOD_SHOPPINGMALL')) 
					var arrayHis = this.checkingHistoryDuplicate(item, this.arrHistory)
					if (Number.isInteger(arrayHis)) {
						this.arrHistory.splice(arrayHis, 1);
						this.arrHistory.unshift(item);
					} else { this.arrHistory.unshift(arrayHis); }
					localStorage.setItem('HISTORY_BLOOD_SHOPPINGMALL',JSON.stringify(this.arrHistory))
				} else {
					this.arrHistory.unshift(item)
					localStorage.setItem('HISTORY_BLOOD_SHOPPINGMALL',JSON.stringify(this.arrHistory))
				}
				this.$store.dispatch('history/HistorySeen')
			},

			cleanAccents(str){
				if (str && str !== "") {
					str= str.toLowerCase();
					str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a")
					str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e")
					str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i")
					str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
					str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
					str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
					str= str.replace(/đ/g,"d")
					str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-")
					str= str.replace(/-+-/g,"-");
					str= str.replace(/^\-+|\-+$/g,"")
				}
				return str
			},
		},
		destroyed(){
			$(".mouse-cover-canvas").css({"z-index":"0", "display": "none"})
		}
	}
</script>
<style lang="css" scoped></style>
<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	
</style>