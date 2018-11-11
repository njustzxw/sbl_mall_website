<template>
	<div v-html="html"></div>
</template>

<script>
import { unionPay } from "@/api/order.js";
export default {
  data() {
    return {
      orderNo: "",
      html: ""
    };
  },
  mounted() {
    this.orderNo = this.$route.params.orderNo;
    this._unionPay();
  },
  methods: {
    _unionPay() {
      var params = {
        orderNo: this.orderNo
      };
      unionPay(params).then(res => {
        this.html = res;
        setTimeout(() => {
          document.forms[0].submit();
        }, 100);
      });
    }
  }
};
</script>
<style>
</style>