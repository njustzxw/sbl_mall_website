<template>
    <div>
        <div class="ui-wrapper" v-for="(item,index) in floorList" :key="index">
            <Con :floor="item"/>
        </div>
    </div>
</template>

<script>
    import {getProductListFloor} from '@/api/goods'
    import Con from "@/components/floorcontent.vue";
    export default {
        components: {
            Con
        },
        data() {
            return {
                floorList:[],
            }
        },
        mounted() {
            this._getProductListFloor()
        },
        methods:{
            _getProductListFloor() {
                getProductListFloor().then(res => {
                    if(res.status == 0){
                        this.floorList = res.data
                        console.log(res.data)
                    }
                })
            },
        }
    }
</script>

<style scoped>
.box-hd {
  position: relative;
  height: 58px;
  -webkit-font-smoothing: antialiased;
}
</style>