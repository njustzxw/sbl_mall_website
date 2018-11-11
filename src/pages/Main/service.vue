<template>
    <div class="clearfix">
        <div class="lb"></div>
        <div class="aside fl" v-if="show1">
            <Menu  :active-name="currentroute" :open-names="currentroutearr" accordion @on-select='select'>
                <Submenu v-for="(item,index) in list" :key="index" :name="item.name">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        {{item.name}}
                    </template>
                    <MenuItem v-for="(item2,index2) in item.children" :key="index2" :name="item2.name" >{{item2.name}}</MenuItem>
                </Submenu>
            </Menu>
        </div>
        <div class="contentright fl ">
          <Shzc v-if="servicename =='送货政策'"/>
          <Gmzn v-if="servicename =='购买指南'"/>
          <Zffs v-if="servicename =='支付方式'"/>
          <Shfw v-if="servicename =='售后服务'"/>
          <Lsmd v-if="servicename =='零售门店'"/>
          <Rdzx v-if="servicename =='热点咨询'"/>
          <Ddwl v-if="servicename =='订单物流'"/>
          <Gsjj v-if="servicename =='公司简介'"/>
          <Jrwm v-if="servicename =='加入我们'"/>
          <Ryjx v-if="servicename =='荣誉奖项'"/>
          <QQ v-if="servicename =='官方QQ'"/>
          <Weixin v-if="servicename =='官方微信'"/>
          <Lxwm v-if="servicename =='联系我们'"/>
        </div>
    </div>
</template>
<script>
export default {
  components: {
    Shzc:resolve => {require(['../HeadFoot/footitem/Shzc.vue'], resolve)},
    Gmzn:resolve => {require(['../HeadFoot/footitem/Gmzn.vue'], resolve)},
    Zffs:resolve => {require(['../HeadFoot/footitem/Zffs.vue'], resolve)},
    Shfw:resolve => {require(['../HeadFoot/footitem/Shfw.vue'], resolve)},
    Lsmd:resolve => {require(['../HeadFoot/footitem/Lsmd.vue'], resolve)},
    Rdzx:resolve => {require(['../HeadFoot/footitem/Rdzx.vue'], resolve)},
    Ddwl:resolve => {require(['../HeadFoot/footitem/Ddwl.vue'], resolve)},
    Gsjj:resolve => {require(['../HeadFoot/footitem/Gsjj.vue'], resolve)},
    Jrwm:resolve => {require(['../HeadFoot/footitem/Jrwm.vue'], resolve)},
    Ryjx:resolve => {require(['../HeadFoot/footitem/Ryjx.vue'], resolve)},
    QQ:resolve => {require(['../HeadFoot/footitem/QQ.vue'], resolve)},
    Weixin:resolve => {require(['../HeadFoot/footitem/Weixin.vue'], resolve)},
    Lxwm:resolve => {require(['../HeadFoot/footitem/Lxwm.vue'], resolve)}
  },
  data() {
    return {
      currentroute: "",
      currentroutearr: [],
      show1: true,
      list: [
        {
          name: "订单服务",
          url: "/service",
          children: [
            { name: "购买指南", url: "/service" },
            { name: "支付方式", url: "/service" },
            { name: "送货政策", url: "/service" }
          ]
        },
        {
          name: "服务支持",
          url: "/service",
          children: [
            { name: "售后服务", url: "/service" },
            { name: "零售门店", url: "/service" }
          ]
        },
        {
          name: "自助服务",
          url: "/service",
          children: [
            { name: "热点咨询", url: "/service" },
            { name: "订单物流", url: "/service" }
          ]
        },
        {
          name: "媒体中心",
          url: "/service",
          children: [
            { name: "新闻动态", url: "/service" }
            //          { name: "图片资源", url: "/service" }
          ]
        },
        {
          name: "关于公司",
          url: "/service",
          children: [
            { name: "公司简介", url: "/service" },
            { name: "加入我们", url: "/service" },
            { name: "荣誉奖项", url: "/service" }
          ]
        },
        {
          name: "关注我们",
          url: "/service",
          children: [
            { name: "官方QQ", url: "/service" },
            { name: "官方微信", url: "/service" },
            { name: "联系我们", url: "/service" }
          ]
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.menu();
    });
  },
  computed: {
    servicename() {
      return this.$store.state.app.servicename;
    }
  },
  watch: {
    servicename() {
      // this.menu()
    }
  },
  methods: {
    menu() {
      this.currentroute = this.servicename;
      let arr = [];
      for (let obj of this.list) {
        for (let item of obj.children) {
          if (this.servicename == item.name) arr.push(obj.name);
        }
      }
      this.currentroutearr = arr;
      this.show1 = false;
      setTimeout(() => {
        this.show1 = true;
      }, 10);
      console.log(this.servicename);
      console.log(this.currentroutearr);
    },
    select(name) {
      console.log(name);
      this.$store.commit("servicename", name);
    }
  }
};
</script>
<style scoped>
.aside {
  width: 230px;
}
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #2d8cf0;
  background: #fff;
}
.contentright {
  background: #fff;
  margin-left: 40px;
  min-height: 440px;
}
</style>
