<template>
	<div class="message">
		<el-card class="about_me">
			<div class="header">
				<span class="title">头像：</span>
				<el-avatar class="img" :size="100" :src="fileImg ? fileImg : circleUrl"></el-avatar>
				<div class="uploadImg">
					<el-upload
						ref="upload"
						class="upload-demo"
						action="https://jsonplaceholder.typicode.com/posts/"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						:on-change="progressImg"
						:file-list="fileList"
						:auto-upload="false"
						:limit="uploadImgNum"
						list-type="picture"
					>
						<el-button slot="trigger" size="small" type="primary">{{ fileList.length > 0 ? '替换头像' : '选择头像' }}</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
			</div>
			<div class="from" style="width:500px;margin-top:30px;">
				<el-form :label-position="labelPosition" label-width="80px" :rules="rules" ref="ruleForm" :model="ruleForm">
					<el-form-item label="昵称" prop="nickname"><el-input v-model="ruleForm.nickname"></el-input></el-form-item>
					<el-form-item label="出生日期" required>
						<el-col :span="11">
							<el-form-item prop="date1">
								<el-date-picker
									type="date"
									placeholder="选择日期"
									v-model="ruleForm.date1"
									:default-value="ruleForm.date1"
									format="yyyy-MM-dd"
									value-format="yyyy-MM-dd"
									style="width: 100%;"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-form-item prop="date2">
								<el-time-picker
									placeholder="选择时间"
									v-model="ruleForm.date2"
									:default-value="ruleForm.date2"
									format="HH:mm:ss"
									value-format="HH:mm:ss"
									style="width: 100%;"
								></el-time-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="性别" prop="six">
						<el-select v-model="ruleForm.six" placeholder="请选择">
							<el-option label="男" value="0"></el-option>
							<el-option label="女" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="简介" prop="info"><el-input type="textarea" v-model="ruleForm.info"></el-input></el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
						<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
			fileList: [], // 上传头像
			uploadImgNum: 1, // 允许上传数量
			notImg: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
			labelPosition: 'left',
			messageData: {},
			// 基本信息表单
			fileImg: '',
			ruleForm: {
				nickname: '',
				date1: '',
				date2: '',
				six: '',
				info: ''
			},
			// 基本信息表单验证
			rules: {
				nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }, { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
				date1: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
				date2: [{ type: 'string', required: true, message: '请选择时间', trigger: 'change' }],
				six: [{ required: true, message: '请选择性别', trigger: 'change' }],
				info: [{ required: true, message: '请填写简介', trigger: 'blur' }]
			}
		};
	},
	created() {
		this.getdata();
	},
	methods: {
		// 提交基本信息表单
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) {
					console.log('error submit!!');
					return false;
				}
				console.log(this.ruleForm, this.messageData, '保存表单');
				let time = this.Time.transformTimeStr(this.ruleForm.date1 + ' ' + this.ruleForm.date2);
				console.log(time, '时间戳');
				// 提交服务器
				this.updateMessage(time);
			});
		},
		async updateMessage(time) {
			const message = await this.Api.sendUniCloud(this, {
				model: 'updateMeMessage',
				event: {
					id: this.messageData._id,
					data: {
						birthday: time,
						create_date: new Date().getTime(),
						headerImg: this.fileImg ? this.fileImg : '',
						info: this.ruleForm.info,
						nickname: this.ruleForm.nickname,
						six: this.ruleForm.six
					}
				}
			});
			console.log(message, '保存基本信息');
			if (!message.statu) return this.Api.Toast('编辑失败', 'warning', this);
			this.Api.Toast('编辑成功', 'success', this);
			this.getdata();
		},
		submitUpload() {
			console.log('确定上传');
			if(this.fileList.length==0){
				this.$message.warning('请选择图片文件')
				return
			}
			this.uploadImg(this.fileList[0]);
			// this.$refs.upload.submit();
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
			this.fileList = fileList;
			console.log(this.fileList, '移除图片');
		},
		handlePreview(file) {
			console.log(file,'选择图片');
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
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
		async uploadImg(file) {
			console.log(file,'上传服务器')
			return
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
				return;
			}
			this.fileImg = result.fileID;
			console.log(this.fileImg,'确定上传');
			
		},
		async getdata() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getMeMessage',
				event: {}
			});
			console.log(res, '获取基本信息');
			if (!res.statu) return;
			this.messageData = res.data[0];
			console.log(this.messageData, 1111);
			this.ruleForm.nickname = this.messageData.nickname;
			this.ruleForm.info = this.messageData.info;
			this.ruleForm.six = this.messageData.six
			if (this.messageData.headerImg) {
				this.fileImg = this.messageData.headerImg;
			}
			if (this.messageData.birthday) {
				this.ruleForm.date1 = this.Time.formatTime(this.messageData.birthday, 'Y-M-D');
				this.ruleForm.date2 = this.Time.formatTime(this.messageData.birthday, 'h:m:s');
			}
		}
	}
};
</script>

<style lang="less">
.about_me {
	.header {
		display: flex;
		align-items: flex-start;
		.title {
			margin-right: 36px;
			font-size: 15px;
			color: #333;
		}
		.img {
			margin-right: 10px;
		}
	}
	.from {
		.line {
			text-align: center;
		}
	}
	.saying {
		.title {
		}
		.tag {
		}
	}
}
</style>
