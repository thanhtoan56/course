<template>
	<div>
		<div v-if="check" id="payment">
			<div class="content-payment">
                <div class="row">
                    <div class="col-md-12">
                        <div class="content">
                            <table class="table mb-0">
                                <thead class="bg-light">
									<tr>
										<th scope="col" class="border-0">STT</th>
										<th scope="col" class="border-0">Mã order</th>
										<th scope="col" class="border-0">Mã thanh toán</th>
										<th scope="col" class="border-0">Ngày mua</th>
										<th scope="col" class="border-0">Tổng tiền</th>
										<th scope="col" class="border-0">Trạng thái đơn hàng</th>
										<th scope="col" class="border-0">Chi tiết</th>
									</tr>
                                </thead>
                                <tbody v-for="(order, index) in orders" :key="index">
									<tr>
										<td>{{index + 1}}</td>
										<td>#{{order.id_number}}</td>
										<td>#{{order.payment_id}}</td>
										<td>{{new Date(order.created_timestamp*1000).toLocaleString()}}</td>
										<td>{{totalPay(order.list_product)}} blood</td>
										<td><i>{{stateOrder(order)}}</i></td>
										<td> <nuxt-link :to="'/admin/orders/order-detail/' + order.id_number"><i>Xem</i></nuxt-link></td>
									</tr>
                                </tbody>
                            </table>
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
	import ErrorComponent from "~/components/client/error"
	import axios from "axios"
	import VueCookies from 'vue-cookies'
	import mixinDecentralize from '~/functions/decentralize';
	import mixinPayment from '~/functions/general';

	export default {
        layout: "admin",
		components:{ ErrorComponent },
		mixins: [mixinDecentralize, mixinPayment],
		head(){ return { title:"Payment || BLOOD SHOPPING MALL" } },
		data(){
			return {
				dataCart: [],
				count: 0,

				orders: [],
				list_product: [],
			}
		},
		
		created(){
			this.loadListOrderForShop();
		},
		methods:{
			
			loadListOrderForShop(){
				axios.post(`${this.$store.state.apiLink}/payments/list-order-for-shop`, { "token": localStorage.token })
				.then(data => { if (data.data.successes) { this.orders = data.data.data.sort((x, y) =>  y.created_timestamp - x.created_timestamp) } })
				.catch(err =>{console.log(err)})
			},
			
			check(){ return this.orders != "" ? true : false },

			totalPay(x){
				var total = 0;
				var list = JSON.parse(x)
				if (list != "" && list !== null && list !== undefined) {
					for (var i = 0; i < list.length; i++) {
						if (list[i].price_promotion != 0) { total += list[i].quantity * list[i].price_promotion }
						else { total += list[i].quantity * list[i].price_origin }
					}
				}
				return this.numberTotalPay(total);
			},
			
			stateOrder(order){
				if(order.seller_confirm == true && order.completed == true && order.cancelled == 0){
					return "Đã hoàn thành"
				} else {
					if(order.seller_confirm == true && order.cancelled == 0){
						return "Đang giao"
					}
					else if(order.seller_confirm == false && order.cancelled == 0){
						return "Đang chờ"
					} 
					else if(order.seller_confirm == false && order.cancelled == 1){
						return "Khách đã hủy"
					}
					else if(order.seller_confirm == false && order.cancelled == 2){
						return "Bạn đã hủy"
					}
				}
			},
		}
	}
</script>