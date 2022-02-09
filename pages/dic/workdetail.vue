<template>
	<view>
		<view class="pd20">
			<view>
				<view class="fontS22 textCenter ">
					{{workDetail.title}}
				</view>
				<view class="textCenter mgt15 mgb10">[{{workDetail.dynasty}}]{{workDetail.authorName}}</view>
				<view v-for="(item,index) in workContent" class="fontS16 textJustify mgb5 textIndent2 lineH28" style="white-space:pre-wrap">
					{{item}}
				</view>
			</view>
			<view>
				<view class="info mgt10 mgb10 fontS18">
					<text :class="active==0?'colorfd5c5a':''" @tap="active=0">评析</text>
					<text :class="active==1?'colorfd5c5a':''" @tap="active=1">注释</text>
					<text :class="active==2?'colorfd5c5a':''" @tap="active=2">译文</text>
				</view>
				<view class="lineH28 textJustify">
					<view v-show='active===0' class="textIndent2" >
						{{workDetail.intro}}
					</view>
					<view v-show="active===1">
						<view v-for="(item,index) in annotation">
							<text class="fontW">{{item.split("：")[0]}}:</text>
							<text>{{item.split("：")[1]}}</text>
						</view>
					</view>
					<view v-show="active===2">
						<view v-for="(item, index) in translation" :key="index">
							<view class="textIndent2">{{item}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {setTitle} from '@/util/index.js'
	// let markdown = filters.markdown;
	export default {
		data() {
			return {
				active:0,
				workDetail:'',
				workContent:'',
				annotation:'',
				translation:''
			}
		},
		onLoad(options) {
			console.log(options)
			this.getWorkById({workId:options.id})
		},
		methods: {
			async getWorkById(data){
				let {result} = await this.$api.works.getWorkById(data)
				console.log(result)
				debugger
				setTitle(result)
				this.workDetail = result
				this.workContent = this.textSplit(result.content)
				this.annotation = this.textSplit(result.annotation)
				this.translation = this.textSplit(result.translation)
				
			},
			textSplit(text){
				return text.split('\r\n')
			}
		}
	}
</script>

<style lang="less" scoped>
.textIndent2{
	text-indent: 2em;
}
.info{
	text{
		padding-right: 10px;
	}
}
</style>
