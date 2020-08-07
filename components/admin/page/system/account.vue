<template>
	<div class="account">
		<el-card class="box-card">
			<div class="title">
				<span>账号管理</span>
				<el-button type="primary" @click="addAccount">新增账户</el-button>
			</div>
			<div class="table">
				<div class="table">
					<el-table :data="tableData" border="" style="width: 100%">
						<el-table-column prop="creattime" label="创建日期" width="150"></el-table-column>
						<el-table-column prop="username" label="账号" min-width="130"></el-table-column>
						<!-- <el-table-column prop="password" label="密码" width="200"></el-table-column> -->
						<!-- <el-table-column prop="city" label="市区" width="120"></el-table-column> -->
						<el-table-column prop="status" label="权限" min-width="130"></el-table-column>
						<!-- <el-table-column prop="zip" label="邮编" width="120"></el-table-column> -->
						<el-table-column label="操作" width="150">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								<el-button v-if="scope.row.status !== '管理员'" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</el-card>
		<!-- 分类弹框 -->
		<el-dialog title="账户新增" :visible.sync="adddialog" width="30%" :before-close="cancel">
			<el-form ref="form" :rules="rules" :model="form" label-width="80px">
				<el-form-item label-width="80px" prop="username" label="账号"><el-input v-model="form.username"></el-input></el-form-item>
				<el-form-item label-width="80px" prop="password" label="密码"><el-input type="password" v-model="form.password"></el-input></el-form-item>
				<el-form-item label-width="80px" prop="checkPass" label="确认密码"><el-input type="password" v-model="form.checkPass"></el-input></el-form-item>
				<el-form-item label="权限" prop="status">
					<el-select v-model="form.status" placeholder="请选择权限">
						<el-option label="开发者" value="开发者"></el-option>
						<el-option label="游客" value="游客"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="账户编辑" :visible.sync="editdialog" width="30%" :before-close="cancel">
			<el-form ref="form" :rules="rules" :model="form" label-width="80px">
				<el-form-item label-width="80px" prop="username" label="账号"><el-input v-model="form.username"></el-input></el-form-item>
				<el-form-item label-width="80px" prop="password" label="原密码"><el-input type="password" v-model="form.password"></el-input></el-form-item>
				<el-form-item label-width="80px" prop="checkPass" label="新密码"><el-input type="password" v-model="form.checkPass"></el-input></el-form-item>
				<el-form-item label="权限" prop="status">
					<el-select v-model="form.status" placeholder="请选择权限">
						<el-option label="开发者" value="开发者"></el-option>
						<el-option label="游客" value="游客"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			form: {
				username: '',
				password: '',
				checkPass: '',
				status: ''
			},
			rules: {
				username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				checkPass: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
				status: [{ required: true, message: '请选择权限', trigger: 'change' }]
			},
			adddialog: false, // 弹框状态
			editdialog: false, // 弹框状态
			dialogStatu: '', // 编辑/新增
		};
	},
	created() {
		this.getAccountList()

	},
	methods: {
		async getAccountList(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getAccountList',
				event: {}
			});
			console.log(res, '获取账户');
			if (!res.statu) return
			this.tableData=res.data
			this.tableData.forEach(item=>{
				item.creattime=this.Time.formatTime(item.creattime,'Y-M-D')
			})
		},
		// 新增分类
		addAccount() {
			this.dialogStatu = 'add';
			this.adddialog = true;
		},
		// 编辑分类
		handleEdit(index, row) {
			console.log(index, row);
			this.form = {
				id: row._id,
				username: row.username,
				password: '',
				checkPass: '',
				status: row.status
			};
			this.editdialog = true;
			this.dialogStatu = 'edit';
		},
		// 删除分类
		async handleDelete(index, row) {
			console.log(index, row);
			const res = await this.Api.sendUniCloud(this, {
				model: 'removeAccount',
				event: {
					id: row._id
				}
			});
			console.log(res, '删除结果');
			if (!res.statu) return this.$message.error('删除失败');
			this.$message.success(res.mes ? res.mes : '删除成功');
			this.getAccountList();
		},
		// 分类取消/确定
		cancel() {
			this.$refs.form.clearValidate();
			this.form = {};
			if(this.dialogStatu=='edit'){
				this.editdialog = false;
			}
			if(this.dialogStatu=='add'){
				this.adddialog = false;
			}
		},
		// 新增提交
		async addSubmit(){
			if(this.form.password!==this.form.checkPass){
				this.$message.error('两次密码不匹配')
				return
			}
			let checkArr=this.tableData.filter(item=>item.username==this.form.username)
			if(checkArr.length>0){
				this.$message.error('账号已存在')
				return
			}
			// 新增
			const res = await this.Api.sendUniCloud(this, {
				model: 'addAccount',
				event: {
					username: this.form.username,
					password: this.form.password,
					status: this.form.status,
					creattime: new Date().getTime()
				}
			});
			console.log(res, '新增结果');
			if (!res.statu) return this.$message.error('添加失败');
			this.$message.success(res.mes ? res.mes : '添加成功');
			this.getAccountList();
			this.form = {};
			this.adddialog = false;
		},
		// 编辑提交
		async editSubmit(){
			// 检测原密码是否正确
			const checkflag=await this.checkpassword()
			if(!checkflag) return this.$message.error('原密码错误')
			const res = await this.Api.sendUniCloud(this, {
				model: 'updateAccount',
				event: {
					data: {
						username: this.form.username,
						password: this.form.checkPass,
						status: this.form.status,
						update_date: new Date().getTime()
					},
					id: this.form.id
				}
			});
			console.log(res, '编辑结果');
			if (!res.statu) return this.$message.error('编辑失败');
			this.$message.success(res.mes ? res.mes : '编辑成功');
			this.getAccountList();
			this.form = {};
			this.editdialog = false;
		},
		// 检测原密码
		async checkpassword(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'login',
				event: {
					username: this.form.username,
					password: this.form.password
				}
			});
			console.log(res, '检测');
			if(!res.statu) return false
			return true
		},
		async confirm() {
			this.$refs['form'].validate(async valid => {
				if (!valid) return this.Api.Toast('请填写完整的内容', 'warning', this);
				// 提交数据库
				if (this.dialogStatu === 'add') {
					console.log(this.form, '新增');
					this.addSubmit()
				}
				if (this.dialogStatu === 'edit') {
					// 编辑
					console.log(this.form, '编辑');
					this.editSubmit()
				}
			});
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
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
		}
	}
}
</style>
