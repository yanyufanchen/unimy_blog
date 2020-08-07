<template>
	<div class="postdetail_side">
		<div class="header"><img src="../../../static/img/blog-post-3.jpg" alt="" /></div>
		<div class="recommend">
			<div class="title" :style="{ borderLeft: '4px solid ' + Desktheme.ThemeColor }">推荐阅读</div>
			<div class="titleItem" v-for="(item, index) in post_list" :key="index">
				<div class="title_txt" @click="to_detail(item,index)">
					<h5>{{item.title}}</h5>
				</div>
				<i>阅读 {{item.ReadNum}}</i>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			
		};
	},
	props: {
		post_list:Array
	},
	computed: {
		...mapState(['Desktheme'])
	},
	created() {
		
	},
	mounted() {
		
	},
	components: {},
	onLoad() {},
	methods: {
		async to_detail(item,index) {
			// console.log(item,index);
			let catedata=JSON.stringify({
				cate_name: item.cate_name
			})
			const res = this.Uni.newHref(this, '/pages/index/page_post_detail', { id: item._id,cate_name:item.cate_name });
			// console.log(res, '前往文章详情');
			// 此处触发叠加文章阅读量
			this.read(item,index)
		},
		async read(item,index){
			// console.log(item,index)
			this.post_list[index].readNum=this.post_list[index].readNum+1
			const res = await this.Api.sendUniCloud(this, {
				model: 'updateArticleReadNum',
				event: {
					articleId: item._id
				}
			},false);
			if(!res.statu) return
		}
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
			i {
				color: #969696;
				font-size: 12px;
			}
			.title_txt:hover {
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}
}
</style>
