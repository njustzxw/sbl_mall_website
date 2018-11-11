<template>
    <div class="mt20">
        <div class="title">合作单位</div>
        <div class="hzdwmc">政府单位</div>
        <ul class="hzdw clearfix">
            <li class="fl" v-for="(item,index) in zfdw" :key="index">
                <div>
                    <img :src="item.image" :title="item.name" alt="" class="">
                </div>
            </li>
        </ul>
        <div class="hzdwmc">大型院校</div>
        <ul class="hzdw clearfix">
            <li class="fl" v-for="(item,index) in dxyx" :key="index">
                <div>
                    <img :src="item.image" :title="item.name" alt="" class="">
                </div>
            </li>
        </ul>
        <div class="hzdwmc">银行单位</div>
        <ul class="hzdw clearfix">
            <li class="fl" v-for="(item,index) in yhdw" :key="index">
                <div>
                    <img :src="item.image" :title="item.name" alt="" class="">
                </div>
            </li>
        </ul>
        <div class="hzdwmc">大型单位</div>
        <ul class="hzdw clearfix">
            <li class="fl" v-for="(item,index) in dxdw" :key="index">
                <div>
                    <img :src="item.image" :title="item.name" alt="" class="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      zfdw: [
        {
          name: "江苏省人民政府",
          image: "../../../static/images/企业logo/1.png"
        },
        {
          name: "江苏省财政厅",
          image: "../../../static/images/企业logo/2.png"
        },
        {
          name: "江苏省公安厅",
          image: "../../../static/images/企业logo/3.png"
        },
        {
          name: "江苏省生态环境厅",
          image: "../../../static/images/企业logo/4.png"
        },
        {
          name: "江苏省住建厅",
          image: "../../../static/images/企业logo/5.png"
        },
        {
          name: "江苏省交通厅",
          image: "../../../static/images/企业logo/6.png"
        },
        {
          name: "南京市人民政府",
          image: "../../../static/images/企业logo/7.png"
        }
      ],
      dxyx: [
        {
          name: "南京理工大学",
          image: "../../../static/images/企业logo/8.png"
        },
        {
          name: "南京农业大学",
          image: "../../../static/images/企业logo/9.png"
        },
        {
          name: "东南大学",
          image: "../../../static/images/企业logo/10.png"
        },
        {
          name: "南京大学",
          image: "../../../static/images/企业logo/11.png"
        },
        {
          name: "南京师范大学",
          image: "../../../static/images/企业logo/12.png"
        },
        {
          name: "中国药科大学",
          image: "../../../static/images/企业logo/13.png"
        },
        {
          name: "南京信息工程大学",
          image: "../../../static/images/企业logo/14.png"
        }
      ],
      yhdw: [
        {
          name: "中国建设银行",
          image: "../../../static/images/企业logo/15.png"
        },
        {
          name: "中国银行",
          image: "../../../static/images/企业logo/16.png"
        },
        {
          name: "中国工商银行",
          image: "../../../static/images/企业logo/17.png"
        },
        {
          name: "交通银行",
          image: "../../../static/images/企业logo/18.png"
        },
        {
          name: "中国农业银行",
          image: "../../../static/images/企业logo/19.png"
        },
        {
          name: "南京银行",
          image: "../../../static/images/企业logo/20.png"
        },
        {
          name: "浦发银行",
          image: "../../../static/images/企业logo/21.png"
        }
      ],
      dxdw: [
        {
          name: "国家电网",
          image: "../../../static/images/企业logo/22.png"
        },
        {
          name: "中国石化",
          image: "../../../static/images/企业logo/23.png"
        },
        {
          name: "东部战区",
          image: "../../../static/images/企业logo/24.png"
        },
        {
          name: "南京地铁",
          image: "../../../static/images/企业logo/25.png"
        },
        {
          name: "鼓楼医院",
          image: "../../../static/images/企业logo/26.png"
        },
        {
          name: "江苏省中医院",
          image: "../../../static/images/企业logo/27.png"
        },
        {
          name: "中国科学院",
          image: "../../../static/images/企业logo/28.png"
        }
      ]
    };
  }
};
</script>

<style scoped>
.hzdwmc {
  letter-spacing: 0.5px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 5px;
}
.hzdw li {
  margin: 0 10px;
  width: 154px;
}
.hzdw li img {
  border: 1px solid #e3e3e3;
  width: 154px;
}
</style>