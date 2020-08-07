

// 获取文章列表
exports.getArticleList = async (db, event, context) => {
	const articleReadNum = db.collection('articleReadNum')
	const articleGiveNum = db.collection('articleGiveNum')
	const collectionCate = db.collection('articleCate')
	const collection = db.collection('article')
	if (event.cate_id == -1) {
		var total = await collection.where({
			delete_date: db.command.eq('0')
		}).count()

		var res = await collection.where({
			delete_date: db.command.eq('0')
		}).field({
			'content': false
		}).orderBy('create_date', 'desc').skip((event.page - 1) * event.limit).limit(event.limit).get()

	} else {
		var total = await collection.where({
			delete_date: db.command.eq('0'),
			cate_id: event.cate_id
		}).count()

		var res = await collection.where({
			delete_date: db.command.eq('0'),
			cate_id: event.cate_id
		}).field({
			'content': false
		}).orderBy('create_date', 'desc').skip((event.page - 1) * event.limit).limit(event.limit).get()


	}



	var cateres = await collectionCate.field({
		'content': false
	}).orderBy('cate_id', 'asc').get()
	var articleReadNumres = await articleReadNum.get()
	var articleGiveNumres = await articleGiveNum.get()

	res.data.forEach(item1 => {

		cateres.data.forEach(item2 => {
			if (item1.cate_id == item2.cate_id) {
				item1.cate_name = item2.name
			}
		})
		item1.readNum = 0
		articleReadNumres.data.forEach(item3 => {
			if (item3.articleId == item1._id) {
				item1.readNum = item3.ReadNum
			}
		})
		item1.GiveNum = 0
		articleGiveNumres.data.forEach(item4 => {
			if (item4.articleId == item1._id) {
				item1.GiveNum = item4.GiveNum
			}
		})
	})

	return {
		total: total.total,
		data: res.data,
		statu: true,
		mes: '获取成功'
	}
}

// 获取指定文章
exports.getArticle = async (db, event, context) => {
	const collection = db.collection('article')
	const articleReadNum = db.collection('articleReadNum')
	const articleGiveNum = db.collection('articleGiveNum')
	const collectionCate = db.collection('articleCate')

	const res = await collection.doc(event.id).get()
	const articleres = await collectionCate.where({
		cate_id: res.data[0].cate_id
	}).get()
	if (articleres.data.length > 0) {
		res.data[0].cate_name = articleres.data[0].name
	}
	var articleReadNumres = await articleReadNum.where({
		articleId: event.id
	}).get()
	var articleGiveNumres = await articleGiveNum.where({
		articleId: event.id
	}).get()
	if (articleReadNumres.data.length == 0) { // 没查询到
		res.data[0].readNum = 0
	} else {
		res.data[0].readNum = articleReadNumres.data[0].ReadNum
	}
	if (articleGiveNumres.data.length == 0) { // 没查询到
		res.data[0].GiveNum = 0
	} else {
		res.data[0].GiveNum = articleGiveNumres.data[0].GiveNum
	}
	return { //affectedDocs=1
		statu: true,
		mes: '获取成功',
		data: res
	}
}
// 获取文章排行
exports.getArticleReadMax = async (db, event, context) => {
	const collection = db.collection('article')
	const articleReadNum = db.collection('articleReadNum')
	const collectionCate = db.collection('articleCate')
	articleres = await collection.field({
		'content': false
	}).get()
	articleCateres = await collection.get()
	var articleReadNumres = await articleReadNum.orderBy('ReadNum', 'desc').skip((event.page - 1) * event.limit).limit(
		event.limit).get()

	let activedata = []

	articleReadNumres.data.forEach(item => {
		articleres.data.forEach(item1 => {
			if (item.articleId == item1._id) {
				item1.ReadNum = item.ReadNum
				activedata.push(item1)
			}
		})
	})

	return { //affectedDocs=1
		statu: true,
		mes: '获取成功',
		data: activedata
	}
}
// static transformTimeStr(date) { // '2020-10-10'
// 	date = date.substring(0, 19);
// 	date = date.replace(/-/g, '/');
// 	return new Date(date).getTime()
// }


