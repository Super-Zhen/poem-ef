<template>
	<div class="hm-cover-card" :class="index?'active':''">
		<div class="box">
			<view class="body">
				<view class="df quote">
					<template v-for="(item,indexs) in option.quote">
						<text :key="indexs" v-if='item'>{{item}}</text>
					</template>
				</view>


			</view>
			<view class="df ffcn mg authorBox">
				<text class="author">{{options.authorName}} <text class="dynasty">{{options.dynasty}}</text></text>
				<!-- <text class="dynasty">{{options.dynasty}}</text> -->
			</view>


			<!-- <div class="body">
				<image class="entryPic" :src="options.entryPic" mode="widthFix" />
			</div>
			<div class="ft">
				<div class="wrap">
					<text class="title">{{ options.text }}</text>
				</div>

			</div>
			<text class="text" v-if="options.title">- {{ options.title }} -</text>
			<view class="zans" @click="dianzan">
				<image class="zan-img" :src="zan?'../../static/zan2.png':'../../static/zan1.png'" mode="widthFix">
				</image>
				<text class="zan-num">{{options.zan}}</text>
			</view> -->
		</div>

	</div>
</template>
<script>
	export default {
		name: 'HmCoverCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-cover-card'
			},
			inits: {
				type: Boolean,
				default: false
			},
			index: {
				type: Boolean,
				default: false
			},
			idx: {
				type: Number,
				default: 0
			},
			options: {
				type: Object,
				default: function() {
					return {

					};
				}
			}
		},
		data() {
			return {
				zan: false,
			};
		},
		computed: {
			option() {
				let data = this.options.quote.replace(/。|？|\，|；|、|！|：/g, '|')
				this.options.quote = data.split('|').map(item => {
					// let items = item.replace(/。/g,'')
					return item
				})
				return this.options
			}
		},
		methods: {
			async dianzan() {
				this.zan = this.zan ? false : true;
				this.$emit('click', {
					zan: this.zan,
					idx: this.idx
				});
				let res = this.$api.sentenceZan({
					id: this.options.id
				})
			}
		}
	};
</script>
<style>
	/* #ifdef MP-WEIXIN */
	
	@import './index.response.css';
	.quote{
		font-family: "KaiTi";
	}
	
	/* #endif */
	
	/* #ifdef APP */
	.ccccc{
		background-color: #fff;
	}
	@import url('~@/static/font/kaiti.css');
	/* #endif */
	
	
</style>
