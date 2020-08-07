<template>
	<!-- 标题 -->
	<div class="line">
		<div class="line_left" :style="{ backgroundColor: Desktheme.ThemeColor }"></div>
		<div class="title">
			<span >{{title}}</span>
			<slot></slot>
		</div>
		<div class="line_right" :style="{ backgroundColor: Desktheme.ThemeColor }"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex';


export default {
	data() {
		return {};
	},
	props:{
		title: String
	},
	computed: {
		...mapState(['Desktheme'])
	},
	components: {},
	onLoad() {
		
	},
	methods: {
		
	}
};
</script>

<style lang="less" scoped>
.line {
		width: 100%;
		margin: 2rem 0 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.line_left {
			flex: 1;
			height: 1px;
		}
		.title {
			width: 250px;
			font-size: 1.5rem;
			text-align: center;
			color: #585858;
			font-weight: 550;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.line_right {
			flex: 1;
			height: 1px;
		}
	}
</style>
