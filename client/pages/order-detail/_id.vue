<template>
	<div>
		<div v-if="check" id="payment">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
								<li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								<li><nuxt-link to='/order'>Order Detail</nuxt-link></li>
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
								<notifications group="success" />
								<div class="content">
									<div class="title-description">
										<h2>ĐƠN HÀNG CỦA BẠN</h2>
										<p>Vui lòng kiểm tra thông tin của bạn để nhận hàng một cách chính xác và thuận tiện.</p>
									</div>
									<div class="row">
										<div class="col-md-12 cart-address">
											<div class="title-address" style="text-align: left; padding: 0 15px;">
												<h2 >Địa chỉ người nhận</h2>
												<h2 style="font-size: 15px; color: #242424">{{payment.buyer_fullname}}</h2>
												<p style="color: #888">Số điện thoại: {{payment.buyer_phonenumber}}</p>
												<p style="color: #888">Địa chỉ nhận: {{payment.buyer_address}}</p>
												<p style="color: #888">Ngày mua: {{new Date(payment.created_timestamp*1000).toLocaleString()}}</p>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="cart-address" style="padding: 0 25px; width: 100%;">
											<div class="title-address" style="padding: 0 10px;">
												<h2>Đơn hàng ( {{count}} sản phẩm ) </h2>
											</div>
											<div class="order">
												<div class="row item-order">
													<div class="col-4"><strong>Tên sản phẩm</strong></div>
													<div class="col-2"></div>
													<div class="col-1"><strong>Giá</strong></div>
													<div class="col-1"><strong>Số lượng</strong></div>
													<div class="col-2"><strong>Thành tiền</strong></div>
													<div class="col-1"><strong>Trạng thái</strong></div>
													<div class="col-1"><strong></strong></div>
												</div>
											</div>
											<div class="order" v-for="(item,index) in listShop" :key="index">
												<div class="row item-order" >
													<template v-for="list in item" >
														<div class="col-4"><nuxt-link :to="'/product/'+list.link">{{list.name_product}}</nuxt-link></div>
														<div class="col-2"><img :src="$store.state.apiApp + 'products/' + list.image_main" v-if="list.image_main" alt="" style="max-width: 50px"></div>
														<div class="col-1">{{formatPrice(list)}}</div>
														<div class="col-1" style="text-align: center;">{{list.quantity}}</div>
														<div class="col-2" style="font-weight: 500;">{{numberWithCommas(list)}} &nbsp;blood</div>
													</template>
														<div class="col-1" style="font-size: 10px; text-align: center"><i>{{stateProduct(item[0].state)}}</i></div>
														<div class="col-1" v-if="item[0].state == 1"><button style="list-style: none; font-size: 10px; text-align: center" class="btn btn-primary"  @click="receivedOrderOfShop(item[0].user_id)">Đã nhận</button></div>
												</div>
											</div>
											<div class="order">
												<div class="row item-order">
													<div class="col-8" style="color: #888; text-align: left;">Tạm tính: </div>
													<div class="col-4" style="font-weight: 500; text-align: left;"> {{numberTotalPay(payment.total_pay)}} &nbsp;blood</div>
												</div>
											</div>
											<div class="total">
												<div class="row item-total">
													<div class="col-8 total-pay" style="text-align: left;"><strong style="color: #212529;">Thành tiền: </strong></div>
													<div class="col-4 total-pay" style="font-weight: 500; text-align: left;"> {{numberTotalPay(payment.total_pay)}} &nbsp;blood</div>
												</div>
											</div>
										</div>
									</div>
									<template v-if="!payment.seller_confirm">
										<div class="row">
											<div class="col-md-12">
												<div class="form-group" id="button-buy">
													<li v-if="payment.cancelled == 0"><button class="btn btn-primary"  @click="cancelOrder()">Hủy Đơn Hàng</button></li>
													<li v-else ><button class="btn btn-danger" :disabled="true">Bạn Đã Hủy</button></li>
												</div>
											</div>
										</div>
									</template>
									<!-- <template v-if="payment.seller_confirm">
										<li v-if="checkButtonReceivedAll"><button class="btn btn-primary"  @click="receivedOrder()">Nhận tất cả</button></li>
									</template>
									<template v-else>
										<li v-if="payment.cancelled == 0"><button class="btn btn-primary" :disabled="payment.cancelled != 0" @click="cancelOrder()">Hủy Đơn Hàng</button></li>
										<li v-else ><button class="btn btn-danger" :disabled="true">Đã Hủy </button></li>
									</template> -->
								</div>
							</div>
						</template>
						<template v-else>
							<notifications style="width: 70%; top: 42px; right: 0px;" group="success" />
							<div class="content" >
								<div class="title-description" style="padding: 5px 0;">
									<h2>ĐƠN HÀNG CỦA BẠN</h2>
									<p>Vui lòng kiểm tra thông tin của bạn để nhận hàng.</p>
								</div>
								<div class="cart-address">
									<div class="title-address" style="text-align: left; color: #888; ">
										<h2 style="border-bottom: 1px solid #c9c9c9; padding: 7px 0; margin-top: 10px;">Địa chỉ người nhận</h2>
										<div style="padding: 0 10px;">
											<h2 style="font-size: 15px; color: #242424">{{payment.buyer_fullname}}</h2>
											<p style="color: #888">Số điện thoại: {{payment.buyer_phonenumber}}</p>
											<p style="color: #888">Địa chỉ nhận: {{payment.buyer_address}}</p>
											<p>Ngày mua: {{new Date(payment.created_timestamp*1000).toLocaleString()}}</p>
										</div>
									</div>
								</div>
								<div class="cart-address">
									<div class="title-address" style="text-align: left; border-bottom: 1px solid #c9c9c9;">
										<div><h2>Đơn hàng ( {{count}} sản phẩm ) </h2></div>
									</div>
									<div class="order" v-for="(item, index) in listShop" :key="index">
										<template v-for="list in item">
											<div class="col-xs-5" style="padding: 0;">
												<div class="img-box" style="padding: 5px 0;">
													<img :src="$store.state.apiApp + 'products/' + list.image_main" v-if="list.image_main" alt="" style="max-width: 100px; float: left;">
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
												<!-- <div style="font-size: 14px; color: #888;">Trạng thái: <i>{{stateProduct(item[0].state)}}</i></div> -->
											</div>
										</template>
										<div class="col-xs-12" style="margin-top: 10px; padding: 0; ">
											<div style="font-size: 14px; color: #888; text-align: left; padding: 10px 0;">Trạng thái chi tiết đơn: <i style="font-weight: 500; color: black;">{{stateProduct(item[0].state)}}</i></div>
											<template v-if="item[0].state == 1">
												<button style="list-style: none; font-size: 14px; width: 100%;"  class="btn btn-primary" @click="receivedOrderOfShop(item[0].user_id)">Đã nhận</button>
											</template>
										</div>
										<div class="col-xs-12" style="border-bottom: 1px solid #c9c9c9; padding-bottom: 10px;"></div>
									</div>
								</div>
								<div class="col-xs-12" style="padding: 10px 0; border-bottom: 1px solid #c9c9c9;">
									<div style="text-align: left; font-size: 14px;">Tạm tính: <strong style="font-weight: 600; float: right;">{{numberTotalPay(payment.total_pay)}} &nbsp;blood</strong></div>	
								</div>
								<div class="col-xs-12" style="margin: 10px 0; padding: 0; ">
									<div class=" total-pay" style="text-align: left; font-size: 16px;"><strong style="color: #212529">Thành tiền: </strong><strong style="float: right; font-weight: 500;">{{numberTotalPay(payment.total_pay)}} &nbsp;blood</strong></div>
								</div>
								<div class="form-group col-xs-12" id="button-buy" style="margin: 20px 0;">
									<template v-if="!payment.seller_confirm">
										<li v-if="payment.cancelled == 0"><button class="btn btn-primary"  @click="cancelOrder()">Hủy Đơn Hàng</button></li>
										<li v-else ><button class="btn btn-danger" :disabled="true">Đã Hủy Đơn</button></li>
									</template>
									<!-- <template v-if="payment.seller_confirm">
										<li v-if="checkButtonReceivedAll"><button class="btn btn-primary"  @click="receivedOrder()">Nhận tất cả</button></li>
									</template>
									<template v-else>
										<li v-if="payment.cancelled == 0"><button class="btn btn-primary" :disabled="payment.cancelled != 0" @click="cancelOrder()">Hủy Đơn Hàng</button></li>
										<li v-else ><button class="btn btn-danger" :disabled="true">Đã Hủy </button></li>
									</template> -->
								</div>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
		<div id="nohas-product-detail" v-else>
			<ErrorComponent/>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import axios from "axios"
	import _ from "lodash"
	import VueCookies from 'vue-cookies'
	import Notifications from 'vue-notification';
	import VueLoading from 'vuejs-loading-plugin';
	import mixinPayment from'../../functions/general';
	import ErrorComponent from "~/components/client/error"
	
	Vue.use(Notifications);
	Vue.use(VueLoading);

	export default {
		components:{ ErrorComponent },
		mixins: [mixinPayment],
		head(){ return { title:"Payment || BLOOD SHOPPING MALL" } },
		data(){
			return {
				dataCart: [],
				count: 0,

				listprovinces: [],
				listDistricts: [],
				listWards: [],

				orders: [],
				payment: "",
				
				statePro: "",
				list_state: [],
				count: 0,
				listShop: []
			}
		},
		created(){
			this.loadOrderDetail();
		},
		computed: {
			checkButtonReceived(){
				this.list_state = []
				this.count = 0
				for( let j = 0; j < this.orders.length; j ++){
					if(this.orders[j].state == 1) return false
					else {
						if(this.orders[j].state == 3) {
							this.list_state.push(this.orders[j].state)
							this.count +=  1 
						}
					}
				}
				return this.list_state.length == this.count ? true :false
			},

			checkButtonReceivedAll(){

				var countDelivering = 0
				var countCanceled = 0

				for( let i = 0; i < this.orders.length; i ++){
					if(this.orders[i].state == 2) { countCanceled +=  1 }
					else if(this.orders[i].state == 1) { countDelivering +=  1 }
				}
				if(countCanceled > 0) {
					if(countDelivering == this.orders.length - countCanceled) return true  
				} else {
					if(countDelivering == this.orders.length) return true
				}
			},
			check(){ return this.payment != "" ? true :  false },
		},
		methods:{
			loadOrderDetail(){
				axios.post(`${this.$store.state.apiLink}/payments/order-detail/${this.$route.params.id}`, { "token": localStorage.token })
				.then(data => {
					if (data.data.successes) {
						this.payment = data.data.payment
						this.orders = JSON.parse(data.data.payment.list_product)
						this.count = this.orders.length;
						var list = _.uniqBy(this.orders,"user_id")

						for( let i = 0; i < list.length; i++ ){
							var mangrong = []
							for(let j = 0; j <this.orders.length; j++){
								if(this.orders[j].user_id == list[i].user_id) mangrong.push(this.orders[j])
							}
							this.listShop.push(mangrong)
						}
					}
				})
				.catch(err =>{console.log(err)})
			},
			
			stateProduct(state){
				if(state == 0) return "Đang xử lý" 
				if(state == 1) return "Đang giao" 
				if(state == 2) return "Đã hủy" 
				if(state == 3) return "Đã nhận" 
			},
			
			cancelOrder(){
				this.$loading(true)
				axios.post(`${this.$store.state.apiLink}/payments/user-cancel`, { "token": localStorage.token, "id_number": this.payment.id_number })
				.then(data =>{
					if (!data.data.successes) {  Vue.notify({ group: 'success', title: 'Confirm', text: data.data.reason ,type: 'warn'}); return this.$loading(false); }
					
					Vue.notify({ group: 'success', title: 'Confirm', text: 'Cancel success !!',type: 'success'});
					setTimeout(() => { this.$loading(false); this.$router.push({path: "/order"})}, 1000)
				})
				.catch(err => { Vue.notify({ group: 'success', title: 'Error', text: err, type: 'warning'});  return this.$loading(false); });
			},
			
			receivedOrderOfShop(user_id_shop){
				this.$loading(true)
				axios.post(`${this.$store.state.apiLink}/payments/user-received`, { "token": localStorage.token, "id_number": this.payment.id_number, "user_id_shop": user_id_shop })
				.then(data =>{
					if ( !data.data.successes) {  Vue.notify({ group: 'success', title: 'Confirm', text: data.data.reason ,type: 'warn'}); return this.$loading(false) }
					
					Vue.notify({ group: 'success', title: 'Confirm', text: 'Receive success !!',type: 'success'});
					setTimeout(() => { this.$loading(false); this.$router.push({path: "/order"})}, 1000)
				})
				.catch(err =>{ Vue.notify({ group: 'success', title: 'Error', text: err, type: 'warning'}); return this.$loading(false)});
			},

			// receivedOrder(){
			// 	axios.post(`${this.$store.state.apiLink}/payments/user-received`, {
			// 		"token": localStorage.token,
			// 		"id_number": this.payment.id_number
			// 	})
			// 	.then(data =>{
			// 		if (data.data.successes === true) {
			// 			Vue.notify({ group: 'success', title: 'Confirm', text: 'Receive success !!',type: 'success'});
			// 			setTimeout(() => { this.$router.push({path: "/order"})}, 1000)
			// 		} else {
			// 			Vue.notify({ group: 'success', title: 'Confirm', text: data.data.reason ,type: 'warn'});
			// 		}
			// 	})
			// 	.catch(err =>{
			// 		Vue.notify({ group: 'success', title: 'Error', text: err, type: 'warning'});
			// 	});
			// }, 
		}
	}
</script>