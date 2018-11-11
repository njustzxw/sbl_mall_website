<template>
    <div class="service-right ">
        <h3>荣誉奖项</h3>
        <div class="service-right-section">
            <div>
                <div class="title">商贸中标通知书</div>
                 <div class="div"> 
                    <ul class="ul"> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/1.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/11.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/12.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/13.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/14.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/15.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/16.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/17.jpg" alt="">  
                        </li> 
                        <li>
                        <img src="../../../../static/images/zhengshu/商贸中标通知书/18.jpg" alt="">  
                        </li> 
                    </ul> 
                </div>
                <div class="title">荣誉证书</div>
                <div class="div div1"> 
                    <ul class="ul ul1"> 
                        <li>
                            <img src="../../../../static/images/zhengshu/荣誉证书铜版/1.jpg" alt="">  
                        </li> 
                        <li>
                            <img src="../../../../static/images/zhengshu/荣誉证书铜版/2.jpg" alt="">  
                        </li> 
                        <li>
                            <img src="../../../../static/images/zhengshu/荣誉证书铜版/3.jpg" alt="">  
                        </li> 
                        <li>
                            <img src="../../../../static/images/zhengshu/荣誉证书铜版/4.jpg" alt="">  
                        </li> 
                        <li>
                            <img src="../../../../static/images/zhengshu/荣誉证书铜版/5.jpg" alt="">  
                        </li> 
                    </ul> 
                </div>
                <div class="title">富士施乐培训</div>
                <ul class="clearfix gd">
                    <li>
                        <img src="../../../../static/images/zhengshu/富士施乐培训/1.jpg" alt=""> 
                    </li>
                    <li>
                        <img src="../../../../static/images/zhengshu/富士施乐培训/11.jpg" alt=""> 
                    </li>
                    <li>
                        <img src="../../../../static/images/zhengshu/富士施乐培训/12.jpg" alt=""> 
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Jrwm"
};
</script>
<style scoped>
.service-right {
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  width: 950px;
  padding: 28px 48px 80px;
  margin-bottom: 80px;
}
.service-right h3 {
  border-bottom: 1px solid #dbdbdb;
  font-size: 25px;
  color: #b0b0b0;
  line-height: 80px;
}
.service-right-section {
  padding-top: 40px;
}
.service-right-section p {
  text-indent: 2em;
  font-size: 14px;
  line-height: 25px;
}
.service-right-section > div {
  text-align: center;
  margin: 30px 0;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
/*这里也就是重点喽,时间分段,到还没滚动的时候时间经过了0%所以left也就为0,当开始滚动时间停止的时候那么就等于全部完成也就是100%,这句话写不对效果就不出哦*/
@-webkit-keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: -400px;
  }
}
/*以下是布局样式*/
.div {
  width: 900px;
  height: 400px;
  margin: 50px auto;
  border: 2px solid #aeb1ae;
  position: relative;
  overflow: hidden;
}
.ul {
  position: absolute;
  padding: 0;
  margin-top: 0px;
  width: 185%;
  display: block;
  /*这句话也是至关重要的,少了这句话也不会滚动,我给他四个值,3s代表三秒之内完成滚动,move这个名字对应着上面时间分段的名字,infinite代表循环滚动,linear表示匀速滚动*/
  -webkit-animation: 3s move infinite linear;
}
.ul li {
  float: left;
  background: black;
  color: white;
  margin-left: 1px;
  width: 300px;
  height: 400px;
  text-align: center;
  line-height: 100px;
} /*这句话代表鼠标移动上去滚动会停止,类似于轮播*/
.div:hover .ul {
  -webkit-animation-play-state: paused;
}

.ul li img {
  width: 300px;
}

.div1 {
  width: 900px;
  height: 200px;
}
.ul1 li {
  width: 300px;
  height: 200px;
}
.ul1 li img {
  width: 300px;
}

.gd {
  width: 900px;
  margin: 50px auto;
  position: relative;
}
.gd li {
  float: left;
  width: 300px;
}
.gd li img {
  width: 280px;
  margin: 0 10px;
}
</style>
