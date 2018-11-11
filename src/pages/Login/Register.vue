<template>
    <div class="login v2">
        <div class="wrapper">
            <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
                <div class="registered">
                    <h4>注册 思贝丽 账号</h4>
                    <div class="content" style="margin-top: 20px;">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <FormItem label="用户名" prop="username">
                                <Input v-model="formValidate.username" placeholder="请输入用户名"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="password" >
                                <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
                            </FormItem>
                            <FormItem label="确认密码" prop="password1" >
                                <Input type="password" v-model="formValidate.password1" placeholder="请确认密码"></Input>
                            </FormItem>
                            <FormItem label="E-mail" prop="email">
                                <Input v-model="formValidate.email" placeholder="请输入e-mail"></Input>
                            </FormItem>
                            <FormItem label="电话" prop="phone">
                                <Input v-model="formValidate.phone" placeholder="请输入电话"></Input>
                            </FormItem>
                            <FormItem label="密保问题">
                                <Select v-model="formValidate.question">
                                    <Option :value="item" v-for="(item,index) in questionList" :key="index">{{item}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="密保答案" prop="answer">
                                <Input v-model="formValidate.answer" placeholder="请输入答案"></Input>
                            </FormItem>
                            <Button type="info" long  class="register" :disabled="btnfag" @click="register('formValidate')">注册</Button>
                            <FormItem >
                                <div class="tolog">
                                    <span>如果您已拥有账号，则可在此</span>
                                    <a href="javascript:;" style="margin: 0 5px" @click="toLogin">登陆</a>
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { register } from '@/api/index.js'
    export default {
        data () {
            return {
                btnfag:false,
                questionList:['你最喜欢的动物是？','你父亲的名字？','你母亲的名字？','你的中学是？','第一次坐飞机去的哪里？'],
                formValidate: {
                    username: '',
                    password:'',
                    password1:'',
                    email: '',
                    phone: '',
                    question:'',
                    answer:'',
                    
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不少于6位', trigger: 'blur' }
                    ],
                    password1: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '不正确的邮箱格式', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '电话不能为空', trigger: 'blur' },
                        { type: 'string', message: '请输入正确的电话格式', trigger: 'blur' }
                    ],
                    answer: [
                        { required: true, message: '答案不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            register (name) {
                this.btnfag = true;


                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.formValidate.password !== this.formValidate.password1) {
                            this.$Message.warning('两次输入的密码不相同!');
                            this.btnfag = false
                            return false
                        }
                        register(this.formValidate).then(res => {
                            if(res.status == 0){
                                this.$Message.success(res.msg);
                                setTimeout(() => {
                                    this.toLogin()
                                }, 2000);
                            }else{
                                this.$Message.error(res.msg);
                                this.btnfag = false
                            }
                        })
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            toLogin () {
                this.$router.push({name:'Login'})
            },
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
  }
  .wrapper {
    background: url(/static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  
 
  
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}
@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
}
.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}
.register {
    width: 92%;
	height: 30px;
	font-size: 16px;
}
.tolog{
    text-align: center;
    line-height: 48px;
    margin-bottom: 0;
    font-size: 12px;
    color: #999;
}
</style>