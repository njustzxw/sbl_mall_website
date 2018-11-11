<template>
    <div style="padding-top:30px">
        <Card  bordered>
            <p slot="title">订单状态</p>
            <div class="order-info">
                <h3 class="pr">
                    <span class="pa ic100">
                        <i-circle :percent="100" stroke-color="#5cb85c" :size="60">
                            <Icon type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
                        </i-circle>
                    </span>
                    <span>支付成功！即将返回我的订单</span>    
                </h3>
                <p class="detail">请您耐心等待，我们将在48小时内为您发货</p>
            </div>
        </Card>
    </div>
</template>
<script>
export default {
    mounted () {
        setTimeout(() => {
            this.$store.commit("servicename", "我的订单");
            this.$router.push({
                path: "/user"
            });
        }, 3000);
    }
}
</script>

<style scoped>
.order-info {
    padding: 60px 0 55px;
    color: #333;
    text-align: center;
    min-height: 300px;
}
.order-info h3 {
    padding-bottom: 14px;
    line-height: 36px;
    font-size: 36px;
    color: #ff6700;
}
.ic100{
    top: -19px;
    left: 250px;
}
.order-info .detail {
    line-height: 24px;
    font-size: 14px;
    color: #999;
}
</style>
