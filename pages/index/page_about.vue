<template>
	<div class="deskabout">
		<el-container style="width:100%">
			<Header></Header>
			<div class="centent_box">
				<div class="about_content">
					<div class="message">
						<div class="name" data-aos="fade-up">{{mymessage?mymessage.nickname:''}}</div>
						<div class="profession" data-aos="fade-up">{{mymessage.profession?mymessage.profession:'前端工程师'}}</div>
						<div class="info" data-aos="fade-up">
							{{mymessage?mymessage.info:''}}
						</div>
					</div>
					<div  class="charts">
						<div class="title center-align" data-aos="zoom-in-up">
							<i class="fa fa-bar-chart"></i>
							<span style="margin-left:1rem">统计图表</span>
						</div>
						<el-row :gutter="10">
							<el-col data-aos="fade-up"  :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
								<div class="grid-content bg-purple" >
									<HLine v-if="postsChart.rows.length>0" :chartData="postsChart" class="about_echart"  id="postsChart"></HLine>
								</div>
							</el-col>
							<el-col data-aos="fade-up" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
								<HCake v-if="postscateChart.rows.length>0" :chartData="postscateChart"  id="postsChart2"></HCake>
							</el-col>
							<el-col data-aos="fade-up" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
								<div class="grid-content bg-purple">
									<HPoly v-if="visitNumChart.rows.length>0" :chartData="visitNumChart" ></HPoly>
								</div>
							</el-col>
						</el-row>
					</div>
					<div class="skill"  style="margin-top:2rem;margin-bottom: 4rem;">
						<div  class="title center-align" data-aos="zoom-in-up">
							<i class="fa fa-wrench"></i>
							<span style="margin-left:1rem">我的技能</span>
						</div>
						<el-row :gutter="10">
							<el-col :style="{padding:'1rem 4rem'}" v-for="(item,index) in echartList" :key="index" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
								<div class="probox" data-aos="fade-up">
									<span class="progress_name">{{item.skillName}}</span>
									<el-progress :show-text="false" :text-inside="true" :color="item.echartColor" :stroke-width="36" :percentage="item.skillPercentage"></el-progress>
									<span class="progress_per">{{item.skillPercentage}}%</span>
								</div>
							</el-col>
						</el-row>
					</div>
					<div class="build_box" v-for="(item,index) in loglist" :key="index">
						<div class="build" v-if="item.state==1" style="margin-top:2rem;margin-bottom: 4rem;">
							<div  class="title center-align" data-aos="zoom-in-up">
								<i class="el-icon-s-open"></i>
								<span style="margin-left:1rem">{{item.title}}</span>
							</div>
							<div class="content" data-aos="zoom-in-up">
								<div class="markdown-body" v-html="item.blog">
									
								</div>
							</div>
						</div>
						<div class="build" v-else style="margin-top:2rem;margin-bottom: 4rem;">
							<div  class="title center-align" data-aos="zoom-in-up">
								<i class="el-icon-edit-outline"></i>
								<span style="margin-left:1rem">{{item.title}}</span>
							</div>
							<div class="content" data-aos="zoom-in-up">
								<div class="markdown-body" v-html="item.blog">
									
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			<!-- <Scroll :themeColor="this.$store.state.Desktheme.ThemeColor"></Scroll> -->
			<!-- <NewScroll :themeColor="this.$store.state.Desktheme.ThemeColor"></NewScroll> -->
			<el-footer style="margin:0;padding:0"><Footer></Footer></el-footer>
		</el-container>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import marked from 'marked'
import Header from '@/components/desk/header/header.vue';
import HLine from '@/components/desk/vCharts/hLine.vue';
import HCake from '@/components/desk/vCharts/hCake.vue';
import HPoly from '@/components/desk/vCharts/hPoly.vue';
import Footer from '@/components/desk/design/footer.vue';
import Scroll from '@/components/common/scrollprogress.vue';
import NewScroll from '@/components/common/newscrollprogress.vue';

export default {
	data() {
		return {
			postsChart: {
				title: '文章发布统计图',
				columns: ['日期', '文章篇数'],
				rows:[]
			},
			postscateChart: {
				title: '文章分类统计图',
				columns: ['分类'],
				rows: []
			},
			visitNumChart: {
				title: '网站访问量统计图',
				columns: ['日期', '访问人数', '总访问人数'],
				rows: []
			},
			echartList:[],
			loglist:[], // 日志
		};
	},
	created() {
		this.getPostCate()
		this.getWebCount()
		this.getpost()
		this.getskill()
		this.getlogList()
	},
	mounted() {},
	computed: {
		...mapState(['Desktheme','mymessage'])
	},
	watch: {},
	components: {
		Header,
		HLine,
		HCake,
		HPoly,
		Scroll,
		NewScroll,
		Footer
	},
	onLoad() {},
	methods: {
		async getPostCate() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleCate',
				event: {}
			});
			// console.log(res, '获取分类');
			if (!res.statu) return;
			
			res.data.forEach(item=>{
				this.postscateChart.rows.push({
					name: item.name,
					value: item.postnum
				})
			})

		},
		async getskill() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getMeSkill',
				event: {}
			});
			console.log(res, '获取技能');
			if (!res.statu) return;
			this.echartList = res.data;
		},
		// 获取网站访问量
		async getWebCount(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getwebsizeCount',
				event: {
					offset:6
				}
			});
			// console.log(res, '获取网站访问量');
			if(!res.statu) return
			if (res.data.length == 0) return;
			res.data=res.data.reverse()
			res.data.forEach(item=>{
				this.visitNumChart.rows.push({
					'日期': item.timestr,
					'访问人数': item.Count,
					'总访问人数': item.totalCount,
				})
			})
		},
		async getpost(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleTimeList',
				event: {
					timenum:6
				}
			});
			// console.log(res, '获取文章时间排行列表');
			if (!res.statu) return;
			res.timestr.forEach(item=>{
				this.postsChart.rows.push({
					'日期': item.timeStr,
					'文章篇数': item.value
				})
			})
			// console.log(this.postsChart.rows,222)
		},
		async getlogList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getlogList',
				event: {
					all:true
				}
					
			});
			// console.log(res, '获取列表');
			if (res.data.length == 0) return;
			this.loglist = res.data;
			this.loglist.forEach(item=>{
				item.blog=marked(item.content)
			})
			// this.postDetail.blog = 
		},
	}
};
</script>

<style lang="less" scoped>
.deskabout {
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
		.about_content {
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
			.message {
				display: flex;
				flex-direction: column;
				align-items: center;
				.name {
					font-size: 1.2rem;
					line-height: 2.5rem;
					color: #333;
				}
				.profession {
					font-size: 1rem;
					line-height: 2rem;
					color: #878787;
				}
				.info {
					margin-top: 2rem;
					text-align: center;
					width: 70%;
					font-size: 0.7rem;
					line-height: 1.3rem;
					color: #999999;
				}
			}
			.charts,.skill,.build,.journal {
				width: 100%;
				.title {
					text-align: center;
					margin: 2rem;
					font-size: 1.5rem;
					color: #34495e;
				}
				.echart {
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.skill {
				.el-row .el-col {
					.probox {
						position: relative;
						.progress_name {
							z-index: 200;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							left: 1rem;
							color: #fff;
						}
						.progress_per {
							z-index: 200;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							right: 1rem;
							color: #828282;
						}
					}
					
				}
				
			}
		}
	}
}
</style>
