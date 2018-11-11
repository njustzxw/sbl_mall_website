<template>
    <div class="service-right ">
        <h3>售后服务</h3>
        <div class="service-right-section shfw">
            <p>1、服务宗旨：快速、果断、准确、周到、彻底。</p>
            <p>2、服务目标：服务质量赢得用户满意。</p>
            <p>3、服务原则：保质期内货物出现质量问题，销售方在接到通知后，与客户沟通交流并做出恰当的处理。</p>
            <p>4、服务原则：产品保质期内出现非人为性质量为题，包退换，由销售方负责一切费用，人为性损坏则需购方自行承担后果。</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "Gmzn"
};
</script>
<style scoped>
.service-right {
	box-shadow: 0 1px 10px 0 rgba(0,0,0,0.1);
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
.shfw p {
  line-height: 40px;
}
</style>
