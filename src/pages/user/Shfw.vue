
</<template>
<div>
    <section class="headline">
        <h2>
            <span>{{headtitle}}</span>
        </h2>
    </section>
    <div style="padding:0 30px;">
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
                <div style="margin:20px" >
                    <img src="../../../static/images/process.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Shfw",
    props: ["headtitle"],
}
</script>

<style scoped>
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
</style>
