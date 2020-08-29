<template>
  <div class="updown" @click="to_up" v-if="show" :style="{background: Desktheme.ThemeColor}">
	  <i class="el-icon-arrow-up"></i>
  </div>
</template>
<script>
import { mapState } from 'vuex';


export default {
	data() {
		return {
			show: false
		};
	},
	computed: {
		...mapState(['Desktheme'])
	},
	components: {},
	created() {
		this.listenerFunction();		
	},
	onLoad() {
		this.handleScroll()
	},
	methods: {
		listenerFunction(e) {
			document.addEventListener('scroll', this.handleScroll, true);
		},
		handleScroll() {
			// console.log(window.pageYOffset,111)
			if(window.pageYOffset<1000){
				this.show=false
			}else {
				this.show=true
			}
		},
		to_up(){
			this.$('body,html').animate({scrollTop:'0px'},1500)
		}
	}
};
</script>

<style lang="less" scoped>
	.none {
		display: none;
	}
.updown {
	cursor: pointer;
	z-index: 999;
	position: fixed;
	right:10px;
	bottom: 10px;
	width: 40px;
	height: 40px;
	border: 1px solid #999;
	border-radius: 40px;
	// background-color: #fff;
	i {
		width: 40px;
		font-size: 20px;
		color: #fff;
		text-align: center;
		line-height: 40px;
	}
}
</style>
