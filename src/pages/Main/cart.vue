<template>
	<div>
		<div class="lb"></div>
		<div class="gray-box">
			<div class="title">
				<h2>购物清单</h2>
			</div>
			<div class="box-inner">
				<div>
					<div class="cart-table-title">
						<span class="name">商品信息</span>
						<span class="operation">操作</span>
						<span class="subtotal">小计</span>
						<span class="num">数量</span>
						<span class="price">单价</span>
					</div>
					<div class="cart-table" v-if="cartList.length">
						<div class="item-list have-margin">
							<div class="cart-group pr">
								<div class="divide">
									<div class="cart-items" v-for="(item,index) in cartList" :key="index">
                                        <div v-if="!item.productModelVoList">
                                            <div  class="clearfix">
                                                <div class="checkbox-container">
                                                    <Checkbox v-model="item.productChecked" @on-change="select(item.productChecked,item.productId)"></Checkbox>
                                                </div>
                                                <div class="items-thumb">
                                                    <img :src="item.productMainImage" alt="" />
                                                </div>
                                                <div class="name">
                                                    <p class="product-name">{{item.productName}}</p>
                                                    <p class="classsify">{{item.productSubtitle}}</p>
                                                </div>
                                                <div class="unit-price">￥{{item.productPrice}}</div>
                                                <div class="num">
                                                    <Button  shape="circle" icon="minus" @click="minus(item)" :disabled="item.quantity==1"></Button>
                                                    <span>{{item.quantity}}</span>
                                                    <Button type="primary" shape="circle" icon="plus" @click="add(item)" :disabled="item.quantity==item.stock"></Button>
                                                </div>
                                                <div class="subtotal">￥{{(item.productPrice * item.quantity).toFixed(2)}}</div>
                                                <div class="operation">
                                                    <Icon type="close-circled" @click="removeProduct(item.productId)"></Icon>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div  v-for="(item1,index1) in item.productModelVoList" :key="index1" class="clearfix">
                                                <div class="checkbox-container">
                                                    <Checkbox v-model="item1.checked" @on-change="selectwithxh(item1.checked,item.productId,item1.id)"></Checkbox>
                                                </div>
                                                <div class="items-thumb">
                                                    <img :src=" item.productMainImage" alt="" />
                                                </div>
                                                <div class="name">
                                                    <p class="product-name">{{item.productName}}    ({{item1.name}})</p>
                                                    <p class="classsify">{{item.productSubtitle}}</p>
                                                </div>
                                                <div class="unit-price">￥{{item1.price}}</div>
                                                <div class="num">
                                                    <Button  shape="circle" icon="minus" @click="minus(item,item1)" :disabled="item1.quantity==1"></Button>
                                                    <span>{{item1.quantity}}</span>
                                                    <Button type="primary" shape="circle" icon="plus" @click="add(item,item1)" ></Button>
                                                </div>
                                                <div class="subtotal">￥{{(item1.price * item1.quantity).toFixed(2)}}</div>
                                                <div class="operation">
                                                    <Icon type="close-circled" @click="removeProduct(item.productId,item1.id)"></Icon>
                                                </div>
                                            </div>
                                        </div>
									</div>
								</div>
							</div>
						</div>
					</div>
                     <div class="bg-white1"  style="text-align: center;" v-else>
                        <img src="../../../static/images/cart.png" alt="" style="width: 100px;margin-top: 130px;"/>
                        <p class="nonedata">暂无商品，赶紧选购吧</p>
                    </div>
				</div>
			</div>
            <div class="cart-bottom-bg fix-bottom">
                <div class="fix-bottom-inner">
                    <div class="cart-bar-operation">
                        <Checkbox v-model="chooseall" @on-change="selectall">全选</Checkbox>
                    </div>
                    <Button type="primary" size="large" class="fr" style="margin: 30px 30px 30px 0;" @click="pay">现在结算</Button>
                    <div class="shipping">
                        <div class="shipping-box">
                            <div class="shipping-total shipping-num" style="min-width: 160px;">
                                <h4 class="highlight">已选择<i>{{checked}}</i>件商品</h4>
                                <h5>共<i>{{productionNum}}</i>件商品</h5>
                            </div>
                            <div class="shipping-total shipping-price" style="min-width:250px">
                                <h4 class="highlight">
                                     应付总额：<span>￥</span>
                                     <i><span>{{cartTotalPrice}}</span></i>
                                </h4>
                                <h5 v-show="cartTotalPrice >= 200">商品已达到包邮条件</h5>
                                <h5 v-show="cartTotalPrice < 200">商品未达到包邮条件</h5>
                            </div>
                        </div>
                    </div>
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
import { mapMutations } from 'vuex'
import {getyoulike} from '@/api/goods'
export default {
    data () {
        return {
            allfag:'',
            yourlisjList:[],
        }
    },
    mounted () {
        this._getyoulike()
    },
    computed: {
		userInfo() {
		return  JSON.parse(this.$store.state.user.userInfo);
		},
		cartList() {
		return this.$store.state.goods.cartList;
		},
		productionNum () {
			return this.$store.state.goods.productionNum;
		},
		cartTotalPrice () {
			return this.$store.state.goods.cartTotalPrice;
        },
        checked () {
			return this.$store.state.goods.checked;
        },
        chooseall: {
            get:function () {
                return this.$store.state.goods.allchecked;
            },
            set: function () {
            }
        }
    },
    methods: {
        ...mapMutations(["getCart"]),
        removeProduct (productId,xhid) {
            let productIdobj = {}
                if(xhid){
                    productIdobj = {
                        productIds:productId,
                        modelId:xhid
                    }
                }else{
                    productIdobj = {
                        productIds:productId
                    }
                }
        	this.$store.commit('removeCartProduct',productIdobj)
        },
        add (item,xhitem) {
            if(xhitem){
                this.$store.commit('updateCartNumber',{productId:item.productId,count:xhitem.quantity+1,modelId:xhitem.id})
            }else{
                this.$store.commit('updateCartNumber',{productId:item.productId,count:item.quantity+1})
            }
        },
        minus (item,xhitem) {
        	if(xhitem){
                this.$store.commit('updateCartNumber',{productId:item.productId,count:xhitem.quantity-1,modelId:xhitem.id})
            }else{
                this.$store.commit('updateCartNumber',{productId:item.productId,count:item.quantity-1})
            }
        },
        //没有型号的产品的选中
        select(checked,id){
            if(checked){ //选中 
                this.$store.commit('selectPro',{productId:id})
            }else{//取消选中
                this.$store.commit('cancleselectPro',{productId:id})
            }
        },
        //有型号的产品的选中
        selectwithxh(checked,productId,modelId){
            if(checked){ //选中 
                this.$store.commit('selectPro',{productId:productId,modelId:modelId})
            }else{//取消选中
                this.$store.commit('cancleselectPro',{productId:productId,modelId:modelId})
            }
        },
        selectall (fag) {
            if(fag){//全选
                this.$store.commit('selectALLPro')
            }else{//取消全选
                this.$store.commit('cancleselectALLPro')
            }
        },
        pay () {
            this.$router.push({path:'/order/cart'})
        },
        _getyoulike () {
            getyoulike().then(res => {
                this.yourlisjList = res.data.slice(0,6)
            })
        },
         goto(id) {
            const { href } = this.$router.resolve({
                path: `/describe/${id}`
            })
            window.open(href, '_blank')
        },
        addToCart(product) {
            this.$store.commit("addCart", product);
        },
    }
}
</script>

