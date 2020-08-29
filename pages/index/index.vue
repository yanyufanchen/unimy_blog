<template>
	<div class="deskIndex" id="deskIndex">
		<!-- <NavTab></NavTab> -->
		<el-container>
			<el-header class="deskBanner" height="100vh" :style="{ backgroundImage: 'url(' + headerBgimg + ')' }">
				<div class="dingwei"><NavTab></NavTab></div>
				<div class="swper" style="margin-top: 60px;"><Banner></Banner></div>
			</el-header>
			<div class="musicBox" :style="{ height: musicBoxHeight + 'px' }">
				<div class="music" id="music">
					<div class="title" :style="{ color: this.$store.state.Desktheme.ThemeColor }">
						<i class="fa fa-music" :style="{ marginRight: '5px' }"></i>
						&nbsp;&nbsp;听听音乐
					</div>
					<Aplayer class="aplayer" :audio="audio"></Aplayer>
				</div>
			</div>
			<el-main style="">
				<!-- <ColorPicker style="position:absolute;left:-1000px;top:0"></ColorPicker> -->
				<!-- <Design></Design> -->
				<div class="design">
					<div class="tag" data-aos="fade-up" aos-offset="200" aos-easing="ease-in-sine" aos-duration="600"><span :style="{ marginTop: '2rem' }">站点统计</span></div>
					<!-- 统计 -->
					<div class="tatistic" data-aos="fade-up">
						<div class="tatistic_box">
							<el-row style="width: 100%;">
								<el-col v-for="(item, index) in tatistic_list" :key="index" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
									<div class="tatistic_item">
										<h3 v-if="index==0" class="num" :style="{ color: '#fff' }">{{ count?count[0].totalCount:0+item.total }}</h3>
										<h3 v-else-if="index==1" class="num" :style="{ color: '#fff' }">{{ count?count[0].Count:0+item.total }}</h3>
										<h3 v-else class="num" :style="{ color: '#fff' }">{{ item.num+item.total }}</h3>
										<h5 class="txt" :style="{ color: '#fff' }">{{ item.name }}</h5>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
					<!-- 文章 -->
					<LineTitle data-aos="fade-up" title="博客技术文"></LineTitle>
					<div class="post_box"><Post :post_list="post_list"></Post></div>
					<div class="tag">
						<span :style="{ marginBottom: '2rem' }" @click="to_post">
							<i style="margin-right:5px" class="el-icon-thumb"></i>
							查看更多
						</span>
					</div>
					<!-- 项目 -->
					<LineTitle title="开源项目" data-aos="fade-up"></LineTitle>
					<div class="project_box"><Project :project_list="project_list"></Project></div>
					<div class="tag" data-aos="fade-up">
						<span :style="{ marginBottom: '2rem' }" @click="to_project">
							<i style="margin-right:5px" class="el-icon-thumb"></i>
							查看更多
						</span>
					</div>
				</div>
			</el-main>
			<!-- <progress value="10" max="100"></progress> -->
			<!-- <Scroll :themeColor="this.$store.state.Desktheme.ThemeColor"></Scroll> -->
			<!-- <NewScroll :themeColor="this.$store.state.Desktheme.ThemeColor"></NewScroll> -->
			<el-footer style="padding:0;width: 100%;"><Footer></Footer></el-footer>

			<Updown></Updown>
		</el-container>
	</div>
</template>
<script>
	// let scllBgt=null
import { mapState } from 'vuex';
import NavTab from '@/components/desk/navTab/navTab.vue';
import Banner from '@/components/desk/banner/banner.vue';
import ColorPicker from '@/components/desk/deskcolor/colorPicker.vue';
import Aplayer from '@/components/desk/aplayer/aplayer.vue';
import Design from '@/components/desk/design/design.vue';
import Post from '@/components/desk/design/post.vue'
import Project from '@/components/desk/design/project.vue'
import LineTitle from '@/components/desk/design/line_title.vue'
import Footer from '@/components/desk/design/footer.vue';
import Updown from '@/components/desk/design/updown.vue';
import Scroll from '@/components/common/scrollprogress.vue';
import NewScroll from '@/components/common/newscrollprogress.vue';

