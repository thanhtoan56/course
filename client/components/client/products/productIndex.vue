<template>
    <div class="best-saler">
        <template v-if="checkResponsive">
            <div class="col-md-12">
                <div class="content-index-product">
                    <div class="title-name">SẢN PHẨM CỦA SHOPPING MALL</div>
                    <div v-for="list in listProductIndex" v-bind:key="list.id_inumber" class="item col-xs-4 col-md-5ths">
                        <div class="item-product" @click="seenProductDetail(list)">
                            <div class="image-product">
                                <nuxt-link :to="'/product/'+ list.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + list.image_main" alt="" /></a></nuxt-link>
                            </div>
                            <div class="info-product">
                                <h2>{{list.name_product | truncate(50) }}</h2>
                                <div class="row" style="margin: 0">
                                    <div class="box-price">
                                        <template v-if="!checkPricePromotion(list)">
                                            <span class="priceSale">{{formatNumber(list.price_origin)}}</span><span class="blood"> blood</span>
                                        </template>
                                        <template v-else>
                                            <span class="price">{{formatNumber(list.price_origin)}} <span class="blood"> blood</span></span>
                                            <span class="priceSale">{{formatNumber(list.price_promotion)}}<span class="blood"> blood</span></span>
                                        </template>
                                    </div>
                                    <div class="quantity-freeShip">
                                        <i>Còn lại: </i><span>{{list.total_quantity}}</span>
                                        <img src="images/free-ship.png" alt="" v-if="list.freeShip">
                                    </div>
                                </div>
                            </div>
                            <div class="promotion" v-if="list.price_promotion > 0">
                                <div class="content">
                                    <div class="number">{{mathPercent(list.price_origin,list.price_promotion)}}</div>
                                    <div class="text">Giảm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class = "clickSeen-Index"><button type = "button"  @click="clickSeen">Xem thêm</button></div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="content-index-product">
                <div class="title-name">SẢN PHẨM CỦA SHOPPING MALL</div>
                <div v-for="list in listProductIndex" v-bind:key="list.id_inumber" class="item col-6 col-xs-6 col-sm-4 col-lg-4 col-xl-3">
                    <div class="item-product" @click="seenProductDetail(list)">
                        <div class="image-product">
                            <nuxt-link :to="'/product/'+ list.link"><a href="#"><img v-bind:src="$store.state.apiApp + 'products/' + list.image_main" alt="" /></a></nuxt-link>
                        </div>
                        <div class="info-product">
                            <h2>{{list.name_product | truncate(50) }}</h2>
                            <div class="row" style="margin: 0">
                                <div class="box-price">
                                        <template v-if="!checkPricePromotion(list)">
                                            <div><span class="priceSale">{{formatNumber(list.price_origin)}}</span><span class="blood"> blood</span></div>
                                        </template>
                                        <template v-else>
                                            <div><span class="priceSale">{{formatNumber(list.price_promotion)}}<span class="blood"> blood</span></span></div>
                                            <div><span class="price">{{formatNumber(list.price_origin)}} <span class="blood"> blood</span></span></div>
                                        </template>
                                </div>
                                <div class="quantity-freeShip" style="margin-top: 5px">
                                    <i>Còn lại: </i><span>{{list.total_quantity}}</span>
                                    <img src="images/free-ship.png" alt="" v-if="list.freeShip">
                                </div>
                            </div>
                        </div>
                        <div class="promotion" v-if="list.price_promotion > 0">
                            <div class="content">
                                <div class="number">{{mathPercent(list.price_origin,list.price_promotion)}}</div>
                                <div class="text">Giảm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "clickSeen-Index"><button type = "button"  @click="clickSeen">Xem thêm</button></div>
            </div>
        </template>
    </div>
</template>
<script>
    import Vue from "vue"
    import axios from "axios"
    import Method from "~/functions/seenDetailProduct";
    import VueTruncate from'vue-truncate-filter'
    
    Vue.use(VueTruncate)
    
    export default {
		data(){
			return {
				listProductIndex: []
			}
		},
		created(){
            this.fetchDataProductIndex()
        },
        
		methods:{
            // seenProductDetail(list){
            //     this.$root.$router.push({ path: `/${list.link}`})
            // },
            checkPricePromotion(list){
                if(list.price_promotion != "" && list.price_promotion != null && list.price_promotion != 0){ return list.price_promotion} 
                else return false
			},
            
            fetchDataProductIndex(){
				axios.get(`${this.$store.state.apiLink}/products/list/show-index`)
				.then(data =>{ if (data.data.successes) { this.listProductIndex = data.data.data }})
                .catch(err => { console.log(err) })
			},
            
            formatNumber(number) {
                number = parseInt(number);
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            
            mathRound(value, decimals) { return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals); },
            
            mathPercent(priceOrigin,pricePromotion){
                priceOrigin = Number(priceOrigin)
                pricePromotion = Number(pricePromotion)
                var contact = 0
                contact = 100 - ((pricePromotion/priceOrigin) * 100)
                return this.mathRound(contact,0) + "%"
            },
            
            clickSeen(){ this.$router.push(`/products/1`) }
		}
	}
</script>