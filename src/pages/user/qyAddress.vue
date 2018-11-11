<template>
<div>
	<!-- {{addressList}} -->
    <section class="headline">
        <h2>
            <span>{{headtitle}}</span>
            <Button type="primary" @click="add">增加地址</Button>
        </h2>
    </section>
	<div class="fn-clear" v-if="addressList.length">
		<div class="address-top-title">
			<span class="name">收货人</span>
			<span class="detail">收货地址</span>
			<span class="telephone">电话</span>
		</div>
		<div class="address-list-item" v-for="(item,index) in addressList" :key="index">
			<div class="name">
				<div class="name-cell">{{item.enterReceiverName}}</div>
			</div>
			<div class="detail">
				<div class="detail-cell">{{item.enterReceiverProvince+item.enterReceiverCity+item.enterReceiverDistrict+item.enterReceiverAddress}}</div>
			</div>
			<div class="telephone">{{item.enterReceiverTelephone}}</div>
			<div class="default" v-if="item.enterStatus">
				<span>默认地址</span>
			</div>
			<div class="common" v-else @click="_setDefualtAdress(item.enterShippingId)">
				<span>设为默认地址</span>
			</div>
			<div class="operation-cell">
				<span @click="mod(item)"><Icon type="edit" size="small" style="color:#5788e6"></Icon></span>
				<span @click="delConfirm(item.enterShippingId)"><Icon type="close" size="small" style="color:#fb5858"></Icon></span>
			</div>
		</div>
	</div>
	<section class="content" style="width: 100%;" v-else>
        <div class=""  style="text-align: center;">
            <img src="../../../static/images/cart.png" alt="" style="width: 100px;margin-top: 130px;"/>
            <p class="nonedata">您还没有收货地址哦</p>
        </div>
    </section>
	<!-- 增加修改弹框 -->
	<Modal
        v-model="modal1"
        title="增加收货地址"
		width="400"
        @on-ok="ok"
        @on-cancel="cancel">
		 <div class="formbody">
			 <Form :model="address" label-position="right">
				<FormItem >
					<Input v-model="address.receiver_name" size="large" placeholder="收货人姓名">></Input>
				</FormItem>
				<FormItem >
					<Input v-model="address.receiver_mobile" size="large" placeholder="手机号">></Input>
				</FormItem>
				<FormItem>
					<Row>
						<Col span="5">
							<Input v-model="address.receiver_qh" size="large" placeholder="区号"></Input>
						</Col>
						<Col span="2" style="text-align: center">-</Col>
						<Col span="17">
							<Input v-model="address.receiver_phone" size="large" placeholder="电话"></Input>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Cascader :data="cityData" v-model="address.address" placeholder="请选择收货地址" filterable></Cascader>
				</FormItem>
				<FormItem >
					<Input v-model="address.xxdz" size="large" placeholder="详细地址"></Input>
				</FormItem>
				<FormItem >
                    <TimePicker type="time" placeholder="最晚下班时间" style="width: 168px"  format="HH点mm分ss秒" :value="address.enterAfterWork" @on-change="selecttime"></TimePicker>
				</FormItem>
				<FormItem >
					<Checkbox v-model="address.mr">设为默认地址</Checkbox>
				</FormItem>
			</Form>
		 </div>
    </Modal>
		<!-- 删除弹框 -->
	<Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p>删除该地址之后，地址将不可用</p>
            <p>确认删除?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="_deleteAddress">删除</Button>
        </div>
    </Modal>
