<template>
	<div id="detail-content">
		<div class="has-detail-content" v-if="detailContent != ''">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
								<li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								
								<li style="width: 50%"><a href="javascript:void(0)"><span>Contents</span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div :class=" {'col-md-12': checkResponsive}" :style="checkResponsive ? {'margin-top': checkTablet ? '42px' : '0', 'padding-top': checkTablet ? '15px' : '0'}:{'margin-top': 42 +'px', 'width': 100 +'%'}" >
						<div class="title" :style="checkResponsive ? {}:{'font-size': 13 +'px'}">
							<div class="content-header">
								<li @click="activeQuestion('tro-giup')" :class="{'no-active': !isQuestion, 'active-title': isQuestion}">Câu hỏi thường gặp</li>
								<li @click="activeRule('dieu-khoan-su-dung')" :class="{'no-active': !isRule, 'active-title': isRule}">Điều khoản và điều kiện</li>
								<li @click="activePolicy('chinh-sach-bao-mat-thong-tin-ca-nhan')" :class="{'no-active': !isPolicy, 'active-title': isPolicy}">Chính sách bảo mật thông tin cá nhân</li>
							</div>
						</div>
						<div  class="content content-body" :style="checkResponsive ? {padding:  '20px 5px 20px 20px' } : {padding:  '10px','text-align': 'left'}"> 
							<div id="content-data" v-if="isQuestion" style="padding-right: 15px;">
								<div v-for="(item, index) in dataFooter" :key="index" style="border-bottom: 1px solid #cccccc; */">
									<div class="itemQuestion" @click="showContentQuestion()">{{item.name_content}} 
										<span><i class="fas fa-sort-down"></i></span>
									</div>
									<div v-html="item.detail_content" v-if="isShowContent" style="padding:0 20px;"></div>
								</div>
							</div>
							<div id="content-data" v-html="detailContent.detail_content" v-else> </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="nohas-detail-content" v-else>
			<ErrorComponent/>
		</div>
	</div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
import ErrorComponent from "~/components/client/error"

export default {
	components:{ ErrorComponent },
	head(){
		return {
			title:this.$route.params.id + " | Blood Shopping Mall",
			meta:
			[
				{name:'description',content:'This is Register BLood Exchange'},
				{name:'keywords',content:'BLood Exchange, Blood Wallet'}
			]
		}
	},
	data(){
		return {
			detailContent: [],
			dataFooter: [],
			
			isQuestion: false,
			isRule: false,
			isPolicy: false,

			isShowContent: false
		}
	},
	created(){
		this.fetchDataProductByCate();
		this.fetchDataFooter();
		this.checkRoute()
	},
	computed: {
		
	},
	methods:{
		checkRoute(){
			if(this.$route.params.id == "chinh-sach-bao-mat-thong-tin-ca-nhan")  this.isPolicy = true
			else if(this.$route.params.id == "dieu-khoan-su-dung") this.isRule = true
			else this.isQuestion = true
		},
		showContentQuestion(){
			this.isShowContent = !this.isShowContent
		},
		activeQuestion(link){
			this.isQuestion = !this.isQuestion
			this.isRule = false
			this.isPolicy = false
			this.$router.replace({path: `/contents/${link}`})
			this.fetchDataProductByCate()
		},
		activeRule(link){
			this.isRule = !this.isRule
			this.isQuestion = false
			this.isPolicy = false
			this.$router.replace({path: `/contents/${link}`})
			this.fetchDataProductByCate()
		},
		activePolicy(link){
			this.isPolicy = !this.isPolicy
			this.isQuestion = false
			this.isRule = false
			this.$router.replace({path: `/contents/${link}`})
			this.fetchDataProductByCate()
		},
		fetchDataFooter(){
			axios.get(`${this.$store.state.apiLink}/contents/list-contents`)
			.then(data => { if (data.data.successes === true) { this.dataFooter = data.data.data } })
			.catch(err => { console.log(err) })
		},

		fetchDataProductByCate(){
			axios.get(`${this.$store.state.apiLink}/contents/${this.$route.params.id}`)
			.then(data => { if (data.data.successes) { this.detailContent = data.data.data } })
			.catch(err => { console.log(err) })
		},
		
		formatNumber(number) {
			number = parseInt(number);
		  	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},
}
</script>