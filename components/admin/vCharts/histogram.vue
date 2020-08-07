<!-- 柱状图 -->
<template>
	<ve-histogram class="admin_echart" :data="chartData" :settings="chartSettings" :extend="Chartextend"></ve-histogram>
</template>

<script>
export default {
	data() {
		
		return {
			chartSettings: {
				showLine: ['总访问人数']
			},
			Chartextend: {
				title: {
					text: '网站访问量统计图',
					x: 'center'
				},
				legend: {
				        data:[]
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
				}
			}
			
			
		};
	},

	props: {
		chartData: {
			type: Object,
			required: true
		},
		
	},
	async created() {
		
	},
	mounted() {
		// this.setEchart();
	},
	methods: {
		setEchart() {
			
		}
	}
};
</script>
<style lang="less" scoped>
#myChart {
	width: 100%;
}
.admin_echart {
	width: 100%;
}
</style>
