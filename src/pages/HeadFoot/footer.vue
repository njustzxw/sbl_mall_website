<template>
    <div class="foot">
        <div class="siteinfo clearfix">
            <ul class="nav-footer  " v-for="(item1,index1) in list" :key="index1">
                <li>
                    <h3>{{item1.name}}</h3>
                    <ul >
                        <li v-for="(item2,index2) in item1.children" :key="index2" @click="goto(item2.url,item2.name)">{{item2.name}}</li>
                    </ul>
                </li>
            </ul>
            <ul class="service">
                <li class="tel">025-84711906</li>
                <li class="time">周一至周日 8:30-17:30</li>
                <li class="fl link" style="text-align: left;padding:20px 0 0 50px ;">
                	<div>友情链接:</div>
                	<a href="http://www.taobao.com" target="_blank">
                		<img src="../../../static/images/taobao.jpg" alt="" />
                	</a>
                	<a href="https://www.jd.com" target="_blank" style="padding-top: 8px;">
                		<img src="../../../static/images/jingdong.jpg" alt="" />
                	</a>
                </li>
            </ul>
        </div>
		<div style="text-align:center;padding-top:20px ">
			<a   href='#/License' target='_blank'>
                <img src='../../../static/images/jyxwz.jpg' border='0' />
            </a>
            <a  id='___szfw_logo___' href='https://credit.szfw.org/CX20181009080772280167.html' target='_blank'>
                <img src='../../../static/images/cxwz.jpg' border='0' />
            </a>
            <a href="http://www.jsdsgsxt.gov.cn/mbm/entweb/elec/certView.shtml?siteId=205d6efd883244eabd2483042a4067f4" target="_blank">
                <img src="../../../static/images/gswj.jpg" title="" alt="" border="0" >
            </a>

		</div>
        <div class="copyright">
            <h4>Copyright © ，南京思贝丽商贸有限公司</h4>
            <h6>
                <a href="http://www.miibeian.gov.cn/" target="_blank" class="ba">备案号：苏ICP备14036251号-1</a>
            </h6>
        </div>
    </div>
</template>
<script>
export default {
  name: "Foot",
  data() {
    return {
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
  methods: {
    goto(url, name) {
      this.$store.commit("servicename", name);
      this.$router.push({ path: url });
    }
  }
};
</script>
<style scoped>
.foot {
  width: 1220px;
  margin: 0 auto;
  font-weight: 500;
}
.siteinfo {
  padding: 100px 0 32px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}
.nav-footer > li {
  width: 149px;
  line-height: 1;
  float: left;
}
.nav-footer > li > h3 {
  color: #646464;
  font-size: 12px;
  padding: 0 0 14px;
}
.nav-footer > li li {
  color: #969696;
  font-size: 12px;
  padding: 6px 0;
  cursor: pointer;
}
.nav-footer > li li:hover {
  color: #ff6700;
}
.service {
  position: absolute;
  right: 0;
  overflow: hidden;
  line-height: 34px;
}
.service li {
  clear: both;
  width: 241px;
  font-size: 12px;
  line-height: 18px;
  color: #c3c3c3;
  text-align: right;
}
.service .tel {
  font-size: 30px;
  line-height: 1;
  cursor: default;
  color: #646464;
  top: -2px;
  position: relative;
}
.copyright {
  color: #434d55;
  font-size: 12px;
  padding: 40px 0;
  width: 300px;
  margin: 0 auto;
}
.ba {
  color: #bdbdbd;
  font-size: 12px;
  height: 12px;
  line-height: 1;
}
.link a {
  display: block;
  height: 36px;
  float: left;
}
.link a img {
  width: 70px;
}
</style>

