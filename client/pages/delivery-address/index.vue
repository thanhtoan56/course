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
							<div v-if="!dataUser" class="content">
								<div class="title-description">
									<h2>1. Đăng nhập / Đăng ký và tạo ví Wallet</h2>
									<p>Bạn cần đăng nhập để tiến hành đặt hàng !</p>
									<p><i>(Nếu bạn chưa có tài khoản hãy tiến hành đăng ký tài khoản và tạo ví Wallet)</i></p>
								</div>
							</div>
							<div v-if="dataUser" class="content">
								<div v-if="!isShowFormInfoAddress">
									<div class="title-description">
										<h2>2. Địa chỉ giao hàng</h2>
										<p>Chọn địa chỉ giao hàng có sẵn bên dưới.</p>
									</div>
									<div class="row">
										<div class="col-md-offset-3 col-md-6 col-sm-offset-3 cart-address">
											<div class="title-address" style="display: -webkit-box">
												<!-- <h2>Địa chỉ giao hàng (<i style="color: #007bff;" @click="showFormInfoAddress()">Sửa</i>)</h2>  -->
												<div style="text-align: left;"><h2>Địa chỉ giao hàng</h2></div>
												<div style="position: absolute; right: 3%;"><li @click="showFormInfoAddress()"><nuxt-link to="" id="button-payment">Sửa</nuxt-link></li></div>
											</div>
											<div class="col-md-12 info-address">
												<h2>{{this.$store.state.userInfo.data.fullname}}</h2>
												<p>Số điện thoại: {{this.$store.state.userInfo.data.phone_number}}</p>
												<p>Địa chỉ nhận: {{this.$store.state.userInfo.data.address_shop}}</p>
											</div>
										</div>
									</div>
									<template v-if="$store.state.userInfo.data.phone_number != '' && $store.state.userInfo.data.phone_number != 0 && $store.state.userInfo.data.address_shop != ''">
										<div class="row">
											<div class="col-md-12">
												<div class="form-group" id="button-buy">
													<li @click="save_info_buyer()"><nuxt-link to="/payment" style="font-size: 13px; padding: 10px;" id="click-buy">Giao đến địa chỉ này</nuxt-link></li>
												</div>
											</div>
										</div>
									</template>
									<template v-else>
										<div class="row">
											<div class="col-md-12">
												<div class="form-group" id="button-buy">
													<li ><i style="color: red; font-size: 15px">Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></li>
												</div>
											</div>
										</div>
									</template>
								</div>
								<div v-else>
									<div class="title-description">
										<h2>2. Địa chỉ giao hàng</h2>
										<p>Nhập đây đủ thông tin của bạn để nhận hàng một cách chính xác</p>
									</div>
									<div class="box-infomation" v-if="!checkTablet">
										<div class="box-around">
											<div class="form-group">
												<label for="nameLast">Họ tên</label>
												<input type="text" v-model="nameLast" ref="nameLast" placeholder="Nhập họ tên">
											</div>								
											<div class="form-group">
												<label for="phoneNumber">Điện thoại di động</label>
												<input type="text" v-model="phoneNumber" ref="phoneNumber" placeholder="Điện thoại di động">
											</div>								
											<div class="form-group">
												<label for="hoten">Tỉnh/Thành phố</label>
												<select name="provinces" id="provinces" @change="getDistrict" ref="province">
													<option value="0">Chọn Tỉnh/Thành phố</option>
													<option v-for="(list,index) in listprovinces" :value="list.provinceid" :data-foo="list.name" :key="index">{{list.name}}</option>
												</select>
											</div>								
											<div class="form-group">
												<label for="hoten">Quận/Huyện</label>
												<select  name="district" id="district" @change="getWarn" ref="district">
													<option value="0">Quận/Huyện</option>
													<option v-for="(list,index) in listDistricts" :value="list.districtid" :data-foo="list.name" :key="index">{{list.name}}</option>
												</select>
											</div>								
											<div class="form-group">
												<label for="hoten">Phường/Xã</label>
												<select name="ward" id="ward" @change="ward" ref="ward">
													<option value="0">Chọn Phường/Xã</option>
														<option v-for="(list,index) in listWards" :value="list.wardid" :data-foo="list.name" :key="index">{{list.name}}</option>
												</select>
											</div>										
											<div class="form-group">
												<label for="address">Địa chỉ</label>
												<textarea name="" id="" ref="address" placeholder="Nhập địa chỉ VD: 1461 Nguyễn Văn Linh"></textarea>		
												<p style="font-size: 12px;font-style: italic;color: #888;text-align: right">Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.</p>		
											</div>
											
											<div id="form-button">
												<button class="btn btn-danger" @click="cancelForm()" style="border-radius: 0;"><nuxt-link to=""  id="cancelformaddress" style="color: #fff; font-size: 13px;">Hủy bỏ</nuxt-link></button>
												<button class="btn btn-primary" @click="save_info_buyer()" style="background-color: #00b6f0; border-color: #00b6f0; border-radius: 0;"><nuxt-link to="/payment"  id="shipping" style="color: #fff; font-size: 13px;">Giao đến địa chỉ này</nuxt-link></button>
											</div>
											<li style="list-style: none;margin: 10px 0;"><i style="color: red; font-size: 15px">Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></li>
										</div>
									</div>

									<div class="box-infomation" v-else>
										<div class="box-around">
											<div class="form-group">
												<input type="text" v-model="nameLast" ref="nameLast" placeholder="Nhập họ tên" style="width:100%;">
											</div>								
											<div class="form-group">
												<input type="text" v-model="phoneNumber" ref="phoneNumber" placeholder="Điện thoại di động" style="width:100%;">
											</div>								
											<div class="form-group">
												<select name="provinces" id="provinces" @change="getDistrict" ref="province" style="width:100%;">
													<option value="0">Chọn Tỉnh/Thành phố</option>
													<option v-for="(list,index) in listprovinces" :value="list.provinceid" :data-foo="list.name" :key="index">{{list.name}}</option>
												</select>
											</div>								
											<div class="form-group">
												<select  name="district" id="district" @change="getWarn" ref="district" style="width:100%;">
													<option value="0">Quận/Huyện</option>
													<option v-for="(list,index) in listDistricts" :value="list.districtid" :data-foo="list.name" :key="index">{{list.name}}</option>
												</select>
											</div>								
											<div class="form-group">
												<select name="ward" id="ward" @change="ward" ref="ward" style="width:100%;">
													<option value="0">Chọn Phường/Xã</option>
														<option v-for="(list,index) in listWards" :value="list.wardid" :data-foo="list.name" :key="index">{{list.name}}</option>
												</select>
											</div>										
											<div class="form-group">
												<textarea name="" id="" ref="address" placeholder="Địa chỉ" style="width:100%;"></textarea>		
												<p style="font-size: 12px;font-style: italic;color: #888;text-align: left">Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.</p>		
											</div>
											<div id="form-button">
												<button class="btn btn-danger" @click="cancelForm()" style="border-radius: 0;"><nuxt-link to=""  id="cancelformaddress" style="color: #fff; font-size: 13px;">Hủy bỏ</nuxt-link></button>
												<button class="btn btn-primary" @click="save_info_buyer()" style="background-color: #00b6f0; border-color: #00b6f0; border-radius: 0;"><nuxt-link to="/payment"  id="shipping" style="color: #fff; font-size: 13px;">Giao đến địa chỉ này</nuxt-link></button>
											</div>
											<div style="color: red; font-size: 12px; margin-top: 10px;"><i >Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<div v-if="!dataUser" class="content">
							<div class="title-description">
								<h2>1. Đăng nhập / Đăng ký và tạo ví Wallet</h2>
								<p>Bạn cần đăng nhập để tiến hành đặt hàng !</p>
								<p><i>(Nếu bạn chưa có tài khoản hãy tiến hành đăng ký tài khoản và tạo ví Wallet)</i></p>
							</div>
						</div>
						<div v-if="dataUser" class="content">
							<div v-if="!isShowFormInfoAddress">
								<div class="title-description">
									<h2>2. Địa chỉ giao hàng</h2>
									<p>Chọn địa chỉ giao hàng có sẵn bên dưới.</p>
								</div>
								<div class="row">
									<div class="cart-address" style="width: 100%;">
										<div class="title-address" >
											<div ><h2>Địa chỉ giao hàng</h2></div>
											<div ><li @click="showFormInfoAddress()"><nuxt-link to="#" id="button-payment">Sửa</nuxt-link></li></div>
										</div>
										<div class="info-address">
											<h2>{{this.$store.state.userInfo.data.fullname}}</h2>
											<p>Số điện thoại: {{this.$store.state.userInfo.data.phone_number}}</p>
											<p>Địa chỉ nhận: {{this.$store.state.userInfo.data.address_shop}}</p>
										</div>
									</div>
								</div>
								<template v-if="$store.state.userInfo.data.phone_number != '' && $store.state.userInfo.data.phone_number != 0 && $store.state.userInfo.data.address_shop != ''">
									<div class="row">
										<div class="col-md-12">
											<div class="form-group" id="button-buy">
												<li @click="save_info_buyer()"><nuxt-link to="/payment" style="font-size: 13px; padding: 10px;" id="click-buy">Giao đến địa chỉ này</nuxt-link></li>
											</div>
										</div>
									</div>
								</template>
								<template v-else>
									<div class="row">
										<div class="col-md-12">
											<div class="form-group" id="button-buy">
												<li ><i style="color: red; font-size: 15px">Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></li>
											</div>
										</div>
									</div>
								</template>
							</div>
							<div v-else>
								<div class="title-description">
									<h2>2. Địa chỉ giao hàng</h2>
									<p>Nhập đây đủ thông tin của bạn để nhận hàng một cách chính xác</p>
								</div>
								<div class="box-infomation">
									<div class="box-around">
										<div class="form-group">
											<input type="text" v-model="nameLast" ref="nameLast" placeholder="Nhập họ tên">
										</div>								
										<div class="form-group">
											<input type="text" v-model="phoneNumber" ref="phoneNumber" placeholder="Điện thoại di động">
										</div>								
										<div class="form-group">
											<select name="provinces" id="provinces" @change="getDistrict" ref="province">
												<option value="0">Chọn Tỉnh/Thành phố</option>
												<option v-for="(list,index) in listprovinces" :value="list.provinceid" :data-foo="list.name" :key="index">{{list.name}}</option>
											</select>
										</div>								
										<div class="form-group">
											<select  name="district" id="district" @change="getWarn" ref="district">
												<option value="0">Quận/Huyện</option>
												<option v-for="(list,index) in listDistricts" :value="list.districtid" :data-foo="list.name" :key="index">{{list.name}}</option>
											</select>
										</div>								
										<div class="form-group">
											<select name="ward" id="ward" @change="ward" ref="ward">
												<option value="0">Chọn Phường/Xã</option>
													<option v-for="(list,index) in listWards" :value="list.wardid" :data-foo="list.name" :key="index">{{list.name}}</option>
											</select>
										</div>										
										<div class="form-group">
											<textarea name="" id="" ref="address" placeholder="Địa chỉ"></textarea>		
											<p style="font-size: 12px;font-style: italic;color: #888;text-align: left">Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.</p>		
										</div>
										<div id="form-button">
											<button class="btn btn-danger" @click="cancelForm()" style="border-radius: 0;"><nuxt-link to=""  id="cancelformaddress" style="color: #fff; font-size: 13px;">Hủy bỏ</nuxt-link></button>
											<button class="btn btn-primary" @click="save_info_buyer()" style="background-color: #00b6f0; border-color: #00b6f0; border-radius: 0;"><nuxt-link to="/payment"  id="shipping" style="color: #fff; font-size: 13px;">Giao đến địa chỉ này</nuxt-link></button>
										</div>
										<div style="color: red; font-size: 12px; margin-top: 10px;"><i >Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></div>
									</div>
								</div>
							</div>
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
	
	export default {
		head(){
			return{
				title:"Payment || BLOOD SHOPPING MALL"
			}
		},
		data(){
			return{
				dataCart:[],
				listprovinces:[],
				listDistricts:[],
				listWards:[],
				
				nameLast: "",
				phoneNumber: "",
				province_store : "",
				district_store : "",
				ward_store : "",
				address: "",

				elSelect:"",
				info_buyer: {
					nameLast: "",
				 	phoneNumber: "",
					info_address: ""
				},

				isShowFormInfoAddress: false,
			}
		},
		created(){
			this.dataCart = JSON.parse(this.$cookies.get('CART_BLOOD_SHOPPINGMALL'))
			this.getProvinces()
		},
		computed:{
			dataUser(){
				if(this.$store.state.userInfo && this.$store.state.userInfo != ""){
					if(this.$store.state.userInfo.data && this.$store.state.userInfo.data != ""){ return true }
				}
			},
		},
		methods:{
			getProvinces(){
				axios.get(`${this.$store.state.apiLink}/payments/location/provinces`)
				.then(data => { if (data.data.successes) { this.listprovinces = data.data.data } })
				.catch(err =>{console.log(err)})
			},

			getDistrict(e){
				if(e.target.options.selectedIndex > -1) { this.province_store = e.target.options[e.target.options.selectedIndex].dataset.foo }
				
				axios.post(`${this.$store.state.apiLink}/payments/location/districts`,{ "province":this.$refs.province.value })
				.then(data => { if (data.data.successes) { this.listDistricts = data.data.data } })
				.catch(err =>{console.log(err)})
			},

			getWarn(e){
				if(e.target.options.selectedIndex > -1) { this.district_store = e.target.options[e.target.options.selectedIndex].dataset.foo }
				axios.post(`${this.$store.state.apiLink}/payments/location/wards`,{ "district":this.$refs.district.value })
				.then(data => { if (data.data.successes) { this.listWards = data.data.data } })
				.catch(err =>{console.log(err)})
			},

			ward(e){ if(e.target.options.selectedIndex > -1) { this.ward_store = e.target.options[e.target.options.selectedIndex].dataset.foo } },
			
			checkAddress(){
				if(this.$refs.phoneNumber.value == '' || this.$refs.address.value == '') return false
				return true
			},

			save_info_buyer(){
				
				if(this.isShowFormInfoAddress){
					this.info_buyer.nameLast = this.$refs.nameLast.value;
					this.info_buyer.phoneNumber = this.$refs.phoneNumber.value;

					this.info_buyer.info_address = `${this.$refs.address.value}, ${this.ward_store}, ${this.district_store}, ${this.province_store}`;
					localStorage.setItem('INFO_BUYER_BLOOD_SHOPPINGMALL',JSON.stringify(this.info_buyer))
				}
				
				if(!this.isShowFormInfoAddress){
					this.info_buyer.nameLast = this.$store.state.userInfo.data.fullname;
					this.info_buyer.phoneNumber = this.$store.state.userInfo.data.phone_number;
					this.info_buyer.info_address = this.$store.state.userInfo.data.address_shop;
					localStorage.setItem('INFO_BUYER_BLOOD_SHOPPINGMALL',JSON.stringify(this.info_buyer))
				}
				
				this.$store.dispatch('info_buyer/InfoBuyer')
			},

			showFormInfoAddress(){ this.isShowFormInfoAddress = !this.isShowFormInfoAddress; },
			
			cancelForm(){ this.isShowFormInfoAddress = !this.isShowFormInfoAddress; },
		}
	}
</script>