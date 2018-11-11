<template>
    <div>
    <section class="headline">
        <h2>
            <span>{{headtitle}}</span>
        </h2>
        <div @mouseover='ShowFag=true' @mouseout='ShowFag=false'>
            <span class="set"></span>
            <span class="setfont">设置</span>
            <ul class="setbox" v-show="ShowFag">
                <li @click="allRead">标记为已读</li>
                <li @click="clearRead">删除已读消息</li>
                <li @click="clearAll">清空所有消息</li>
            </ul>
        </div>
    </section>
    <section v-if="informationList.length" style=" padding-top: 20px;"> 
        <div class="infoline" >
            <div class="info-box"  v-for="(item,index) in informationList" :key="index">
                <div class="info-box-title clearfix">
                    <span class="info-box-title-bg fl"></span>
                     <Badge :dot="item.read==1?false:true">
                         <span class="info-box-title-font fl">{{item.title}}</span>
                    </Badge>
                    <span class="info-box-title-link"></span>
                </div>
                <div class="info-box-content">
                    <span>{{item.content}}</span>
                </div>
                <div class="info-box-foot">
                     <span>{{trans(item.createTime)}}</span>
                    <span>来自：</span>
                    <span class="info-box-foot-come">{{item.operator}}</span>
                </div>
                <div class="close" title="删除此条消息"></div>
            </div>
        </div>  
    </section>
    <section class="content" style="width: 100%;" v-else>
        <div class=""  style="text-align: center;">
            <img src="../../../static/images/cart.png" alt="" style="width: 100px;margin-top: 130px;"/>
            <p class="nonedata">暂无未读消息</p>
        </div>
    </section> 
</div>
</template>
<script>
import { transferTime } from '@/utils/transferTime.js'
import { getInfoList,setread,delread,delAll } from '@/api/message.js'
import expandRow from '@/components/table-expand.vue';
export default {
	name: "infomation",
    props: ["headtitle"],
    data() {
        return {
            ShowFag:false,
            informationList:[]
        }
    },
    mounted () {
        this._getInfoLsit()
    },
    methods: {
        _getInfoLsit () {
            getInfoList().then(res => {
                console.log(res)
                 this.informationList = res.data.list
             })
        },
        trans (time) {
            return transferTime.getFormatTime(time)
        },
        allRead () {
            setread().then(res => {
            })
        },
        clearRead () {
            delread().then(res => {
                this._getInfoLsit()
            })
        },
        clearAll () {
            delAll().then(res => {
                this._getInfoLsit()
            })
        },

    }
}
</script>
<style scoped>
    .infoline{
        width:700px;
        padding-left: 20px;
        margin: 0 auto;
        border-left: 1px solid #eee;
        min-height: 500px;
    }
    .info-box{
        border-bottom: 1px solid #eee;
        position: relative;
    }
    .info-box-title{
        margin-top:20px;
    }
    .info-box-title-bg{
        display: block;
        width: 3px;
        background: #ff6700;
        height: 30px;
    }
    .info-box-title-font{
        display: block;
        height: 30px;
        line-height: 30px;
        margin-left: 20px;
        font-size: 16px;
    }
    .info-box-content{
        margin:20px 30px;
    }
    .info-box-foot{
        margin:10px 30px;
    }
    .info-box-foot-come{
        color:#ff6700;
    }
    .close{
        background-image: url(../../../static/images/tool.png);
        background-repeat: no-repeat;
        display: block;
        overflow: hidden;
        width: 15px;
        height: 15px;
        background-position: 0 -57px;
        float: right;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 4px;
    }
    .set{
        background-image: url(../../../static/images/tool.png);
        background-repeat: no-repeat;
        display: block;
        overflow: hidden;
        width: 15px;
        height: 15px;
        background-position: 2px -130px;
        cursor: pointer;
        position: absolute;
        right: 60px;
        top: 23px;
    }
    .setfont{
        position: absolute;
        right: 33px;
        top: 2px;
        cursor: pointer;
    }
    .setfont:hover{
        color: #ff6700;
    }
    .setbox{
        padding: 0 6px;
        border: 1px solid #E9E9E9;
        position: absolute;
        top: 40px;
        width: 90px;
        background: #FFF;
        right: 26px;
    }
    .setbox>li{
        height: 25px;
        line-height: 25px;
        cursor: pointer;
    }
    .setbox>li:hover{
        color: #ff6700;
        text-decoration: underline;
    }
</style>
