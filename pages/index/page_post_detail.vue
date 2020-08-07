<template>
	<div class="deskPostDetail">
		<el-container style="width:100%">
			<Header></Header>
			<el-main>
				<div class="main_header"><LineTitle title="博客技术文"></LineTitle></div>
				<div class="main_content">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
							<div class="grid-content bg-purple" style="width:100%">
								<PostItem  :postDetail="postDetail" :cate_name="cate_name"></PostItem>
								
								<!-- 翻页 -->
							</div>
						</el-col>
						<el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
							<div class="grid-content bg-purple-light" style="width:100%">
								<PostDSide :post_list="post_list"></PostDSide>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-main>
			<!-- <Scroll :themeColor="this.$store.state.Desktheme.ThemeColor"></Scroll> -->
			<el-footer style="margin:0;padding:0">
				<Footer></Footer>
			</el-footer>
		</el-container>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import marked from 'marked'
import Header from '@/components/desk/header/header.vue';
import LineTitle from '@/components/desk/design/line_title.vue';
import PostList from '@/components/desk/post/postlist.vue';
import PostItem from '@/components/desk/post/postitem.vue';
import PostDSide from '@/components/desk/post/postdetail_side.vue';
// import Aplayer from '@/components/desk/aplayer/aplayer.vue';
// import Design from '@/components/desk/design/design.vue';
import Footer from '@/components/desk/design/footer.vue';
import Scroll from '@/components/common/scrollprogress.vue';
// import Updown from '@/components/desk/design/updown.vue';

export default {
	data() {
		return {
			readerDetailFlag: false, // 阅读详情状态
			postDetail: null,
			id: '',
			cate_name: '',
			post_list: []
		};
	},
	created() {
		
		// console.log(this.Utils.getRouteData(),'详情2')
		let catedata=this.Utils.getRouteData().catedata
		
		this.id=this.Utils.getRouteData().id
		let cate_name=this.Utils.getRouteData().cate_name
		this.cate_name= this.Utils.GetUrlByParamName('cate_name')
		// console.log(str,11)
		this.getpostDetail()
		this.getPostList();
	},
	mounted() {},
	computed: {
		...mapState(['Desktheme'])
	},
	watch: {},
	components: {
		Header,
		LineTitle,
		PostList,
		PostItem,
		PostDSide,
		Scroll,
		// Project
		// Banner,
		// ColorPicker,
		// Aplayer,
		// Design,
		Footer,
		// Updown
	},
	onLoad() {},
	methods: {
		async getpostDetail(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticle',
				event: {
					id: this.id
				}
			});
			// console.log(res, '请求云函数');
			if(!res.statu){
				// console.log('获取失败')
				return
			}
			this.postDetail=res.data.data[0]
			this.postDetail.time=this.Time.formatTime(this.postDetail.create_date,'Y-M-D')
			this.postDetail.blog = marked(this.postDetail.content)
		},
		
		async getPostList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleReadMax',
				event: {
					page: 1,
					limit: 6
				}
			});
			// console.log(res, '获取文章排行列表');
			if (!res.statu) return;
			this.post_list = res.data
		},
	}
};
</script>

<style lang="less" scoped>
.deskPostDetail {
	background-color: #F9F9F9;
	.el-main {
		width: 100%;
		box-sizing: border-box;
		.main_content {
			width: 100%;
			box-sizing: border-box;
			padding: 0 5rem;
			overflow: hidden;
			margin-top: 2rem;
		}
	}
}
</style>
