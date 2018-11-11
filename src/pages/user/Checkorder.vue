<template>
<div>
    <section class="headline">
        <h2>
            <span>{{headtitle}}</span>
        </h2>
    </section>
    <section v-if="checkorderList.length">
        <Table border :columns="columns" :data="checkorderList"></Table>
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
import { getCheck,check } from '@/api/order.js'
import expandRow from '@/components/table-expand.vue';
export default {
	name: "checkorder",
    props: ["headtitle"],
    data() {
        return {
            checkorderList:[],
            current: 1,
            total: 10,
            num: 16,
            columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '订单号',
                        key: 'orderNo',
                        sortable: true
                    },
                    {
                        title: '订单人',
                        key: 'startUserName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.startUserName)
                            ]);
                        }
                    },
                    {
                        title: '当前审核人员',
                        key: 'curUserName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.curUserName)
                            ]);
                        }
                    },
                    {
                        title: '订单审核状态',
                        key: 'statusDesc'
                    },
                    {
                        title: '审核',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled:this.checkorderList[params.index].statusDesc=='审核通过'?true:false
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.pass(params.index)
                                        }
                                    }
                                }, '通过'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        disabled:this.checkorderList[params.index].statusDesc=='审核通过'?true:false
                                    },
                                    on: {
                                        click: () => {
                                            this.nopass(params.index)
                                        }
                                    }
                                }, '不通过')
                            ]);
                        }
                    }
                ],
        }
    },
    mounted () {
       this._getCheck()
    },
    methods: {
        _getCheck(){
             getCheck().then(res => {
                 this.checkorderList = res.data.list
                 this.total = res.data.navigatepageNums.length * res.data.pageSize;
             })
         },
        pass (index) {
            var params = {
                checkOrderId:this.checkorderList[index].id,
                lvId:this.checkorderList[index].lvId,
                status:2
            }
            this.$Modal.confirm({
                title: '提示',
                content: '<p>是否确认通过该订单？</p>',
                onOk: () => {
                    check(params).then(res => {
                        if(res.status == 0){
                            this.$Message.success('审核订单成功！')
                            this._getCheck()
                        }else{
                            this.$Message.error(res.msg)
                        }
                    })
                },
                onCancel: () => {
                }
            });
        },
        nopass (index) {
            var params = {
                checkOrderId:this.checkorderList[index].id,
                lvId:this.checkorderList[index].lvId,
                status:1
            }
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认不通过该订单？</p>',
                onOk: () => {
                    check(params).then(res => {
                        if(res.status == 0){
                            this.$Message.success('拒绝订单成功！')
                            this._getCheck()
                        }else{
                            this.$Message.error(res.msg)
                        }
                    })
                },
                onCancel: () => {
                }
            });
        },
          //分页
        changepage(index) {
            this.current = index;
            this._getCheck();
        },
        pagesizechange(size) {
            this.pageSize = size;
            this._getCheck();
        },
    }
}
</script>
