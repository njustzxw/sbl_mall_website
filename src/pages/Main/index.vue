<template>
<div id="scroller-box">
    <!-- 焦点图 -->
    <Lunbo/>
    <!-- 焦点图下方的小图 -->
    <promoList/>
    <!-- 热门商品 -->
    <hotProduct/>
    <div class="home-banner-box">
        <img width="1220px" src="../../../static/images/hf1.png" alt="">
    </div>
    <floor/>
    <!-- 复印纸 -->
    <!-- <fyz/>
    <bgsb/>
    <tsda/>
    <div class="home-banner-box">
        <img width="1220px" src="../../../static/images/hf2.png" alt="">
    </div>
    <dqsb/> -->
    <!-- 办公用品 -->
    <!-- <bgyp/> -->
    <!-- 你感兴趣 -->
    <div class="mt20">
        <div class="title">你感兴趣</div>
        <ul class="yourlike clearfix">
            <li class="fl" v-for="(item,index) in yourlisjList" :key="index">
                <img :src="item.image" alt="" class="youfavarite" @click="goto(item.productId)">
                <p class="name"  @click="goto(item.productId)">{{item.name}}</p>
                <p class="price" style="color:red">￥{{item.price.toFixed(2)}}</p>
                <Button type="dashed" @click.stop.prevent="addToCart(item)">加入购物车</Button>
            </li>
        </ul>
    </div>
    <!-- 合作单位 -->
    <hzdw/>
    <!-- 友情链接 -->
    <div class="friendlink pr">
        <div class="roll-wrap clearfix">
            <a class="firm-card fl" href="http://www.taobao.com" target="_blank">
                <img src="../../../static/images/tb.png" class="ecom1">
            </a>
            <a class="firm-card fl" href="https://www.jd.com/" target="_blank">
                <img src="../../../static/images/jd.png" class="ecom2">
            </a>
            <a class="firm-card fl" href="https://www.tmall.com" target="_blank">
                <img src="../../../static/images/tm.png" class="ecom3">
            </a>
            <a class="firm-card fl " href="https://www.suning.com" target="_blank">
                <img src="../../../static/images/sn.png" class="ecom4">
            </a>
            <a class="firm-card fl " href="http://www.sina.com.cn" target="_blank">
                <img src="../../../static/images/xl.png" class="ecom5">
            </a>
            <a class="firm-card fl" href="http://www.sohu.com/" target="_blank" style="margin-right:0">
                <img src="../../../static/images/sh.png" class="ecom6">
            </a>
        </div>
    </div>
</div>
</template>
<script>
import Lunbo from "@/components/home/Lunbo.vue";
import promoList from "@/components/home/promoList.vue";
import hotProduct from "@/components/home/hotProduct.vue";
import fyz from "@/components/home/fyz.vue";
import tsda from "@/components/home/tsda.vue";
import bgsb from "@/components/home/bgsb.vue";
import bgyp from "@/components/home/bgyp.vue";
import dqsb from "@/components/home/dqsb.vue";
import hzdw from "@/components/home/hzdw.vue";
import floor from "@/components/home/floor.vue";
import { getyoulike } from "@/api/goods";
export default {
  name: "home",
  data() {
    return {
      yourlisjList: []
    };
  },
  components: {
    Lunbo,
    promoList,
    hotProduct,
    fyz,
    bgyp,
    bgsb,
    tsda,
    dqsb,
    hzdw,
    floor
  },
  mounted() {
    this._getyoulike();
  },
  computed: {},
  methods: {
    addToCart(product) {
      this.$store.commit("addCart", product);
    },
    goto(id) {
      const { href } = this.$router.resolve({
        path: `/describe/${id}`
      });
      window.open(href, "_blank");
    },
    _getyoulike() {
      getyoulike().then(res => {
        this.yourlisjList = res.data.slice(0, 6);
      });
    }
  }
};
</script>
<style>
.home-banner-box {
  margin: 28px 0 22px;
  height: 120px;
  overflow: hidden;
}
.friendlink {
  width: 1208px;
  margin-top: 30px;
}
.firm-card {
  margin-right: 18.4px;
  width: 186px;
  height: 85px;
  background: #fff;
}
.firm-card > img {
  width: 186px;
  height: 85px;
}
.ecom1 {
  width: 120px !important;
  height: 60px !important;
  margin: 10px 25px;
}
.ecom4 {
  width: 120px !important;
  height: 60px !important;
  margin: 10px 25px;
}
.ecom5 {
  width: 132px !important;
  height: 63px !important;
  margin: 8px 25px;
}
.ecom6 {
  width: 140px !important;
  height: 70px !important;
  margin: 8px 25px;
}
</style>

