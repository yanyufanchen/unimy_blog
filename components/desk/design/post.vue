<template>
	<!-- 文章 -->
	<div class="desk_post" ref="activecolor">
		
		<div class="post_list" >
			<el-row :gutter="30">
				<el-col  v-for="(item, index) in post_list" :key="index" :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="box" data-aos="fade-up"  @click="to_detail(item,index)" @mouseover="overPost" @mouseout="outPost">
						<a href="#">
							<div class="imgBox"><img :src="item.imageUrl" alt="" /></div>
							<span class="source">{{item.cate_name}}</span>
							<h2 class="title">{{item.title}}</h2>
							<span class="detail points">{{item.info}}</span>
						</a>
					</div>
				</el-col>
			</el-row>
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
	mounted() {
		this.$refs.activecolor.style.setProperty("--activeColor",this.$store.state.Desktheme.ThemeColor);
		
	},
	computed: {
		...mapState(['Desktheme'])
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
		},
		// 鼠标移入
		overPost(){
			// console.log('鼠标移入')
			this.$refs.activecolor.style.setProperty("--activeColor",this.$store.state.Desktheme.ThemeColor);
		},
		// 鼠标移出
		outPost(){
			// console.log('鼠标移出')
			this.$refs.activecolor.style.setProperty("--activeColor",'#fff');
		}
	}
};
</script>

<style lang="less" scoped>
.desk_post {
	--activeColor: red;
	box-sizing: border-box;
	// margin-top: 3.5rem;
	width: 100%;
	
	.post_list {
		
		overflow: hidden;
		width: 100%;
		box-sizing: border-box;
		padding: 2rem 2rem;
		display: flex;
		justify-content: space-between;
		position: relative;

		.box {
			
			margin-top: 20px;
			width: 280px;
			overflow: hidden;
			background: #f6f6f6;
			box-sizing: border-box;
			padding: 0 15px 25px 15px;
			position: relative;
			a {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #535353;
				text-decoration: none;
				
				.imgBox {
					width: 280px;
					height: 186.67px;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
						transition: all 0.6s linear;
					}
				}
				.source {
					border: 1px solid #535353;
					padding: 6px 20px;
					border-radius: 25px;
					margin: 20px;
				}

				.title {
					margin-bottom: 20px;
					font-size: 20px;
				}

				.detail {
					// font-size: 14px;
					// line-height: 160%;
					// text-align: justify;
					// width: 100%;
					// height: 70px;
					// // max-height: 60px;
					// overflow: hidden;
					// position: relative;
					
					font-size: 13px;
					line-height: 24px;
					color: rgb(62, 62, 62);
					margin: 0px 0px 8px;
					max-height: 96px;
					overflow: hidden;
					display: -webkit-box;
				}
				// .detail::after {
				// 	content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
				// 	background: -webkit-linear-gradient(left, transparent, #F6F6F6 55%);
				// 	background: -o-linear-gradient(right, transparent, #F6F6F6 55%);
				// 	background: -moz-linear-gradient(right, transparent, #F6F6F6 55%);
				// 	background: linear-gradient(to right, transparent, #F6F6F6 55%);
				// }
			}
			a:hover {
				// color: #e52d67;
				color: var(--activeColor);
			}
		}
		/*鼠标hover效果*/

		.box > a::after {
			content: '';
			width: 280px;
			position: absolute;
			background: #e52d67;
			background: var(--activeColor);
			bottom: 0;
			height: 0px;
			transition: height 0.3s linear;
			/*利用伪类高度，实现动画效果*/
		}

		.box > a:hover::after {
			height: 10px;
		}

		.box:hover img {
			transform: scale(1.15);
		}

		.box:hover .source {
			// background: #e52d67;
			// border-color: #e52d67;
			background: var(--activeColor);
			border-color: var(--activeColor);
			color: #ffffff;
		}
	}
}
</style>
