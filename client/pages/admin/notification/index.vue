<template>
	<div>
		<div v-if="check" class="notification">
			<div class="content-notification">
				<div class="row">
					<div class="col-md-12">
						<div class="content">
							<h2>Thông báo</h2>
							<p><i style="font-size: 14px; color: red">(Bạn có {{$store.state.userNotification.length}} thông báo chưa đọc)</i></p>
							<table class="table mb-0">
								<thead>
									<tr>
										<th>STT</th>
										<th>Ngày đặt</th>
										<th>Tiêu đề</th>
										<th style="text-align: center;">Nội dung</th>
										<th></th>
									</tr>
								</thead>
								<tbody v-for="(notification, index) in $store.state.userNotification" :key="index">
								<tr>
									<td @click="activeOrderDetail(notification)">{{index + 1}}</td>
									<td @click="activeOrderDetail(notification)"><i>{{new Date(notification.created_at*1000).toLocaleString()}}</i></td>
									<td @click="activeOrderDetail(notification)" style="font-size: 15px;"><strong>{{notification.title}}</strong></td>
									<td @click="activeOrderDetail(notification)"><i style="font-size: 14px;">{{notification.content}}</i></td>
									<td>
										<span><li style="list-style: none" @click="deleteNotification(notification.id_number)"><nuxt-link to="/admin/notification"><i>Xóa</i></nuxt-link></li></span>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="background: none;">
			<div id="app " style="padding: 0 15px;">
				<paginate v-model = pageCurrent :page-count="$store.state.pages" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"></paginate>
			</div>
		</div>
		<!-- <div id="nohas-product-detail" v-else><ErrorComponent/></div> -->
	</div>
</template>
<script>
	import Vue from "vue"
	import ErrorComponent from "~/components/client/error"
	import axios from "axios"
	import VueCookies from 'vue-cookies'
	import Paginate from 'vuejs-paginate'
	import mixinDecentralize from '~/functions/decentralize'
	
	Vue.component('paginate', Paginate)
	export default {
		layout:"admin",
		components:{ ErrorComponent },
		mixins: [mixinDecentralize],
		head(){ return{} },
		data(){
			return {
				dataCart:[],
				count: 0,

				pageCurrent: 0,
			}
		},
		mounted() {
			this.pageCurrent = this.$store.state.pageCurrent
		},
		methods:{
			
			clickCallback(page) { 
				this.$store.dispatch('notification', page); 
			},

			check(){ return this.orders != "" ? true : false },
			
			activeOrderDetail(notification){
				axios.post(`${this.$store.state.apiLink}/payments/shop/order-detail`, { "token": localStorage.token, "payment_id": notification.payment_id })
				.then( data => { if (data.data.successes) { this.$root.$router.push({ path: `/admin/orders/order-detail/${data.data.data.id_number}`}) } })
				.catch(err =>{console.log(err)})
			},

			deleteNotification(id_number){
				axios.post(`${this.$store.state.apiLink}/payments/delete-notification`, { "token": localStorage.token, "id_number": id_number })
				.then(data => { if (data.data.successes) { this.$store.dispatch('notification', this.pageCurrent); } })
				.catch(err =>{console.log(err)})
			}
		}
	}
</script>
