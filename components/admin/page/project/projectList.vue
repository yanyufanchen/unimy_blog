<template>
	<div class="grid-content bg-purple">
		<el-card class="box-card">
			<div class="post">
				<div class="post_header">
					<div class="tltle">项目列表</div>
					<div class="addPost" @click="addProject" :style="{ background: this.$store.state.themeColor }">
						<i class="el-icon-plus" style="margin-right:10px;"></i>
						<span>新增项目</span>
					</div>
				</div>
				<div class="post_center">
					<div class="selct">
						<el-dropdown @command="selctCatePost" split-button type="primary">
							全部分类
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-for="item in cateList" :key="item._id" :command="item.cate_id">{{ item.name }}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-input style="width:200px;margin-left:20px;" placeholder="请输入内容" v-model="searchPost" @clear="searchPostAllFn" :clearable="true" />
						<el-button @click="searchPostFn" type="primary" icon="el-icon-search" style="margin-left:10px;"></el-button>
					</div>
					<div class="table">
						<el-table :data="tableData" border="" style="width: 100%">
							<el-table-column prop="creattime" label="日期" width="180"></el-table-column>
							<el-table-column prop="name" label="名称" min-width="150"></el-table-column>
							<el-table-column prop="cate_name" label="所属分类" width="120"></el-table-column>
							<!-- <el-table-column prop="city" label="市区" width="120"></el-table-column> -->
							<el-table-column prop="intro" label="项目描述" min-width="290"></el-table-column>
							<!-- <el-table-column prop="zip" label="邮编" width="120"></el-table-column> -->
							<el-table-column label="操作" width="180">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-pagination
						background
						:page-size="limit"
						:total="ProjectTotal"
						@current-change="changePage"
						@prev-click="prevPage"
						@next-click="nextPage"
						layout="prev, pager, next"
					></el-pagination>
				</div>
			</div>
		</el-card>
		<!-- 分类弹框 -->
		<el-dialog title="项目新增/编辑" :visible.sync="projectdialog" size="mini" width="50%" :before-close="cancelProject">
			<el-form ref="form" :hide-required-asterisk="false" :rules="rules" :model="form" label-width="80px" class="demo-ruleForm">
				<el-form-item label-width="80px" prop="name" label="项目名称"><el-input v-model="form.name"></el-input></el-form-item>
				<el-form-item label="项目分类" prop="cate_id">
					<el-select v-model="form.cate_id" placeholder="请选择项目分类">
						<el-option v-for="i in cateList" :key="i._id" :label="i.name" :value="i.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="80px" label="项目地址"><el-input v-model="form.porjectUrl"></el-input></el-form-item>
				<el-form-item label-width="80px" label="源码地址"><el-input v-model="form.sourceUrl"></el-input></el-form-item>
				<el-form-item label="主题图" prop="image">
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
				<el-form-item label-width="80px" prop="intro" label="项目描述"><el-input type="textarea" v-model="form.intro"></el-input></el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelProject">取 消</el-button>
				<el-button type="primary" @click="confirmProject">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
	data() {
		return {
			fileImg: '', //海报
			oldimg: '', // 临时存的数据库图片
			disabledUpload: false, // 上传禁用状态
			fileList: [], // 上传图片
			dialogImageUrl: '',
			uploadImgNum: 1, // 允许上传数量
			dialogVisible: false,
			searchPost: '',
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			cateList: [], // 项目分类
			tableData: [],
			currentPage: 1, // 当前页数
			total: 0, // 总条数
			limit: 6, // 每页显示条数
			ProjectTotal: 0,
			projectdialog: false, // 项目弹框
			dialogStatu: '',
			form: {
				cate_id: '',
				name: '',
				intro: '',
				porjectUrl: '',
				sourceUrl: ''
			},
			rules: {
				name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
				cate_id: [{ required: true, message: '请选择项目分类', trigger: 'change' }],
				intro: [{ required: true, message: '请输入项目描述', trigger: 'blur' }]
			}
		};
	},
	components: {
		mavonEditor
	},
	created() {
		this.getCateList();
	},
	methods: {
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
			// if(this.fileList.length==0){
			// 	this.$message.warning('请选择图片文件')
			// 	return
			// }
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
		// 项目分类
		async getCateList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getProjectCate',
				event: {}
			});
			console.log(res, '获取分类');
			if (!res.statu) return;
			this.cateList = res.data;
			this.getPorjectList();
		},
		// 项目列表
		async getPorjectList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getProjectList',
				event: {
					page: this.currentPage,
					limit: this.limit,
					cate_id: -1
				}
			});
			console.log(res, '获取项目列表');
			if (res.data.length == 0) return;
			this.tableData = res.data;
			this.ProjectTotal = res.total;
			this.tableData.forEach(item => {
				item.creattime = this.Time.formatTime(item.creattime, 'Y-M-D h:m:s');
				this.cateList.forEach(item2 => {
					if (item2.cate_id === item.cate_id) {
						item.cate_name = item2.name;
					}
				});
			});
		},
		// 项目栏选择分类
		selctCatePost(command) {
			console.log(command);
		},
		// 搜索项目
		searchPostFn() {
			console.log(this.searchPost, '搜索关键词');
		},
		searchPostAllFn(val) {
			console.log(val, '搜索全部');
		},
		// 新增项目
		addProject() {
			this.dialogStatu = 'add';
			// 初始化图片
			this.fileList=[]
			this.fileImg=''
			this.oldimg=''
			this.projectdialog = true;
		},
		// 编辑项目
		handleEdit(index, row) {
			console.log(index, row);
			
			
			this.form = {
				id: row._id,
				cate_id: row.cate_id,
				name: row.name,
				intro: row.intro,
				porjectUrl: row.porjectUrl,
				sourceUrl: row.sourceUrl
			};
			this.projectdialog = true;
			this.dialogStatu = 'edit';
						
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
			}
		},
		// 删除项目
		async handleDelete(index, row) {
			console.log(index, row);
			const res = await this.Api.sendUniCloud(this, {
				model: 'removeProject',
				event: { id: row._id }
			});
			console.log(res, '删除项目');
			if (!res.statu) return this.Api.Toast('删除失败', 'error', this);
			this.Api.Toast(res.mes, 'success', this);
			this.getPorjectList();
		},
		// 改变当前页
		changePage(val) {
			console.log(val);
			this.currentPage = val;
			this.getPorjectList();
		},
		// 取消
		cancelProject() {
			this.$refs.form.clearValidate();
			this.form = {};
			this.projectdialog = false;
			// 初始化图片
			this.fileList=[]
			this.fileImg=''
			this.oldimg=''
			this.disabledUpload=false
		},
		async confirmProject() {
			// 执行上传
			if(this.oldimg!=this.fileList[0].url){
				const uploadflag=await this.uploadImg()
				if(!uploadflag) return this.$message.error('上传图片失败')
			}
			
			
			
			this.$refs['form'].validate(async valid => {
				if (!valid) return this.Api.Toast('请填写完整的内容', 'warning', this);
				// 提交数据库
				if (this.dialogStatu === 'add') {
					console.log(this.form, '新增');
					// 新增
					const res = await this.Api.sendUniCloud(this, {
						model: 'addProject',
						event: {
							name: this.form.name,
							intro: this.form.intro,
							cate_id: this.form.cate_id,
							porjectUrl: this.form.porjectUrl,
							sourceUrl: this.form.sourceUrl,
							creattime: new Date().getTime(),
							imageUrl: this.fileImg,
							delete_date: '0'
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
						model: 'updateProject',
						event: {
							id: this.form.id,
							data: {
								name: this.form.name,
								intro: this.form.intro,
								cate_id: this.form.cate_id,
								porjectUrl: this.form.porjectUrl,
								sourceUrl: this.form.sourceUrl,
								update_date: new Date().getTime(),
								imageUrl: this.fileImg
							}
						}
					});
					console.log(res, '编辑结果');
					if (!res.statu) return this.$message.error('编辑失败');
					this.$message.success(res.mes ? res.mes : '编辑成功');
				}
				this.getCateList();
				this.projectdialog = false;
				this.form = {};
			});
		}
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
	.el-textarea__inner {
		min-height: 100px;
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
