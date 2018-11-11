<template>
    <div>
        <Head/>
        <div class="wrap">
            <div class="content">
                <router-view/>
            </div>
        </div>
        <!-- 右侧悬浮窗 -->
	    <xf/>
        <Foot/>
        <!--提醒框-->
        <div class="modal fade" id="ti_xing" tabindex="-1" role="dialog">
            <div id="ti_xing_msg" class="modal-dialog" role="document" style="width: 300px;">
                <div id="" class="modal-content">
                    <div class="modal-header">
                        <div id="tx_text" class="text-center"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Head from "./HeadFoot/header.vue";
import Foot from "./HeadFoot/footer.vue";
import Cookies from "js-cookie";
import xf from "@/components/home/xf.vue";
export default {
  components: {
    Head,
    Foot,
    xf
  },
  mounted() {
    // if(!Cookies.get('userlogfag'))this.$router.push({path:'/Login'})
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.content {
  width: 1220px;
  margin: 0 auto;
}
.wrap {
  background: #f5f5f5;
  padding-bottom: 50px;
}
.text-center {
  font-size: 16px;
}
</style>
