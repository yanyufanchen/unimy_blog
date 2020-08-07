<template>
	<div class="scroll">
		<div ref="themeColor" class="progress-bar" :style="{ width: scrollWidth+'%' }"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import ScrollProgress from 'scrollprogress';

export default {
	data() {
		return {
			scrollWidth: 0
		};
	},
	props: {
		themeColor:String
	},
	watch: {},
	components: {},
	mounted() {
		this.$refs.themeColor.style.setProperty('--themeColor', this.themeColor ? this.themeColor : '#38B43C');
		 
		// window.onscroll=function(){
		  
		// }
		// this.$(document).scroll(() => {
		// 	//获取网页被卷去的高度
						
						
		// 	//页面加载时，获取滚动条初始高度
		// 	// let distance = this.$(document).scrollTop(); //获取滚动条初始高度的值 ：0
		// 	// let domheight=this.$(document).height()
		// 	// this.scrollWidth = Math.floor((distance / domheight) * 100);
		// 	// console.log(distance, this.$(document).height(), this.scrollWidth); //打印滚动条不同高度的位置的值
			
		// 	// 窗口可视范围的高度
		// 	    // let height=this.getClientHeight()
		// 	        // 窗口滚动条高度
		// 	      let  theight=this.getScrollTop()
		// 	        // 窗口可视范围的高度
		// 	      // let  rheight=this.getScrollHeight()
		// 	        // 滚动条距离底部的高度
		// 	      // let  bheight=rheight-theight-height
				  
		// 		  let distance = this.$(document).scrollTop() //获取滚动条初始高度的值 ：0
		// 		  // let distance2 = this.$(document).scrollBottom() //获取滚动条初始高度的值 ：0
				  
		// 		  // this.scrollWidth = Math.floor((distance / bheight) * 100)
		// 		console.log(distance,theight,this.scrollWidth)
		// 	// 设置进度条颜色
		// 	this.$refs.themeColor.style.setProperty('--themeColor', this.themeColor ? this.themeColor : '#38B43C');
		// });
	},
	onLoad() {},
	methods: {
		//获取窗口可视范围的高度
		getClientHeight(){  
		    var clientHeight=0;  
		    if(document.body.clientHeight&&document.documentElement.clientHeight){  
		        var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
		    }else{  
		        var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
		    }  
		    return clientHeight;  
		},
		getScrollTop(){  
		    var scrollTop=0;  
		    if(document.documentElement&&document.documentElement.scrollTop){  
		        scrollTop=document.documentElement.scrollTop;  
		    }else if(document.body){  
		        scrollTop=document.body.scrollTop;  
		    }  
		    return scrollTop;  
		},
		getScrollHeight(){  
		    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);  
		}
	}
};
</script>

<style lang="less">
.progress-bar {
	--themeColor: '';
	// width: 100%;
	background-color: var(--themeColor);
	height: 5px;
	z-index: 99999;
	position: fixed;
	// top: 0;
	bottom: 0;
}
</style>
