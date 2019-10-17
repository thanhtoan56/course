<template>
  <div>
    <header>
      <div class="addHeader" v-if="dataAdvertisements != ''">
        <div class="item" v-for="(data, index) in dataAdvertisements" :key="index">
          <template v-if="data.posision == 1">
            <a :href="data.link" target="_BLANK"><img :src="$store.state.apiApp + 'advertisements/' + data.image_advertisement" alt></a>
          </template>
        </div>
      </div>
      <div class="header-button">
        <div class="container">
          <div class="row">
            <div class="header-button-left col-xs-12 col-md-7">
              <!-- <a href="#" class="border-right">Kênh Người Bán</a>
              <span>Kết nối</span>
              <a href="#" class="social"><i class="fa fa-facebook" style="font-size: 15px; margin: 5px; color: #FFFFFF;"></i></a>
              <a href="#" class="social"><i class="fa fa-google" style="font-size: 15px; margin: 5px; color: #FFFFFF;"></i></a>
              <a href="#" class="social"><i class="fa fa-skype" style="font-size: 15px; margin: 5px; color: #FFFFFF;"></i></a>
              <a href="#" class="social"><i class="fa fa-twitter" style="font-size: 15px; margin: 5px; color: #FFFFFF;"></i></a> -->
            </div>
            <div class="header-button-right col-xs-12 col-md-5">
              <div v-if="!checkUserLogin">
                  <li  @click="showModal_User_SignIn()"><nuxt-link to="">{{ $t("header.header-button.header-button-right.title-1") }}</nuxt-link></li>
                  <!-- <li @click="showModal_User_SignUp()"><nuxt-link class="registration" to="#">Đăng Ký</nuxt-link></li> -->
              </div>
              <div class="active-user" v-else>
                  <notifications group="login" />
                  <li><nuxt-link  to="/#">{{ $store.state.userInfo.data.username}} </nuxt-link>
                    <ul class="box-active-user" v-bind:style='{"visibility" : (isActive ? "hidden !important" : "visible !important" )}'>
                      <template v-if="this.$store.state.userInfo.data.auth_email === 'N'">
                        <li @click="authenUser()"><nuxt-link  to="/">Authen email</nuxt-link></li>
                      </template>
                      <template v-if="this.$store.state.userInfo.data.auth_email === 'Y'">
                          <li @click="checkAndActiveShop()" v-if="this.$store.state.userInfo.data.link !== 'N' || this.$store.state.userInfo.data.auth_admin ==='Y'"><nuxt-link  to="#">Quản lý shop</nuxt-link></li>
                          <li @click="checkAndShowSignUpShop()" v-if="this.$store.state.userInfo.data.link === 'N' || this.$store.state.userInfo.data.auth_admin ==='Y'"><nuxt-link  to="#">Đăng ký shop</nuxt-link></li>
                          <li @click="changActive()"><nuxt-link  to="/profile">Tài khoản</nuxt-link></li>
                          <li @click="changActive()"><nuxt-link  to="/order">Đơn hàng đã mua</nuxt-link></li>
                      </template>
                      <li @click="userLogOut()"><nuxt-link  to="/">Log out</nuxt-link></li>
                    </ul>
                  </li>
              </div>
              <li><nuxt-link to="/notification"><i class="fa fa-bell" style="margin-right: 3px; color: #FFFFFF;">
                <div v-if="checkNotification" class="notification"></div>
                </i>{{ $t("header.header-button.header-button-right.title-2") }}</nuxt-link>
              </li>
              <li v-if="!checkHistory"><nuxt-link to="/">{{ $t("header.header-button.header-button-right.title-3") }}<i class="fa fa-caret-down" style="margin: 5px; color: #FFFFFF !important;"></i></nuxt-link></li>
              
              <li v-else class="product-viewed">
                <nuxt-link to="/history">{{ $t("header.header-button.header-button-right.title-3") }}<i class="fa fa-caret-down" style="margin: 5px; color: #FFFFFF;"></i></nuxt-link>
                <div class="box-history" v-bind:style='{"visibility" : (checkSeen || isActive == true ? "hidden !important" : "visible !important" )}'>
                  <div class="itemProductHistory" v-for=" (list,index) in $store.state.history.historySeen" v-bind:key="index">
                    <li v-if="index < 5" @click="changActive()"><nuxt-link :to="'/product/'+ list.link"><img v-bind:src="$store.state.apiApp + 'products/' + list.image_main" alt></nuxt-link></li>
                  </div>
                  <div class="clickSeen-History">
                    <button @click="clickSeen">Xem thêm</button>
                    <button @click="clickDeleteHistory">Xóa lịch sử</button>
                  </div>
                </div>
              </li>
              <li><nuxt-link to="/contents/tro-giup">{{ $t("header.header-button.header-button-right.title-4") }} <i class="fa fa-question-circle" style="margin-right: 3px; color: #FFFFFF;"></i></nuxt-link></li>
              
              <div class="lang">
                  <li><nuxt-link  to="/#"><img :src="'/images/lang/'+ imgLangLocal" alt="" style="max-width: 30px; position: relative; top: -2px;"></nuxt-link><i class="fas fa-sort-down" style="color: #FFFFFF; position: relative; top: -2px;" @click="showLang()"></i>
                    <ul class="active-lang" v-if="isShowLang">
                        <li v-for="(lang, index) in listImgLang" :key="index" @click="changeLang(lang)"><img :src="'/images/lang/'+ lang.text" alt="" style="max-width: 30px;"></li>
                    </ul>
                  </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="header-middle">
            <div class="col-md-12">
              <div class="header-logo col-md-2">
                <nuxt-link to="/"><i class="blood-shop"></i></nuxt-link>
              </div>
              <div class="header-middle-search col-xs-10 col-md-9 col-xs-9 col-sm-9 col-lg-9">
                <div class="form-group" style="margin-bottom: 10px;">
                  <input type="search" :placeholder="$t('header.header-middle.header-middle-search.placeholder')" @input="isTyping = true" v-on:keyup.enter="searchFullKey" v-model="keySearch" style="width: 100%;">
                  <button type="button" @click="searchFullKey"><i class="fa fa-search" style="position: center; color: #FFFFFF"></i></button>
                </div>
                <div class="form-data-search" v-if="checkUlTab">
                  <ul>
                    <li v-for="(item, index) in dataSearch" :key="index">
                      <a href="#"><span @click="hiddenAndReplaceLink(item.link)">{{item.name_product}}</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="icon-cart col-xs-2 col-md-1">
                <nuxt-link to="/cart">
                  <i class="fa fa-shopping-cart" style="font-size: 34px; margin: 2px; color: #FFFFFF">
                    <div class="numberCart"><span>{{numberCart}}</span></div>
                  </i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="col-md-10 col-md-offset-2">
              <div class="header-list-link">
                <nuxt-link v-for="tag in listTags" v-bind:key="tag.id_number" :to="'/'+tag.link + '/1'">{{tag.name_tag}}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal name="Modal_User" width="500" height="auto" :scrollable="true">
          <div class="model_user">
              <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
                  <div class="card-header border-bottom" style="background-color: #189EFF; ">
                      <span style="font-size: 18px; color: #FCF9F9; font-weight: none"><i class="fa fa-globe" style="margin: 0 10px; font-size: 18px;"></i>Đăng nhập bằng tài khoản SNS của bạn</span>
                      <span style="float: right; cursor: pointer; font-size: 18px;" @click="hideModal_User()"><a >x</a></span>
                  </div>
                  <div class="card-header border-bottom">
                      <li><i>Nếu bạn chọn một trong các nút dưới đây, bạn sẽ đăng nhập vào tài khoản mạng xã hội của mình.</i></li>
                      <li><i> Nếu tài khoản mạng xã hội của bạn không có thông tin email, bạn sẽ không thể đăng nhập bình thường</i></li>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item p-3" style="height: auto !important">
                          <div class="row">
                              <div class="col">
                                  <div class="row" >
                                    <div class="col-md-12" style="margin-bottom: 5px;">
                                      <button class="btn btn-danger" style="width: 100%; background-color: #4267B2; border-color: none !important"><i class="fa fa-facebook-f" style="margin: 0 10px; font-size: 15px;"></i>Đăng nhập bằng Facebook</button>
                                    </div>
                                  </div>
                                  <div class="row" >
                                    <div class="col-md-12" style="margin-bottom: 5px;">
                                      <button @click="loginGoogle()" class="btn  btn-primary" style="width: 100%; background-color: #DC4B29" ><i class="fa fa-google-plus-g" style="margin: 0 10px; font-size: 15px;"></i>Đăng nhập bằng google</button>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </modal>
      <!-- <modal name="Modal_User" width="900px" height="476px" :scrollable="true">
          
          <div class="col-md-5 image_logo">
              <div class="card card-small mb-4" style="margin-bottom: 0!important">
                  <div class="content_model_user" style="height: 147px">
                      <div v-if="isShow_signIn == true">
                          <h2>Đăng nhập</h2>
                          <p>Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</p>
                      </div>
                      <div v-if="isShow_signUp == true">
                          <h2 >Đăng ký</h2>
                          <p>Đăng ký để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</p>
                      </div>
                  </div>
                  <div>
                      <img src="../../assets/images/image_logo.png" alt="" style="max-width: 100%;">
                  </div>
              </div>
          </div>
          <div class="col-md-7 model_user">
              <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
                  <div class="card-header border-bottom">
                      <h6 class="m-0">
                          <div class="col-md-6"> 
                              <li @click="showSignIn()" style="list-style: none;"><nuxt-link to="">Đăng nhập</nuxt-link></li>
                          </div>
                          <div class="col-md-6">
                              <li @click="showSignUp()" style="list-style: none;"><nuxt-link to="">Đăng ký</nuxt-link></li>
                          </div>
                      </h6>
                  </div>
                  <div class="signin" v-if="isShow_signIn">
                      <notifications group="login" />
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item p-3" style="height: 420px !important">
                              <div class="row">
                                  <div class="col">
                                      <div class="form-row " style="margin: 15px 0; width: 100%">
                                          <div class="col-md-3"><label for="feEmailAddress">Username</label></div>
                                          <div class="col-md-9"><input type="username" class="form-control" v-on:keyup.enter="userLogin" v-model="username" placeholder="User Name"></div>
                                      </div>
                                      <div class="form-row" style="margin: 15px 0; width: 100%">
                                          <div class="col-md-3"><label for="fePassword">Password</label></div>
                                          <div class="col-md-9"><input type="password" class="form-control" v-on:keyup.enter="userLogin" v-model="password" placeholder="Password"></div>
                                      </div>
                                      <div class="button-add-user">
                                          <button class="btn btn-accent btn-danger" @click="hideModal_User()">Cancel</button>
                                          <button class="btn btn-accent btn-primary" :disabled="!checkingSignIn" @click="userLogin">Sign In</button>
                                      </div>
                                      <div class="row" >
                                        <div class="col-md-12" style="margin-top: 10px; margin-bottom: 5px;">
                                          <button class="btn btn-danger" style="width: 100%; background-color: #3A589E"><i class="fa fa-facebook-f" style="margin: 0 10px; font-size: 15px;"></i>Đăng nhập bằng Facebook</button>
                                        </div>
                                      </div>
                                      <div class="row" >
                                        <div class="col-md-12" style="margin-bottom: 5px;">
                                          <button @click="loginGoogle()" class="btn  btn-primary" style="width: 100%; background-color: #DC4B29" ><i class="fa fa-google-plus-g" style="margin: 0 10px; font-size: 15px;"></i>Đăng nhập bằng google</button>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>

                  <div class="signup" v-if="isShow_signUp">
                    <notifications group="auth" />
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item p-3" style="height: 420px !important">
                            <div class="row">
                            <div class="col">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="feFirstName">Full Name</label>
                                        <input type="text" class="form-control" v-model="user.fullname" placeholder="Full Name" value >
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="feLastName">Phone number</label>
                                        <input type="text" class="form-control" v-model="user.phone_number" placeholder="Phone number">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="feEmailAddress">Email</label>
                                        <input type="email" class="form-control" v-model="user.email" placeholder="@example.com">
                                    </div>
                                    <div class="form-group col-md-6" style="margin-bottom: 0">
                                        <label for="feEmailAddress">Username</label>
                                        <input type="username" class="form-control" v-model="user.username" placeholder="User Name">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="fePassword">Password</label>
                                        <input type="password" class="form-control" v-model="user.password" placeholder="Password">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="fePassword">Password Again</label>
                                        <input type="password" class="form-control" v-model="user.passwordagain"  placeholder="Password" >
                                    </div>
                                </div>
                                <div class="button-add-user">
                                    <button class="btn btn-accent btn-danger" @click="hideModal_User()">Cancel</button>
                                    <button class="btn btn-accent btn-primary" :disabled="!checkingButton" @click="signUp()" >Sign Up</button></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                  </div>
              </div>
          </div>
      </modal> -->
      <modal name="Modal_SignUp_Shop" width="900px" height="476px" :scrollable="true">
        <div class="col-md-5 image_logo">
            <div class="card card-small mb-4" style="margin-bottom: 0!important">
                <div class="content_model_user" style="height: 147px">
                  <h2>Đăng ký shop</h2>
                  <p>Đăng ký bán hàng cùng BloodMall để nhận nhiều ưu đãi hấp dẫn.</p>
                </div>
                <div><img src="../../assets/images/image_logo.png" alt="" style="max-width: 100%;"></div>
            </div>
        </div>
        <div class="col-md-7 model_user">
            <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
                <div class="card-header border-bottom">
                    <h6 class="m-0">
                        <div class="col-md-6">
                            <li style="list-style: none;"><nuxt-link to="/">Đăng ký shop</nuxt-link></li>
                        </div>
                    </h6>
                </div>
                <div class="signup_shop">
                  <notifications group="auth" />
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item p-3" style="height: 420px !important">
                          <div class="row">
                              <div class="col">
                                  <div class="form-row " style="margin: 15px 0; width: 100%">
                                      <div class="col-md-3"><label for="feEmailAddress">Name Shop</label></div>
                                      <div class="col-md-9"><input type="text" class="form-control" v-on:keyup.enter="dsa" v-model="name_shop" placeholder="name"></div>
                                  </div>
                                  <div class="form-row" style="margin: 15px 0; width: 100%">
                                      <div class="col-md-3"><label for="fePassword">Address Shop</label></div>
                                      <div class="col-md-9"><input type="text" class="form-control" v-on:keyup.enter="dsa" v-model="address_shop" placeholder="address"></div>
                                  </div>
                                  <div class="form-row" style="margin: 15px 0; width: 100%">
                                      <div class="col-md-3"><label for="fePassword">Description Shop</label></div>
                                      <div class="col-md-9"><textarea type="text" rows="8" class="form-control" v-on:keyup.enter="dsa" v-model="description" /></div>
                                  </div>
                                  <div class="button-add-user">
                                      <button class="btn btn-accent btn-danger" @click="hideModal_SignUp_Shop()">Cancel</button>
                                      <button class="btn btn-accent btn-primary" :disabled="!checkSignUpShop" @click="userSignUPShop">Sign Up Shop</button>
                                  </div>
                              </div>
                          </div>
                      </li>
                  </ul>
                </div>
            </div>
        </div>
      </modal>
      <modal name="Modal_Authen" width="415px" height="auto" :scrollable="true">
        <notifications group="auth" />
        <div class="model_user">
          <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
            <div class="card-header border-bottom"><h6 class="m-0"> XÁC THỰC EMAIL </h6></div>
            <div class="authen">
              <ul class="list-group list-group-flush">
                <li class="list-group-item p-3">
                  <i style="font-size: 15px; font-weight: 500;">Vui lòng truy cập email và gửi lại mã xác thực mà chúng tôi vừa gửi cho bạn.</i>
                  <div class="row">
                    <div class="col">
                      
                      <div class="form-row " style="margin: 15px 0; width: 100%">
                        <div class="col-md-2"><label style="color: #666">Code</label></div>
                        <div class="col-md-8"><input type="text" class="form-control" v-on:keyup.enter ="sendCode" v-model="code" placeholder="..."></div>
                      </div>
                      
                      <div class="button-add-user">
                        <button class="btn btn-accent btn-danger" @click="hideModal_Authen()">Cancel</button>
                        <button class="btn btn-accent btn-primary"  @click="sendCode()">Send</button>
                      </div>
                    
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </modal>
    </header>
    <HeaderMobile />
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Toaster from 'v-toaster';
import VModal from "vue-js-modal";
import VueCookies from "vue-cookies";
import 'v-toaster/dist/v-toaster.css';
import Notifications from 'vue-notification';
import VueLoading from 'vuejs-loading-plugin';
import passwordValidator from 'password-validator';
import mixinsResponsive from '~/functions/responsiveGlobal'
import HeaderMobile from '~/components/client/headermobile';
import i18n from '~/lang/i18n.js';

