// 获取我的基本信息
exports.getMeMessage = async (db, event, context) => {
	const collection = db.collection('myMessage')
	var res = await collection.get()
	return {
		data: res.data,
		mes: '获取成功',
		statu: true
	}
}

// 修改保存基本信息
exports.updateMeMessage = async (db, event, context) => {
	const collection = db.collection('myMessage')
	await collection.doc(event.id).update(event.data)
	return {
		statu: true,
		mes: '修改成功'
	}
}

// 获取我的技能
exports.getMeSkill = async (db, event, context) => {
	const collection = db.collection('mySkill')
	var res = await collection.get()
	return {
		data: res.data,
		statu: true,
		mes: '获取成功'
	}
}
// 添加我的技能
exports.addMeSkill = async (db, event, context) => {
	const collection = db.collection('mySkill')
	var res = await collection.add(event)
	return {
		res: res,
		statu: true,
		mes: '添加成功'
	}
}
// 修改我的技能
exports.updateMeSkill = async (db, event, context) => {
	const collection = db.collection('mySkill')
	await collection.doc(event.id).update(event.data)
	return {
		statu: true,
		mes: '修改成功'
	}
}
// 删除我的技能
exports.removeMeSkill= async (db, event, context) => {
	const collection = db.collection('mySkill')
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
