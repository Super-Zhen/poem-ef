<template>
	<view class="content">
		<view class="bg">
			<swiper class="swiper" previous-margin="54rpx" next-margin="54rpx" :indicator-dots="indicatorDots"
				@change="change" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
				<swiper-item v-for="(itt,idx) in item" :key="idx">
					<hm-cover-card @click="like" :options="itt" :index="index==idx?true:false" :idx="idx">
					</hm-cover-card>
				</swiper-item>
			</swiper>
			<!-- <text class="cpy">©2020  浩动技术支持</text> -->
		</view>
	</view>
</template>

<script>
	import HmCoverCard from '@/components/yang-cover-card/index.vue'
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
		async onShow() {
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
				// uni.showLoading({
				// 	title: '加载中...'
				// })

				// let items = [{
				// 		content: "看时间不是为了起床，而是看还能睡多久。",
				// 		created_at: "2020-12-27 22:38:31",
				// 		// good_cover: "../../static/pic/1.jpg",
				// 		id: 1,
				// 		name: "看时间",
				// 		updated_at: "2020-12-27 22:38:31",
				// 		zan: 0
				// 	},
				// 	{
				// 		content: "一个人最长的恋爱史，大概就是自恋了。",
				// 		created_at: "2020-12-27 22:38:01",
				// 		// good_cover: "../../static/pic/2.jpg",
				// 		id: 2,
				// 		img_id: "205",
				// 		name: "自恋",
				// 		updated_at: "2020-12-27 22:38:01",
				// 		zan: 0
				// 	},
				// 	{
				// 		content: "今天天气很好，在房间里宅久了，准备去客厅散散心。",
				// 		created_at: "2020-12-27 22:37:36",
				// 		// good_cover: "../../static/pic/3.jpg",
				// 		id: 3,
				// 		img_id: "203",
				// 		name: "散心",
				// 		updated_at: "2020-12-27 22:37:36",
				// 		zan: 0
				// 	},
				// 	{
				// 		content: "人在寂寞中有三种状态。一是惶惶不安，茫无头绪，百事无心，一心逃出寂寞。二是渐渐习惯于寂寞，安下心来，建立起生活的条理，用读书、写作或别的事务来驱逐寂寞。三是寂寞本身成为一片诗意的土壤，一种创造的契机，诱发出关于存在、生命、自我的深邃思考和体验。",
				// 		created_at: "2020-12-27 22:37:04",
				// 		// good_cover: "../../static/pic/4.jpg",
				// 		id: 4,
				// 		img_id: "199",
				// 		name: "周国平，《独处是一种能力》",
				// 		updated_at: "2020-12-27 22:37:04",
				// 		zan: 0
				// 	},
				// 	{
				// 		content: "为别人而去刻意改变自己是无意义的，因为那样你就不是你了。TA连真正的你都不爱，就更不会爱上不是你的你了。",
				// 		created_at: "2020-12-27 22:36:29",
				// 		// good_cover: "../../static/pic/1.jpg",
				// 		id: 5,
				// 		img_id: "202",
				// 		name: "无意义的",
				// 		updated_at: "2020-12-27 22:36:29",
				// 		zan: 0
				// 	}
				// ];
				// uni.hideLoading();
				// items.map((itd) => {
				// 	let options = {
				// 		id: itd.id,
				// 		entryPic: itd.good_cover,
				// 		title: itd.name,
				// 		text: itd.content,
				// 		zan: itd.zan,
				// 		shoucang: '/static/hm-cover-card/images/img_25361_0_0.png'
				// 	}
				// 	this.item.push(options)
				// })
				this.$api.works.getQuotesIncludeCount({authorId: '',collectionId: '',dynasty: '',kind: '',page: 1,perPage: 30}).then(res=>{
					console.log(res)
					this.item = res.result.quotes
				})

			},
			like(val) {
				console.log(val)
				if (val.zan) {
					this.item[val.idx].zan++
				} else {
					this.item[val.idx].zan--
				}
				//this.init();
			}
		}
	}
</script>

<style lang="less">
	.content {
		width: 100%;
		height: calc(100vh);
		position: relative;

		.bg {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: calc(100vh);
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

			.note {
				width: 96%;
				padding-top: 38px;
				margin-bottom: 10px;
				position: relative;
				background: url(../../static/img/bg-note-top.png) top center no-repeat;
			}

			.note-container {
				width: 100%;
				text-indent: 2em;
				background: url(../../static/img/bg-note-middle.png) top center repeat-y;
				overflow: hidden;

				text {
					width: 60%;
					display: block;
					margin: 0 auto;
					text-align: justify;
					line-height: 60upx;
				}
			}

			.note-bottom {
				width: 100%;
				padding-bottom: 34px;
				background: url(../../static/img/bg-note-bottom.png) bottom center no-repeat;
			}


		}

	}
</style>
