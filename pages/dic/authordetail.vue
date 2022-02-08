<template>
	<view class="fontS16">
		<view class="content" v-show='authorDetail'>
			<view class="pd20 fontS22 fontW">{{authorDetail.name}}</view>
			<view class="pdl20">
				<text>[{{authorDetail.dynasty}}]</text>
				<text>{{authorDetail.birthYear}}</text>~<text>{{authorDetail.deathYear}}</text>
			</view>
			<view class="pd20">
				<view class="colorf92130a">简介</view>
				<view class="mgt10 lineH32 textJustify">
					{{authorDetail.desc}}
				</view>
			</view>
		</view>
		<view class="works " v-show='authorWorks.length'>
			<view class="mgb15 pdl20 colorf92130a fontS18">作品 / {{authorDetail.worksCount}}</view>
			<view class="pd10 borderB" v-for="item in authorWorks" :key='item.objectId'  @tap='toWorkDetail(item.objectId)'>
				<view class="df jcsb mgb10">
					<text class=" colorf6495ed fontW">{{ item.title }}</text>
					<text class="fontS15 color999">[{{ item.dynasty }}]{{item.authorName}}</text>
				</view>
				<view class="fontS15 color999">{{item.content.split('。')[0]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorDetail:'',
				authorWorks:[]
			}
		},
		mounted() {
			console.log(111)
		},
		onLoad:function(options) {
			console.log('options',options.id)
			uni.setNavigationBarTitle({
				title:options.name
			})
			this.getAuthorById2({authorId:options.id});
			this.getWorksByAuthor({authorId: options.id,page: 1,perPage: 20})
		},
		methods: {
			async getAuthorById2(data){
				let res = await this.$api.works.getAuthorById2(data)
				console.log(res)
				this.authorDetail = res.result
			},
			async getWorksByAuthor(data){
				let res = await this.$api.works.getWorksByAuthor(data)
				this.authorWorks = res.result
			},
			toWorkDetail(id){
				uni.navigateTo({
					url:`/pages/dic/workdetail?id=${id}`
				})
			}
		}
	}
</script>

<style scoped>
.lineH32{
	line-height: 32px;
}
</style>
