<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	/* @import "//at.alicdn.com/t/font_3096915_gjpgqyyk7x.css"; */
	@import "./static/font/iconfont.css";
	@import "./common/css/common.less";
	page{
		background-color: #eceef3;
	}
	
	/* .uni-page-head-btn{
		margin:0 16px;
	} */
</style>
