<template>
	<view>
		<u-popup :round="10" mode="bottom" :show="loginShow">
			<view class="login-title">
				<span class="title">登录</span>
				<span class="close" @click="close">X</span>
			</view>
			<view class="form">
				<u--form labelPosition="left" :model="userInfo" ref="uForm" labelWidth="80px">
					<u-form-item label="用户名" prop="username" borderBottom ref="item1">
						<u--input v-model="userInfo.username" border="none"></u--input>
					</u-form-item>
					<u-form-item label="密码" prop="pwd" borderBottom ref="item1">
						<u--input type="password" v-model="userInfo.pwd" border="none"></u--input>
					</u-form-item>
					<span class="goregister" @click="goRegister">没有账号？去注册 ></span>
					<u-button type="primary" text="登录" class="submit" @click="submit()"></u-button>
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
		props: ['loginShow', 'registerShow'],
		data() {
			return {
				showSex: false,
				userInfo: {
					username: 'zhangsan',
					pwd: '123456',
				},
				radio: '',
				switchVal: false
			};
		},
		methods: {
			...mapActions(["setUser", "setShowLogin"]),
			close() {
				this.setShowLogin(false);
			},
			goRegister() {
				this.close();
				this.$emit('update:registerShow', true);
			},
			submit() {
				console.log("userInfo:" + JSON.stringify(this.userInfo));
				let username = this.userInfo.username;
				let pwd = this.userInfo.pwd;
				uni.request({
					url: this.$baseUrl + '/api/user/login',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						username: username,
						pwd: pwd
					},
					success: (res) => {
						console.log(JSON.stringify(res.data));
						if (!res.data.errno) {
							this.setUser(res.data.data);
							uni.setStorageSync("userid", res.data.data.id);
							uni.setStorageSync("username", res.data.data.username);
							console.log("getSS:" + uni.getStorageSync("username"));
							uni.$u.toast('登录成功！');
							this.close();
							this.$emit('afterLogin');
						} else {
							uni.$u.toast('登录失败，请检查账号密码是否正确');
						}
					},
					error: (err) => {
						console.log(err);
					}
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// this.$refs.uForm.setRules(this.rules)
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

		.goregister {
			float: right;
			font-size: 14px;
			color: blue;
			text-decoration: underline;
			margin: 10px 0;
		}
	}
</style>