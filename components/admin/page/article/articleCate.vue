<template>
	<div class="articleCate">
		<el-card class="box-card">
			<div class="cate_header">
				<div class="tltle">文章分类</div>
				<div class="addCate" @click="addCate" :style="{ background: this.$store.state.themeColor }">
					<i class="el-icon-plus" style="margin-right:10px;"></i>
					<span>新增分类</span>
				</div>
			</div>
			<template>
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="cate_id" label="分类ID" width="100"></el-table-column>
					<el-table-column prop="creattime" label="创建时间" width="100"></el-table-column>
					<el-table-column prop="name" label="名称" min-width="200"></el-table-column>
					<el-table-column prop="icon" label="图标" width="150"></el-table-column>
					<el-table-column prop="postnum" label="文章数" width="100"></el-table-column>
					<el-table-column label="操作" width="180">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<!-- 分类弹框 -->
			<el-dialog title="分类新增/编辑" :visible.sync="Catedialog" width="30%" :before-close="cancelCate">
				<el-form ref="form" :rules="rules" :model="form" label-width="80px">
					<el-form-item label-width="80px" prop="name" label="分类名称"><el-input v-model="form.name"></el-input></el-form-item>
					<el-form-item label-width="80px" prop="icon" label="分类图标"><el-input v-model="form.icon"></el-input></el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancelCate">取 消</el-button>
					<el-button type="primary" @click="confirmCate">确 定</el-button>
				</span>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			Catedialog: false, // 分类弹框
			dialogStatu: '',
			form: {
				id: '',
				cate_id: '',
				name: '',
				icon: ''
			},
			rules: {
				name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
				icon: [{ required: true, message: '请输入分类图标', trigger: 'blur' }]
			}
		};
	},
	created() {
		this.getCateList();
	},
	methods: {
		async getCateList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleCate',
				event: {}
			});
			console.log(res, '获取分类');
			if (!res.statu) return;
			this.tableData = res.data;
			this.tableData.forEach(item => {
				item.creattime = this.Time.formatTime(item.creattime, 'Y-M-D');
			});
		},
		// 新增分类
		addCate() {
			this.dialogStatu = 'add';
			this.Catedialog = true;
		},
		// 编辑分类
		handleEdit(index, row) {
			console.log(index, row);
			this.form = {
				id: row._id,
				cate_id: row.cate_id,
				name: row.name,
				icon: row.icon,
				creattime: row.creattime
			};
			this.Catedialog = true;
			this.dialogStatu = 'edit';
		},
		// 删除分类
		async handleDelete(index, row) {
			console.log(index, row);
			const res = await this.Api.sendUniCloud(this, {
				model: 'removeArticleCate',
				event: {
					id: row._id
				}
			});
			console.log(res, '删除结果');
			if (!res.statu) return this.$message.error('删除失败');
			this.$message.success(res.mes ? res.mes : '删除成功');
			this.getCateList();
		},
		// 分类取消/确定
		cancelCate() {
			this.$refs.form.clearValidate();
			this.form = {};
			this.Catedialog = false;
		},
		async confirmCate() {
			this.$refs['form'].validate(async valid => {
				if (!valid) return this.Api.Toast('请填写完整的内容', 'warning', this);

				// 提交数据库
				if (this.dialogStatu === 'add') {
					console.log(this.form, '新增');
					// 新增
					const res = await this.Api.sendUniCloud(this, {
						model: 'addArticleCate',
						event: {
							name: this.form.name,
							icon: this.form.icon,
							cate_id: this.tableData.length>0?this.tableData[this.tableData.length - 1].cate_id + 1:1,
							creattime: new Date().getTime()
						}
					});
					console.log(res, '新增结果');
					if (!res.statu) return this.$message.error('添加失败');
					this.$message.success(res.mes ? res.mes : '添加成功');
				}
				if (this.dialogStatu === 'edit') {
					// 编辑
					console.log(this.form, '编辑');
					const res = await this.Api.sendUniCloud(this, {
						model: 'updateArticleCate',
						event: {
							data: {
								name: this.form.name,
								icon: this.form.icon,
								update_date: new Date().getTime(),
								cate_id: this.form.cate_id,
							},
							id: this.form.id
						}
					});
					console.log(res, '编辑结果');
					if (!res.statu) return this.$message.error('编辑失败');
					this.$message.success(res.mes ? res.mes : '编辑成功');
				}
				this.getCateList();
				this.Catedialog = false;
			});
		}
	}
};
</script>

<style lang="less">
.articleCate {
	.cate_header {
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
		.addCate {
			cursor: pointer;
			padding: 0 10px;
			border-radius: 30px;
			color: #fff;
			line-height: 30px;
		}
	}
}
</style>
