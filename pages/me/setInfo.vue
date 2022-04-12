<template>
	<view>
		<view class="photoBox">
			<view class="imgBox" @tap='chooseImg'>
				<image src="../../static/img/WechatIMG326.jpeg" mode="widthFix" class="width60"></image>
				<image src="../../static/img/photo.png" mode="widthFix" class="photo width20"></image>
			</view>
			<text class="fontS12 color999 mgt10 ">点击头像可替换头像</text>
		</view>
		<view class="itemBox mgb30">
			<view class="df ffcn">
				<text class="fontS12 color999">用户名</text>
				<text class="fontS13 mgt5">{{userInfo.realname}}</text>
			</view>
			<view>
				<image src="../../static/img/more.png" mode="widthFix" class="width15 mgt5"></image>
			</view>
		</view>
		<view class="itemBox mgb30">
			<view class="df ffcn">
				<text class="fontS12 color999">签名</text>
				<text class="fontS13 mgt5">{{userInfo.sign?userInfo.sign:'可输入签名'}}</text>
			</view>
			<view>
				<image src="../../static/img/more.png" mode="widthFix" class="width15 mgt5"></image>
			</view>
		</view>
		<view class="itemBox borderB">
			<view class="df ffcn">
				<text class="fontS12 color999">性别</text>
				<view>
					<picker :value="sexIndex" :range="sexList" range-key="label" @change="changeSex">
						<view class="uni-input df aic fontS13">
							{{sexObj[userInfo.sex]}}
						</view>
					</picker>
				</view>
			</view>
			<view>
				<image src="../../static/img/more.png" mode="widthFix" class="width15 mgt5"></image>
			</view>
		</view>
		<view class="itemBox borderB">
			<view class="df ffcn">
				<text class="fontS12 color999">生日</text>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input df aic fontS13">
						{{userInfo.birthday?userInfo.birthday:date}}
					</view>
				</picker>
			</view>
			<view>
				<image src="../../static/img/more.png" mode="widthFix" class="width15 mgt5"></image>
			</view>
		</view>
		<view class="itemBox borderB">
			<view class="df ffcn">
				<text class="fontS12 color999">地区</text>
				<!-- <text  mgt5">{{userInfo.address?userInfo.address:'未知'}}</text> -->
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<view class="fontS13">{{regionName?regionName:'未知'}}</view>
				</pick-regions>
			</view>
			<view>
				<image src="../../static/img/more.png" mode="widthFix" class="width15 mgt5"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import { dateFormatL } from '@/util/index.js'
	export default {
		data() {
			return {
				date: '未知',
				sex: '0',
				sexIndex: "0",
				sexList: [{
						label: '未知',
						value: '0'
					},
					{
						label: '男',
						value: '1'
					},
					{
						label: '女',
						value: '2'
					}
				],
				sexObj:{
					'0':'未知',
					"1":'男',
					"2":'女'
				},
				region:[], //[{name:"北京市"} ,{name:'市辖区'}, {name:"东城区"}]
				defaultRegion:['北京市','市辖区','东城区'],
				defaultRegionCode:'110101'
			}
		},
		computed: {
			...mapGetters(['userInfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			regionName(){
				// 转为字符串
				// if(this.region.length){
				// 	this.baseFormData.address = this.region.map(item=>item.name).join('')
				// }
				if(this.userInfo.address){
					return this.userInfo.address
				}else{
					return this.region.map(item=>item.name).join(' ')
				}
				
			}
		},
		methods: {
			...mapActions(['setUserInfo']),
			changeSex(e) {
				let index = e.detail.value
				this.sexIndex = index
				this.sex = this.sexList[index].value
				let data  = {sex:this.sex,phone:this.userInfo.phone}
				this.updataUserInfo(data)
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
				let data = {birthday:dateFormatL('YYYY-mm-dd',new Date(this.date)),phone:this.userInfo.phone}
				this.updataUserInfo(data)
			},
			updataUserInfo(data){
				this.$api.user.updataUserInfo(data).then(res=>{
					console.log(res)
					this.setUserInfo(res.data)
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			handleGetRegion(region){
				this.region = region
				let address = region.map(item=>item.name).join(',')
				let data  = {address,phone:this.userInfo.phone}
				this.updataUserInfo(data)
			},
			chooseImg(){
				uni.chooseImage({
				    count: 1, //上传图片的数量，默认是9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        const tempFilePaths = res.tempFilePaths[0];    //拿到选择的图片，是一个数组
						console.log(tempFilePaths)
						// that.ImgFlag = true
						that.baseFormData.image = tempFilePaths
						// console.log(Apimodule.public.uploadImg())
						uni.uploadFile({ //
							url: Apimodule.public.uploadImg(), //上传地址
							// url: 'http://192.168.7.102:8010/merchant/api/upload', //上传地址
							fileType: "image",
							name: '图片', //文件名称
							header: { "Content-Type": "multipart/form-data" },
							filePath: res.tempFilePaths[0], // 要上传的文件的路径
							success: (res) => {
								console.log(res) //
							}
						})
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #E9E9E9;
		font-size: 14px;
	}

	.photoBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 60rpx;
		padding-bottom: 30rpx;
		.imgBox {
			width: 120rpx;
			height: 120rpx;
			background-color: #999999;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.photo {
				position: absolute;
				bottom: 0;
				right: 6rpx;
			}
		}
	}

	.itemBox {
		padding: 16rpx 26rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}
</style>
