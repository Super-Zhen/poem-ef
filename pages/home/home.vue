<template>
	<view class="content">
		<view class="bg">
			<swiper class="swiper" previous-margin="54rpx" next-margin="54rpx" :indicator-dots="indicatorDots"
				@change="change" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
				<swiper-item v-for="(itt,idx) in item" :key="idx">
					<hm-cover-card @click.native="like(itt)" :options="itt" :index="index==idx?true:false" :idx="idx">
					</hm-cover-card>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import HmCoverCard from '@/components/yang-cover-card/index.vue'
	import { randomNum } from '@/util/index.js'
	export default {
		components: {
			HmCoverCard
		},
		data() {
			return {
				title: 'Hello',
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				circular: false,
				item: [],
				index: 0,

			}
		},
		async onLoad() {
			this.item = [];
			this.init();
		},
		onPullDownRefresh() {
			this.item = [];
			setTimeout(() => {
				this.init();
				uni.hideNavigationBarLoading();
				// 停止下拉动作
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			change(e) {
				console.log(e)
				this.index = e.detail.current
				//this.init();
			},
			async init() {
				this.$api.works.getQuotesIncludeCount({
					authorId: '',
					collectionId: '',
					dynasty: '',
					kind: '',
					page: randomNum(1,142),
					// page: 1,
					perPage: 30
				}).then(res => {
					this.item = res.result.quotes
				})

			},
			like(val) {
				console.log(val)
				this.$yrouter.push({
					path:'/pages/dic/workdetail?id='+val.work.objectId
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		width: 100%;
		height: calc(100vh - 44px - env(safe-area-inset-bottom));
		position: relative;

		.bg {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: calc(100vh - 44px - env(safe-area-inset-bottom));
			box-sizing: border-box;
			flex-direction: column;

			.swiper {
				width: 100%;
				height: 100%;

				swiper-item {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					flex-direction: column;
				}
			}
		}

	}
</style>
