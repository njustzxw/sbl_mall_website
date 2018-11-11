<template>
    <div>
        <div class="breadcrumbs">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem>{{this.$route.params.keyword}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!-- <div class="filter-box">
            <dl class="filter-list clearfix">
                <dt>分类：</dt>
                <dd :class="selectcat==''?'active':''" @click="selectCategory('')">全部</dd>
                <dd v-for="(item,index) in categoryList" :key="index" :class="selectcat==item.categoryId?'active':''" @click="selectCategory(item.categoryId)">{{item.categoryName}}</dd>
            </dl>
        </div> -->
        <div class="filter-box pr">
            <dl class="filter-list clearfix" style="max-height: 77px;">
                <dt>品牌：</dt>
                <dd :class="currentbrand=='all'?'active':''" @click="_selectbrand('all')">不限</dd>
                <dd v-for="(item,index) in brandList" :key="index" class="pr">
                    <span class="bgborder pa"></span>
                    <span :class="currentbrand==item?'active':''" @click="_selectbrand(item)">{{item}}</span>
                </dd>
            </dl>
			<div class="expand pa" v-if="brandList.length > 17" @click="expend">
				<Icon :type="expandfag == 1?'chevron-down':'chevron-up'"></Icon>
				<span>{{expandfag == 1?"展开":"收起"}}</span>
			</div>
        </div>
        <div class="order-list-box clearfix">
            <!-- <ul class="order-list">
                <li class="first" @click="selectorderBy('price_desc')" :class="orderBy=='price_desc'?'active':''">
                    价格&nbsp;&nbsp;<Icon type="ios-arrow-thin-down"></Icon>
                </li>
                <li class="" @click="selectorderBy('price_asc')" :class="orderBy=='price_asc'?'active':''">
                    价格&nbsp;&nbsp;<Icon type="ios-arrow-thin-up"></Icon>
                </li>
            </ul> -->
        </div>
        	<div v-if="totaldata.list">
	            <div class="goods-list-box" v-if="totaldata.list.length">
	                <div class="goods-list clearfix">
	                    <div class="goods-item" v-for="(item,index) in totaldata.list" :key="index" @click="goto(item.id)" @mouseover="showprice=index" @mouseout="showprice=-1">
	                        <div class="figure figure-img">
	                            <img :src="item.mainImage" :alt="item.name">
	                        </div>
	                        <!-- <p class="desc">{{item.subtitle}}</p> -->
	                        <h2 class="title">{{item.name}}</h2>
	                        <p class="price">{{item.price}}元</p>
	                        <transition name="fade1">
	                            <div v-show="showprice == index" class="clearfix">
	                                <Button @click.stop.prevent="goto(item.id)">查看详情</Button>
	                                <Button type="info" @click.stop.prevent="addToCart(item)">加入购物车</Button>
	                            </div>
	                        </transition>
	                    </div>
	                </div>
	                <div class="fy">
	                	<Page :total="total" :current="current" :page-size='num' @on-change="changepage" @on-page-size-change="pagesizechange"></Page>
	                </div>
	            </div>
	            <div class="goods-list-box bg-white"  style="text-align: center;" v-else>
	            	<img src="../../../static/images/cart.png" alt="" style="width: 100px;margin-top: 130px;"/>
	            	<p class="nonedata">暂无相关商品</p>
	            </div>
            </div>
            <div class="mt20">
                <div class="liketitle">相关推荐</div>
                <ul class="yourlike clearfix">
                    <li class="fl" v-for="(item,index) in yourlisjList" :key="index">
                        <img :src="imageHost+item.image" alt="" class="youfavarite" @click="goto(item.productId)">
                        <p class="name"  @click="goto(item.productId)">{{item.name}}</p>
                        <p class="price" style="color:red">￥{{item.price.toFixed(2)}}</p>
                        <Button type="dashed" @click.stop.prevent="addToCart(item)">加入购物车</Button>
                    </li>
                </ul>
            </div>
    </div>
</template>
<script>
import {getSearchList,getyoulike, getProductByBrand} from '@/api/goods'
export default {
    name:'search',
    data () {
        return {
            totaldata:{},
            categoryList:[],
            selectcat:'',
            showprice:-1,
            orderBy:'price_desc',
            current:1,
			total:10,
			num:16,
            categoryId:'',
            yourlisjList:[],
            brandList:[],
            expandfag:1,
            currentbrand:'all',
        }
    },
    computed: {
		keyword() {
			return  this.$store.state.goods.keyword
        },
        imageHost () {
			return this.$store.state.goods.imageHost;
		},
    },
    watch: {
        keyword () {
            this._getProductList(1)
        }
    },
    mounted () {
        this._getProductList(1)
    },
    methods:{
        _getProductList (fag) {
            var params = {
                keyword:this.$route.params.keyword,
                pageNum:this.current,
                pageSize:'16',
            }
            getSearchList(params).then(res => {
                if(res.status == 0){
                    this.brandList = res.data.brandList;
                	this.totaldata = res.data.pageInfo
                	this.total = res.data.pageInfo.navigatepageNums.length * res.data.pageInfo.pageSize
                }
                // if(fag){
                // 	var list1 = []
	            //     var list = []
	            //     for(let obj of res.data.list){
	            //         if(list1.indexOf(obj.categoryName) >= 0){
	            //         }else{
	            //             list.push({categoryName:obj.categoryName,categoryId:obj.categoryId})
	            //             list1.push(obj.categoryName)
	            //         }
	            //     }
	            //     this.categoryList = list
                // }
            })
        },
        goto (id) {
            const { href } = this.$router.resolve({
                path: `/describe/${id}`
            })
            window.open(href, '_blank')
        },
        selectCategory(id){
        	this.current = 1
            this.selectcat = id
            this._getProductList(0)
        },
        selectorderBy (order) {
        	this.current = 1
            this.orderBy = order
            this._getProductList(0)
        },
        addToCart(product) {
	      	this.$store.commit("addCart", product);
        },
        _getyoulike () {
            getyoulike().then(res => {
                this.yourlisjList = res.data.slice(0,6)
            })
        },
		//分页
		changepage(index){
			this.current = index;
            this._selectbrand();
            this.toTop(500)
		},
		pagesizechange(size){
            this.pageSize = size;
            this._selectbrand();
            this.toTop(500)
        },
        toTop(i){
            //参数i表示间隔的幅度大小，以此来控制速度
            document.documentElement.scrollTop-=i;
            if (document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.toTop(i),16);
            }else {
                clearTimeout(c);
            }
        },
        expend() {
            if(this.expandfag == 1){
                this.expandfag = 2;
                $(".filter-list").animate({maxHeight:"450px"});
            }else{
                this.expandfag = 1;
                $(".filter-list").animate({maxHeight:"77px"});
            }
        },
        getList(){
            if(this.currentbrand == 'all'){
                this._getProductList();
            }else{
                this._selectbrand()
            }
        },
        _selectbrand (id) {
            if(id){
                this.currentbrand = id;
                this.current = 1;
            }
            if(this.currentbrand == 'all'){
                this._getProductList();
            }else{
                var params = {
                    keyword:this.$route.params.keyword,
                    brand:this.currentbrand,
                    pageNum: this.current,
                    pageSize: "16",
                }
                getProductByBrand(params).then(res => {
                    console.log(res)
                    if (res.status == 0) {
                        this.totaldata = res.data;
                        this.total = res.data.total;
                    }
                })
            }	
        }
    }

}
</script>
<style scoped>
.goods-list-box{
	min-height: 400px;
}
.bg-white {
	background: #fff;	
}
.breadcrumbs{
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    background: #f5f5f5;
    color: #616161;
}
.filter-box {
    color: #757575;
    background: #fff;
    font-size: 14px;
    line-height: 45px;
}
.filter-list {
    width: 1100px;
    overflow: hidden;
    -webkit-transition: height .3s ease-in;
    transition: height .3s ease-in;
}
.filter-list, .selected-list {
    position: relative;
    padding-left: 70px;
    min-height: 45px;
    margin: 0;
}
.filter-list dt, .selected-list dt {
    position: absolute;
    left: 0;
    width: 72px;
    color: #b0b0b0;
}
.filter-list dd.active {
    color: #ff6700;
}
.filter-list dd,
.filter-list dt {
  float: left;
  cursor: pointer;
  width: 114px;
  text-align:center;
  padding: 0 10px;
  font-size: 12px;
  height: 35px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.goods-item:hover{
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.goods-item {
	cursor: pointer;
    position: relative;
    float: left;
    width: 291px;
    height: 383px;
    padding-top: 25px;
    margin-right: 14px;
    margin-bottom: 14px;
    text-align: center;
    background: #fff;
    -webkit-transition: -webkit-box-shadow .5s linear;
    transition: box-shadow .5s linear;
}
.goods-item .figure-img {
    width: 200px;
    height: 200px;
    margin: 0 auto 16px;
}
.figure-img img {
    width: 200px;
    height: 200px;
}
.goods-item .title {
    margin: 0 0 3px;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 10px;
    font-weight: 400;
}
.goods-item .price {
    margin: 0 0 15px;
    color: #ff6700;
}
.goods-item{
    font-weight: 500;
    font-size: 15px;
}
.goods-item .desc {
    margin: 0 0 3px;
    height: 18px;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    _zoom: 1;
    color: #b0b0b0;
}
.fade1-enter-active {
  transition: all .3s ease;
}
.fade1-enter{
  transform: translateY(20px);
  opacity: 0;
}
.order-list-box {
    height: 20px;
    margin: 20px 0;
    overflow: hidden;
    position: relative;
    zoom: 1;
}
.order-list-box .order-list {
    float: left;
    height: 20px;
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.order-list li.first {
    padding-left: 0;
    border-left: 0;
}
.order-list li {
    float: left;
    padding: 0 30px;
    border-left: 1px solid #e0e0e0;
    line-height: 20px;
    font-size: 15px;
    cursor: pointer;
}
.order-list li:hover{
    color: #ff6700;
}
.active{
    color: #ff6700;
}
.nonedata {
	margin-top: 20px;
	font-size: 16px;
	color: #666;
}
.fy{
	text-align: center;
	padding: 10px;		
}
.bgborder {
  width: 1px;
  height: 16px;
  background: #b0b0b0;
  top: 15px;
  left: 0;
}
.expand{
	width: 50px;
    border: 1px solid #adabaa;
    border-radius: 5px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    background: #fff;
    right: 20px;
    top: 10px;
	cursor: pointer;
}
.expand:hover{
	background: #f5f5f5;
}
</style>
