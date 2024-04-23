<template>
	<view>
		<u-popup :round="10" mode="bottom" :show.sync="registerShow">
			<view class="login-title">
				<span class="title">注册</span>
				<span class="close" @click="close">X</span>
			</view>
			<view class="form">
				<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm" labelWidth="80px">
					<u-form-item label="用户名" prop="username" borderBottom ref="item1">
						<u--input v-model="userInfo.username" border="none"></u--input>
					</u-form-item>
					<u-form-item label="密码" prop="pwd" borderBottom ref="item1">
						<u--input type="password" v-model="userInfo.pwd" border="none"></u--input>
					</u-form-item>
					<u-form-item label="确认密码" prop="ckpwd" borderBottom ref="item1">
						<u--input type="password" v-model="userInfo.ckpwd" border="none"></u--input>
					</u-form-item>
					<span class="gologin" @click="goLogin">已有账号？去登录 ></span>
					<u-button type="primary" text="确定" class="submit" @click="submit()"></u-button>
				</u--form>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		name: "register",
		props: ['registerShow', 'loginShow'],
		data() {
			return {
				showSex: false,
				userInfo: {
					username: 'zhangsan',
					pwd: '123456',
					ckpwd: '123456'
				},
				yesUser: true,
				radio: '',
				switchVal: false,
				rules: {
					username: [
						// 必填规则
						{
							required: true,
							message: '此为必填字段',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
						// 正则判断为字母或数字
						{
							pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '字母开头,长度在5-16之间,允许字母数字下划线',
							trigger: ['blur', 'change'],
						},
						// 校验用户是否已存在
						{
							asyncValidator: (rule, value, callback) => {
								uni.request({
									url: this.$baseUrl + '/api/user/find?username=' + value,
									method: 'GET',
									success: (res) => {
										console.log(JSON.stringify(res.data));
										if (res.data.errno) {
											this.yesUser = false;
											callback(new Error('用户名已存在'));
										} else {
											this.yesUser = true;
											callback();
										}
									},
									error: (err) => {
										console.log(err);
									}
								})
							},
						}
					],
					pwd: [{
							required: true,
							message: '此为必填字段',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
						// 正则判断为字母或数字
						{
							pattern: /^[a-zA-Z]\w{5,17}$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '字母开头,长度6-18之间,允许字母数字和下划线',
							trigger: ['blur', 'change'],
						},
					],
					ckpwd: [{
							required: true,
							message: '此为必填字段',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
						{
							validator: this.checkCkpwd,
							message: '两次密码输入不一致',
							trigger: ['blur', 'change']
						}
					]
				}

			};
		},
		methods: {
			...mapActions(["setUser", "setShowLogin"]),
			close() {
				this.$emit('update:registerShow', false);
			},
			goLogin() {
				this.close();
				this.setShowLogin(true);
			},
			checkCkpwd() {
				return this.userInfo.pwd === this.userInfo.ckpwd;
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					console.log("yesUser:" + this.yesUser);
					if (this.yesUser) {
						uni.request({
							url: this.$baseUrl + '/api/user/register',
							method: 'POST',
							header: {
							    'content-type': 'application/x-www-form-urlencoded', 
							},
							data: {
								username: this.userInfo.username,
								pwd: this.userInfo.pwd
							},
							success: (res) => {
								this.close();
								if (!res.data.errno) {
									uni.$u.toast('注册成功')
								} else {
									uni.$u.toast('注册失败，请稍后再试')
								}
							},
							error: (err) => {
								console.log(err);
							}
						})
					} else {
						uni.$u.toast('校验失败')
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
	};
</script>

<style lang="scss">
	.login-title {
		margin-top: 10px;

		.title {
			font-weight: bolder;
			display: inline-block;
			width: 94%;
			text-align: center;
		}

		.close {
			display: inline-block;
			vertical-align: top;
			width: 5%;
		}
	}

	.form {
		width: 95%;
		margin: 0 auto;

		.u-form-item {
			margin-bottom: 10px;
		}

		.submit {
			margin-top: 20px;
			margin-bottom: 10px;
		}

		.gologin {
			float: right;
			font-size: 14px;
			color: blue;
			text-decoration: underline;
			margin: 10px 0;
		}
	}
</style>