<template>

	<div id="payment">
		<div class="full-breadcumb">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb">
							<li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
							<li><nuxt-link to='/order'>Order Detail</nuxt-link></li>
							<!-- <li style="width: 852px;"><a href="javascript:void(0)"><span>Payment</span></a></li> -->
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="content-payment">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<notifications group="success" />
						<div class="content">
							<div class="title-description">
								<h2>Đơn hàng của bạn</h2>
								<p>Kiểm tra thông tin của bạn để nhận hàng một cách chính xác</p>
							</div>
							<div class="row">
								<div class="col-md-12 cart-address">
									<div class="title-address">
										<div class="col-md-6">
											<h2>Địa chỉ người nhận</h2>
											<h2>{{this.$store.state.info_buyer.info_buyer.nameLast}}</h2>
											<p>Số điện thoại: {{this.$store.state.info_buyer.info_buyer.phoneNumber}}</p>
											<p>Địa chỉ nhận: {{this.$store.state.info_buyer.info_buyer.info_address}}</p>
										</div>
										<!-- <div class="col-md-6"><li><nuxt-link to="/delivery-address" id="button-payment">Sửa</nuxt-link></li></div> -->
										<!-- <div class="col-md-6 ">
											<h2>Thông báo</h2>
											<p>{{this.$store.state.info_buyer.info_buyer.nameLast}}</p>
											<p>Số điện thoại: {{this.$store.state.info_buyer.info_buyer.phoneNumber}}</p>
											<p>Địa chỉ nhận: {{this.$store.state.info_buyer.info_buyer.info_address}}</p>
										</div> -->
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 cart-address">
									<div class="title-address ">
										<div class="col-md-6"><h2>Đơn hàng ( {{count}} sản phẩm ) </h2></div>
										<!-- <div class="col-md-6"><li ><nuxt-link to="/cart" id="button-payment">Sửa</nuxt-link></li></div> -->
									</div>
									<div class="col-md-12 order" v-for="(list,index) in orders" :key="index">
										<div class="row item-order">
											<div class="col-md-8"><nuxt-link :to="'/' + list.link">{{list.name}}</nuxt-link></div>
											<div class="col-md-1">x</div>
											<div class="col-md-1">{{list.quantity}}</div>
											<div class="col-md-2">{{numberWithCommas(list)}} &nbsp;đ</div>
										</div>
									</div>

									<div class="col-md-12 order">
										<div class="row item-order">
											<div class="col-md-10">Tạm tính: </div>
											<div class="col-md-2"> {{numberTotalPay(payment.total_pay)}} &nbsp;đ</div>
										</div>
									</div>

									<div class="col-md-12 total">
										<div class="row item-total">
											<div class="col-md-10"><strong>Thành tiền: </strong></div>
											<div class="col-md-2 total-pay"> {{numberTotalPay(payment.total_pay)}} &nbsp;đ</div>
										</div>
										<div class="row vat">
											<div><i style="text-align: center;">(Đã bao gồm VAT)</i></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group" id="button-buy">
										<li @click="deleteOrder()"><nuxt-link to="/order"  id="click-buy">Xóa Đơn Hàng</nuxt-link></li>
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

	Vue.use(Notifications);
	export default {
		head(){ return{ } },
		data(){
			return{
				dataCart:[],
				count: 0,

				orders: [],
				payment:""
			}
		},
		created(){
			this.loadOrderDetail();
		},
		
		methods:{
			loadOrderDetail(){
				axios.post(`${this.$store.state.apiLink}/payments/order-detail/${this.$route.params.id}`, { "token": localStorage.token})
				.then( data => {
					if (data.data.successes) {
						this.payment = data.data.payment
						this.orders = JSON.parse(data.data.payment.list_product)
						this.count = this.orders.length;
					}
				})
				.catch(err =>{console.log(err)})
			},
			
			total(data){
				var total = 0
				if (data != "" && data !== null && data !== undefined) {
					if (data.price_promotion != 0) { total = data.quantity * data.price_promotion }
					else { total = data.quantity * data.price_origin }
				}
				return total;
			},
			
			numberWithCommas(x) {
				var value = "" + this.total(x);
				var parts = value.split(".");
				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return parts.join(".");
			},

			numberTotalPay(x) {
				var value = "" + x;
				var parts = value.split(".");
				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return parts.join(".");
			},

			totalPay(){
				var total = 0;
				if (this.dataCart != "" && this.dataCart !== null && this.dataCart !== undefined) {
					for (var i = 0; i < this.dataCart.length; i++) {
						if (this.dataCart[i].price_promotion != 0) { total += this.dataCart[i].quantity * this.dataCart[i].price_promotion }
						else { total += this.dataCart[i].quantity * this.dataCart[i].price_origin }
					}
				}
				return this.numberTotalPay(total);
			},
			
			mathNumberCart(data){
				var total = 0
				if (data != "") {
					for (var i = 0; i < data.length; i++) { total += data[i].quantity }
				}
				return total;
			},
			
			deleteOrder(){
				axios.post(`${this.$store.state.apiLink}/payments/user-cancel`, {
					"token": localStorage.token,
					"id_number": this.payment.id_number
				})
				.then(data =>{
					if (data.data.successes) { Vue.notify({ group: 'success', title: 'Confirm', text: 'Delete success !!',type: 'success'}); }
					else { Vue.notify({ group: 'success', title: 'Confirm', text: 'Delete is not successes !!',type: 'warn'}); }
				})
				.catch(err => { Vue.notify({ group: 'success', title: 'Error', text: err, type: 'warning'}); });
			}
		}
	}
</script>