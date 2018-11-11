<template>
    <div class="page-cart">
        <!-- 收货地址 -->
        <div class="gray-box address-box">
            <div class="title">
                <h2>收货信息</h2>
            </div>
            <div class="box-inner clearfix">
                <Card  class="card"  v-for="(item,index) in addressList" :key="index" :class="item.status?'border-card':''">
                   <!-- 普通用户 -->
                    <div  class="h"  @mouseover="currentid=index" @mouseout="currentid=-1" @click="_setDefualtAdress(item.id)" v-if="userInfo.username">
                        <p class="name hide-row">{{item.receiverName}}</p>
                        <p class="mobile">{{item.receiverMobile}}</p>
                        <p class="cascading hide-row">{{item.receiverProvince + item.receiverCity + item.receiverDistrict}}</p>
                        <p class="detail hide-row">{{item.receiverAddress}}</p>
                        <transition name="slide-fade">
                            <p style="text-align:center; margin-top:20px" v-show="index==currentid">
                                <Button type="info" style="margin:0 10px" size="small" @click.stop.prevent="mod(item)">修改</Button>
                                <Button type="error" style="margin:0 10px" size="small" @click.stop.prevent="delConfirm(item.id)">删除</Button>
                            </p>
                        </transition>
                        <Icon  v-show="item.status" type="checkmark" :class="item.status?'okicon':''"></Icon>
                    </div>
                    <!-- 企业用户 -->
                    <div  class="h"  @mouseover="currentid=index" @mouseout="currentid=-1" @click="_setDefualtAdress(item.enterShippingId)" v-else>
                        <p class="name hide-row">{{item.enterReceiverName}}</p>
                        <p class="mobile">{{item.enterReceiverTelephone}}</p>
                        <p class="cascading hide-row">{{item.enterReceiverProvince + item.enterReceiverCity + item.enterReceiverDistrict}}</p>
                        <p class="detail hide-row">{{item.enterReceiverAddress}}</p>
                        <transition name="slide-fade">
                            <p style="text-align:center; margin-top:20px" v-show="index==currentid">
                                <Button type="info" style="margin:0 10px" size="small" @click.stop.prevent="mod(item)">修改</Button>
                                <Button type="error" style="margin:0 10px" size="small" @click.stop.prevent="delConfirm(item.enterShippingId)">删除</Button>
                            </p>
                        </transition>
                        <Icon  v-show="item.enterStatus" type="checkmark" :class="item.enterStatus?'okicon':''"></Icon>
                    </div>
                </Card>
                <Card  class="card">
                    <div  class="h" style="text-align:center;padding-top:40px" @click="add">
                        <Icon type="plus"></Icon>
                        <p>使用新地址</p>
                    </div>
                </Card>
            </div>
        </div>
        <!-- 订单列表 -->
        <div class="gray-box">
			<div class="title">
				<h2>购物清单</h2>
			</div>
			<div class="box-inner">
				<div>
					<div class="cart-table-title">
						<span class="name">商品信息</span>
						<span class="subtotal">小计</span>
						<span class="num">数量</span>
						<span class="price">单价</span>
					</div>
					<div class="cart-table">
						<div class="item-list have-margin">
							<div class="cart-group pr">
								<div class="divide">
                                    <div  class="cart-items" v-if="$route.params.opearation=='purchnow'">
                                        <div>
                                            <div  class="clearfix">
                                                <div class="checkbox-container">
                                                </div>
                                                <div class="items-thumb">
                                                    <img :src="cartList.productMainImage" alt="" />
                                                </div>
                                                <div class="name">
                                                    <p class="product-name">{{cartList.name}} {{cartList.modelName?"("+cartList.modelName+")":""}}</p>
                                                    <p class="classsify">{{cartList.productSubtitle?cartList.productSubtitle:''}}</p>
                                                </div>
                                                <div class="unit-price">￥{{cartList.price}}</div>
                                                <div class="num">
                                                    <span>{{cartList.count}}</span>
                                                </div>
                                                <div class="subtotal">￥{{(cartList.count * cartList.price).toFixed(2)}}</div>
                                            </div>
                                        </div>
                                    </div>
									<div class="cart-items" v-for="(item,index) in cartList" :key="index" v-else>
                                        <div v-if="!item.productModelVoList">
                                            <div  class="clearfix">
                                                <div class="checkbox-container">
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
                                                    <span>{{item.quantity}}</span>
                                                </div>
                                                <div class="subtotal">￥{{(item.productPrice * item.quantity).toFixed(2)}}</div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div  v-for="(item1,index1) in item.productModelVoList" :key="index1" class="clearfix">
                                                <div class="checkbox-container">
                                                </div>
                                                <div class="items-thumb">
                                                    <img :src="item.productMainImage" alt="" />
                                                </div>
                                                <div class="name">
                                                    <p class="product-name">{{item.productName}}    ({{item1.name}})</p>
                                                    <p class="classsify">{{item.productSubtitle}}</p>
                                                </div>
                                                <div class="unit-price">￥{{item1.price}}</div>
                                                <div class="num">
                                                    <span>{{item1.quantity}}</span>
                                                </div>
                                                <div class="subtotal">￥{{(item1.price * item1.quantity).toFixed(2)}}</div>
                                            </div>
                                        </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div class="cart-bottom-bg fix-bottom">
                <div class="fix-bottom-inner">
                    <Button type="primary" size="large" class="fr" style="margin: 30px 30px 30px 0;" :loading="loadingtj" @click="_creatorder">提交订单</Button>
                    <div class="shipping">
                        <div class="shipping-box">
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

        <!-- 删除弹框 -->
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>删除该地址之后，地址将不可用</p>
                <p>确认删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="_deleteAddress">删除</Button>
            </div>
        </Modal>
        <!-- 增加修改弹框 -->
        <Modal
            v-model="modal1"
            title="增加收货地址"
            width="400"
            @on-ok="ok">
            <div class="formbody">
                <Form :model="address" label-position="right">
                    <FormItem >
                        <Input v-model="address.receiver_name" size="large" placeholder="收货人姓名">></Input>
                    </FormItem>
                    <FormItem >
                        <Input v-model="address.receiver_mobile" size="large" placeholder="手机号">></Input>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="5">
                                <Input v-model="address.receiver_qh" size="large" placeholder="区号"></Input>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="17">
                                <Input v-model="address.receiver_phone" size="large" placeholder="电话"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Cascader :data="cityData" v-model="address.address" placeholder="请选择收货地址" filterable></Cascader>
                    </FormItem>
                    <FormItem >
                        <Input v-model="address.xxdz" size="large" placeholder="详细地址"></Input>
                    </FormItem>
                    <FormItem v-if="userInfo.username">
                        <Input v-model="address.receiver_zip" size="large" placeholder="邮编"></Input>
                    </FormItem>
                    <FormItem v-if="!userInfo.username">
                        <TimePicker type="time" placeholder="最晚下班时间" style="width: 168px"  format="HH点mm分ss秒" :value="address.enterAfterWork" @on-change="selecttime"></TimePicker>
                    </FormItem>
                    <FormItem >
                        <Checkbox v-model="address.mr">设为默认地址</Checkbox>
                    </FormItem>
                </Form>
            </div>
        </Modal>   
        <!-- 未添加地址  -->
        <Modal v-model="modalfag" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center" >
                <p v-html="alertcontent"></p>
            </div>
            <div slot="footer">
                <Button type="warning" size="large" long :loading="modal_loading" @click="modalfag=false">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import citydata from '@/common/city'
