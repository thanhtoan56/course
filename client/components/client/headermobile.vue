<template>
    <div id="page">
        <div class="header-mobile" style="height: auto;">
            <a href="#menu"><span></span></a>
            <form action="">
                <div class="form-group" style="margin-bottom:0;position:relative">
                    <input type="text" :placeholder="$t('header.mobile.input')" @input="isTyping = true" v-on:keyup.enter="searchFullKey" v-model="keySearch" >
                    <button type="button" id="search-mobile" @click="searchFullKey" style="top: 2px;left: 10px;padding: 0;margin: 0;">
                        <i class="fa fa-search" style="font-size: 13px; color: rgb(120, 120, 120)"></i>
                    </button>
                </div>
                <div class="form-data-search" v-if="checkUlTab">
                  <ul>
                    <li v-for="(item, index) in dataSearch" :key="index">
                      <div @click="hiddenAndReplaceLink(item.link)">
                        <span>{{item.name_product}}</span>
                        <!-- <i class="fa fa-location-arrow" style="float: right;"></i> -->
                      </div>
                    </li>
                  </ul>
                </div>
            </form>
            <i class="fa fa-shopping-cart" @click="toCart"><div class="numberCart"><span>{{numberCart}}</span></div></i>
        </div>
        <nav id="menu">
            <span id="closeMenu" @click="closeMenu()">x</span>
            <ul>
                <li><span @click="activeHome()">{{ $t("header.mobile.menu.title-1") }}</span></li>
                <li id="title-2" @click="onClickCatecory()"><span>{{ $t("header.mobile.menu.title-2") }}</span>
                    <ul>
                      <div v-for="(category, index) in categories" :key="index">
                        <li @click="activeCategory(category.link)" class="mm-listitem"><span class="mm-listitem__text">{{category.name_category}}</span></li>
                      </div>
                    </ul>
                </li>
                <li><span @click="activeHistory()">{{ $t("header.mobile.menu.title-3") }}</span></li>
                <template v-if="!checkUserLogin">
                  <li><span @click="showModal_User_SignIn_Mobile()">{{ $t("header.mobile.menu.title-4") }}</span></li>
                </template>
                <template v-else>
                  <template v-if="!checkAuthenMobile">
                    <li @click="authenUserMobile()"><span>Authen email</span></li>
                  </template>
                  <template v-else>
                      <li @click="activeShop()"><span>{{ $t('header.mobile.menu.title-7')}}</span></li>
                      <li @click="showModal_SignUp_Shop_Mobile()"><span>{{ $t('header.mobile.menu.title-8')}}</span></li>
                      <li @click="activeProfile()"><span>{{ $t('header.mobile.menu.title-9')}}</span></li>
                    <li @click="activeOrdered()"><span>{{ $t('header.mobile.menu.title-10')}}</span></li>
                    <li @click="activeNotification()"><span>{{ $t('header.mobile.menu.title-11')}}</span></li>
                  </template>
                  <li><span @click="userLogOutMobile()">{{ $t('header.mobile.menu.title-12')}}</span></li>
                </template>
                <li><span>Về chúng tôi</span>
                    <ul>
                        <li><a href="#about/history">Lịch sử phát triển</a></li>
                        <li><span>Bộ phận nhân sự</span>
                            <ul>
                                <li><a href="#about/team/management">Management</a></li>
                                <li><a href="#about/team/sales">Sales</a></li>
                                <li><a href="#about/team/development">Development</a></li>
                            </ul>
                        </li>
                        <li><a href="#about/address">Trụ sở chính</a></li>
                    </ul>
                </li>
                <li><span @click="activeHelp()">{{ $t("header.mobile.menu.title-5") }}</span></li>
                <li id="title-6" @click="onClickLanguage()"><span>{{ $t("header.mobile.menu.title-6") }}</span>
                    <ul>
                        <!-- <div v-for="(lang, index) in listImgLang" :key="index">
                          <li @click="changeLang(lang)" class="mm-listitem"><span class="mm-listitem__text">{{category.name_category}}</span></li>
                        </div> -->
                        <li @click="changeLang('vi')"><a href="#">{{ $t("header.mobile.language.lang-1") }}</a></li>
                        <li @click="changeLang('kr')"><a href="#">{{ $t("header.mobile.language.lang-2") }}</a></li>
                        <li @click="changeLang('en')"><a href="#">{{ $t("header.mobile.language.lang-3") }}</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <modal name="Modal_SignUp_Shop_Mobile" width="85%" height="268px"  :scrollable="true" >
          <div class="model_user">
              <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
                  <div class="card-header border-bottom" style="padding: 10px;">
                      <h6 class="m-0">
                          <div class="col-md-6">
                              <li style="list-style: none;"><nuxt-link to="/">Đăng ký shop</nuxt-link></li>
                          </div>
                      </h6>
                  </div>
                  <div class="signup_shop">
                    <notifications style="width: 100%; top: 42px; right: 0px;" group="auth" />
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item p-3" style="padding: 5px !important;">
                            <div class="row">
                                <div style="margin: 5px 0; width: 100%">
                                    <input type="text" class="form-control" v-on:keyup.enter="dsa" v-model="name_shop" placeholder="Name shop" style="padding: 5px; height: 30px; font-size: 12px;">
                                </div>
                                <div style="margin: 5px 0; width: 100%">
                                    <input type="text" class="form-control" v-on:keyup.enter="dsa" v-model="address_shop" placeholder="Address" style="padding: 5px; height: 30px; font-size: 12px;">
                                </div>
                                <div style="margin: 5px 0; width: 100%">
                                    <textarea type="text" rows="4" placeholder="Description shop here..." class="form-control" v-on:keyup.enter="dsa" v-model="description" style="padding: 5px; font-size: 12px;" />
                                </div>
                                <div class="row" style="width: 100%">
                                    <button class="btn btn-accent btn-danger" @click="hideModal_SignUp_Shop_Mobile()" style="width: 50%;">Cancel</button>
                                    <button class="btn btn-accent btn-primary" :disabled="!checkSignUpShop" @click="userSignUPShop" style="width: 50%;">Sign Up Shop</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                  </div>
              </div>
          </div>
        </modal>

        <modal name="Modal_User_Mobile" width="320px" height="auto" :scrollable="true">
          <div class="model_user">
              <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
                  <div class="card-header border-bottom" style="background-color: #189EFF; padding: 10px;">
                      <span style="font-size: 13px; color: #FCF9F9; font-weight: none"><i class="fa fa-globe" style="margin: 0 10px; font-size: 13px;"></i>Đăng nhập bằng tài khoản SNS của bạn</span>
                      <span style="float: right; cursor: pointer; font-size: 13px;" @click="hideModal_User_Mobile()"><a >x</a></span>
                  </div>
                  <div class="card-header border-bottom" style="font-size: 13px; padding: 5px;">
                      <li><i>Nếu bạn chọn một trong các nút dưới đây, bạn sẽ đăng nhập vào tài khoản mạng xã hội của mình.</i></li>
                      <li><i> Nếu tài khoản mạng xã hội của bạn không có thông tin email, bạn sẽ không thể đăng nhập bình thường</i></li>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item p-3" style="height: auto !important">
                          <div class="row">
                              <div class="col">
                                  <div class="row" >
                                    <div class="col-md-12" style="padding: 0">
                                      <button class="btn btn-danger" style="width: 100%; background-color: #4267B2; border-color: none !important; font-size: 13px; "><i class="fa fa-facebook-f" style="margin: 0 10px; font-size: 15px;"></i>Đăng nhập bằng Facebook</button>
                                    </div>
                                  </div>
                                  <div class="row" >
                                    <div class="col-md-12" style="margin: 5px 0; padding: 0">
                                      <button @click="loginGoogleMobile()" class="btn  btn-primary" style="width: 100%; background-color: #DC4B29; font-size: 13px;" ><i class="fa fa-google-plus-g" style="margin: 0 10px; font-size: 15px;"></i>Đăng nhập bằng google</button>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
        </modal>
        
        <modal name="Modal_Authen_Mobile" width="70%" height="auto" :scrollable="true">
          <notifications style="width: 100%; top: 42px; right: 0px;" group="auth" />
          <div class="model_user">
            <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
              <div class="card-header border-bottom" style="padding: 10px;"><h6 class="m-0" style="font-size: 13px;"> XÁC THỰC EMAIL </h6></div>
              <div class="authen">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item p-3">
                    <i style="font-size: 12px; font-weight: 500;">Vui lòng truy cập email và gửi lại mã xác thực mà chúng tôi vừa gửi cho bạn.</i>
                    <div class="row">
                        <div style="margin: 10px 0; width: 100%">
                          <label style="color: #666; margin-bottom: 5px;">Code</label>
                          <div><input type="text" class="form-control" v-on:keyup.enter ="sendCode" v-model="code" style="padding: 5px; height: 30px;"></div>
                        </div>
                    </div>
                    <div class="row" style="width: 100%">
                      <button class="btn btn-accent btn-danger" @click="hideModal_Authen_Mobile()" style="width: 50%">Cancel</button>
                      <button class="btn btn-accent btn-primary"  @click="sendCodeMobile()" style="width: 50%">Send</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </modal>
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
import passwordValidator from 'password-validator';
import mixinsResponsive from '~/functions/responsiveGlobal'
import VueLoading from 'vuejs-loading-plugin';
import _ from 'lodash';
import i18n from '~/lang/i18n.js';

