<template>
    <div>
        <div class="form-update-user-client" v-if="dataUser" >
            <template v-if="checkResponsive">
                <div class="row">
                    <div class="col-md-12">
                        <notifications group="success" />
                        <h2>{{$t('profile.title')}}</h2>
                        <div class="col-md-6 col-sm-12 profile-field">
                            <label for="feFirstName" class="col-md-3 col-sm-12">{{$t('profile.fullName')}}</label>
                            <input type="text" class="col-md-9 col-sm-12 form-control" :value="user.fullname" ref="fullname" placeholder="Full Name"  >
                        </div>
                        <div class="col-md-6 col-sm-12 profile-field">
                            <label for="feLastName" class="col-md-3 col-sm-12">{{$t('profile.phone')}}</label>
                            <input type="text" class="col-md-9 col-sm-12 form-control" :value="user.phone_number" v-numericOnly ref="phone_number" placeholder="Phone number">
                        </div>
                        <div class="col-md-6 col-sm-12 profile-field" >
                            <label for="feInputAddress" class="col-md-3 col-sm-12">{{$t('profile.address')}}</label>
                            <textarea textarea rows="3" cols="20" class="col-md-9 col-sm-12 form-control" :value="user.address_shop" ref="address_shop" placeholder="Cập nhật địa chỉ của bạn ..."></textarea>
                        </div>
                        <div class="col-md-6 col-sm-12 profile-field">
                            <label for="feEmailAddress" class="col-md-3 col-sm-12">{{$t('profile.email')}}</label>
                            <input type="email" class="col-md-9 col-sm-12 form-control" disabled="true" :value="user.email" placeholder="@example.com" >
                        </div>
                        <div class="col-md-6 col-sm-12 profile-field">
                            <label for="feEmailAddress" class="col-md-3 col-sm-12">{{$t('profile.username')}}</label>
                            <input type="username"  class="col-md-9 col-sm-12 form-control" disabled="true" :value="user.username" placeholder="User Name" >
                        </div>
                        <template v-if="check">
                            <div class="col-md-6 col-sm-12 profile-field">
                                <label for="feEmailAddress" class="col-md-3 col-sm-12">{{$t('profile.walletAddress')}}</label>
                                <input  type="username" class="col-md-9 col-sm-12 form-control" disabled="true" :value="user.wallet_address" >
                            </div>
                            <div class="col-md-6 col-sm-12 profile-field">
                                <label  class="col-md-3 col-sm-12">{{$t('profile.balance')}}</label>
                                <input type="text" class="col-md-7 col-sm-12 form-control" disabled="true" :value="user.balance" ><span style="transform: translate(13%, 50%); position: absolute; font-size: 13px; font-weight: 500;">BLOOD</span>
                            </div>
                            <div class="col-md-12 col-sm-12 profile-field">
                                <qr-code class="pr-code" :text= "user.wallet_address"  error-level="L"></qr-code>
                            </div>
                        </template>
                        <div class=" col-md-12 col-sm-12 button-add-user" style="margin: 15px 0;">
                            <button class="btn btn-accent btn-primary"  @click="updateUser()">{{$t('profile.buttonUpdateInfo')}}</button>
                            <button v-if="!check" class="btn btn-accent btn-success"  @click="showFormCreateWallet()">{{$t('profile.buttonCreateWallet')}}</button>
                        </div>
                    </div>
                </div>
                <div v-if="!isShowFormSendBlood" class="row">
                    <div class="btn-show-send-blood" style="margin: 20px 30px; padding: 0;"><button class="btn btn-success" @click="isShowButtonSend">{{$t('profile.buttonSendBlood')}}</button></div>
                </div>
                <div v-if="isShowFormSendBlood" class="row">
                    <div class="col">
                        <notifications group="success" />
                        <h2>{{ $t('profile.titleSendBlood') }}</h2>
                        <div class="form-row" style="margin: 20px 30px;">
                            <label for="feFirstName">{{ $t('profile.addressSender') }}</label>
                            <input type="text" class="form-control" disabled="true" :value="user.wallet_address" ref="addressSender">
                        </div>
                        <div class="form-row" style="margin: 20px 30px;">
                            <label for="feLastName">{{ $t('profile.addressReceiver') }}</label>
                            <input type="text" class="form-control" ref="addressReceiver">
                        </div>
                        <div class="form-row" style="margin: 20px 30px;">
                            <label>{{ $t('profile.amount') }}</label>
                            <input type="text" class="form-control" placeholder="Blood" ref="amount">
                        </div>
                        <div class=" col-md-12 button-add-user" style="margin: 15px 0">
                            <button class="btn btn-danger"  @click="isShowButtonSend()">{{ $t('profile.buttonCancel') }}</button>
                            <button class="btn btn-success"  @click="sendBlood()">{{ $t('profile.buttonSendBlood') }}</button>
                        </div>
                    </div>
                </div>
                <modal name="Modal_Create_Wallet" width="340px" height="auto" :scrollable="true">
                    <div class="image_logo">
                        <div class="card card-small mb-4" style="margin-bottom: 0!important">
                            <div class="content_model_user" style="height: 147px">
                                <h2>Tạo Ví Blood</h2>
                                <p>Tạo ví Wallet để nhận nhiều ưu đãi hấp dẫn.</p>
                            </div>
                            <div><img src="~/assets/images/image_logo.png" alt="" style="max-width: 100%;"></div>
                            <button style="max-width: 100%" class="btn btn-accent btn-success"  @click="createWallet()">Create Wallet</button>
                        </div>
                    </div>
                </modal>
            </template>

            <template v-else>
                <div class="row" style="padding-bottom: 10px;">
                    <notifications style="width: 70%; top: 42px; right: 0px;" group="success" />
                    <h2>{{$t('profile.title')}}</h2>
                    <div class="profile-field">
                        <label for="feFirstName">{{$t('profile.fullName')}}</label>
                        <input type="text" class="form-control" :value="user.fullname" ref="fullname" placeholder="Full Name"  >
                    </div>
                    <div class="profile-field">
                        <label for="feLastName" >{{$t('profile.phone')}}</label>
                        <input type="text" class="form-control" :value="user.phone_number" v-numericOnly ref="phone_number" placeholder="Phone number">
                    </div>
                    <div class="profile-field" >
                        <label for="feInputAddress">{{$t('profile.address')}}</label>
                        <textarea textarea rows="2" cols="20" class="form-control" :value="user.address_shop" ref="address_shop" placeholder="Cập nhật địa chỉ của bạn ..."></textarea>
                    </div>
                    <div class="profile-field">
                        <label for="feEmailAddress" >{{$t('profile.email')}}</label>
                        <input type="email" class="form-control" disabled="true" :value="user.email" placeholder="@example.com" >
                    </div>
                    <div class="profile-field">
                        <label for="feEmailAddress" >{{$t('profile.username')}}</label>
                        <input type="username"  class="form-control" disabled="true" :value="user.username" placeholder="User Name" >
                    </div>
                    <template v-if="check">
                        <div class="profile-field">
                            <label for="feEmailAddress" >{{$t('profile.walletAddress')}}</label>
                            <input  type="username" class="form-control" disabled="true" :value="user.wallet_address" >
                        </div>
                        <div class="profile-field">
                            <label >{{$t('profile.balance')}}</label>
                            <input type="text" class="form-control" disabled="true" :value="user.balance" >
                            <!-- <label >BLOOD</label> -->
                        </div>
                        <qr-code class="pr-code" :text= "user.wallet_address"  error-level="L" style="text-align: center !important;"></qr-code>
                    </template>
                    <div class="button-add-user" style="margin-top: 15px;">
                        <button class="btn btn-accent btn-primary"  @click="updateUser()">{{$t('profile.buttonUpdateInfo')}}</button>
                    </div>
                    <div v-if="!check"  class="button-add-user" style="margin-top: 2px;">
                        <button class="btn btn-accent btn-success"  @click="showFormCreateWallet()">{{$t('profile.buttonCreateWallet')}}</button>
                    </div>
                    <div v-if="!isShowFormSendBlood" class="button-add-user" style="margin-top: 2px;">
                        <button class="btn btn-info" @click="isShowButtonSend">{{$t('profile.buttonSendBlood')}}</button>
                    </div>
                </div>
                <div class="row" v-if="isShowFormSendBlood">
                    <notifications style="width: 100%; top: 42px; right: 0px;" group="success" />
                    <div class="profile-field" >
                        <label for="feFirstName" style="font-size: 20px;">{{$t('profile.buttonSendBlood')}}</label>
                    </div>
                    <div class="profile-field" >
                        <label for="feFirstName">{{$t('profile.addressSender')}}</label>
                        <input type="text" class="form-control" disabled="true" :value="user.wallet_address" ref="addressSender">
                    </div>
                    <div class="profile-field" >
                        <label for="feLastName">{{$t('profile.addressReceiver')}}</label>
                        <input type="text" class="form-control" ref="addressReceiver">
                    </div>
                    <div class="profile-field" >
                        <label>{{$t('profile.amount')}}</label>
                        <input type="text" class="form-control" placeholder="Blood" ref="amount">
                    </div>
                    <div class="btn-send-mobile">
                        <button class="btn btn-danger" @click="isShowButtonSend()">{{$t('profile.buttonCancel')}}</button>
                        <button class="btn btn-success" @click="sendBlood()">{{$t('profile.buttonSendBlood')}}</button>
                    </div>
                </div>
                <modal name="Modal_Create_Wallet" width="340px" height="auto" :scrollable="true">
                    <div class="image_logo">
                        <div class="card card-small mb-4" style="margin-bottom: 0!important">
                            <div class="content_model_user" style="height: 147px">
                                <h2>Tạo Ví Blood</h2>
                                <p>Tạo ví Wallet để nhận nhiều ưu đãi hấp dẫn.</p>
                            </div>
                            <div><img src="~/assets/images/image_logo.png" alt="" style="max-width: 100%;"></div>
                            <button style="max-width: 100%" class="btn btn-accent btn-success"  @click="createWallet()">Create Wallet</button>
                        </div>
                    </div>
                </modal>
            </template>
        </div>
        <div class="nohas-categories-list" v-else><ErrorComponent/></div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import VModal from "vue-js-modal";
