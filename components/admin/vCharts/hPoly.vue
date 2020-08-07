<!-- 折线+柱状图 -->
<template>
	<ve-histogram class="admin_echart" :data="chartData" :settings="chartSettings" :extend="Chartextend"></ve-histogram>
</template>

<script>
export default {
	data() {
		
		return {
			
			
			
		};
	},

	props: {
		chartData: {
			type: Object,
			required: true
		},
		chartSettings: {
			type: Object,
			required: true
		},
		Chartextend: {
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
