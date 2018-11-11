<template>
<div class="ui-wrapper">
    <div class="lunbo pr">
        <!-- 侧边栏 -->
        <div class="site-category pa">
            <ul class="site-category-list clearfix">
                <li  v-for="(item,index) in classifyData" :key="index" class="clearfix" :class="linkroute[0] == item.categoryName?'active':''" @mouseover="showwrap(item.categoryName,item.children,item.categoryId)" @mouseout="hidewrap" >
					<span class="fl">{{item.categoryName}}</span>
                    <Icon type="chevron-right" class="fr arrowic"></Icon>
                </li>
            </ul>
        </div>
        <!-- 详情列表 -->
		<div class="pa right-wrap clearfix" v-show="showFag" @mouseover="show1" @mouseout="hide1">
				<div v-for="(item1,index) in childrendata" :key="index" class="clearfix">
					<div class="bqtitle fl clearfix">
						{{item1.categoryName}}
						<Icon type="chevron-right" class="fr arrowic1"></Icon>
					</div>
					<ul class="fl clearfix bqthree">
						<li v-for="(item2,index2) in item1.children" :key="index2" class="fl proxq">
							<span @click="goto(item2.categoryId)"> {{item2.categoryName}}</span>
						</li>
					</ul>
				
			</div>
        </div>
        <!-- 轮播图 -->
        <Carousel v-model="value1" loop autoplay :radius-dot='true' :autoplay-speed='speed' arrow='always'>
          <CarouselItem>
                <div class="demo-carousel">
                    <img src="http://image.99sbl.com/bbg3.png" alt="" class="lunboimg">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="http://image.99sbl.com/bbg1.png" alt="" class="lunboimg">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="http://image.99sbl.com/bbg2.png" alt="" class="lunboimg">
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</div>
</template>
<script>
import { getProductList, getCategory } from "@/api/goods";
export default {
  name: "Lunbo",
  data() {
    return {
      value1: 0,
      true: true,
      speed: 3000,
      showFag: false,
      classifyData: [],
      linkroute: [],
      childrendata: [],
      name1: "",
	  totaldata:[]
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
		  this.classifyData = this.toTree(res.data);
		  this.$store.commit("classifyTree", this.classifyData);
      });
    },
	goto(id) {
         const { href } = this.$router.resolve({
          path: `/allProduct/${id}`
        })
        window.open(href, '_blank')
    },
    showwrap(name, obj,id) {
      this.linkroute = [];
      this.linkroute.push(name);
      this.childrendata = obj;
      this.showFag = true;
      this.name1 = name;
    },
    hidewrap() {
      this.showFag = false;
      this.linkroute = [];
    },
    show1() {
      this.showFag = true;
      this.linkroute.push(this.name1);
    },
    hide1() {
      this.showFag = false;
      this.linkroute = [];
    },
    toTree(data) {
      var map = {};
      data.forEach(function(item) {
        map[item.categoryId] = item;
      });
      var val = [];
      data.forEach(function(item) {
        var parent = map[item.parentId];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          val.push(item);
        }
      });
      return val;
    }
  }
};
</script>
<style >
.lunboimg {
  width: 1220px;
  height: 450px;
}
.lunbo .ivu-carousel-arrow.left {
  left: 250px;
}
.ivu-carousel-dots-inside {
  display: block;
  position: absolute;
  bottom: 16px;
  text-align: right;
  padding: 0px 76px;
}
.site-category {
  display: block;
  position: absolute;
  top: 0;
  left: -0;
  z-index: 21;
  width: 234px;
  height: 457px;
  font-size: 14px;
}
.site-category-list {
  height: 450px;
  border: 0;
  color: #fff;
  background: #333;
  background: rgba(0, 0, 0, 0.6);
  margin: 0;
  list-style-type: none;
}
.site-category-list > li {
  position: relative;
  display: block;
  padding-left: 30px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  font-weight: 500;
}
.site-category-list > .active {
  color: #fff;
  background: #ff6700;
}
.arrowic {
  font-size: 12px;
  height: 32px;
  line-height: 32px!important;
  margin: 0 10px 0 25px;
}
.arrowic1 {
  font-size: 12px;
  line-height: 38px!important;
  margin: 0 10px 0 25px;
}
.right-wrap {
  top: 0;
  right: 0;
  width: 986px;
  height: 450px;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 1px 16px 0 rgba(0, 0, 0, 0.2);
  padding-top:30px;
  margin-left:20px;
  overflow: auto;
}
.bqtitle{
	width: 196px;
	text-align: right;
	margin-right:  10px;
	font-size: 14px;
	line-height: 39px;
}
.proxq{
	 padding: 5px 0;
}
.proxq>span{
	border-left: 1px solid #e3e3e3;
	padding: 0 20px 0 10px;
	color: #333;
	cursor: pointer;
}
.proxq>span:hover{
	color:#ff6700;
	text-decoration: underline;
}
.proxq img{
	margin-right: 12px;
    vertical-align: middle;
	height: 40px;
	width:40px;
}
.bqthree{
	width: 700px;
	border-bottom: 1px solid #eee;
	padding: 5px 0;
}
</style>
