<template>
<div>
    <section class="headline">
        <h2>
            <span>{{headtitle}}</span>
             <a href="javascript:;" class="fr modifiypwd" @click="showbox('password')">修改密码</a>
        </h2>
    </section>
    <!-- 普通用户 -->
    <div class="page-for-account" v-if="userInfo.username">
        <div class="status-box account-avatar-box pr">
            <div class="account-avatar-image">
                <img :src="userInfo.headImg" alt="">
            </div>
            <div class="safe-center-title">
                <h3>修改头像</h3>
            </div>
            <div class="btn"> </div>

            <form id="form1">
                <input type="button" value="上传图片" onclick="f.click()" class="btn_mouseout"/><br>
                <p><input type="file" id="f" name="f" @change="uploadPic(this);" style="display:none"/></p>
            </form>
            <div id="result"></div>

            <!-- <form name="form1" :action="host+'/user/upload.do'" method="post" enctype="multipart/form-data">
                <input type="file" name="upload_file"/>
                <input type="submit" value="upload"/>
            </form> -->
        </div>
        <div class="status-box pr">
            <span class="jindu">
                <i-circle :percent="100" stroke-color="#5cb85c" :size='30'>
                    <Icon type="ios-checkmark-empty" size="30" style="color:#5cb85c"></Icon>
                </i-circle>
            </span>
            <div class="safe-center-title">
                <h3>账户昵称</h3>
                <p>{{userInfo.username}}</p>
            </div>
        </div>
        <div class="status-box pr">
            <span class="jindu">
                <i-circle :percent="100" stroke-color="#5cb85c" :size='30'>
                    <Icon type="ios-checkmark-empty" size="30" style="color:#5cb85c"></Icon>
                </i-circle>
            </span>
            <div class="safe-center-title">
                <h3>手机验证</h3>
                <p>{{userInfo.phone}}</p>
            </div>
            <div class="safe-todo">
                <Button type="text" style="font-size:16px;color:#5788E6" @click="showbox('phone')">修改</Button>
            </div>
        </div>
        <div class="status-box pr">
            <span class="jindu">
                <i-circle :percent="100" :size='30' stroke-color="#ff5500">
                    <Icon type="information" size="20" style="color:#ff5500"></Icon>
                </i-circle>
            </span>
            <div class="safe-center-title">
                <h3>登录密码</h3>
                <p>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
            </div>
            <div class="safe-todo">
                <Button type="text" style="font-size:16px;color:#5788E6" @click="showbox('password')">修改</Button>
            </div>
        </div>
        <div class="status-box pr">
             <span class="jindu">
                <i-circle :percent="100" stroke-color="#5cb85c" :size='30'>
                    <Icon type="ios-checkmark-empty" size="30" style="color:#5cb85c"></Icon>
                </i-circle>
            </span>
            <div class="safe-center-title">
                <h3>邮箱验证</h3>
                <p>{{userInfo.email}}</p>
            </div>
            <div class="safe-todo">
                <Button type="text" style="font-size:16px;color:#5788E6" @click="showbox('email')">修改</Button>
            </div>
        </div>
        <div class="status-box pr">
             <span class="jindu">
                <i-circle :percent="100" stroke-color="#5cb85c" :size='30'>
                    <Icon type="ios-checkmark-empty" size="30" style="color:#5cb85c"></Icon>
                </i-circle>
            </span>
            <div class="safe-center-title">
                <h3>安全问题</h3>
                <p>已设置安全问题</p>
            </div>
            <div class="safe-todo">
                <Button type="text" style="font-size:16px;color:#5788E6" @click="showbox('mb')">设置</Button>
            </div>
        </div>
    </div>
    <!-- 企业用户 -->
    <div class="page-for-account" v-else>
        <div class="infocontent">
            <div class="baseinfo">
                <div class="tips-box">
                    亲爱的 <b>{{userInfo.enterName}}</b> ,请尽量填写真实准确的信息哦。
                </div>
                <div class="main-profile">
                    <p>
                        <label>当前头像：</label>
                        <span class="avatar-box" @mouseover="editimg=true" @mouseout="editimg=false">
                            <a class="avatar">
                                <img src="../../../static/images/avatar.png" alt="">
                            </a>
                            <a  class="edit-avatar" v-show="editimg">编辑头像</a>
                        </span>
                    </p>
                    <p>
                        <label>紧急联系电话：<em>*</em></label>
                        <input type="text" v-model="userInfo.emerTelephone">
                    </p>
                    <p class="input-help-text">
                        <span>请确保该电话能随时接通，以确保交易顺利完成。</span>
                    </p>
                    <p>
                        <label>公司电话：<em>*</em></label>
                        <input type="text" v-model="userInfo.phone">
                    </p>
                    <p>
                        <label>公司邮箱：</label>
                        <input type="text" v-model="userInfo.fax">
                    </p>
                    <p>
                        <label>QQ：</label>
                        <input type="text"  v-model="userInfo.qq">
                    </p>
                    <p>
                        <label>开票地址：</label>
                        <input type="text" v-model="userInfo.invoiceAddress">
                    </p>
                    <p>
                        <label>开票电话：</label>
                        <input type="text" v-model="userInfo.invoicePhone">
                    </p>
                    <p>
                        <label>开票银行名称：</label>
                        <input type="text" v-model="userInfo.invoiceBank">
                    </p>
                    <p>
                        <label>开票银行账号：</label>
                        <input type="text" v-model="userInfo.invoiceCount">
                    </p>
                    <p>
                        <label>开票公司税号：</label>
                        <input type="text" v-model="userInfo.invoiceNumber">
                    </p>
                    <p>
                        <Button type="warning" @click="saveqyinfo">保存</Button>
                    </p>
                </div>
            </div>
            <div class="accountinfo pa">
                <p>
                    <label>企业法人：</label>
                    <span>{{userInfo.leperson}}</span>
                </p>
                <p>
                    <label>账户余额：</label>
                     <span style="color:red;font-size:15px">{{userInfo.balance}}</span> 元
                </p>
                <p>
                    <label>折扣率：</label>
                     <span style="color:red;font-size:15px">{{userInfo.discount}}</span> 折
                </p>
                <p>
                    <label>纳税类型：</label>
                     <span>{{userInfo.texType}}</span>
                </p>
            </div>
        </div>
    </div>
    <Modal v-model="modal3" width="360" @on-ok='updateok'>
        <div style="width:100%;height:40px"></div>
        <Input  v-show="currentmod=='phone'" v-model="newphone" placeholder="请输入新的手机号" size="large" class="modinput"></Input>
        <Input  v-show="currentmod=='email'" type='email' v-model="newemail" placeholder="请输入新的邮箱" size="large" class="modinput" clearable></Input>
        
        <Form  :rules="ruleValidate" :label-width="80" v-show="currentmod=='password'" ref="formValidate" :model="formValidate">
            <FormItem label="旧密码" prop="oldpassword">
                <Input v-model="formValidate.oldpassword" type="password" placeholder="请输入旧密码" size="large"></Input>
            </FormItem>
            <FormItem label="新密码" prop="newpassword">
                <Input v-model="formValidate.newpassword" type="password" placeholder="请输入新密码" size="large"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="newpasswordconfirm">
                <Input v-model="formValidate.newpasswordconfirm" type="password" placeholder="请确认新密码" size="large" @on-blur='confirm'></Input>
            </FormItem>
            <p v-show="differntFag" style="color:red;padding-left:80px">两次密码不一致！</p>
        </Form>
        
        <div v-show="currentmod=='mb'">
            <Form>
                <FormItem label="密保问题">
                    <Select v-model="question">
                        <Option :value="item" v-for="(item,index) in questionList" :key="index">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="密保答案" prop="answer">
                    <Input v-model="answer" placeholder="请输入答案"></Input>
                </FormItem>
            </Form>
        </div>
            
    </Modal>
