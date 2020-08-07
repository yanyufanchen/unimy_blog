<!-- 折线图 -->
<template>
	<div :id="id" class="about_echart" ></div>
</template>

<script>
export default {
	data() {
		
		return {
			Option: {
				title: {
					text: '示例',
					// top: -5,
					x: 'center'
				},
				tooltip: {
					trigger: 'axis',
					formatter: "",
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#ff5500'
						}
					}
				},
				xAxis: {
					type: 'category',
					data: []
				},
				yAxis: {
					type: 'value'
				},
				// legend: {
				//         // data: ['文章篇数']
				//     },
				series: []
			},
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
			console.log(this.chartData,111)
			
			this.Option.title.text=this.chartData.title // 标题
			this.chartData.rows.forEach((item,index)=>{ 
				this.Option.xAxis.data.push(item[this.chartData.columns[0]]) // x轴
				
			})
			this.Option.series=[]
			this.chartData.columns.forEach((item1,index1)=>{
				if(index1>0){
					let serieItem={
						name: item1,
						type: 'line',
						color: ['#6772e5'],
						data: [],
						markPoint: {
							symbolSize: 45,
							color: ['#fa755a', '#3ecf8e', '#82d3f4'],
							data: [
								{
									type: 'max',
									itemStyle: {
										color: ['#3ecf8e']
									},
									name: '最大值'
								},
								{
									type: 'min',
									itemStyle: {
										color: ['#fa755a']
									},
									name: '最小值'
								}
							]
						},
						markLine: {
							itemStyle: {
								color: ['#ab47bc']
							},
							data: [
								{
									type: 'average',
									name: '平均值'
								}
							]
						}
					}
					// serieItem.data=[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4]
					this.chartData.rows.forEach((item2,index2)=>{
						// console.log(item2,index1,222)
						serieItem.data.push(item2[item1])
						// console.log(item2[item1],2123)
					})
					console.log(serieItem.data)
					// serieItem.data=
					this.Option.series.push(serieItem)
				}
			})
			
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
