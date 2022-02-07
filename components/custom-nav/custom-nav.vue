<template>
    <view class="uni_topbar" :style="style">
        <view class="inner flexbox flex_alignc flex_justc" :class="[fixed ? 'fixed' : '']" :style="[{'height': customBarH + 'px', 'padding-top': navPadding + 'px', 'color': titleTintColor}, bgColor]">
            <!-- 返回 -->
            <!-- <text class="uni_icoBack iconfont icon-arrL" v-if="isBack" @tap="goBack"></text> -->
            <view v-if="isBack" @tap="goBack">
                <slot name="back"></slot>
            </view>
            <slot name="headerL"></slot>
            <!-- 标题 -->
            <!-- #ifndef MP -->
            <!-- <view class="flex1" v-if="!search && center"></view> -->
            <!-- #endif -->
			<view class="uni_title flex1" :class="[center ? 'uni_titleCenter' : '']" :style="[isBack ? {'font-size': '32upx', 'padding-left': '0'} : '']" v-if="!search && title">
				<view v-if="title">
					{{title}}
				</view>
				<!-- <view v-else class="navbox">
					<slot name="center"></slot>
				</view> -->
			</view>
			<view class="uni_search flex1" :class="[searchRadius ? 'uni_searchRadius' : '']" v-if="search"> />
				<input class="uni_searchIpt flex1" type="text" placeholder="搜索" placeholder-style="color: rgba(255,255,255,.5);" />
			</view>
            <!-- 右侧 -->
            <view class="uni_headerRight flexbox flex_row flex_alignc">
                <slot name="iconfont"></slot>
                <slot name="string"></slot>
                <slot name="image"></slot>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                statusBarH: 25,
                // statusBarH: this.statusBar,
                // customBarH: this.customBar
                customBarH: 50
            }
        },
        props: {
			/***　　isBack              是否返回按钮
			　　title               标题
			　　titleTintColor      标题颜色
			　　bgColor             背景
			　　center              标题居中
			　　search              搜索条
			　　searchRadius        圆形搜索条
			　　fixed               是否固定*/
            isBack: { type: [Boolean, String], default: false },
            title: { type: String, default: '' },
            titleTintColor: { type: String, default: '#fff' },
            bgColor: Object,
            center: { type: [Boolean, String], default: false },
            search: { type: [Boolean, String], default: false },
            searchRadius: { type: [Boolean, String], default: false },
            fixed: { type: [Boolean, String], default: false },
        },
        computed: {
            style() {
				let _style = `height: ${this.customBarH}px;`
				// #ifdef APP-PLUS
				_style = `height: ${this.customBarH+this.statusBarH}px;`
				// #endif
                return _style
            },
			navPadding(){
				let _padding = 0
				// #ifdef APP-PLUS
					_padding = this.statusBarH
				// #endif
				return _padding
			}
        },
        methods: {
            goBack() {
                uni.navigateBack()
            }
        }
    }
</script>
<style scoped>
	.uni_topbar{
		z-index: 999;
	}
	.fixed{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}
	.navbox{
		height:100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.flexbox{
		display: flex;
	}
	.flex_alignc{
		align-items: center;
	}
	.flex_justc{
		justify-content: space-between;
	}
</style>