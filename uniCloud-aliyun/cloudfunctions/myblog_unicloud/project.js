// 获取项目列表
exports.getProjectList = async (db, event, context) => {
	const collection = db.collection('project')
	if(event.cate_id==-1){
		var total = await collection.where({
			delete_date: db.command.eq('0')
		}).count()
		var res = await collection.orderBy('create_date', 'desc').skip((event.page - 1) * event.limit).limit(event.limit).get()
	}else {
		var total = await collection.where({
			delete_date: db.command.eq('0'),
			cate_id: event.cate_id
		}).count()
		var res = await collection.where({cate_id:event.cate_id}).orderBy('create_date', 'desc').skip((event.page - 1) * event.limit).limit(event.limit).get()
	}
	
	// console.log(res,'项目-------------')
	return {
		total: total.total,
		data: res.data,
		mes: '获取成功',
		statu: true
	}
}
// 添加项目
exports.addProject = async (db, event, context) => {
	const collection = db.collection('project')
	var res = await collection.add(event)
	return {
		statu: true,
		mes: '添加成功'
	}
}
// 编辑项目
exports.updateProject = async (db, event, context) => {
	const collection = db.collection('project')
	if (event.id instanceof Array) {
		for (let i = 0; i < event.id.length; i++) {
			await collection.doc(event.id[i]).update({
				delete_date: event.data.delete_date
			})
		}
	} else {
		await collection.doc(event.id).update(event.data)
	}
	return {
		statu: true,
		msg: '修改成功'
	}
}
// 删除项目
exports.removeProject = async (db, event, context) => {
	const collection = db.collection('project')
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
// 获取项目分类
exports.getProjectCate = async (db, event, context) => {
	const collectionCate = db.collection('projectCate')
	const collectionporject = db.collection('project')
	var cateres = await collectionCate.orderBy('cate_id', 'asc').get()
	var porjectres = await collectionporject.get()
	let cateData = cateres.data
	// 遍历筛选计算出当前分类的文章数
	cateData.forEach(item => {
		item.porjectnum = 0
		porjectres.data.forEach(item2 => {
			if (item2.cate_id == item.cate_id) {
				item.porjectnum++
			}
		})
	})
	return {
		data: cateData,
		statu: true,
		mes: '获取成功'
	}
}
// 添加项目分类
exports.addProjectCate = async (db, event, context) => {
	const collection = db.collection('projectCate')
	var res = await collection.add(event)
	return {
		res: res,
		statu: true,
		mes: '添加成功'
	}
}
// 修改项目分类
exports.updateProjectCate = async (db, event, context) => {
	const collection = db.collection('projectCate')
	await collection.doc(event.id).update(event.data)
	return {
		statu: true,
		msg: '修改成功'
	}
}
// 删除项目分类
exports.removeProjectCate = async (db, event, context) => {
	const collection = db.collection('projectCate')
	const res = await collection.doc(event.id).remove()
	if (res.deleted === 1) {
		return {
			statu: true,
			msg: '删除成功'
		}
	} else {
		return {
			statu: false,
			msg: '删除失败'
		}
	}
}