import _ from 'lodash';

Vue.use(VueLoading);
Vue.use(VModal);
Vue.use(VueCookies);
Vue.use(Notifications);
var md5 = require('md5');
Vue.use(Toaster, {timeout: 10000});
export default {
  components:{ HeaderMobile },
  i18n,
  data() {
    return {
        dataAdvertisements:"",
        username: "",
        password: "",
        code:"",

        name_shop:"",
        address_shop: "",
        description:"",
        isAuthen: false,
        user: {
            fullname: "",
            phone_number: "",
            email: "",
            username: "",
            password: "",
            passwordagain: "",
            errors: []
        },
        listTags: [],
        keySearch: "",
        dataSearch: [],
        numberCart: 0,
        showHistory: false,
        arrHis: [],
        isHidden: true,
        isShow_signIn: true,
        isShow_signUp: true,
        isCode: false,

        notification: "",
        passwordError: [],
        isActive: false,

        isTyping: false,

        listImgLang:
        [
          { text:"vietnam.png", data: 'vi' }, 
          { text: "korea.png", data: 'kr' }, 
          { text: "usa.png", data: 'en' }
        ],
        isShowLang: false,
        imgLangLocal: "vietnam.png"
    };
  },
  
  created() {
    console.log(this.$store.state.countProduct)
    if (localStorage.language) {
      console.log(localStorage.language)
      for (var i = 0; i < this.listImgLang.length; i++) { 
        if(this.listImgLang[i].data == localStorage.language) 
          this.imgLangLocal = this.listImgLang[i].text
      }
    }

    this.$nuxt.$on("showModalLogin", data => {
      if(data == true) this.showModal_User_SignIn();
    })
    
    this.fetchDatatag();

    this.$store.dispatch("cart/cartDispath");

    if ($cookies.isKey("cart") === true) {
      let arrCart = JSON.parse(this.$cookies.get("cart"));
      for (var i = 0; i < arrCart.length; i++) { this.numberCart += arrCart[i].quantity; }
    }

    this.$nuxt.$on("addNumberCart", data => { if (data !== "") { 
        this.numberCart = 0
        for(let i = 0; i < data.length; i ++){ this.numberCart += data[i].quantity;  } }
    });

    this.$nuxt.$on("clearNumberCart", data => { this.numberCart = 0; });
    
    this.$nuxt.$on("minusNumberCart", data => { this.numberCart = this.numberCart - data; });

    this.$nuxt.$on("changeNumberCart", data => { this.numberCart = data; });

    this.fetchDataAddvise();

  },

  computed: {

    checkUserLogin(){ return this.$store.state.userInfo ? this.$store.state.userInfo.successes : false },
    
    checkHistory(){ return this.$store.state.history.historySeen.length > 0 ? true : false },
    
    checkUlTab() { return ( this.dataSearch !== "" && this.dataSearch.length > 0 && this.keySearch !== "" );},
    
    checkingButton(){ return ( this.user.fullname !== "" && this.user.phone_number !== "" && this.user.email !== "" && this.user.username !== "" && this.user.address_shop !== "" && this.user.password !== "" && this.user.passwordagain !== "" );},
    
    checkingSignIn() { return ( this.username !== "" && this.password !== "" ); },
    
    checkSignUpShop(){ return (this.name_shop != "" && this.address_shop != "" && this.description != ""); },
    
    checkNotification(){ return this.$store.state.userNotification != "" ? true : false },

    checkSeen(){ return this.$route.name == 'history' ? true : false }
    
  },
  mounted(){
    this.$nuxt.$on("refreshWhenAfterLogin", data => { 
      localStorage.setItem("token", data)
      this.$store.dispatch('loginUser', data); 
      this.$store.dispatch('notification', data);
      this.$loading(false)
    })
  },
  watch: {
    keySearch: _.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.showSearchProduct(this.keySearch);
      }
    }
  },
  methods: {
    changeLang(lang){
      this.isShowLang = !this.isShowLang;
      this.imgLangLocal = lang.text
      this.$store.dispatch('setLang', lang.data)
    },
    showLang(){
      this.isShowLang = !this.isShowLang
    },
    showSearchProduct: function(keySearch) {
      if (this.keySearch != "") {
        axios.get(`${this.$store.state.apiLink}/products/search/${this.keySearch}`)
          .then(data => {
            if(data.data.data.length != 0) this.dataSearch = data.data.data; 
            else {
              this.dataSearch = []
              this.dataSearch.push({"link": "", "name_product": `Không tìm thấy sản phẩm có key search là: "${this.keySearch}"`})
            }
          });
      }
    },

    checkAndActiveShop(){
      this.changActive();
      if(this.$store.state.userInfo.data.link === 'N')  this.$notify({ group: "login", title: "Warring", text: "Error! You don't have shop.", type: "error" });
      else this.$root.$router.push({ path: `/admin`});
    },
    checkAndShowSignUpShop(){
      this.changActive();
      if(this.$store.state.userInfo.data.link !== 'N')  this.$notify({ group: "login", title: "Warring", text: "Error! You had shop.", type: "error" });
      else this.showModal_SignUp_Shop();
    },
    clickDeleteHistory(){
      this.$store.dispatch('history/DeleteHistorySeen')
      this.$notify({ group: "login", title: "Success", text: "Delete successes.", type: "success" });
    },
    toCart(){
      this.$router.push('/cart')
    },
    changActive(){
      this.isActive = !this.isActive
      setTimeout(() => { this.isActive = false }, 1500)
    },
    
    loginGoogle(){ 
      window.open("http://localhost:8000/auth/google","", "width=500,height=700")
      window.CallParent = function(data) {
        this.$nuxt.$emit("refreshWhenAfterLogin",data)
      }
      this.hideModal_User();
      this.$loading(true)
    },
    
    fetchDatatag() {
      axios.get(`${this.$store.state.apiLink}/tags/list-tags`)
      .then(data => { if (data.data.successes) { this.listTags = data.data.data; }})
      .catch(err => { console.log(err); });
    },
    
    hiddenAndReplaceLink(link) {
      this.$router.push(`/product/${link}`);
      this.keySearch = "";
      this.dataSearch = [];
    },
    
    fetchDataAddvise() {
      axios.get(`${this.$store.state.apiLink}/advertisements/list-advertisement`)
      .then(data => { if (data.data.successes) { 
        this.dataAdvertisements = data.data.data
        this.$store.dispatch('storeAdve', data.data.data); 
      }})
      .catch(err => { console.log(err);});
    },
    
    searchFullKey() {
      if (this.keySearch !== "") this.$router.push(`/search/${this.keySearch}`);
      this.dataSearch = [];
      this.keySearch = "";
    },
    
    clickSeen() { this.$router.push(`/history`); },
    
    wrongNumber(phone) {
      if (phone) {
        return (
          (Number.isInteger(Number(phone)) === phone.toString().length < 1) ===
          phone.toString().length > 10
        );
      }
    },
    
    emptyForm() {
      this.user.fullname = "";
      this.user.phone_number = "";
      this.user.email = "";
      this.user.username = "";
      this.user.address_shop = "";
      this.user.password = "";
      this.user.passwordagain = "";
    },
    
    checkPass(password){
      var schema = new passwordValidator();
      // Add properties to it
      schema
      .is().min(8)                                    // Minimum length 8
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits()                                 // Must have digits
      .has().symbols()                                // Must include symbols
      .has().not().spaces()                           // Should not have spaces
      // .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
      // .is().max(100)                                  // Maximum length 100
      return schema.validate(password, { list: true });
      
    },
    
    checkEmail(email){
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(email)){
          const format = email.split("@")[1]
          const form = format.split(".")[0]
          if(form == "gmail") return true
          else return false;
      } else return false;
    },
    
    signUp() {
      
      const { fullname, phone_number, email, username, password } = this.user
      this.errors = [];
      if ((fullname !== "" && phone_number !== "" && email !== "" && username !== ""  && password !== "") === false) {
        this.errors.push("empty");
        this.$notify({ group: "auth", title: "Notice", text: "Condition no valid", type: "warn" });
      }
      if (!Number.isInteger(Number(this.user.phone_number))) {
        this.errors.push("wrongNumber");
        this.$notify({ group: "auth", title: "Warring", text: "Phone number Errors2.", type: "warn" });
      }
      if ( phone_number.toString().length < 8 && phone_number.toString().length > 11) {
        this.errors.push("wrongNumber");
        this.$notify({ group: "auth", title: "Warring", text: "Phone number Errors1.", type: "warn" });
      }
      if (this.checkPass(this.user.password) != "") {
        this.errors.push("password");
        this.passwordError = this.checkPass(this.user.password);
        for ( let i = 0; i < this.passwordError.length; i++){
          if(this.passwordError[i] == "min") { this.$notify({ group: "auth", title: "Warring", text: "Password length must be 8 characters.", type: "warn" }); } 
          else { this.$notify({ group: "auth", title: "Warring", text: "Password must be have "+ this.passwordError[i] +" characters.", type: "warn" }); }
        }
      }
      if(this.checkEmail(email) == false ){
        this.errors.push("email");
        this.$notify({ group: "auth", title: "Warring", text: "Email error format.", type: "warn" });
      }
      if (this.user.password !== this.user.passwordagain) { this.$notify({ group: "auth", title: "Notice", text: "Password no duplicate", type: "warn" }); }

      if (this.errors.length == 0) {
        axios.post(`${this.$store.state.apiLink}/users/add`, {
            "fullname": fullname,
            "phone_number": phone_number,
            "email": email,
            "username": username,
            "password": md5(password)
        })
        .then(res => {
          if (res.data.successes === true) {
            this.$nuxt.$emit("status", res);
            this.emptyForm();
            this.$notify({ group: "auth", title: "Notice", text: "Đăng ký thành công. Bạn cần đăng nhập để xác thực email", type: "success" });
            this.showSignIn();
          }
          if (res.data.successes === false) {
            this.error = res.data.reason;
            this.$notify({ group: "auth", title: "Notice", text: this.error || "Error", type: "warn" });
          }
        })
        .catch(err => err)
      };
    },
    
    showModal_User_SignIn() {
        this.$modal.show("Modal_User");
        this.showSignIn();
    },
    
    showModal_User_SignUp() {
        this.$modal.show("Modal_User");
        this.showSignUp();
    },

    hideModal_User() { this.$modal.hide("Modal_User");},

    showSignIn() {
        this.isShow_signIn = true;
        this.isShow_signUp = false;
    },
    
    showSignUp() {
        this.isShow_signUp = true;
        this.isShow_signIn = false;
    },

    userLogin(){
        if (this.username && this.password) {
          axios.post(`${this.$store.state.apiLink}/users/login`,{ "username":this.username, "password":md5(this.password)})
          .then(data => {
              if (data.data.successes) {
                  localStorage.setItem("token", data.data.data)
                  this.$store.dispatch('loginUser', data.data.data);
                  this.hideModal_User();
              } 
              else { this.$notify({group: 'login',title: 'Notice',text: data.data.data ||'Login no successes',type: 'error'}) }
          })
          .catch(err => { this.$toaster.error(err || "Login no successes") });
        } 
        else { this.$toaster.error("Enter infomation Login") }
        this.username = ""
        this.password = ""
    },
    
    userLogOut(){ this.$store.dispatch('clearAutUser',true); },

    showModal_Authen() { this.$modal.show("Modal_Authen"); },
    
    hideModal_Authen() { this.$modal.hide("Modal_Authen"); },
    
    sendCode() {
      axios.post(`${this.$store.state.apiLink}/users/sendCode`, { "token": localStorage.token, "code": this.code })
      .then(data => {
          if (data.data.successes) {
              this.isAuthen = !this.isAuthen
              this.$notify({group: 'auth',title: 'Notice',text: 'Send code successes.', type: 'success'})
              setTimeout(() => { this.hideModal_Authen(); }, 1000)
          } 
          else { this.$notify({group: 'auth', title: 'Notice', text: 'Code is error.', type: 'warn'})}
      })
      .catch(err => { this.$toaster.error(err) });
      this.code = ""
    },
    
    authenUser() {
      axios.post(`${this.$store.state.apiLink}/users/check-authen-email`, { "token": localStorage.token })
      .then( data => {
        if(data.data.successes) { this.showModal_Authen(); }
        else this.$notify({group: 'auth',title: 'Notice',text: data.data.reason, type: 'auth'})
      })
      .catch(err => { this.$toaster.error(err || "Login no successes") });
    },
    
    cleanAccents(str){
      if (str && str !== "") {
        str= str.toLowerCase();
        str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a")
        str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e")
        str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i")
        str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
        str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
        str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
        str= str.replace(/đ/g,"d")
        str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-")
        str= str.replace(/-+-/g,"-");
        str= str.replace(/^\-+|\-+$/g,"")
      }
      return str
    },
    
    showModal_SignUp_Shop() { this.$modal.show("Modal_SignUp_Shop"); },

    hideModal_SignUp_Shop() {
      this.name_shop = ""
      this.address_shop = ""
      this.description = ""
      this.$modal.hide("Modal_SignUp_Shop");
    },
    
    userSignUPShop(){
        if (this.name_shop && this.address_shop && this.description) {
          axios.post(`${this.$store.state.apiLink}/users/signup-shop`,{
              "name_shop":this.name_shop,
              "address_shop": this.address_shop,
              "description": this.description,
              "token": localStorage.token,
              "id_number": this.$store.state.userInfo.data.id_number
          })
          .then(data => {
              if (data.data.successes) {
                  this.$notify({group: 'auth',title: 'Notice', text: "Sign up shop is success!",type: 'success'})
                  setTimeout(() => { this.hideModal_SignUp_Shop() }, 1000);
              } 
              else this.$notify({group: 'auth',title: 'Error', text: data.data.reason, type: 'error'})
          })
          .catch(err => { this.$toaster.error(err)});
        } 
        else { this.$toaster.error("Enter infomation Login") }
    },
  }
};
</script>

