<template>
	<div class="grid-content bg-purple">
		<el-card class="box-card">
			<div class="post">
				<div class="post_header">
					<div class="tltle">日志记录</div>
					
				</div>
				<div class="post_center">	
					<div class="table">
						<el-table :data="tableData" border="" style="width: 100%">
							<el-table-column prop="create_date" label="日期" width="180"></el-table-column>
							<el-table-column prop="title" label="名称" min-width="120"></el-table-column>
							<el-table-column prop="update_date" label="更新日期" width="200"></el-table-column>
							<el-table-column label="操作" width="180">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
	data() {
		return {
			searchPost: '',
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			tableData: [],
		};
	},
	components: {
		mavonEditor
	},
	created() {
		this.getlogList();
	},
	methods: {
		
		// 列表
		async getlogList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getlogList',
				event: {}
					
			});
			console.log(res, '获取列表');
			if (res.data.length == 0) return;
			this.tableData = res.data;
			this.ProjectTotal = res.total;
			this.tableData.forEach(item => {
				item.create_date = this.Time.formatTime(item.create_date, 'Y-M-D h:m:s');
				item.update_date = item.update_date?this.Time.formatTime(item.update_date, 'Y-M-D h:m:s'):'暂未修改'
			});
		},
		
		// 编辑
		handleEdit(index, row) {
			console.log(index, row);
			this.$store.commit('editlog', {
				id: row._id,
				statu: 'edit'
			});
			this.$emit('openPage', 'logdetail');
		},
	},
	mounted() {}
};
</script>

<style lang="less">
.post {
	// min-height: 800px;
	// border-left: 1px solid #eee;
	.post_header {
		border-bottom: 1px solid #eee;
		padding: 0 10px;
		display: flex;
		height: 50px;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		.tltle {
			font-weight: 550;
			color: #000;
		}
		.addPost {
			cursor: pointer;
			padding: 0 10px;
			border-radius: 30px;
			color: #fff;
			line-height: 30px;
		}
	}
	.post_center {
		padding: 10px;
		.selct {
			margin-bottom: 30px;
			display: flex;
			align-items: center;
		}
		.table {
			margin-bottom: 20px;
		}
	}
}
</style>
