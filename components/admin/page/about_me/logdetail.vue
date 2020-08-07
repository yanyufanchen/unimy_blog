<template>
	<div class="article">
		<div class="articleForm">
			<el-form ref="articleObj"  :label-position="labelPosition" :model="logObj" label-width="80px">
				<el-form-item label="标题" ><el-input :disabled="true" v-model="logObj.title"></el-input></el-form-item>
				<el-form-item>
					<div id="editor"><mavon-editor  style="height: 100%;width: 100%;" v-model="logObj.content"></mavon-editor></div>
				</el-form-item>
				<el-form-item>
					<div class="btn">
						<el-button type="warning" @click="oncancel">取消</el-button>
						<el-button type="primary" @click="submitForm">提交</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
	data() {
		return {
			dialogVisible: false,
			labelPosition: 'left',
			logObj: {}, // 当前
		};
	},
	components: {
		mavonEditor
	},
	async created() {
		if (this.$store.state.logObj && this.$store.state.logObj.statu == 'edit') {
			console.log('编辑');
			const res = await this.Api.sendUniCloud(this, {
				model: 'getlog',
				event: {
					id: this.$store.state.logObj.id
				}
			});
			console.log(res, '请求云函数');
			this.logObj = {
				id: res.data[0]._id,
				state: res.data[0].state,
				create_date: res.data[0].create_date,
				delete_date: res.data[0].delete_date,
				content: res.data[0].content,
				title: res.data[0].title
			};	
		}
	},
	methods: {
		
		// 编辑文章
		async submitForm() {
			console.log('提交编辑文章');
			const res = await this.Api.sendUniCloud(this, {
				model: 'updatelog',
				event: {
					id: this.logObj.id,
					data: {
						state: this.logObj.cate_id,
						create_date: this.logObj.create_date,
						update_date: new Date().getTime(),
						delete_date: this.logObj.delete_date,
						content: this.logObj.content,
						title: this.logObj.title,
					}
				}
			});
			console.log(res, '请求云函数');
			if (!res.statu) return this.Api.Toast('编辑失败', 'warning', this);
			this.Api.Toast(res.mes, 'success', this);
			this.$emit('openPage', 'log', this);
		},
		oncancel() {
			this.$emit('openPage', 'log');
			this.logObj = [];
		},
	},

	mounted() {}
};
</script>

<style lang="less">
.article {
	#editor {
		height: 500px;
	}
	.el-form-item {
		margin-bottom: 25px;
	}
	.btn {
		margin-top: 10px;
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
