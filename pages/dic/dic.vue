<template>
	<view>
	    <category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category>
	</view>
</template>
    <script>
        import category from "../../components/qiyue-category/qiyue-category.vue"
        export default {
            components:{
                category
            },
            data() {
                return {
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
				this.init()
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