<template>
	<div class="login v2">
		<div style="border-bottom: 1px solid #e1e1e1;">
			<div class="wrapper loghead">
				<img src="../../../static/images/logo.jpg" alt="">
			</div>
		</div>
		<div class="login-content">
				<div class="login-box">
					<ul class="common-form">
						<li style="text-align: right;" class="pr">
							<span class="userclass fl">{{usercard=="common"?"普通用户登陆":"企业用户登陆"}}</span>
							<a href="javascript:;" class="register" @click="toRegister">注册 思贝丽 账号</a>
						</li>
						<li class="username border-1p">
							<div class="input">
								<label for="username">
									<Icon type="person" size="20"></Icon>
								</label>
								<input type="text" v-model="ruleForm.userName" style="margin-top:6px;" placeholder="账号">
							</div>
						</li>
						<li>
							<div class="input">
								<label for="pwd" style="top:118px">
									<Icon type="locked" size="20"></Icon>
								</label>
								<input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码">
							</div>
						</li>
						<li style="text-align: right;margin-top:20px;" class="pr">
							<Checkbox v-model="autoLogin" class="fl">记住密码</Checkbox>
							<a style="padding: 1px 0 0 10px" @click="open('找回密码','请联系作者邮箱找回密码或使用测试账号登录：test | test')">忘记密码 ?</a>
						</li>
						<li>
							<div style="margin-top: 10px">
								<Button class="logbtn" :style="usercard=='common'?'':'background-color: #2db7f5;border-color: #2db7f5;'" type="info" long :disabled="ruleForm.userPwd&&ruleForm.userName&&logintxt=='登录'?false:true"  @click="login">{{logintxt}}</Button>
							</div>
						</li>
						<li class="qyuser">
							<a class="fr" href="javascript:;" @click="changeuser">{{usercard=="common"?"企业用户点此登陆":"普通用户点此登陆"}}</a>
							<img src="../../../static/images/arrow1.gif" alt="" class="fr">
						</li>
					</ul>
				</div>
		</div>
		<Foot/>
	</div>
</template>
<script>
import Cookies from 'js-cookie';	
import { userLogin,companyLogin } from '@/api/index.js'
import { setStore, getStore, removeStore } from '@/utils/storage.js'
import Foot from '../HeadFoot/footer.vue'
export default {
	components: {
            Foot,
        },
	data() {
		return {
			usercard:"common",
			cart: [],
			ruleForm: {
				userName: "",
				userPwd: "",
				errMsg: ""
			},
			registered: {
				userName: "",
				userPwd: "",
				userPwd2: "",
				errMsg: ""
			},
			autoLogin: false,
			logintxt: "登录",
			statusKey: ""
		};
	},
  	computed: {},
  	methods: {
		  //注册
		toRegister () {
			this.$router.push({name:'Register'})
		},
		//登陆
		login () {
			this.logintxt = '登录中...'
			this.rememberPass()
			if (!this.ruleForm.userName || !this.ruleForm.userPwd) {
				this.message('账号或者密码不能为空!')
				return false
			}
			var params = {
				username: this.ruleForm.userName,
				password: this.ruleForm.userPwd
			}
			if(this.usercard=="common"){
				userLogin(params).then(res => {
					if(res.status){ //登录失败
						this.$Message.error(res.msg);
						this.logintxt = '登录'
					}else{//登陆成功
						Cookies.set('userlogfag', true);
						this.$Message.success('登陆成功');
						this.logintxt = '登录'
						console.log(res)
						this.$store.commit('saveuserInfo',JSON.stringify(res.data))
						this.$router.push({path:'/home'})
					}
				})
			}else{
				companyLogin(params).then(res => {
					if(res.status){ //登录失败
						this.$Message.error(res.msg);
						this.logintxt = '登录'
					}else{//登陆成功
						Cookies.set('userlogfag', true);
						this.$Message.success('登陆成功');
						this.logintxt = '登录'
						console.log(res)
						this.$store.commit('saveuserInfo',JSON.stringify(res.data))
						this.$router.push({path:'/home'})
					}
				})
			}

		},
		//记住密码
		getRemembered () {
			var judge = getStore('remember')
			if (judge === 'true') {
				this.autoLogin = true
				this.ruleForm.userName = getStore('username')
				this.ruleForm.userPwd = getStore('password')
			}
		},
		rememberPass () {
			if (this.autoLogin === true) {
				setStore('remember', 'true')
				setStore('username', this.ruleForm.userName)
				setStore('password', this.ruleForm.userPwd)
			} else {
				setStore('remember', 'false')
				removeStore('username')
				removeStore('password')
			}
		},
		changeuser(){
			if(this.usercard == "common"){
				this.usercard="qyiuser"
			}else{
				this.usercard="common"
			}
		},
   },
   mounted() {
	   this.getRemembered()
  },
};
</script>
<style scoped>
.wrapper{
	width: 1200px;
	margin: 0 auto;
}
.loghead{
	height:80px;
	padding: 16px;
    background: #FFF;
	position: relative;
}
.loghead img{
	width: 42px;
	position: absolute;
}
.login-content{
	background-image: url(../../../static/images/logbg.jpg);
	position: relative;
    z-index: 9;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 500px;
}
.common-form{
	position: absolute;
    top: 120px;
    right: 220px;
	background-color: rgba(255,255,255,.8);
	width: 350px;
    padding: 25px 25px 23px;
    color: #6c6c6c;
}
.input input{
	width: 300px;
    font-size: 14px;
    line-height: 18px;
    height: 40px;
    padding: 11px 8px 11px 50px;
    border: 1px solid #ddd;
	margin-top: 20px;
}
.input label {
    display: block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background: #ddd;
    text-align: center;
    position: absolute;
    left: 25px;
    top: 58px;
    outline: 0;
}
.logbtn{
	background: #ffa02b;
	border-color: #ffa02b;
	height: 40px;
	font-size: 18px;
}
.userclass{
	font-size: 18px;
	font-weight: 500;
}
.register{
	padding-top: 6px;
    display: inline-block;
}
.qyuser{
	margin-top: 10px;
}
.qyuser>img{
	padding: 4px;
}
</style>
