<template>
    <div>
        <!--黑色导航条-->
        <div style="background-image: url(http://image.99sbl.com/hengfu.jpg);}" v-show="this.$route.path=='/home'">
            <a href="#/search/金旗舰" class="site-bn-bar-link exposure" target="_blank"></a>
        </div>
        <div :class="fix?'headfix':'head'">
            <header>
                <div class="blackheader">
                    <ul class="nav-list clearfix">
                        <li v-for="(item,index) in headList" :key="index">
                            <span @click="gotoHead(item)">{{item.name}}</span>
                            <span class="sep">|</span>
                        </li>
                    </ul>
                    <transition name="fade">
                    <div class="pa blackinput" v-show="fix">
                        <div class="pr">
                            <Input  v-model="keyword" size="small" placeholder="请输入关键字" @on-enter="search"></Input>
                            <Icon type="search" class="blacksearchicon" size="20" @click="search"></Icon>
                        </div>
                    </div>
                    </transition>
                    <div class="nav-aside" ref="aside">
                        <div class="topbar-cart pr fr clearfix" :class="cartList.length?'active':''" @click="goto('/cart')" @mouseover='cartShowFag=true'
                            @mouseout='cartShowFag=false'>
                            <Icon type="ios-cart-outline" class="ic shopcart fl"></Icon>
                            <span class="shopcart-font fl">购物车（{{productionNum}}）</span>
                            <transition-group name="slide-fade">
                                <div class="cart-menu" v-show="cartShowFag&&cartList.length==0" :key="1">
                                    <div class="nothing">
                                        <p>购物车中还没有商品，赶紧选购吧！</p>
                                    </div>
                                </div>
                                <div class="cart-menu" v-show="cartShowFag&&cartList.length" :key="2">
                                    <ul class="cart-list">
                                        <li v-for="(item,index) in cartList" :key="index">
                                            <div v-if="!item.productModelVoList">
                                                <div class="cart-item clearfix" >
                                                    <span class="thumb">
                                                        <img :src="item.productMainImage" alt="" />
                                                    </span>
                                                    <span class="name">
                                                        {{item.productName}}
                                                    </span>
                                                    <span class="price">{{item.productPrice}}元 × {{item.quantity}}</span>
                                                    <span class="btn-del">
                                                        <Icon type="close" @click.stop.prevent="close(item.productId)"></Icon>
                                                    </span>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div class="cart-item clearfix" v-for="(item1,index1) in item.productModelVoList" :key="index1">
                                                    <span class="thumb">
                                                        <img :src=" item.productMainImage" alt="" />
                                                    </span>
                                                    <span class="name">
                                                        {{item.productName}}&nbsp;{{item1.name}}
                                                    </span>
                                                    <span class="price">{{item1.price}}元 × {{item1.quantity}}</span>
                                                    <span class="btn-del">
                                                        <Icon type="close" @click.stop.prevent="close(item.productId,item1.id)"></Icon>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="cart-total clearfix">
                                        <span class="total">
                                            共
                                            <em>{{productionNum}}</em>件商品
                                            <span class="price">
                                                <em>{{cartTotalPrice}}</em>元</span>
                                        </span>
                                        <Button type="warning" class="pay-btn" @click="goto('/cart')">去购物车</Button>
                                    </div>

                                </div>
                            </transition-group>
                        </div>
                        <!--用户登陆的情况-->
                        <div class="person pr fr" v-if="userloginfag" @mouseover='userMangeShowFag=true' @mouseout='userMangeShowFag=false' @click="userMangeShowFag=false">
                            <span class="user" @click="gotoHead({url:'/user',name:'账号资料'})">
                                <Icon type="person" class="ic"></Icon>
                                <span class="icfont">个人中心</span>
                            </span>
                            <!--用户信息显示-->
                            <transition name="fade">
                                <div class="nav-user-wrapper pa" v-show="userMangeShowFag">
                                    <div class="nav-user-list">
                                        <!-- 1级用户==========采购用户或者企业用户 -->
                                        <ul class="usermange" v-if="userInfo&&(userInfo.role==1||userInfo.enterName)"> 
                                            <li class="nav-user-avatar" @click="gotoHead({url:'/user',name:'账号资料'})">
                                                <p class="name">{{userInfo.username?userInfo.username:userInfo.enterName}}</p>
                                            </li>
                                            <li v-for="item in userMangeList" :key="item.id" @click="gotoUser(item)">{{item.name}}</li>
                                            <li @click="_loginOut">退出</li>
                                        </ul>
                                        <!-- 其他用户 -->
                                        <ul class="usermange" v-else>
                                            <li class="nav-user-avatar" @click="gotoHead({url:'/user',name:'账号资料'})">
											    <p class="name">{{userInfo.username}}</p>
                                            </li>
											<li v-for="item in userMangeCheckList" :key="item.id" @click="gotoUser(item)">{{item.name}}</li>
											<li @click="_loginOut">退出</li>
                                        </ul>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <!--用户未登陆的情况-->
                        <ul class="logangreg pr fr clearfix" v-else>
                            <li>
                                <span @click="goto('/Login')">登陆</span>
                                <span class="sep">|</span>
                            </li>
                            <li>
                                <span @click="goto('/register')">注册</span>
                            </li>
                        </ul>

                        <!--消息中心-->
                        <div class="person pr fr"  @mouseover='infoShowFag=true' @mouseout='infoShowFag=false'>
                            <span class="user" @click="gotoHead({url:'/user',name:'消息中心'})">
                                <Icon type="ios-email" class="ic"></Icon> 
                                <span class="icfont">消息<span v-if="unInfoNum" style="color:#ff6700"> {{unInfoNum}}</span></span>
                            </span>
                        </div>
                        <!--收藏夹-->
                        <div class="person pr fr"  @mouseover='collectionfag=true' @mouseout='collectionfag=false'>
                            <span class="user" @click="gotoHead({url:'/user',name:'收藏夹'})">
                                <Icon type="heart" class="ic"></Icon> 
                                <span class="icfont">收藏夹</span>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <!--白色导航条-->
        <div class="whiteheader clearfix">
            <div class="header-logo pr" v-if="userInfo&&userInfo.role>=1">
                <h1 class="logo ">
                    <router-link to="/home" title=" 思贝丽商城官网" style="display: block;">思贝丽商城</router-link>
                </h1>
                <img class="jsczt pa" src="../../../static/images/jsczt.jpg" alt="">
            </div>
			<div class="header-logo pr" v-else>
                <h1 class="logo1">
                    <router-link to="/home" title=" 思贝丽商城官网" style="display: block;">
						<img class="jsczt pa" style="left: 0;" src="http://image.99sbl.com/pt-logo.png" alt="">
					</router-link>
                </h1>
                
            </div>
            <div class="header-nav">
                <div class="header-search">
                    <div  class="search-form clearfix">
                        <input type="text" class="search-text" v-model="keyword" @focus='searchfocusFag=true' @blur='onblur' :class="searchfocusFag?'orangeboder':''">
                        <span class="search-btn" :class="searchfocusFag?'orangeboder':''" @click="search">
                            <Icon type="search" class="search-icon"></Icon>
                        </span>
                        <transition name="bq">
                            <div class="search-hot-words" v-show="!searchfocusFag">
                                <span v-for="(item,index) in keywordList" :key="index" v-if="index<2" @click="search1(item.name)">{{item.name}}</span>
                            </div>
                        </transition>
                        <div class="keyword-list" v-show="searchfocusFag">
                            <ul class="result-list">
                                <li v-for="(item,index) in keywordList" :key="index" v-if="index>1" @click.stop.prevent="search1(item.name)" class="fl liitem">{{item.name}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="nav-list1 clearfix">
                    <li class="fl liitem">热门搜索：</li>
                    <li v-for="(item,index) in headList1" :key="index" @click="gotoHead(item)" class="fl liitem">{{item.name}}</li>
                </ul>
            </div>
            <div class="header-wechat fr">
                <img src="../../../static/images/wechat.jpg" alt="" class="sys">
                <span class="sysspan">扫一扫打开商城微信小程序</span>
            </div>
        </div>
        <header class="navibar">
            <ul class="orignhead clearfix">
                <li @mouseover="showclass" @mouseout="hideclass">
                    <Icon type="navicon-round"></Icon>
                    &nbsp;全部商品分类
                </li>
                <li @click="goto('/')">首页</li>
                <!-- <li>政府采购</li>
                <li>医院采购</li>
                <li>企业采购</li>
                <li>场景采购</li> -->
            </ul>
            <!-- 全部商品 -->
            <div class="ui-wrapper" style="width: 1220px;margin: 0 auto" v-show="showclassfag" @mouseover="showclass" @mouseout="hideclass">
                <div class="lunbo pr">
                    <div class="site-category pa">
                        <ul class="site-category-list clearfix">
                            <li  v-for="(item,index) in treedata" :key="index" class="clearfix" :class="linkroute[0] == item.categoryName?'active':''" @mouseover="showwrap(item.categoryName,item.children,item.categoryId)" @mouseout="hidewrap" >
                                <span class="fl">{{item.categoryName}}</span>
                                <Icon type="chevron-right" class="fr arrowic"></Icon>
                            </li>
                        </ul>
                    </div>
                    <div class="pa right-wrap clearfix" v-show="showFag" @mouseover="show1" @mouseout="hide1">
                        <div v-for="(item1,index) in childrendata" :key="index" class="clearfix">
                            <div class="bqtitle fl clearfix">
                                {{item1.categoryName}}
                                <Icon type="chevron-right" class="fr arrowic1"></Icon>
                            </div>
                            <ul class="fl clearfix bqthree">
                                <li v-for="(item2,index2) in item1.children" :key="index2" class="fl proxq">
                                    <span @click="goto1(item2.categoryId)"> {{item2.categoryName}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import { loginOut, getKeyWord, qyloginOut } from "@/api/index";
import { getStore, removeStore } from "@/utils/storage.js";
import { getUnInfoNum } from "@/api/message.js";
export default {
  data() {
    return {
      userloginfag: "",
      showclassfag: false,
      showFag: false,
      linkroute: [],
      childrendata: [],
      name1: "",
      totaldata: [],
      fix: false,
      unInfoNum: 0,
      headList: [
        {
          name: "在线商城",
          url: "/home"
        },
        {
          name: "售后服务",
          url: "/user"
        },
        {
          name: "热点咨询",
          url: "/service"
        },
        {
          name: "公司简介",
          url: "/service"
        },
        {
          name: "我的订单",
          url: "/user"
        }
      ],
      headList1: [
        {
          name: "联想",
          url: "/search/联想"
        },
        {
          name: "文件夹",
          url: "/search/文件夹"
        },
        {
          name: "小钢炮",
          url: "/search/小钢炮"
        },
        {
          name: "得力",
          url: "/search/得力"
        },
        {
          name: "齐心",
          url: "/search/齐心"
        },
        {
          name: "晨光",
          url: "/search/晨光"
        }
      ],
      userMangeList: [
        {
          name: "我的订单",
          url: "/user"
        },
        {
          name: "账号资料",
          url: "/user"
        },
        {
          name: "收货地址",
          url: "/user"
        },
        {
          name: "售后服务",
          url: "/user"
        }
      ],
      userMangeCheckList: [
        {
          name: "我的订单",
          url: "/user"
        },
        {
          name: "订单审核",
          url: "/user"
        },
        {
          name: "账号资料",
          url: "/user"
        },
        {
          name: "收货地址",
          url: "/user"
        },
        {
          name: "售后服务",
          url: "/user"
        }
      ],
      infoShowFag: false, //消息中心
      collectionfag: false, //收藏夹
      userMangeShowFag: false, //用户菜单
      cartShowFag: false, //购物车菜单
      searchfocusFag: false, //搜索框焦点
      keyword: "",
      keywordList: [] //初始化时的关键字
    };
  },
  mounted() {
    var lett = this;
    this.getCart();
    this._getKeyWord();
    window.addEventListener("scroll", this.handleScroll);
    this.getinfo();
    this.userloginfag = Cookies.get("userlogfag");
    //绑定回车时间
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        if ($(".search-text:focus").length) {
          lett.search();
        }
      }
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(this.$store.state.user.userInfo);
    },
    cartList() {
      return this.$store.state.goods.cartList;
    },
    productionNum() {
      return this.$store.state.goods.productionNum;
    },
    cartTotalPrice() {
      return this.$store.state.goods.cartTotalPrice;
    },
    treedata() {
      return JSON.parse(this.$store.state.app.treedata);
    }
  },
  methods: {
    ...mapMutations(["getCart"]),
    //跳转至用户中心
    gotoUser(item) {
      this.$store.commit("servicename", item.name);
      this.$router.push({
        path: item.url
      });
    },
    goto(url) {
      this.$router.push({
        path: url
      });
    },
    goto1(id) {
      const { href } = this.$router.resolve({
        path: `/allProduct/${id}`
      });
      window.open(href, "_blank");
    },
    //头部链接跳转
    gotoHead(item) {
      if (item.url.indexOf("search") > -1) {
        //如果是搜索
        this.$store.commit("savekeyword", item.name);
      } else {
        this.$store.commit("servicename", item.name);
      }
      const { href } = this.$router.resolve({
        path: item.url
      });
      window.open(href, "_blank");
    },
    //退出登录
    _loginOut() {
      if (this.userInfo.username) {
        loginOut().then(res => {
          if (res.status == 0) {
            Cookies.remove("userlogfag");
            removeStore("username");
            removeStore("password");
            this.$router.push({
              path: "/Login"
            });
          }
        });
      } else {
        qyloginOut().then(res => {
          if (res.status == 0) {
            Cookies.remove("userlogfag");
            removeStore("username");
            removeStore("password");
            this.$router.push({
              path: "/Login"
            });
          }
        });
      }
    },
    showclass() {
      if (this.$route.path != "/home") this.showclassfag = true;
    },
    hideclass() {
      if (this.$route.path != "/home") this.showclassfag = false;
    },
    _getKeyWord() {
      getKeyWord().then(res => {
        this.keywordList = res.data;
      });
    },
    close(productId, xhid) {
      let productIdobj = {};
      if (xhid) {
        productIdobj = {
          productIds: productId,
          modelId: xhid
        };
      } else {
        productIdobj = {
          productIds: productId
        };
      }
      this.$store.commit("removeCartProduct", productIdobj);
    },
    search() {
      this.$store.commit("savekeyword", this.keyword);
      this.searchfocusFag = false;
      this.$router.push({
        path: `/search/${this.keyword}`
      });
    },
    search1(keyword) {
      this.$store.commit("savekeyword", keyword);
      this.$router.push({
        path: `/search/${keyword}`
      });
    },
    onblur() {
      setTimeout(() => {
        this.searchfocusFag = false;
      }, 200);
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 120) {
        this.fix = true;
      } else {
        this.fix = false;
      }
    },
    //获取未读消息
    getinfo() {
      if (!Cookies.get("userlogfag")) return;
      getUnInfoNum().then(res => {
        this.unInfoNum = res.data;
      });
    },
    showwrap(name, obj, id) {
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
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.nav-list {
  float: left;
  line-height: 40px;
}

.nav-list > li {
  float: left;
  color: #666;
  display: block;
  font-size: 12px;
  cursor: pointer;
}

.nav-list > li:hover {
  color: #ff6700;
}

.nav-aside {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
}

.nav-user {
  margin-left: 41px;
  width: 36px;
}

.person {
  width: 77px;
}

.user {
  color: #666;
  height: 40px;
  line-height: 40px;
  display: block;
  transition: none;
  text-align: center;
}

.nav-user-wrapper {
  z-index: 30;
  top: 40px;
  transform: translate(-50%);
  left: 50%;
}

.nav-user-list {
  width: 168px;
  position: relative;
  padding-top: 20px;
  background: #fff;
  border: 1px solid #d6d6d6;
  border-color: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.nav-user-list:before {
  position: absolute;
  content: " ";
  background: url(../../../static/images/account-icon.png) no-repeat -49px -43px;
  background-size: 240px 107px;
  width: 20px;
  height: 8px;
  top: -8px;
  left: 73px;
}

.ic {
  font-size: 16px;
  // color: #666;
  line-height: inherit;
  float: left;
}
.icfont {
  height: 40px;
  line-height: 40px;
  display: block;
  width: 55px;
  float: left;
}
.user:hover {
  color: #ff6700;
}

.head {
  background: #f7f7f7;
  width: 100%;
  z-index: 1000;
}
.headfix {
  background: #333;
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
}
.headfix span {
  // color: #d4cfcf !important;
}

.blackheader {
  height: 40px;
  z-index: 30;
  position: relative;
  width: 1220px;
  margin: 0 auto;
  color: #c8c8c8;
  font-size: 12px;
  font-weight: 600;
}

.whiteheader {
  position: relative;
  width: 1220px;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  height: 90px;
  background: #fff;
}

.nav-logo {
  float: left;
  margin-left: -5px;
  padding: 25px 0 0;
}

.logo {
  background: url(../../../static/images/logo.jpg) no-repeat 0px 0px;
  background-size: cover;
  display: block;
  height: 60px;
  width: 50px;
  text-indent: -9999px;
  transition: none;
  text-decoration: none;
}

.sep {
  margin: 0 0.5em;
  color: #424242;
}

.topbar-cart {
  width: 120px;
  margin-left: 15px;
  height: 40px;
}

.shopcart {
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  margin: 0 5px 0 20px;
}

.shopcart-font {
  font-size: 12px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #fff;
}

.topbar-cart {
  background: #ff6700;
}

.topbar-cart:hover {
  color: #ff6700;
  background: #ff7f29;
  cursor: pointer;
}

.usermange > li {
  text-align: center;
  position: relative;
  border-top: 1px solid #f5f5f5;
  line-height: 44px;
  height: 44px;
  color: #616161;
  font-size: 12px;
  cursor: pointer;
}

.usermange > li:hover {
  background: #fafafa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */

 {
  opacity: 0;
}

.logangreg {
  width: 70px;
  font-size: 12px;
}

.logangreg > li {
  float: left;
  line-height: 40px;
  height: 40px;
  cursor: pointer;
}

.logangreg > li:hover {
  color: #fff;
}

//购物车
.cart-menu {
  position: absolute;
  right: 0;
  right: -1px \9;
  top: 40px;
  z-index: 31;
  width: 316px;
  padding: 15px 0 0;
  color: #424242;
  background: #fff;
  border: 1px solid #e0e0e0 \9;
  border-top: 0 \9;
  -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.nothing {
  margin: 5px 20px 20px;
  text-align: center;
}

.nothing > p {
  position: relative;
  margin: 0 auto;
  height: 20px;
  font-size: 12px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  overflow: visible;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-transform: scale(1, 1);
  -ms-transform: scale(1, 1);
  transform: scale(1, 1);
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

//白色导航栏
.header-logo {
  float: left;
  width: 235px;
  margin-top: 12px;
  cursor: pointer;
}

.header-nav {
  float: left;
  width: 600px;
}

.nav-list1 {
  position: relative;
  z-index: 10;
  float: left;
  margin: 0;
  padding: 9px 0 0 81px;
  list-style-type: none;
  font-size: 12px;
}

.nav-list1 > li {
  padding: 0 10px;
  color: #333;
  font-weight: 400;
  cursor: pointer;
}

.nav-list1 > li:hover {
  color: #ff6700;
}

.header-wechat {
  width: 300px;
  height: 90px;
}

.sys {
  width: 70px;
  float: left;
  margin-top: 10px;
}
.sysspan {
  margin-left: 20px;
  line-height: 90px;
  display: inline-block;
}
.nav-category {
  position: relative;
  float: left;
  width: 127px;
  padding-right: 15px;
}

.header-search {
  margin-top: 10px;
}

.search-form {
  position: relative;
  width: 535px;
  height: 43px;
}

.search-text {
  position: absolute;
  top: 1px;
  right: 44px;
  z-index: 1;
  width: 400px;
  height: 41px;
  padding: 0 10px;
  border: 1px solid #ff6700;
  font-size: 14px;
  line-height: 43px;
  outline: 0;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  width: 45px;
  height: 43px;
  border: 1px solid #e0e0e0;
  font-size: 24px;
  line-height: 24px;
  background: #ff6700;
  color: #fff;
  outline: 0;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  cursor: pointer;
  text-align: center;
}

.search-btn:hover {
  background: #ff6700;
  color: #fff;
}

.search-icon {
  line-height: 43px;
}

.keyword-list {
  position: absolute;
  left: 91px;
  top: 42px;
  z-index: 100;
  width: 400px;
  border: 1px solid #ff6700;
  border-top: 0;
  background: #fff;
}

.result-list > li {
  position: relative;
  display: block;
  padding: 6px 15px;
  font-size: 12px;
  color: #424242;
  width: 100%;
  cursor: pointer;
}

.result-list > li:hover {
  background: #fafafa;
}

.search-hot-words {
  position: absolute;
  top: 10px;
  right: 62px;
  z-index: 2;
  text-align: right;
}

.search-hot-words span {
  display: inline-block;
  margin-left: 5px;
  padding: 0 5px;
  font-size: 12px;
  background: #eee;
  color: #757575;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  cursor: pointer;
}

.search-hot-words span:hover {
  background: #ff6700;
  color: #fff;
}

.orangeboder {
  border: 1px solid #ff6700 !important;
}

.bq-enter-active,
.bq-leave-active {
  transition: opacity 0.3s;
}

.bq-enter,
.bq-leave-to {
  opacity: 0;
}

.cart-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  max-height: 400px;
  overflow: auto;
}

.cart-list li {
  position: relative;
  padding: 0 20px;
}

.cart-list li > div > div {
  min-height: 80px;
}

.cart-list li:first-child .cart-item,
.site-topbar .cart-list li.first .cart-item {
  border-top: 0;
}

.cart-item {
  position: relative;
  height: 60px;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
  line-height: 20px;
}

.cart-item .thumb {
  float: left;
  margin-right: 10px;
}

.cart-item .thumb img {
  width: 60px;
  height: 60px;
}

.cart-item .name {
  float: left;
  display: inline;
  width: 95px;
  height: 40px;
  margin: 10px 0;
  color: #424242!important;
  overflow: hidden;
  zoom: 1;
}

.cart-item .name:hover {
  color: #ff6700;
}

.cart-item .price {
  float: right;
  display: inline;
  margin: 10px 20px 0 5px;
}

.cart-item .btn-del {
  display: none;
  position: absolute;
  top: 21px;
  right: 0;
  color: #424242;
}

.cart-item:hover .btn-del {
  display: block;
}

.cart-total {
  padding: 15px 20px;
  background: #fafafa;
}

.cart-total .total {
  float: left;
  width: 135px;
  color: #757575;
}

.cart-total em {
  font-style: normal;
}

.cart-total .price {
  display: block;
  font-weight: 400;
  color: #ff6700;
}

.pay-btn {
  float: right;
}

.price em {
  font-size: 24px;
  line-height: 1;
}

.user {
  cursor: pointer;
}

.nav-aside .active {
  background: #ff6700;
  color: #fff;
}
.site-bn-bar-link {
  display: block;
  width: 100%;
  height: 120px;
  text-indent: -9999em;
}
.blackinput {
  top: 8px;
  right: 382px;
}
.blacksearchicon {
  position: absolute;
  top: 3px;
  right: 6px;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.navibar {
  background: #f7f7f7;
  width: 100%;
  border-bottom: 2px solid #ff6700;
}
.orignhead {
  height: 40px;
  position: relative;
  width: 1220px;
  margin: 0 auto;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}
.orignhead > li {
  height: 40px;
  line-height: 40px;
  margin: 0 50px;
  text-align: center;
  float: left;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
.orignhead > li:nth-child(1) {
  margin: 0;
  background: #ff6700;
  color: #fff;
  width: 234px;
  font-weight: 600;
}
.orignhead > li:nth-child(n + 2):hover {
  color: #ff6700;
}
.jsczt {
  width: 170px;
  top: 14px;
  right: 0;
}
.site-category {
  display: block;
  position: absolute;
  top: 2px;
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
  line-height: 32px !important;
  margin: 0 10px 0 25px;
}
.arrowic1 {
  font-size: 12px;
  line-height: 38px !important;
  margin: 0 10px 0 25px;
}
.right-wrap {
  top: 2px;
  right: 0;
  width: 986px;
  height: 450px;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 1px 16px 0 rgba(0, 0, 0, 0.2);
  padding-top: 30px;
  margin-left: 20px;
  overflow: auto;
}
.bqtitle {
  width: 196px;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  line-height: 39px;
}
.proxq {
  padding: 5px 0;
}
.proxq > span {
  border-left: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  color: #333;
  cursor: pointer;
}
.proxq > span:hover {
  color: #ff6700;
  text-decoration: underline;
}
.proxq img {
  margin-right: 12px;
  vertical-align: middle;
  height: 40px;
  width: 40px;
}
.bqthree {
  width: 700px;
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
</style>
