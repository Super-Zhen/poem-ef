<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			this.setAppInfo()
		},
		methods: {
			async setAppInfo() {
				let that = this;
				return new Promise((resolve, reject) => {
					uni.getSystemInfo({
						success: function(e) {
							// Vue.prototype.StatusBar = e.statusBarHeight;
							// // #ifdef H5
							// Vue.prototype.CustomBar = e.statusBarHeight + 45;
							// // #endif

							// // #ifdef APP-PLUS
							// if (e.platform == "android") {
							//   Vue.prototype.CustomBar = e.statusBarHeight + 50;
							// } else {
							//   Vue.prototype.CustomBar = e.statusBarHeight + 45;
							// }
							// // #endif	
							// #ifdef MP-WEIXIN
							console.log(e)
							Vue.prototype.statusBarHeight = e.statusBarHeight
							let custom = wx.getMenuButtonBoundingClientRect();
							console.log(custom)
							// Vue.prototype.Custom = custom;
							// Vue.prototype.CustomBar = custom.bottom + custom.top - e
							// 	.statusBarHeight;
							// #endif
						},
					});
				});
			}
		},
	}
</script>

<style lang="less">
	/*每个页面公共css */
	/* @import "//at.alicdn.com/t/font_3096915_gjpgqyyk7x.css"; */
	@import "./static/font/iconfont.css";
	@import "./common/css/common.less";
	// page{
	// 	background-color: #eceef3;
	// }

	/* .uni-page-head-btn{
		margin:0 16px;
	} */
</style>
