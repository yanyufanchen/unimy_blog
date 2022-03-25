<template>
	<div class="deskLink" ref="themeColor">
		<el-container style="width:100%">
			<Header></Header>
			<div class="centent_box" >
				<div class="content" >
					<div class="skill" style="width: 100%;">
						<div class="title" data-aos="fade-up">技术支持</div>
						<div class="info" style="width: 100%;">
							<div class="info_box" v-if="LinkList.length>0&&stateflagList[0]">
								<el-row :gutter="20">
									<el-col  v-for="(item, index) in LinkList" :key="index" :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
										<div  v-if="item.state==1" data-aos="fade-up" class="grid-content bg-purple">
											<div class="item">
												<div class="image">
													<img :src="item.imageUrl" alt="">
												</div>
												<div class="name">{{item.name}}</div>
												<div class="mes">{{item.info}}</div>
												<div class="btn">
													<span><a :href="item.webUrl" target="_blank">官网/文档</a></span>
													<i class="fa fa-github-square"><a :href="item.projectUrl?item.projectUrl:'#'" target="_blank"></a></i>
												</div>
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
							<div  v-else class="info_notbox">
								<span data-aos="fade-up">暂无推荐位</span>
							</div>
						</div>
					</div>
					<div class="skill" style="width: 100%;">
						<div class="title" data-aos="fade-up">友情链接</div>
						<div class="info" style="width: 100%;">
							<div class="info_box"  v-if="LinkList.length>0&&stateflagList[1]">
								<el-row :gutter="20">
									<el-col  v-for="(item, index) in LinkList" :key="index" :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
										<div  v-if="item.state==2" data-aos="fade-up" class="grid-content bg-purple">
											<div class="item">
												<div class="image">
													<img :src="item.imageUrl" alt="">
												</div>
												<div class="name">{{item.name}}</div>
												<div class="mes">{{item.info}}</div>
												<div class="btn">
													<span><a :href="item.webUrl" target="_blank">官网/文档</a></span>
													<i class="fa fa-github-square"><a :href="item.projectUrl?item.projectUrl:'#'" target="_blank"></a></i>
												</div>
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
							<div  v-else class="info_notbox">
								<span data-aos="fade-up">暂无推荐位</span>
							</div>
						</div>
					</div>
					<div class="skill" style="width: 100%;margin-bottom:2rem">
						<div class="title" data-aos="fade-up">前端插件库</div>
						<div class="info" style="width: 100%;">
							<div class="info_box" data-aos="fade-up" v-if="LinkList.length>0&&stateflagList[2]">
								<el-row :gutter="20">
									<el-col  v-for="(item, index) in LinkList" :key="index" :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
										<div  v-if="item.state==3" data-aos="fade-up" class="grid-content bg-purple">
											<div class="item">
												<div class="image">
													<img :src="item.imageUrl" alt="">
												</div>
												<div class="name">{{item.name}}</div>
												<div class="mes">{{item.info}}</div>
												<div class="btn">
													<span><a :href="item.webUrl" target="_blank">官网/文档</a></span>
													<i class="fa fa-github-square"><a :href="item.projectUrl?item.projectUrl:'#'" target="_blank"></a></i>
												</div>
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
							<div  v-else class="info_notbox">
								<span data-aos="fade-up">暂无推荐位</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <Scroll :themeColor="this.$store.state.Desktheme.ThemeColor"></Scroll> -->
			<el-footer style="margin:0;padding:0"><Footer></Footer></el-footer>
		</el-container>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import Header from '@/components/desk/header/header.vue';
import Footer from '@/components/desk/design/footer.vue';
import Scroll from '@/components/common/scrollprogress.vue';
import Vue from 'vue'
export default {
	data() {
		return {
			LinkList:[],
			stateflagList:[]
		};
	},
	created() {
		this.getLinkList()
	},
	async mounted() {
		// console.log(getApp().globalData,'link')
		this.$refs.themeColor.style.setProperty("--themeColor",this.$store.state.Desktheme.ThemeColor?this.$store.state.Desktheme.ThemeColor:'#409EFF'); // 设置动态主题色
		if(!getApp().globalData.AppFlag){
			let a=await this.Utils.getAppCallbackFlag(this.AppFlag)
			// console.log(a,'等待全局app')
		}
		this.$refs.themeColor.style.setProperty("--themeColor",this.$store.state.Desktheme.ThemeColor?this.$store.state.Desktheme.ThemeColor:'#409EFF'); // 设置动态主题色
	},
	computed: {
		...mapState(['Desktheme'])
	},
	watch: {},
	components: {
		Header,
		Scroll,
		Footer
	},
	onLoad() {},
	methods: {
		async getLinkList(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getWebLink',
				event: {
					
				}
			});
			// console.log(res, '获取友情链接');
			if (!res.statu) return;
			this.LinkList = res.data;
			this.stateflagList[0]=this.LinkList.some(item=>item.state==1)
			this.stateflagList[1]=this.LinkList.some(item=>item.state==2)
			this.stateflagList[2]=this.LinkList.some(item=>item.state==3)
			console.log(this.stateflagList)
			// this.tableData.forEach(item => {stateflagList
			// 	item.create_time = this.Time.formatTime(item.create_time, 'Y-M-D');
			// });
		}
	}
};
</script>

<style lang="less" scoped>
.deskLink {
	--themeColor: '#409EFF'; //此处我用的是动态主题色
	background-color: #f9f9f9;
	.centent_box {
		z-index: 1000;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		min-height: 300px;
		height: 100%;
		padding-bottom: 3rem;
		// position: relative;
		.content {
			margin-top: -3rem;
			z-index: 100;
			// width: 90%;
			padding: 10px;
			// position: absolute;
			// top: -1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-radius: 1rem;
			background-color: #fff;
			box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
			.skill {
				box-sizing: border-box;
				padding: 0 1rem;
				.title {
					font-weight: 540;
					color: #333;
					height: 1.7rem;
					font-size: 1rem;
					line-height: 1.7rem;
					padding-left:0.5rem;
					margin: 1rem 0;
					border-left: 4px solid var(--themeColor);
				}
				.info {
					.item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						background-color: #fff;
						// box-shadow: 0px 1px 7px -2px #000;
						box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
						border-radius: 10px;
						margin-bottom: 1rem;
						padding: 1.4rem;
						.image {
							width: 4rem;
							height: 4rem;
							border-radius: 2rem;
							background-color: #eee;
							overflow: hidden;
							img {
								width: 4rem;
								height: 4rem;
							}
						}
						.name {
							font-size: 1rem;
							font-weight: 540;
							line-height: 1.5rem;
						}
						.mes {
							color: #686868;
							font-size: 0.6rem;
							line-height: 1rem;
							text-align: center;
							height: 2rem;
						}
						.btn {
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 1rem 0;
							span{
								height: 1.5rem;
								line-height: 1.5rem;
								font-size: 0.5rem;
								color: #fff;
								padding: 0 10px;
								border-radius: 5px;
								margin-right: 5px;
								cursor: pointer;
								background-color: #4B5456;
							}
							i {
								height: 1.5rem;
								line-height: 1.5rem;
								font-size: 1rem;
								color: #fff;
								cursor: pointer;
								padding: 0 10px;
								border-radius: 5px;
								margin-right: 5px;
								background-color: var(--themeColor);
							}
						}
					}
					.info_box,.info_notbox {
						width: 100%;
						height: 10rem;
						
					}
					.info_notbox {
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
					
					.info_notbox span {
						font-size: 1.4rem;
						color: #666;
					}
				}
			}
		}
	}
}
</style>