export default {
	data() {
		return {
			Bgc: '',
			musicBoxHeight: 0,
			deskTheme: {},
			audio: [
				{
					title: '陈奕迅 - 红玫瑰',
					artist: '陈奕迅',
					src: '../../../static/medias/music/陈奕迅 - 红玫瑰.mp3',
					pic: '../../../static/medias/music/libai.jpg',
					lrc: '[00:00.00]APlayer\n[00:04.01]is\n[00:08.02]amazing'
				},
				{
					title: '陈奕迅 - 一丝不挂',
					artist: '陈奕迅',
					src: '../../../static/medias/music/陈奕迅 - 一丝不挂.mp3',
					pic: '../../../static/medias/music/libai.jpg',
					lrc: '../../../static/medias/music/红玫瑰_歌词.lrc'
				},{
					title: '李荣浩 - 李白',
					artist: '李荣浩',
					src: '../../../static/medias/music/李荣浩 - 李白.mp3',
					pic: '../../../static/medias/music/libai.jpg',
					lrc: '[00:02.64]红玫瑰\n[00:04.95]演唱：陈奕迅\n[00:06.08]11'
				}
			],
			tatistic_list: [], // 站点统计
			post_list: [], // 文章
			project_list: [] // 项目
		};
	},
	created() {
		this.getArticleList()
		this.getPorjectList()
		// this.getWebCount()
	},
	mounted() {
		if(document.getElementById("music")){
			let musicH=document.getElementById("music").offsetHeight
			this.musicBoxHeight=musicH+10
		}
		this.tatistic_list = [
			{
				name: '站点总访问量',
				total: '人次',
				num:0
			},
			{
				name: '站点当月访问量',
				total: '人次',
				num:0
			},
			{
				name: '发表文章数',
				total: '篇',
				num:0
			},
			{
				name: '开源项目数',
				total: '个',
				num:0
			}
		];
		
		

	},
	computed: {
		...mapState(['Desktheme','headerBgimg','count'])
	},
	watch: {
	},
	components: {
		NavTab,
		Banner,
		ColorPicker,
		Aplayer,
		Design,
		Post,
		Project,
		LineTitle,
		Footer,
		Updown,
		Scroll,
		NewScroll
	},
	onLoad() {
		// console.log('前台启动-onload')
	},
	onHide(){
		// console.log('离开')
	},
	methods: {
		to_post(){
			this.Uni.navigateTo('/pages/index/page_post')
		},
		to_project(){
			this.Uni.navigateTo('/pages/index/page_project')
		},
		// 文章列表
		async getArticleList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleList',
				event: {
					page: 0,
					limit: 8,
					cate_id: -1
				}
			});
			// console.log(res, '获取文章列表');
			if(!res.statu) return
			if (res.data.length == 0) return;
			this.post_list=res.data
			this.tatistic_list[2].num=res.total
		},
		// 项目列表
		async getPorjectList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getProjectList',
				event: {
					page: 0,
					limit: 8,
					cate_id: -1
				}
			});
			// console.log(res, '获取项目列表');
			if(!res.statu) return
			if (res.data.length == 0) return;
			this.project_list=res.data
			this.tatistic_list[3].num=res.total
			// console.log(this.$store.count,111)
			// this.tatistic_list[0].num=this.$store.count[0].totalCount
		},
	}
};
</script>

<style lang="less" scoped>
.deskIndex {
	.el-header {
		padding: 0;
		height: 100vh;
		background-size: cover;
		background-position: center top;
	}
	.el-header:after {
		-webkit-animation: rainbow 60s infinite;
		animation: rainbow 60s infinite;
	}
	.el-header:before,
	.el-header:after {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		display: block;
		left: 0;
		top: 0;
		content: '';
	}
	.dingwei {
		z-index: 3000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 60px;
	}
	.header {
		width: 100%;
		height: 60px;
		position: relative;
	}
	.musicBox {
		width: 100%;
		// height: 10rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #eeeeee;
		.music {
			box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
			z-index: 100;
			padding: 10px;
			position: absolute;
			top: -2rem;
			// width: 80%;
			// height: 9rem;
			border-radius: 1rem;
			background-color: #fff;
			.title {
				width: 100%;
				height: 2.5rem;
				line-height: 2.5rem;
				font-size: 1.5rem;
				text-align: center;
			}
			.aplayer {
				box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2), 0 10px 20px -12px rgba(0, 0, 0, 0.5) !important;
			}
		}
	}
	.el-main {
		padding: 0;
		.design {
			background-color: #eee;
			width: 100%;
			overflow: hidden;
			.tag {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				span {
					cursor: pointer;
					height: 3rem;
					padding: 0 3rem;
					line-height: 3rem;
					border-radius: 3rem;
					font-size: 0.9rem;
					color: #fff;
					background-color: #4b5456;
				}
				span:hover {
					background-color: #fff;
					color: #4b5456;
				}
			}

			.tatistic {
				background-color: #4b5456;
				margin-top: 2rem;

				width: 100%;

				.tatistic_box {
					box-sizing: border-box;
					padding: 20px 20px 0px 20px;
				}
				.tatistic_item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 1.5rem;
					h3 {
						font-size: 2rem;
						font-weight: 540;
						margin-bottom: 10px;
						letter-spacing: 2px;
						margin-top: -8px;
					}
					h5 {
						font-size: 1rem;
						font-weight: 400;
						text-transform: capitalize;
					}
				}
			}
		}
	}
}
</style>
