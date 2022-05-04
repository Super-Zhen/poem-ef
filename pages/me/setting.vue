<template>
	<view class="pdb30">
		<borderlines :list="list"></borderlines>
		<!-- <view class="height30 bgC6cc051"></view> -->
		<view class="mgt40">
			<button class="fontS16">退出登录</button>
		</view>
	</view>
</template>

<script>
	import borderlines from '@/components/borderLines.vue'
	export default {
		data() {
			return {
				list:[]
			}
		},
		components:{
			borderlines
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background-color: #f8f8f8;
}
.bgcf3f3f3{
	background-color: #f3f3f3;
}
</style>
