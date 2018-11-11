<template>
    <div class="left-navbar">
        <div class="self" @click="gotoHead({url:'/user',name:'账号资料'})">
            <span class="icon"></span>
            <div class="mes" style="">个人中心</div>
        </div>
        <div class="shop-cart" @click="goto('/cart')">
            <div class="cart-intro">
                <i></i>
                <span class="shuliang">{{productionNum}}</span>
            </div>
            <div class="mes" style="">购物车</div>
        </div>
        <div class="contact same" @click="openkf">
            <a href="javascript:;" ></a>
            <div style="">
                <a href="javascript:;" style="background: none;color: #fff;">在线客服</a>
            </div>
        </div>
        <div class="ewm">
            <div class="icon"></div>
            <div class="mes" style="right: 55px;">
                <img src="../../../static/images/wechat.jpg" alt="" style="height: 100px;width: 100px;">
            </div>
        </div>
        <transition name="fade">
            <div class="totop" @click="toTop(100)" :class="{show:isActive}" v-show="isActive?true:false">
                <div class="gotop"></div>
                <div class="mes">返回顶部</div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isActive:false,
        }
    },
     mounted() {
            //         this.$store.commit('getCart')
    },
    computed: {
        cartList() {
            return this.$store.state.goods.cartList;
        },
        productionNum() {
            return this.$store.state.goods.productionNum;
        },
        cartTotalPrice() {
            return this.$store.state.goods.cartTotalPrice;
        }
    },
    methods: {
        gotoHead(item) {
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
         toTop(i){
            //参数i表示间隔的幅度大小，以此来控制速度
            document.documentElement.scrollTop-=i;
            if (document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.toTop(i),16);
            }else {
                clearTimeout(c);
            }
        },
        openkf () {
            window.open('http://p.qiao.baidu.com/cps/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22-1%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2212276989%22%2C%22userId%22%3A%2225904580%22%2C%22pageId%22%3A0%7D&qq-pf-to=pcqq.c2c ', 'newwindow','toolbar=no,scrollbars=yes,resizable=no,top=50%,left=50%,width=800,height=600')
        }
    },
    created(){
        var vm=this;
        window.onscroll=function(){
            if (document.documentElement.scrollTop>60) {
                vm.isActive=true;
            }else {
                vm.isActive=false;
            }
        }
    },
}
</script>


<style scoped>
.left-navbar {
    width: 35px;
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 9999;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin-top: -50px;
}
.left-navbar .self, .left-navbar .shop-cart, .left-navbar .contact, .left-navbar .guanzhu, .left-navbar .shoucang, .totop, .ewm {
    position: relative;
    /* margin: 20px 0; */
    margin: 0 0 1px;
    cursor: pointer;
}
.left-navbar .self .icon, .left-navbar .shop-cart .cart-intro i, .left-navbar .contact>a, .left-navbar .guanzhu a, .left-navbar .shoucang a, .left-navbar .gotop, .ewm .icon {
    display: block;
    height: 35px;
    width: 100%;
    line-height: 35px;
    background-image: url(../../../static/images/self.png);
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center;
    background-color: #d0c7c7;
}
.left-navbar .shop-cart .cart-intro {
    color: rgb(255, 255, 255);
    text-align: center;
    cursor: pointer;
    font-family: 微软雅黑;
    position: relative;
}
.left-navbar .shop-cart .cart-intro i {
    /* background-image: url(/themes/default/images/shop-cartr.png); */
    background-image: url(../../../static/images/shop-cartf.png);
}
.left-navbar .shop-cart .cart-intro span {
    /* display: inline-block; */
    border-radius: 100%;
    background-color: #f64239 !important;
    background-image: none !important;
    border-radius: 100%;
    color: #fff;
    display: inline-block;
    height: 13px;
    left: 2px;
    line-height: 13px;
    min-width: 13px;
    position: absolute;
    top: 2px;
}
.left-navbar .shop-cart .cart-intro span {
    background-image: url(../../../static/images/disc-f.png);
    background-color: #1c1d21;
    background-repeat: no-repeat;
}
.left-navbar .contact>a {
    background-image: url(../../../static/images/kefu.png);
}
.left-navbar .contact div {
    height: auto;
}
.left-navbar .self div, .left-navbar .contact div, .left-navbar .guanzhu div, .left-navbar .shoucang div, .left-navbar .mes {
    position: absolute;
    right: 35px;
    background-color: #f64239;
    color: #fff;
    height: 35px;
    line-height: 35px;
    position: absolute;
    text-align: center;
    width: 80px;
    top: 0;
    display: none;
}
.left-navbar .ewm {
    margin-top: 100px;
}
.left-navbar .ewm .icon {
    background-image: url(../../../static/images/ewm.png);
}
.ewm .icon {
    display: block;
    height: 35px;
    width: 100%;
    line-height: 35px;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center;
    background-color: #d0c7c7;
}
.left-navbar .ewm .mes img {
    width: 100%;
    height: 100%;
}
.left-navbar .mes {
    position: absolute;
    right: 35px;
    background-color: #f64239;
    color: #fff;
    height: 35px;
    line-height: 35px;
    position: absolute;
    text-align: center;
    width: 80px;
    top: 0;
}
.left-navbar .gotop {
    background-image: url(../../../static/images/gotop.png);
    cursor: pointer;
}
.totop, {
    position: relative;
    margin: 0 0 1px;
    cursor: pointer;
}
.left-navbar .self:hover .icon, .left-navbar .shop-cart:hover .cart-intro i, .left-navbar .contact:hover a, .left-navbar .guanzhu:hover a, .left-navbar .shoucang:hover a, .ewm:hover .icon, .totop:hover .gotop {
    background-color: #f64239;
}
.self:hover div,.shop-cart:hover div,.contact:hover div,.ewm:hover div, .totop:hover div{
    display: block;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>

