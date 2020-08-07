<template>
	<div class="account">
		<el-card class="box-card">
			<div class="title">前台皮肤管理</div>
			<div class="color">
				<span style="margin-right:20px">选择主题色</span>
				<el-color-picker
					@change="changeColor"
				    v-model="deskTheme.ThemeColor"
				    class="theme-picker"
				    :predefine="predefineColors"
				    popper-class="theme-picker-dropdown"
				></el-color-picker>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			deskTheme: {},
			predefineColors: [
				'#ff4500',
				'#ff8c00',
				'#ffd700',
				'#90ee90',
				'#00ced1',
				'#1e90ff',
				'#c71585',
				'rgba(255, 69, 0, 0.68)',
				'rgb(255, 120, 0)',
				'hsl(181, 100%, 37%)',
				'hsla(209, 100%, 56%, 0.73)'
			]
		};
	},
	created() {
		// 获取前台颜色
		this.getColor()
	},
	methods: {
		async getColor(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getDeskTheme',
				event: {}
			});
			console.log(res,'查询前台主题色')
			if(!res.statu) return
			this.deskTheme=res.data[0]
		},
		async changeColor(){
			console.log(this.deskTheme,'选择颜色')
			// 更新云数据
			const res = await this.Api.sendUniCloud(this, {
				model: 'updateDeskTheme',
				event: {
					id: this.deskTheme._id,
					data: {
						ThemeColor: this.deskTheme.ThemeColor
					}
				}
			});
			console.log(res,'修改颜色')
			if(!res.statu) return
		}
	}
};
</script>

<style lang="less">
.account {
	.box-card {
		.title {
			font-weight: 550;
			color: #000;
			margin-bottom: 20px;
		}
		.color {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}
}
</style>
