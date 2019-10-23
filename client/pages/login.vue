<template>
    <div class="app-container app-theme-white body-tabs-shadow">
        <notifications group="login" />
        <div class="app-container">
            <div class="h-100 bg-plum-plate bg-animation" style="height: 100vh !important;">
                <div class="d-flex h-100 justify-content-center align-items-center">
                    <div class="mx-auto app-login-box col-md-8">
                        <div class="app-logo-inverse mx-auto mb-3"></div>
                        <div class="w-100 mx-auto">
                            <div class="modal-content" style="margin: 0 auto; width: 290px">
                                <div class="modal-body">
                                    <div class="h5 modal-title text-center">
                                        <h4 class="mt-2" style="margin-bottom: 1.5rem"> LOGIN FORM</h4>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-12">
                                            <div class="position-relative form-group">
                                                <input class="form-control" placeholder="Mssv ..." v-on:keyup.enter="userLogin" required v-model="username">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="position-relative form-group">
                                                <input class="form-control" type="password" placeholder="Password ..." v-on:keyup.enter="userLogin" required v-model="password">
                                            </div>
                                        </div>
                                        <!-- <div class="col-md-12">
                                            <h6 class="mb-0"><a href="javascript:void(0);" class="text-primary">Quên mật khẩu ?</a></h6>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="modal-footer clearfix">
                                        <button 
                                            class="btn btn-primary btn-lg" 
                                            style="font-size: 15px; width: 100%;" 
                                            @click="userLogin" :disabled="!checkInput"
                                        >
                                            Login
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div class="text-center text-white opacity-8 mt-3">Copyright © NguyenThanhToan 2019</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
	import axios from "axios"
	import Notifications from 'vue-notification'
	import Toaster from 'v-toaster'
	import 'v-toaster/dist/v-toaster.css'
	
	Vue.use(Toaster, {timeout: 10000})
	Vue.use(Notifications)
	var md5 = require('md5');
    
    export default {
        layout:"login",
        data(){
        	return{
        		username:"",
        		password:"",
				userinfo: [],
				
				token: ""
        	}
        },
        created(){
			this.checkPermision
        },
        computed:{
			checkInput(){ return this.username && this.password },
			
			checkPermision(){
				if (this.$store.state.userInfo && this.$store.state.userInfo !== "") {
					if (this.$store.state.userInfo.data && this.$store.state.userInfo.data !== "") {
                        
                        const info = this.$store.state.userInfo.data;
                        
						if(info.decentralise === "a") return this.$router.push({ path: '/admin' })
						else if(info.decentralise === "t") return this.$router.push({ path: '/teacher' })
						else if(info.decentralise === "s") return this.$router.push({ path: '/student' })
						
					} else return this.$notify({group: 'login', title: 'Notice', text:'Login no successes', type: 'error'})
				} else return this.$notify({group: 'login', title: 'Notice', text:'Login no successes', type: 'error'})
			}
        },
        methods:{
        	userLogin(){
        		if (this.username && this.password) {
	        		axios.post(`${this.$store.state.apiLink}/user/login`,{ "userName": this.username, "passWord":md5(this.password) })
					.then(async data => {
	        			if (!data.data.successes) { return this.$notify({group: 'login',title: 'Notice',text: data.data.data ||'Login no successes',type: 'warn'}) }
                        
                        
                        this.token = data.data.data
                        localStorage.setItem("token", this.token)
                        
						axios.post(`${this.$store.state.apiLink}/user/user-info`,{ "token":this.token })
						.then( user => {
                            if(user.data.data.decentralise === "a"){ this.$router.push({ path: '/admin' }) } 
                            
                            else if(user.data.data.decentralise === "t"){ this.$router.push({ path: '/teacher' }) } 

                            else { this.$router.push({ path: '/student' }) }
						})
						.catch(errr=> console.log(errr) )
					})
					.catch( err => { this.$toaster.error(err || "Login no successes") })
        		} else this.$toaster.error("Enter infomation Login")
        		this.username = ""
				this.password = ""
        	}
        },
    }
</script>