<template>
	<div>
		<div v-if="check" class="notification" style="background: none ;">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
								<li><nuxt-link to ='/'>Trang chủ</nuxt-link></li>
								<li><nuxt-link to ='/notification'>Thông báo của tôi </nuxt-link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="content-notification" :style="checkResponsive ? {'margin-top': 15 + 'px', 'margin-bottom': 15 + 'px'} : {}">
				<div class="container">
					<div class="row">
						<template v-if="checkResponsive">
							<div class="col-md-12">
								<div class="content">
									<h2>Thông báo</h2>
									<p><i style="font-size: 14px; color: red">(Bạn có {{$store.state.count}} thông báo.)</i></p>
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
													<span><li style="list-style: none" @click="deleteNotification(notification.id_number)"><nuxt-link to="/notification"><i>Xóa</i></nuxt-link></li></span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="content" style="margin-top: 42px; width: 100%; padding: 10px;">
								<h2 style="font-size: 16px; margin: 0;">Thông báo</h2>
								<p style="    margin-bottom: 5px;"><i style="font-size: 12px; color: red">(Bạn có {{$store.state.count}} thông báo.)</i></p>
								<table class="table">
									<tbody v-for="(notification, index) in $store.state.userNotification" :key="index">
										<tr>
											<td style="text-align: left; font-size: 13px; inline-height: 5px;" @click="activeOrderDetail(notification)">
												<div style="font-weight: 500">Tiêu đề: <strong>{{notification.title}}</strong></div>
												<div style="font-weight: 500">Ngày: <i style="font-weight: 400">{{new Date(notification.created_at*1000).toLocaleString()}}</i></div>
												<div style="padding-top: 10px; font-weight: 500;">Nội dung: </div>
												<div><i style="font-size: 12px;">{{notification.content}}</i></div>
											</td>
											<span style="list-style: none; font-size: 20px; " @click="deleteNotification(notification.id_number)"><nuxt-link to="/notification">x</nuxt-link></span>
										</tr>
									</tbody>
								</table>
							</div>
						</template>
					</div>
					<div class="row" v-if="$store.state.pages > 1">
						<div id="app" style="padding: 0 15px;">
							<paginate  :page-count="$store.state.pages" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"></paginate>
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
	import Paginate from 'vuejs-paginate'
	import ErrorComponent from "~/components/client/error"

	Vue.component('paginate', Paginate)
	export default {
		components:{ ErrorComponent },
		head(){
			return { title:"Payment || BLOOD SHOPPING MALL" }
		},
		data(){
			return{
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
				this.$root.$router.push({ path: `/order-detail/${notification.payment_id}`})
			},

			deleteNotification(id_number){
				axios.post(`${this.$store.state.apiLink}/payments/delete-notification`, { "token": localStorage.token, "id_number": id_number })
				.then(data => { if (data.data.successes) { this.$store.dispatch('notification', this.pageCurrent); }})
				.catch(err =>{console.log(err)})
			}
		}
	}
</script>
<style>
	#app { 
		display: flex;
		justify-content: center;
		margin-top: 0px !important;
		margin: 0 auto;
	}
</style>