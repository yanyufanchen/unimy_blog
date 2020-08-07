<template>
	<div class="article">
		<div class="articleForm">
			<el-form ref="articleObj" :rules="rules" :label-position="labelPosition" :model="articleObj" label-width="80px">
				<el-form-item label="文章标题" prop="title"><el-input v-model="articleObj.title"></el-input></el-form-item>
				<el-form-item label="文章分类" prop="cate_id">
					<el-select v-model="articleObj.cate_id" placeholder="请选择文章分类">
						<el-option v-for="i in cateList" :key="i._id" :label="i.name" :value="i.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述" prop="info">
				    <el-input type="textarea" v-model="articleObj.info"></el-input>
				  </el-form-item>
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
				<el-form-item>
					<div id="editor"><mavon-editor prop="content" style="height: 100%;width: 100%;" v-model="articleObj.content"></mavon-editor></div>
				</el-form-item>
				<el-form-item>
					<div class="btn">
						<el-button type="warning" @click="oncancel">取消</el-button>
						<el-button type="primary" @click="submitForm('articleObj')">提交</el-button>
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
			fileImg: '', //海报
			oldimg: '', // 临时存的数据库图片
			disabledUpload: false, // 上传禁用状态
			fileList: [], // 上传图片
			uploadImgNum: 1, // 允许上传数量
			dialogImageUrl: '',
			dialogVisible: false,
			labelPosition: 'left',
			cateList: [], // 文章分类
			articleObj: {
				cate_id: '',
				create_date: '',
				delete_date: '0',
				content: '',
				title: '',
				info: ''
			}, // 当前文章
			rules: {
				title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
				cate_id: [{ required: true, message: '请选择文章分类', trigger: 'change' }],
				info: [{ required: true, message: '请输入文章描述', trigger: 'blur' }],
				content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
			}
		};
	},
	components: {
		mavonEditor
	},
	async created() {
		this.getCateList();
		if (this.$store.state.articleObj && this.$store.state.articleObj.statu == 'edit') {
			console.log('编辑文章');
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticle',
				event: {
					id: this.$store.state.articleObj.id
				}
			});
			console.log(res, '请求云函数');
			this.articleObj = {
				id: res.data.data[0]._id,
				cate_id: res.data.data[0].cate_id,
				create_date: res.data.data[0].create_date,
				delete_date: res.data.data[0].delete_date,
				content: res.data.data[0].content,
				title: res.data.data[0].title,
				info: res.data.data[0].info
			};
			if(res.data.data[0].imageUrl){
				this.fileList=[{url:res.data.data[0].imageUrl}]
				this.fileImg=res.data.data[0].imageUrl
				this.oldimg=res.data.data[0].imageUrl
				this.disabledUpload=true
			}
			
		}
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
		// 文章分类
		async getCateList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleCate',
				event: {}
			});
			console.log(res, '获取分类');
			if (!res.statu) return;
			this.cateList = res.data;
		},
		// 添加/编辑文章
		async submitArticle() {
			// console.log(this.oldimg,this.fileList[0].url)
			if(this.oldimg!=this.fileList[0].url){
				const uploadflag=await this.uploadImg()
				if(!uploadflag) return this.$message.error('上传图片失败')
			}
			if (this.$store.state.articleObj && this.$store.state.articleObj.statu == 'edit') {
				console.log('提交编辑文章');
				const res = await this.Api.sendUniCloud(this, {
					model: 'updateArticle',
					event: {
						id: this.articleObj.id,
						data: {
							cate_id: this.articleObj.cate_id,
							create_date: this.articleObj.create_date,
							update_date: new Date().getTime(),
							delete_date: this.articleObj.delete_date,
							content: this.articleObj.content,
							title: this.articleObj.title,
							info: this.articleObj.info,
							imageUrl: this.fileImg
						}
					}
				});
				console.log(res, '请求云函数');
				if (!res.statu) return this.Api.Toast('编辑失败', 'warning', this);
				this.Api.Toast(res.mes, 'success', this);
				this.$emit('openPage', 'articleList', this);
				return;
			}
			this.articleObj.create_date = new Date().getTime();
			console.log(this.articleObj, '提交添加文章');
			const res = await this.Api.sendUniCloud(this, {
				model: 'addArticle',
				event: this.articleObj
			});
			console.log(res, '请求云函数');
			if (!res.statu) return this.Api.Toast('添加失败', 'warning', this);
			this.Api.Toast('添加成功', 'success', this);
			this.$emit('openPage', 'articleList');
		},
		oncancel() {
			this.$emit('openPage', 'articleList');
			this.articleObj = [];
		},
		async submitForm(formName) {
			// 检测表单
			this.$refs[formName].validate(valid => {
				console.log(this.articleObj, valid, '检测');
				if (!valid) {
					this.Api.Toast(this.rules.title[0].message, 'warning', this);
					return false;
				}
				if (!this.articleObj.cate_id) {
					this.Api.Toast(this.rules.cate_id[0].message, 'warning', this);
					return;
				}
				if (!this.articleObj.content) {
					this.Api.Toast(this.rules.content[0].message, 'warning', this);
					return;
				}
				console.log(this.articleObj, '通过');
				this.submitArticle();
			});
		}
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
