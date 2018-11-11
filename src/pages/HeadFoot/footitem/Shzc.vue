<template>
    <div class="service-right ">
        <h3>发货时间</h3>
        <div class="service-right-section">
            <p>亲爱的顾客您好，思贝丽将按照支付顺序，保证在3天之内将物品寄出，通常情况下，24小时内即可寄出。受货物库存以及物流等因素的影响，部分商品可能会有延迟，客服会与您联系，请您那耐心等待。</p>
        </div>
        <h3>送货政策</h3>
        <div class="service-right-section">
            <p>思贝丽商城目前支持单笔交易满200元，南京市区内免费送货上门。南京市区外按规则收取一定的运费。</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "Shzc"
};
</script>
<style scoped>
.service-right 
box-shadow: 0 1px 10px 0 rgba(0,0,0,0.1);{
  width: 950px;
  padding: 28px 48px 80px;
  margin-bottom: 80px;
}
.service-right h3 {
  border-bottom: 1px solid #dbdbdb;
  font-size: 25px;
  color: #b0b0b0;
  line-height: 80px;
}
.service-right-section {
  padding-top: 40px;
}
.service-right-section p {
  text-indent: 2em;
  font-size: 14px;
  line-height: 25px;
}
</style>
