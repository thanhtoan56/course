<template>
	<div>
		<div v-if="check" id="payment">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
								<li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								<li><nuxt-link to='/order'>Đơn hàng</nuxt-link></li>
								<!-- <li style="width: 852px;"><a href="javascript:void(0)"><span>Order</span></a></li> -->
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="content-payment">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="content">
								<table class="table mb-0">
									<thead class="bg-light">
										<tr>
											<th scope="col" class="border-0">Mã đơn</th>
											<th scope="col" class="border-0">Ngày mua</th>
											<th scope="col" class="border-0">Tổng tiền</th>
											<th scope="col" class="border-0">Trạng thái đơn hàng</th>
											<th scope="col" class="border-0">Chi tiết</th>
										</tr>
									</thead>
									<tbody v-for="(order, index) in orders" :key="index">
										<tr>
											<td><li style="list-style: none"><nuxt-link :to="'/order-detail/' + order.id_number">{{order.id_number}}</nuxt-link></li></td>
											<td><li style="list-style: none"><nuxt-link :to="'/order-detail/' + order.id_number">{{new Date(order.created_timestamp*1000).toLocaleString()}}</nuxt-link></li></td>
											<td>{{numberTotalPay(order.total_pay)}} &nbsp;đ</td>
											<td><i>{{stateOrder(order.state_order)}}</i></td>
											<td><span><nuxt-link :to="'/order-detail/' + order.id_number"><i>Xem</i></nuxt-link></span></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="nohas-product-detail" v-else><ErrorComponent/></div>
	</div>
</template>
<script>
	import Vue from "vue"
	import axios from "axios"
	import VueCookies from 'vue-cookies'
	import ErrorComponent from "~/components/client/error"

	export default {
		components:{ ErrorComponent },
		head(){ return { title:"Payment || BLOOD SHOPPING MALL" } },
		data(){
			return{
				dataCart: [],
				count: 0,

				listprovinces: [],
				listDistricts: [],
				listWards: [],

				orders: [],
			}
		},
		created(){
			this.loadOrder();
		},
		methods:{
			loadOrder(){
				axios.post(`${this.$store.state.apiLink}/payments/list-order`, { "token": localStorage.token })
				.then(data => { if (data.data.successes) this.orders = data.data.data })
				.catch(err =>{console.log(err)})
			},
			
			check(){ return this.orders != "" ? true : false },
			
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
			
			stateOrder(state_order) { return state_order === false ? "Đang xử lý" : "Đang giao" },
		}
	}
</script>