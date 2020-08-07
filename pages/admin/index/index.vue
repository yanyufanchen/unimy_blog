<template>
	<el-container class="index-box">
		<el-aside width="asideWidth"><menus @openPage="openPage" :isCollapse="isCollapse" /></el-aside>
		<el-container>
			<el-header><headers :user="user" :isCollapse="isCollapse" /></el-header>
			<el-main>
				<Home v-if="currentPage === 'home'" />
				<Message @openPage="openPage" v-if="currentPage === 'my_message'" />
				<Skill @openPage="openPage" v-if="currentPage === 'my_skill'" />
				<Log @openPage="openPage" v-if="currentPage === 'log'" />
				<LogDetail @openPage="openPage" v-if="currentPage === 'logdetail'" />
				<ArticleList @openPage="openPage" v-if="currentPage === 'articleList'" />
				<Article @openPage="openPage" v-if="currentPage === 'article'" />
				<ArticleCate v-if="currentPage === 'articleCate'" />
				<ProjectList @openPage="openPage" v-if="currentPage === 'projectList'" />
				<ProjectCate @openPage="openPage" v-if="currentPage === 'projectCate'" />
				<Account @openPage="openPage" v-if="currentPage === 'account'" />
				<DeskColor @openPage="openPage" v-if="currentPage === 'deskColor'" />
				<WebLink @openPage="openPage" v-if="currentPage === 'webLink'" />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { mapState } from 'vuex';

import Menus from '@/components/admin/menus/menus';
import Headers from '@/components/admin/header/header';
import Home from '@/components/admin/page/home/home';
import Message from '@/components/admin/page/about_me/message';
import Skill from '@/components/admin/page/about_me/skill';
import Log from '@/components/admin/page/about_me/log';
import LogDetail from '@/components/admin/page/about_me/logdetail';
import ArticleList from '@/components/admin/page/article/articleList';
import Article from '@/components/admin/page/article/article';
import ArticleCate from '@/components/admin/page/article/articleCate';
import ProjectList from '@/components/admin/page/project/projectList';
import ProjectCate from '@/components/admin/page/project/projectCate';
import Account from '@/components/admin/page/system/account';
import DeskColor from '@/components/admin/page/system/deskColor';
import WebLink from '@/components/admin/page/system/webLink';
export default {
	data() {
		return {
			isRouterAlive: true,
			currentPage: 'home'
		};
	},
	computed: {
		...mapState(['user', 'isCollapse'])
	},
	components: {
		Menus,
		Headers,
		Home,
		Message,
		Skill,
		Log,
		LogDetail,
		ArticleList,
		Article,
		ArticleCate,
		ProjectList,
		ProjectCate,
		Account,
		DeskColor,
		WebLink
	},
	onLoad() {
		console.log(!this.$store.user,'后台启动')
		if (!this.$store.user) {
			if (!uni.getStorageSync('user')){
				// this.Uni.navigateTo('/pages/admin/login/login')
				// 强制前往登录页
				return
			}
			this.$store.commit('setUser', uni.getStorageSync('user'));
		}
	},
	methods: {
		openPage(page) {
			console.log(page, 'tab');
			this.currentPage = page;
		}
	}
};
</script>

<style lang="less" scoped>
uni-page-body {
	height: 100%;
}
.index-box {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;

	.el-container {
		height: 100%;

		.el-main {
			height: 100%;
		}
	}

	.el-aside {
		background-color: #20222a;
		// height: 100vh;
		min-height: 100%;
	}

	.el-header {
		border-bottom: 1px solid #f6f6f6;
		box-sizing: border-box;
		background-color: #fff;
		line-height: 60px;
	}
}
</style>