import VueCookie from 'vue-cookie';
import Notifications from 'vue-notification';
import VueQRCodeComponent from 'vue-qrcode-component'
import ErrorComponent from "~/components/client/error"
import i18n from '~/lang/i18n.js';

Vue.use(VModal);
Vue.use(VueCookie);
Vue.use(Notifications);
Vue.component('qr-code', VueQRCodeComponent)

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
    components:{ ErrorComponent },
    i18n,
    data(){
        return {
            user: "",
            isShowFormSendBlood: false
        }
    },
    created(){},
    
    computed:{
        dataUser(){
            if(this.$store.state.userInfo && this.$store.state.userInfo != ""){
                if(this.$store.state.userInfo.data && this.$store.state.userInfo.data != ""){
                    this.user = this.$store.state.userInfo.data
                    return true
                }
            }
        },
        check(){ return this.user.wallet_address && this.user.wallet_address != "" ? true : false },
    },
    methods:{
        sendBlood(){
            this.$loading(true)
            if(!this.$cookies.isKey("rate-limit")){
                axios.post(`${this.$store.state.apiLink}/users/send-blood`,{
                    "addressReceiver":this.$refs.addressReceiver.value, 
                    "amount":this.$refs.amount.value,
                    "token": localStorage.token,
                })
                .then(res => {
                    Vue.notify({ group: 'success',title: 'Confirm',text: res.data.successes ? 'Send blood is successes' : res.data.reason, type: res.data.successes ?'success' : 'warn'})
                    if(res.data.successes){
                        this.$cookie.set('rate-limit', true, { expires: '30s' });
                        this.isShowButtonSend()
                    }
                    this.$store.dispatch('loginUser', localStorage.token);
                    this.$loading(false) 
                }).catch(err => console.log(err))
            } else { Vue.notify({ group: 'success',title: 'Confirm',text: 'Please wait 30 seconds later' , type: 'warn'}); return this.$loading(false)}
        },
        
        isShowButtonSend(){ this.isShowFormSendBlood = !this.isShowFormSendBlood },
        
        updateUser(){
            var fullname = this.$refs.fullname.value
            var phone_number = this.$refs.phone_number.value
            var address_shop = this.$refs.address_shop.value
            var id = this.$store.state.userInfo.data.id_number;
            
            if(fullname == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Full name is empty', type: 'warn'});
            else if(phone_number == 0 || phone_number == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Phone nunber is empty', type: 'warn'});
            else if(address_shop == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Address is empty', type: 'warn'});
            
            axios.post(`${this.$store.state.apiLink}/users/update`,{
                "fullname":fullname,
                "phone_number": phone_number,
                "address_shop":address_shop,
                "id_number":id, 
                "token": localStorage.token
            })
            .then(res => {
                if( res.data.successes == false ) return Vue.notify({ group: 'success',title: 'Confirm', text: res.data.reason, type: 'warn'});
                else return Vue.notify({ group: 'success',title: 'Confirm', text: 'Profile is updated', type: 'success'});
            })
            .catch(err => Vue.notify({ group: 'success',title: 'Confirm', text: err.message, type: 'warn'}))
        },
        
        showFormCreateWallet(){ this.$modal.show("Modal_Create_Wallet"); },
        
        createWallet(){
            axios.post(`${this.$store.state.apiLink}/users/create_wallet`, { "token": localStorage.token })
            .then(res => {
                if(res.data.successes){
                    this.$modal.hide("Modal_Create_Wallet");
                    Vue.notify({ group: 'success',title: 'Confirm',text: 'Create wallet is success',type: 'success'});
                    this.loadUsers();
                } else {
                    Vue.notify({ group: 'success', title: 'Confirm', text: 'Create wallet is not success !', type: 'error'});
                    this.$modal.hide("Modal_Create_Wallet");
                }
            })
            .catch(err => console.log(err))
        },
        
        loadUsers() {
            axios.post(`${this.$store.state.apiLink}/users/user-info`,{"token":localStorage.token || null})
            .then(res => this.user = res.data.data)
            .catch(err => console.log(err))
        },
    }
}
</script>

<style>
    /* .col-md-6 img { max-width: 17% !important; } */
    .pr-code img { margin: 0 auto; width: 20%;}
</style>