</div>
</template>
<script>
import { host } from "@/api/config";
import {
  update,
  updatepassword,
  updateqyinfo,
  updateqypassword
} from "@/api/index.js";
export default {
  name: "Address",
  props: ["headtitle"],
  data() {
    return {
      editimg: false,
      host: "",
      currentmod: "",
      modal3: false,
      newphone: "",
      newemail: "",
      formValidate: {
        oldpassword: "",
        newpassword: "",
        newpasswordconfirm: ""
      },
      differntFag: false,
      question: "",
      answer: "",
      questionList: [
        "你最喜欢的动物是？",
        "你父亲的名字？",
        "你母亲的名字？",
        "你的中学是？",
        "第一次坐飞机去的哪里？"
      ],

      ruleValidate: {
        oldpassword: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        newpassword: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        newpasswordconfirm: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.host = host;
  },
  computed: {
    userInfo() {
      return JSON.parse(this.$store.state.user.userInfo);
    }
  },
  methods: {
    showbox(item) {
      this.currentmod = item;
      this.modal3 = true;
    },
    updateok() {
      if (this.currentmod != "password") {
        let params = {};
        switch (this.currentmod) {
          case "phone":
            params = { phone: this.newphone };
            break;
          case "email":
            params = { email: this.newemail };
            break;
          case "mb":
            params = { question: this.question, answer: this.answer };
            break;
        }
        this.updateInformation(params);
      } else {
        var params = {
          passwordOld: this.formValidate.oldpassword,
          passwordNew: this.formValidate.newpassword
        };
        if (this.userInfo.username) {
          this.updatepassword(params);
        } else {
          updateqypassword(params).then(res => {
            console.log(res);
            if (res.status == 0) {
              this.$Message.success(res.msg);
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      }
    },
    updateInformation(params) {
      update(params).then(res => {
        if (res.msg == "更新个人信息成功") {
          this.$store.commit("saveuserInfo", JSON.stringify(res.data));
          this.$Message.success(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    updatepassword(params) {
      updatepassword(params).then(res => {
        console.log(res);
      });
    },
    confirm() {
      if (
        this.formValidate.newpasswordconfirm != this.formValidate.newpassword
      ) {
        this.differntFag = true;
      } else {
        this.differntFag = false;
      }
    },
    saveqyinfo() {
      var params = {
        emerTelephone: this.userInfo.emerTelephone,
        headImg: this.userInfo.headImg,
        phone: this.userInfo.phone,
        fax: this.userInfo.fax,
        qq: this.userInfo.qq,
        invoiceAddress: this.userInfo.invoiceAddress,
        invoicePhone: this.userInfo.invoicePhone,
        invoiceBank: this.userInfo.invoiceBank,
        invoiceCount: this.userInfo.invoiceCount,
        invoiceNumber: this.userInfo.invoiceNumber
      };
      updateqyinfo(params).then(res => {
        if (res.msg == "更新个人信息成功") {
          this.$Message.success(res.msg);
          this.$store.commit("saveuserInfo", JSON.stringify(res.data));
        }
      });
    },
    uploadPic() {
      var that = this;
      var animateimg = $("#f").val(); //获取上传的图片名 带//
      var imgarr = animateimg.split("\\"); //分割
      var myimg = imgarr[imgarr.length - 1]; //去掉 // 获取图片名
      var houzui = myimg.lastIndexOf("."); //获取 . 出现的位置
      var ext = myimg.substring(houzui, myimg.length).toUpperCase(); //切割 . 获取文件后缀

      var file = $("#f").get(0).files[0]; //获取上传的文件
      var fileSize = file.size; //获取上传的文件大小
      var maxSize = 1048576; //最大1MB
      console.log(animateimg);
      if (
        ext != ".PNG" &&
        ext != ".GIF" &&
        ext != ".JPG" &&
        ext != ".JPEG" &&
        ext != ".BMP"
      ) {
        this.$Message.warning("文件类型错误,请上传图片类型");
        return false;
      } else if (parseInt(fileSize) >= parseInt(maxSize)) {
        this.$Message.warning("上传的文件不能超过1MB");
        return false;
      } else {
        var data = new FormData($("#form1")[0]);
        $.ajax({
          url: "http://b2b.99sbl.com/user/upload.do",
          type: "post",
          data: data,
          dataType: "JSON",
          cache: false,
          processData: false,
          contentType: false
        }).done(function(ret) {
          if (ret["isSuccess"]) {
            that.$Message.success("上传成功");
          } else {
            that.$Message.error("上传失败");
          }
        });
        return false;
      }
    }
  }
};
</script>
<style>
.headline {
  position: relative;
  height: 60px;
  padding: 0 10px 0 28px;
  background: #f5f5f5;
  background: linear-gradient(#fff, #f5f5f5);
  border-bottom: 1px solid #dcdcdc;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
  line-height: 60px;
  color: #646464;
  z-index: 5;
}
.headline h2 {
  font-size: 18px;
  font-weight: 400;
  color: #626262;
}
.headline h2 span {
  float: left;
}
.account-avatar-box {
  height: 124px;
  padding: 0 0 0 120px;
}
.page-for-account .status-box-last {
  position: relative;
  height: 60px;
  padding-bottom: 30px;
  margin: 0 30px 30px;
  border-bottom: 1px solid #dadada;
  line-height: 30px;
}
.page-for-account .account-avatar-box .account-avatar-image {
  position: absolute;
  left: 20px;
  top: 50%;
  margin-top: -40px;
}
.page-for-account .account-avatar-box .account-avatar-image img {
  width: 80px;
  height: 80px;
  border-radius: 2px;
}
.page-for-account .safe-center-title {
  padding: 29px 0 4px;
}
.page-for-account .safe-center-title h3 {
  font-size: 18px;
  font-weight: 400;
  color: #333;
}
.btn {
  line-height: 25px;
  font-size: 12px;
}
.page-for-account .status-box {
  border-bottom: 1px solid #dadada;
  height: 124px;
  padding: 0 0 0 120px;
  font-weight: 500;
}
.page-for-account .status-box p {
  clear: both;
  width: 420px;
  color: #999;
  float: left;
  font-size: 14px;
}
.page-for-account .safe-todo {
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -30px;
  text-align: right;
}

.page-for-account .jindu {
  position: absolute;
  left: 50px;
  top: 37px;
}
.modinput {
  width: 330px;
  margin: 10px 0 20px;
}
.infocontent {
  position: relative;
  padding: 10px;
}
.baseinfo {
  margin: 0 30px;
}
.tips-box {
  font-size: 15px;
  margin: 10px 0;
}
.main-profile {
  padding: 10px 0;
  margin-bottom: 10px;
  zoom: 1;
}
.main-profile p,
.accountinfo p {
  line-height: 25px;
  position: relative;
  padding-left: 7em;
  min-height: 25px;
  margin-bottom: 10px;
}
.main-profile label {
  position: absolute;
  vertical-align: middle;
  left: 0;
  height: 32px;
  line-height: 32px;
  display: block;
}
.avatar-box {
  display: inline-block;
  position: relative;
  border: 3px solid #e6e6e6;
  width: 80px;
  height: 80px;
}
.avatar-box .avatar {
  display: table-cell;
  width: 80px;
  height: 80px;
  vertical-align: middle;
  text-align: center;
}
.avatar-box .avatar img {
  width: 100%;
}
.edit-avatar {
  background: #000;
  background-position: 10px 6px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 21px;
  line-height: 21px;
  text-align: center;
  color: #e1d7ca;
  opacity: 0.7;
  filter: alpha(opacity=70);
}
.edit-avatar:hover {
  color: #fff;
  text-decoration: underline;
}
.main-profile label em {
  color: #999;
  position: absolute;
  left: -12px;
  top: 4px;
}
.main-profile input {
  padding: 5px;
  border: 1px solid #cecece;
  width: 320px;
  height: 32px;
}
.input-help-text {
  line-height: 12px;
  color: #999;
}
.accountinfo {
  width: 400px;
  top: 162px;
  right: 70px;
  height: 200px;
  border-left: 1px solid #e3e3e3;
}
.accountinfo p {
  padding-left: 88px;
}
.accountinfo label {
  position: absolute;
  vertical-align: middle;
  left: 2em;
  height: 40px;
  line-height: 40px;
  display: block;
}
.accountinfo span {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 500;
}
.modifiypwd {
  font-size: 14px;
}
.modifiypwd:hover {
  text-decoration: underline;
}
</style>

