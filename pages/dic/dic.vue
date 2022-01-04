<template>
	<view>
		<header-bar :isBack="true" :center="true" title="111" titleTintColor="#000"  :bgColor="{'background': '#fff'}" >
		    <view slot="center">
				<!-- <view class="navbox"> -->
					<view class="navborder" @tap="handerNavClick">
						<view id='1' :class="currentIndex=='1'?'active':''">分类</view>
						<view id='2' :class="currentIndex=='2'?'active':''">作者</view>
						<view id='3' :class="currentIndex=='3'?'active':''">作品</view>
					<!-- </view> -->
				</view>
			</view>
			<!-- <text slot="back" class="uni_btnIco iconfont icon-arrL"></text> -->
			<text slot="iconfont" class="icon iconfont icon-tengxunweibo1"></text>
		    <!-- <text slot="iconfont" class="uni_btnIco iconfont icon-choose03" @tap="aaa"></text> -->
		    <!-- <image slot="image" style="width: 30rpx;" class="uni_btnImage" src="../../static/img/dic.png" mode="widthFix" @tap="ddd"></image> -->
		</header-bar>
	    <category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category>
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
                    categoryList:[],
                    subCategoryList:[]
                }
            },
            methods: {
                categoryMainClick(category){
                    this.subCategoryList = category.subCategoryList;
                },
                categorySubClick(category){
                    console.log(category);
                },
				handerNavClick(e){
					this.currentIndex = e.target.id?e.target.id:'1'
				},
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
				}
            },
            mounted() {
				// this.init()
                // for(var i=0;i<20;i++){
                //     var subList = [];
                //     for(var j=0;j<30;j++){
                //         subList.push({"name":"分类"+i+":商品"+j,"logo":"http://placehold.it/50x50"})
                //     }
                //     this.categoryList.push({"name":"分类"+i,"subCategoryList":subList})
                // }
                // this.subCategoryList = this.categoryList[0].subCategoryList;
            }
        }
    </script>
	<style scoped>
		.navborder{
			display: flex;
			border: 1rpx solid #007AFF;
			border-radius: 10rpx;
		}
		.navborder>view{
			font-size: 14px;
			padding: 8rpx 30rpx;
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
	</style>