<style>
.gray-box{
    position: relative;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.gray-box .title {
    padding-left: 30px;
    position: relative;
    z-index: 10;
    height: 60px;
    padding: 0 10px 0 24px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 7px rgba(0,0,0,.06);
    background: #f3f3f3;
    background: linear-gradient(#fbfbfb,#ececec);
    line-height: 60px;
    font-size: 18px;
    color: #333;
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: 400;
}
.box-inner{
    padding-bottom: 91px;
}
.cart-table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0,0,0,.08);
}
.cart-table-title .num, .cart-table-title .operation, .cart-table-title .price, .cart-table-title .subtotal {
    width: 137px;
}
.cart-table-title span {
    float: right;
    text-align: center;
    color: #838383;
    display: block;
}
.cart-table-title .name {
    float: left;
    text-align: left;
}
.cart-group .cart-items {
    position: relative;
    margin-left: 74px;
}
.cart-group:first-child .cart-items {
    border-top: none;
}
.checkbox-container{
    float: left;
    position: absolute;
    left: -74px;
    top: 0;
    width: 74px;
    height: 20px;
    padding: 60px 0 0 31px;
    font-size: 12px;
    color: #999;
}

.items-thumb {
    position: relative;
    /*margin-top: 30px;*/
    overflow: hidden;
}
.items-thumb img {
    width: 80px;
    height: 80px;
    margin-top: 30px;
    border: 1px solid #eaeaea;
}
.cart-items>div>div{
    position: relative;
}
.cart-items>div>div>div{
	height:140px;
	float: left;
}
.cart-items .name{
	padding: 50px 0;
	margin-left: 30px;
    width: 485px;
}
.cart-items .name .product-name{
    color: #333;
    font-size: 16px;
}
.cart-items .name .classsify{
    color: #999;
    font-size: 12px;
}
.cart-items .unit-price,.cart-items .num,.cart-items .subtotal,.cart-items .operation{
	width: 137px;
	line-height:140px;
	text-align: center;
	font-size: 14px;
}
.cart-items .num>span{
	display: inline-block;
	padding: 0 10px;
}
.cart-items .subtotal{
    color: #666;
	font-weight: 700;
}
.cart-items .operation{
	font-size: 23px;
	cursor: pointer;
	color: #c2c2c2;
}
.cart-items .operation i:hover{
	opacity: 0.8;
}
.cart-bottom-bg{
    height: 80px;
    border-top: 1px solid #d9d9d9;
    border-radius: 0 0 8px 8px;
}
.fix-bottom {
    height: 90px;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
    background-position: 50%;
    background: #fdfdfd;
    background: linear-gradient(#fdfdfd,#f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0,0,0,.04);
}
.fix-bottom-inner .cart-bar-operation {
    float: left;
    padding: 35px 26px;
    font-size: 12px;
}
.shipping{
    display: inline-block;
    float: right;
    padding: 20px 30px;
    font-size:16px;
    font-weight: 400;
}
.shipping .shipping-box {
    display: inline-block;
    padding-top: 1px;
    margin-right: 10px;
}
.shipping .shipping-box .shipping-total .shipping-num {
    text-align: right;
}
.shipping-total:first-child {
    border: none;
}
.shipping .shipping-box .shipping-total {
    display: inline-block;
    border-left: 1px solid #e1e1e1;
    padding: 0 20px;
}
 .shipping-box .shipping-total h4 {
    color: #323232;
}
.shipping-total h4 i {
    color: #d44d44;
}
.shipping-total .shipping-num i {
    width: 28px;
    display: inline-block;
    text-align: center;
}
.shipping-total h4 i {
    font-size: 18px;
    font-weight: 700;
}
.shipping-box .shipping-total h5 {
    color: #959595;
}
.shipping-total h5 i {
    font-size: 16px;
    font-weight: 700;
}
.shipping-total .shipping-num i {
    width: 28px;
    display: inline-block;
    text-align: center;
}
.bg-white1{
    height: 500px
}
 .tablist{
    height: 288px;
    border: 1px dashed #ccc;
 }
</style>