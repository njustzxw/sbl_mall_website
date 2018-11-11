<template>
    <div class="ui-wrapper">
        <ul class="home-promo-list clearfix">
            <!-- <li  v-for="(item,index) in sideList" :key="index" class="clearfix"></li> -->
            <li class="">
                <span class="item exposure">
                    <img src="http://image.99sbl.com/t1.jpg" alt="" style="margin-left:0" @click="goto('/allProduct/10003')">
                </span>
            </li>
            <li>
                <span class="item exposure">
                    <img src="http://image.99sbl.com/t2.jpg" alt="" @click="goto('/allProduct/10045')">
                </span>
            </li>
            <li>
                <span class="item exposure">
                    <img src="http://image.99sbl.com/t3.jpg" alt="" @click="goto('/allProduct/10187')">
                </span>
            </li>
            <li>
                <span class="item exposure">
                    <img src="http://image.99sbl.com/t4.jpg" alt="" @click="goto('/allProduct/10185')">
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        methods:{
            goto (url){
                this.$router.push(url)
            }
        }
    }
</script>
<style>
.home-promo-list span {
  display: inline-block;
  height: 170px;
}
.home-promo-list img {
  width: 291px;
  height: 170px;
  margin: 8px;
  cursor: pointer;
}
.home-promo-list img:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.home-promo-list li {
  float: left;
}
</style>
