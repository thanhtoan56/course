<template>
	<div id="payment">
		<div class="full-breadcumb">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb">
						    <li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
						    <li><nuxt-link to='/cart'>Giỏ hàng</nuxt-link></li>
							<li style="width: 50%;"><a href="javascript:void(0)"><span>Payment</span></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
		<div class="content-payment" :style="checkResponsive ? {'margin-top': 15 + 'px', 'margin-bottom': 15 + 'px'} : {}">
			<div class="container">
				<div class="row">
					<template v-if="checkResponsive">
						<div class="col-md-12">
							<notifications :style="checkTablet ? {'width': 40+'%', 'top': 42+'px', 'right': 0+'px'}:{}" group="success" />
							<div class="content">
								<div class="title-description">
									<h2>3. Thanh Toán</h2>
									<p>Kiểm tra thông tin của bạn để nhận hàng một cách chính xác</p>
								</div>
								<div class="row">
									<div class="col-md-12 cart-address">
										<div class="title-address" style="display: -webkit-box">
											<div style="text-align: left;"><h2>Địa chỉ giao hàng</h2></div>
										</div>
									</div>
									<div class="col-md-12 cart-address">
										<div class="col-md-12 info-address">
											<h2 style="font-size: 15px; color: #242424">{{ this.info_buyer.nameLast}}</h2>
											<p style="color: #888">Số điện thoại: {{this.info_buyer.phoneNumber}}</p>
											<p style="color: #888">Địa chỉ nhận: {{ this.info_buyer.info_address }}</p>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12 cart-address">
										<div class="title-address" style="display: -webkit-box">
											<div style="text-align: left;"><h2>Đơn hàng ( {{count}} sản phẩm ) </h2></div>
										</div>
									</div>
									<div class="cart-address" style="width: 100%; padding: 0 20px;">
										<div class="order">
											<div class="row item-order" >
												<div class="col-5" style="text-align: left;"><strong>Tên sản phẩm</strong></div>
												<div class="col-1"><strong>Giá</strong></div>
												<div class="col-1"></div>
												<div class="col-2" style="text-align: center;"><strong>Số lượng</strong></div>
												<div class="col-3"><strong>Thành tiền</strong></div>
											</div>
										</div>
										<div class="order" v-for="(list, index) in dataCart" :key="index">
											<div class="row item-order">
												<div class="col-5" style="text-align: left;"><nuxt-link :to="'/product/' + list.link">{{list.name_product}}</nuxt-link></div>
												<div class="col-1" >{{formatPrice(list)}}</div>
												<div class="col-1" style="text-align: center;">x</div>
												<div class="col-2" style="text-align: center;">{{list.quantity}}</div>
												<div class="col-3" >{{numberWithCommas(list)}} blood</div>
											</div>
										</div>
										<div class="order">
											<div class="row item-order">
												<div class="col-9" style="text-align: left;"><strong>Tạm tính:</strong> </div>
												<div class="col-3"> {{totalPay()}} blood</div>
											</div>
										</div>
										<div class="total">
											<div class="row item-total">
												<div class="col-9" style="text-align: left;"><strong>Thành tiền: </strong></div>
												<div class="col-3 total-pay"> {{totalPay()}} blood</div>
											</div>
										</div>
									</div>
								</div>
								<template v-if="this.$store.state.info_buyer.info_buyer.phoneNumber !='' && this.$store.state.info_buyer.info_buyer.info_address != ''">
									<div class="row">
										<div class="col-md-12">
											<div class="form-group" id="button-buy">
												<li v-if="checkUserInfo != false" @click="order()"><a   style="cursor: pointer;" id="click-buy">THANH TOÁN</a></li>
												<li v-else  @click="order()"><a  to=""  style="cursor: pointer;" id="click-buy">THANH TOÁN</a></li>
												<p><i>(Xin vui lòng kiểm tra lại đơn hàng trước khi thanh toán)</i></p>
											</div>
										</div>
									</div>
								</template>
								<template v-else>
									<div class="row">
										<div class="col-md-12">
											<div class="form-group" id="button-buy">
												<p><i style="color: red">Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></p>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</template>
					<template v-else>
						<notifications style="width: 70%; top: 42px; right: 0px;" group="success" />
						<div class="content" style="margin-top: 42px; width: 100%;">
							<div class="title-description">
								<h2>3. Thanh Toán </h2>
								<p>Kiểm tra thông tin của bạn để nhận hàng một cách chính xác</p>
							</div>
							<div class="row">
								<div class="cart-address" style="width: 100%; ">
									<div class="title-address " style="text-align: left;">
										<div ><h2>Địa chỉ giao hàng</h2></div>
									</div>
									<div class="info-address">
										<h2 style="font-size: 15px; color: #242424">{{this.info_buyer.nameLast}}</h2>
										<p style="color: #888">Số điện thoại: {{this.info_buyer.phoneNumber}}</p>
										<p style="color: #888">Địa chỉ nhận: {{this.info_buyer.info_address}}</p>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="cart-address" style="width: 100%; ">
									<div class="title-address " style="text-align: left; border-bottom: 1px solid #c9c9c9;">
										<h2>Đơn hàng ( {{count}} sản phẩm ) </h2>
									</div>
									<div class="row" v-for="(list, index) in dataCart" :key="index">
										<div class="order">
											<div class="col-xs-5" style="padding: 0;">
												<div class="img-box" style="padding: 5px 0;">
													<img :src="$store.state.apiApp + 'products/' + list.image_main" alt="" style="max-width: 100px; float: left;">
												</div>
											</div>
											<div class="col-xs-7" style="text-align: left;">
												<div class="box-content" v-if="list.price_promotion != 0 ">
													<h2 style="font-size: 15px; font-weight: 400;"><nuxt-link :to="'/product/'+list.link">{{list.name_product}}</nuxt-link></h2>
													<div class="price-box">
														<div style="font-size: 14px; color: #888; text-decoration: line-through;">Giá: {{formatNumber(list.price_origin)}} <span class="dong">blood</span></div>
														<div style="color: red;">Sale: {{formatNumber(list.price_promotion)}} <span class="dong">blood</span></div>
													</div>
													<div style="font-size: 14px; color: #888;">Số lượng: {{list.quantity}} sp</div>
												</div>
												<div class="box-content" v-else>
													<h2 style="font-size: 15px; font-weight: 400;"><nuxt-link :to="list.link">{{list.name_product}}</nuxt-link></h2>
													<div><span class="origin-mm">Giá: {{formatNumber(list.price_origin)}} <span class="dong">blood</span></span></div>
													<div style="font-size: 14px; color: #888;">Số lượng: {{list.quantity}} sp</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
				
						</div>
						<div class="row" style="width: 100%;">
							<div class="total " style="width: 100%; margin: 5px 0;">
								<div class="total-all " id="total-all">
									<div class="content" style="text-align: left;">
										<div style="padding: 0 20px;">Tạm tính: <strong style="float: right; font-size: 15px;">{{totalPay()}} &nbsp;blood</strong></div>
										<div style="padding: 0 20px;"><strong>TỔNG TIỀN:</strong> <span class="money" style="float: right; font-size: 15px;">{{totalPay()}} blood</span> </div>
									</div>
								</div>
							</div>
						</div>
						<div class="row" style="width: 100%;">
							<template v-if="this.$store.state.info_buyer.info_buyer.phoneNumber !='' && this.$store.state.info_buyer.info_buyer.info_address != ''">
									<!-- <button class="btn btn-primary" @click="editOrder()" style="width: 100%; margin-bottom: 1px;">SỬA</button> -->
									<button class="btn btn-danger" v-if="checkUserInfo != false" style="width: 100%; margin-bottom: 1px;" @click="order()">THANH TOÁN</button>
									<button class="btn btn-danger" v-else  style="width: 100%; margin-bottom: 1px;" @click="order()">THANH TOÁN</button>
									<div style="font-size: 13px; text-align: center; margin-top: 10px; width: 100%;"><i>Vui lòng kiểm tra lại đơn hàng trước khi thanh toán !</i>	</div>
							</template>
							<template v-else>
								<div class="form-group" id="button-buy">
									<p><i style="color: red">Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></p>
								</div>
							</template>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import axios from "axios"
	import VueCookies from 'vue-cookies'
	import Notifications from 'vue-notification';
	import VueLoading from 'vuejs-loading-plugin';
	import mixinPayment from'../../functions/general';
	import NumberInputSpinner from '~/components/plugins/NumberInputSpinner.vue'
	
	Vue.use(Notifications);
	Vue.use(VueLoading)
	export default {
		components: { NumberInputSpinner, },
		head(){ return { title:"Payment || BLOOD SHOPPING MALL" } },
		mixins: [mixinPayment],
		data(){
			return{
				dataCart: [],
				count: 0,

				list_product: "",
				item_product: {
					id_number: 0,
					quantity: 0
				},
				total_pay: 0,

				user_Info: "",
				isDisable: false,

				info_buyer: {
					nameLast: "",
				 	phoneNumber: "",
					info_address: ""
				},
			}
		},
		created(){
			this.dataCart = JSON.parse(this.$cookies.get('cart'))
			this.count = this.dataCart.length;
			this.getInfoBuyer()
		},
		computed:{
			checkUserInfo(){
				if (this.$store.state.userInfo && this.$store.state.userInfo !== "") {
					if (this.$store.state.userInfo.data && this.$store.state.userInfo.data !== "") {
						if(this.$store.state.userInfo.data.auth_email != "N" && this.$store.state.userInfo.data.wallet_address != ""){
							this.user_Info = this.$store.state.userInfo.data
						} else return false
					} else return false
				} else return false
			},
		},
		methods:{
			getInfoBuyer(){
				if(typeof localStorage.INFO_BUYER === 'undefined' && this.checkUserInfo != false){
					
					this.info_buyer.nameLast = this.$store.state.userInfo.data.fullname
					this.info_buyer.phoneNumber = this.$store.state.userInfo.data.phone_number
					this.info_buyer.info_address = this.$store.state.userInfo.data.address_shop

				} else {
					const info = JSON.parse(localStorage.INFO_BUYER);
					this.info_buyer.nameLast = info.nameLast
					this.info_buyer.phoneNumber = info.phoneNumber
					this.info_buyer.info_address = info.info_address
				}
			},

			totalPay(){
				var total = 0;
				if (this.dataCart != "" && this.dataCart !== null && this.dataCart !== undefined) {
					for (var i = 0; i < this.dataCart.length; i++) {
						if (this.dataCart[i].price_promotion != null) { total += this.dataCart[i].quantity * this.dataCart[i].price_promotion }
						else { total += this.dataCart[i].quantity * this.dataCart[i].price_origin }
					}
				}
				this.total_pay = total
				return this.numberTotalPay(total);
			},

			check(){
				if (this.$store.state.userInfo && this.$store.state.userInfo !== "") {
					if (this.$store.state.userInfo.data && this.$store.state.userInfo.data !== "") {
						return this.user_Info = this.$store.state.userInfo.data
					} return false
				}  return false
			},

			order(){

				this.$loading(true)
				if(!this.check()){ Vue.notify({ group: 'success',title: 'Confirm',text: 'You must signin account !!',type: 'warn'}); return this.$loading(false); }
				
				const { auth_email, wallet_address, balance } = this.user_Info
				if(auth_email == "N"){ Vue.notify({ group: 'success',title: 'Confirm',text: 'Email is not authen !!',type: 'warn'}); return this.$loading(false);}
				
				else if(wallet_address == ""){ Vue.notify({ group: 'success',title: 'Confirm',text: 'You have not wallet address !!',type: 'warn'}); return this.$loading(false);} 
				
				else if(balance  < this.total_pay){ Vue.notify({ group: 'success',title: 'Confirm',text: 'Account balance is not enough to purchase !!',type: 'warn'}); return this.$loading(false);} 
				
				else {
					this.list_product = JSON.stringify(this.dataCart);
					axios.post(`${this.$store.state.apiLink}/payments`, {
						
						"user_id": this.$store.state.userInfo.data.id_number,
						"buyer_fullname": this.info_buyer.nameLast,
						"buyer_phonenumber": this.info_buyer.phoneNumber,
						"buyer_address": this.info_buyer.info_address,
						
						"token": localStorage.token,
						"appId": $cookies.get('appId')
					})
					.then(res => {
						if(!res.data.successes) { Vue.notify({ group: 'success',title: 'Confirm',text: res.data.reason, type: 'warn'}); return this.$loading(false);  }
						
						this.dataCart = []
						$cookies.remove("cart")
						$cookies.remove("appId")
						this.$nuxt.$emit("clearNumberCart", 0)
						Vue.notify({ group: 'success',title: 'Confirm',text: 'Order success !!', type: 'success'});
						setTimeout(() => { this.$loading(false); this.$router.push({path: "/order"})}, 1000)
					})
					.catch(err => { Vue.notify({ group: 'success',title: 'Error',text: err, type: 'error'}); return this.$loading(false); });
				}
			},

			editOrder() {
				this.$router.push({path: "/cart"}) 
				this.$store.dispatch('buttonUpdateOrder') 
			},
		}
	}
</script>