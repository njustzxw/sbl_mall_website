<template>
	<div class="clearfix">
        <div class="lb"></div>
        <div class="aside left-menu-wrapper fl" v-if="show1">
			<img :src="'http://image.99sbl.com/'+userInfo.headImg" alt="" v-if="userInfo.headImg">
            <img src="../../../static/images/avatar.png" alt="" v-else/>
            <h5>{{userInfo.username}}</h5>
            <ul class="left-menu-nav" v-if="userInfo.role==1||userInfo.enterName">
            	<li v-for="(item,index) in list" :key="index"  @click="select(item.name)" >
            		<span :class="item.name==servicename?'active':''">{{item.name}}</span>
            	</li>
            </ul>
			<ul class="left-menu-nav" v-else>
				<li v-for="(item,index) in userMangeCheckList" :key="index"  @click="select(item.name)" >
            		<span :class="item.name==servicename?'active':''">{{item.name}}</span>
            	</li>
            </ul>
        </div>
        <div class="page-for-order common-box contentright fl">
            <Address v-if="servicename =='收货地址'&&userInfo.username" :headtitle='servicename'/>
			<ComAddress v-if="servicename =='收货地址'&&userInfo.enterName" :headtitle='servicename'/>
			<Userinfomation v-if="servicename =='账号资料'" :headtitle='servicename'/>
			<Myorder v-if="servicename =='我的订单'" :headtitle='servicename'/>
			<Checkorder v-if="servicename =='订单审核'" :headtitle='servicename'/>
			<Shfw v-if="servicename =='售后服务'" :headtitle='servicename'/>
			<Info v-if="servicename =='消息中心'" :headtitle='servicename'/>
			<Collent v-if="servicename =='收藏夹'" :headtitle='servicename'/>
        </div>
    </div>
</template>

<script>
export default {
  components: {
    ComAddress: resolve => {
      require(["../user/qyAddress.vue"], resolve);
    },
    Address: resolve => {
      require(["../user/Address.vue"], resolve);
    },
    Userinfomation: resolve => {
      require(["../user/Userinfomation.vue"], resolve);
    },
    Myorder: resolve => {
      require(["../user/Myorder.vue"], resolve);
    },
    Checkorder: resolve => {
      require(["../user/Checkorder.vue"], resolve);
    },
    Shfw: resolve => {
      require(["../user/Shfw.vue"], resolve);
    },
    Info: resolve => {
      require(["../user/information.vue"], resolve);
    },
    Collent: resolve => {
      require(["../user/collent.vue"], resolve);
    }
  },
  data() {
    return {
      show1: true,
      list: [
        { name: "我的订单", url: "/user" },
        { name: "收藏夹", url: "/user" },
        { name: "消息中心", url: "/user" },
        { name: "账号资料", url: "/user" },
        { name: "收货地址", url: "/user" },
        { name: "售后服务", url: "/user" }
      ],
      userMangeCheckList: [
        { name: "我的订单", url: "/user" },
        { name: "收藏夹", url: "/user" },
        { name: "消息中心", url: "/user" },
        { name: "订单审核", url: "/user" },
        { name: "账号资料", url: "/user" },
        { name: "收货地址", url: "/user" },
        { name: "售后服务", url: "/user" }
      ]
    };
  },
  computed: {
    servicename() {
      return this.$store.state.app.servicename;
    },
    userInfo() {
      return JSON.parse(this.$store.state.user.userInfo);
    }
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    select(name) {
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
.left-menu-wrapper {
  padding-top: 20px;
  margin: 0;
  border-radius: 10px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  background: #fff;
  overflow: hidden;
}
.left-menu-wrapper img {
  width: 168px;
  height: 168px;
}
.left-menu-wrapper h5 {
  font-size: 18px;
  line-height: 48px;
  font-weight: 700;
}
.left-menu-nav li {
  position: relative;
  height: 48px;
  border-top: 1px solid #ebebeb;
  line-height: 48px;
}
.left-menu-nav li span {
  display: block;
  height: 48px;
  padding: 0 30px;
  color: #666;
  transition: none;
  cursor: pointer;
}
.left-menu-nav li span:hover,
.left-menu-nav li .active {
  position: relative;
  top: -1px;
  z-index: 1;
  height: 50px;
  background-color: #98afee;
  line-height: 50px;
  color: #fff;
}
.common-box {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  min-height: 600px;
  width: 950px;
}
</style>