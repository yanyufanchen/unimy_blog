<template>
	<el-menu
		class="menu-nav"
		:unique-opened="true"
		default-active="index"
		background-color="#20222A"
		text-color="#fff"
		:active-text-color="this.$store.state.themeColor"
		:collapse="isCollapse"
	>
		<el-menu-item @click="openPage(item.index)" v-if="!item.children" v-for="item in menus" :index="item.index" :key="item.index">
			<i :class="item.icon"></i>
			<span slot="title">{{ item.name }}</span>
		</el-menu-item>
		<el-submenu v-else :index="item.index" :key="item.index">
			<template slot="title">
				<i :class="item.icon"></i>
				<span slot="title">{{ item.name }}</span>
			</template>
			<el-menu-item @click="openPage(children.index)" v-for="children in item.children" :index="children.index" :key="children.index">{{ children.name }}</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
export default {
	props: ['isCollapse'],
	data() {
		return {
			menus: [
				{
					name: '系统首页',
					index: 'home',
					icon: 'el-icon-s-home'
				},
				{
					name: '个人信息',
					index: 'about_me',
					icon: 'el-icon-user-solid',
					children: [
						{
							name: '基本信息',
							index: 'my_message'
						},
						{
							name: '技术栈',
							index: 'my_skill'
						},
						{
							name: '日志相关',
							index: 'log'
						}
					]
				},
				{
					name: '文章管理',
					index: 'article',
					icon: 'el-icon-document-copy',
					children: [
						{
							name: '文章列表',
							index: 'articleList'
						},
						{
							name: '文章分类',
							index: 'articleCate'
						}
					]
				},
				{
					name: '项目管理',
					index: 'project',
					icon: 'el-icon-s-order',
					children: [
						{
							name: '项目列表',
							index: 'projectList'
						},
						{
							name: '项目分类',
							index: 'projectCate'
						}
					]
				},
				{
					name: '系统设置',
					index: 'system',
					icon: 'el-icon-setting',
					children: [
						{
							name: '账户管理',
							index: 'account'
						},
						{
							name: '前台皮肤',
							index: 'deskColor'
						},
						{
							name: '友情链接',
							index: 'webLink'
						}
					]
				}
			]
		};
	},
	methods: {
		openPage(page) {
			this.$emit('openPage', page);
		}
	}
};
</script>

<style lang="less" scoped>
.el-menu {
	border: none;
}

.menu-nav:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>
