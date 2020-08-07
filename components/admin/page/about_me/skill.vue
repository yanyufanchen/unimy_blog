<template>
	<div class="account">
		<el-card class="box-card">
			<div class="title">
				<span>友情链接管理</span>
				<el-button type="primary" @click="addLink">新增友情链接</el-button>
			</div>
			<el-tabs v-model="activeName" @tab-click="handleClickTab">
				<el-tab-pane label="技术支持" name="1"></el-tab-pane>
				<el-tab-pane label="友情链接" name="2"></el-tab-pane>
				<el-tab-pane label="广告位" name="3"></el-tab-pane>
			</el-tabs>
			<div class="table">
				<div class="table">
					<el-table :data="tableData" border="" style="width: 100%">
						<el-table-column prop="create_time" label="创建日期" width="150"></el-table-column>
						<el-table-column  label="LOGO" min-width="130">
							<template slot-scope="scope">
									<div class="imgbox">
										<el-image :src="scope.row.imageUrl">
										      <div slot="error" class="image-slot">
										        <i class="el-icon-picture-outline"></i>
										      </div>
										    </el-image>
									</div>
							      </template>
						</el-table-column>
						<el-table-column prop="name" label="名称" min-width="130"></el-table-column>
						<el-table-column prop="info" label="描述" min-width="130"></el-table-column>
						
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
		<!-- 弹框 -->
		<el-dialog :title="dialogStatu==1?'新增':'编辑'" :visible.sync="dialog" width="70%" :before-close="cancel">
			<el-form ref="form" :rules="rules" :model="form" label-width="120px">
				<el-form-item label-width="120px" prop="name" label="名称"><el-input v-model="form.name"></el-input></el-form-item>
				<el-form-item label-width="120px" prop="info" label="描述"><el-input  v-model="form.info"></el-input></el-form-item>
				<el-form-item label-width="120px" prop="webUrl" label="官网/文档地址"><el-input  v-model="form.webUrl"></el-input></el-form-item>
				<el-form-item label-width="120px"  label="项目地址"><el-input  v-model="form.projectUrl"></el-input></el-form-item>
				<el-form-item label="权限" prop="state">
					<el-select v-model="form.state" placeholder="请选择类型">
						<el-option label="技术支持" :value="1"></el-option>
						<el-option label="友情链接" :value="2"></el-option>
						<el-option label="广告位" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="LOGO" prop="image">
					<el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						list-type="picture-card"
						:disabled="disabledUpload"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						:on-change="progressImg"
						:file-list="fileList"
						:auto-upload="false"
						:limit="uploadImgNum"
					>
						<i slot="default" class="el-icon-plus"></i>
						<div slot="file" slot-scope="{ file }">
							<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
							<span class="el-upload-list__item-actions">
								<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i class="el-icon-zoom-in"></i></span>
								<span v-if="false" class="el-upload-list__item-delete" @click="handleDownload(file)"><i class="el-icon-download"></i></span>
								<span v-if="true" class="el-upload-list__item-delete" @click="handleRemove(file)"><i class="el-icon-delete"></i></span>
							</span>
						</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
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
			activeName: '1', //tab栏定位
			
			fileImg: '', //海报
			oldimg: '', // 临时存的数据库图片
			disabledUpload: false, // 上传禁用状态
			fileList: [], // 上传图片
			uploadImgNum: 1, // 允许上传数量
			dialogImageUrl: '',
			dialogVisible: false,
			
			tableData: [],
			form: {
				name: '',
				info: '',
				webUrl: '',
				projectUrl: '',
				state: 1
			},
			rules: {
				name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
				info: [{ required: true, message: '请输入描述', trigger: 'blur' }],
				webUrl: [{ required: true, message: '请输入官网/文档地址', trigger: 'blur' }],
				state: [{ required: true, message: '请选择类型', trigger: 'change' }]
			},
			dialog: false, // 弹框状态	
			dialogStatu: '' // 编辑/新增
		};
	},
	created() {
		this.getLinkList();
	},
	methods: {
		to(e){
			console.log(e,11)
		},
		handleClickTab(tab, event) { // tab栏切换
			console.log(tab.name);
			this.activeName=tab.name
			this.getLinkList()
		},
		
		// 查看图片
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
			console.log(this.dialogImageUrl, '查看');
		},
		handleDownload(file) {
			console.log(file, '下载');
		},
		// 移除
		handleRemove(file, fileList) {
			console.log(file, fileList);
			this.fileList = fileList;
			this.disabledUpload=false
			console.log(this.fileList, '移除图片');
		},
		// 选择
		handlePreview(file) {
			console.log(file,'选择图片');
		},
		// 确认移除
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		// 图片状态
		async progressImg(file, fileList) {
			console.log(file, 'a');
			console.log(fileList, 'b');
			this.fileList = fileList;
			if(file.size>500000){
				this.$message.error('图片超出500Kb')
				this.fileList=[]
				return
			}
		},
		// 上传服务器图片
		async uploadImg() {
			console.log('确定上传');
			if(this.fileList.length==0){
				this.$message.warning('请选择图片文件')
				return
			}
			
			let file=this.fileList[0]
			console.log('上传服务器')
			// promise
			let imgName = new Date().getTime() + '.png';
			const result = await uniCloud.uploadFile({
				filePath: file.url,
				cloudPath: imgName,
				onUploadProgress: function(progressEvent) {
					console.log(progressEvent);
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				}
			});
			console.log(result, '上传');
			if (!result.success) {
				console.log('上传失败');
				return false
			}
			this.fileImg = result.fileID;
			console.log(this.fileImg,'确定上传');
			return true
		},
		
		async getLinkList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getWebLink',
				event: {
					state:Number(this.activeName)
				}
			});
			console.log(res, '获取友情链接');
			if (!res.statu) return;
			this.tableData = res.data;
			this.tableData.forEach(item => {
				item.create_time = this.Time.formatTime(item.create_time, 'Y-M-D');
			});
		},
		// 新增
		addLink() {
			this.dialogStatu = 1;
			this.dialog = true;
			console.log(this.disabledUpload,222)
			// this.disabledUpload=true
			// 初始化图片
			this.fileList=[]
			this.fileImg=''
			this.oldimg=''
		},
		// 编辑
		handleEdit(index, row) {
			console.log(index, row);
		
			this.form = {
				id: row._id,
				name: row.name,
				info: row.info,
				webUrl: row.webUrl,
				projectUrl: row.projectUrl,
				state: row.state,
			};
			this.dialog = true;
			this.dialogStatu = 2;
			
			if(row.imageUrl){
				// 覆盖上传图
				this.fileList=[{url:row.imageUrl}]
				this.fileImg=row.imageUrl
				this.oldimg=row.imageUrl
				this.disabledUpload=true
			}else {
				// 初始化图片
				this.fileList=[]
				this.fileImg=''
				this.oldimg=''
				this.disabledUpload=false
			}
		},
		// 删除
		async handleDelete(index, row) {
			console.log(index, row);
			const res = await this.Api.sendUniCloud(this, {
				model: 'removeWebLink',
				event: {
					id: row._id
				}
			});
			console.log(res, '删除结果');
			if (!res.statu) return this.$message.error('删除失败');
			this.$message.success(res.mes ? res.mes : '删除成功');
			this.getLinkList();
		},
		// 取消/确定
		cancel() {
			this.$refs.form.clearValidate();
			// this.form = {};
			this.dialog = false;
		},
		
		
		// 编辑提交
		async editSubmit() {
			console.log(this.form,11)
			// return
			const res = await this.Api.sendUniCloud(this, {
				model: 'updateWebLink',
				event: {
					data: {
						imageUrl: this.fileImg,
						info: this.form.info,
						name: this.form.name,
						projectUrl: this.form.projectUrl,
						update_time:new Date().getTime,
						state:this.form.state,
						webUrl:this.form.webUrl,
					},
					id: this.form.id
				}
			});
			console.log(res, '编辑结果');
			if (!res.statu) return this.$message.error('编辑失败');
			this.$message.success(res.mes ? res.mes : '编辑成功');
			this.getLinkList();
			this.form = {};
			this.dialog = false;
		},
		
		async confirm() {
			this.$refs['form'].validate(async valid => {
				if (!valid) return this.Api.Toast('请填写完整的内容', 'warning', this);
				// 执行上传
				if(this.oldimg!=this.fileList[0].url){
					const uploadflag=await this.uploadImg()
					if(!uploadflag) return this.$message.error('上传图片失败')
				}
				// 提交数据库
				if (this.dialogStatu === 1) {
					console.log(this.form, '新增');
					this.addSubmit();
				}
				if (this.dialogStatu === 2) {
					// 编辑
					console.log(this.form, '编辑');
					this.editSubmit();
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
	.imgbox {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dedede;
	}
}
</style>