</div>
</template>
<script>
import citydata from '@/common/city'
import {getqyaddressList,addqyreciveAddress,setqyDefualtAdress,deleteqyAddress,updateqyreciveAddress} from '@/api/shipping.js'
export default {
	name: "Address",
	props: ["headtitle"],
	mounted () {
		this._getaddressList()
		this.cityData = citydata
	},
	data () {
		return {
			modal1: false,
            cityData:[],
            enterAfterWork:"01:00:00",
			address: {
				receiver_name: '',
				receiver_mobile: '',
				receiver_qh:'',
				receiver_phone: '',
				address:[],
				xxdz: '1',
				receiver_zip:'',
                mr:false,
                enterAfterWork:'18:00:01',
			},
			addressList:[],
			modal2:false,
			delItem:'',
			modal_loading:false,
			fag:'',
			title:'',

		}
	},
	computed: {
		userInfo() {
			return  JSON.parse(this.$store.state.user.userInfo);
		},
	},
	methods:{
		_getaddressList () {
			getqyaddressList().then(res => {
				this.addressList = res.data.list
			})
		},
		_setDefualtAdress (id) {
			var params = {
				shippingId:id
			}
			setqyDefualtAdress(params).then(res => {
				if(res.data == '设置默认地址成功'){
					this.$Message.success(res.data)
					this._getaddressList()
				}else{
					this.$Message.error('设置失败')
				}
			})
		},
		delConfirm (id) {
			this.delItem = id
			this.modal2 = true
		},
		_deleteAddress () {
			var params = {
				shippingId:this.delItem
			}
			this.modal_loading = true;
			deleteqyAddress(params).then(res => {
				setTimeout(() => {
					this.modal2 = false
					if(res.data = '删除地址成功'){
						this.modal_loading = false;
						this.$Message.success(res.data)
						this._getaddressList()
					}else{
						this.$Message.error('删除失败')
					}
				}, 1000);
			})
		},
		mod (item) {
			this.modId = item.enterShippingId
			this.modal1 = true
			this.fag = 'mod'
			this.title = '修改收货地址'
			var ad = []
			ad.push(item.enterReceiverProvince)
			ad.push(item.enterReceiverCity)
            ad.push(item.enterReceiverDistrict)
            console.log(ad)
			var phone = item.enterReceiverPhone.split('-')
			this.address= {
				receiver_name: item.enterReceiverName,
				receiver_mobile: item.enterReceiverTelephone,
				receiver_qh:phone[0],
				receiver_phone: phone[1],
				address:ad,
				xxdz: item.enterReceiverAddress,
				enterAfterWork:item.enterAfterWork,
				mr:item.enterStatus,
			}
			console.log(this.address)
		},
		add () {
			this.modal1 = true
			this.fag = 'add'
			this.title = '增加收货地址'
			this.address= {
				receiver_name: '',
				receiver_mobile: '',
				receiver_qh:'',
                receiver_phone: '',
                enterAfterWork:'',
				address:[],
                xxdz: '',
                enterAfterWork:'',
				mr:false,
			}
		},
		ok () {
			if(this.fag == 'add'){
				var params = {
					enterReceiverName : this.address.receiver_name,
					enterReceiverTelephone : this.address.receiver_mobile,
					enterReceiverPhone : this.address.receiver_qh + '-' + this.address.receiver_phone,
					enterReceiverProvince : this.address.address[0],
					enterReceiverCity : this.address.address[1],
					enterReceiverDistrict : this.address.address[2]?this.address.address[2]:'',
                    enterReceiverAddress : this.address.xxdz,
                    enterAfterWork:this.address.enterAfterWork,
					status1:this.address.mr
				}
				addqyreciveAddress(params).then(res => {
					if(res.msg == '新建地址成功'){
						this.$Message.success(res.msg );
						this._getaddressList()
					}else{
						this.$Message.error(res.msg);
					}
				})
			}else{
				var params = {
					enterShippingId:this.modId,
					enterReceiverName : this.address.receiver_name,
					enterReceiverTelephone : this.address.receiver_mobile,
					enterReceiverPhone : this.address.receiver_qh + '-' + this.address.receiver_phone,
					enterReceiverProvince : this.address.address[0],
					enterReceiverCity : this.address.address[1],
					enterReceiverDistrict : this.address.address[2]?this.address.address[2]:'',
                    enterReceiverAddress : this.address.xxdz,
                    enterAfterWork:this.address.enterAfterWork,
					status1:this.address.mr
				}
				updateqyreciveAddress(params).then(res => {
					if(res.data == '更新地址成功'){
						this.$Message.success(res.data );
						this._getaddressList()
					}else{
						this.$Message.error(res.msg);
					}
				})
			}
		},
		cancel () {
        },
        selecttime(date,type){
            this.address.enterAfterWork = date
        }
	}

};
</script>
<style scoped>
.headline h2 button {
  float: right;
  margin-top: 13px;
}
.formbody{
	padding: 0 20px;
}
.formbody input {
	height: 40px;
}
.address-top-title {
    height: 38px;
    padding: 0 24px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    line-height: 38px;
    font-size: 12px;
    color: #666;
}
.address-top-title .name {
    width: 126px;
    text-align: left;
}
.address-top-title .detail {
    text-align: left;
}
.address-top-title .telephone {
    float: right;
    /* width: 160px; */
    text-align: center;
    padding-right: 300px;
}
.address-top-title span {
    display: inline-block;
    float: left;
    height: 38px;
}
.address-list-item{
    height: 75px;
    padding: 20px 0;
    border-bottom: 1px solid #cfcfcf;
    line-height: 24px;
}
.address-list-item .name {
    display: table;
    float: left;
    width: 106px;
    height: 100%;
    padding: 0 20px 0 24px;
}
.address-list-item .name-cell {
    display: table-cell;
    vertical-align: middle;
}
.address-list-item .detail {
    display: table;
    float: left;
    width: 440px;
    height: 100%;
    text-align: left;
}
.address-list-item .detail .detail-cell {
    display: table-cell;
    vertical-align: middle;
}
.address-list-item .operation {
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    width: 135px;
    float: right;
    padding: 24px 0;
}
.address-list-item .default {
    width: 80px;
    float: left;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
	color: #666;
}
.address-list-item .common {
    width: 80px;
    float: left;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
	color: #5788e6;
}
.address-list-item .telephone {
    width: 160px;
    height: 100%;
    float: left;
    line-height: 40px;
    text-align: center;
}
.address-list-item .operation-cell{
	line-height: 22px;
	float: right;
}
.address-list-item .operation-cell span{
	display: inline-block;
	padding: 10px;
	cursor: pointer;
	font-size: 15px;
}
.address-list-item .operation-cell span:hover{
	opacity: 0.8;
}
.address-list-item {
	font-size: 14px;
    color: #666;
	font-weight: 500
}
.address-list-item:last-child {
    border-bottom: none;
    border-radius: 0 0 7px 7px;
}
.address-list-item .common{
	display:none
}
.address-list-item:hover .common{
	display:block
}
</style>
