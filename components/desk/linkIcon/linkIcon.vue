<template>
	<div class="linkman">
		<div class="icons" :style="footer_touch.touch_iconbgc[0]" @mouseover="mouseOver(0)" @mouseleave="mouseLeave(0)">
			<div class="hint" :style="[footer_touch.hintStyle[0], {background: this.$store.state.Desktheme.ThemeColor}]">
				<div class="txt">gitHub</div>
				<span class="arrow" :style="{borderTop: '5px solid ' + this.$store.state.Desktheme.ThemeColor}"></span>
			</div>
			<i :style="footer_touch.touch_icon[0]" class="fa fa-github fa-lg"></i>
		</div>
		<div class="icons" :style="footer_touch.touch_iconbgc[1]" @mouseover="mouseOver(1)" @mouseleave="mouseLeave(1)">
			<div class="hint" :style="[footer_touch.hintStyle[1], {background: this.$store.state.Desktheme.ThemeColor}]">
				<div class="txt">新浪博客</div>
				<span class="arrow" :style="{borderTop: '5px solid ' + this.$store.state.Desktheme.ThemeColor}"></span>
			</div>
			<i :style="footer_touch.touch_icon[1]" class="fa fa-weibo fa-lg"></i>
		</div>
		<div class="icons" :style="footer_touch.touch_iconbgc[2]" @mouseover="mouseOver(2)" @mouseleave="mouseLeave(2)">
			<div class="hint" :style="[footer_touch.hintStyle[2], {background: this.$store.state.Desktheme.ThemeColor}]">
				<div class="centent"><img src="../../../static/img/qq.png" alt="" /></div>
				<span class="arrow" :style="{borderTop: '5px solid ' + this.$store.state.Desktheme.ThemeColor}"></span>
			</div>
			<i :style="footer_touch.touch_icon[2]" class="fa fa-qq fa-lg"></i>
		</div>
		<div class="icons" :style="footer_touch.touch_iconbgc[3]" @mouseover="mouseOver(3)" @mouseleave="mouseLeave(3)">
			<div class="hint" :style="[footer_touch.hintStyle[3], {background: this.$store.state.Desktheme.ThemeColor}]">
				<div class="centent"><img src="../../../static/img/wx.png" alt="" /></div>
				<span class="arrow" :style="{borderTop: '5px solid ' + this.$store.state.Desktheme.ThemeColor}"></span>
			</div>
			<i :style="footer_touch.touch_icon[3]" class="fa fa-wechat fa-lg"></i>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			// footer touch样式
			footer_touch: {
				touch_iconbgc: [
					{
						background: '#fff'
					},
					{
						background: '#fff'
					},
					{
						background: '#fff'
					},
					{
						background: '#fff'
					}
				],
				touch_icon: [
					{
						color: '#333'
					},
					{
						color: '#333'
					},
					{
						color: '#333'
					},
					{
						color: '#333'
					}
				],
				hint_bgc: {
					background: this.$store.state.Desktheme.ThemeColor
				},
				hint_arrowc: {
					borderTop: '5px solid ' + this.$store.state.Desktheme.ThemeColor
				},
				hintStyle: [
					{
						display: 'none'
					},
					{
						display: 'none'
					},
					{
						display: 'none'
					},
					{
						display: 'none'
					}
				]
			}
		};
	},
	computed: {},
	components: {},
	onLoad() {
		
	},
	methods: {
		// footer 鼠标事件
		mouseOver(i) {
			// console.log(i,'触摸')
			this.footer_touch.touch_icon.forEach(item => {
				item.color = '#333';
			});
			this.footer_touch.touch_iconbgc.forEach(item => {
				item.background = '#fff';
			});
			this.footer_touch.hintStyle.forEach(item => {
				item.display = 'none';
			});
			this.footer_touch.touch_icon[i].color = '#fff';
			this.footer_touch.touch_iconbgc[i].background = this.$store.state.Desktheme.ThemeColor;
			this.footer_touch.hintStyle[i].display = 'block';
			// 显示二维码
		},
		mouseLeave(i) {
			// console.log(i,'离开')
			this.footer_touch.touch_icon[i].color = '#333';
			this.footer_touch.touch_iconbgc[i].background = '#fff';
			this.footer_touch.hintStyle[i].display = 'none';
		}
	}
};
</script>

<style lang="less" scoped>
.linkman {
	width: 10rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		// margin-bottom: 3rem;
		border-radius: 4rem;
		line-height: 3rem;
		text-align: center;
		// 提示
		.hint {
			z-index: 999;
			border-radius: 5px;
			position: absolute;
			bottom: 42px;
			left: 50%;
			transform: translateX(-50%);
			// background-color: #f7600e;
			.centent {
				padding: 1px;
				width: 80px;
				height: 80px;
				img {
					border-radius: 5px;
					width: 100%;
					height: 100%;
				}
			}
			.txt {
				width: 70px;
				height: 35px;
				font-size: 14px;
				line-height: 14px;
				line-height: 35px;
				color: #fff;
			}
			.arrow {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -10px;
				display: inline-block;
				// border-top: 5px solid #f7600e;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-bottom: 5px solid transparent;
			}
		}
		i {
			font-size: 1rem;
		}
	}
}
</style>
