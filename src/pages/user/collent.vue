<template>
    <div>
    <section class="headline">
        <h2>
            <span>{{headtitle}}</span>
        </h2>
    </section>
    <section v-if="collectlist.length">
        <ul class="collect clearfix">
            <li v-for="(item,index) in collectlist" :key="index" class="fl col-item">
                <div class="pr">
                    <img :src="item.mainImage" alt="" @click="goto(item.id)">
                    <span :title="item.name" @click="goto(item.id)">{{item.name}}</span>
                    <div class="g-price">
                        ￥{{item.price.toFixed(2)}}
                    </div>
                    <div class="pa delicon" title="删除宝贝" @click="cancelcol(item.id)">
                        <Icon type="trash-a" size="20"></Icon>
                    </div>
                </div>
            </li>
        </ul>
        <div class="fy">
            <Page :total="total" :current="current" :page-size='num' @on-change="changepage"></Page>
        </div>
    </section>
    <section class="content" style="width: 100%;" v-else>
        <div class=""  style="text-align: center;">
            <img src="../../../static/images/cart.png" alt="" style="width: 100px;margin-top: 130px;"/>
            <p class="nonedata">暂无待审核订单</p>
        </div>
    </section>
</div>
</template>
<script>
import { getcollectProduct,delcollectProduct} from '@/api/goods.js'
export default {
	name: "collect",
    props: ["headtitle"],
    data() {
        return {
            collectlist:[],
            current: 1,
            total: 10,
            num: 20,
        }
    },
    mounted () {
        this.getcollectList()
    },
    methods:{
        getcollectList () {
            var params = {
                    pageNum:this.current,
                    pageSize:20
                }
            getcollectProduct(params).then(res => {
                console.log(res.data.list)
                this.collectlist = res.data.list
                this.total = res.data.total;
                console.log(this.total)
            })
        },
        cancelcol (id) {
            delcollectProduct({productId:id}).then(res => {
                if(res.data=="删除成功"){
                    this.$Message.success(res.data)
                    this.getcollectList()
                }
            })
        },
        changepage(index) {
            this.current = index;
            this.getcollectList();
        },
        goto (id) {
            const { href } = this.$router.resolve({
                path: `/describe/${id}`
            })
            window.open(href, '_blank')
        },
    }
}
</script>
<style scoped>
    .col-item{
        margin: 10px 20px 30px;
    }
    .col-item img{
        border: 1px solid #eee;
        width: 148px;
        height: 148px;
    }
    .col-item span{
        display: inline-block;
        width: 148px;
        padding: 0 10px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
    }
    .col-item{
        cursor: pointer;
    }
    .col-item:hover span{
        color: #ff6700;
        text-decoration: underline;
    }
    .col-item:hover .delicon{
        display: block;
    }
    .g-price{
        margin: 10px 0;
        color: #ff6700;
        font-weight: 600;
        text-align: center;
        font-size:14px;
    }
    .delicon{
        height: 28px;
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        cursor: pointer;
        text-align: center;
        padding: 5px;
        display: none;
    }
    .delicon:hover{
        color: #ff6700;
        background: #c5c5c594;
    }
    .fy {
        text-align: center;
        padding: 10px;
        }
</style>
