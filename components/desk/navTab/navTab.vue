<template>
	<div class="navTab">
		<el-row class="navTabBox">
			<el-col :xs="2" :sm="2" :md="2" :lg="0">
				<div class="navTab_left"><i @click="toggle" class="el-icon-s-fold"></i></div>
			</el-col>
			<el-col :xs="19" :sm="19" :md="19" :lg="7">
				<div class="navTab_title">
					<image src="../../../static/img/logo.png"></image>
					<h1>Wang Peng'blog</h1>
				</div>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="15" class="hidden-md-and-down">
				<div class="navTab_tab">
					<div class="tabItem" :id="index" @click="to_router" v-for="(item, index) in navTabList" :key="index">
						<i :style="item.active?{color: Desktheme.ThemeColor}:{}" :class="item.icon"></i>
						<span :style="item.active?{color: Desktheme.ThemeColor}:{}">{{item.name}}</span>
					</div>
				</div>
			</el-col>
			<el-col :xs="2" :sm="2" :md="2" :lg="2">
				<div class="navTab_search"><i class="el-icon-search" title="搜索"></i></div>
			</el-col>
		</el-row>
		<GitHubIcon v-if="showGithubIcon"></GitHubIcon>
		<div style="z-index: 20;">
			<el-drawer size="50%" custom-class="drawer" :show-close="false" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
				<div class="drawerBox">
					<div class="drawerBox_navTab_title">
						<div class="o_title">
							<image src="../../../static/img/logo.png"></image>
							<h1>Wang Peng'blog</h1>
						</div>
						<div class="s_title"><h2>{{this.$store.state.sTitle}}</h2></div>
					</div>

					<div class="drawerBox_navTab_tab">
						<div  class="tabItem" v-for="(item, index) in navTabList" :key="index" :id="index" @click="to_router"  @mouseover="addBtnStyle(index)" @mouseout="removeBtnStyle(index)" :style="banner_btnStyle[index]?banner_btnStyle[index].bgc:''">
							<div class="_box" :style="item.active?{color: Desktheme.ThemeColor}:{}">
								<i :class="item.icon" :style="banner_btnStyle[index]?banner_btnStyle[index].color:''"></i>
								<span :style="banner_btnStyle[index]?banner_btnStyle[index].color:''">{{item.name}}</span>
							</div>
						</div>
					</div>
					<div class="arawerBox_footer">
						<LinkIcon class="linkIcon"></LinkIcon>
					</div>
				</div>
			</el-drawer>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import GitHubIcon from '../githubIcon/githubIcon.vue';
