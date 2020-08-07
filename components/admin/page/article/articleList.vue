<template>
	<div class="grid-content bg-purple">
		<el-card class="box-card">
			<div class="post">
				<div class="post_header">
					<div class="tltle">文章列表</div>
					<div class="addPost" @click="addpost" :style="{ background: this.$store.state.themeColor }">
						<i class="el-icon-plus" style="margin-right:10px;"></i>
						<span>新增文章</span>
					</div>
				</div>
				<div class="post_center">
					<div class="selct">
						<el-dropdown @command="selctCatePost" split-button type="primary">
							全部分类
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-for="item in cateList" :key="item._id" :command="item.cate_id">{{ item.name }}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-input style="width:200px;margin-left:20px;" placeholder="请输入内容" v-model="searchPost" @clear="searchPostAllFn" :clearable="true" />
						<el-button @click="searchPostFn" type="primary" icon="el-icon-search" style="margin-left:10px;"></el-button>
					</div>
					<div class="table">
						<el-table :data="tableData" border="" style="width: 100%">
							<el-table-column prop="create_date" label="日期" width="180"></el-table-column>
							<el-table-column prop="title" label="名称" min-width="120"></el-table-column>
							<el-table-column prop="cate_name" label="所属分类" width="200"></el-table-column>
							<el-table-column label="操作" width="180">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-pagination
						background
						:page-size="limit"
						:total="ProjectTotal"
						@current-change="changePage"
						@prev-click="prevPage"
						@next-click="nextPage"
						layout="prev, pager, next"
					></el-pagination>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
	data() {
		return {
			searchPost: '',
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			cateList: [], // 文章分类
			tableData: [],
			currentPage: 1, // 当前页数
			total: 0, // 总条数
			limit: 6, // 每页显示条数
			ProjectTotal: 0,
			PostdialogVisible: false
		};
	},
	components: {
		mavonEditor
	},
	created() {
		this.getCateList();
	},
	methods: {
		// 文章分类
		async getCateList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleCate',
				event: {}
			});
			console.log(res, '获取分类');
			if (!res.statu) return;
			this.cateList = res.data;
			this.getArticleList();
		},
		// 文章列表
		async getArticleList() {
			const res = await this.Api.sendUniCloud(this, {
				model: 'getArticleList',
				event: {
					page: this.currentPage,
					limit: this.limit
				}
			});
			console.log(res, '获取文章列表');
			if (res.data.length == 0) return;
			this.tableData = res.data;
			this.ProjectTotal = res.total;
			this.tableData.forEach(item => {
				item.create_date = this.Time.formatTime(item.create_date, 'Y-M-D h:m:s');
				this.cateList.forEach(item2 => {
					if (item2.cate_id === item.cate_id) {
						item.cate_name = item2.name;
					}
				});
			});
		},
		// 文章栏选择分类
		selctCatePost(command) {
			console.log(command);
		},
		// 搜索文章
		searchPostFn() {
			console.log(this.searchPost, '搜索关键词');
		},
		searchPostAllFn(val) {
			console.log(val, '搜索全部');
		},
		addpost() {
			this.$emit('openPage', 'article');
			this.$store.commit('editArticle', {
				id: '',
				statu: 'add'
			});
		},
		// 编辑文章
		handleEdit(index, row) {
			console.log(index, row);
			this.$store.commit('editArticle', {
				id: row._id,
				statu: 'edit'
			});
			this.$emit('openPage', 'article');
		},
		// 删除文章
		async handleDelete(index, row) {
			console.log(index, row);
			const res = await this.Api.sendUniCloud(this, {
				model: 'removeArticle',
				event: { id: row._id }
			});
			console.log(res, '删除文章');
			if (!res.statu) return this.Api.Toast('删除失败','warning',this)
			this.Api.Toast(res.mes,'success',this)
			this.getArticleList();
			
		},
		// 改变当前页
		changePage(val) {
			console.log(val);
			this.currentPage = val;
			this.getArticleList();
		},
		// 上一页
		prevPage(val) {
			console.log(val);
		},
		// 下一页
		nextPage(val) {
			console.log(val);
		}
	},
	mounted() {}
};
</script>

<style lang="less">
.post {
	// min-height: 800px;
	// border-left: 1px solid #eee;
	.post_header {
		border-bottom: 1px solid #eee;
		padding: 0 10px;
		display: flex;
		height: 50px;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		.tltle {
			font-weight: 550;
			color: #000;
		}
		.addPost {
			cursor: pointer;
			padding: 0 10px;
			border-radius: 30px;
			color: #fff;
			line-height: 30px;
		}
	}
	.post_center {
		padding: 10px;
		.selct {
			margin-bottom: 30px;
			display: flex;
			align-items: center;
		}
		.table {
			margin-bottom: 20px;
		}
	}
}
</style>
