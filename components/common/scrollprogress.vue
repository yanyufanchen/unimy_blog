<template>
	<div class="scroll">
		<div ref="themeColor" class="progress-bar" :style="{background:themeColor}"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import ScrollProgress from 'scrollprogress';

export default {
	data() {
		return {};
	},
	props: {
		themeColor: String,
	},
	computed: {},
	components: {},
	async mounted() {
		// 设置进度条颜色
		const progressElement = document.querySelector('.progress-bar');
		const progressObserver = new ScrollProgress((x, y) => {
			// console.log(x, y);
		  progressElement.style.width = y * 100 + '%';
		});
		// this.$refs.themeColor.style.setProperty("--themeColor",this.themeColor?this.themeColor:'#38B43C');
	},
	onLoad() {
		
	},
	methods: {
		
	}
};
</script>

<style lang="less" >
.progress-bar {
	--themeColor: '';
	// width: 100%;
  // background-color: var(--themeColor);
  height: 5px;
  z-index: 99999;
  position: fixed;
  // top: 0;
  bottom: 0;
}
</style>
