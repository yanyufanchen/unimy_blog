<template>
	<div class="design">
		<div class="tag" data-aos="fade-up" aos-offset="200" aos-easing="ease-in-sine" aos-duration="600"><span :style="{marginTop:'2rem' }">站点统计</span></div>
		<!-- 统计 -->
		<div class="tatistic" data-aos="fade-up">
			<div class="tatistic_box">
				<el-row style="width: 100%;">
					<el-col v-for="(item, index) in tatistic_list" :key="index" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
						<div class="tatistic_item">
							<h3 class="num" :style="{ color: '#fff' }">{{ item.total }}</h3>
							<h5 class="txt" :style="{ color: '#fff' }">{{ item.name }}</h5>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- 文章 -->
		<LineTitle data-aos="fade-up" title="博客技术文"></LineTitle>
		<div class="post_box" >
			<Post :post_list="post_list"></Post>
		</div>
		<div class="tag">
			<span :style="{marginBottom:'2rem' }"><i style="margin-right:5px" class="el-icon-thumb"></i>查看更多</span>
		</div>
		<!-- 项目 -->
		<LineTitle title="开源项目" data-aos="fade-up"></LineTitle>
		<div class="project_box" >
			<Project :project_list="project_list"></Project>
		</div>
		<div class="tag" data-aos="fade-up">
			<span :style="{marginBottom:'2rem' }"><i style="margin-right:5px" class="el-icon-thumb"></i>查看更多</span>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Post from './post.vue'
import Project from './project.vue'
import LineTitle from './line_title.vue'
export default {
	data() {
		return {
			tatistic_list: [], // 站点统计
			post_list: [], // 文章
			project_list: [] // 项目
		};
	},
	mounted() {
		this.tatistic_list = [
			{
				name: '本站总访问量',
				total: 27777 + '人次'
			},
			{
				name: '访客数',
				total: 277 + '人次'
			},
			{
				name: '发表文章数',
				total: 177 + '篇'
			},
			{
				name: '开源项目数',
				total: 17 + '个'
			}
		];
		this.post_list = [
			{
				name: '本站总访问量',
				total: 27777 + '人次'
			},
			{
				name: '访客数',
				total: 277 + '人次'
			},
			{
				name: '发表文章数',
				total: 177 + '篇'
			},
			{
				name: '开源项目数',
				total: 17 + '个'
			},
			{
				name: '开源项目数',
				total: 17 + '个'
			},
			{
				name: '开源项目数',
				total: 17 + '个'
			}
		];
		this.project_list = [
			{
				name: '本站总访问量',
				total: 27777 + '人次'
			},
			{
				name: '访客数',
				total: 277 + '人次'
			},
			{
				name: '发表文章数',
				total: 177 + '篇'
			},
			{
				name: '开源项目数',
				total: 17 + '个'
			},
			{
				name: '开源项目数',
				total: 17 + '个'
			},
			{
				name: '开源项目数',
				total: 17 + '个'
			}
		];
	},
	computed: {
		...mapState(['Desktheme'])
	},
	components: {
		Post,
		Project,
		LineTitle
	},
	onLoad() {},
	methods: {
		
	}
};
</script>

<style lang="less" scoped>
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
</style>
