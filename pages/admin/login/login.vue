<template>
	<div class="component_login">
		<div class="login_box">
			<div class="left_img"><img src="../../../static/login2.png" alt="" style="width:100%;height:100%" /></div>
			<!-- 头像 -->
			<!-- <div class="avatar_box">
        <img src="../assets/logo.png" alt />
			</div>-->
			<!-- 输入框 -->
			<!-- 登录 -->
			<div class="right_box">
				<div class="right_form">
					<el-form class="login_form" :label-position="labelPosition" label-width="65px" ref="loginForm" :model="loginForm" :rules="loginFormRules">
						<div class="title">
							<i class="el-icon-s-platform"></i>
							登录系统
						</div>
						<!-- 账号 -->
						<el-form-item label="账号" prop="username" class="username_input">
							<el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="iconfont icon-user"></el-input>
						</el-form-item>
						<!-- 密码 -->
						<el-form-item label="密码" prop="password" class="username_input">
							<el-input
								:type="textType"
								v-model="loginForm.password"
								prefix-icon="iconfont icon-3702mima"
								@keyup.native.enter="login('loginForm')"
								autocomplete="off"
								placeholder="请输入密码"
							>
								<i slot="suffix" class="el-input__icon el-icon-view btn-eye" @click="changeType"></i>
							</el-input>
						</el-form-item>
						<!-- 按钮区域 -->
						<el-form-item class="btns"><el-button class="loginIn" @click="login('loginForm')" :loading="loading">登录</el-button></el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			labelPosition: 'left',
			loginForm: {
				username: '',
				password: ''
			},
			// 表单验证规则
			loginFormRules: {
				// 验证用户名
				username: [{ required: true, message: '请输入账号', trigger: 'blur' }, { min: 3, max: 20, message: '3 to 20 characters in length', trigger: 'blur' }],
				// 验证密码
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 3, max: 6, message: '3 to 6 characters in length', trigger: 'blur' }]
			},
			loading: false,
			textType: 'password'
		};
	},
	methods: {
		async login(formName) {
			this.$refs[formName].validate(async valid => {
				if (!valid) return this.$message.warning('请输入账号密码');

				this.loading = true;
				const res = await this.Api.sendUniCloud(this, {
					model: 'login',
					event: this.loginForm
				});

				console.log(res, '登录');
				if (!res.statu) {
					this.loading = false;
					this.$message({
						showClose: true,
						message: res.mes,
						type: 'warning',
						duration: 1000
					});
					return;
				}
				this.$store.commit('login', res.data);
				this.$message({
					message: res.mes,
					type: 'success',
					duration: 1000,
					onClose: () => {
						uni.redirectTo({
							url: '../index/index'
						});
					}
				});
			});
		},
		changeType() {
			this.textType = this.textType === 'password' ? 'text' : 'password';
		}
	}
};
</script>

<style lang="less" scoped>
.component_login {
	width: 100%;
	height: 100%;
	background: url(../../../static/background.jpg) no-repeat;
	background-size: cover;
	position: absolute;
	overflow: hidden;
	.login_box {
		width: 650px;
		height: 350px;
		background-color: #fffff0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left_img {
			width: 250px;
			height: 350px;
		}
		.right_box {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			.login_form {
				margin: 0 10px;
				.btns {
					display: flex;
					justify-content: center;
					.loginIn {
						width: 200px;
					}
				}
				.title {
					text-align: center;
					font-size: 16px;
					color: #000;
					height: 35px;
					line-height: 35px;
					i {
						color: #75b9e6;
						margin-right: 10px;
					}
				}
			}
		}

	}
}
</style>
//
<style lang="less">
// 	.el-form-item__content {
// 		width: 100%!important;
// 	}
</style>
