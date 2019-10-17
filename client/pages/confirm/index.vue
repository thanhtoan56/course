<template>
	<div id="payment">
		<div class="full-breadcumb">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb">
						    <li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
						    <li><nuxt-link to='/cart'>Giỏ hàng</nuxt-link></li>
							<li style="width: 50%;"><a href="javascript:void(0)"><span>Confirm</span></a></li>
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
									<h2>2. Xác nhận - Đặt Mua</h2>
									<p>Kiểm tra thông tin của bạn để nhận hàng một cách chính xác</p>
								</div>
								<div class="row">
									<div class="col-md-12 cart-address">
										<div class="title-address" style="display: -webkit-box">
											<div style="text-align: left;"><h2>Địa chỉ giao hàng</h2></div>
											<div style="position: absolute; right: 2%;" @click="showModal_Edit_Address_Receiver()"><nuxt-link to="" id="button-payment">Sửa</nuxt-link></div>
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
											<div style="position: absolute; right: 2%;"><li @click="editOrder()"><nuxt-link to="#" id="button-payment">Sửa</nuxt-link></li></div>
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
												<!-- <div class="col-2" style="text-align: center;"><input type="number" :value="list.quantity" @keyup="tem = $event.target.value" style="width: 55px; height: 20px; text-align: center; border: none;" ></div>
												<div class="col-3" >{{totalPayItem(list, tem) }} blood</div> -->
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
												<template v-if="checkUserInfo != false">
													<li  @click="order()"><a   style="cursor: pointer;" id="click-buy">ĐẶT HÀNG</a></li>
													<p v-if="checkUserInfo != false"><i>(Xin vui lòng kiểm tra lại đơn hàng trước khi đặt mua)</i></p>
												</template>
												<p v-else><i>(Vui lòng đăng nhập để đặt mua sản phẩm)</i></p>
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
								<h2>2. Xác nhận - Đặt Mua</h2>
								<p>Kiểm tra thông tin của bạn để nhận hàng một cách chính xác</p>
							</div>
							<div class="row">
								<div class="cart-address" style="width: 100%; ">
									<div class="title-address " style="text-align: left;">
										<div ><h2>Địa chỉ giao hàng</h2></div>
										<div ><li @click="showModal_Edit_Address_Receiver()"><nuxt-link to="" id="button-payment">Sửa</nuxt-link></li></div>
									</div>
									
									<div class="info-address">
										<h2 style="font-size: 15px; color: #242424">{{ this.info_buyer.nameLast}}</h2>
										<p style="color: #888">Số điện thoại: {{this.info_buyer.phoneNumber}}</p>
										<p style="color: #888">Địa chỉ nhận: {{ this.info_buyer.info_address }}</p>
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
												<div class="box-content" v-if="list.price_promotion != null ">
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
									<button class="btn btn-primary" @click="editOrder()" style="width: 100%; margin-bottom: 1px;">SỬA</button>
									<button class="btn btn-danger" v-if="checkUserInfo != false" style="width: 100%; margin-bottom: 1px;" @click="order()">ĐẶT HÀNG</button>
									<button class="btn btn-danger" v-else  style="width: 100%; margin-bottom: 1px;" @click="order()">ĐẶT HÀNG</button>
									<div style="font-size: 13px; text-align: center; margin-top: 10px; width: 100%;"><i>Vui lòng kiểm tra lại đơn hàng trước khi đặt mua !</i>	</div>
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
		<modal name="Modal_Edit_Address_Receiver" :width="checkResponsive ? '400px' : '90%'" height="545" :scrollable="true">
			<div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
				<div class="card-header border-bottom">
					<h6 class="m-0">
						<li style="list-style: none; text-align: center"><nuxt-link to="/">Nhập địa chỉ giao hàng</nuxt-link></li>
					</h6>
				</div>
				<div class="edit-address">
					<notifications :style="checkResponsive ? {} : {width: '75%', top: '42px', right: '0px'}" group="auth" />
					<ul class="list-group list-group-flush">
						<li class="list-group-item p-3" style="height: 450px !important">
							<div class="box-infomation">
								<div class="box-around">
									<div class="form-group">
										<input type="text"  ref="nameLast" placeholder="Nhập họ tên">
									</div>								
									<div class="form-group">
										<input type="text"  v-numericOnly ref="phoneNumber" placeholder="Điện thoại di động">
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
										<button class="btn btn-primary" @click="save_info_buyer()" style="background-color: #00b6f0; border-color: #00b6f0; border-radius: 0;"><nuxt-link to=""  id="shipping" style="color: #fff; font-size: 13px;">Cập nhật</nuxt-link></button>
									</div>
									<div style="color: red; font-size: 12px; margin-top: 10px;"><i >Vui lòng cập nhật số điện thoại và địa chỉ nhận hàng !</i></div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
      	</modal>
	</div>
