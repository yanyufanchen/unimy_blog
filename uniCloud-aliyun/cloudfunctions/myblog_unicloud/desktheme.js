
// 查询前台主题色
exports.getDeskTheme = async (db, event, context) => {
	const collection = db.collection('deskTheme')
	var res = await collection.get()
	
	return {
		statu: true,
		mes: '查询成功',
		data: res.data
	}
}
// 修改前台主题色
exports.updateDeskTheme = async (db, event, context) => {
	const collection = db.collection('deskTheme')
	var res = await collection.doc(event.id).update(event.data)
	
	return {
		statu: true,
		mes: '修改成功'
	}
}
