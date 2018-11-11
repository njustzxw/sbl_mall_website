<template>
    <div class="refund-main">
        <div class="processbar">
            <img src="../../../static/images/liucheng.png" alt="">
        </div>
        <div class="refund-body clearfix">
            <div class="refund-body-left fl">
                <div class="mod-iteminfo clearfix">
                    <div class="form-title fl">退款商品：</div>
                    <div class="mod-iteminfo-inner fl clearfix">
                         <img class="refund-img fl" :src="refundpro.productImage" alt="">
                         <span class="refund-name fl">{{refundpro.productName}}</span>
                    </div>
                </div>
                <div class="mod-iteminfo clearfix">
                    <div class="form-title fl">服务类型：</div>
                    <div class="mod-iteminfo-inner fl clearfix">
                        <RadioGroup v-model="shtype" vertical>
                            <Radio label="1">
                                <span>退货</span>
                            </Radio>
                            <Radio label="2">
                                <span>退款</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div class="mod-iteminfo clearfix">
                    <div class="form-title fl">退款金额：</div>
                    <div class="mod-iteminfo-inner fl clearfix">
                         <Input class="fl" v-model="refundpro.totalPrice" disabled></Input>
                    </div>
                </div>
                 <div class="mod-iteminfo clearfix">
                    <div class="form-title fl">退款原因：</div>
                    <div class="mod-iteminfo-inner fl clearfix">
                         <Select v-model="shreason" style="width:200px">
                            <Option v-for="item in reasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="mod-iteminfo clearfix">
                    <div class="form-title fl">退款说明：</div>
                    <div class="mod-iteminfo-inner fl clearfix">
                         <Input v-model="shdescribe" type="textarea" :rows="4" placeholder="退款说明" style="width:350px;"></Input>
                    </div>
                </div>
                <div class="mod-iteminfo clearfix">
                    <div class="form-title fl"></div>
                    <div class="mod-iteminfo-inner fl clearfix">
                        <Button  style="background:#ff6700;color:#fff;width:200px;" @click="_drawback">提交</Button>
                    </div>
                </div>
            </div>
            <div class="refund-body-right fl">
                <div class="shtitle">订单详情</div>
                <div class="mod-separate-line"></div>
                <div class="shxq pr">
                    <img class="shxqimg" :src="refundpro.productImage" alt="">
                    <span class="shxqspan pa">{{refundpro.productName}}</span>
                </div>
                <div class="mod-separate-line"></div>
                <div class="xq-third">
                    <div>
                        <span>订单编号：</span>
                        <span style="color:#5788e6;cursor:pointer" @click="lookdetail(refundpro.orderNo)">{{refundpro.orderNo}}</span>
                    </div>
                    <div>
                        <span>单价：</span>
                        <span>￥{{refundpro.currentUnitPrice}}</span>
                    </div>
                    <div>
                        <span>数量：</span>
                        <span>￥{{refundpro.quantity}}</span>
                    </div>
                    <div>
                        <span>总价：</span>
                        <span>￥{{refundpro.totalPrice}}</span>
                    </div>
                     <div>
                        <span>创建时间：</span>
                        <span>￥{{refundpro.createTime}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getStore} from '@/utils/storage.js' 
