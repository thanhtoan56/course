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
								<li style="width: 50%;"><a href="javascript:void(0)"><span>Order</span></a></li>
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
								<div class="content">
									<table class="table mb-0">
										<thead class="bg-light">
											<tr>
												<th scope="col" class="border-0">STT</th>
												<th scope="col" class="border-0">Mã đơn</th>
												<th scope="col" class="border-0">Ngày mua</th>
												<th scope="col" class="border-0">Tổng tiền</th>
												<th scope="col" class="border-0">Trạng thái đơn hàng</th>
												<th scope="col" class="border-0">Chi tiết</th>
											</tr>
										</thead>
										<tbody v-for="(order, index) in orders" :key="index">
											<tr>
												<td>{{index + 1}}</td>
												<td>{{order.id_number}}</td>
												<td>{{new Date(order.created_timestamp*1000).toLocaleString()}}</td>
												<td>{{numberTotalPay(order.total_pay)}} &nbsp;blood</td>
												<td style="font-size: 14px;"><i><strong>{{stateOrder(order)}}</strong></i></td>
												<td> <span><nuxt-link :to="'/order-detail/' + order.id_number"><i>Xem</i></nuxt-link></span> </td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="content">
								<div class="row">
									<div class="cart-address" style="width: 100%; ">
										<div class="title-address " style="text-align: left; border-bottom: 1px solid #c9c9c9;">
											<h2 style="margin-top: 15px; font-size: 15px;">Danh Sách Đơn ({{orders.length}}) </h2>
										</div>
									</div>
								</div>
								<table class="table mb-0">
									<tbody v-for="(order, index) in orders" :key="index">
										<tr>
											<td @click="seenDetail(order.id_number)" style="text-align: left; font-size: 14px; color: #666; line-height: 20px; font-weight: 400;">
												<div style="margin-bottom: 5px;">Mã đơn: <strong style="color: black;">{{order.id_number}}</strong></div>
												<div >Ngày mua: {{new Date(order.created_timestamp*1000).toLocaleString()}}</div>
												<div >Tổng tiền: {{numberTotalPay(order.total_pay)}} &nbsp;blood</div>
												<div >Trạng thái: <i><strong>{{stateOrder(order)}}</strong></i></div>
											</td>
										</tr>
									</tbody>
								</table>
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
	import VueCookies from 'vue-cookies';
	import mixinPayment from'../../functions/general';
	import ErrorComponent from "~/components/client/error"

	export default {
		components:{ ErrorComponent },
		mixins: [mixinPayment],
		head(){ return { title:"Payment || BLOOD SHOPPING MALL" } },
		data(){
			return{
				dataCart: [],
				count: 0,

				listprovinces: [],
				listDistricts: [],
				listWards: [],

				orders: [],

				list_state: [],
				countReceived: 0,
				countDelivered: 0,
			}
		},
		created(){
			this.loadOrder();
		},
		methods:{
			loadOrder(){
				axios.post(`${this.$store.state.apiLink}/payments/list-order`, { "token": localStorage.token})
				.then(data => {
					if (data.data.successes) {
						this.orders = data.data.data.sort((x, y) =>  y.created_timestamp - x.created_timestamp) 
					}
				})
				.catch(err =>{console.log(err)})
			},

			check(){ return this.orders != "" ? true :  false },

			stateOrder(order){
				if(order.cancelled == 1){ return "Bạn đã hủy" } 
				else if(order.cancelled == 2){ return "Shop đã hủy" } 
				else {
					if(order.seller_confirm == true){
						
						var countReceived = 0
						var countCanceled = 0
						var countDefault = 0

						var list_product = JSON.parse(order.list_product)
						for( let i = 0; i < list_product.length; i ++){
							if(list_product[i].state == 2) { countCanceled +=  1 }
							else if(list_product[i].state == 3) { countReceived +=  1 }
							else if(list_product[i].state == 0) { countDefault +=  1 }
						}

						if(countCanceled > 0) {
							if(countReceived == list_product.length - countCanceled) return "Thành công"  
							else {
								if(countDefault > 0) return "Đang chờ"
								else return "Đang giao"
							}
							
						} else {
							if(countReceived == list_product.length) return "Thành công"
							else {
								if(countDefault > 0) return "Đang chờ"
								else return "Đang giao"
							} 
						}
					} else return "Đang chờ"
				}
			},
			seenDetail(id_number){ this.$router.push({path: "/order-detail/" + id_number}) }
		}
	}
</script>