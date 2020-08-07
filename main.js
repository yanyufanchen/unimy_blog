import Vue from 'vue'
import App from './App'
import store from './store'

import ElementUI from 'element-ui'
import './static/css/normalize.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
// import './static/style/main.css'
import 'element-ui/lib/theme-chalk/display.css' // elment
import './static/css/deskCommon.less'
import './static/font/awesome/css/font-awesome.min.css' // font字体

import './static/js/animate/animate.min.css'  // animate动画
import './static/js/clicklove/clicklove.js'  // 点击爱心


// 引入 滚动动画
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
});

import './static/js/vendor/jquery-2.2.4.min.js'
// 导入v-charts组件
import VCharts from 'v-charts'
Vue.use(VCharts)

// 引入echart组件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入mackdown样式
import './static/css/markdown.min.css'

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

import { Loading } from 'element-ui';
Vue.prototype.Loading = Loading
Vue.use(ElementUI)


import Uni from'./common/uni.js'
Vue.prototype.Uni=Uni
import Utils from './common/utils'
Vue.prototype.Utils = Utils
import Time from './common/time' // 时间转换工具
Vue.prototype.Time = Time
import Api from './common/api' // 请求云函数
Vue.prototype.Api = Api
import $ from'./static/js/vendor/jquery-2.2.4.min.js'
Vue.prototype.$ = $
app.$mount()
