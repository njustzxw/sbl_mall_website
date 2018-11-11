<template>
    <div class="clearfix">
        <div class="lb"></div>
        <div class="aside left-menu-wrapper fl" v-if="show1">
            <img src="../../../static/images/avatar.png" alt="" />
            <h5>{{userInfo.username}}</h5>
            <ul class="left-menu-nav">
                <li v-for="(item,index) in list" :key="index" @click="select(item)">
                    <span :class="item.name==servicename?'active':''">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="page-for-order common-box contentright fl">
            <div>
                <!-- {{orderDatail}} -->
                <section class="headline">
                    <h2>
                        <span>订单号：{{orderNo}}</span>
                        <Button v-if="orderDatail.status==3" type="success" @click="confirm(orderNo)">确认收货</Button>
                    </h2>
                </section>
                <section class="content1">
                    <div class="orderstatus">
                        <!-- 订单取消 -->
                        <Steps :current="1" status="error" v-if="orderDatail.status==-2">
                            <Step title="下单" :content="orderDatail.createTime"></Step>
                            <Step title="已取消" :content="orderDatail.paymentTime"></Step>
                        </Steps>
                        <!-- 正在审核 -->
                        <Steps :current="1" v-if="orderDatail.status==0">
                            <Step title="下单" :content="orderDatail.createTime"></Step>
                            <Step title="正在审核" :content="orderDatail.createTime"></Step>
                            <Step title="发货" :content="orderDatail.createTime"></Step>
                            <Step title="送达" :content="orderDatail.createTime"></Step>
                        </Steps>
                        <!-- 审核不通过 -->
                        <Steps :current="1" status="error" v-if="orderDatail.status==1">
                            <Step title="下单" :content="orderDatail.createTime"></Step>
                            <Step title="审核不通过" :content="orderDatail.createTime"></Step>
                            <Step title="发货" :content="orderDatail.createTime"></Step>
                            <Step title="送达" :content="orderDatail.createTime"></Step>
                        </Steps>
                        <!-- 审核通过 -->
                        <Steps :current="1" v-if="orderDatail.status==2">
                            <Step title="下单" :content="orderDatail.createTime"></Step>
                            <Step title="审核通过" :content="orderDatail.createTime"></Step>
                            <Step title="发货" :content="orderDatail.paymentTime"></Step>
                            <Step title="送达" :content="orderDatail.sendTime"></Step>
                        </Steps>
                        <!-- 已发货 -->
                        <Steps :current="2" v-if="orderDatail.status==3">
                            <Step title="下单" :content="orderDatail.createTime"></Step>
                            <Step title="审核通过" :content="orderDatail.createTime"></Step>
                            <Step title="发货" :content="orderDatail.paymentTime"></Step>
                            <Step title="送达" :content="orderDatail.sendTime"></Step>
                        </Steps>
                        <!-- 送达 -->
                        <Steps :current="4" v-if="orderDatail.status==4">
                            <Step title="下单" :content="orderDatail.createTime"></Step>
                            <Step title="正在审核" :content="orderDatail.createTime"></Step>
                            <Step title="审核通过" :content="orderDatail.createTime"></Step>
                            <Step title="发货" :content="orderDatail.paymentTime"></Step>
                            <Step title="送达" :content="orderDatail.sendTime"></Step>
                        </Steps>
                    </div>
                    <div v-if="orderDatail.status==3||orderDatail.status==4" style="padding: 10px 60px;" >
                        <div class="clearfix">
                            <div class="ic-title fl"></div>
                            <div class="font-title fl">物流信息</div>
                        </div>
                        <!-- 自家配送 -->
                        <div v-if="orderDatail.expressType==1">
                            <div class="ordercompany">物流公司 :南京思贝丽配送</div>
                            <div class="ordernum">配送电话 :{{orderDatail.expressNub}}</div>
                        </div>
                        <!-- 百世快递 -->
                        <div v-if="orderDatail.expressType==2">
                            <div style="margin-top: 20px;">
                                <Steps :current="logisticList.length-1" direction="vertical" v-if="logisticList.length">
                                    <Step  v-for="(item,index) in logisticList" :key="index"  :title="item.detail" :content="item.time"></Step>
                                </Steps>
                                <div class="clearfix" v-else>
                                    <div class="fl" style="font-size:16px;line-height: 32px;">当前物流信息不稳定 请刷新</div>
                                    <Button type="info" class="fl" style="margin-left:20px;" @click="getlogistic">刷新</Button>
                                </div>
                            </div>
                        </div>
                        <!-- 壹米滴答 -->
                        <div v-if="orderDatail.expressType==3">
                            <div class="ordernum">订单号 :{{orderDatail.expressNub}}</div>
                            <div class="ordercompany">物流公司 :{{orderDatail.expressTypeDesc}}</div>
                        </div>
                    </div>
                    <!-- 取消订单 -->
                    <!-- 根据状态不同来切换状态框 -->
                    <div class="order-status-now" v-if="orderDatail.status==-1">
                        <ul class="order-title clearfix">
                            <li class="fl">
                                <h3>订单状态：{{orderDatail.statusDesc}}</h3>
                            </li>
                            <li class="fr">
                                <Button type="info" @click="gopay">去支付</Button>
                                <Button @click="cancleorder">取消订单</Button>
                            </li>
                        </ul>
                        <p>您的订单即将关闭，请及时提交审核</p>
                    </div>
                    <div class="order-status-now" v-if="orderDatail.statusDesc=='已取消'">
                        <ul class="order-title clearfix">
                            <li class="fl">
                                <h3>订单状态：{{orderDatail.statusDesc}}</h3>
                            </li>
                        </ul>
                        <p>您的订单已取消，如有需要请重新下单</p>
                    </div>
                    <!-- 商品列表 -->
                    <div class="box-goods-section fn-clear pr">
                        <div class="gray-top-info">
                            <span class="date">商品名称</span>
                            <span class="goods-num">数量</span>
                            <span class="price">单价</span>
                            <span class="totalprice">小计</span>
                        </div>
                        <div class="order-cart-info pr">
                            <div class="goods-list">
                                <div class="goods-list-item clearfix" v-for="(item1,index1) in orderDatail.orderItemVoList" :key="index1">
                                    <div class="items-thumb">
                                        <img :src=" item1.productImage" alt="">
                                    </div>
                                    <div class="items-title">
                                        <div class="name vh-center">
                                            <span>{{item1.productName}}</span>
                                        </div>
                                        <div class="desc"></div>
                                    </div>
                                    <div class="goods-num">{{item1.quantity}}</div>
                                    <div class="price">¥{{item1.currentUnitPrice}}</div>
                                    <div class="totalprice">¥{{(item1.currentUnitPrice * item1.quantity).toFixed(2)}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-goods-section fn-clear pr">
                        <div class="gray-top-info">
                            <span class="date">收货信息</span>
                        </div>
                        <div class="inner-box-info" v-if="orderDatail.shippingVo">
                            <p>姓名：{{orderDatail.shippingVo.receiverName}}</p>
                            <p>手机：{{orderDatail.shippingVo.receiverMobile}}</p>
                            <p>座机：{{orderDatail.shippingVo.receiverPhone}}</p>
                            <p>详细地址：{{orderDatail.shippingVo.receiverProvince+orderDatail.shippingVo.receiverCity+orderDatail.shippingVo.receiverDistrict+orderDatail.shippingVo.receiverAddress}}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Address from "../user/Address.vue";
import Userinfomation from "../user/Userinfomation.vue";
import Myorder from "../user/Myorder.vue";
import {
  getOrderDetail,
  cancleOrder,
  getLogisticInfo,
  confirmRecive
} from "@/api/order.js";
export default {
  name: "orderDetail",
  components: {
    Address,
    Userinfomation,
    Myorder
  },
  data() {
    return {
      show1: true,
      list: [
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
      orderDatail: {},
      orderNo: "",
      logisticList: []
    };
  },
  computed: {
    servicename() {
      return this.$store.state.app.servicename;
    },
    userInfo() {
      return JSON.parse(this.$store.state.user.userInfo);
    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$route.params.orderNo)
      this.orderNo = this.$route.params.orderNo;
      this._getorderdetail();
    });
  },
  methods: {
    select(item) {
      this.$store.commit("servicename", item.name);
      this.$router.push({
        path: item.url
      });
    },
    _getorderdetail() {
      var params = {
        orderNo: this.orderNo
      };
      getOrderDetail(params).then(res => {
        console.log(res);
        this.orderDatail = res.data;
        if (res.data.status == 3) {
          this.expressNub = res.data.expressNub;
          this.getlogistic();
        }
      });
    },
    //获取物流信息的
    getlogistic() {
      var params = {
        code: this.expressNub
      };
      getLogisticInfo(params).then(res => {
        this.logisticList = res.reverse();
      });
    },
    cancleorder() {
      var params = {
        orderNo: this.orderNo
      };
      cancleOrder(params).then(res => {
        if (res.status == 0) {
          this.$Message.success("取消成功");
          this._getorderdetail();
        }
      });
    },
    pay() {
      this.$router.push({
        path: `/payment/${this.orderNo}`
      });
    },
    gopay(orderid) {
      this.$router.push({
        path: `/payment/${orderid}`
      });
    },
    confirm(orderid) {
      var params = {
        orderNo: orderid
      };
      confirmRecive(params).then(res => {
        if (res.status == 0) {
          this.$Message.success("确认收货成功！");
          this._getorderdetail();
        } else {
          this.$Message.error("收货失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.aside {
  width: 230px;
}
.headline h2 button {
  float: right;
  margin-top: 13px;
}
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #2d8cf0;
  background: #fff;
}

.contentright {
  background: #fff;
  margin-left: 40px;
  min-height: 440px;
}

.left-menu-wrapper {
  padding-top: 20px;
  margin: 0;
  border-radius: 10px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  background: #fff;
  overflow: hidden;
}

.left-menu-wrapper img {
  width: 168px;
  height: 168px;
}

.left-menu-wrapper h5 {
  font-size: 18px;
  line-height: 48px;
  font-weight: 700;
}

.left-menu-nav li {
  position: relative;
  height: 48px;
  border-top: 1px solid #ebebeb;
  line-height: 48px;
}

.left-menu-nav li span {
  display: block;
  height: 48px;
  padding: 0 30px;
  color: #666;
  transition: none;
  cursor: pointer;
}

.left-menu-nav li span:hover,
.left-menu-nav li .active {
  position: relative;
  top: -1px;
  z-index: 1;
  height: 50px;
  background-color: #98afee;
  line-height: 50px;
  color: #fff;
}

.common-box {
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  min-height: 600px;
  width: 950px;
}

.headline {
  position: relative;
  height: 60px;
  padding: 0 10px 0 28px;
  background: #f5f5f5;
  background: linear-gradient(#fff, #f5f5f5);
  border-bottom: 1px solid #dcdcdc;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
  line-height: 60px;
  color: #646464;
  z-index: 5;
}

.headline h2 {
  font-size: 18px;
  font-weight: 500;
  color: #626262;
}

.headline h2 span {
  float: left;
}

.orderstatus {
  margin: 50px 50px;
  width: 900px;
}

.order-status-now {
  background: #f6f6f6;
  border: 1px solid #dadada;
  border-radius: 5px;
  padding: 22px 30px 20px;
  margin: 0 30px;
  line-height: 38px;
  margin-bottom: 30px;
}

ul .order-title {
  padding: 0;
}

ul.order-title h3 {
  font-size: 18px;
  color: #666;
}

.order-status-now p {
  border-top: 1px solid #dcdcdc;
  margin-top: 20px;
  padding-top: 26px;
  line-height: 1.6em;
  padding-bottom: 12px;
}

.order-status-now > :last-child {
  padding-bottom: 0;
}

.box-goods-section {
  clear: both;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Sans GB,
    Microsoft Yahei, STHeiti, sans-serif;
}

.box-goods-section:first-child .gray-top-info {
  border-top: 0;
}

.box-goods-section .gray-top-info {
  height: 38px;
  padding: 0 24px;
  background: #eee;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  line-height: 38px;
  font-size: 12px;
  color: #666;
}

.box-goods-section .gray-top-info .date {
  width: 650px;
  text-align: left;
  padding-left: 6px;
}

.gray-top-info span {
  float: left;
}

.box-goods-section .gray-top-info .view-detail {
  width: 82px;
  text-align: center;
  padding-left: 24px;
}

.box-goods-section .gray-top-info .total {
  width: 102px;
  text-align: right;
  padding-right: 18px;
  border-left: 1px solid #dbdbdb;
}

.box-goods-section .gray-top-info .operation {
  width: 95px;
  height: 38px;
  padding-right: 23px;
  text-align: center;
}

.box-goods-section .gray-top-info .goods-num {
  width: 80px;
  text-align: center;
}

.box-goods-section .gray-top-info .price {
  width: 80px;
  text-align: center;
}

.box-goods-section .gray-top-info .totalprice {
  width: 80px;
  text-align: center;
}

.box-goods-section .gray-top-info .order-id {
  width: 400px;
}

.goods-list .goods-list-item .items-thumb img {
  width: 78px;
  height: 78px;
  bottom: 0;
}

.goods-list-item .items-thumb {
  position: absolute;
  left: 30px;
  top: 15px;
  width: 78px;
  height: 78px;
  border-radius: 3px;
}

.goods-list-item .items-thumb img {
  border: 1px solid #ebebeb;
}

.goods-list .goods-list-item .items-title {
  float: left;
  height: 80px;
  padding: 15px 0;
  margin-left: 29px;
  border-bottom: none;
  line-height: 40px;
}

.goods-list .goods-list-item .items-title .name {
  float: none;
  color: #666;
  width: 540px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.items-title .name span {
  color: #666;
}

.goods-list-item .items-title .desc {
  font-size: 12px;
  /* color: #999; */
}

.goods-list .goods-list-item .operation {
  display: table;
  width: 95px;
  height: 80px;
  float: right;
  padding-right: 23px;
  line-height: 25px;
  text-align: center;
}

.goods-list-item .goods-num {
  width: 80px;
  float: left;
  line-height: 80px;
  text-align: center;
  color: #626262;
}

.goods-list-item .price {
  width: 85px;
  float: left;
  line-height: 80px;
  text-align: center;
  font-weight: 700;
}

.goods-list .goods-list-item .totalprice {
  width: 85px;
  float: left;
  line-height: 80px;
  text-align: center;
  font-weight: 700;
}

.goods-list-item {
  position: relative;
  height: 110px;
  padding: 15px 0 15px 111px;
  font-size: 15px;
  font-weight: 600;
  border-right: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
}

.goods-list .goods-list-item:nth-last-child(1) {
  border-bottom: none;
}

.view-detail,
.ddh {
  color: #5788e6;
  cursor: pointer;
}

.view-detail:hover,
.ddh:hover {
  opacity: 0.8;
}

.payright {
  width: 180px;
  top: 74px;
  left: 765px;
}

.payright .total {
  padding-right: 18px;
  line-height: 14px;
  text-align: right;
  vertical-align: middle;
  font-weight: 700;
  font-size: 16px;
  color: #ff6700;
  width: 100px;
  display: inline-block;
  text-align: center;
}

.inner-box-info {
  padding: 20px 30px;
  line-height: 38px;
  word-wrap: break-word;
  word-spacing: normal;
  word-break: break-all;
}

.inner-box-info p {
  font-weight: 500;
  font-size: 14px;
}

.ic-title {
  width: 8px;
  height: 30px;
  background: #ffa501;
}

.font-title {
  font-size: 18px;
  line-height: 28px;
  padding-left: 20px;
}
.ordernum {
  margin: 30px 20px;
  font-size: 15px;
}
.ordercompany {
  font-size: 15px;
  margin: 30px 20px;
}
</style>
