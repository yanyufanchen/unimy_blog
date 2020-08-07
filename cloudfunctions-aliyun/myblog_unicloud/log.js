// 获取日志列表 event.all=true 查全部 不传或者false不返回明细内容
exports.getlogList = async (db, event, context) => {
	const collection = db.collection('log')
	if(event.all){
		var res = await collection.get()
	}else {
		var res = await collection.field({
			'content': false
		}).get()
	}
	
	
	return {
		data: res.data,
		statu: true,
		mes: '获取成功'
	}
}

// 获取日志
exports.getlog = async (db, event, context) => {
	const collection = db.collection('log')
	const res = await collection.doc(event.id).get()
	
	return { //affectedDocs=1
		statu: true,
		data:res.data,
		mes: '获取成功',
	}
}


// 编辑日志
exports.updatelog = async (db, event, context) => {
	const collection = db.collection('log')
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