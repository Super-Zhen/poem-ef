<template>
	<view>
		<view class="pd20">
			<view class="fontS22 textCenter ">
				{{workDetail.title}}
			</view>
			<view class="textCenter mgt15 mgb10">[{{workDetail.dynasty}}]{{workDetail.authorName}}</view>
			<view v-text="workDetail.content" style="white-space:pre-wrap">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				workDetail:'',
			}
		},
		onLoad(options) {
			console.log(options)
			this.getWorkById({workId:options.id})
		},
		methods: {
			async getWorkById(data){
				let res = await this.$api.works.getWorkById(data)
				console.log(res)
				this.workDetail = res.result
			}
		}
	}
</script>

<style>

</style>
