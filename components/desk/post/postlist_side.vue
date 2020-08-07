<template>
	<div class="postdetail_side">
		<div class="header"><img src="../../../static/img/blog-post-3.jpg" alt="" /></div>
		<div class="recommend">
			<div class="title" :style="{ borderLeft: '4px solid ' + Desktheme.ThemeColor }">文章分类</div>
			<div class="titleItem">
				<div id="-1" @click="search" >
					<h5>全部文章</h5>
				</div>
				<i>文章数 {{maxpostNum}}</i>
			</div>
			<div class="titleItem" v-for="(item, index) in tablist" :key="index">
				<div :id="index" @click="search" >
					<h5>{{item.name}}</h5>
				</div>
				<i>文章数 {{item.postnum}}</i>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			maxnum: 0
		};
		
	},
	props: {
		tablist: Array,
		maxpostNum: Number
	},
	computed: {
		...mapState(['Desktheme']),
		
	},
	// watch:{
	// 	maxnum(){
			
	// 	}
	// }
	created() {
		
	},
	mounted() {
		
	},
	components: {},
	onLoad() {},
	methods: {
		search(e) {
			this.activeId = Number(e.currentTarget.id)
			let cate_id=this.tablist[e.currentTarget.id]?this.tablist[e.currentTarget.id].cate_id:-1
			this.$emit('changeTab', cate_id);
		},
		
	}
};
</script>

<style lang="less" scoped>
.postdetail_side {
	width: 100%;
	box-sizing: border-box;
	.header {
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 10px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.recommend {
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 5px;
		.title {
			font-size: 17px;
			color: #404040;
			padding-left: 10px;
			font-weight: 550;
		}
		.titleItem {
			margin: 10px 0;
			h5 {
				color: #404040;
				font-size: 14px;
			}
			h5:hover {
				text-decoration: underline;
				cursor: pointer;
			}
			i {
				color: #969696;
				font-size: 12px;
			}
		}
	}
}
</style>
