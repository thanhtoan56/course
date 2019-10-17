<template>  
  <div class="main-content-container container-fluid px-4" style="padding: 0 0 20px!important">
    <span class="text-uppercase page-subtitle" style="letter-spacing: .125rem;color: #818ea3;font-size: .625rem;">List user, add users, update users, delete user</span>
    <h3 class="page-title">Users Page</h3>
    <notifications group="auth" />
    <button class="btn btn-accent btn-primary" @click="showFormAddUser()">Add User</button>
    <modal name="FormAddUser" height="auto" :scrollable="true">
        <div class="card card-small mb-4 form-add-user" style="margin-bottom: 0!important">
          <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Account Details</h6></div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
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
                    <div class="form-group col-md-6" style="margin-bottom: 0">
                      <label for="feInputAddress">Address</label>
                      <input type="text" class="form-control" v-model="user.address_shop" placeholder="1234 Main St">
                      <label for="feFirstName"></label>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="feEmailAddress">Email</label>
                      <input type="email" class="form-control" v-model="user.email" placeholder="@example.com" >
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6" style="margin-bottom: 0">
                      <label for="feEmailAddress">Username</label>
                      <input type="username" class="form-control" v-model="user.username" placeholder="User Name" >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="fePassword">Password</label>
                      <input type="password" class="form-control" v-model="user.password" placeholder="Password">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="fePassword">Password Again</label>
                      <input type="password" class="form-control" v-model="user.passwordagain" placeholder="Password">
                    </div>
                  </div>
                  <div class="button-add-user">
                    <button class="btn btn-accent btn-danger" @click="hideFormAddUser()">Cancel</button>
                    <button class="btn btn-accent btn-primary" :disabled="!checkingButton" @click="addUser()">Add User</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
    </modal>
  </div>
</template>

<script>

import Vue from "vue";
import axios from "axios";
import Notifications from 'vue-notification';
import VModal from 'vue-js-modal';

Vue.use(VModal,Notifications);
var md5 = require('md5');

export default {
  data() {
    return {
      user: {
        fullname: "",
        phone_number: "",
        email: "",
        username: "",
        address_shop: "",
        password: "",
        passwordagain: "",
        errors: []
      },
      error: ''
    };
  },
  created(){
  },
  computed:{
    checkingButton(){ return this.user.fullname !== "" && this.user.phone_number !== "" && this.user.email !== "" && this.user.username !== "" && this.user.address_shop !== "" && this.user.password !== "" },
  },
  methods: {
    
    wrongNumber(phone) { if (phone) { return Number.isInteger(Number(phone)) === phone.toString().length < 1 === phone.toString().length > 10 } },
    
    emptyForm(){
      this.user.fullname= ''
      this.user.phone_number= ''
      this.user.email= ''
      this.user.username= ''
      this.user.address_shop= ''
      this.user.password= ''
      this.user.passwordagain = ''
    },
    
    addUser() {
      
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      this.errors = [];
      
      if((this.user.fullname !== "" && this.user.phone_number !== "" && this.user.email !== "" && this.user.username !== "" && this.user.address_shop !== "" && this.user.password !== "") === false){
        this.errors.push('empty');
        this.$notify({group: 'auth',title: 'Notice',text: 'Condition no valid',type: 'warn'});
      }
      if (!Number.isInteger(Number(this.user.phone_number))) {
        this.errors.push('wrongNumber');
        this.$notify({group: 'auth',type: 'warn', title: 'Warring',text: "Phone number Errors2."})
      }       
      if (this.user.phone_number.toString().length < 8 && this.user.phone_number.toString().length > 11) {
        this.errors.push('wrongNumber');
        this.$notify({group: 'auth',type: 'warn', title: 'Warring',text: "Phone number Errors1."})
      }       
      if (!strongRegex.test(this.user.password)) {
        this.errors.push('password');
        this.$notify({group: 'auth',type: 'warn', title: 'Warring',text: "Password must be more than 8 characters."})
      }
      if(this.user.password !== this.user.passwordagain){
        this.$notify({group: 'auth',title: 'Notice',text: "Password no duplicate",type: 'warn'})
      }

      if(this.errors.length == 0){
        axios.post(`${this.$store.state.apiLink}/users/add`, {
            fullname: this.user.fullname,
            phone_number: this.user.phone_number,
            email: this.user.email,
            username: this.user.username,
            address_shop: this.user.address_shop,
            password: md5(this.user.password)
          })
          .then(res => {
              if(res.data.successes){
                this.$nuxt.$emit('status', res)
                this.emptyForm()
                this.$notify({group: 'auth',title: 'Notice',text: 'Add user Success',type: 'success'});
                this.hideFormAddUser();
              } else {
                this.error = res.data.reason;
                this.$notify({group: 'auth',title: 'Notice',text: this.error || "Error",type: 'warn'})
              }
          })
          .catch(err => err);
      }
    },
    
    showFormAddUser() { this.$modal.show('FormAddUser'); },
    
    hideFormAddUser () { this.$modal.hide('FormAddUser'); },
  },
};
</script>

