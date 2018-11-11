<template>
    <div>
        <div class="box-hd">
            <h2 class="title">{{floor.floorName}}</h2>
            <div class="more clearfix">
                <ul class="clearfix fl tab">
                    <li class="fl"  @mouseover="changecontent(1,floor.firstCategoryid)">
                        <span :class="bgypfag==floor.firstCategoryid?'active':''">{{floor.firstCategoryname}}</span>
                    </li>
                    <li class="fl"  @mouseover="changecontent(2,floor.secondCategoryid)">
                        <span :class="bgypfag==floor.secondCategoryid?'active':''">{{floor.secondCategoryname}}</span>
                    </li>
                    <li class="fl"  @mouseover="changecontent(3,floor.thirdCategoryid)">
                        <span :class="bgypfag==floor.thirdCategoryid?'active':''">{{floor.thirdCategoryname}}</span>
                    </li>
                </ul>
                <div class="fl">
                    <span  @click="goto1('/allProduct/' + moreLink)" >查看更多</span>
                    <Icon type="chevron-right"></Icon>
                </div>
            </div>
        </div>
        <div class="box-bd">
            <div class="goods-list clearfix">
                <ul class="span-first fl">
                    <li class="brick-item brick-item-l">
                        <img :src="floor.floorImage" alt="">
                    </li>
                </ul>
                <ul class="span-second clearfix fl">
                    <li v-for="(item1,index1) in curList" :key="index1" class="common-item fl" @click="goto(floor.id)"  @mouseover="showprice=index1" @mouseout="showprice=-1">
                        <div class="bcontent">
                            <span><img :src="item1.mainImage" alt=""></span>
                            <h3 class="cardtitle">{{item1.name}}</h3>
                            <p class="desc">{{item1.subtitle}}</p>
                            <transition name="fade2">
                                <p class="price" v-show="showprice != index1">{{item1.price}}元</p>
                            </transition>
                                <div v-show="showprice == index1" class="clearfix">
                                    <Button @click.stop.prevent="goto(item1.id)">查看详情</Button>
                                    <Button type="info" @click.stop.prevent="addToCart(item1)">加入购物车</Button>
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
    export default {
        props:["floor"],
        data() {
            return {
                showprice:-1,
                bgypfag:'',
                curList:[],
                moreLink:'',
            }
        },
        mounted() {
            this.bgypfag = this.floor.firstCategoryid
            this.curList = this.floor.firstProductList
            this.moreLink = this.floor.firstCategoryid
        },
        methods:{
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
            addToCart(product) {
                this.$store.commit("addCart", product);
            },
            changecontent(index,id){
                this.bgypfag = id;
                this.moreLink = id
                if(index == 1){
                    this.curList = this.floor.firstProductList
                }else if(index == 2){
                    this.curList = this.floor.secondProductList
                }else{
                    this.curList = this.floor.thirdProductList
                }
            },
        }
    }
</script>

<style scoped>
.box-hd {
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
.more span:hover {
  color: #ff6700;
}
.xm-flashPurchase-countdown {
  float: left;
  width: 234px;
  margin: 0 14px 0 0;
  padding: 0;
}
.common-item {
  height: 300px;
  padding-top: 10px;
  text-align: center;
  background: #fff;
  -webkit-transition: all 0.6s;
  transition: all 0.6s;
  margin: 0px 0 14px 16px;
  cursor: pointer;
}
.common-item:hover {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
}
.desc {
  height: 18px;
  margin: 0 20px 12px;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  zoom: 1;
  color: #b0b0b0;
}
.price {
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
.bcontent {
  text-align: center;
  width: 230px;
}
.fade1-enter-active {
  transition: all 0.3s ease;
}
.fade1-enter {
  transform: translateY(20px);
  opacity: 0;
}
.fade2-enter-active {
  transition: opacity 0.5s;
}
.fade2-enter {
  opacity: 0;
}
.span-first {
  width: 234px;
  height: 614px;
}
.brick-item-l {
  height: 614px;
}
.brick-item-l img {
  height: 614px;
  width: 234px;
}
.span-second {
  width: 986px;
  height: 614px;
}
.tab {
  margin-right: 30px;
}
.tab > li > span {
  border-bottom: 2px solid transparent;
  -webkit-transition: border-color 0.5s;
  transition: border-color 0.5s;
}
.tab > li {
  margin: 0 10px;
}

.active {
  color: #ff6709;
  border-bottom: 2px solid #ff6709 !important;
}
</style>