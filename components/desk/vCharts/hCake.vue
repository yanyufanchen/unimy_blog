<!-- 饼图 -->
<template>
	<div :id="id" class="about_echart" ></div>
</template>

<script>
export default {
	data() {
		return {
			
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
                data: [],
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
		
		id: {
			type: String,
			required: true
		}
	},
	computed:{
		
	},
	mounted() {
		this.drawEchart();
	},
	methods: {
		drawEchart() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById(this.id));
			// 处理数据
			this.Option.title.text = this.chartData.title; // 标题
			this.Option.series[0].data=this.chartData.rows
			// 绘制图表
			myChart.setOption(this.Option);
		}
	}
};
</script>
<style lang="less" scoped>
#myChart {
	width: 100%;
}
</style>
