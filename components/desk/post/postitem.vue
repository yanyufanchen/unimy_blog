<template>
	<div class="postdetail">
		<div class="postcontent">
			<div class="image"><img src="../../../static/medias/banner/1.jpg" alt="" /></div>
			<div class="tag"><el-tag>{{postDetail?postDetail.cate_name:''}}</el-tag></div>
			<div class="title">{{postDetail?postDetail.title:''}}</div>
			<div class="info">
				<div class="author" style="margin-right:10px">
					<i class="el-icon-s-custom"></i>
					<span>{{mymessage?mymessage.nickname:'wang peng'}}</span>
				</div>
				<div class="date">
					<i class="el-icon-date"></i>
					<span>{{postDetail?postDetail.time:''}}</span>
				</div>
			</div>
			<div class="content " >
				<div class="markdown-body "  v-highlight v-html="postDetail?postDetail.blog:''">
					
				</div>
			</div>
			<div class="handle">
				<div class="like">
					<span class="left" @click="give">
						<i class="fa fa-thumbs-up"></i>
					</span>
					<span class="right">{{postDetail?postDetail.GiveNum:''}}人点赞</span>
				</div>
				<div class="share">
					<i class="fa fa-share-alt"></i>
				</div>
			</div>
		</div>
		<div class="postcomment">
			评论区
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
		postDetail: Object,
		cate_name: String
	},
	computed: {
		...mapState(['Desktheme','mymessage'])
	},
	components: {},
	mounted() {
		
	},
	onLoad() {},
	methods: {
		async give(){
			this.postDetail.GiveNum=this.postDetail.GiveNum+1
			const res = await this.Api.sendUniCloud(this, {
				model: 'updateArticleGiveNum',
				event: {
					articleId: this.postDetail._id
				}
			},false);
			// console.log(res,'点赞')
			if(!res.statu) return
		}
	}
};
</script>

<style lang="less" scoped>

.postdetail {
	border-radius: 5px;
	box-sizing: border-box;
	width: 100%;
	
	.postcontent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
		background-color: #fff;
		margin-bottom: 2rem;
		.image {
			width: 100%;
			height: 17rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.tag {
			width: 100%;
			display: flex;
			padding: 1rem;
			justify-content: center;
			align-items: center;
			.el-tag {
				margin: 0 5px;
			}
		}
		.title {
			font-size: 1rem;
			font-weight: 550;
			margin: 1rem 0;
		}
		.info {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.5rem;
			i {
				color: #757577;
				margin-right: 5px;
			}
			span {
				color: #bcbcbd;
			}
		}
		.content {
			width: 100%;
			// text-align: center;
			// line-height: 2rem;
		}
		.handle {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 1rem;
			.like {
				display: flex;
				justify-content: center;
				align-items: center;
				.left {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 1rem;
					color: #969696;
					border: 1px solid #EEEEEE;
					width: 2rem;
					height: 2rem;
					border-radius: 2rem;
					margin-right: 5px;
					cursor: pointer;
				}
				.right {
					color: #969696;
				}
			}
			.share {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1rem;
				color: #969696;
				border: 1px solid #EEEEEE;
				width: 2rem;
				height: 2rem;
				border-radius: 2rem;
				margin-right: 5px;
				cursor: pointer;
			}
		}
	}
	.postcomment {
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
		background-color: #fff;
	}
}
</style>
