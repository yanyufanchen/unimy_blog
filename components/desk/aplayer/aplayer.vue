<template>
	<div class="aplayer">
		<div style="padding:10px 0;">
			<VueAplayer autoplay :music="audio[0]" :showLrc="true" slot="display" :list="audio" :theme="this.$store.state.Desktheme.ThemeColor"  />
			<!-- <a-player :music="audio" :showlrc="3" :narrow="false" theme="#b7daff" mode="circulation" v-if="flag" listmaxheight="96px" ref="player"></a-player> -->
		</div>
	</div>
</template>

<script>
import VueAplayer from 'vue-aplayer';

export default {
	props:['audio'],
	data() {
		return {
			
		};
	},
	computed: {},
	components: {
		//别忘了引入组件
		VueAplayer
	},
	async mounted() {
		//异步加载，先加载出player再使用
		// await this.init();
		// console.log(this.$refs,111)
		// let aplayer = this.$refs.player.controls;
		// aplayer.play();
	},
	onLoad() {},
	methods: {
		// async init(){
		// 	// this.obj
		// }
	}
};
</script>

<style lang="less" scoped></style>