import {drawback} from '@/api/order.js'
export default {
    name: "refund",
    data() {
        return {
            orderNo: "",
            shtype:"1",
            shreason:"",
            shdescribe:"",
            reasonList: [
                {
                    value: '1',
                    label: '收到商品破损'
                },
                {
                    value: '2',
                    label: '商品错发/漏发'
                },
                {
                    value: '3',
                    label: '商品需要维修'
                },
                {
                    value: '4',
                    label: '发票问题'
                },
                {
                    value: '5',
                    label: '收到商品与描述不符'
                },
                {
                    value: '6',
                    label: '商品质量问题'
                },
                {
                    value: '7',
                    label: '未按约定时间发货'
                },
                {
                    value: '8',
                    label: '收到假货'
                },
                {
                    value: '9',
                    label: '无理由退货'
                }
            ],
        }
    },
    mounted() {
        this.orderNo = this.$route.params.orderNo;
    },
    computed: {
        refundpro() {
            if(this.$store.state.goods.refundinfo.orderNo){
                return this.$store.state.goods.refundinfo
            }else{
                return JSON.parse(getStore("refundinfo"));
            }
        },
    },
    methods: {
        lookdetail(orderid){
             const { href } = this.$router.resolve({
                path: `/orderDetail/${orderid}`
            })
            window.open(href, '_blank')
         },
         _drawback () {
             var that = this;
             var params = {
                orderNo:this.refundpro.orderNo,
                type:this.shtype,
                money:this.refundpro.totalPrice,
                reason:this.shreason,
                refund_way:1,
                description:this.shdescribe,
             }
             if(!this.shreason||!this.shdescribe){
                var htm = `<div class="alertinfobox clearfix">
                            <img src="../../static/images/gantan.png" class="fl">
                            <span class="alertinfo fl" style="width:200px;">
                                请填写完整信息！ <br/>
                            </span>
                        </div>`
                ti_xing(htm)
                setTimeout(function() {
                    $("#ti_xing").modal('hide')
                }, 2000)
             }else{
                  drawback(params).then(res => {
                    var htm = `<div class="alertinfobox clearfix">
                            <img src="../../static/images/${res.data == "创建成功"?"success":"gantan"}.png" class="fl">
                            <span class="alertinfo fl" style="width:200px;">
                                ${res.data == "创建成功"?"申请成功，即将返回订单列表":res.msg} <br/>
                            </span>
                        </div>`
                    ti_xing(htm)
                    setTimeout(function() {
                        $("#ti_xing").modal('hide')
                        that.$router.push({path:'/user'})
                    }, 2000)
                })
             }

         }
    }
}
</script>
<style scoped>
.refund-main{
    width: 991px;
    margin: 0 auto;
}
.processbar{
    margin: 20px 0 ;
    color: #fff;
}
.refund-body{
    background: #fff;
    border:1px solid #e3e3e3;
}
.refund-body-left{
    width:748px;
    border-right: 1px solid #e3e3e3;
}
.mod-iteminfo {
    position: relative;
}
.mod-iteminfo .form-title {
    float: left;
    width: 134px;
    font-size: 14px;
    display: inline-block;
    text-align: right;
    padding-top: 15px;
}
.mod-iteminfo-inner {
    padding: 10px 0 10px 50px;
    position: relative;
    background: #fff;
    line-height: 1.5;
    min-height: 76px;
}
.refund-img{
    height: 76px;
    width: 76px;
    border: 1px solid #e3e3e3;
}
.refund-name{
    display: inline-block;
    width: 425px;
    padding-left: 10px;
}
.refund-body-right{
    padding: 0 20px;
    width: 240px;
}
.mod-separate-line {
    overflow: hidden;
    height: 1px;
    line-height: 1px;
    font-size: 1px;
    background: #e8e8e8;
}
.shtitle{
    padding: 15px 0;
    margin: 0 10px 0 0;
    font-size: 16px;
    font-weight: 400;
    color: #3c3c3c;
    white-space: pre-line;
    vertical-align: middle;
}
.shxq{
    height: 100px;
}
.shxqimg{
    position: absolute;
    top: 25%;
    width: 54px;
    height: 54px;
}
.shxqspan{
    padding: 4px 10px 0 0;
    font-size: 12px;
    color: #333;
    width: 150px;
    top:25%;
    right: 0;
    display: block;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
}
.xq-third>div{
margin: 8px 0;
}
.xq-third>div>span:nth-child(1){
    width: 65px;
    display: inline-block;
}
.xq-third>div:nth-child(2){
    width: 200px;
    display: inline-block;
}
</style>


