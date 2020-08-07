<template>
	<div class="home">
		<!-- <div class="header">
		</div> -->
		<div class="centent">
			<el-row :gutter="20">
				<el-col :span="14">
					<div class="grid-content bg-purple">
						<div class="left">
							<div class="card">
								<el-row :gutter="5">
									<el-col :span="8" :style="{ marginBottom: '10px' }" v-for="(item, index) in [1, 2, 3]" :key="index">
										<el-card shadow="hover">
											<div class="cardBox">
												<div class="card_left">
													<div class="card_txt">新用户</div>
													<div class="card_Num">387</div>
												</div>
												<div class="card_right"><i class="el-icon-edit"></i></div>
											</div>
										</el-card>
									</el-col>
								</el-row>
							</div>
							<div class="echat">
								<el-card>
									<template slot="title">
										访问热度折线图
										<i class="header-icon el-icon-info"></i>
									</template>
									<HLine v-if="postsChart.rows.length>0" :chartData="postsChart" classname="admin_echart"  id="postsChart"></HLine>
								</el-card>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="10">
					<div class="grid-content bg-purple-light">
						<div class="right">
							<el-card>
								<div class="admin_echarts">
									<div class="echart_top">
										<HPoly v-if="visitNumChart.rows.length>0" :chartData="visitNumChart" ></HPoly>
									</div>
									<div class="echart_bottom" v-for="(item, index) in [1, 2]" :key="index">
										<div class="comment">
											<div class="comment_left">
												<div class="comment_header"></div>
												<div class="comment_content">
													<div class="comment_title">凡尘</div>
													<div class="comment_txt">过来冒个泡！</div>
												</div>
											</div>
											<div class="comment_right"><span>2011/12/22</span></div>
										</div>
										<div class="comment_line"></div>
									</div>
								</div>
							</el-card>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import HPoly from '@/components/desk/vCharts/hPoly.vue';
	import HLine from '@/components/desk/vCharts/hLine.vue';
	// import HPoly from '@/components/admin/vCharts/hPoly.vue';
	// import Histogram from '@/components/admin/vCharts/histogram.vue';
	import { mapState } from 'vuex';
export default {
	data() {
		
		return {
			activeNames: ['1'],
			postsChart: {
				title: '文章发布统计图',
				columns: ['日期', '文章篇数'],
				rows:[]
			},
			visitNumChart: {
				title: '网站访问量统计图',
				columns: ['日期', '访问人数', '总访问人数'],
				rows: []
			},
		};
	},
	components:{
		HPoly,
		HLine
		// Histogram
	},
	computed:{
		...mapState(['themeColor'])
	},
	async created() {
	if(!getApp().globalData.AppFlag){
		let a=await this.Utils.getAppCallbackFlag(this.AppFlag)
		console.log(a,'echart等待全局app')
		this.getWebCount()
		this.getpost()
	}
	// this.Chartextend.tooltip.axisPointer.label.backgroundColor=this.$store.state.themeColor
	},
	methods: {
		handleChange(val) {
			console.log(val);
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
	},
	mounted() {
		
		
	}
};
</script>

<style lang="less" scoped>
.home {
	.header {
		.title {
			font-size: 25px;
			font-weight: 550;
		}
		.grid-content {
		}
		.nowdate {
			display: flex;
			height: 50px;
			justify-content: flex-end;
			span {
				line-height: 50px;
				text-align: center;
				font-size: 15px;
				padding: 0 10px;
			}
			.year {
				color: #fff;
				border-radius: 10px 0 0 10px;
			}
			.time {
				border-radius: 0 10px 10px 0;
				background-color: rgb(250, 250, 250);
			}
		}
	}
	.centent {
		// margin-top: 20px;
		.left {
			// background-color: pink;
			.card {
				.cardBox {
					display: flex;
					justify-content: space-between;
					.card_left {
						.card_txt {
							font-size: 18px;
							color: rgb(110, 108, 108);
						}
						.card_Num {
							font-size: 30px;
							color: #d7d7d7;
							font-weight: 550;
						}
					}
					.card_right {
						width: 50px;
						height: 50px;
						border-radius: 5px;
						font-size: 30px;
						text-align: center;
						line-height: 50px;
						color: #fff;
						background-color: #ef806c;
					}
				}
			}
		}
		.right {
			// background-color: purple;
			.admin_echarts {
				height: 510px;
				.echart_bottom {
					.comment {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						.comment_left {
							display: flex;
							align-items: center;
							.comment_header {
								width: 30px;
								height: 30px;
								border-radius: 30px;
								margin-right: 10px;
								background-color: #ccc;
							}
							.comment_content {
								.comment_title {
									color: #333;
									font-size: 14px;
								}
								.comment_txt {
									color: #666;
									font-size: 12px;
								}
							}
						}
						.comment_right {
							height: 100%;
							color: #bbb;
							font-size: 10px;
							display: flex;
							align-items: flex-start;
						}
					}
					.comment_line {
						border-top: 1px solid #eee;
						width: 100%;
						margin: 10px 0;
					}
				}
			}
		}
	}
}
</style>
