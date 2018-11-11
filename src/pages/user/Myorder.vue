<template>
<div>
    <!-- {{orderList}} -->
    <section class="headline">
        <h2>
            <span>{{headtitle}}</span>
			<div class="download pr">
				<Icon type="ios-cloud-download-outline" title="下载订下载订单" size="25" @click="showdownloadFag=true" v-show="orderList.length"></Icon>
			</div>
        </h2>
    </section>
    <section class="content" v-if="orderList.length">
         <Table :columns="columns1" :data="data1" ref="table" style="display:none"></Table>
        <div class="box-goods-section fn-clear pr" v-for="(item,index) in orderList" :key="index">
            <div class="gray-top-info">
                <span class="date">{{item.createTime}}</span>
                <span class="order-id">订单号： <i class="ddh" @click="lookdetail(item.orderNo)">{{item.orderNo}}</i><b class="zffs">({{item.paymentTypeDesc}})</b></span>
                <span class="goods-num">数量</span>
                <span class="price">单价</span>
                <span class="operate">商品操作</span>
                <span class="total">应付总额</span>
                <span class="prostatus">订单状态</span>
                <span class="view-detail" @click="lookdetail(item.orderNo)">查看详情</span>
            </div>
            <div class="order-cart-info pr clearfix">
                <div class="goods-list clearfix fl" >
                    <div class="goods-list-item clearfix fl" v-for="(item1,index1) in item.orderItemVoList" :key="index1" style="cursor: pointer;" @click="goto1(item1.productId)">
                        <div class="items-thumb">
                            <img :src=" item1.productImage" alt="">
                        </div>
                        <div class="items-title">
                            <div class="name vh-center">
                                <span>{{item1.productName}} {{item1.modelName?'('+item1.modelName+')':''}}</span>
                            </div>
                            <div class="desc"></div>
                        </div>
                        <div class="goods-num">{{item1.quantity}}</div>
                        <div class="price">¥{{item1.currentUnitPrice}}</div>
                        <div class="operate">
                            <div v-if="item.status==4" @click.prevent.stop="refund(item1)">申请售后</div>
                            <div v-if="item.status==2||item.status==3||item.status==5||item.status==7" @click.prevent.stop="refund(item1)">退款/退货</div>
                        </div>
                    </div>
                </div>
                <div class=" fl payright" :style="{height: item.orderItemVoList.length*100 + 'px' }">
                    <div class="total">¥{{item.payment}}</div>
                </div>
                <div class=" fl payright" :style="{height: item.orderItemVoList.length*100 + 'px' }">
                    <div class="orderstatus">
                        <div>{{item.statusDesc}}</div>
                        <div @click="lookdetail(item.orderNo)">订单详情</div>
                    </div>
                </div>
                <div class=" fl payright" style="border:none">
                    <!-- 订单未处理 -->
                    <div class="orderop" v-if="item.status==-4">  
                        <Button type="info" class="opationbtn" @click="gopay(item.orderNo)">去支付</Button>
                        <div @click="delconfirm(item.orderNo)">删除</div>
                    </div>
                    <!-- 订单取消 -->
                    <div class="orderop" v-if="item.status==-2">  
                        <div @click="delconfirm(item.orderNo)">删除</div>
                    </div>
                    <!-- 审核不通过 -->
                    <div class="orderop" v-if="item.status==1">  
                        <div @click="confirm(item.orderNo)">
                            <Button type="warning" v-if="item.status==1" @click="redit(item)" class="opationbtn" :loading="loading1&&(currentitem.orderNo==item.orderNo)">重新编辑</Button>
                        </div>
                    </div>
                    <!-- 待收货 -->
                    <div class="orderop" v-if="item.status==3">  
                        <div @click="confirm(item.orderNo)">确认收货</div>
                    </div>
                    <!-- 已完成 -->
                    <div class="orderop" v-if="item.status==4">  
                        <div  v-for="(item2,index3) in item.orderItemVoList" :key="index3" style="height:100px;width: 108px;" class="pj">
                            <Button class="opationbtn" @click="gocomment(item2)">评价</Button>
                        </div>
                    </div>
                    <!-- 待收货 -->
                    <div class="orderop" v-if="item.status==6">  
                        <Button type="info" class="opationbtn" @click="gopay(item.orderNo)">去支付</Button>
                    </div>
                    <!-- 已评价 -->
                    <div class="orderop" v-if="item.status==9">  
						<div  v-for="(item3,index4) in item.orderItemVoList" :key="index4" style="height:100px;width: 108px;" class="pj">
							<Poptip title="追加评价" content="content" placement="bottom-end" width="300">
								<Button class="opationbtn">追加评价</Button>
								<div class="api" slot="content">
									<div>
										<Input v-model="moretext" type="textarea" :rows="4" placeholder="请输入评价" style="width:250px;"></Input>
									</div>
									<Button type="primary"  @click="_moreevaluate(item3)" style="margin:10px 10px 0  0 ;float:right">提交</Button>
								</div>
							</Poptip>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="content" style="width: 100%;" v-else>
        <div class=""  style="text-align: center;">
            <img src="../../../static/images/cart.png" alt="" style="width: 100px;margin-top: 130px;"/>
            <p class="nonedata">暂无订单 赶紧去购物吧～</p>
        </div>
    </section>
    <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>确认删除此订单？</span>
        </p>
        <div style="text-align:center">
            <p>此订单删除后将不可恢复</p>
            <p>是否继续删除?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading"  @click="_delorder">删除</Button>
        </div>
    </Modal>
    <Modal v-model="showdownloadFag" title="订单下载" @on-ok="_download" width="360">
        <RadioGroup v-model="datetype">
            <Radio label="year">按年选择</Radio>
            <Radio label="month">按月选择</Radio>
            <Radio label="sjd">按时间段</Radio>
        </RadioGroup>
        <div v-if="datetype=='year'" style="margin:20px 0 0 10px">
             <DatePicker type="year" placeholder="选择年" style="width: 200px" @on-change="timechange1"></DatePicker>
        </div>
        <div v-if="datetype=='month'" style="margin:20px 0 0 10px">
            <DatePicker type="month" placeholder="选择月" style="width: 200px" @on-change="timechange2"></DatePicker>
        </div>
        <div v-if="datetype=='sjd'" style="margin:20px 0 0 10px">
             <DatePicker type="daterange" split-panels placeholder="选择日期" style="width: 200px" @on-change="timechange3"></DatePicker>
        </div>
    </Modal>
