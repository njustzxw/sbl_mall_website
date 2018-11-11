<template>
    <div>
        <Head/>
            <div style="padding-top:30px" class="license">
                <div>
                    <img src="../../static/images/license/1.jpg" alt="">
                </div>
                <div>
                    <img src="../../static/images/license/2.jpg" alt="">
                </div>
                <div>
                    <img src="../../static/images/license/3.jpg" alt="">
                </div>
            </div>
        <Foot/>
    </div>
</template>

<script>
import Head from "./HeadFoot/header.vue";
import Foot from "./HeadFoot/footer.vue";
    export default {
        components: {
    Head,
    Foot,
  },
        
    }
</script>

<style scoped>
.license{
    text-align: center;
}
</style>