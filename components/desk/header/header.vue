<template>
	<div class="deskBanner" :style="{height:'350px',backgroundImage:'url('+headerBgimg+')'}" >
		<div class="dingwei"><NavTab></NavTab></div>
		<div class="swper" style="margin-top: 60px;">
			<div class="desk_banner bg-cover index-cover about-cover">
				<div class="container">
					<h1 class="title" data-aos="fade-left">大前端开发技术分享</h1>
					<h2 class="subhead" data-aos="fade-right">{{this.$store.state.sTitle}}</h2>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
let scllBgt=null
import { mapState } from 'vuex';
import NavTab from '@/components/desk/navTab/navTab.vue';
export default {
	data() {
		return {
			Bgc: '',
			
		};
	},
	created() {
	},
	computed: {
		...mapState(['Desktheme','headerBgimg'])
	},
	components: {
		NavTab
	},
	onLoad() {},
	onHide(){
		// console.log('离开')
		window.clearInterval(scllBgt)
	},
	methods: {
		
		

	}
};
</script>

<style lang="less" scoped>
.deskBanner {
		width: 100%;
		padding: 0;
		background-size: cover;
		background-position: center center;
	}
	.deskBanner:after {
		-webkit-animation: rainbow 60s infinite;
		animation: rainbow 60s infinite;
	}
	.deskBanner:before,
	.deskBanner:after {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 350px;
		display: block;
		left: 0;
		top: 0;
		content: '';
	}
	.dingwei {
		z-index: 9999;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 60px;
	}
	.header {
		width: 100%;
		height: 60px;
		position: relative;
	}
		
		
		
.desk_banner {
	height: 250px;
	position: absolute;
	z-index: 2;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.container {
		width: 85%;
		// height: 50vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			text-align: center;
			font-size: 3rem;
			color: #fff;
		}
		.subhead {
			text-align: center;
			font-size: 1.0rem;
			color: #fff;
			font-weight: 500;
			margin-top: 1rem;
		}
	}
}
</style>
