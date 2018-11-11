<template>
    <div class="ui-wrapper">
        <div class="box-hd">
            <h2 class="title">热门商品</h2>
            <div class="morehot">
                <!-- <span>查看更多</span>
                <Icon type="chevron-right"></Icon> -->
            </div>
        </div>
        <div class="box-bd">
            <div class="goods-list clearfix hotList">
				<Carousel v-model="value1" dots='none'>
					<CarouselItem class="demo-carousel" v-for="(obj,index) in hotList" :key="index">
						<div>
							<ul class="clearfix">
								<li v-for="(item,index) in obj" :key="index" class="hot-item fl" :class='"item-"+index' @click="goto(item.id)" @mouseover="showprice=index" @mouseout="showprice=-1">
									<div class="bcontent">
										<span><img :src="imageHost + item.mainImage" alt=""></span>
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
					</CarouselItem>
				</Carousel>
            </div>
        </div>
    </div>
</template>
<script>
import { addCart, gethotList } from "@/api/goods";
import { mapMutations } from "vuex";
export default {
  mounted() {
    this.gethotList();
  },
  data() {
    return {
      value1: 0,
      showprice: -1,
      hotList: [],
      imageHost: ""
    };
  },
  computed: {},
  methods: {
    goto(id) {
      const { href } = this.$router.resolve({
        path: `/describe/${id}`
      });
      window.open(href, "_blank");
    },
    addToCart(product) {
      this.$store.commit("addCart", product);
    },
    gethotList() {
      gethotList().then(res => {
        this.imageHost = res.data.imageHost;
        var arr = [];
        var arr1 = res.data.hotProductList.slice(0, 5);
        var arr2 = res.data.hotProductList.slice(5);
        arr.push(arr1);
        arr.push(arr2);
        this.hotList = arr;
      });
    }
  }
};
</script>
<style >
.box-hd {
  position: relative;
  height: 58px;
  -webkit-font-smoothing: antialiased;
}
.title {
  margin: 0;
  font-size: 22px;
  font-weight: 400;
  line-height: 58px;
  color: #333;
}
.morehot {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  font-size: 16px;
  line-height: 58px;
}
.morehot:hover {
  color: #ff6700;
}
.xm-flashPurchase-countdown {
  float: left;
  width: 234px;
  margin: 0 14px 0 0;
  padding: 0;
}
.hot-item {
  height: 340px;
  padding-top: 39px;
  border-top-width: 1px;
  border-top-style: solid;
  text-align: center;
  background: #fff;
  -webkit-transition: all 0.6s;
  transition: all 0.6s;
  margin: 10px 5px;
  cursor: pointer;
}
.hot-item:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.item-0 {
  border-top-color: #ffac13;
}
.item-1 {
  border-top-color: #83c44e;
}
.item-2 {
  border-top-color: #2196f3;
}
.item-3 {
  border-top-color: #e53935;
}
.item-4 {
  border-top-color: #00c0a5;
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
.hotList .price {
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
  width: 234px;
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
.hotList .ivu-carousel-arrow.left {
  left: 1100px !important;
  top: -27px;
  border-radius: 0;
  opacity: 1;
  /* background: #5788e6; */
}
.hotList .ivu-carousel-arrow.right {
  right: 30px !important;
  top: -27px;
  border-radius: 0;
  opacity: 1;
  /* background: #5788e6; */
}
</style>

