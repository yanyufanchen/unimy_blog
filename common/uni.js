export default class Common {
	static newHref(that,path,data) { // data={name:'xiaoming',age:2} 打开当前项目的新的页面
		let newpath=path
		let params=''
		if(data){
			for(let k in data){
				params+=k+'='+data[k]+'&'
			}
			params=params.substring(0,params.length-1)
			newpath=newpath+'?'+params
		}
		console.log(newpath,'请求地址')
		return new Promise((resolve,reject)=>{
			const {
				href
			} = that.$router.resolve({
				path: newpath
			})
			window.open(href, '_blank')
			resolve(true)
		})
	}
	static outnewHref(that,path) {  //打开外网新的页面
		
		
		console.log(path,'请求地址')
		return new Promise((resolve,reject)=>{
			// const {
			// 	href
			// } = that.$router.resolve({
			// 	path: path
			// })
			window.open(path, '_blank')
			resolve(true)
		})
		
		
	}
	static navigateTo(path,data){ // data={name:'xiaoming',age:2} 跳转页面 
		let newpath=path
		let params=''
		if(data){
			for(let k in data){
				params+=k+'='+data[k]+'&'
			}
			params=params.substring(0,params.length-1)
			newpath=newpath+'?'+params
		}
		console.log(newpath,'请求地址')
		return new Promise((resolve,reject)=>{
			uni.navigateTo({
			    url: newpath,
				complete: (res)=>{
					resolve(res)
				}
			});
		})
	}
}
