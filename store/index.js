import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let user = uni.getStorageSync('user') || {}
const store = new Vuex.Store({
	state: {
		user: '', // 登录状态
		isCollapse: false ,// 菜单栏状态
		themeColor: '#409EFF', // 后台element默认主题色
		articleObj: {}, // 当前编辑的文章
		logObj: {}, // 当前编辑的日志
		Desktheme: {
			ThemeColor: '#409EFF'
		}, // 前台element默认主题色
		sTitle: '基于uniCloud云开发平台而生的全栈博客项目',
		headerBgimg: '',
		count: '', // 网站访问量
		mymessage:'' // 我的基本信息
	},
	mutations: {
		login(state, user) { // 登录状态存全局
			state.user = user
			// console.log(user,'user')
			uni.setStorageSync('user', user)
		},
		setUser(state, user) { //重新加载初始化登录状态
			state.user = user
			// console.log(user,'user')
			
		},
		logout(state) { // 退出清理登录状态
			state.user = {}
			uni.removeStorageSync('user')
		},
		changeCollapse(state) {
			state.isCollapse = !state.isCollapse
		},
		// 编辑后台在线主题色
		editThemeColor(state,color){
			state.themeColor=color
			// console.log(state.themeColor);
		},
		editArticle(state,centent){ // 编辑存储文章信息
			state.articleObj=centent
			// console.log(state.articleObj);
		},
		editlog(state,centent){ // 编辑日志
			state.logObj=centent
		},
		// 编辑前台主题色
		editTheme(state,Desktheme){
			state.Desktheme=Desktheme
			// console.log(state.Desktheme);
		},
		editHeaderBgimg(state,Bgimg){
			// console.log(Bgimg,'vuex-背景图')
			state.headerBgimg=Bgimg
		},
		// 保存网站访问信息
		saveWebCount(state,count){
			state.count=count
		},
		// 保存我的基本信息
		savemymessage(state,mymessage){
			state.mymessage=mymessage
		}
	}
})

export default store
