export default class Api {
	// 请求数据库
	static sendUniCloud(that,data,flag=true){ // path==云函数 data={mode: getarticle,event: {参数}}
		let path='myblog_unicloud'
		let loadingInstance=null
		if(flag){
			loadingInstance=that.Loading.service({
			  fullscreen: true,
			  background: 'rgba(250,250,250, 0.2)'
			});
		}else {
			// console.log('不刷新')
		}
		
		return new Promise((resolve,reject)=>{
			uniCloud.callFunction({
				name: path,
				data: data
			}).then((res) => {
				if(flag){
					that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
					  loadingInstance.close();
					});
				}
				// console.log(res,'请求云函数')
				if (res.result.statu) {
					
					resolve(res.result)
					
				}else {
					// console.log(res,'请求云函数')
					resolve({
						statu: false
					})
				}
			}).catch((err)=>{
				console.log(err,'请求云函数错误')
				that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
				  loadingInstance.close();
				});
				resolve({
					statu: false,
					mes: '请求失败'
				})
			})
		})
		
	}
	static Toast(message,type='success',that){
		that.$message({
			showClose: true,
			message: message,
			type: type,
			duration: 1000
		});
	}
}