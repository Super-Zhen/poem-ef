<template>
	<view class="">
		<template v-for="(items, indexs) in list">
			<view class="lineBorder bgcf3f3f3"></view>
			<view :key="indexs" class="items">
				<view class="title" v-if='items.title'>{{items.title}}</view>
				<template v-for="(item,index) in items.listItem">
					<view class="df aic jcsb item borderB bgCfff" :key="index">
						<text class="fontS14">{{item.title}}</text>
						<view class="df aic" v-if="item.icon" @tap='toPage(item)'>
							<text v-if="item.label" class="fontS14">{{item.label}}</text>
							<uni-icons :type="item.icon" :color="item.color?item.color:'#666666'" size="20" />
						</view>
						<view v-else-if="item.switch">
							<switch v-if='item.flag=="collect"' :checked='collectChecked' @change='changeCollect'
								style="transform:scale(0.8)" />
							<switch v-if='item.flag=="type"' :checked='typeChecked' @change='changeType'
								style="transform:scale(0.8)" />
						</view>
					</view>
				</template>
			</view>
		</template>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: "borderLines",
		props: {
			collectChecked: {
				type: Boolean,
				default: true
			},
			typeChecked: {
				type: Boolean,
				default: true
			},
			list:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {

			};
		},
		components: {
			uniIcons
		},
		methods: {
			toPage(url) {
				console.log(url)
			},
			changeCollect(e) {
				this.collectChecked = e.detail.value
				// console.log(e)
			},
			changeType(e) {
				this.typeChecked = e.detail.value
			}
		}
	}
</script>

<style scoped>
	.lineBorder {
		border: 1rpx solid #e3e3e3;
		border-right: 0;
		border-left: 0;
		height: 40rpx;
	}

	.title {
		color: #999999;
		font-size: 26rpx;
		line-height: 60rpx;
		padding-left: 40rpx;
		background-color: #FFFFFF;
	}

	.items {
		color: #666666;
	}

	.item {
		padding: 20rpx 30rpx;
	}
</style>