Vue.use(VueLoading);
Vue.use(VModal);
Vue.use(VueCookies);
Vue.use(Notifications);
var md5 = require('md5');
Vue.use(Toaster, {timeout: 10000});

export default {
  i18n,
  data() {
    return {
        code:"",

        name_shop:"",
        address_shop: "",
        description:"",
        
        keySearch: "",
        dataSearch: [],
        numberCart: 0,
        notification: "",
        
        categories: [],
        isTyping: false,

        listImgLang: ['vi', 'kr', 'en'],
    };
  },
  beforeCreate() {
    
  },
  created() {
    this.$nuxt.$on("showModalLoginMobile", data => {
      if(data == true) this.showModal_User_SignIn_Mobile();
    })

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
    
  },

  computed: {

    checkAuthenMobile(){  return this.$store.state.userInfo.data.auth_email === 'N' ? false : true },

    checkUserLogin(){ return this.$store.state.userInfo ? this.$store.state.userInfo.successes : false },
    
    checkUlTab() { return ( this.dataSearch !== "" && this.dataSearch.length > 0 && this.keySearch !== "" );}, //
    
    checkSignUpShop(){ return (this.name_shop != "" && this.address_shop != "" && this.description != ""); },
    
  },
  mounted(){
    this.$nuxt.$on("refreshWhenAfterLoginMobile", data => { 
      localStorage.setItem("token", data)
      this.$store.dispatch('loginUser', data); 
      // this.$loading(false)
      location.reload();
    })
    
    $(document).ready(function(){
        $("#menu").mmenu();
    })
    
    this.fetchDataCategories();
    
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
    onClickLanguage(){
      $("#mm-5 .mm-navbar a:nth-child(2)").text(this.$t("header.mobile.menu.title-6"))
    },
    onClickCatecory(){
      $("#mm-2 .mm-navbar a:nth-child(2)").text(this.$t("header.mobile.menu.title-2"))
    },
    changeLang(lang){
      this.$store.dispatch('setLang', lang)
      $("#title-2 > a").text(this.$t("header.mobile.menu.title-2"))
      $("#title-6 > a").text(this.$t("header.mobile.menu.title-6"))
      $("#mm-5 .mm-navbar a:nth-child(2)").text(this.$t("header.mobile.menu.title-6"))
      $("#menu").data("mmenu").closeAllPanels()
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
    
    hiddenAndReplaceLink(link) {
      this.$router.push(`/product/${link}`);
      this.keySearch = "";
      this.dataSearch = [];
    },
    
    searchFullKey() {
      if (this.keySearch !== "") this.$router.push(`/search/${this.keySearch}`);
      this.dataSearch = [];
      this.keySearch = "";
    },

    fetchDataCategories(){
			axios.get(`${this.$store.state.apiLink}/categories/list-categories`)
			.then(data => { if (data.data.successes) { this.categories = data.data.data } })
			.catch(err => { console.log(err) })
		},
    ////// Mobile ////////////
    hideModal_SignUp_Shop_Mobile() {
      this.name_shop = ""
      this.address_shop = ""
      this.description = ""
      this.$modal.hide("Modal_SignUp_Shop_Mobile");
    },
    showModal_SignUp_Shop_Mobile() {
        
        if(this.$store.state.userInfo.data.link === 'N')  {
          this.$modal.show("Modal_SignUp_Shop_Mobile");
          this.closeMenu();
        }
    },
    sendCodeMobile() {
      axios.post(`${this.$store.state.apiLink}/users/sendCode`, { "token": localStorage.token, "code": this.code })
      .then(data => {
          if (data.data.successes) {
              this.$notify({group: 'auth',title: 'Notice',text: 'Send code successes.', type: 'success'})
              setTimeout(() => { this.hideModal_Authen_Mobile(); }, 1000)
          } 
          else { this.$notify({group: 'auth', title: 'Notice', text: 'Code is error.', type: 'warn'})}
      })
      .catch(err => { this.$toaster.error(err) });
      this.code = ""
    },

    hideModal_Authen_Mobile() { this.$modal.hide("Modal_Authen_Mobile"); },

    authenUserMobile() {
      axios.post(`${this.$store.state.apiLink}/users/check-authen-email`, { "token": localStorage.token })
      .then( data => {
        if(data.data.successes) { this.showModal_Authen_Mobile(); }
        else this.$notify({group: 'auth',title: 'Notice',text: data.data.reason, type: 'auth'})
      })
      .catch(err => { this.$toaster.error(err || "Login no successes") });
    },

    showModal_Authen_Mobile() {
        this.$modal.show("Modal_Authen_Mobile");
        this.closeMenu();
    },

    activeHelp(){
      this.$router.push({path: "/contents/tro-giup"})
      this.closeMenu();
    },
    activeHome(){
      this.$router.push({path: "/"})
      this.closeMenu();
    },
    activeCategory(link){
      this.$router.push({path: "/categories/"+ link + '/1'})
      $("#menu").data("mmenu").closeAllPanels()
      this.closeMenu();
    },
    activeShop(){
      if(this.$store.state.userInfo.data.link !== 'N') { 
        this.$root.$router.push({ path: `/admin`});
        this.closeMenu();
      }
    },

    activeHistory(){
      this.$router.push({path: "/history"})
      this.closeMenu();
    },

    activeNotification(){
      this.$router.push({path: "/notification"})
      this.closeMenu();
    },

    activeOrdered(){
      this.$router.push({path: "/order"})
      this.closeMenu();
    },

    activeProfile(){
      this.$router.push({path: "/profile"})
      this.closeMenu();
    },

    loginGoogleMobile(){ 
      window.open("http://localhost:8000/auth/google","", "width=500,height=700")
      window.CallParent = function(data) {
        this.$nuxt.$emit("refreshWhenAfterLoginMobile",data)
      }
      this.hideModal_User_Mobile();
      // this.$loading(true)
    },

    closeMenu(){
      $(document).ready(function(){
            $("#menu").data( "mmenu" ).close();
        });
    },

    showModal_User_SignIn_Mobile() {
        this.$modal.show("Modal_User_Mobile");
        this.closeMenu();
    },

    hideModal_User_Mobile() { this.$modal.hide("Modal_User_Mobile");},
    
    userLogOutMobile(){ 
      this.$store.dispatch('clearAutUser',true); 
      this.closeMenu();
      this.$router.replace({path: "/"})
    },
    /////////////////////////////////////////////////////////
    
    toCart(){ this.$router.push('/cart')},
    
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
<style>
  .v--modal-box { top: 47px !important;}
</style>
