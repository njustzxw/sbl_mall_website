<template>
    <div style="padding-top:30px">
        <Card  bordered>
            <p slot="title">支付订单</p>
            <div class="order-info">
                <h3 class="pr">
                    <span class="pa ic100">
                        <i-circle :percent="100" stroke-color="#5cb85c" :size="60">
                            <Icon type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
                        </i-circle>
                    </span>
                    <span>提交订单成功！请选择结算方式</span>    
                </h3>
                <p class="detail">请在24小时内完成支付，我们将在48小时内为您发货</p>
                <div class="payfs">
                    <Tabs type="card">
                        <TabPane label="线上支付">
                                <div style="min-height:300px;">
									<!-- <p>敬请期待！</p> -->
                                    <ul class="common-pay-ul clearfix">
                                        <li class="fl">
                                	        <div class="paybutton" @click="turntopay">
                                                <img src="../../../static/images/alipay.png" alt="" style="width:140px">
                                            </div>
                                        </li>
                                        <li class="fl" style="margin-left:20px;">
                                	        <div class="paybutton" @click="turntoylpay">
                                                <img src="../../../static/images/ylpay.png" alt="" style="width:140px">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                        </TabPane>
                        <TabPane label="线下支付">
                            <div style="min-height:300px;">
                                <!-- <p style="margin-top:100px">线下支付在审核通过后，将采用先发货后付款的方式！请您在要求时间内准时结清！</p> -->
                                <Button type="primary" @click="_submitCheck" style="margin-top:20px;">
                                    <span >提交审核</span>
                                </Button>
								<Button type="success" :loading="loading" @click="pay" style="margin-top:20px;">
                                    <span v-if="!loading">货到付款</span>
									<span v-else>结账中……</span>
                                </Button>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import { getPayOrder, queryPay, payOffLine, submitCheck } from "@/api/order.js";
export default {
  name: "payment",
  data() {
    return {
      orderNo: "",
      ewm: {},
      visible: false,
      loading: false
    };
  },
  mounted() {
    this.orderNo = this.$route.params.orderNo;
  },
  methods: {
    _getpayorder() {
      var params = {
        orderNo: this.orderNo
      };
      getPayOrder(params).then(res => {
        console.log(res);
        this.ewm = res.data;
      });
    },
    close() {
      this.visible = false;
    },
    turntopay() {
      this.$router.push({ path: `/pay/${this.orderNo}` });
    },
    turntoylpay() {
      this.$router.push({ path: `/payyl/${this.orderNo}` });
      //   var params = {
      //     orderNo: this.orderNo
      //   };
      //   unionPay(params).then(res => {
      //     console.log(res.data);
      //   });
    },
    //有问题
    pay() {
      this.loading = true;
      var params = {
        orderNo: this.orderNo
      };
      payOffLine(params).then(res => {
        if (res.data == "线下付款成功") {
          setTimeout(() => {
            this.$router.push({ path: "/success" });
          }, 500);
        } else {
          this.$Message.error("付款失败");
        }
      });
    },
    _querypay() {
      var params = {
        orderNo: this.orderNo
      };
      queryPay(params).then(res => {
        console.log(res);
        this.$router.push({ path: "/success" });
      });
    },
    _submitCheck() {
      var params = {
        orderNo: this.orderNo
      };
      submitCheck(params).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.$Modal.success({
            title: "提示",
            content: "<p>提交审核成功，即将返回订单列表</p>"
          });
          setTimeout(() => {
            this.$Modal.remove();
            this.$store.commit("servicename", "我的订单");
            this.$router.push({
              path: "/user"
            });
          }, 1000);
        } else {
          this.$Message.error("提交审核失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.order-info {
  padding: 60px 0 55px;
  color: #333;
  text-align: center;
}
.order-info h3 {
  padding-bottom: 14px;
  line-height: 36px;
  font-size: 36px;
  color: #ff6700;
}
.ic100 {
  top: -19px;
  left: 250px;
}
.order-info .detail {
  line-height: 24px;
  font-size: 14px;
  color: #999;
}
.payfs {
  margin: 50px;
}
.common-pay-ul {
  margin: 0 28px;
  padding: 8px 0 28px;
}
.paybutton {
  width: 170px;
  border: 1px solid #e3e3e3;
  padding: 10px 20px 5px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
