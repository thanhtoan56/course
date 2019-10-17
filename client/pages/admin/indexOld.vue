<template>
    <div>
        <div class="page-header row no-gutters py-4">
            <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
                <span class="text-uppercase page-subtitle">Dashboard</span>
                <h3 class="page-title">Blog Overview</h3>
            </div>
        </div>
        
        <div class="row">
            <div class="col-lg col-md-3 col-sm-6 mb-4">
                <div class="stats-small stats-small--1 card card-small">
                    <div class="card-body p-0 d-flex" @click="activeListProducts">
                        <div class="d-flex flex-column m-auto">
                            <div class="stats-small__data text-center">
                                <span class="stats-small__label text-uppercase">Sản Phẩm Hiện Có</span>
                                <h6 class="stats-small__value count my-3">{{count_product}}</h6>
                            </div>
                            <div class="stats-small__data">
                                <span class="stats-small__percentage stats-small__percentage--increase">4.7%</span>
                            </div>
                        </div>
                        <canvas height="120" class="blog-overview-stats-small-1"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg col-md-3 col-sm-6 mb-4">
                <div class="stats-small stats-small--1 card card-small">
                    <div class="card-body p-0 d-flex" @click="activeListOrder">
                        <div class="d-flex flex-column m-auto">
                            <div class="stats-small__data text-center">
                                <span class="stats-small__label text-uppercase">Tổng Orders</span>
                                <h6 class="stats-small__value count my-3">{{count_order}}</h6>
                            </div>
                            <div class="stats-small__data">
                                <span class="stats-small__percentage stats-small__percentage--increase">12.4%</span>
                            </div>
                        </div>
                        <canvas height="120" class="blog-overview-stats-small-2"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg col-md-3 col-sm-6 mb-4">
                <div class="stats-small stats-small--1 card card-small">
                    <div class="card-body p-0 d-flex" @click="activeListOrder">
                        <div class="d-flex flex-column m-auto">
                            <div class="stats-small__data text-center">
                                <span class="stats-small__label text-uppercase">Orders Thành Công</span>
                                <h6 class="stats-small__value count my-3">{{count_order_success}}</h6>
                            </div>
                            <div class="stats-small__data">
                                <span class="stats-small__percentage stats-small__percentage--decrease">3.8%</span>
                            </div>
                        </div>
                        <canvas height="120" class="blog-overview-stats-small-3"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg col-md-3 col-sm-6 mb-4">
                <div class="stats-small stats-small--1 card card-small">
                    <div class="card-body p-0 d-flex" @click="activeListOrder">
                        <div class="d-flex flex-column m-auto">
                            <div class="stats-small__data text-center">
                                <span class="stats-small__label text-uppercase">Độ Tin Cậy</span>
                                <h6 class="stats-small__value count my-3">{{ count_order_success ? ((count_order_success/count_order)*100).toFixed(2) : 0}} %</h6>
                            </div>
                            <div class="stats-small__data">
                                <span class="stats-small__percentage stats-small__percentage--increase">12.4%</span>
                            </div>
                        </div>
                        <canvas height="120" class="blog-overview-stats-small-4"></canvas>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-3 col-sm-12 mb-4">
                <div class="card card-small blog-comments" >
                    <div class="card-header border-bottom"> 
                        <h6 class="m-0">Sản Phẩm Mới</h6>
                    </div>
                    <div class="card-body p-0" style="height: 400px; overflow: auto;">
                        <template v-for="(product, index) in list_product_new">
                            <div class="blog-comments__item p-3" :key="index" v-if="index < 5">
                                <div class="blog-comments__content">
                                    <div class="blog-comments__meta text-muted">
                                        <nuxt-link class="text-secondary" to="#" style="font-size: 15px; color: #3d5170 !important; font-weight: 500">{{product.name_product}}</nuxt-link>
                                    </div>
                                </div>
                                <div class="blog-comments__avatar" style="display: -webkit-inline-box; width: 100%; margin-top: 10px;">
                                    <div class="col-9" style="padding: 0">
                                        <div style="font-size: 14px;"><strong>#{{product.id_number}}</strong></div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Date:</span> {{new Date(product.created_at*1000).toLocaleDateString()}}</div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Số lượng hiện tại: <strong>{{product.total_quantity}}</strong></span> </div>
                                        
                                        <template v-if="!checkPricePromotion(product)">
                                            <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Giá:</span><span style="color: red; margin-left: 5px;">{{formatNumber(product.price_origin)}} blood</span><span class="vnd"></span></div>
                                        </template>
                                        <template v-else>
                                            <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Giá</span><span class="price">{{formatNumber(product.price_origin)}} blood</span></div>
                                            <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Giá KM:</span><span class="priceSale" style="color: red;">{{formatNumber(product.price_promotion)}}<span class="vnd"> blood</span></span></div>
                                        </template>
                                    </div>
                                    <div class="col-3" style="padding: 23px 0px 0px; text-align: center;">
                                        <nuxt-link  to="#"><img :src="$store.state.apiApp + 'products/' + product.image_main" alt="User avatar"  style="max-width: 100%;"/></nuxt-link>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col text-center view-report">
                                <button class="btn btn-white" @click="activeListProducts">View All Products</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12 mb-4">
                <div class="card card-small blog-comments">
                    <div class="card-header border-bottom"> 
                        <h6 class="m-0">Orders Gần Đây</h6>
                    </div>
                    <div class="card-body p-0" style="height: 400px; overflow: auto;">
                        <template v-for="(listNew, index) in list_order_new">
                            <div class="blog-comments__item p-3" :key="index" v-if="index < 5">
                                <div class="blog-comments__avatar" style="display: -webkit-inline-box; width: 100%">
                                    <div style="padding: 0; width: 100%" >
                                        <div style="font-size: 14px;"><strong>#{{listNew.id_number}}</strong></div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Date:</span> {{new Date(listNew.created_timestamp*1000).toLocaleString()}}</div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Tổng tiền:</span> <span style="color: red;">{{listNew.total_pay}} blood</span></div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Trạng thái: <i><strong>{{stateOrder(listNew)}}</strong></i></span>  </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col text-center view-report">
                                <button class="btn btn-white" @click="activeListOrder">View All Orders</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12 mb-4">
                <div class="card card-small blog-comments">
                    <div class="card-header border-bottom"> 
                        <h6 class="m-0">Orders Thành Công</h6>
                    </div>
                    <div class="card-body p-0" style="height: 400px; overflow: auto;">
                        <template v-for="(successed, index) in list_order_successed">
                            <div class="blog-comments__item p-3" :key="index" v-if="index < 5">
                                <div class="blog-comments__avatar" style="display: -webkit-inline-box; width: 100%">
                                    <div style="padding: 0; width: 100%" >
                                        <div style="font-size: 14px;"><strong>#{{successed.id_number}}</strong></div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Date:</span> {{new Date(successed.created_timestamp*1000).toLocaleString()}}</div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Tổng tiền:</span> <span style="color: red;">{{successed.total_pay}} blood</span></div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Trạng thái: <i><strong>{{stateOrder(successed)}}</strong></i></span>  </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col text-center view-report">
                                <button class="btn btn-white" @click="activeListOrder">View All Orders</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12 mb-4">
                <div class="card card-small blog-comments">
                    <div class="card-header border-bottom"> 
                        <h6 class="m-0">Orders Đã Hủy</h6>
                    </div>
                    <div class="card-body p-0" style="height: 400px; overflow: auto;">
                        <template v-for="(cancelled, index) in list_order_cancelled">
                            <div class="blog-comments__item p-3" :key="index" v-if="index < 5">
                                <div class="blog-comments__avatar" style="display: -webkit-inline-box; width: 100%">
                                    <div style="padding: 0; width: 100%" >
                                        <div style="font-size: 14px;"><strong>#{{cancelled.id_number}}</strong></div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Date:</span> {{new Date(cancelled.created_timestamp*1000).toLocaleString()}}</div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Tổng tiền:</span> <span style="color: red;">{{cancelled.total_pay}} blood</span></div>
                                        <div style="font-size: 14px;"><span style="font-weight: 400; color: #888;">Trạng thái: <i><strong>{{stateOrder(cancelled)}}</strong></i></span>  </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col text-center view-report">
                                <button class="btn btn-white" @click="activeListOrder">View All Orders</button>
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
    import mixinDecentralize from '~/functions/decentralize';

    export default {
        layout: 'admin',
        components: {},
        mixins: [mixinDecentralize],

        data(){
			return {
                list_order_new: [], 
                list_order_successed: [], 
                list_order_cancelled: [],

                list_product_new: [],

                count_product: 0,
                count_order: 0,
                count_order_success: 0,
			}
        },
        created(){
			this.loadDataOrders();
		},
		methods:{
            
            checkPricePromotion(list){
				if(list.price_promotion != "" && list.price_promotion != null && list.price_promotion != 0){ return list.price_promotion } 
				else return false
			},
            formatNumber(number) {
				number = parseInt(number);
			  	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            activeListProducts(){
                this.$root.$router.push({path: '/admin/products'})
            },
			activeListOrder(){
                this.$root.$router.push({path: '/admin/orders'})
            },
			loadDataOrders(){
				axios.post(`${this.$store.state.apiLink}/payments/statistics`, { "token": localStorage.token })
				.then(data => { 
                    if (data.data.successes) { 
                        this.list_order_new = data.data.list_order_new
                        this.count_order = this.list_order_new.length

                        this.list_order_successed = data.data.list_order_successed
                        this.count_order_success = this.list_order_successed.length

                        this.list_order_cancelled = data.data.list_order_cancelled

                        this.list_product_new = data.data.list_product_new
                        this.count_product = this.list_product_new.length

                    } 
                })
				.catch(err =>{console.log(err)})
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
<style>
    .blog-comments__avatar img {
    height: auto !important;
    width: 100%;
    border-radius: .25rem;
}
</style>