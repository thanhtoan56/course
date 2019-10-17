<template>
    <div class="slide" :style="checkResponsive ? {'padding-top': 15 +'px'}:{}">
		<template v-if="checkResponsive">
			<div class="slide-header col-md-9  col-sm-9 col-xs-9">
				<carousel :per-page="1" :mouse-drag="true" :autoplay="true" :interval=5000 :loop="true">
					<slide v-for="(banner, index) in bannersCarousel" :key="index" >
							<a  :href="banner.link" target="_blank"><img style="width: 100%" :src="$store.state.apiApp + 'banners/' + banner.image_banner " :alt="banner.name_banner"></a>
					</slide>
				</carousel>
			</div>
			<div class="slide-banner col-md-3  col-sm-3 col-xs-3">
				<div class="banner-sale">
					<template v-for="(banner, index) in banners" >
						<img v-bind:src="$store.state.apiApp + 'banners/' + banner.image_banner " alt="" :key="index">
					</template>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="slide-header" :style="checkTablet ? {'padding-left': 15+'px', 'padding-right': 15+'px'}:{}">
				<carousel :per-page="1" :mouse-drag="true" :autoplay="true" :interval=5000 :loop="true">
					<slide v-for="(banner, index) in bannersCarousel" :key="index" >
							<a  :href="banner.link" target="_blank"><img style="width: 100%" :src="$store.state.apiApp + 'banners/' + banner.image_banner " :alt="banner.name_banner"></a>
					</slide>
				</carousel>
			</div>
			<div class="slide-banner" :style="checkTablet ? {'padding-left': 15+'px', 'padding-right': 15+'px'}:{}">
				<template v-for="(banner, index) in banners" >
					<img v-bind:src="$store.state.apiApp + 'banners/' + banner.image_banner " alt="" :key="index">
				</template>
			</div>
		</template>
    </div>
</template>
<script>
	import Vue from 'vue';
	import axios from 'axios'
	import VueCarousel from 'vue-carousel';
	
	Vue.use(VueCarousel);
	
	export default {
		data(){
			return{
				banners : [],
				bannersCarousel : []
			}
		},
		created(){
			this.fetchDataSlider()
		},
		computed: {
			checkResponsive(){
				var md = new MobileDetect(window.navigator.userAgent)
				if (md.mobile() == null || md.mobile() == '' || md.mobile() == undefined) return true
				else return false
			},
		},
		methods:{
			fetchDataSlider(){
		      axios.get(`${this.$store.state.apiLink}/banners/list-banners`)
		      .then(res => { 
				  if (res.data.successes) {
					this.bannersCarousel = res.data.data.filter(x => {return x.type == 1})
					this.banners = res.data.data.filter(x => {return x.type == 2})
				  }
				})
		      .catch(err => console.log(err));
			}
		}
	}
</script>