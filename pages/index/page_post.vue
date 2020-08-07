<template>
	<div class="deskPost">
		<el-container style="width:100%">
			<Header></Header>
			<el-main>
				<div class="main_header">
					<LineTitle title="博客技术文">
						<el-dropdown @command="handleCommand" class="hidden-md-and-up" style="margin-left:20px">
							<span class="el-dropdown-link"><i class="el-icon-d-caret el-icon--right" style="font-size: 25px;"></i></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item :command="-1">全部</el-dropdown-item>
								<el-dropdown-item :command="item.cate_id" v-for="(item, index) in tablist" :key="index">{{ item.name }}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</LineTitle>
				</div>
				<div class="main_content">
					<el-row :gutter="20" class="main_box">
						<!-- 手机tab栏 -->
						<!-- <div class="mb_c ate " style="margin-bottom:10px;padding: 0 10px;"><Tab :tablist="tablist" @changeTab="getPostList"></Tab></div> -->
						<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
							<div class="grid-content bg-purple" style="width:100%;background:#fff">
								<PostList v-if="total >= 1" :post_list="post_list"></PostList>
								<div v-else class="empty">暂无文章</div>
							</div>
							<div class="hint" v-if="total >= 1">
								<span v-if="page >= maxpage">已全部加载完</span>
								<div v-else class="next" @click="next">
									<span>加载更多</span>
									<i class="el-icon-arrow-down"></i>
								</div>
							</div>
							<div class="hint" v-else></div>
						</el-col>
						<el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
							<div class="grid-content bg-purple-light"><PostLside :tablist="tablist" @changeTab="getPostList" :maxpostNum="maxpostNum"></PostLside></div>
						</el-col>
					</el-row>
				</div>
			</el-main>
			<!-- <Scroll class="hidden-sm-and-down" :themeColor="this.$store.state.Desktheme.ThemeColor"></Scroll> -->
			<el-footer style="margin:0;padding:0"><!-- <Footer></Footer> --></el-footer>
		</el-container>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import Header from '@/components/desk/header/header.vue';
import LineTitle from '@/components/desk/design/line_title.vue';
import PostList from '@/components/desk/post/postlist.vue';
import PostLside from '@/components/desk/post/postlist_side.vue';
import Tab from '@/components/desk/project/tab.vue';
// import Aplayer from '@/components/desk/aplayer/aplayer.vue';
// import Design from '@/components/desk/design/design.vue';
import Footer from '@/components/desk/design/footer.vue';
import Scroll from '@/components/common/scrollprogress.vue';
// import Updown from '@/components/desk/design/updown.vue';

export default {
	data() {
		return {
			count: 10,
			loading: false,
			limit: 6,
			page: 1,
			total: 0,
			maxpage: 0, // 最大页数
			scrollHeight: 50, // 离地多少开始加载
			CateId: -1, // 当前分类id
			tablist: [], // 文章分类
			post_list: [], // 文章列表
			readerDetailFlag: false, // 阅读详情状态
			postDetail: null
		};
	},
	onLoad() {
		// console.log('启动文章列表-onload');
	},
	created() {
		this.getPostList();
		this.getPostCate();
	},
	mounted() {
		// this.listenerFunction();
	},
	computed: {
		...mapState(['Desktheme']),
		maxpostNum: {
			get() {
				let num = 0;
				this.tablist.forEach(item => {
					num += item.postnum;
				});
				return num;
			}
		}
	},
	watch: {},
	components: {
		Header,
		LineTitle,
		PostList,
		PostLside,
		Tab,
		Scroll,
		Footer
	},
	onLoad() {},
	methods: {
		next(){
			// console.log(this.page,this.maxpage,'加载更多');
			this.page = this.page + 1;
			if (this.page > this.maxpage&&this.maxpage>0) {
				// console.log('已全部加载完');
				return;
			}
			this.getPostList();
		},
		// listenerFunction(e) {
		// 	document.addEventListener('scroll', this.handleScroll, true);
		// },
		// handleScroll() {
		// 	// 可滚动高度
		// 	let innerHeight = document.querySelector('.deskPost').clientHeight;
		// 	// 屏幕尺寸高度
		// 	let outerHeight = document.documentElement.clientHeight;
		// 	// 可滚动容器超出当前窗口显示范围的高度
		// 	let scrollTop = document.documentElement.scrollTop;
		// 	// scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight <= (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
		// 	// console.log('可滚动容器的高度:' + innerHeight, '屏幕尺寸高度:' + outerHeight, '可滚动容器超出当前窗口显示范围的高度:' + scrollTop);
		// 	if (outerHeight + scrollTop + this.scrollHeight >= innerHeight) {
		// 		console.log(this.page,this.maxpage,'加载更多');
		// 		this.page = this.page + 1;
		// 		if (this.page > this.maxpage&&this.maxpage>0) {
		// 			console.log('已全部加载完');
		// 			return;
		// 		}

		// 		this.getPostList();
		// 	}
		// },
		handleCommand(command) {
			// this.$message('click on item ' + command);
			this.getPostList(Number(command));
		},
		async getPostList(stateid) {
			// console.log(stateid, 111);
			if (stateid) {
				// console.log(stateid, '切换tab栏');
				this.post_list = [];
				this.total = 0;
				this.limit = 6;
				this.page = 1;
				this.maxpage = 0;
				this.CateId = stateid ? stateid : -1;
			}

			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleList',
				event: {
					page: this.page,
					limit: this.limit,
					cate_id: this.CateId
				}
			});
			// console.log(res, '获取文章列表');
			if (!res.statu) return;
			if (res.data.length == 0) {
				// this.post_list = [];
				this.total = 0;
				this.limit = 6;
				this.page = 1;
				this.maxpage = 0;
				// console.log(this.total, 'total');
				return;
			}
			this.post_list = [...this.post_list, ...res.data];
			this.total = res.total;
			this.maxpage = Math.ceil(this.total / this.limit);
			// console.log(this.page, this.maxpage, '最大页码');
		},
		async getPostCate() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleCate',
				event: {}
			});
			// console.log(res, '获取分类');
			if (!res.statu) return;
			this.tablist = res.data;
		}
	}
};
</script>

<style lang="less" scoped>
.deskPost {
	background-color: #f9f9f9;
	.el-main {
		width: 100%;

		.main_header {
			margin-bottom: 2rem;
		}
		.main_content {
			width: 100%;
			box-sizing: border-box;
			padding: 0 2rem;
			overflow: hidden;
			border-radius: 5px;
			.page {
				width: 100%;
				display: flex;
				justify-content: center;
				padding-bottom: 2rem;
			}
		}
	}
	.empty {
		width: 100%;
		box-sizing: border-box;
		padding: 0 2rem;
		overflow: hidden;
		border-radius: 5px;
		height: 250px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		color: #666;
	}
	.next {
		width: 100%;
		padding: 10px 0;
		border: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 15px;
		cursor: pointer;
		color: #666;
		background-color: #fff;
		i {
			font-size: 20px;
		}
	}
	.el-col {
		// background-color: #ccc;
	}
	.hint {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px 0;
		color: #868686;
	}
	.el-dropdown-link {
		cursor: pointer;
		color: #868686;
	}
}
</style>
