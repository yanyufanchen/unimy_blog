<!-- 饼图 -->
<template>
	<div :id="id" class="about_echart" ></div>
</template>

<script>
export default {
	data() {
		return {
			aa:{
			              title: {
			                text: '文章分类统计图',
			                // top: -4,
			                x: 'center'
			              },
			              tooltip: {
			                trigger: 'item',
			                formatter: "{a} \n {b} : {c} ({d}%)"
			              },
			              series: [{
			                name: '分类',
			                type: 'pie',
			                radius: '50%',
			                color: ['#6772e5', '#ff9e0f', '#fa755a', '#3ecf8e', '#82d3f4', '#ab47bc', '#525f7f', '#f51c47',
			                  '#26A69A'
			                ],
			                data: [{
			                  "name": "开发工具",
			                  "value": 1
			                }, {
			                  "name": "后端开发",
			                  "value": 1
			                }, {
			                  "name": "前端开发",
			                  "value": 1
			                }],
			                itemStyle: {
			                  emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                  }
			                }
			              }]
			            },
			Option: {
				title: {
					text: '',
					top: -4,
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} \n {b} : {c} ({d}%)'
				},

				series: [{
                name: '分类',
                type: 'pie',
                radius: '50%',
                color: ['#6772e5', '#ff9e0f', '#fa755a', '#3ecf8e', '#82d3f4', '#ab47bc', '#525f7f', '#f51c47',
                  '#26A69A'
                ],
                data: [{
                  "name": "开发工具",
                  "value": 1
                }, {
                  "name": "后端开发",
                  "value": 1
                }, {
                  "name": "前端开发",
                  "value": 1
                }],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
			}
		};
	},

	props: {
		chartData: {
			type: Object,
			required: true
		},
		// styleData: {
		// 	type: Object,
		// 	required: true
		// },
		id: {
			type: String,
			required: true
		}
	},
	mounted() {
		this.drawEchart();
	},
	methods: {
		drawEchart() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById(this.id));
			// 处理数据
			console.log(this.chartData, 111);

			this.Option.title.text = this.chartData.title; // 标题
			// this.chartData.rows.forEach((item, index) => {
			// 	this.Option.xAxis.data.push(item[this.chartData.columns[0]]); // x轴
			// });
			// this.chartData.columns.forEach((item1, index1) => {
				
			// 		let serieItem = {
			// 			name: item1,
			// 			type: 'pie',
			// 			color: ['#6772e5', '#ff9e0f', '#fa755a', '#3ecf8e', '#82d3f4', '#ab47bc', '#525f7f', '#f51c47', '#26A69A'],
			// 			data: [],
			// 			itemStyle: {
			// 				emphasis: {
			// 					shadowBlur: 10,
			// 					shadowOffsetX: 0,
			// 					shadowColor: 'rgba(0, 0, 0, 0.5)'
			// 				}
			// 			}
			// 		};
			// 		this.chartData.rows.forEach((item2, index2) => {
			// 			serieItem.data=item2
			// 		});
			// 		this.Option.series.push(serieItem);
				
			// });
			// console.log(this.Option)
			// 绘制图表
			myChart.setOption(this.aa);
		}
	}
};
</script>
<style lang="less" scoped>
#myChart {
	width: 100%;
}
</style>
