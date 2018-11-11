<template>
	<div v-html="html"></div>
</template>

<script>
import { getPayOrder } from "@/api/order.js";
export default {
  data() {
    return {
      orderNo: "",
      html: ""
    };
  },
  mounted() {
    this.orderNo = this.$route.params.orderNo;
    this._getpayorder();
  },
  methods: {
    _getpayorder() {
      var params = {
        orderNo: this.orderNo
      };
      getPayOrder(params).then(res => {
        console.log(res);
        this.html = res.data;
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