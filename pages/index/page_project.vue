<template>
	<div class="deskProject">
		<el-container style="width:100%">
			<Header></Header>
			<el-main>
				<div class="main_header"><LineTitle title="开源项目"></LineTitle></div>
				<div class="main_content">
					<Tab :tablist="tablist" @changeTab="getProjectList"></Tab>
					<div class="project_box"  infinite-scroll-distance="50">
						<Project v-if="project_list.length>=1" :project_list="project_list"></Project>
						<div v-else class="notProject">
							<div class="hint">暂无项目</div>
						</div>
					</div>
					<div class="page" v-if="total>0">
						<el-pagination background  :page-size="limit" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total"></el-pagination>
					</div>
				</div>
			</el-main>
			<!-- <Scroll :themeColor="Desktheme.ThemeColor"></Scroll> -->
			<el-footer style="margin:0;padding:0">
				<Footer></Footer>
			</el-footer>
		</el-container>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import Header from '@/components/desk/header/header.vue';
import LineTitle from '@/components/desk/design/line_title.vue';
import Project from '@/components/desk/design/project.vue';
import Tab from '@/components/desk/project/tab.vue';
// import Design from '@/components/desk/design/design.vue';
import Footer from '@/components/desk/design/footer.vue';
import Scroll from '@/components/common/scrollprogress.vue';
// import Updown from '@/components/desk/design/updown.vue';

export default {
	data() {
		return {
			limit: 8,
			currentPage: 1, // 当前页数
			total: 0,
			CateId: -1, // 当前分类id
			project_list: [], // 项目
			tablist: []
		};
	},
	created() {
		this.getProjectList();
		this.getTabList()
	},
	mounted() {},
	computed: {
		...mapState(['Desktheme'])
	},
	watch: {},
	components: {
		Header,
		LineTitle,
		Project,
		Tab,
		Scroll,
		// Banner,
		// ColorPicker,
		// Aplayer,
		// Design,
		Footer,
		// Updown
	},
	methods: {
		async getProjectList(stateid,key) {
			
			if(stateid&&!key){
				console.log(stateid,'切换tab栏')
				this.project_list=[]
				this.total=0
				this.currentPage=1
			}
			if(stateid&&key){
				// console.log(stateid,'分页')
				// this.project_list=[]
			}
			this.CateId=stateid?stateid:-1
			const res = await this.Api.sendUniCloud(this, {
				model: 'getProjectList',
				event: {
					page: this.currentPage,
					limit: this.limit,
					cate_id: this.CateId
				}
			});
			console.log(res, '获取项目列表');
			if (!res.statu){
				this.project_list=[]
				this.total=0
				return
			}
			if (res.data.length == 0){
				this.project_list=[]
				this.total=0
				return
			}
			this.project_list=res.data
			this.total=res.total
		},
		async getTabList(){
			const res = await this.Api.sendUniCloud(this, {
				model: 'getProjectCate',
				event: {}
			});
			// console.log(res, '获取分类');
			if (!res.statu) return;
			this.tablist = res.data;
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.currentPage = val;
			this.getProjectList(this.CateId,'changeoffset')
		},
	}
};
</script>

<style lang="less" scoped>
.deskProject {
	.el-main {
		width: 100%;
		.main_content {
			width: 100%;
			overflow: hidden;
			.page {
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.notProject {
				height: 15rem;
				display: flex;
				justify-content: center;
				align-items: center;
				.hint {
					font-size: 2rem;
					color:#b5b5b5;
				}
			}
		}
	}
}
</style>
