<template>
	<view>
		<header-bar  titleTintColor="#000"  :bgColor="{'background': '#fff'}" fixed >
		    <view slot="headerL" style="width:100%;">
				<view class="navbox">
					<view class="width30">
						<view class="icon iconfont icon-tengxunweibo1" style="font-size: 30px;" @tap="changetype" v-show="currentIndex==='1'"></view>
					</view>
					<view class="navborder" >
						<view id='1' :class="currentIndex=='1'?'active':''" @tap="handerNavClick('1')">分类</view>
						<view id='2' :class="currentIndex=='2'?'active':''" @tap="handerNavClick('2')">作者</view>
						<view id='3' :class="currentIndex=='3'?'active':''" @tap="handerNavClick('3')">作品</view>
					</view>
					<view class="width30">
						<view class="icon iconfont icon-tengxunweibo1" style="font-size: 30px;" v-show="currentIndex==='1'"></view>
					</view>
					
				</view>
			</view>
			<!-- <text slot="back" class="icon iconfont icon-icon-class-c"></text>
			<text slot="iconfont" class="icon iconfont icon-tengxunweibo1"></text> -->
		    <!-- <text slot="iconfont" class="uni_btnIco iconfont icon-choose03" @tap="aaa"></text> -->
		    <!-- <image slot="image" style="width: 30rpx;" class="uni_btnImage" src="../../static/img/dic.png" mode="widthFix" @tap="ddd"></image> -->
		</header-bar>
	    <view v-show="currentIndex==='1'">
	    	<category v-if="type === '1'" :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category>
	    	<view class="11" v-else-if="type==='2'">
	    		<view v-for="(items,indexs) in categoryList" :key="indexs">
	    			<view class="title">
	    				<text>{{items.name}}</text>
	    				<view class="titleMore" v-show="items.subCategoryList.length>11">
	    					<text>更多</text>
	    					<image src="~/static/img/more.png" mode="widthFix" style="width: 26rpx;"></image>
	    				</view>
	    			</view>
	    			<view class="df ffrw">
	    				<view v-for="(item,index) in items.subCategoryList" v-if="index<12" :key="index" class="wid25 df jcc" >
	    					<view class="namedesc">
	    						<text class="fontS14 color999">{{item.shortDesc}}</text>
	    						<text class="fontS18 ">{{item.name}}</text>
	    						
	    					</view>
	    				</view>
	    			</view>
	    		</view>
	    	</view>
			<view class="11" v-else-if="type==='3'">
				<view v-for="(items,indexs) in categoryList" :key="indexs">
					<view class="title">
						<text>{{items.name}}</text>
						<view class="titleMore" v-show="items.subCategoryList.length>11">
							<text>更多</text>
							<image src="~/static/img/more.png" mode="widthFix" style="width: 26rpx;"></image>
						</view>
					</view>
					<view class="df ffrw">
						<view v-for="(item,index) in items.subCategoryList" v-if="index<12" :key="index" class="wid25 df jcc" >
							<view class="namedesc3">
								<view>
									<image :src="item.cover" mode="aspectFill"></image>
								</view>
								<text class="fontS14 ">{{item.name}}</text>
								
							</view>
						</view>
					</view>
				</view>
			</view>
	    </view>
		<view v-show="currentIndex === '2' && authorsList.length">
			<view class="border fontS14 mg15 pd20 borderR10" v-for="(item, index) in authorsList" :key="item.objectId">
				<view class="fontS16 mgb15" >
					<text @tap='toAuthorDetail(item.objectId,item.name)'>
						{{item.name}}
					</text>
				</view>
				<view>
					<text class="textJustify fontS14 lineH32">{{item.desc}}</text>
					<text class="colorf6495ed">{{item.worksCount}}篇诗文</text></view>
			</view>
			<view class="pageParambox df jcsb mg15 aic fontS14">
				<text class="nextPage colorf6495ed" @tap="toNext">下一页</text>
				<view>
					<text class="mgr10">{{pageParam.page}}</text>
					<text @tap="toPre">上一页</text>
				</view>
			</view>
		</view>
		<view v-show="currentIndex=='3'">
			<view v-for="item in allworks" :key="item.objectId" >
				<view class="mg15 border borderR10 pd10">
					<view class="fontS18 colorf6495ed fontW pdl10" >
						<text @tap="toWorkDetail(item.objectId)">{{item.title}}</text>
					</view>
					<view class="mg15 fontS14 color999">
						{{item.dynasty}}.{{item.authorName}}
					</view>
					<view>
						<view v-for="items in item.content" class="fontS15 textIndent2 textJustify mgb5 lineH28">
							{{items}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
    <script>
        import category from "../../components/qiyue-category/qiyue-category.vue"
		import HeaderBar from "@/components/custom-nav/custom-nav.vue"
        export default {
            components:{
                category,
				HeaderBar
            },
            data() {
                return {
					currentIndex:'1',
					type:"1",
                    categoryList:[],
                    subCategoryList:[],
					authorsList:[],
					allworks:[],
					pageParam:{
						page: 1,
						perPage: 5
					}
                }
            },
            methods: {
				textSplit(text){
					return text.split('\r\n')
				},
				changetype(){
					switch (this.type){
						case "1":
							return this.type = "2";
						case "2":
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 1,
							});
							return this.type = "3";
						case "3":
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 1,
							});
							return this.type = "1";
					}
				},
                categoryMainClick(category){
                    this.subCategoryList = category.subCategoryList;
                },
                categorySubClick(category){
                    console.log(category);
                },
				handerNavClick(id){
					this.currentIndex = id?id:'1'
					switch (this.currentIndex){
						case '1':
							if(this.categoryList.length==0){
								this.init()
							}
							break;
						case '2':
							this.pageParam = { page:1,perPage:5}
							this.getHotAuthorsIncludeCountByLikers(this.pageParam)
							break;
						case '3':
							this.pageParam = { page:1, perPage:20}
							this.getAllWorksForH5(this.pageParam)
					}
					
				},
				// 初始化页面数据 古诗词分类列表
				async init(){
					try{
						let res = await this.$api.works.getCollectionKinds()
						// this.categoryList = res.result
						let {result:allcollect} = await this.$api.works.getAllCollections()
						for(let i = 0; i<res.result.length;i++){
							let typeList = allcollect.filter(item=>item.kindId===res.result[i].localId)
							if(typeList.length) res.result[i].subCategoryList = typeList
						}
						// this.categoryList = res.result
						this.categoryList = res.result.filter(item=>item.subCategoryList)
						
						this.subCategoryList = this.categoryList[0].subCategoryList
					}catch(e){
						//TODO handle the exception
					}
				},
				async getHotAuthorsIncludeCountByLikers(data){
					let {result:{authors,count}} = await this.$api.works.getHotAuthorsIncludeCountByLikers(data)
					console.log( authors,count)
					this.authorsList = authors
				},
				
				// 下一页
				toNext(){
					this.pageParam.page++
					this.getHotAuthorsIncludeCountByLikers(this.pageParam)
				},
				
				// 上一页
				toPre(){
					this.pageParam.page--
					debugger
					if(this.pageParam.page <= 0){
						 this.pageParam.page = 1
						 return
					}
					this.getHotAuthorsIncludeCountByLikers(this.pageParam)
				},
				
				// 获取作者详情
				toAuthorDetail(id,name){
					debugger
					this.$router.push({
						path:`/pages/dic/authordetail?id=${id}&name=${name}`
					})
				},
				// 获取作品列表
				async getAllWorksForH5(data){
					let { result } = await this.$api.works.getAllWorksForH5(data)
					result = result.map(item=>{
						item.content= this.textSplit(item.content)
						return item
					})
					// this.allworks = result
					this.allworks&& this.allworks.splice(this.allworks.length,0,...result)
					// this.allworks.push()
				},
				toWorkDetail(id){
					uni.navigateTo({
						url:`/pages/dic/workdetail?id=${id}`
					})
				},
				
            },
			onReachBottom(){
				if(this.currentIndex!=='3') return
				console.log('加载更多')
				this.pageParam.page++
				this.getAllWorksForH5(this.pageParam)
			},
            mounted() {
				// this.getHotAuthorsIncludeCountByLikers(this.pageParam)
				this.init()
            }
        }
    </script>
	<style scoped lang="less">
		.navbox{
			padding: 0 10rpx;
			display: flex;
			justify-content: space-between;
		}
		.navborder{
			display: flex;
			border: 1rpx solid #007AFF;
			border-radius: 12rpx;
			overflow: hidden;
		}
		.navborder>view{
			font-size: 14px;
			padding: 10rpx 40rpx;
			color: #007AFF;
			border-right: 1rpx solid #007AFF;
		}
		.active{
			background-color: #007AFF;
			color: #fff !important;
		}
		.navborder>view:last-of-type{
			border-right: none;
		}
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 16rpx;
		}
		.titleMore{
			display: flex;
			align-items: center;
		}
		.namedesc{
			border-top: 1px solid #999;
			padding-top: 50rpx;
			display: flex;
			flex-direction: column;
			height: 300rpx;
			line-height: 40rpx;
			letter-spacing: 10rpx;
			writing-mode:vertical-rl;
		}
		.namedesc3{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 50rpx;
			>view{
				border: 1rpx solid #C0C0C0;
				width: 108rpx;
				height: 108rpx;
				padding: 4rpx;
				overflow: hidden;
				border-radius: 50%;
				image{
					
					border-radius: 50%;
					width: 108rpx;
					height: 108rpx;
					
				}
			}
			
		}
		.authorbox{
			margin: 30rpx;
			padding: 30rpx;
			font-size: 28rpx;
		}
		.lineH32{
			line-height: 32px;
		}
		.pageParambox{
			text{
				border: 1rpx solid #999999;
				padding: 10rpx 30rpx;
				border-radius: 10rpx;
			}
			.nextPage{
				padding: 10rpx 80rpx;
			}
		}
		.borderR10{
			border-radius: 2* 10rpx;
		}
	</style>