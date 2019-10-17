<template>
    <footer>
        <!-- <div class="addHeader" v-if="$store.state.dataAdds != ''">
            <div class="item" v-for="data in $store.state.dataAdds" v-if="data.posision == 2">
                <a href="data.link" target="_BLANK">
                    <img v-bind:src="$store.state.apiApp + 'advertisements/' + data.image_advertisement" alt="">
                </a>
            </div>
        </div> -->
        <!-- <div id="top-tim-kiem">
            <div class="container">
                <div class="row">
                    <div class="title col-md-12"><h2>TOP TÌM KIẾM</h2></div>
                    <div class="col-md-12">
                        <div class="top-search">
                            <p>Áo thun nam&nbsp;|&nbsp;Xe đẩy cho bé&nbsp;|&nbsp;Mỹ phẩm hàn quốc&nbsp;|&nbsp;Giày nam&nbsp;|&nbsp;Thời trang công sở&nbsp;|&nbsp;Đầm trung niên&nbsp;|&nbsp;Giày cầu lông&nbsp;|&nbsp;Jumpsuit&nbsp;|&nbsp;Balo&nbsp;|&nbsp;Đồng hồ nam&nbsp;|&nbsp;Áo khoác nam&nbsp;|&nbsp;Đầm dự tiệc&nbsp;|&nbsp;Đầm công sở&nbsp;|&nbsp;Áo đôi&nbsp;|&nbsp;&nbsp;Áo sơ mi nam&nbsp;|&nbsp;Áo vest nữ&nbsp;|&nbsp;Áo vest nam&nbsp;|&nbsp;Quần jean nam&nbsp;|&nbsp;Túi xách nam&nbsp;|&nbsp;Giày danam&nbsp;|&nbsp;Áo thun nữ&nbsp;|&nbsp;Đầm dạ hội&nbsp;|&nbsp;Sandal nam&nbsp;|&nbsp;Áo kiểu nữ&nbsp;|&nbsp;Giày đế xuồng&nbsp;|&nbsp;Áo khoác len&nbsp;|&nbsp;Đầm ôm&nbsp;|&nbsp;Quần áo sơ sinh&nbsp;|&nbsp;Thời trang bé gái&nbsp;|&nbsp;&nbsp;Muasắm trực tuyến&nbsp;|&nbsp;Đồ chơi trẻ em&nbsp;|&nbsp;Máy hâm sữa&nbsp;|&nbsp;Squishy&nbsp;|&nbsp;Iphone 6&nbsp;|&nbsp;Oppo |&nbsp;Áo thun nam&nbsp;|&nbsp;Xe đẩy cho bé&nbsp;|&nbsp;Mỹ phẩm hàn quốc&nbsp;|&nbsp;Giày nam&nbsp;|&nbsp;Thời trang công sở&nbsp;|&nbsp;Đầm trung niên&nbsp;|&nbsp;Giày cầu lông&nbsp;|&nbsp;Jumpsuit&nbsp;|&nbsp;Balo&nbsp;|&nbsp;Đồng hồ nam&nbsp;|&nbsp;Áo khoác nam&nbsp;|&nbsp;Đầm dự tiệc&nbsp;|&nbsp;Đầm công sở&nbsp;|&nbsp;Áo đôi&nbsp;|&nbsp;&nbsp;Áo sơ mi nam&nbsp;|&nbsp;Áo vest nữ&nbsp;|&nbsp;Áo vest nam&nbsp;|&nbsp;Quần jean nam&nbsp;|&nbsp;Túi xách nam&nbsp;|&nbsp;Giày danam&nbsp;|&nbsp;Áo thun nữ&nbsp;|&nbsp;Đầm dạ hội&nbsp;|&nbsp;Sandal nam&nbsp;|&nbsp;Áo kiểu nữ&nbsp;|&nbsp;Giày đế xuồng&nbsp;|&nbsp;Áo khoác len&nbsp;|&nbsp;Đầm ôm&nbsp;|&nbsp;Quần áo sơ sinh&nbsp;|&nbsp;Thời trang bé gái&nbsp;|&nbsp;&nbsp;Muasắm trực tuyến&nbsp;|&nbsp;Đồ chơi trẻ em&nbsp;|&nbsp;Máy hâm sữa&nbsp;|&nbsp;Squishy&nbsp;|&nbsp;Iphone 6&nbsp;|&nbsp;Oppo |Áo thun nam&nbsp;|&nbsp;Xe đẩy cho bé&nbsp;|&nbsp;Mỹ phẩm hàn quốc&nbsp;|&nbsp;Giày nam&nbsp;|&nbsp;Thời trang công sở&nbsp;|&nbsp;Đầm trung niên&nbsp;|&nbsp;Giày cầu lông&nbsp;|&nbsp;Jumpsuit&nbsp;|&nbsp;Balo&nbsp;|&nbsp;Đồng hồ nam&nbsp;|&nbsp;Áo khoác nam&nbsp;|&nbsp;Đầm dự tiệc&nbsp;|&nbsp;Đầm công sở&nbsp;|&nbsp;Áo đôi&nbsp;|&nbsp;&nbsp;Áo sơ mi nam&nbsp;|&nbsp;Áo vest nữ&nbsp;|&nbsp;Áo vest nam&nbsp;|&nbsp;Quần jean nam&nbsp;|&nbsp;Túi xách nam&nbsp;|&nbsp;Giày danam&nbsp;|&nbsp;Áo thun nữ&nbsp;|&nbsp;Đầm dạ hội&nbsp;|&nbsp;Sandal nam&nbsp;|&nbsp;Áo kiểu nữ&nbsp;|&nbsp;Giày đế xuồng&nbsp;|&nbsp;Áo khoác len&nbsp;|&nbsp;Đầm ôm&nbsp;|&nbsp;Quần áo sơ sinh&nbsp;|&nbsp;Thời trang bé gái&nbsp;|&nbsp;&nbsp;Muasắm trực tuyến&nbsp;|&nbsp;Đồ chơi trẻ em&nbsp;|&nbsp;Máy hâm sữa&nbsp;|&nbsp;Squishy&nbsp;|&nbsp;Iphone 6&nbsp;|&nbsp;Oppo |Áo thun nam&nbsp;|&nbsp;Xe đẩy cho bé&nbsp;|&nbsp;Mỹ phẩm hàn quốc&nbsp;|&nbsp;Giày nam&nbsp;|&nbsp;Thời trang công sở&nbsp;|&nbsp;Đầm trung niên&nbsp;|&nbsp;Giày cầu lông&nbsp;|&nbsp;Jumpsuit&nbsp;|&nbsp;Balo&nbsp;|&nbsp;Đồng hồ nam&nbsp;|&nbsp;Áo khoác nam&nbsp;|&nbsp;Đầm dự tiệc&nbsp;|&nbsp;Đầm công sở&nbsp;|&nbsp;Áo đôi&nbsp;|&nbsp;&nbsp;Áo sơ mi nam&nbsp;|&nbsp;Áo vest nữ&nbsp;|&nbsp;Áo vest nam&nbsp;|&nbsp;Quần jean nam&nbsp;|&nbsp;Túi xách nam&nbsp;|&nbsp;Giày danam&nbsp;|&nbsp;Áo thun nữ&nbsp;|&nbsp;Đầm dạ hội&nbsp;|&nbsp;Sandal nam&nbsp;|&nbsp;Áo kiểu nữ&nbsp;|&nbsp;Giày đế xuồng&nbsp;|&nbsp;Áo khoác len&nbsp;|&nbsp;Đầm ôm&nbsp;|&nbsp;Quần áo sơ sinh&nbsp;|&nbsp;Thời trang bé gái&nbsp;|&nbsp;&nbsp;Muasắm trực tuyến&nbsp;|&nbsp;Đồ chơi trẻ em&nbsp;|&nbsp;Máy hâm sữa&nbsp;|&nbsp;Squishy&nbsp;|&nbsp;Iphone 6&nbsp;|&nbsp;Oppo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="head-footer">
            <div class="container">
                <template v-if="checkResponsive">
                    <div class="row">
                        <div class="left col-md-3 col-sm-6" style="margin: 5px 0;">
                            <div class="title"><h2>{{$t("footer.head-footer.title-left")}}</h2></div>
                            <ul>
                                <li v-for="(footer, index) in dataFooter" :key="index" >
                                    <template v-if="footer.cate == 2">
                                        <nuxt-link :to="'/contents/' + footer.link"> {{footer.name_content}} </nuxt-link>
                                    </template>
                                </li>
                            </ul>
                        </div>
                        <div class="center col-md-3 col-sm-6" style="margin: 5px 0;">
                            <div class="title"><h2>{{$t("footer.head-footer.title-center")}}</h2></div>
                            <ul>
                                <li v-for="(footer, index) in dataFooter" :key="index" >
                                    <template v-if="footer.cate == 1">
                                        <nuxt-link :to="'/contents/'+footer.link">{{footer.name_content}}</nuxt-link>
                                    </template>
                                </li>
                            </ul>
                        </div>
                        <div class="center-first col-md-2 col-sm-6" style="margin: 5px 0;">
                            <div class="title"><h2>{{$t("footer.head-footer.title-first")}}</h2></div>
                            <img src="/images/giao-hang-tiet-kiem.png" alt="" style="max-width: 80px">
                            <img src="/images/logo_vietnam_post.jpg" alt="" style="max-width: 80px">
                            <img src="/images/com.viettel.ViettelPost.png" alt="" style="max-width: 40px">
                            <img src="/images/sc-by-boxme-logo.png" alt="" style="max-width: 100px">
                            <img src="/images/grabexpress.png" alt="" style="max-width: 100px">
                        </div>
                        <div class="center-second col-md-2 col-sm-6" style="margin: 5px 0;">
                            <div class="title"><h2>{{$t("footer.head-footer.title-second")}}</h2></div>
                            <ul>
                                <li><a href="#"><img src="/images/facebook.png" alt=""> &nbsp; Facebook</a></li>
                                <li><a href="#"><img src="/images/instagram.png" alt=""> &nbsp; Instagram</a></li>
                                <li><a href="#"><img src="/images/linke.png" alt=""> &nbsp; LinkedIn</a></li>
                            </ul>
                        </div>
                        <div class="right-footer col-md-2 col-sm-6" style="margin: 5px 0;">
                            <div class="title"><h2>{{$t("footer.head-footer.title-right-footer")}}</h2></div>
                            <div class="qrcode-footer"><qrcode-vue :value="valueQR" :size="50" level="H"></qrcode-vue></div>
                            <div class="industry"><img src="/images/dadangky.png" alt=""></div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="row" style="background: #f7f7f7; text-align: center; padding-top: 10px;width:100%;">
                        <div class="col">
                                <i class="fas fa-dollar-sign" style="font-size: 30px"></i>
                                <h4 style="font-size: 13px; color: #757575;">{{$t("footer.head-footer.mobile.title-1")}}</h4>
                        </div>
                        <div class="col">
                                <i class="fas fa-thumbs-up" style="font-size: 30px"></i>
                                <h4 style="font-size: 13px; color: #757575;">{{$t("footer.head-footer.mobile.title-2")}}</h4>
                        </div>
                        <div class="col">
                                <i class="fas fa-shield-alt" style="font-size: 30px"></i>
                                <h4 style="font-size: 13px; color: #757575;">{{$t("footer.head-footer.mobile.title-3")}}</h4>
                        </div>
                        
                    </div>
                    <div class="row" style="padding-top: 10px;">
                        <div class="col">
                            <div style="text-align: center;"><img src="/images/dadangky.png" alt=""></div>
                            <div ><h4 style="font-size: 13px; text-align: center;">{{$t("footer.head-footer.mobile.certificate")}} </h4></div>
                        </div>
                        <div class="col">
                            <div style="margin-bottom: 2px; text-align: center;"><img src="/images/coin.jpg" alt="" style="max-width: 43px"></div>
                            <div ><h4 style="font-size: 13px; text-align: center;">Blood Mall</h4></div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-12" style="padding-top: 60px; text-align: center;">
                        <h3 style="color: white; ">ᙘLOOD</h3>
                        <div style="color: white; font-size: 14px; display: inline-block;">
                            <p style="text-align: left;"> <span>(주)블러드랜드</span> </p>
                            <p style="text-align: left">서울특별시 서초구 논현로 87, 양재동 275-6, 주식회사 블러드랜드</p>
                            <p style="text-align: left;">(BLOODLAND Co., Ltd.), 사업자 등록번호: 618-87-01043</p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12" style="padding-top: 55px; text-align: center; ">
                        <div style="color: white; "><img src="/images/logo-bloodland-small.png" alt="" style="max-width: 73px;"></div>
                        <div style="color: white; font-size: 14px">www.blood.land</div>
                        <div style="color: white; padding: 40px 0 20px; font-size: 14px">
                            <p> Global decentralized based on blockchain technology</p>
                            <p>Copyright 2018. Blood Wallet. All right reserved.</p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12" style="padding: 60px 0 20px;">
                        <h3 style="color: white; text-align: center;">FOLLOW</h3>
                        <div style="color: white; text-align: center;">
                            <a href="https://twitter.com/bloodboom2018" target="_blank">
                                <img src="/images/sns-twitter.png" alt="" style="max-width: 40px;">
                            </a>
                            <a href="https://www.youtube.com/channel/UCNs839llYrwYG2vOhV111Tg" target="_blank">
                                <img src="/images/sns-youtube.png" alt="" style="max-width: 40px;">
                            </a>
                            <a href="https://www.facebook.com/bloodtrade" target="_blank">
                                <img src="/images/sns-facebook.png" alt="" style="max-width: 40px;">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import Vue from "vue"
    import axios from "axios"
    import QrcodeVue from 'qrcode.vue';
    import i18n from '~/lang/i18n.js';
    
    export default {
        components:{QrcodeVue},
        i18n,
        data(){
            return {
                dataFooter:[],
                valueQR:"BLOODLAND"
            }
        },
        created(){
            this.fetchDataFooter()
        },
        computed: {
            checkResponsive(){
                var md = new MobileDetect(window.navigator.userAgent)
                if (md.mobile() == null && md.tablet() == null) return true
                else {
                    if (md.tablet() != null) return true
                    else return false
                }
            },
        },
        methods:{
            
            fetchDataFooter(){
                axios.get(`${this.$store.state.apiLink}/contents/list-contents`)
                .then(data => { if (data.data.successes === true) { this.dataFooter = data.data.data } })
                .catch(err => { console.log(err) })
            }
        }
    }
</script>