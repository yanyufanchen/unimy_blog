export default class Time {
	// 时间字符串转时间戳
	static transformTimeStr(date) { // '2020-10-10'
	  date = date.substring(0, 19);
	  date = date.replace(/-/g, '/');
	  return new Date(date).getTime()
	}
	/** 
	 * 时间戳转化为年 月 日 时 分 秒 
	 * number: 传入时间戳 
	 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
	 */
	
	static formatTime(number, format) {
	  if (!number) {
	    return;
	  }
	  const formatNumber = n => {
	    n = n.toString()
	    return n[1] ? n : '0' + n
	  }
	  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	  let returnArr = [];
	
	  //var date = new Date(number * 1000);
	  let date = new Date(number);
	  returnArr.push(date.getFullYear());
	  returnArr.push(formatNumber(date.getMonth() + 1));
	  returnArr.push(formatNumber(date.getDate()));
	
	  returnArr.push(formatNumber(date.getHours()));
	  returnArr.push(formatNumber(date.getMinutes()));
	  returnArr.push(formatNumber(date.getSeconds()));
	
	  for (let i in returnArr) {
	    format = format.replace(formateArr[i], returnArr[i]);
	  }
	  return format;
	}
}