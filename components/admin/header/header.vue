<template>
	<div class="header-box">
		<el-row type="flex" justify="space-between">
			<el-col :span="12" class="icon">				
				
					<i :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']" @click="collapse"></i>
					<i class="el-icon-full-screen" @click="Utils.fullScreen"></i>
					<ColorPicker/>
				
			</el-col>
			<el-col :span="6" align="right">
				<el-dropdown trigger="click" class="user-name" @command="handleCommand">
					<span class="el-dropdown-link">
						{{user.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ColorPicker from '@/components/admin/color/colorPicker.vue'
	// import Color from '@/components/admin/color/color.vue'
	export default {
		props: ['isCollapse', 'user'],
		components:{
			ColorPicker,
			// Color
		},
		methods: {
			collapse() {
				this.$store.commit('changeCollapse')
			},
			handleCommand(command) {
				switch (command) {
					case 'logout':
						this.$store.commit('logout')
						uni.redirectTo({
							url: '/pages/admin/login/login'
						})
						break
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.icon {
		font-size: 18px;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		i {
			padding: 0 10px;
		}
		.icon_box {
			
		}
	}

	.user-name {
		margin-left: 20px;
	}
</style>