// 获取时间内文章统计 // event.timenum=12
exports.getArticleTimeList = async (db, event, context) => {
	const collection = db.collection('article')
	const collectionCate = db.collection('articleCate')
	articleres = await collection.field({
		'content': false,
		'imageUrl': false,
		'info': false,
	}).orderBy('create_date', 'desc').get()

	let nowMounth = new Date().getMonth() + 1 // 当前时间7
	let nowYear = new Date().getFullYear()    // 当前2020    
	let oldtimeStr = '' // 2020-7 2020-6 2020-5 2020-4 2020-3 2020-2 2020-1 2019-12 2019-11 2019-10
	if (nowMounth >= event.timenum) {
		oldtimeStr = (nowYear) + '-' + (nowMounth - event.timenum + 1) + '-' + '01'
	} else {
		let m=12-(event.timenum-nowMounth)+ 1
		m=m.length==2?m:'0'+m
		oldtimeStr = (nowYear - 1) + '-' + m + '-' + '01'
	}

	oldtimeStr = oldtimeStr.substring(0, 19);
	oldtimeStr = oldtimeStr.replace(/-/g, '/');

	let oldtime = new Date(oldtimeStr).getTime()
	let articledata = []
	// 筛选满足oldtime时间以后的文章
	articleres.data.forEach(item => {
		if (item.create_date >= oldtime) {
			articledata.push(item)
		}
	})
	// 文章加时间字符串
	articledata.forEach((item,index)=>{
		let year=new Date(item.create_date).getFullYear()
		let mounth=new Date(item.create_date).getMonth()+1
		mounth=mounth.length==2?mounth:'0'+mounth
		articledata[index].createTimeStr=year+'-'+mounth
	})
	
	let timestr=[]
	let yearstr=oldtimeStr.split('/')[0] // 2019
	let mounthstr=oldtimeStr.split('/')[1] // 08
	if(Number(mounthstr)+event.timenum<=12){
		for(let i=0;i<event.timenum;i++){
			let newmountstr=(Number(mounthstr)+i)
			newmountstr=newmountstr.length==2?newmountstr:'0'+newmountstr
			let str=yearstr+'-'+newmountstr
			timestr.push({
				timeStr:str,
				value:0
			})
		}
		
	}else {
		
		for(let i=0;i<event.timenum;i++){ // num=12  m=8  
			let newyearstr=yearstr // 2019
			let newmountstr=(Number(mounthstr)+i) //8
			let diffvalue=12-Number(mounthstr) //12-8=4
			if(i>diffvalue){
				newmountstr=i-diffvalue
				newyearstr=Number(yearstr)+1
			}
			 // i=0 2019-08 i=1 2019-09 i=2 2019-10 i=3 2019-11 i=4 2019-12
			 // i=5 5-4=1 20
			let str=newyearstr+'-'+newmountstr
			timestr.push({
				timeStr:str,
				value:0
			})
		}
	}
	timestr.forEach((item,index)=>{
		if(item.timeStr.split('-')[1].length==1){
			item.timeStr=item.timeStr.split('-')[0]+'-'+'0'+item.timeStr.split('-')[1]
		}
		articledata.forEach((item1,index1)=>{
			if(item1.createTimeStr==item.timeStr){
				timestr[index].value=timestr[index].value+1
			}
		})
		
	})
	return { //affectedDocs=1
		statu: true,
		mes: '获取成功',
		// data: articledata,
		timestr:timestr,
		// oldtimeStr:oldtimeStr
	}
}
// 添加文章
exports.addArticle = async (db, event, context) => {
	const collection = db.collection('article')
	var res = await collection.add(event)
	return {
		statu: true,
		mes: '添加成功'
	}
}
// 编辑文章
exports.updateArticle = async (db, event, context) => {
	const collection = db.collection('article')
	if (event.id instanceof Array) {
		for (let i = 0; i < event.id.length; i++) {
			await collection.doc(event.id[i]).update({
				delete_date: event.delete_date
			})
		}
	} else {
		await collection.doc(event.id).update(event.data)
	}
	return {
		statu: true,
		mes: '修改成功'
	}
}
// 删除文章
exports.removeArticle = async (db, event, context) => {
	const collection = db.collection('article')
	const res = await collection.doc(event.id).remove()
	if (res.deleted === 1) {
		return {
			statu: true,
			mes: '删除成功'
		}
	} else {
		return {
			statu: false,
			mes: '删除失败'
		}
	}
}
// 获取文章分类
exports.getArticleCate = async (db, event, context) => {
	const collectionCate = db.collection('articleCate')
	const collectionPost = db.collection('article')
	var cateres = await collectionCate.field({
		'content': false
	}).orderBy('cate_id', 'asc').get()
	var postres = await collectionPost.get()
	let cateData = cateres.data
	// 遍历筛选计算出当前分类的文章数
	cateData.forEach(item => {
		item.postnum = 0
		postres.data.forEach(item2 => {
			if (item2.cate_id == item.cate_id) {
				item.postnum++
			}
		})
	})
	return {
		data: cateData,
		statu: true,
		mes: '获取成功'
	}
}
// 添加文章分类
exports.addArticleCate = async (db, event, context) => {
	const collection = db.collection('articleCate')
	var res = await collection.add(event)
	return {
		res: res,
		statu: true,
		mes: '添加成功'
	}
}
// 修改文章分类
exports.updateArticleCate = async (db, event, context) => {
	const collection = db.collection('articleCate')
	await collection.doc(event.id).update(event.data)
	return {
		statu: true,
		mes: '修改成功'
	}
}
// 删除文章分类
exports.removeArticleCate = async (db, event, context) => {
	const collection = db.collection('articleCate')
	const res = await collection.doc(event.id).remove()
	if (res.deleted === 1) {
		return {
			statu: true,
			mes: '删除成功'
		}
	} else {
		return {
			statu: false,
			mes: '删除失败'
		}
	}
}
// 点赞
exports.updateArticleGiveNum = async (db, event, context) => {
	const articleGiveNum = db.collection('articleGiveNum')
	const res = await articleGiveNum.where({
		articleId: event.articleId
	}).get()
	let successres = null
	if (res.data && res.data.length == 0) {
		// 第一次点赞
		// 新增记录
		successres = await articleGiveNum.add({
			GiveNum: 1,
			articleId: event.articleId
		})
	} else {
		// 更新记录
		let NewGiveNum = res.data[0].GiveNum + 1
		successres = await articleGiveNum.doc(res.data[0]._id).update({
			GiveNum: NewGiveNum
		})
	}

	return {
		statu: true,
		data: successres,
		mes: '点赞成功'
	}
}
// 阅读
exports.updateArticleReadNum = async (db, event, context) => { //{articleId:articleId}
	const articleReadNum = db.collection('articleReadNum')
	const res = await articleReadNum.where({
		articleId: event.articleId
	}).get()
	let successres = null
	if (res.data && res.data.length == 0) {
		// 第一次阅读
		// 新增记录
		successres = await articleReadNum.add({
			ReadNum: 1,
			articleId: event.articleId
		})
	} else {
		// 更新记录
		let NewReadNum = res.data[0].ReadNum + 1
		successres = await articleReadNum.doc(res.data[0]._id).update({
			ReadNum: NewReadNum
		})
	}

	return {
		statu: true,
		data: successres,
		mes: '阅读更新成功'
	}
}


