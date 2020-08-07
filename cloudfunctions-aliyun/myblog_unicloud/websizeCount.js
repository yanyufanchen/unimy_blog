
// 查询前台访问量 event.offset=从开始选取几个返回
exports.getWebsizeCount = async (db, event, context) => {
	const collection = db.collection('websizeCount')
	var res = await collection.orderBy('timestamp', 'desc').get()
	// let totalCount=0
	res.data.forEach((item,index)=>{ // 7.totalcount=count  0.totalcount=1.totalcount+0.count
		let activeindex=res.data.length-index-1
		if(index==0){
			res.data[activeindex].totalCount=res.data[activeindex].Count
		}else {
			res.data[activeindex].totalCount=res.data[activeindex].Count+res.data[activeindex+1].totalCount
		}
		
	})
	if(event.offset){
		res.data=res.data.slice(0,event.offset)
	}
	
	return {
		statu: true,
		mes: '查询成功',
		data: res.data
	}
}
// 更新前台访问量
exports.updateWebsizeCount = async (db, event, context) => { //event.timestr='2020-07'
	const collection = db.collection('websizeCount')
	var getres = await collection.orderBy('timestamp', 'desc').skip((1 - 1) * 1).limit(1).get()
	if(event.timestr!==getres.data[0].timestr){
		// 新增记录
		var res = await collection.add({
			Count: 1,
			timestamp:event.timestamp,
			timestr:event.timestr
		})
	}else {
		// 更新记录
		let NewCount=getres.data[0].Count+1
		var updateres = await collection.doc(getres.data[0]._id).update({
			Count:NewCount
		})
	}
	
	
	return {
		statu: true,
		mes: '更新成功'
	}
}
