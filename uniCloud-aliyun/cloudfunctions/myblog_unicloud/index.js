'use strict'
const db = uniCloud.database()

// let aboutMe = require('./aboutMe.js')
// let log = require('./log.js')
// let article = require('./article.js')
// let project = require('./project.js')
let login = require('./login.js')
// let desktheme = require('./desktheme.js')
// let websizeCount = require('./websizeCount.js')
// let webLink = require('./webLink.js')

exports.main = async (event, context) => { // event={mode:getArticleList//要请求的方法,传参}
	if (event.model == 'login') { // 登录-
		return await login.login(db, event.event, context)
	}
	// 访问量
	if (event.model == 'getwebsizeCount') { // 查询访问量-
		return await websizeCount.getWebsizeCount(db, event.event, context)
	}
	if (event.model == 'updatewebsizeCount') { // 查询访问量-
		return await websizeCount.updateWebsizeCount(db, event.event, context)
	}
	// 友情链接
	if (event.model == 'getWebLink') { // 查询友情链接-
		return await webLink.getWebLink(db, event.event, context)
	}
	if (event.model == 'updateWebLink') { // 修改友情链接-
		return await webLink.updateWebLink(db, event.event, context)
	}
	if (event.model == 'removeWebLink') { // 修改友情链接-
		return await webLink.removeWebLink(db, event.event, context)
	}
	if (event.model == 'addWebLink') { // 添加友情链接-
		return await webLink.addWebLink(db, event.event, context)
	}
	// 账户
	if (event.model == 'getAccountList') { // 查询账户-
		return await login.getAccountList(db, event.event, context)
	}
	if (event.model == 'addAccount') { // 新增账户-
		return await login.addAccount(db, event.event, context)
	}
	if (event.model == 'updateAccount') { // 编辑账户-
		return await login.updateAccount(db, event.event, context)
	}
	if (event.model == 'removeAccount') { // 删除账户-
		return await login.removeAccount(db, event.event, context)
	}
	// 设置前台主题色
	if (event.model == 'getDeskTheme') { // 查询前台主题色-
		return await desktheme.getDeskTheme(db, event.event, context)
	}
	if (event.model == 'updateDeskTheme') { // 修改前台主题色-
		return await desktheme.updateDeskTheme(db, event.event, context)
	}
	// 关于我
	if (event.model == 'getMeMessage') { // 获取我的基本信息-
		return await aboutMe.getMeMessage(db, event.event, context)
	}
	if (event.model == 'updateMeMessage') { // 修改我的基本信息-
		return await aboutMe.updateMeMessage(db, event.event, context)
	}
	if (event.model == 'getMeSkill') { // 获取我的技能-
		return await aboutMe.getMeSkill(db, event.event, context)
	}
	if (event.model == 'addMeSkill') { // 添加我的技能-
		return await aboutMe.addMeSkill(db, event.event, context)
	}
	if (event.model == 'updateMeSkill') { // 修改我的技能-
		return await aboutMe.updateMeSkill(db, event.event, context)
	}
	if (event.model == 'removeMeSkill') { // 删除我的技能-
		return await aboutMe.removeMeSkill(db, event.event, context)
	}
	// 日志
	if (event.model == 'getlogList') { // 获取日志列表-
		return await log.getlogList(db, event.event, context)
	}
	if (event.model == 'getlog') { // 获取日志-
		return await log.getlog(db, event.event, context)
	}
	if (event.model == 'updatelog') { // 编辑日志-
		return await log.updatelog(db, event.event, context)
	}
	// 文章
	if (event.model == 'getArticleList') { // 获取文章列表-
		return await article.getArticleList(db, event.event, context)
	}
	if (event.model == 'getArticle') { // 获取指定文章-
		return await article.getArticle(db, event.event, context)
	}
	if (event.model == 'getArticleReadMax') { // 获取文章排行-
		return await article.getArticleReadMax(db, event.event, context)
	}
	if (event.model == 'getArticleTimeList') { // 获取文章时间内统计-
		return await article.getArticleTimeList(db, event.event, context)
	}
	if (event.model == 'addArticle') { // 添加文章
		return await article.addArticle(db, event.event, context)
	}
	if (event.model == 'updateArticle') { // 编辑文章
		return await article.updateArticle(db, event.event, context)
	}
	if (event.model == 'removeArticle') { // 删除文章
		return await article.removeArticle(db, event.event, context)
	}
	if (event.model == 'getArticleCate') { // 获取文章分类
		return await article.getArticleCate(db, event.event, context)
	}
	if (event.model == 'addArticleCate') { // 添加文章分类
		return await article.addArticleCate(db, event.event, context)
	}
	if (event.model == 'updateArticleCate') { // 修改文章分类
		return await article.updateArticleCate(db, event.event, context)
	}
	if (event.model == 'removeArticleCate') { // 删除文章分类
		return await article.removeArticleCate(db, event.event, context)
	}
	if (event.model == 'updateArticleGiveNum') { // 文章点赞
		return await article.updateArticleGiveNum(db, event.event, context)
	}
	if (event.model == 'updateArticleReadNum') { // 文章阅读
		return await article.updateArticleReadNum(db, event.event, context)
	}
	// 项目--------------------------------------------------------------
	if (event.model == 'getProjectList') { // 获取项目列表-
		return await project.getProjectList(db, event.event, context)
	}
	if (event.model == 'addProject') { // 添加项目
		return await project.addProject(db, event.event, context)
	}
	if (event.model == 'updateProject') { // 编辑项目
		return await project.updateProject(db, event.event, context)
	}
	if (event.model == 'removeProject') { // 删除项目
		return await project.removeProject(db, event.event, context)
	}
	if (event.model == 'getProjectCate') { // 获取项目分类
		return await project.getProjectCate(db, event.event, context)
	}
	if (event.model == 'addProjectCate') { // 添加项目分类
		return await project.addProjectCate(db, event.event, context)
	}
	if (event.model == 'updateProjectCate') { // 修改项目分类
		return await project.updateProjectCate(db, event.event, context)
	}
	if (event.model == 'removeProjectCate') { // 删除项目分类
		return await project.removeProjectCate(db, event.event, context)
	}
}
