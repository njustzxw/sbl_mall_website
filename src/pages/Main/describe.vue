<template>
<div>
    <div class="clearfix">
        <div class="lb"></div>
        <!-- 缩略图 -->
        <div class="product-view fl">
            <Carousel v-model="value2" :arrow='hover' style="border:1px solid #e8e8e8">
                <CarouselItem v-for="(item,index) in productInfo.subImages"  :key="index" >
                    <div class="" style="width:400px;height:400px">
                        <img-zoom :src="item" width="400" height="300" :bigsrc="productInfo.bigImages[index]" :configs="configs"></img-zoom>
                    </div>
                </CarouselItem>
            </Carousel>
            <div class="ylt">
                <div v-for="(item,index) in productInfo.smallImages" :key="index" v-show="index<4" class="yltblock" @click="value2=index">
                    <img :src="item" alt="" :class="value2==index?'yltactive':''">
                </div>
            </div>
            <div class="kfbtn clearfix">
                <div class="fl">
                    <Icon type="chatbubbles" @click="openkf"></Icon>
                    <span @click="openkf">咨询客服</span>
                </div>
                <div class="fl" :style="collectfag?'color:red':''" >
                    <Icon type="android-favorite"  @click="collect" ></Icon>
                    <span @click="collect">{{collectfag?"取消收藏":"收藏该商品"}}</span>
                </div>
            </div>
        </div>
        <!-- 产品信息 -->
        <div class="product-info fl">
            <div class="product-title">
                <h1>{{productInfo.name}}</h1>
                <h2 class="product-subtitle">{{productInfo.subtitle}}</h2>
            </div>
            <div class="product-spec-wrapper">
                <div class="product-spec">
                    <span class="spec-name">型号选择</span>
                    <ul class="spec-info">
                        <li class="activedes" v-if="productInfo.productModelList&&!productInfo.productModelList.length">
                            <div class="specs-item item-inline">
                                <h1  :title="productInfo.name" class="item-name" style="width:230px">{{productInfo.name}}</h1>
                            </div>
                        </li>
                        <li v-else v-for="(item,index) in productInfo.productModelList" :key="index" class="pr" @click="selectxh(item)" :class="selectedxh.id==item.id?'activedes':''">
                            <div class="specs-item item-inline">
                                <h4 class="item-name"> {{item.name}} </h4>
                                <span class="pa choose" v-if="selectedxh.id==item.id">
                                    <Icon type="checkmark" class="pa chooseicon"></Icon>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="productInfo.productModelList&&productInfo.productModelList.length">
                <div class="product-spec-wrapper">
                    <div>
                        <span class="spec-name">数量选择</span>
                        <div class="spec-info" style="margin-top: 8px;}">
                            <InputNumber :max="selectedxh.stock" :min="1" v-model="number"></InputNumber>
                            <span class="kc"> 剩余库存{{selectedxh.stock}}</span>
                        </div>
                    </div>
                </div>
                <div class="pro-list">
                    <ul>
                        <li class="clearfix">
                            <span class="fl" style="margin:0 50px 0 20px;display:block">{{selectedxh.name}}</span>
                            <span class="fl" style="color:#ff6700">x {{number}}</span>
                            <span class="fr">
                                单价：
                                <span v-if="selectedxh.sprice" style="text-decoration:line-through">{{selectedxh.sprice}}</span>
                                <span v-else style="color:#ff6700;">{{selectedxh.price}}</span> 
                                 元
                            </span>
                        </li>
                        <li>
                            <span v-if="selectedxh.sprice" class="fr" style="margin-right:6px;color:#ff6700;font-size:20px;font-weight:600;height:20px;line-height:15px">{{selectedxh.price}}</span>
                        </li>
                        <li class="totlePrice">总计：{{(selectedxh.price*number).toFixed(2)}}元</li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <div class="product-spec-wrapper">
                    <div class="product-spec">
                        <span class="spec-name">数量选择</span>
                        <div class="spec-info" style="margin-top: 8px;}">
                            <InputNumber :max="productInfo.stock" :min="1" v-model="number"></InputNumber>
                            <span class="kc"> 剩余库存{{productInfo.stock}}</span>
                        </div>
                    </div>
                </div>
                <div class="pro-list">
                    <ul>
                        <li class="clearfix">
                            <span class="fl">{{productInfo.name}}</span>
                            <span class="fl" style="color:#ff6700;margin:0 50px 0 20px;display:block">x {{number}}</span>
                            <span class="fr">
                                单价：
                                <span v-if="productInfo.sprice" style="text-decoration:line-through">{{productInfo.sprice}}</span> 
                                <span v-else style="color:#ff6700;">{{productInfo.price}}</span> 
                                元
                            </span>
                        </li>
                        <li>
                            <span v-if="productInfo.sprice" class="fr" style="margin-right:6px;color:#ff6700;font-size:20px;font-weight:600;height:20px;line-height:15px">{{productInfo.price}}</span>
                        </li>
                        <li class="totlePrice">总计：{{(productInfo.price*number).toFixed(2)}}元</li>
                    </ul>
                </div>
            </div>
            <div class="btn-purch clearfix">
                <button class="purchnow fl" @click="purchnow">
                    <span>立即购买</span>
                </button>
                <button class="addtocart fl" @click="addToCart">
                      <Icon type="ios-cart"></Icon>
                    <span>加入购物车</span>
                </button>
                <!-- <Button size='large' type="warning" class="fl" @click="addToCart">加入购物车</Button>
                <Button size='large' class="ask fl" @click="openkf">咨询客服</Button> -->
            </div>
            <ul class="clearfix shuoming">
                <li >
                    <Icon type="ios-checkmark"></Icon>
                    <span>7天无理由退货无理由退货</span>
                </li>
                <li>
                    <Icon type="ios-checkmark"></Icon>
                    <span>15天质量问题换货</span>
                </li>
                <li>
                    <Icon type="ios-checkmark"></Icon>
                    <span>7企业采购</span>
                </li>
            </ul>
        </div>
        <!-- 看了又看 -->
        <div class="product-similiar fl">
            <div class="block pr">
                <div class="pa bgborder" style=""></div>
                <span>看了又看</span>
                <Carousel v-model="value1" :dots="out" arrow='always'>
                    <CarouselItem v-for="(obj,index) in similarProductList" :key="index" >
                        <ul class="commonul">
                            <li v-for="(item,index) in obj" :key="index">
                                <img :src="item.image" alt="" class="commonimage" @click="goto(item.productId)">
                                <p class="price">￥{{item.price.toFixed(2)}}</p>
                                <p class="name"  @click="goto(item.productId)">{{item.name}}</p>
                            </li>
                        </ul>
                    </CarouselItem>
                </Carousel>
            </div>
        </div>
    </div>
    <!-- 详情 -->
    <div  class="xq clearfix">
        <div class="fl xqleft">
            <!-- 相关分类 -->
            <div class="leftbox">
                <div class="area-head">
                    <h3>相关分类</h3>
                </div>
                <ul class="procon-relate">
                    <li v-for="(item,index) in classifyData" :key="index" @click="gotocat(item.categoryId)">{{item.categoryName}}</li>
                </ul>
            </div>
            <!-- 相同购买 -->
            <div class="leftbox">
                <div class="area-head">
                    <h3>看了最终买</h3>
                </div>
                <ul class="commonul" style="margin-top:0">
                    <li v-for="(item,index) in similarProductList1" :key="index" style="margin:10px 0">
                        <img :src="item.image" alt="" class="commonimage" @click="goto(item.productId)">
                        <p class="price" style="color:red">￥{{item.price.toFixed(2)}}</p>
                        <p class="name"  @click="goto(item.productId)">{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="fl xqright">
            <Tabs type="card">
                <TabPane label="详情介绍">
                    <div class="xq-product1">
                        <div class="xq-product1-js">
                            <ul class="xq-brand clearfix">
                                <li>
                                    品牌：
                                    <span class="">{{productInfo.brand}}</span>
                                </li>
                            </ul>
                            <ul class="parameter clearfix">
                                <li :title="productInfo.name">商品名称：{{productInfo.name}}</li>
                                <li>商品编号：{{productInfo.id}}</li>
                                <li>商品毛重：{{productInfo.weight}}</li>
                                <li>商品产地：{{productInfo.originCountry}}</li>
                            </ul>
                        </div>
                        <div class="xq-product1-img">
                            <img v-for="(item,index) in productInfo.bigImages" :key="index" :src=" item" alt="" />
                        </div>
                    </div>
                </TabPane>
                <TabPane label="商品规格">
                    <div class="package-list">
                        <h3>包装清单</h3>
                        <p>{{productInfo.itemDetail}}</p>
                    </div>
                </TabPane>
                <TabPane label="售后保障">
                    <div>
                        <div class="sh-title">
                            <h4> 退换货服务</h4>
                        </div>
                        <div class="sh-content">
                            <div class="guarantees">
                                <p style="margin-top:20px"> 1. 在收到所购商品时，如发现商品缺损、脏污、型号、数量不符或耗材内商品时可当场联系售后部门提出退换货要求，情况核实后我们将在两个工作日内将新商品免费送至您处。</p>
                                <p>2.在使用过程中发现质量问题时，应立即停止该商品的使用，并与思贝丽商城客户服务中心取得联系，思贝丽将对问题商品进行检测，检测结果确定为商品质量时，思贝丽将为您免费办理退换货手续。个别商品的质量检测须根据厂家检测报告为准。 </p>
                                <p>3.因客户原因造成退换货的，思贝丽将根据具体的情况提供有偿的退换货服务，具体费用视情况而定。</p>
                            </div>
                        </div>
                        <div class="sh-title">
                            <h4> 退换货条件</h4>
                        </div>
                        <div class="sh-content">
                            <div class="guarantees">
                                <p><strong>商品交付后的15天之内，出现下列情形之一的可以申请退换货</strong></p>
                                <p style="margin-top:20px"> 1. 商品质量问题（发现可能是质量问题时请立即停止使用）</p>
                                <p>2.商品破损、型号/数量不符。 </p>
                                <p>3.因客户的原因造成的退换货，思贝丽将根据具体的情况收取配送费。</p>
                            </div>
                        </div>
                        <div class="sh-title">
                            <h4> 退换货说明</h4>
                        </div>
                        <div class="sh-content">
                            <div class="guarantees">
                                <p><strong>下列情形之一的，不予进行退换货服务</strong></p>
                                <p style="margin-top:20px"> 1. 因客户原因,造成商品外观及外包装、使用性能损坏等不能再次销售的商品。</p>
                                <p>2.无故要求将货物随意更换成其他产品时。 </p>
                                <p>3.根据客户的要求、特别购买订制的商品。</p>
                                <p>4.合同规定的不可退货商品。</p>
                                <p>5.非质量原因的，有保质期或使用期限的商品。</p>
                                <p>6.超过厂家规定保修期的商品。</p>
                                <p>7.外包装丢失的硒鼓、墨盒等消耗品。</p>
                            </div>
                        </div>
                        <div class="sh-title">
                            <h4> 退换货流程</h4>
                        </div>
                        <div class="sh-content">
                            <div class="guarantees">
                                <div>
                                    <img src="../../../static/images/process.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="用户评价">
                    <div class="package-list">
                        <div>
                            <div v-for="(item,index) in commentlist" :key="index" class="comment-list pr clearfix">
                                <div class="from-whom">
                                    <img src="../../../static/images/avatar.png" alt="" class="avatar">
                                    <div>{{item.userName}}</div>
                                </div>
                                <div class="comment-word fl">
                                    <div>{{item.content}}</div>
                                    <div class="time">{{getTime(item.createTime)}}</div>
                                    <div v-if="item.newContent">
                                        <div class="zjpl">追加评论</div>
                                        <div style="padding-left: 20px;">{{item.newContent}}</div>
                                        <div class="time" style="padding-left: 20px;">{{getTime(item.updateTime)}}</div>
                                    </div>
                                </div>
                                <div class="fl star">
                                    <Rate disabled v-model="item.starLevel"></Rate>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
            <div class="weixin">
                <img src="../../../static/images/weixin.jpg" alt="" style="margin: 50px 0;">
            </div>
        </div>
    </div>
    <div class="mt20">
        <div class="liketitle">猜你喜欢</div>
        <ul class="yourlike clearfix">
            <li class="fl" v-for="(item,index) in yourlisjList" :key="index">
                <img :src="item.image" alt="" class="youfavarite" @click="goto(item.productId)">
                <p class="name"  @click="goto(item.productId)">{{item.name}}</p>
                <p class="price" style="color:red">￥{{item.price.toFixed(2)}}</p>
                <Button type="dashed" @click.stop.prevent="addToCart(item)">加入购物车</Button>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import {getProductById,getSimilarProduct,getCategory,getyoulike,querycollect,collectProduct,delcollectProduct,getevalution} from '@/api/goods'
import imgZoom from 'vue2.0-zoom'
export default {
    name: 'describe',
    components: {
        imgZoom 
    },
    data () {
        return {
            yourlisjList:[],
            number:1,
            value1:0,
            value2: 0,
            always:'always',
            hover:'hover',
            never:'never',
            out:'outside',
            selectedxh:'',
            productInfo:{},
            similarProductList:[],
            similarProductList1:[],
            classifyData:[],
            configs: {
             width:550,
             height:400,
             maskWidth:100,
             maskHeight:100,
             maskColor:'red',
             maskOpacity:0.2,
           },
           collectfag:'',
           commentlist:[],  
        }
    },
    mounted () {
        this.getProductInfo()
        this._getyoulike()
        this._querycollect()
        this._getevalution()
    },
    computed:{
    },
    methods: {
        goto(id) {
            const { href } = this.$router.resolve({
                path: `/describe/${id}`
            })
            window.open(href, '_blank')
        },
        gotocat(id){
            const { href } = this.$router.resolve({
                path: `/allProduct/${id}`
            })
            window.open(href, '_blank')
        },
        _getCategory() {
            getCategory().then(res => {
                var list = []
                for(let obj of res.data){
                    if(obj.parentId == this.productInfo.productPathVo.secondCategoryId&&obj.level == 2){
                        list.push(obj)
                    }
                }
                this.classifyData = list;
            });
        },
        getProductInfo () {
            var params = {
                productId:this.$route.params.id
            }
            getProductById(params).then(res => {
                this.productInfo = res.data
                this.selectedxh = res.data.productModelList[0]
                console.log(this.productInfo)
                this._getSimilarProduct()
                this._getSimilarProduct2()
                this._getCategory()
            })
            
        },
        selectxh (item) {
            this.selectedxh = item
        },
        purchnow(){
            let product;
            if(this.selectedxh){
                product = {
                    productId: this.productInfo.id,
                    count:this.number,
                    modelId:this.selectedxh.id,
                    price:this.selectedxh.price,
                    productMainImage:this.productInfo.mainImage,
                    name:this.productInfo.name,
                    modelName:this.selectedxh.name,
                }
            }else{
                product = {
                    productId: this.productInfo.id,
                    count:this.number,
                    price:this.productInfo.price,
                    productMainImage:this.productInfo.mainImage,
                    name:this.productInfo.name
                }
            }
            this.$store.commit("purchnowlist", product);
            this.$router.push({path:'/order/purchnow'})
        },
        addToCart() {
            let product;
            if(this.selectedxh){
                product = {
                    id: this.productInfo.id,
                    count:this.number,
                    modelId:this.selectedxh.id
                }
            }else{
                product = {
                    id: this.productInfo.id,
                    count:this.number,
                }
            }
	      	this.$store.commit("addCart1", product);
        },
        _getSimilarProduct(){
            var params = {
                categoryId:this.productInfo.categoryId
            }
            getSimilarProduct(params).then(res => {
                // that.similarProductList = res.data
                var list = []
                list.push(res.data.slice(0,4))
                list.push(res.data.slice(4,8))
                list.push(res.data.slice(8,12))
                this.similarProductList = list
            })
        },
        _getSimilarProduct2(){
            var params = {
                categoryId:this.productInfo.categoryId
            }
            getSimilarProduct(params).then(res => {
                var list = []
                this.similarProductList1 = res.data.slice(0,6)
            })
        },
        openkf () {
            window.open('http://p.qiao.baidu.com/cps/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22-1%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2212276989%22%2C%22userId%22%3A%2225904580%22%2C%22pageId%22%3A0%7D&qq-pf-to=pcqq.c2c ', 'newwindow','toolbar=no,scrollbars=yes,resizable=no,top=50%,left=50%,width=800,height=600')
        },
        _getyoulike () {
            getyoulike().then(res => {
                this.yourlisjList = res.data.slice(0,6)
            })
        },
        _querycollect () {
            var params = {
                productId:this.$route.params.id
            }
            querycollect(params).then(res => {
                this.collectfag = res.data;
            })
        },
        collect () {
            var params = {
                productId:this.$route.params.id
            }
            if(this.collectfag){
                delcollectProduct(params).then(res => {
                    if(res.data == "删除成功"){
                         this.collectfag = 0;
                    }
                }) 
            }else{
                collectProduct(params).then(res => {
                    if(res.data == "插入成功"){
                         this.collectfag = 1;
                    }
                })
            }
        },
        _getevalution () {
            getevalution({productId:this.$route.params.id}).then(res => {
                this.commentlist = res.data
                console.log(this.commentlist)
            })
        },
        getTime (time) {
            var timestr = new Date(time).getFullYear() + '年' + new Date(time).getMonth() + '月' + new Date(time).getDate() + '日' +' ' + new Date(time).getHours() + ':' + new Date(time).getMinutes() + ':' + new Date(time).getSeconds()
            return timestr
        }
    },
}
</script>
<style>
.sh-title{
    height: 35px;
    margin-top: 40px;
    border-bottom: 1px solid #bbb;
    text-align: left;
    padding: 0 10px;
}
.sh-content{
    color: #666;
    text-align: left;
     padding: 0 10px;
}
.sh-content .guarantees {
    padding-top: 7px;
}
.sh-title h4 {
    position: relative;
    float: left;
    height: 35px;
    margin-bottom: -1px;
    padding-right: 10px;
    border-bottom: 1px solid #f70;
    font: 14px/35px microsoft yahei;
}
.guarantees p {
    line-height: 2;
}
.product-view{
    width: 500px;
    padding: 0 50px;
    text-align: center;
}
 .product-view img {
    width: 400px;
    height: 400px;
}
.product-info{
    width: 500px;
}
.product-similiar{
    margin-left: 25px;
    border-left: 1px solid #e6e6e6
}
.xqleft{
    width: 200px;
}
.xqright{
    width: 1000px;
    margin-left: 20px
}
.xqright .ivu-tabs-bar{
    margin: 0;
}
.xqright .ivu-tabs-content{
    background: #fff;
    padding-top:20px;
    border-left:1px solid #e3e3e3;
    border-right:1px solid #e3e3e3;
    border-bottom:1px solid #e3e3e3;
}
.leftbox{
    border: 1px solid #eee;
    background-color: #fff;
    margin-top: 10px!important;
}
.area-head {
    height: 34px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
}
.area-head h3 {
    font: normal 14px/34px \5FAE\8F6F\96C5\9ED1;
    color: #666;
}

.procon-relate {
    padding: 10px 0;
    overflow: hidden;
}
.procon-relate li {
    float: left;
    width: 70px;
    padding-left: 20px;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    word-break: break-all;
    color: #666;
    text-align: left;
    cursor: pointer;
}
.procon-relate li:hover{
    color: #ff6700;
    text-decoration: underline;
}
 .product-similiar .block{
    background: #fff;
    width: 180px;
    height: 700px;
    margin-left: 14px;
    padding: 10px;
    margin-bottom: 20px;
 }
 .product-similiar .block>span{
     text-align:center;
     font-weight: 400;
      background:#fff;
      font-size: 14px;
      position: absolute;
      left: 55px;
      padding: 0 10px;
 }
.product-title h1 {
    font-weight: 500;
    font-size: 20px;
    color: #000;
    line-height: 1;
    padding: 0 0 20px;
}
.product-title h2 {
    font-size: 14px;
    max-height: 50px;
    line-height: 1.75;
    padding-bottom: 24px;
    border-bottom: 1px solid #e5e5e5;
    border-bottom: 1px solid rgba(0,0,0,.08);
    color: #999;
}
.product-spec-wrapper{
    border-bottom: 1px dashed #e6e6e6;
}
.product-spec{
    overflow: hidden;
    zoom: 1;
    padding: 2px 0 0;
}
.spec-name{
    width: 85px;
    height: 70px;
    line-height: 110px;
    color: #666;
    font-size: 14px;
    float: left;
}
.spec-info {
    border-bottom: none;
    padding: 30px 0;
    position: relative;
    display: inline-block;
    width: 414px;
}
.item-inline {
    line-height: 48px;
}
.specs-item {
    width: 100%;
    display: block;
    line-height: 1;
    text-align: center;
    padding:0 10px;
}
.item-name {
    color: #323232;
    font-size: 14px;
    height: 40px;
    line-height: 48px;
    font-weight: 500;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.spec-info > li{
    min-width: 180px;
    max-width: 245px;
    float: left;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    transition: box-shadow .15s linear;
    background: #f9f9fa;
}
.spec-info > li:nth-child(odd) {
    margin-right: 10px;
}
.spec-info> li:nth-child(n+3) {
    margin-top: 10px;
}
.activedes {
    border:1px solid #ff6709!important;
}
.pro-list {
    background: #f9f9fa;
    padding: 20px;
    margin: 30px 0;
    color:#616161;
    font-size: 14px;
    font-weight: 500;
}
.pro-list ul {
    padding: 0;
    margin: 0;
}
.pro-list ul li {
    list-style: none;
    line-height: 30px;
    color: #616161;
}
.pro-list ul li:first-child {
    margin-top: 0;
}
.totlePrice {
    color: #ff6700!important;
    font-size: 24px;
    padding-top: 20px;
}
.kc{
    padding-left: 30px;
}
.btn-purch {
    margin: 0 0 20px 0;
    padding: 0;
}
.btn-purch button{
    font-size: 20px;
    height: 50px;
}
.xq{
    border-top: 1px solid #dadada;
    text-align: center;
    padding: 30px 0 20px;
}
.xq-product {
    text-align: left;
    font-size: 22px;
    font-weight: normal;
}
.weixin{
    margin-top:20px;
}
.weixin img{
    width: 100%;
    display: block;
}
.xq-product1 img{
	width: 750px;
	margin: 0 auto;
	text-align: center;
}
.xq-product1 li{
    text-align: left;
    width: 242px;
    padding-left: 42px;
    float: left;
    margin-bottom: 5px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.parameter {
    padding: 20px 0 15px;
}
.xq-brand li{
    width: 50%;
}
.package-list{
    padding: 12px 0;
    line-height: 220%;
    color: #999;
    font-size: 12px;
    margin-top: -1px;
}
.package-list h3 {
    width: 130px;
    text-align: right;
    font-weight: 400;
    font-size: 12px;
    float: left;
}
.package-list p {
    margin-left: 155px;
    padding-right: 50px;
}
.ylt{
    margin-top:20px;
}
.yltblock{
    display:inline-block;
    cursor: pointer;
}
.yltblock:hover{
    opacity: 0.8;
}
.ylt img{
    width:80px;
    height: 80px;
    margin: 10px;
    border:1px solid rgb(223, 221, 221);
}
.yltactive{
    border:2px solid rgb(255, 103, 9)!important;
}
.choose{
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 20px solid rgb(255, 103, 9);
    border-left: 20px solid transparent;
}
.chooseicon{
    color: #fff;
    right: 0;
    bottom: -21px;
}
.shuoming>li{
    float: left;
    margin: 5px 10px 30px;
    font-size: 14px;
    color:#a0a0a0;
}
.bgborder{
    border-bottom: 1px dotted rgb(140, 140, 140);
    top: 19px;
    width: 80%;
    left: 18px;
}
.commonimage{
    width: 110px;
    height: 110px;
    cursor: pointer;
}
.commonul{
    text-align: center;
    margin-top:40px;
}
.commonul .commonprice{

}
.commonul .name{
    color:#989898;
    cursor: pointer;
     overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.commonul .name:hover{
    color:rgb(255, 103, 9)!important;
    text-decoration: underline;
}
.block .ivu-carousel .right{
    top: 665px;
    right: 5px;
    border-radius: 0;
    width:30px;
    height: 30px;
}
.block .ivu-carousel .left{
    top: 665px;
    left: 5px;
    border-radius: 0;
    width:30px;
    height: 30px;
}
.block .ivu-carousel-dots-outside{
    margin-top:12px;
}
.ask{
    margin-left:30px!important;
    width:150px!important
}
.ask:hover{
    border-color:#f90!important;
    color: #f90!important;
}

.addtocart{
    width: 278px;
    background: #ff3b00;
    color: #fff;
    border:none
}
.addtocart:hover{
    background: #fd621a;
    color: #fff;
}
.purchnow{
    width: 200px;
    background: #ffceab;
    color: #dc4517;
    border:none;
    margin-right: 20px;
}
.purchnow:hover{
    opacity: 0.8;
}
.btn-purch button:focus{
    outline: none;
}
.kfbtn{
    font-size: 18px;
    margin: 10px 0 ;
}
.kfbtn>div{
    width: 195px;
    text-align: center;
    cursor: pointer;
}
.kfbtn>div>span:hover{
    color: #dc4517;
}
.from-whom{
    float: left;
    overflow: hidden;
    width: 100px;
    text-align: center;
    line-height: 1.5;
}
.from-whom .avatar {
    width: 50px;
    height: 50px;
    border: 1px solid #e3e3e3;
    margin-top: 15px;
}
.comment-word{
    font-size: 14px;
    line-height: 1.4;
    color: #3F3F3F;
    word-wrap: break-word;
    margin: 15px 0;
    width: 700px;
    text-align: left;
}
.comment-list{
    min-height:100px;
    background: #fff;
    border-bottom: 1px solid #e3e3e3;
}
.star{
    margin: 15px 0 0 20px;
}
.time{
    font-size: 12px;
    color: #B0B0B0;
    margin-top: 25px;
}
.zjpl{
    padding: 5px 0;
    border-top: 1px solid #e3e3e3;
    color: #5762f7;
}
</style>    
