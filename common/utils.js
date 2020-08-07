export default class Utils {
	// 获取路由跳转传参
	static getRouteData() {
			let path = window.location.hash
			let dataArr = path.split('?')[1].split('&')
			if (dataArr.length == 0) return {}
			let dataObj = {}
			dataArr.forEach(item => {
				dataObj[item.split('=')[0]] = item.split('=')[1]
			})
			return dataObj
		}
		
		static GetUrlByParamName(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var URL = decodeURI(window.location.href.split('?'));
			// console.log(URL,1212)
			var r = URL.substr(1).match(reg);
			if (r != null) {
				//decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
				return decodeURI(r[2]);
			};
			return null;
		}

		// 当前日期
		static todayDate() {
			let dt, y, m, d, w
			dt = new Date()
			y = dt.getFullYear()
			m = dt.getMonth() + 1
			d = dt.getDate()
			w = dt.getDay()
			let weeks = ['天', '一', '二', '三', '四', '五', '六']
			return `${y} 年 ${m.toString().padStart(2, '0')} 月 ${d.toString().padStart(2, '0')} 日 星期${weeks[w]}`
		}

	// 浏览器全屏
	static fullScreen() {
		let isFull = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen

		// 判断是否全屏
		if (isFull) {
			let close = document.exitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen
			close && close.call(document)
		} else {
			let docElm = document.documentElement
			let open = docElm.requestFullScreen || docElm.webkitRequestFullScreen || docElm.mozRequestFullScreen || docElm.msRequestFullscreen
			open && open.call(docElm)
		}
	}
	// 在页面生命周期执行,可以得到全局app加载完成后的状态(防止全局未加载完就提前执行了生命周期内的方法)
	// this.Utils.getAppCallbackFlag(this.AppFlag)
	static getAppCallbackFlag(app) {
		return new Promise((resolve, reject) => {
			if (!app) {
				getApp().globalData.AppCallback = async (flag) => {
					// console.log(flag,'回调')
					resolve(flag)
				}
			}

		})
	}
}
