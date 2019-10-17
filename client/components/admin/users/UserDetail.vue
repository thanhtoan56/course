<template>
  <div class="row">
    <notifications group="success" />
    <div class="table-info-shop">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom"> <h6 class="m-0" style="font-weight: 600">Users Detail</h6></div>
        <div class="card-body p-0 pb-3 text-center">
          <table class="table table-bordered mb-0">
            <thead class="bg-light">
              <tr></tr>
            </thead>
            <tbody>
              <tr>
                <td style="width: 25% !important;" id="user-modal">Full Name</td>
                <td>{{user.fullname}}</td>
              </tr>
              <tr>
                <td id="user-modal">UserName</td>
                <td>{{user.username}}</td>
              </tr>
              <tr>
                <td id="user-modal">Phone Number</td>
                <td>{{user.phone_number}}</td>
              </tr>
              <tr>
                <td id="user-modal">Email</td>
                <td>{{user.email}}</td>
              </tr>
              <tr>
                <td id="user-modal">Name Shop</td>
                <td>{{user.name_shop}}</td>
              </tr>
              <tr>
                <td id="user-modal">Link</td>
                <td>{{user.link}}</td>
              </tr>
              <tr>
                <td id="user-modal">Address Shop</td>
                <td>{{user.address_shop}}</td>
              </tr>
              <tr>
                <td id="user-modal">Balance</td>
                <td>{{numberWithCommas(user.balance) + " BLOOD"}} </td>
              </tr>
              <tr>
                <td id="user-modal">My Blood Wallet</td>
                <td>{{user.wallet_address}}</td>
              </tr>
              <tr>
                <td id="user-modal">Description</td>
                <td><div v-html="user.description"></div></td>
              </tr>
            </tbody>
          </table>
          <div class="btn-click-update">
            <button class="btn btn-primary"  @click="showFormUpdateUser(user)">Update User</button>
            <button class="btn btn-success"  @click="showFormSendBlood(user)">Send Blood</button>
            <button v-if="!check" class="btn btn-info" @click="showFormCreateWallet()">Create Wallet</button>
          </div>
        </div>
        <modal name="FormSendBlood" height="auto" :scrollable="true">
          <div class="card card-small mb-4 form-update-user">
            <div class="card-header border-bottom"><h6 class="m-0"> Send Blood</h6></div>
            <ul class="list-group list-group-flush" v-if="userUpdate">
              <li class="list-group-item p-3">
                <div class="row">
                  <div class="col">
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="feFirstName">Address Sender</label>
                        <input type="text"  class="form-control" disabled = "true" v-model="userUpdate.wallet_address" placeholder ref="addressSender" >
                      </div>
                      <div class="form-group col-md-12">
                        <label for="feLastName">Address Receiver</label>
                        <input type="text" class="form-control"  ref="addressReceiver" >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="feInputAddress">Blood</label>
                        <input type="text" class="form-control"  placeholder="Blood" ref="amount" >
                        <label for="feFirstName"></label>
                      </div>
                    </div>
                    <div class="button-update-user">
                      <button class="btn btn-accent btn-danger" @click="hidenFormSendBlood()">Cancel</button>
                      <button class="btn btn-accent btn-success"  @click="sendBlood()">Send </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </modal>
        <modal name="FormUpdateUser"  style="left: 170px !important" width= "1260px"  height="auto" :scrollable="true">
          <div class="card card-small mb-4 form-update-user">
            <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Account Details</h6></div>
            <ul class="list-group list-group-flush" v-if="userUpdate">
              <li class="list-group-item p-3">
                <div class="row">
                  <div class="col">
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label id="user-modal">Full Name</label>
                        <input type="text" class="form-control" :value="userUpdate.fullname"  ref="fullname">
                      </div>
                      <div class="form-group col-md-4">
                        <label id="user-modal" >Phone number</label>
                        <input type="text" class="form-control" :value="userUpdate.phone_number" ref="phone_number" >
                      </div>
                      <div class="form-group col-md-4">
                        <label id="user-modal">Address</label>
                        <input type="text" class="form-control" :value="userUpdate.address_shop"  ref="address_shop" >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label id="user-modal">Username</label>
                        <input type="text" :disabled="isDisable" class="form-control" v-model="user.username"  ref="username">
                      </div>
                      <div class="form-group col-md-4">
                        <label id="user-modal">Email</label>
                        <input type="text" :disabled="isDisable" class="form-control" v-model="user.email"  ref="email">
                      </div>
                      <div class="form-group col-md-4">
                        <label id="user-modal">Name Shop</label>
                        <input type="text" class="form-control"  :value="userUpdate.name_shop"  ref="name_shop" >
                        <label for="feFirstName"></label>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label id="user-modal">Balance</label>
                        <input type="text" :disabled="isDisable" class=" form-control"  v-model="user.balance"  ref="balance" >
                      </div>
                      <div class="form-group col-md-4">
                        <label id="user-modal">Wallet</label>
                        <input type="text" :disabled="isDisable" class="form-control"  v-model="user.wallet_address"  ref="balance" >
                      </div>
                      <template v-if="check">
                        <div class="form-group col-md-4 wallet_shop">
                          <qr-code class="pr-code" style="max-width: 17% ! important;" :text= "user.wallet_address"  error-level="L"></qr-code>
                        </div>
                      </template>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label id="user-modal">Description</label>
                        <editor :html="editorHtmlDescription" mode="wysiwyg" :value="userUpdate.description" ref="tuiEditorDescription" />
                      </div>
                    </div>
                    <div class="button-update-user">
                      <button class="btn btn-accent btn-danger" @click="hidenFormUpdateUser()">Cancel</button>
                      <button class="btn btn-accent btn-primary"  @click="UpdateUser(userUpdate.id_number)">Update User</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </modal>

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
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import Editor from '@toast-ui/vue-editor/src/editor.vue'

