<template>
	<div class="project_tab" ref="activecolor">
		<!-- <el-divider></el-divider> -->
		<ul class="tabs">
			<li
				class="tab"
				id="-1"
				@mouseover="overPost"
				@mouseout="outPost"
				:style="{ color: activeId == -1 ? Desktheme.ThemeColor : '#000', borderBottomColor: activeId == -1 ? Desktheme.ThemeColor : 'transparent' }"
				@click="search"
			>
				<i class="el-icon-user-solid"></i>
				<span>全部</span>
			</li>
			<li
				class="tab"
				:id="index"
				@mouseover="overPost"
				@mouseout="outPost"
				:style="{ color: activeId == index ? Desktheme.ThemeColor : '#000', borderBottomColor: activeId == index ? Desktheme.ThemeColor : 'transparent' }"
				@click="search"
				v-for="(item, index) in tablist"
				:key="index"
			>
				<i class="el-icon-user-solid"></i>
				<span>{{ item.name }}</span>
			</li>
		</ul>
		<!-- <el-divider></el-divider> -->
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			activeId: -1
		};
	},
	props: {
		tablist: Array
	},
	computed: {
		...mapState(['Desktheme'])
	},
	components: {},
	onLoad() {
		this.$refs.activecolor.style.setProperty('--activeColor', this.$store.state.Desktheme.ThemeColor);
	},
	methods: {
		search(e) {
			this.activeId = Number(e.currentTarget.id)
			let cate_id=this.tablist[e.currentTarget.id]?this.tablist[e.currentTarget.id].cate_id:-1
			this.$emit('changeTab', cate_id);
		},
		// 鼠标移入
		overPost() {
			// console.log('鼠标移入')
			this.$refs.activecolor.style.setProperty('--activeColor', this.$store.state.Desktheme.ThemeColor);
		},
		// 鼠标移出
		outPost() {
			// console.log('鼠标移出')
			this.$refs.activecolor.style.setProperty('--activeColor', '#fff');
		}
	}
};
</script>

<style lang="less" scoped>
.project_tab {
	--activeColor: red;
	width: 100%;
	margin: 2rem 0 0 0;
	.tabs {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		.tab {
			padding: 0 1rem;
			line-height: 2rem;
			font-size: 0.8rem;
			font-weight: 530;
			border-bottom: 2px solid;
			cursor: pointer;
			position: relative;
			
		}
		.tab::after{
			content: '';
			position: absolute;
			left: 0;
			bottom: -2px;
			width: 100%;
			height: 2px;
			transition: all 0.5s;
			transform: scaleX(0.1);
		}
		.tab:hover {
			// color:#000!important;
		}
		.tab:hover:after {
			transform: scaleX(1);
			background-color: var(--activeColor);
		}
	}
}

</style>
