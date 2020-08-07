<script>
import { mapState } from 'vuex';
const version = require('element-ui/package.json').version; // 版本号
const ORIGINAL_THEME = '#409EFF';

export default {
	globalData: {
		AppFlag: false,
		AppCallback: null
	},
	data() {
		return {
			// deskthemecolor: ORIGINAL_THEME,
		};
	},

	onLaunch() {
		// console.log('启动项目');
		// 如果是前台,就获取背景轮播图
		this.routerGuard();
	},
	created() {
		
	},
	mounted() {},
	computed: {
		...mapState(['Desktheme'])
	},
	watch: {
		Desktheme(val1, oldVal1) {
			let val = val1.ThemeColor;
			let oldVal = ORIGINAL_THEME;
			// console.log(val, oldVal, 'watch');
			if (typeof val !== 'string') return;
			// console.log(val, '设置前台主题色watch');
			const themeCluster = this.getThemeCluster(val.replace('#', ''));
			const originalCluster = this.getThemeCluster(oldVal.replace('#', ''));
			const getHandler = (variable, id) => {
				return () => {
					const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''));
					const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster);

					let styleTag = document.getElementById(id);
					if (!styleTag) {
						styleTag = document.createElement('style');
						styleTag.setAttribute('id', id);
						document.head.appendChild(styleTag);
					}
					styleTag.innerText = newStyle;
				};
			};

			const chalkHandler = getHandler('chalk', 'chalk-style');

			if (!this.chalk) {
				const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
				this.getCSSString(url, chalkHandler, 'chalk');
			} else {
				chalkHandler();
			}

			const styles = [].slice.call(document.querySelectorAll('style')).filter(style => {
				const text = style.innerText;
				return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
			});
			styles.forEach(style => {
				const { innerText } = style;
				if (typeof innerText !== 'string') return;
				style.innerText = this.updateStyle(innerText, originalCluster, themeCluster);
			});
		}
	},
	components: {},
	onLoad() {},
	methods: {
		async routerGuard() {
			let url = window.location.href;
			const user = uni.getStorageSync('user');
			// console.log(window.location, user, '请求地址');
			if (url.indexOf('admin')==-1) {
				// console.log('请求前台');
				const res = await this.geteHeaderBgimg();
				const flag=await this.setTheme();
				// console.log(flag,'app执行结束')
				getApp().globalData.AppFlag=true
				// console.log(getApp().globalData,'1111')
				
				if(getApp().globalData.AppCallback){
					getApp().globalData.AppCallback(true) // 执行回调函数
				}
				const updateWebres=await this.updateWebCount() // 更新网站访问量
				this.getWebCount()
				this.getmymessage()
			}
			if (url.indexOf('admin')!==-1) {
				// console.log('请求后台');
				if (user && user.token) {
					uni.redirectTo({
						url: '/pages/admin/index/index'
					});
					return;
				}
				// console.log('没有登录');
				uni.redirectTo({
					url: '/pages/admin/login/login'
				});
			}
		},
		// 获取网站访问量
		async getWebCount(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getwebsizeCount',
				event: {}
			});
			// console.log(res, '获取网站访问量');
			if(!res.statu) return
			this.$store.commit('saveWebCount', res.data);
			if (res.data.length == 0) return;
			
		},
		// 更新网站访问量timestr
		async updateWebCount(){
			let timestamp=new Date().getTime()
			let timestr=this.Time.formatTime(timestamp, 'Y-M')
			// console.log(timestr,'22')
			const res = await this.Api.sendUniCloud(this, {
				model: 'updatewebsizeCount',
				event: {
					timestr:timestr,
					timestamp:timestamp
				}
			});
			// console.log(res, '更新网站访问量');
			if(!res.statu) return false
			return true
			
		},
		async getmymessage(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getMeMessage',
				event: {}
			});
			// console.log(res, '获取基本信息');
			if (!res.statu) return;
			this.$store.commit('savemymessage', res.data[0]);
		},
		// 设置主题色
		async setTheme() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getDeskTheme',
				event: {}
			});
			// console.log(res, '查询前台主题色');
			if (!res.statu) {
				this.$store.commit('editTheme', {
					ThemeColor: '#409EFF',
					id: 1
				});
				return true;
			}
			this.$store.commit('editTheme', res.data[0]);
			
			let themecolor = res.data[0].ThemeColor;
			let flag = this.CheckIsColor(themecolor);
			
			if (flag) {
				// console.log('准备设置前台主题色');
				// this.deskthemecolor = themecolor
			}
			return true
			// console.log(flag, this.deskthemecolor, '改变颜色');
		},
		// 检测颜色
		CheckIsColor(bgVal) {
			// console.log(bgVal, '初始化主题色');
			if (!bgVal) return false;
			// this.$store.commit('editThemeColor',bgVal)

			var type = '^#[0-9a-fA-F]{6}$';
			var re = new RegExp(type);
			if (bgVal.match(re) == null) {
				type = '^[rR][gG][Bb][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[\)]{1}$';
				re = new RegExp(type);
				if (bgVal.match(re) == null) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		},
		updateStyle(style, oldCluster, newCluster) {
			let newStyle = style;
			oldCluster.forEach((color, index) => {
				newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
			});
			return newStyle;
		},

		getCSSString(url, callback, variable) {
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
					callback();
				}
			};
			xhr.open('GET', url);
			xhr.send();
		},

		getThemeCluster(theme) {
			const tintColor = (color, tint) => {
				let red = parseInt(color.slice(0, 2), 16);
				let green = parseInt(color.slice(2, 4), 16);
				let blue = parseInt(color.slice(4, 6), 16);

				if (tint === 0) {
					// when primary color is in its rgb space
					return [red, green, blue].join(',');
				} else {
					red += Math.round(tint * (255 - red));
					green += Math.round(tint * (255 - green));
					blue += Math.round(tint * (255 - blue));

					red = red.toString(16);
					green = green.toString(16);
					blue = blue.toString(16);

					return `#${red}${green}${blue}`;
				}
			};

			const shadeColor = (color, shade) => {
				let red = parseInt(color.slice(0, 2), 16);
				let green = parseInt(color.slice(2, 4), 16);
				let blue = parseInt(color.slice(4, 6), 16);

				red = Math.round((1 - shade) * red);
				green = Math.round((1 - shade) * green);
				blue = Math.round((1 - shade) * blue);

				red = red.toString(16);
				green = green.toString(16);
				blue = blue.toString(16);

				return `#${red}${green}${blue}`;
			};

			const clusters = [theme];
			for (let i = 0; i <= 9; i++) {
				clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
			}
			clusters.push(shadeColor(theme, 0.1));
			return clusters;
		},
		// 获取海报
		geteHeaderBgimg() {
			let bannerList = [
				{
					url: '../../../static/medias/banner/0.jpg'
				},
				{
					url: '../../../static/medias/banner/1.jpg'
				},
				{
					url: '../../../static/medias/banner/2.jpg'
				},
				{
					url: '../../../static/medias/banner/3.jpg'
				},
				{
					url: '../../../static/medias/banner/4.jpg'
				},
				{
					url: '../../../static/medias/banner/5.jpg'
				},
				{
					url: '../../../static/medias/banner/6.jpg'
				}
			];
			// 修复切换背景图时出现的“白色闪屏”现象
			let img = new Image();
			let num = new Date().getDay();
			img.src = bannerList[num].url;
			// 确定图片加载完成后再进行背景图片切换
			img.onload = () => {
				this.$store.commit('editHeaderBgimg', img.src);
			};
			let Num = 0;
			setInterval(() => {
				Num++;
				if (Num >= bannerList.length) {
					Num = 0;
				}
				// 修复切换背景图时出现的“白色闪屏”现象
				// let img = new Image();
				img.src = bannerList[Num].url;
				// 确定图片加载完成后再进行背景图片切换
				img.onload = () => {
					this.$store.commit('editHeaderBgimg', img.src);
				};
			}, 5000);
		}
	}
};
</script>
<style>
page {
	/* background-color: #f0f2f5; */
}
</style>
