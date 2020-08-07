<template>
	<div class="footer">
		<div class="beian" :style="{ color: Desktheme.ThemeColor }">©{{ new Date().getFullYear() - 1 }}-{{ new Date().getFullYear() }} my-blog / 个人网站 / 鄂ICP备19023853号</div>
		<div class="author">Design by WangPeng</div>
		<div class="count">网站总访问量: {{count?count[0].totalCount:0}}</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['Desktheme','count'])
	},
	components: {},
	onLoad() {},
	methods: {
		
	}
};
</script>

<style lang="less" scoped>
	
	.footer {
		width: 100%;
		height: 6rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #4B5456;
		.beian {
			text-align: center;
		}
		.author {
			line-height: 2rem;
			color: #A5A4A4;
		}
		.count {
			line-height: 20px;
			color: #ffffff;
		}
	}
</style>
