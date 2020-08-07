
// 查询友情链接
exports.getWebLink = async (db, event, context) => {
	const collection = db.collection('webLink')
	let res=null
	if(event.state){
		res = await collection.orderBy('create_time', 'desc').where({state:event.state}).get()
	}else {
		res = await collection.orderBy('create_time', 'desc').get()
	}
	
	
	
	return {
		statu: true,
		mes: '查询成功',
		data: res.data
	}
}
// 修改友情链接
exports.updateWebLink = async (db, event, context) => { //event.timestr='2020-07'
	const collection = db.collection('webLink')
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
// 删除友情链接
exports.removeWebLink = async (db, event, context) => {
	const collection = db.collection('webLink')
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
// 添加友情链接
exports.addWebLink = async (db, event, context) => {
	const collection = db.collection('webLink')
	var res = await collection.add(event)
	return {
		res: res,
		statu: true,
		mes: '添加成功'
	}
}
