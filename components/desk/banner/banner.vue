<template>
	<div class="desk_banner bg-cover index-cover about-cover">
		<div class="container">
			<h1 class="title" data-aos="fade-left">大前端开发技术分享</h1>
			<h2 class="subhead" data-aos="fade-right">{{this.$store.state.sTitle}}</h2>
			<div class="btn">
				<div class="reader" data-aos="fade-left" @click="to_reader" @mouseover="addBtnStyle('btn1')" @mouseout="removeBtnStyle('btn1')" :style="banner_btnStyle.btn1" >
					<i class="fa fa-angle-double-down"></i>
					<span style="margin-left:10px;">继续阅读</span>
				</div>
				<div class="github" data-aos="fade-right" @click="to_github" @mouseover="addBtnStyle('btn2')" @mouseout="removeBtnStyle('btn2')" :style="banner_btnStyle.btn2">
					<i class="fa fa-github"></i>
					<span style="margin-left:10px;">GITGUB</span>
				</div>
			</div>
			<LinkIcon  style="margin: 4rem 2rem 1rem 2rem;"></LinkIcon>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import LinkIcon from '../linkIcon/linkIcon.vue'
export default {
	data() {
		return {
			banner_btnStyle:{
				btn1: '',
				btn2: ''
			}
		};
	},
	created() {},
	computed: {
		...mapState(['Desktheme'])
	},
	components: {
		LinkIcon
	},
	onLoad() {},
	methods: {
		to_reader(){
			let h=document.body.offsetHeight
			this.$('body,html').animate({scrollTop:h},1500)
		},
		to_github(){
			
			window.open('https://github.com/yanyufanchen', '_blank')
		},
		// banner按钮样式
		addBtnStyle(i){		
			this.banner_btnStyle[i]='backgroundColor:'+this.$store.state.Desktheme.ThemeColor+';border:1px solid '+this.$store.state.Desktheme.ThemeColor
		},
		removeBtnStyle(i){
			// console.log(i,111)
			this.banner_btnStyle[i]=''
		}
	}
};
</script>

<style lang="less" scoped>
.desk_banner {
	height: 100%;
	position: absolute;
	z-index: 10;
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
			font-size: 1.4rem;
			color: #fff;
			font-weight: 500;
			margin-top: 2rem;
		}
		.btn {
			margin-top: 4rem;
			// width: 40%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.reader,
			.github {
				margin: 0 2rem;
				height: 3rem;
				line-height: 3rem;
				padding: 0 2.5rem;
				font-size: 1rem;
				color: #fff;
				border: 1px solid #fff;
				border-radius: 3rem;
			}
			.reader:hover,
			.github:hover {
				cursor: pointer;
				border: 1px solid ;
				// background-color: #f44336;
				box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2);
			}
		}
	}
}
</style>