import LinkIcon from '../linkIcon/linkIcon.vue'
export default {
	data() {
		return {
			scrollHeight: 0,
			showGithubIcon: false,
			// 抽屉
			drawer: false,
			direction: 'ltr',
			navTabList: [
				{
					name: '首页',
					icon: 'fa fa-home',
					active: true
				},
				{
					name: '实战项目',
					icon: 'el-icon-s-flag',
					active: false
				},
				{
					name: '技术文章',
					icon: 'el-icon-tickets',
					active: false
				},
				{
					name: '关于我',
					icon: 'fa fa-user-circle-o',
					active: false
				},
				{
					name: '友情链接',
					icon: 'fa fa-address-book',
					active: false
				}
			],
			banner_btnStyle: []
		};
	},
	created() {
		// console.log(window.location,222)
		let hash=window.location.hash
		this.navTabList.forEach(item=>{
			item.active=false
		})
		if(hash.indexOf('/pages/index/index')!==-1){
			this.navTabList[0].active=true
			return
		}
		if(hash.indexOf('/pages/index/page_project')!==-1){
			this.navTabList[1].active=true
			return
		}
		if(hash.indexOf('/pages/index/page_post')!==-1){
			this.navTabList[2].active=true
			return
		}
		if(hash.indexOf('/pages/index/page_about')!==-1){
			this.navTabList[3].active=true
			return
		}
		if(hash.indexOf('/pages/index/page_link')!==-1){
			this.navTabList[4].active=true
			return
		}
		if(hash=='#/'){
			this.navTabList[0].active=true
			return
		}
		
	},
	mounted() {
		this.listenerFunction();
	},
	computed: {
		...mapState(['Desktheme'])
	},
	components: {
		GitHubIcon,
		LinkIcon
	},
	onLoad() {},
	methods: {
		// 切换抽屉 //el-icon-s-unfold
		toggle() {
			this.drawer = true;
			this.$('.navTab_left i').removeClass('el-icon-s-fold');
			this.$('.navTab_left i').addClass('el-icon-s-unfold');
		},
		handleClose() {
			this.drawer = false;
			this.$('.navTab_left i').removeClass('el-icon-s-unfold');
			this.$('.navTab_left i').addClass('el-icon-s-fold');
		},
		listenerFunction(e) {
			document.addEventListener('scroll', this.handleScroll, true);
		},
		handleScroll() {
			if(window.pageYOffset<100){
				this.$('.navTab').removeClass('tabBgc');
				this.showGithubIcon = false;
			}else {
				this.$('.navTab').addClass('tabBgc');
				this.showGithubIcon = true;
			}
		},
		async to_router(e){
			this.handleClose()
			// console.log(e,1111);
			let id=Number(e.currentTarget.id)
			let path=''
			if(id===0){
				path='/pages/index/index'
			}
			if(id===1){
				path='/pages/index/page_project'
			}
			if(id===2){
				path='/pages/index/page_post'
			}
			if(id===3){
				path='/pages/index/page_about'
			}
			if(id===4){
				path='/pages/index/page_link'
			}
			const res=await this.Uni.navigateTo(path)
			// console.log(res)
		},
		// banner按钮样式
		addBtnStyle(i){	
			let style={
				bgc: 'backgroundColor:rgba(0,0,0,0.1);',
				color: 'color:'+this.$store.state.Desktheme.ThemeColor
			}
			// let style='backgroundColor:rgba(0,0,0,0.2);color:'+this.$store.state.Desktheme.ThemeColor
			this.banner_btnStyle[i]=style
			// console.log(i,this.banner_btnStyle,111)
			this.$set(this.banner_btnStyle, i, style)
		},
		removeBtnStyle(i){
			this.banner_btnStyle[i]=''
			this.$set(this.banner_btnStyle, i, '')
		}
	}
};
</script>

<style lang="less" scoped>
.tabBgc {
	background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}

.navTab {
	box-sizing: border-box;
	// width: 100%;
	height: 60px;
	// padding: 0 4rem;
	.navTab_left {
		height: 60px;
		line-height: 60px;
		font-size: 25px;
		cursor: pointer;
		color: #fff;
	}
	.navTab_title {
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 40px;
			height: 40px;
			margin-right: 10px;
		}
		h1 {
			font-weight: 500;
			color: #fff;
			font-size: 30px;
			cursor: pointer;
		}
	}
	.navTab_tab {
		box-sizing: border-box;
		padding: 0 10px;
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		.tabItem {
			flex: 1;
			height: 60px;
			line-height: 60px;
			font-size: 15px;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				margin-right: 10px;
			}
		}
		.tabItem:hover {
			background-color: rgba(0, 0, 0, 0.2);
			cursor: pointer;
		}
	}
	.navTab_search {
		height: 60px;
		line-height: 60px;
		font-size: 25px;
		cursor: pointer;
		color: #fff;
	}
	.drawerBox {
		.drawerBox_navTab_title {
			display: flex;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #eee;
			.o_title {
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 40px;
					height: 40px;
					margin-right: 10px;
				}
				h1 {
					font-weight: 500;
					color: #333;
					font-size: 25px;
					cursor: pointer;
				}
			}
			.s_title {
				h2 {
					text-align: center;
					line-height: 40px;
					font-size: 14px;
				}
			}
		}
		.drawerBox_navTab_tab {
			border-bottom: 1px solid #eee;
			width: 100%;
			margin-top: 20px;
			.tabItem {
				cursor: pointer;
				width: 100%;
				height: 60px;
				display: flex;
				justify-content: center;
				align-items: center;
				i {
					margin-right: 10px;
					font-size: 15px;
					color: #333;
				}
			}
			// .tabItem:hover {
			// 	background-color: rgba(244,67,54,0.6);
			// 	// background-color: #f44336;
			// }
		}
		.arawerBox_footer {
			width: 100%;
			height: 12rem;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			.linkIcon {
				// padding: 2rem 4rem;
				// border-radius: 0.5rem;
				// background-color: #eee;
			}
		}
	}
}
</style>