import {createOrder,quickCreate} from '@/api/order.js'
import { setStore, getStore, removeStore } from '@/utils/storage.js'
import {getaddressList,addreciveAddress,setDefualtAdress,deleteAddress,updatereciveAddress,updateqyreciveAddress,getqyaddressList,addqyreciveAddress,setqyDefualtAdress,deleteqyAddress} from '@/api/shipping.js'
import { mapMutations } from 'vuex'
export default {
    data () {
        return {
            alertcontent:'',
            modalfag:false,
            addressList:[],
            currentid:-1,
            delItem:'',
            modal2:false,
            modal_loading:false,
            modal1: false,
            cityData:[],
			address: {
				receiver_name: '',
				receiver_mobile: '',
				receiver_qh:'',
				receiver_phone: '',
				address:[],
				xxdz: '',
                receiver_zip:'',
                enterAfterWork:'',
				mr:false,
            },
            loadingtj:false,
            modId:"",
        }
    },
    mounted () {
        this._getaddressList()
        this.cityData = citydata
    },
    computed: {
		userInfo() {
		    return  JSON.parse(this.$store.state.user.userInfo);
		},
		cartList() {
            if(this.$route.params.opearation=="purchnow"){
                if(this.$store.state.goods.purchnowList.name){
                    return this.$store.state.goods.purchnowList
                }else{
                    return JSON.parse(getStore("purchnowproduct"));
                }
            }else{
                return this.$store.state.goods.cartList;
            }
		},
		productionNum () {
			return this.$store.state.goods.productionNum;
		},
		cartTotalPrice () {
            if(this.$route.params.opearation=="purchnow"){
                return this.cartList.price*this.cartList.count;
            }else{
                return this.$store.state.goods.cartTotalPrice;
            }
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
        _getaddressList () {
            if(this.userInfo.username){
                getaddressList().then(res => {
                    this.addressList = res.data.list
                })
            }else{
                getqyaddressList().then(res => {
                    this.addressList = res.data.list
                })
            }
        },
        _setDefualtAdress (id) {
			var params = {
				shippingId:id
            }
            if(this.userInfo.username){
                setDefualtAdress(params).then(res => {
                    if(res.data = '设置默认地址成功'){
                        this._getaddressList()
                        this.$Message.success(res.data)
                    }else{
                        this.$Message.error('设置失败')
                    }
                })
            }else{
                setqyDefualtAdress(params).then(res => {
                    if(res.data == '设置默认地址成功'){
                        this._getaddressList()
                        this.$Message.success(res.data)
                    }else{
                        this.$Message.error('设置失败')
                    }
                })
            }
        },
        delConfirm (id) {
			this.delItem = id
			this.modal2 = true
		},
		_deleteAddress () {
			var params = {
				shippingId:this.delItem
			}
            this.modal_loading = true;
            if(this.userInfo.username){
                deleteAddress(params).then(res => {
                    setTimeout(() => {
                        this.modal2 = false
                        if(res.data = '删除地址成功'){
                            this.modal_loading = false;
                            this.$Message.success(res.data)
                            this._getaddressList()
                        }else{
                            this.$Message.error('删除失败')
                        }
                    }, 1000);
                })
            }else{
                deleteqyAddress(params).then(res => {
                    setTimeout(() => {
                        this.modal2 = false
                        if(res.data = '删除地址成功'){
                            this.modal_loading = false;
                            this.$Message.success(res.data)
                            this._getaddressList()
                        }else{
                            this.$Message.error('删除失败')
                        }
                    }, 1000);
                })
            }
        },
        mod (item) {
            this.modId = item.id||item.enterShippingId
			this.modal1 = true
			this.fag = 'mod'
			this.title = '修改收货地址'
            var ad = []
            if(this.userInfo.username){
                ad.push(item.receiverProvince)
                ad.push(item.receiverCity)
                ad.push(item.receiverDistrict)
                var phone = item.receiverPhone.split('-')
                this.address= {
                    receiver_name: item.receiverName,
                    receiver_mobile: item.receiverMobile,
                    receiver_qh:phone[0],
                    receiver_phone: phone[1],
                    address:ad,
                    xxdz: item.receiverAddress,
                    receiver_zip:item.receiverZip,
                    mr:item.status,
                }
            }else{
                ad.push(item.enterReceiverProvince)
                ad.push(item.enterReceiverCity)
                ad.push(item.enterReceiverDistrict)
                console.log(ad)
                var phone = item.enterReceiverPhone.split('-')
                this.address= {
                    receiver_name: item.enterReceiverName,
                    receiver_mobile: item.enterReceiverTelephone,
                    receiver_qh:phone[0],
                    receiver_phone: phone[1],
                    address:ad,
                    xxdz: item.enterReceiverAddress,
                    enterAfterWork:item.enterAfterWork,
                    mr:item.enterStatus,
                }
            }
			console.log(this.address)
		},
		add () {
			this.modal1 = true
			this.fag = 'add'
			this.title = '增加收货地址'
			this.address= {
				receiver_name: '',
				receiver_mobile: '',
				receiver_qh:'',
				receiver_phone: '',
				address:[],
				xxdz: '',
				receiver_zip:'',
				mr:false,
			}
		},
		ok () {
            if(this.userInfo.username){
                if(this.fag == 'add'){
                    var params = {
                        userId:this.userInfo.id,
                        receiverName : this.address.receiver_name,
                        receiverMobile : this.address.receiver_mobile,
                        receiverPhone : this.address.receiver_qh + '-' + this.address.receiver_phone,
                        receiverProvince : this.address.address[0],
                        receiverCity : this.address.address[1],
                        receiverDistrict : this.address.address[2]?this.address.address[2]:'',
                        receiverAddress : this.address.xxdz,
                        receiverZip : this.address.receiver_zip,
                        status1:this.address.mr
                    }
                    console.log(params)
                    addreciveAddress(params).then(res => {
                        if(res.msg == '新建地址成功'){
                            this.$Message.success(res.msg );
                            this._getaddressList()
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                }else{
                    var params = {
                        id:this.modId,
                        receiverName : this.address.receiver_name,
                        receiverMobile : this.address.receiver_mobile,
                        receiverPhone : this.address.receiver_qh + '-' + this.address.receiver_phone,
                        receiverProvince : this.address.address[0],
                        receiverCity : this.address.address[1],
                        receiverDistrict : this.address.address[2]?this.address.address[2]:'',
                        receiverAddress : this.address.xxdz,
                        receiverZip : this.address.receiver_zip,
                        status1:this.address.mr
                    }
                    updatereciveAddress(params).then(res => {
                        if(res.data == '更新地址成功'){
                            this.$Message.success(res.data );
                            this._getaddressList()
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                }
            }else{
                if(this.fag == 'add'){
                    var params = {
                        enterReceiverName : this.address.receiver_name,
                        enterReceiverTelephone : this.address.receiver_mobile,
                        enterReceiverPhone : this.address.receiver_qh + '-' + this.address.receiver_phone,
                        enterReceiverProvince : this.address.address[0],
                        enterReceiverCity : this.address.address[1],
                        enterReceiverDistrict : this.address.address[2]?this.address.address[2]:'',
                        enterReceiverAddress : this.address.xxdz,
                        enterAfterWork:this.address.enterAfterWork,
                        status1:this.address.mr
                    }
                    addqyreciveAddress(params).then(res => {
                        if(res.msg == '新建地址成功'){
                            this.$Message.success(res.msg );
                            this._getaddressList()
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                }else{
                    var params = {
                        enterShippingId:this.modId,
                        enterReceiverName : this.address.receiver_name,
                        enterReceiverTelephone : this.address.receiver_mobile,
                        enterReceiverPhone : this.address.receiver_qh + '-' + this.address.receiver_phone,
                        enterReceiverProvince : this.address.address[0],
                        enterReceiverCity : this.address.address[1],
                        enterReceiverDistrict : this.address.address[2]?this.address.address[2]:'',
                        enterReceiverAddress : this.address.xxdz,
                        enterAfterWork:this.address.enterAfterWork,
                        status1:this.address.mr
                    }
                    updateqyreciveAddress(params).then(res => {
                        if(res.data == '更新地址成功'){
                            this.$Message.success(res.data );
                            this._getaddressList()
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                }
            }
		},
		cancel () {
        },
        _creatorder_now(){
            var params = this.cartList
            quickCreate
        },
        _creatorder () {
            let shippingId = ''
            if(this.addressList.length){
                for (let obj of this.addressList ){
                    if(this.userInfo.username){
                        if(obj.status){
                            shippingId = obj.id
                        }
                    }else{
                        if(obj.enterStatus){
                            shippingId = obj.enterShippingId
                        }
                    }
                }
                if(shippingId){
                    this.loadingtj = true
                    var params = {}
                    if(this.$route.params.opearation=="cart"){
                        params = {
                            shippingId:shippingId
                        }
                        createOrder(params).then(res => {
                            if(res.status == 0){
                                setTimeout(() => {
                                    this.loadingtj = false
                                    this.$Modal.success({
                                        title: "提示",
                                        content: '<p>订单创建成功，即将进入支付页面</p>',
                                    });
                                    setTimeout(() => {
                                        this.$Modal.remove()
                                        this.$router.push({
                                            path: `/payment/${res.data.orderNo}`
                                        })
                                    }, 1000);
                                },1000)
                            }
                            else{
                                this.$Message.info(res.msg);
                            }
                        })
                    }else{
                        params = this.cartList
                        params.shippingId = shippingId
                        quickCreate(params).then(res => {
                            if(res.status == 0){
                                setTimeout(() => {
                                    this.loadingtj = false
                                    this.$Modal.success({
                                        title: "提示",
                                        content: '<p>订单创建成功，即将进入支付页面</p>',
                                    });
                                    setTimeout(() => {
                                        this.$Modal.remove()
                                        this.$router.push({
                                            path: `/payment/${res.data.orderNo}`
                                        })
                                    }, 1000);
                                },1000)
                            }
                            else{
                                this.$Message.info(res.msg);
                            }
                        })
                    }
                }else{
                    this.modalfag = true
                    this.alertcontent = '请先选择默认地址'
                }
            }else{
                this.modalfag = true
                this.alertcontent = '您当前尚未填写收货地址<br>请添加收货地址后重新提交订单'
            }


        },
         selecttime(date,type){
            this.address.enterAfterWork = date
        }
    }

}
</script>
<style scoped>
.page-cart {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
    padding-top: 30px;
}
.address-box {
    overflow: visible;
}
.gray-box {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
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
.address-box .box-inner {
    position: relative;
    padding: 30px 30px 0;
}
.h{
    height: 140px;
}
.h .name {
    width: 100%;
    height: 16px;
    padding-right: 20px;
    line-height: 16px;
    font-size: 16px;
    color: #666;
    font-weight: 500;
}
.hide-row {
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.h .mobile {
    padding-top: 17px;
    line-height: 14px;
    color: #999;
}
.h .cascading {
    padding-top: 6px;
    line-height: 24px;
    color: #999;
}
.h .detail {
    line-height: 24px;
    color: #999;
}
.h p{
    font-weight: 500;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(10px);
  opacity: 0;
}
.card {
    position: relative;
    width:268px;
    margin: 0 10px 20px; 
    float:left;
    cursor: pointer;
}
.okicon{
    position: absolute;
    top: 20px;
    right: 20px;
    color: #5788e6;
}
.border-card{
    border-color: #5788e6
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
.cart-items>div>div>div {
    height: 140px;
    float: left;
}
.cart-items .name{
	padding: 50px 0;
	margin-left: 30px;
    width: 623px;
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
    font-size: 15px;
    font-weight: 500;
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
</style>