import Notifications from 'vue-notification';
Vue.use(Notifications);

import VueQRCodeComponent from 'vue-qrcode-component'
Vue.component('qr-code', VueQRCodeComponent)

import Vuex from 'vuex';
Vue.use(Vuex);

import VModal from 'vue-js-modal';
Vue.use(VModal);

import VueNumeric from 'vue-numeric';
Vue.use(VueNumeric);

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import VueLoading from 'vuejs-loading-plugin';
Vue.use(VueLoading);

export default {
  components: {
      'editor': Editor,
      'vuenumeric':VueNumeric
  },
  data () {
    return {
      editorHtmlDescription:"",
      editorTextDescription:"",
      users: [],
      user:"",
      userUpdate:"",
      isDisable: false,
    }
  },
  created() {

    this.$nuxt.$on('status', res => { if(res) this.users.push(res.data.data) });

    this.$nuxt.$on('update', res => { this.loadUsers(); });
  },
  
  mounted() { this.userInfo; },

  computed:{
    userInfo(){
        if (this.$store.state.userInfo && this.$store.state.userInfo !== "") {
            if (this.$store.state.userInfo.data && this.$store.state.userInfo.data !== "") { return this.user = this.$store.state.userInfo.data; }
        } else { return "" }
    },
    check(){
        if(this.user.wallet_address && this.user.wallet_address != "") return true
        else return false
    },
  },
  methods: {
    
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
                  this.hidenFormSendBlood();
              } 
              this.$loading(false)
          }).catch(err => console.log(err))
      } else { Vue.notify({ group: 'success',title: 'Confirm',text: 'Please wait 30 seconds later' , type: 'warn'}); return this.$loading(false) }
    },

    loadUsers(){
      axios.post(`${this.$store.state.apiLink}/users/user-info`,{"token":localStorage.token || null})
      .then(res => this.user = res.data.data)
      .catch(err => console.log(err))
    },

    showFormUpdateUser(user) {
      this.userUpdate = user
      this.isDisable = true
      this.$modal.show('FormUpdateUser')
    },

    showFormSendBlood(user) {
      this.userUpdate = user
      this.isDisable = true
      this.$modal.show('FormSendBlood')
    },
    
    showFormCreateWallet(){ this.$modal.show('Modal_Create_Wallet') },

    hidenFormUpdateUser() { this.$modal.hide('FormUpdateUser') },
    
    hidenFormSendBlood() { this.$modal.hide('FormSendBlood') },

    UpdateUser(id){
      var fullname = this.$refs.fullname.value
      var phone_number = this.$refs.phone_number.value
      var address_shop = this.$refs.address_shop.value
      var name_shop = this.$refs.name_shop.value
      
      var description = this.$refs.tuiEditorDescription.invoke('getHtml')

      if(fullname == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Full name is empty', type: 'warn'});
      else if(phone_number == 0 || phone_number == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Phone nunber is empty', type: 'warn'});
      else if(address_shop == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Address is empty', type: 'warn'});
      else if(name_shop == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Name shop is empty', type: 'warn'});
      else if(description == "") return Vue.notify({ group: 'success',title: 'Confirm', text: 'Description is empty', type: 'warn'});
      
      axios.post(`${this.$store.state.apiLink}/users/update`,{
        "fullname":fullname,
        "phone_number": phone_number,
        "address_shop":address_shop,
        "name_shop":name_shop, 
        "description": description,
        "id_number":id, 
        "token": localStorage.token
      })
      .then(res => {
        if(res.data.successes){
          this.$nuxt.$emit('update', res)
          this.hidenFormUpdateUser()
          setTimeout(() => { Vue.notify({ group: 'success',title: 'Confirm',text: 'User Is Updated',type: 'success'}); }, 1000)
        } else { Vue.notify({group: 'success',title: 'Confirm', text: res.data.reason || 'Input again',type: 'warn'}); }
      })
      .catch(err => console.log(err))
    },

    createWallet() {
      axios.post(`${this.$store.state.apiLink}/users/create_wallet`,{ "token": localStorage.token })
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
    
    numberWithCommas(x) {
      var value = "" + x;
      var parts = value.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },

  },
  
};
</script>
<style>
  .form-update-user {
    margin: 0 ! important;
 
  }
  .button-update, .button-delete  {
    text-align: center;
  }

  .form-delete-user{
    margin: 0 ! important;
    width: 100%;
  }
  .wallet_shop .pr-code img {
    max-width: 30%;
    padding: 10px;
    transform: translate(10%, -34%);
  }
  #user-modal{
    color: #222222; 
    font-weight: 500;
  }
</style>
