<template>
	<!-- 项目 -->
	<div class="project">
		<div class="project_list">
			<el-row :gutter="30">
				<el-col v-for="(item, index) in project_list" :key="item._id" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
					<div data-aos="fade-up" class="project_item" :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }">
						<div class="content">
							<h4 class="title project_name">{{ item.name }}</h4>
							<div class="info">{{ item.intro }}</div>
						</div>
						<div class="bg"></div>
						<div class="tag">
							<div class="tagbox">
								<el-tooltip class="item" effect="dark" :content="item.porjectUrl.indexOf('http') == -1 ? '暂无Demo' : '点击前往'" placement="top-start">
									<div class="btn" @click="to_xm(item.porjectUrl)" :style="{ background: Desktheme.ThemeColor }">
										<i class="el-icon-position"></i>
										<span>预览</span>
									</div>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="item.sourceUrl.indexOf('http') == -1 ? '暂无源码' : '点击前往'" placement="top-start">
									<div class="btn" @click="to_github(item.sourceUrl)" :style="{ background: Desktheme.ThemeColor }">
										<i class="el-icon-position"></i>
										<span>源码</span>
									</div>
								</el-tooltip>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	props: {
		project_list: Array
	},
	mounted() {},
	computed: {
		...mapState(['Desktheme'])
	},
	components: {},
	onLoad() {},
	methods: {
		// 前往项目
		to_xm(url) {
			// console.log(url.indexOf('http') == -1, '1');
			if(url.indexOf('http') == -1) return
			this.Uni.outnewHref(this, url);
		},
		// 前往源码
		to_github(url) {
			// console.log(url, '1');
			if (url.indexOf('http') == -1) return 
			this.Uni.outnewHref(this, url);
		}
	}
};
</script>

<style lang="less" scoped>
.project {
	width: 100%;
	box-sizing: border-box;
	.project_list {
		box-sizing: border-box;
		width: 100%;
		padding: 2rem;
		.project_item {
			width: 100%;
			position: relative;
			background-size: cover;
			background-position: center top;
			cursor: pointer;
			width: 100%;
			height: 220px;
			margin-bottom: 2rem;
			transition: all 0.6s linear;
			.content {
				z-index: 99;
				box-sizing: border-box;
				width: 100%;
				background-color: rgba(250,250,250,0.9);
				padding: 10px;
				position: absolute;
				bottom: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				.title {
					color: #555;
					font-size: 18px;
					line-height: 2rem;
					height: 2rem;
					overflow: hidden;
				}
				.info {
					color: #999;
					font-size: 12px;
					line-height: 1.2rem;
					height: 2.5rem;
					overflow: hidden;
				}
			}
			.bg {
				width: 100%;
				height: 100%;
				display: none;
				background-color: #333;
				opacity: 0.2;
			}
			.tag {
				z-index: 100;
				width: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: none;
				.tagbox {
					display: flex;
					justify-content: center;
					align-items: center;
					.btn {	
						margin: 0 10px;
						width: 60px;
						height: 60px;
						border-radius: 60px;
						color: #fff;
						font-size: 10px;
						// background-color: pink;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}
					.btn:hover {
						background-color: #fff !important;
						color: #333;
					}
					@keyframes btnhover {
						0% {
						}
						100% {
						}
					}
				}
			}
		}
		.project_item:hover {
			// animation: project_item-hover 1s ease-in;
			transform: scale(1.15);
			// transition:height 2s;
			.bg {
				display: block;
			}
			.content {
				display: none;
				background-color: transparent;
				.title,
				.info {
					color: #fff;
				}
			}
			.tag {
				display: block;
			}
		}
	}
}
@keyframes project_item-hover {
	0% {
		// transform: scale(1);
	}
	100% {
		transform: scale(1.2);
	}
}
</style>
