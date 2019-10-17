<template>
  <div class="row">
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom"><h6 class="m-0">Active Users</h6></div>
        <div class="card-body p-0 pb-3 text-center">
          <table class="table mb-0">
            <thead class="bg-light">
              <tr>
                <th scope="col" class="border-0">ID</th>
                <th scope="col" class="border-0">User name</th>
                <th scope="col" class="border-0">Full Name</th>
                <th scope="col" class="border-0">Phone Number</th>
                <th scope="col" class="border-0">Email</th>
                <th scope="col" class="border-0">Name Shop</th>
                <th scope="col" class="border-0">Address</th>
                <th scope="col" class="border-0">Edit</th>
              </tr>
            </thead>
            <tbody v-for="(user, index) in users" :key="index">
              <tr>
                <td>{{user.id_number}}</td>
                <td>{{user.username}}</td>
                <td>{{user.fullname}}</td>
                <td>{{user.phone_number}}</td>
                <td>{{user.email}}</td>
                <td>{{user.name_shop}}</td>
                <td>{{user.address_shop}}</td>
                <td>
                  <span><nuxt-link to="#" @click.native="showFormUpdateUser(user)">Update</nuxt-link></span>
                  <span><nuxt-link to="#" @click.native="showFormDeleteUser(user)">Delete</nuxt-link></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <modal name="FormUpdateUser" height="auto" :scrollable="true">
          <div class="card card-small mb-4 form-update-user">
            <div class="card-header border-bottom"><h6 class="m-0"><i class="fas fa-info-circle" aria-hidden="true"></i> Account Details</h6></div>
            <ul class="list-group list-group-flush" v-if="userUpdate">
              <li class="list-group-item p-3">
                <div class="row">
                  <div class="col">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feFirstName">Full Name</label>
                        <input type="text"  class="form-control" v-model="userUpdate.fullname" placeholder ref="fullname" >
                      </div>
                      <div class="form-group col-md-6">
                        <label for="feLastName">Phone number</label>
                        <input type="text" class="form-control" v-model="userUpdate.phone_number" ref="phone_number" >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feInputAddress">Address</label>
                        <input type="text" class="form-control" v-model="userUpdate.address_shop" placeholder="1234 Main St" ref="address_shop" >
                        <label for="feFirstName"></label>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="fePassword">Name Shop</label>
                        <input type="text" class="form-control"  v-model="userUpdate.name_shop" placeholder="Name Shop" ref="name_shop" >
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
        <div>
          <modal class="delete" name="FormDeleteUser" height="auto" :scrollable="true">
            <div class="card card-small mb-4 form-delete-user">
              <div class="card-header border-bottom"><h6 class="m-0">Xác nhận</h6></div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item p-3">
                  <div class="row">
                    <div class="col">
                      <div class="form-row">
                        <label>Bạn có muốn xóa: <i>{{this.user.fullname}}</i> ?</label>
                      </div>
                      <div class="button-delete-user">
                        <button class="btn btn-accent btn-danger" @click="hidenFormDeleteUser()">Cancel</button>
                        <button class="btn btn-accent btn-primary" @click="deleteUser(user.id_number)">Delete</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from 'vuex';
import axios from 'axios';
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';

Vue.use(Vuex);
Vue.use(VModal);
Vue.use(Notifications);

export default {
  data () {
    return {
      users: [],
      user: [],
      userUpdate: []
    }
  },
  created() {
    this.$nuxt.$on('status', res => { if(res) this.users.push(res.data.data) });

    this.$nuxt.$on('update', res => { this.loadUsers(); });

    this.$nuxt.$on('delete', res => { this.loadUsers(); });
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    
    loadUsers() {
      axios.post(`${this.$store.state.apiLink}/users/list-user`,{"token":localStorage.token || null})
      .then(res => this.users = res.data.data)
      .catch(err => console.log(err))
    },
    
    showFormUpdateUser(user) {
      this.userUpdate = user
      this.$modal.show('FormUpdateUser')
    },

    hidenFormUpdateUser() { this.$modal.hide('FormUpdateUser') },

    UpdateUser(id){
      var fullname = this.$refs.fullname.value
      var phone_number = this.$refs.phone_number.value
      var address_shop = this.$refs.address_shop.value
      var name_shop = this.$refs.name_shop.value

      axios.post(`${this.$store.state.apiLink}/users/update`,{
        "fullname":fullname,
        "phone_number": phone_number,
        "address_shop":address_shop,
        "name_shop":name_shop, 
        "id_number":id, 
        "token": localStorage.token
      })
      .then(res => {
        if(res.data.successes){
          this.$nuxt.$emit('update', res)
          Vue.notify({ group: 'auth',title: 'Confirm',text: 'User is updated',type: 'auth'});           
          this.hidenFormUpdateUser();
        } else { Vue.notify({group: 'auth',title: 'Confirm', text: res.data.reason || 'Input again',type: 'error'});}
      })
      .catch(err => console.log(err))
    },

    //---------- Delete User ----------
    showFormDeleteUser(user){
      this.user = user
      this.$modal.show('FormDeleteUser');
    },

    hidenFormDeleteUser() { this.$modal.hide('FormDeleteUser'); },

    deleteUser(id) {
      axios.post(`${this.$store.state.apiLink}/users/delete`, { "token": localStorage.token, "id_number": id, })
      .then(res => {
        if (res.data.successes){
          this.$nuxt.$emit('delete', res)
          Vue.notify({ group: 'auth', title: 'Confirm', text: 'User is deleted', type: 'auth'});
        } else Vue.notify({ group: 'auth', title: 'Confirm', text: res.data.reason, type: 'error'});
      })
      .catch(err => console.log(err));
      this.hidenFormDeleteUser();
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
</style>
