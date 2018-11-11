<template>
<div class="ui-wrapper">
    <div class="box-hd">
        <h2 class="title">电气设备</h2>
        <div class="more">
            <span  @click="goto1('/allProduct/10083')" >查看更多</span>
            <Icon type="chevron-right"></Icon>
        </div>
    </div>
     <div class="box-bd">
            <div class="goods-list clearfix">
                <ul class="span-first fl">
                    <li class="brick-item brick-item-l">
                        <img src="http://image.99sbl.com/floor/4.jpg" alt="">
                    </li>
                </ul>
                <ul class="span-second clearfix fl">
                    <li v-for="(item,index) in fyzList" :key="index" class="common-item fl" @click="goto(item.id)"  @mouseover="showprice=index" @mouseout="showprice=-1">
                        <div class="bcontent">
                            <span><img :src="item.mainImage" alt=""></span>
                            <h3 class="cardtitle">{{item.name}}</h3>
                            <p class="desc">{{item.subtitle}}</p>
                            <transition name="fade2">
                                <p class="price" v-show="showprice != index">{{item.price}}元</p>
                            </transition>
                            <transition name="fade1">
                                <div v-show="showprice == index" class="clearfix">
                                    <Button @click.stop.prevent="goto(item.id)">查看详情</Button>
                                    <Button type="info" @click.stop.prevent="addToCart(item)">加入购物车</Button>
                                </div>
                            </transition>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</div>
</template>
<script>
	import {getProductListById} from '@/api/goods'
    export default {
        data () {
            return {
                showprice:-1,
                fyzList:[],
            }
        },
         mounted () {
	    	this.getFyz()
        },
        computed: {
        },
        methods: {
            goto1(url) {
                const { href } = this.$router.resolve({
                    path: url
                })
                window.open(href, '_blank')
            },
            goto (id) {
                const { href } = this.$router.resolve({
                    path: `/describe/${id}`
                })
                window.open(href, '_blank')
            },
            getFyz () {
	            var params = {
	                categoryId:10083,
	                pageNum:1,
	                pageSize:'8',
	            }
	            getProductListById(params).then(res => {
	                if(res.status == 0){
	                	this.fyzList = res.data.pageInfo.list
	                }
	            })
            },
            addToCart(product) {
                this.$store.commit("addCart", product);
            },
        }
    }
</script>
<style scoped>
.box-hd{
    position: relative;
    height: 58px;
    -webkit-font-smoothing: antialiased;
}
.more {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 16px;
    line-height: 58px;
}
.more:hover{
    color: #ff6700;
}
.xm-flashPurchase-countdown {
    float: left;
    width: 234px;
    margin: 0 14px 0 0;
    padding: 0;
}
.common-item{
    height: 300px;
    padding-top: 10px;
    text-align: center;
    background: #fff;
    -webkit-transition: all .6s;
    transition: all .6s;
    margin: 0px 0 14px 16px;
    cursor: pointer;
}
.common-item:hover{
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.1);
    transform:translate3d(0,-2px,0)
}
.desc{
    height: 18px;
    margin: 0 20px 12px;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    zoom: 1;
    color: #b0b0b0;
}
.price{
    margin: 0;
    color: #ff6709;
    font-size: 16px;
}
.goods-list span img {
    width: 160px;
    height: 160px;
}
.goods-list span {
    margin: 0 auto;
    display: block;

}
.bcontent{
    text-align: center;
    width: 230px;
}
.fade1-enter-active {
  transition: all .3s ease;
}
.fade1-enter{
  transform: translateY(20px);
  opacity: 0;
}
.fade2-enter-active{
  transition: opacity .5s;
}
.fade2-enter{
  opacity: 0;
}
.span-first{
    width: 234px;
    height: 614px;
}
.brick-item-l{
    height: 614px;
}
.brick-item-l img{
    height: 614px;
    width: 234px;
}
.span-second{
    width: 986px;
    height: 614px;
}
</style>

