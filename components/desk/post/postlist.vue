<template>
	<div class="postlist">
		<div class="post"  v-for="(item, index) in post_list" :key="index">
			<div class="content">
				<div class="left">
					<div class="title"   @click="to_detail(item,index)">{{ item.title }}</div>
					<div class="info points">{{ item.info }}</div>
					<div class="detail">
						<span>{{mymessage?mymessage.nickname:'wang peng'}}</span>
						<span >
							<i class="fa fa-eye"></i>
							{{item.readNum}}
						</span>
						<!-- <span>
							<i class="fa fa-commenting"></i>
							61
						</span> -->
						<span>
							<i class="fa fa-heart" @click="give(item,index)"></i>
							{{item.GiveNum}}
						</span>
					</div>
				</div>
				<div class="right hidden-xs-only" ><img @click="to_detail(item,index)"   :src="item.imageUrl" alt="" /></div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	props: {
		post_list: Array
	},
	computed: {
		...mapState(['Desktheme','mymessage'])
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
		async give(item,index){
			// console.log(index)
			this.post_list[index].GiveNum=this.post_list[index].GiveNum+1
			const res = await this.Api.sendUniCloud(this, {
				model: 'updateArticleGiveNum',
				event: {
					articleId: item._id
				}
			},false);
			if(!res.statu) return
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
.postlist {
	box-sizing: border-box;
	width: 100%;
	// background-color: #fff;
	padding: 20px;
	// border-radius: 5px;
	.post {
		width: 100%;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #eaeaea;
		.content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				flex:1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				.title {
					// display: inherit;
					font-size: 18px;
					font-weight: 700;
					line-height: 1.5;
					margin: -7px 0px 4px;
				}
				.title:hover {
					cursor: pointer;
					text-decoration: underline;
				}
				.info {
					font-size: 13px;
					line-height: 24px;
					color: rgb(153, 153, 153);
					margin: 0px 0px 8px;
					max-height: 96px;
					overflow: hidden;
					display: -webkit-box;
					
				}
				.detail {
					span {
						font-size: 12px;
						font-weight: 400;
						line-height: 20px;
						color: rgb(180, 180, 180);
						margin-right: 10px;
						
						i {
							margin-right: 5px;
							transition: all 0.1s ease-in 0s;
						}
					}
					i:hover {
						color: rgb(85, 85, 85);
						cursor: pointer;
					}
				}
			}
			.right {
				margin-left: 10px;
				width: 170px;
				height: 120px;
				background-color: #eee;
				img {
					width: 100%;
					height: 120px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
