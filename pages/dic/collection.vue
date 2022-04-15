<template>
	<view>
		{{collectObj.name}}
		{{collectObj.desc}}
		{{collectObj.worksCount}}
		<view>
			<template v-for="(item,index) in poemList">
				<view :key='index'>
					{{item.title}}
					{{item.content}}
					{{item.dynasty}}
					{{item.authorName}}
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectObj:{},
				poemList:[],
				page:1,
				perPage:50,
				collectionId:''
			}
		},
		onLoad(option) {
			if(option && option.collection){
				this.collectionId = option.collection
				this.getCollectionById({collectionId:option.collection})
				this.getWorksByCollection({collectionId:option.collection})
			}
		},
		onReachBottom() {
			this.page++
			this.getWorksByCollection({collectionId:this.collectionId})
		},
		methods: {
			getCollectionById(param){
				this.$api.works.getCollectionById(param).then(res=>{
					console.log(res.result)
					uni.setNavigationBarTitle({
						title:res.result.name
					})
					this.collectObj = res.result
				})
			},
			getWorksByCollection(param){
				let params = {...param, page:this.page, perPage:this.perPage}
				this.$api.works.getWorksByCollection(params).then(res=>{
					console.log(res)
					res.result = res.result.map(item=>{
						item.content = item.content.split('。')[0]
						return item
					})
					this.poemList.push(...res.result)
					this.$forceUpdate()
				})
			}
		}
	}
</script>

<style>

</style>
