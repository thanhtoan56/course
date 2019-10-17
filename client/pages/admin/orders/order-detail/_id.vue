<template>
	<div id="payment">
		<div class="content-payment">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<notifications group="success" />
						<div class="content">
							<div class="title-description">
								<h2 style="font-size: 25px; ">ĐƠN HÀNG</h2>
								<!-- <p>Kiểm tra thông tin của bạn để nhận hàng một cách chính xác</p> -->
							</div>
							<div class="row">
								<div class="col-md-12 cart-address">
									<div class="title-address">
										<div class="col-md-6">
											<h2>Địa chỉ người nhận</h2>
											<h2 style="font-size: 15px; color: #242424">{{order.buyer_fullname}}</h2>
											<p style="color: #888">Số điện thoại: {{order.buyer_phonenumber}}</p>
											<p style="color: #888">Địa chỉ nhận: {{order.buyer_address}}</p>
											<p style="color: #888">Ngày mua: {{new Date(order.created_timestamp*1000).toLocaleString()}}</p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 cart-address">
									<div class="title-address ">
										<div class="col-md-6"><h2>Đơn hàng ( {{count}} sản phẩm ) </h2></div>
									</div>
									<div class="col-md-12 order" >
										<div class="row item-order">
											<div class="col-md-4"><strong>Tên sản phẩm</strong></div>
											<div class="col-md-2"></div>
											<div class="col-md-1"><strong>Giá</strong></div>
											<div class="col-md-1"></div>
											<div class="col-md-1"><strong>Số lượng</strong></div>
											<div class="col-md-2"><strong>Thành tiền</strong></div>
											<div class="col-md-1"><strong>Trạng thái</strong></div>
										</div>
									</div>
									<div class="col-md-12 order" v-for="(list,index) in listProduct" :key="index">
										<div class="row item-order">
											<div class="col-md-4"><nuxt-link :to="'/' + list.link">{{list.name_product}}</nuxt-link></div>
											<div class="col-md-2"><img :src="$store.state.apiApp + 'products/' + list.image_main" v-if="list.image_main" alt="" style="max-width: 80px"></div>
											<div class="col-md-1" >{{formatPrice(list)}} blood</div>
											<div class="col-md-1" style="text-align: center;" >x</div>
											<div class="col-md-1" style="text-align: center;" >{{list.quantity}}</div>
											<div class="col-md-2" style="font-weight: 500">{{numberWithCommas(list)}} blood</div>
											<div class="col-md-1" style="font-size: 14px; text-align: center"><i>{{stateProduct(list.state)}}</i></div>
										</div>
									</div>
									<div class="col-md-12 order">
										<div class="row item-order">
											<div class="col-md-9" style="color: #888;">Tạm tính: </div>
											<div class="col-md-3" style="font-weight: 500"> {{totalPay(listProduct)}} blood</div>
										</div>
									</div>
									<div class="col-md-12 total">
										<div class="row item-total">
											<div class="col-md-9"><strong>Thành tiền: </strong></div>
											<div class="col-md-3 total-pay" style="font-weight: 500"> {{totalPay(listProduct)}} blood</div>
										</div>
										<div class="row vat">
											<!-- <div><i style="text-align: center;">(Đã bao gồm VAT)</i></div> -->
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group row" id="button-buy" >
										<template v-if="!checkAccept">
											<li  id="cancelPayment"  @click="cancelOrder(order.id_number)"><nuxt-link to="#"  id="click-buy" style="border: 1px solid #ccc; background: #fff; color: #212529;">Hủy đơn hàng</nuxt-link></li>
											<li  id="acceptPayment"  @click="acceptOrder(order.id_number)"><nuxt-link to="#"  id="click-buy" >Xác nhận và giao hàng </nuxt-link></li>
										</template>
									</div>
								</div>
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
	import Notifications from 'vue-notification';
	import mixinDecentralize from '~/functions/decentralize';
	import mixinPayment from '~/functions/general';
	import VueLoading from 'vuejs-loading-plugin';
	
	Vue.use(Notifications);
	Vue.use(VueLoading);
	export default {
		layout: "admin",
		mixins: [mixinDecentralize, mixinPayment],
		head(){ return { title:"Payment || BLOOD SHOPPING MALL" } },
		
		data(){
			return{
				dataCart: [],
				count: 0,

				listProduct: [],
				order: ""
			}
		},
		
		created(){
			this.loadOrderDetailForShop();
		},
		computed: {
			checkAccept(){ return this.order.seller_confirm || this.order.cancelled ? true : false  }
		},
		methods:{
			loadOrderDetailForShop(){
				axios.post(`${this.$store.state.apiLink}/payments/shop/order-detail/${this.$route.params.id}`, { "token": localStorage.token })
				.then(data =>{
					if (data.data.successes) {
						this.order = data.data.data
						this.listProduct = JSON.parse(data.data.data.list_product)
						this.count = this.listProduct.length;
					}
				})
				.catch(err =>{console.log(err)})
			},

			totalPay(list){
				var total = 0;
				if (list != "" && list !== null && list !== undefined) {
					for (var i = 0; i < list.length; i++) {
						if (list[i].price_promotion != 0) { total += list[i].quantity * list[i].price_promotion }
						else { total += list[i].quantity * list[i].price_origin }
					}
				}
				return this.numberTotalPay(total);
			},

			stateProduct(state){
				if(state == 0) return "Đang chờ" 
				if(state == 1) return "Đang giao" 
				if(state == 2) return "Đã hủy"
				if(state == 3) return "Đã giao" 
			},

			cancelOrder(id_number){
				this.$loading(true)
				axios.post(`${this.$store.state.apiLink}/payments/shop-cancel-order`, { "token": localStorage.token, "id_number": id_number })
				.then(data => {
					if (!data.data.successes){  Vue.notify({ group: 'success', title: 'Error', text: "Cancel is not successes", type: 'warn'}); return this.$loading(false); }
					Vue.notify({ group: 'success',title: 'Confirm',text: 'Cancel success !!',type: 'success'});
					setTimeout(() => { this.$loading(false); this.$router.replace({ path: '/admin/orders' }) }, 1000)
				})
				.catch(err => { Vue.notify({ group: 'success', title: 'Error', text: err, type: 'warning'}); return this.$loading(false); });
			},

			acceptOrder(id_number){
				axios.post(`${this.$store.state.apiLink}/payments/shop-accept-order`, { "token": localStorage.token, "id_number": id_number })
				.then(data => {
					if (data.data.successes){
						Vue.notify({ group: 'success',title: 'Confirm',text: 'Accept success !!',type: 'success'});
						setTimeout(() => { this.$router.replace({ path: '/admin/orders' }) },1000)
					}
				})
				.catch(err =>{ Vue.notify({ group: 'success',title: 'Confirm',text: 'Accept fail !!',type: 'warn'});})
			}
		}
	}
</script>