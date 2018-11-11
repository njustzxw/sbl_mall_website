<style scoped>
    .orderxq{
        height: 30px;
        border-bottom: 1px dotted rgb(180, 180, 180)
    }
    .proitem {
        margin-top:15px;
        border-bottom: 1px dotted rgb(180, 180, 180);
    }
    .orderxq>li,.proitem>div{
        float: left;
    }
    .proitem>div{
        line-height: 50px;
        height: 50px;
        vertical-align: middle;
    }
    .orderxq .name,.proitem .name{
        width:350px;
        text-align: left;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .orderxq .num, .orderxq .price,.proitem .num,.proitem .price{
        width:150px;
        text-align: center;
    }
    .proitem .name{
        padding: 0 20px;
    }
    .orderxq .totalprice,.proitem .totalprice{
        width:120px;
        text-align: right; 
    }
    .orderxq .picture,.proitem .picture {
        height: 100%;
        width:60px;
        text-align: center;
    }
    .itemimg{
        width: 50px;
        height: 50px;
        border: 1px solid rgb(180, 180, 180);
    }
    .zjprice{
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
    }
    .zjprice .total{
        font-size:18px;
        font-weight: 500;
    }
    .zjprice .price{
        font-size:20px;
        color:#ff6709;
        font-weight: 500;
    }
</style>
<template>
    <div>
        <ul class="orderxq clearfix">
            <li class="picture"></li>
            <li class="name">产品</li>
            <li class="price">单价</li>
            <li class="num">数量</li>
            <li class="totalprice">总价</li>
        </ul>
        <div v-for="(item,index) in row.orderItemVoList" :key="index" class="proitem clearfix">
            <div class="picture">
                <img :src="item.productImage" alt="" class="itemimg">
            </div>
            <div class="name" :title="item.productName">{{item.productName}}</div>
            <div class="price">{{item.currentUnitPrice}}</div>
            <div class="num">{{item.quantity}}</div>
            <div class="totalprice">{{item.totalPrice}}</div>
        </div>
        <div class="zjprice clearfix">
            <span class="total fl" style="font-size:15px;">订单创建时间：</span>
            <span class="total fl" style="font-size:15px;">{{row.createTime}}</span>
            <span class="price fr">￥{{row.payment}}</span>
            <span class="fr total">总价：</span>
        </div>


        <!-- <Row class="expand-row" v-for="(item,index) in row.orderItemVoList" :key="index">
            <Col span="8">
                <span class="expand-key">产品: </span>
                <span class="expand-value">{{ item.productName }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">数量: </span>
                <span class="expand-value">{{ item.quantity }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">单价: </span>
                <span class="expand-value">{{ item.currentUnitPrice }}</span>
            </Col>
        </Row> -->
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        computed: {
           
        }
    };
</script>