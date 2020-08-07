// 登录
exports.login = async (db, event, context) => {
	const collection = db.collection('admin')
	var res = await collection.where({
		username: event.username
	}).get()
	if (res.affectedDocs < 1) {
		return {
			statu: false,
			mes: '账号或密码错误'
		}
	}
	var user = res.data[0]
	if (user.password !== event.password) {
		return {
			status: false,
			mes: '账号或密码错误'
		}
	}
	// 生成随机字符串
	function randomString(len) {
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (let i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	}
	const token = randomString(32)
	return {
		statu: true,
		mes: '登录成功',
		data: {
			_id: user._id,
			username: user.username,
			token: token,
			status: user.status
		}
	}
}
// 新增账户
exports.addAccount = async (db, event, context) => {
	const collection = db.collection('admin')
	var res = await collection.add(event)
	
	return {
		statu: true,
		mes: '新增成功'
	}
}
// 查询账户
exports.getAccountList = async (db, event, context) => {
	const collection = db.collection('admin')
	var res = await collection.field({
		'password': false
	}).get()
	
	return {
		statu: true,
		mes: '查询成功',
		data: res.data
	}
}
// 修改账户
exports.updateAccount = async (db, event, context) => {
	const collection = db.collection('admin')
	var res = await collection.doc(event.id).update(event.data)
	
	return {
		statu: true,
		mes: '修改成功'
	}
}
// 删除账户
exports.removeAccount = async (db, event, context) => {
	const collection = db.collection('admin')
	var res = await collection.doc(event.id).remove()
	
	return {
		statu: true,
		mes: '删除成功'
	}
}