</div>
</template>
<script>
import {
  getOrderList,
  delOrder,
  confirmRecive,
  moreevalute,
  downloadOrder
} from "@/api/order.js";
import { getevalution } from "@/api/goods";
export default {
  name: "Myorder",
  props: ["headtitle"],
  data() {
    return {
      moretext: "",
      orderList: [],
      modal2: false,
      modal_loading: false,
      loading1: false,
      currentitem: {},
      showdownloadFag: false,
      datetype: "year",
      year: "",
      month: "",
      startTime: "",
      endTime: "",
      data1: [],
      columns1: [
        {
          title: "订单号",
          key: "orderNo"
        },
        {
          title: "订单创建时间",
          key: "createTime"
        },
        {
          title: "产品名称",
          key: "productName"
        },
        {
          title: "快递方式",
          key: "expressType"
        },
        {
          title: "快递单号",
          key: "expressNub"
        },
        {
          title: "付款方式",
          key: "paymentTypeDesc"
        },
        {
          title: "单价",
          key: "currentUnitPrice"
        },
        {
          title: "数量",
          key: "quantity"
        },
        {
          title: "付款总额",
          key: "totalPrice"
        }
      ]
    };
  },
  mounted() {
    this._getorderlist();
  },
  computed: {
    userInfo() {
      return JSON.parse(this.$store.state.user.userInfo);
    }
  },
  methods: {
    _getorderlist() {
      getOrderList().then(res => {
        this.orderList = res.data.list;
      });
    },
    lookdetail(orderid) {
      const { href } = this.$router.resolve({
        path: `/orderDetail/${orderid}`
      });
      window.open(href, "_blank");
    },
    pay(orderid) {
      this.$router.push({ path: `/payment/${orderid}` });
    },
    gopay(orderid) {
      this.$router.push({
        path: `/payment/${orderid}`
      });
    },
    goto1(id) {
      const { href } = this.$router.resolve({
        path: `/describe/${id}`
      });
      window.open(href, "_blank");
    },

    delconfirm(orderid) {
      this.currentorder = orderid;
      this.modal2 = true;
    },
    _delorder() {
      var params = {
        orderNo: this.currentorder
      };

      this.modal_loading = true;
      delOrder(params).then(res => {
        setTimeout(() => {
          this.modal_loading = false;
          this.modal2 = false;
          if (res.status == 0) {
            this.$Message.success("删除成功");
            this._getorderlist();
          } else {
            this.$Message.error("删除失败");
          }
        }, 1000);
      });
    },
    confirm(orderid) {
      var params = {
        orderNo: orderid
      };
      confirmRecive(params).then(res => {
        if (res.status == 0) {
          this.$Message.success("确认收货成功！");
          this._getorderlist();
        } else {
          this.$Message.error("收货失败");
        }
      });
    },
    redit(order) {
      this.currentitem = order;
      this.loading1 = true;
      this.$store.commit("reditorder", order.orderItemVoList);
      setTimeout(() => {
        this.loading1 = false;
        this.$router.push({ path: "/cart" });
      }, 1000);
    },
    refund(order) {
      this.$store.commit("refund", order);
      const { href } = this.$router.resolve({
        path: `/refund/${order.orderNo}`
      });
      window.open(href, "_blank");
    },
    gocomment(order, index) {
      this.$store.commit("evaluation", order);
      const { href } = this.$router.resolve({
        path: `/evaluation/${order.orderNo}`
      });
      window.open(href, "_blank");
    },
    _moreevaluate(order) {
      getevalution({ productId: order.productId }).then(res => {
        let commentid = "";
        for (let obj of res.data) {
          if (obj.userId == this.userInfo.id) {
            commentid = obj.commentId;
            break;
          }
        }
        if (!this.moretext) {
          var htm = `<div class="alertinfobox clearfix">
							<img src="../../static/images/gantan.png" class="fl">
							<span class="alertinfo fl" style="width:200px;">
								请填写完整信息！ <br/>
							</span>
						</div>`;
          ti_xing(htm);
          setTimeout(function() {
            $("#ti_xing").modal("hide");
          }, 2000);
        } else {
          moreevalute({ commentId: commentid, newContent: this.moretext }).then(
            res => {
              var htm = `<div class="alertinfobox clearfix">
							<img src="../../static/images/${
                res.data == "添加追评成功" ? "success" : "gantan"
              }.png" class="fl">
							<span class="alertinfo fl" style="width:200px;">
								${res.data == "添加追评成功" ? "添加追评成功" : res.msg} <br/>
							</span>
						</div>`;
              ti_xing(htm);
              setTimeout(function() {
                $("#ti_xing").modal("hide");
              }, 2000);
            }
          );
        }
      });
    },
    _download() {
      var that = this;
      var params = {};
      if (this.datetype == "year") {
        params = {
          year: this.year
        };
      } else if (this.datetype == "month") {
        params = {
          year: this.year,
          month: this.month
        };
      } else {
        params = {
          startTime: this.startTime,
          endTime: this.endTime
        };
      }
      downloadOrder(params).then(res => {
        console.log(res.data);
        var orderlist = [];
        for (let obj of res.data) {
          for (let item of obj.orderItemVoList) {
            var json = item;
            json.createTime = obj.createTime;
            json.payment = obj.payment;
            json.paymentTypeDesc = obj.paymentTypeDesc;
            json.expressNub = obj.expressNub;
            json.expressType = obj.expressType;
            orderlist.push(json);
          }
        }
        this.data1 = orderlist;
        console.log(this.data1);
        setTimeout(res => {
          that.exportData();
        }, 1000);
      });
    },
    timechange1(date, type) {
      this.year = date;
    },
    timechange2(date, type) {
      this.year = date.split("-")[0];
      this.month = date.split("-")[1];
    },
    timechange3(date, type) {
      this.startTime = date[0];
      this.endTime = date[1];
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "订单列表详情"
      });
      var htm = `<div class="alertinfobox clearfix">
                    <img src="../../static/images/success.png" class="fl">
                    <span class="alertinfo fl" style="width:200px;">
                        下载数据成功 <br/>
                    </span>
                </div>`;
      ti_xing(htm);
      setTimeout(function() {
        $("#ti_xing").modal("hide");
      }, 2000);
    }
  }
};
</script>
<style scoped>
.content {
  position: relative;
  min-height: 540px;
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
  width: 158px;
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
  width: 101px;
  text-align: center;
  border-left: 1px solid #dbdbdb;
}
.gray-top-info .prostatus {
  width: 101px;
  text-align: center;
}
.box-goods-section .gray-top-info .operation {
  width: 95px;
  height: 38px;
  padding-right: 23px;
  text-align: center;
}
.payright .opationbtn {
  margin-top: 15px;
  display: inline-block;
}
.box-goods-section .gray-top-info .goods-num {
  width: 68px;
  text-align: center;
}
.box-goods-section .gray-top-info .price {
  width: 85px;
  text-align: center;
}
.box-goods-section .gray-top-info .operate {
  width: 83px;
  padding-right: 27px;
  text-align: right;
}
.box-goods-section .gray-top-info .order-id {
  width: 219px;
}
.goods-list {
  width: 638px;
}
.goods-list .goods-list-item .items-thumb img {
  width: 78px;
  height: 78px;
  bottom: 0;
  margin-top: 0;
}
.goods-list-item .items-thumb {
  position: absolute;
  left: 20px;
  top: 10px;
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
  padding: 10px 0;
  margin-left: 10px;
  border-bottom: none;
  line-height: 40px;
}
.goods-list .goods-list-item .items-title .name {
  float: none;
  width: 280px;
  line-height: 25px;
  font-size: 12px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.items-title .name span {
  color: #666;
  font-weight: 400;
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
  width: 68px;
  float: left;
  line-height: 48px;
  text-align: center;
  color: #626262;
}
.goods-list .goods-list-item .price {
  width: 85px;
  float: left;
  line-height: 48px;
  text-align: center;
}
.goods-list .goods-list-item .operate {
  width: 83px;
  float: left;
  line-height: 48px;
  text-align: center;
}
.goods-list-item {
  position: relative;
  height: 100px;
  padding-left: 111px;
  font-size: 12px;
  width: 638px;
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
  line-height: 53px;
  border-right: 1px solid #e3e3e3;
}
.payright > div {
  line-height: 14px;
  text-align: right;
  width: 100px;
  display: inline-block;
  text-align: center;
}
.payright .total {
  color: #ff6700;
}
.payright .orderstatus {
}
.statuscheck {
  display: inline-block;
  color: red;
  padding-left: 15px;
}
.delorder {
  position: absolute;
  top: 30px;
  right: 35px;
  color: #8a8a8a;
  cursor: pointer;
}
.delorder:hover,
.operate:hover {
  color: #ff6700;
  text-decoration: underline;
}
.zffs {
  margin: 0 10px;
  font-weight: 200;
  color: red;
}
.orderop {
  width: 107px;
}
.orderstatus {
  padding-top: 14px;
}
.orderstatus > div,
.orderop > div {
  line-height: 22px;
}
.orderstatus > div:nth-child(2):hover {
  color: #ff6700;
  text-decoration: underline;
  cursor: pointer;
}
.pj:nth-child(n + 2) {
  border-top: 1px solid #e3e3e3;
}
.order-cart-info:last-child {
  border-bottom: 1px solid #e3e3e3;
}
.download {
  width: 60px;
  float: right;
}
.download .ivu-icon {
  cursor: pointer;
}
.download .ivu-icon:hover {
  color: #5788e6;
}
</style>


