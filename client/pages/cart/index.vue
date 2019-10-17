<template>
	<div id="carts-page">
		<div class="has-cart" v-if ="checkingDataCart">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							    <li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								<li style="width: 50%;"><a href="javascript:void(0)"><span>Giỏ hàng</span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="content-cart">
				<div class="container">
					<notifications group="success" />
					<template v-if="checkResponsive">
						<div class="row" style="padding-bottom: 20px;">
							<div class="title-number col-md-12" style="padding: 0 30px;">
								<h2>GIỎ HÀNG <span>( {{numberProduct}}  Sản phẩm)</span></h2>
							</div>
							<div class="item col-md-12">
								<div class="item-col col-md-10">
									<div class="content">
										<div class="item" v-for="(data, index) in dataCart" v-bind:key="index">
											<div class="img-box">
												<img v-bind:src="$store.state.apiApp + 'products/' + data.image_main" alt="">
											</div>
											<div class="box-content" v-if="data.price_promotion != null ">
												<h2><nuxt-link :to="'/product/'+ data.link">{{data.name_product}}</nuxt-link></h2>
												<p class="price-box">
													<span class="origin-xx">Giá: {{formatNumber(data.price_origin)}} <span class="dong">blood</span></span>
													<span class="promotion-xx">Giá KM: {{formatNumber(data.price_promotion)}} <span class="dong">blood</span></span>
												</p>
												<p class="saving">Tiết kiệm: {{mathPercent(data.price_origin,data.price_promotion)}}</p>
												<p class="saving">Còn lại: <strong>{{data.total_quantity - data.quantity}}</strong></p>
											</div>
											<div class="box-content" v-else>
												<h2><nuxt-link :to="data.link">{{data.name_product}}</nuxt-link></h2>
												<p class="price-box"><span class="origin-mm" style="color: red;">Giá: {{formatNumber(data.price_origin)}} <span class="dong">blood</span></span></p>
												<p class="saving">Còn lại: <strong>{{data.total_quantity}}</strong></p>
											</div>
											<div class="box-delete">
												<a href="javascript:void(0)" @click="deleteItemCart(data.id_number, data.quantity)">Xóa</a>
											</div>
											<div class="box-quantity">
												<div class="total-once" v-if="data.price_promotion != null">
													Tổng tiền: {{formatNumber(data.price_promotion * data.quantity)}} <span class="dong">blood</span>
												</div>
												<div class="total-once" v-else>
													Tổng tiền: {{formatNumber(data.price_origin * data.quantity )}} <span class="dong">blood</span>
												</div>
												<NumberInputSpinner :min= "1" :max="1000" :integerOnly="false"  v-model ="data.quantity" ref="quantity"/>
											</div>
										</div>
										<div class="button-update">
											<button type="button" class="btn btn-danger btn-delete-cart" @click="deleteAllCart" style="background: #dc3545">Xóa giỏ hàng</button>
											<button type="button" class="btn btn-primary btn-update-cart" @click="updateCart">Cập nhật giỏ hàng</button>
										</div>
									</div>
								</div>
								<div class="total-all col-md-2" id="total-all">
									<div class="content">
										<div class="title-temp">TẠM TÍNH</div>
										<p>TỔNG TIỀN: <span class="money" >{{formatNumber(total(dataCart))}}</span> <span class="dong">blood</span></p>
										<p class="right">(Đã bao gồm VAT)</p>
									</div>
									<button class="btn btn-primary" id="paymentButton">
										<li v-if="this.$store.state.buttonOrder === 0" @click="checkCartUpdate"><a>TIẾN HÀNH ĐẶT HÀNG</a></li>
										<li v-else @click="checkCartUpdate"><a>CẬP NHẬT ĐƠN HÀNG</a></li>
									</button>	
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="row">
							<div class="title-number col-12">
								<h2>GIỎ HÀNG <span>( {{numberProduct}}  Sản phẩm)</span></h2>
							</div>
							<div class="item" style="width: 100%;">
								<div class="item-col">
									<div class="content">
										<div class="item " v-for="(data, index) in dataCart" v-bind:key="index">
											<div class="col-xs-6">
												<div class="img-box">
													<img v-bind:src="$store.state.apiApp + 'products/' + data.image_main" alt="">
												</div>
											</div>
											<div class="col-xs-6" style="padding: 0">
												<div class="box-content" v-if="data.price_promotion != null ">
													<h2><nuxt-link :to="'/product/'+ data.link">{{data.name_product}}</nuxt-link></h2>
													<div class="price-box">
														<div class="origin-xx">Giá: {{formatNumber(data.price_origin)}} <span class="dong">blood</span></div>
														<div class="promotion-xx">Sale: {{formatNumber(data.price_promotion)}} <span class="dong">blood</span></div>
													</div>
													<div class="saving">
														<div>Tiết kiệm: {{mathPercent(data.price_origin,data.price_promotion)}}</div>
														<div>Còn lại: <strong>{{data.total_quantity - data.quantity}}</strong> sp</div>
													</div>
													<NumberInputSpinner :min= "1" :max="1000" :integerOnly="false"  v-model ="data.quantity" ref="quantity"/>
												</div>
												<div class="box-content" v-else>
													<h2><nuxt-link :to="data.link">{{data.name_product}}</nuxt-link></h2>
													<div class="price-box"><span class="origin-mm">Giá: {{formatNumber(data.price_origin)}} <span class="dong">blood</span></span></div>
													<div class="saving">Còn lại: <strong>{{data.total_quantity}}</strong></div>
													<NumberInputSpinner :min= "1" :max="1000" :integerOnly="false"  v-model ="data.quantity" ref="quantity"/>
												</div>
											</div>
											<span style="position: absolute; top: -10px; right: 5px; font-size: 17px; padding: 5px;" @click="deleteItemCart(data.id_number, data.quantity)">x</span>
										</div>
										<div style="padding-top: 5px;">
											<button type="button" class="btn btn-danger btn-delete-cart" @click="deleteAllCart" style="background: #dc3545">Xóa giỏ hàng</button>
											<button type="button" class="btn btn-primary btn-update-cart" @click="updateCart">Cập nhật giỏ hàng</button>
										</div>
									</div>
								</div>
							</div>
							<div class="item col-md-12" style="padding: 0;">
								<div class="total-all" id="total-all">
									<div class="content">
										<div class="title-temp">TẠM TÍNH</div>
										<p>TỔNG TIỀN: <span class="money" >{{formatNumber(total(dataCart))}}</span> <span class="dong">blood</span></p>
									</div>
									<button class="btn btn-primary" id="paymentButton">
										<li v-if="this.$store.state.buttonOrder === 0" ><a  @click="checkCartUpdate">TIẾN HÀNH ĐẶT HÀNG</a></li>
										<li v-else><a @click="checkCartUpdate">CẬP NHẬT ĐƠN HÀNG</a></li>
									</button>	
								</div>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
		<div class="nohas-cart" v-else>
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h2 class="title">Giỏ hàng <span style="font-size: 14px;">(0 sản phẩm)</span></h2>
					</div>	
					<div class="col-md-12">
						<div class="content-nocart">
							<div class="img-box">
								<img src="/images/mascot.png" alt="">
							</div>
							<h2>Không có sản phẩm nào trong giỏ hàng của bạn</h2>
							<div class="button-bck">
								<nuxt-link to='/'>Tiếp tục mua sắm</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from "vue"
	import axios from "axios"
	import VueCookies from 'vue-cookies'
	import NumberInputSpinner from '~/components/plugins/NumberInputSpinner.vue'
	import swal from 'sweetalert'
	import stickySidebar from "sticky-sidebar"
	import { resolve } from 'q';
	import Notifications from 'vue-notification';
	import lodash from 'lodash'
	import Responsive from '~/functions/responsiveGlobal'
	
	Vue.use(Notifications);
 	Vue.use(VueCookies)
	
	export default {
	    components: { NumberInputSpinner, },
		head(){
			return { title:"Cart || BLOOD SHOPPING MALL" }
		},
		data(){
			return{
				dataCart: [],
				quantityNew: [],
				orders:
				[
				    {title: 'Google Pixel', price: 3000},      
				    {title: 'Samsung Galaxy S8', price: 2500},
				    {title: 'iPhone 7', price: 5000}
				],

				dataCartUpdate: [],
				list_product_update: [],
				buttonOrder: 0,

				cart:  [],
				arrCart: [], 
				arrCartUpdate: [] 
			}
		},
		mounted(){
			if (this.checkingDataCart === true && !this.checkTablet) {
			    var sidebar = new StickySidebar('#total-all', {
			        topSpacing: 20,
			        bottomSpacing: 20
			    })
			}
		},
		computed:{
			numberProduct(){ if (this.dataCart != "") { return this.dataCart.length } },
			
			checkingDataCart(){ return this.dataCart != "" && this.dataCart != undefined && this.dataCart != null },
		},
		created(){
			this.dataCart = JSON.parse(this.$cookies.get('cart'))
			this.buttonOrder = this.$store.state.buttonOrder
		},
		methods:{
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

			total(data){
				var total = 0
				if (data != "" && data !== null && data !== undefined) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].price_promotion != 0) { total += data[i].quantity * data[i].price_promotion }
						else { total += data[i].quantity * data[i].price_origin }
					}
				}
				return total;
			},
			
			//
			mathNumberCart(data){
				var total = 0
				if (data != "") {
					for (var i = 0; i < data.length; i++) { total += data[i].quantity }
				}
				return total;
			},

			//
			updateCart(){
				var checkUpdated = true
				var carts = []
				for( let i = 0; i < this.dataCart.length; i++){
					if(this.dataCart[i].total_quantity - this.dataCart[i].quantity >= 0){ 
						this.dataCart[i].quantity = this.dataCart[i].quantity 
						
						var itemp = {}
						itemp.idProduct = this.dataCart[i].id_number
						itemp.quantity = this.dataCart[i].quantity
						carts.push(itemp)
					} 
					else { checkUpdated = false }
				}
				if(checkUpdated == true){
					axios.post(`${this.$store.state.apiLink}/carts/update-cart`, { 
						"appId": $cookies.get("appId"),
						"carts": carts
					})
					.then(data => { 
						if (data.data.successes) { 
							$cookies.set("cart", JSON.stringify(data.data.listCart))
							this.$nuxt.$emit('changeNumberCart', this.mathNumberCart(data.data.listCart))
							// this.dataCart = data.data.listCart
							swal("Cập nhật thành công", "", "success");
						} else { swal(`Cập nhật không thành công. ${data.data.reason}`, "", "error"); } 
					})
					.catch(err =>{ swal("Cập nhật không thành công", "", "error"); })
				}
				else { swal("Cập nhật không thành công vì lớn hơn số hàng còn lại trong kho", "", "error"); }
			},		
			
			//
			deleteAllCart(){
				axios.post(`${this.$store.state.apiLink}/carts/remove-cart`, { 
					"appId": $cookies.get("appId"),
				})
				.then(data => { 
					if (data.data.successes) { 
						this.dataCart = []
						$cookies.remove("cart")
						$cookies.remove("appId")
						this.$nuxt.$emit("clearNumberCart", 0)
						swal("Xóa giỏ hàng thành công", "", "success");
					} 
				})
				.catch(err =>{ swal("Xóa giỏ hàng không thành công", "", "error"); })
			},

			//
			deleteItemCart(id_number, quantity){
				if(this.dataCart.length == 1) {
					return this.deleteAllCart();
				}
				for (let i = 0; i < this.dataCart.length; i++) {
					if ( this.dataCart[i].id_number === id_number) { this.dataCart.splice(i, 1); }	
				}
				axios.post(`${this.$store.state.apiLink}/carts/remove-cart`, { 
					"appId": $cookies.get("appId"),
					"idProduct": id_number
				})
				.then(data => { 
					if (data.data.successes) { 
						$cookies.set('cart',JSON.stringify(data.data.listCart))
						// this.dataCart = data.data.listCart
						this.$nuxt.$emit("minusNumberCart", quantity)
						swal("Xóa sản phẩm thành công", "", "success");
					} 
				})
				.catch(err =>{ swal("Xóa sản phẩm không thành công", "", "error"); })
			},

			checkCartUpdate(){
				if (this.$store.state.userInfo.successes == true ){
					this.cart = JSON.parse(this.$cookies.get('cart'))
					for (let i = 0; i < this.cart.length; i++) { this.arrCart.push(this.cart[i].quantity); }

					for(let j = 0;  j < this.$refs.quantity.length; j++){ this.arrCartUpdate.push(this.$refs.quantity[j].value); }

					if(lodash.isEqual(this.arrCart, this.arrCartUpdate)){
						// if(this.$store.state.buttonOrder === 0){ this.$router.push({ path: '/delivery-address' }) } 
						if(this.$store.state.buttonOrder === 0){ this.$router.push({ path: '/confirm' }) } 
						else {
							this.$store.dispatch('buttonOrder')
							// this.$router.push({ path: '/payment' })
							this.$router.push({ path: '/confirm' })
						}
					} else { swal("Vui lòng cập nhật giỏ hàng trước !", "", "error") }
					this.arrCart = []
					this.arrCartUpdate = []
				} else {
					var md = new MobileDetect(window.navigator.userAgent)
					if(md.mobile() == null) { this.$nuxt.$emit("showModalLogin", true) }
					else this.$nuxt.$emit("showModalLoginMobile", true)
				}
			}
		},
	}
</script>