</template>

<script>
	import Vue from "vue"
	import axios from "axios"
	import VModal from "vue-js-modal";
	import VueCookies from 'vue-cookies'
	import Notifications from 'vue-notification';
	import VueLoading from 'vuejs-loading-plugin';
	import mixinPayment from'../../functions/general';
	import NumberInputSpinner from '~/components/plugins/NumberInputSpinner.vue'
	
	Vue.use(VModal);
	Vue.use(VueLoading);
	Vue.use(Notifications);

	Vue.directive('numericOnly', {
		bind(el, binding, vnode) {
			el.addEventListener('keydown', (e) => {
				// console.log(e.preventDefault())
				if ([8, 9, 27, 13].indexOf(e.keyCode) !== -1 || // BACKSPACE = 8, TAB = 9, ESC = 27, LEFT_ENTER = 13
					(e.keyCode === 65 && e.ctrlKey === true) || //ctr + A
					(e.keyCode === 67 && e.ctrlKey === true) || //ctr + C
					(e.keyCode === 88 && e.ctrlKey === true) ||
					(e.keyCode === 46 && e.ctrlKey === true) ||
					(e.keyCode >= 35 && e.keyCode <= 39) || 
					e.keyCode == 231) {
					return
				}
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault()
				}
				if (el.value.length >= 10) {
					e.preventDefault()
				}			        	        
			})
		}	
	})
	export default {
		components: { NumberInputSpinner, },
		head(){ return { title:"Payment || BLOOD SHOPPING MALL" } },
		mixins: [mixinPayment],
		data(){
			return{
				tem:"",
				dataCart: [],
				listprovinces:[],
				listDistricts:[],
				listWards:[],

				province_store : "",
				district_store : "",
				ward_store : "",

				elSelect:"",
				info_buyer: {
					nameLast: "",
				 	phoneNumber: "",
					info_address: ""
				},

				count: 0,

				list_product: "",
				item_product: {
					id_number: 0,
					quantity: 0
				},
				total_pay: 0,

				user_Info: "",
				isDisable: false
			}
		},

		created(){
			this.dataCart = JSON.parse(this.$cookies.get('cart'))
			this.count = this.dataCart.length;
			this.getInfoBuyer()
			this.getProvinces()
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
			save_info_buyer(){
				
				const nameLast = this.$refs.nameLast.value;
				const phoneNumber = this.$refs.phoneNumber.value;

				const address = this.$refs.address.value
				const ward_store = this.ward_store
				const district_store = this.district_store
				const province_store = this.province_store
				if(nameLast == "" || phoneNumber == "" || address == "" || ward_store == "" || district_store == "" || district_store == "" || province_store == "") 
					return Vue.notify({ group: 'auth',title: 'Confirm',text: 'Enter your full information',type: 'warn'})
				
				const info_address = `${address}, ${ward_store}, ${district_store}, ${province_store}`;
				localStorage.setItem('INFO_BUYER',JSON.stringify({nameLast, phoneNumber, info_address}))
				Vue.notify({ group: 'auth',title: 'Confirm',text: 'Update info is success',type: 'success'})
				this.getInfoBuyer()
				setTimeout(() =>{this.$modal.hide("Modal_Edit_Address_Receiver");}, 500)
			},
			cancelForm() {
				this.$modal.hide("Modal_Edit_Address_Receiver");
			},

			showModal_Edit_Address_Receiver() { this.$modal.show("Modal_Edit_Address_Receiver"); },

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

			totalPayItem(data, tem){
				var total = 0
				if (data != "" && data !== null && data !== undefined) {
					if (data.price_promotion != 0) { total = tem * data.price_promotion }
					else { total = tem * data.price_origin }
				}
				return total;
			},

			// formatNumber(number) {
			// 	number = parseInt(number);
			//   	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			// },

			// updateCart(){
			// 	var checkUpdated = true
			// 	for( let i = 0; i < this.dataCart.length; i++){
			// 		if(this.dataCart[i].total_quantity - this.dataCart[i].quantity >= 0){ this.dataCart[i].quantity = this.dataCart[i].quantity } 
			// 		else { checkUpdated = false }
			// 	}

			// 	if(checkUpdated == true){
			// 		this.$cookies.set('CART_BLOOD_SHOPPINGMALL',JSON.stringify(this.dataCart))
			// 		this.$nuxt.$emit('changeNumberCart',this.mathNumberCart(this.dataCart))
			// 		this.dataCart = JSON.parse(this.$cookies.get('CART_BLOOD_SHOPPINGMALL'))
			// 		swal("Cập nhật thành công", "", "success");
			// 	}
			// 	else { swal("Thêm không thành công vì lớn hơn số hàng còn lại trong kho", "", "error"); }
			// },

			order(){
				this.$router.push({ path: '/payment' })
				// // this.$loading(true)
				// if(!this.check()){ Vue.notify({ group: 'success',title: 'Confirm',text: 'You must signin account !!',type: 'warn'}); return this.$loading(false); }
				
				// const { auth_email, wallet_address, balance } = this.user_Info
				// if(auth_email == "N"){ Vue.notify({ group: 'success',title: 'Confirm',text: 'Email is not authen !!',type: 'warn'}); return this.$loading(false);}
				
				// else if(wallet_address == ""){ Vue.notify({ group: 'success',title: 'Confirm',text: 'You have not wallet address !!',type: 'warn'}); return this.$loading(false);} 
				
				// else if(balance  < this.total_pay){ Vue.notify({ group: 'success',title: 'Confirm',text: 'Account balance is not enough to purchase !!',type: 'warn'}); return this.$loading(false);} 
				
				// else {
				// 	if (this.$store.state.userInfo.successes == true ){
				// 		this.cart = JSON.parse(this.$cookies.get('CART_BLOOD_SHOPPINGMALL'))
				// 		for (let i = 0; i < this.cart.length; i++) { this.arrCart.push(this.cart[i].quantity); }

				// 		for(let j = 0;  j < this.$refs.quantity.length; j++){ this.arrCartUpdate.push(this.$refs.quantity[j].value); }

				// 		if(lodash.isEqual(this.arrCart, this.arrCartUpdate)){
				// 			if(this.$store.state.buttonOrder === 0){ this.$router.push({ path: '/delivery-address' }) } 
				// 			else {
				// 				this.$store.dispatch('buttonOrder')
				// 				this.$router.push({ path: '/payment' })
				// 			}
				// 		} else { swal("Vui lòng cập nhật giỏ hàng trước !", "", "error") }
				// 		this.arrCart = []
				// 		this.arrCartUpdate = []
				// 	} else {
				// 		var md = new MobileDetect(window.navigator.userAgent)
				// 		if(md.mobile() == null) { this.$nuxt.$emit("showModalLogin", true) }
				// 		else this.$nuxt.$emit("showModalLoginMobile", true)
				// 	}
				// }
			},

			editOrder() {
				this.$router.push({path: "/cart"}) 
				this.$store.dispatch('buttonUpdateOrder') 
			},
		}
	}
</script>
// border:2px solid #A6C8FF; border-radius: 2px;