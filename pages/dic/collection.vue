<template>
	<view>
		<view class="collection">
			<view class="fontS22 fontW pd5">
				{{collectObj.name?`「 ${collectObj.name}」`:''}}
			</view>
			<view class="desc">
				{{collectObj.desc}}
			</view>
			<view class="desc">
				{{collectObj.worksCount?`共${collectObj.worksCount}首`:''}}
			</view>
		</view>
		<view class="works">
			<template v-for="(item,index) in poemList">
				<view :key='index' class="work-item">
					<view class="df jcsb mgb5">
						<text class="title">
							{{item.title}}
						</text>
						<text class="author">[ {{item.dynasty}}] {{item.authorName}}</text>
					</view>
					<view class="content">
						{{item.content}}
					</view>


				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectObj: {},
				poemList: [],
				page: 1,
				perPage: 50,
				collectionId: ''
			}
		},
		onLoad(option) {
			if (option && option.collection) {
				this.collectionId = option.collection
				this.getCollectionById({
					collectionId: option.collection
				})
				this.getWorksByCollection({
					collectionId: option.collection
				})
			}
		},
		onReachBottom() {
			this.page++
			this.getWorksByCollection({
				collectionId: this.collectionId
			})
		},
		methods: {
			getCollectionById(param) {
				this.$api.works.getCollectionById(param).then(res => {
					console.log(res.result)
					uni.setNavigationBarTitle({
						title: res.result.name
					})
					this.collectObj = res.result
				})
			},
			getWorksByCollection(param) {
				let params = {
					...param,
					page: this.page,
					perPage: this.perPage
				}
				this.$api.works.getWorksByCollection(params).then(res => {
					console.log(res)
					res.result = res.result.map(item => {
						// if(item.content.includes(''))
						if (item.content.indexOf('。') > -1 && item.content.indexOf('？') > -1) {
							if (item.content.indexOf('。') > item.content.indexOf('？')) {
								item.content = item.content.split('？')[0] + '？'
							} else {
								item.content = item.content.split('。')[0] + '。'
							}
						} else if (item.content.indexOf('。') > -1) {
							item.content = item.content.split('。')[0] + '。'
						} else if (item.content.indexOf('？') > -1) {
							item.content = item.content.split('？')[0] + '？'
						}
						if (item.content.indexOf('；') > -1) {
							item.content = item.content.split('；')[0] + '；'
						}
						return item
					})
					this.poemList.push(...res.result)
					this.$forceUpdate()
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.collection {
		padding: 60rpx 0;
		border-bottom: 1px solid #eaeaea;
		text-align: center;

		.desc {
			font-size: 28rpx;
			color: #aaa;
			margin-top: 10rpx;
		}
	}

	.works {
		.work-item {
			padding: 30rpx 40rpx;
			font-size: 14px;
			border-bottom: 1px solid #eaeaea;
			color: #aaa;

			.title {
				font-size: 16px;
				color: #6495ed;
				font-weight: 700;
			}
		}
	}
</style>
