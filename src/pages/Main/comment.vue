<template>
    <div class="evaluation-main">
        <div class="processbar">
            <img src="../../../static/images/liucheng4.png" style="width:991px" alt="">
        </div>
        <div class="evaluation-body">
            <div class="listhd pr">
                <h3>商品评分</h3>
            </div>
            <div>
                <ul class="labels clearfix">
                    <li class="itemdetail">商品</li>
                    <li class="level">商品满意度评分</li>
                </ul>
                <ul class="rate-list clearfix"  >
                    <li class="fl item-rate-info clearfix">
                        <img :src="evaluationpro.productImage" alt="" class="fl">
                        <div class="fl">
                            {{evaluationpro.productName}}
                        </div>
                    </li>
                    <li class="fl">
                        <div>
                            <Rate show-text v-model="starnum"></Rate>
                        </div>
                        <div>
                             <Input v-model="comment" type="textarea" :rows="6" placeholder="输入评论" style="width:300px;"></Input>
                        </div>
                    </li>
                </ul>
                <ul style="border-top:1px solid #e3e3e3; text-align:center">
                    <Button type="primary" class="comment" @click="_evalute">发表评论</Button>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {getStore} from '@/utils/storage.js' 
import {drawback,evalute} from '@/api/order.js'
export default {
    name: "refund",
    data() {
        return {
            starnum:0,
            comment:"",
        }
    },
    mounted() {
        this.orderNo = this.$route.params.orderNo;
        console.log(this.evaluationpro)
    },
    computed: {
        evaluationpro() {
            if(this.$store.state.goods.evaluationinfo.orderNo){
                return this.$store.state.goods.evaluationinfo
            }else{
                return JSON.parse(getStore("evaluationinfo"));
            }
        },
        proindex () {
             return getStore("evaluationinfochild");
        }
    },
    methods: {
        lookdetail(orderid){
             const { href } = this.$router.resolve({
                path: `/orderDetail/${orderid}`
            })
            window.open(href, '_blank')
         },
         _evalute () {
             var that = this;
             var params = {
                productId:this.evaluationpro.productId,
                typeId:this.evaluationpro.typeId,
                orderNo:this.evaluationpro.orderNo,
                orderItemId:this.evaluationpro.orderItemId,
                starLevel:this.starnum,
                content:this.comment,
             }
             if(this.evaluationpro.typeId) params.typeId = this.evaluationpro.typeId

             if(!this.comment){
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
                  evalute(params).then(res => {
                    var htm = `<div class="alertinfobox clearfix">
                            <img src="../../static/images/${res.data == "创建成功"?"success":"gantan"}.png" class="fl">
                            <span class="alertinfo fl" style="width:200px;">
                                ${res.data == "插入消息成功"?"评论成功，即将返回订单列表":res.msg} <br/>
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
.evaluation-main{
    width: 991px;
    margin: 0 auto;
}
.processbar{
    margin: 20px 0;
}
.evaluation-body{
    border:1px solid #e3e3e3;
    background: #fff;
}
.listhd h3 {
    background: #f2f7fa url(../../../static/images/bg10.png) repeat-x 0 -134px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding-left: 12px;
    border-bottom: 1px solid #C4D5DF;
}
.labels {
    background: #F3F8FE;
    padding: 5px 20px;
    zoom: 1;
}
.labels .itemdetail {
    width: 448px;
}
.labels li {
    float: left;
    height: 20px;
    line-height: 20px;
}
.rate-list {
    margin-bottom: 10px;
    padding: 0 20px;
    clear: both;
}
.item-rate-info{
    width: 50%;
    margin: 10px 0;
}
.item-rate-info img{
    width: 80px;
}
.item-rate-info div{
    height: 80px;
    width: 300px;
    padding: 10px;
}
.comment{
    margin: 20px 0;
}
</style>


