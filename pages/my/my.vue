<template>
	<view class="my-content">
		<view class="personal-info">
			<view class="info-avatar">
				<u-avatar size="50"></u-avatar>
			</view>
			<view class="info-text">
				<view v-if="username!=''">
					<view class="text-username" style="margin-top: 10px;">{{username}}</view>
					<view class="text-username" style="margin-top: 15px;">
						<span class="gologin" @click="logout()">退出登录</span>
						<span class="gologin" style="margin-left: 10px;" @click="goLogin()">切换账号</span>
					</view>
				</view>
				<view v-else>
					<view class="text-username" style="margin-top: 10px;">未登录</view>
					<view class="text-username" style="margin-top: 15px;">
						<span class="gologin" @click="goLogin()">去登录 ></span>
						<span class="gologin" style="margin-left: 15px;" @click="goRegister()">注册 ></span>
					</view>
				</view>
			</view>
		</view>
		<view class="my-common" style="display: none;">
			<u-grid :border="true" col="4">
				<u-grid-item @click="goFav()">
					<u-icon name="star" size="32"></u-icon>
					<text class="grid-text">收藏</text>
					<view class="my-dot">
						<u-badge :isDot="true"></u-badge>
					</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="checkmark" size="32" color="#d3d3d3"></u-icon>
					<text class="grid-text" style="color: #d3d3d3;">订阅店铺</text>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="eye" size="32" color="#d3d3d3"></u-icon>
					<text class="grid-text" style="color: #d3d3d3;">足迹</text>
				</u-grid-item>
				<u-grid-item>
					<svg t="1692087624762" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="4399" width="32" height="32">
						<path
							d="M828.245333 874.666667h-533.333333a149.504 149.504 0 0 1-149.333333-149.333334V341.333333a149.504 149.504 0 0 1 149.333333-149.333333h533.333333a21.333333 21.333333 0 0 1 0 42.666667h-533.333333a106.752 106.752 0 0 0-106.666667 106.666666v384a106.752 106.752 0 0 0 106.666667 106.666667h533.333333a42.666667 42.666667 0 0 0 42.666667-42.666667v-23.253333a21.333333 21.333333 0 0 1 42.666667 0v23.253333a85.461333 85.461333 0 0 1-85.333334 85.333334z"
							fill="#d3d3d3" p-id="4400"></path>
						<path
							d="M892.245333 412.117333a21.333333 21.333333 0 0 1-21.333333-21.333333v-28.16a42.666667 42.666667 0 0 0-42.666667-42.666667h-533.333333a21.333333 21.333333 0 0 1 0-42.666666h533.333333a85.461333 85.461333 0 0 1 85.333334 85.333333v28.16a21.333333 21.333333 0 0 1-21.333334 21.333333zM892.245333 704h-192a128 128 0 1 1 0-256h192a64.085333 64.085333 0 0 1 64 64v128a64.085333 64.085333 0 0 1-64 64z m-192-213.333333a85.333333 85.333333 0 1 0 0 170.666666h192a21.376 21.376 0 0 0 21.333334-21.333333v-128a21.376 21.376 0 0 0-21.333334-21.333333z"
							fill="#d3d3d3" p-id="4401"></path>
						<path
							d="M710.912 597.333333a21.461333 21.461333 0 0 1-10.666667-2.858666 22.314667 22.314667 0 0 1-32-18.474667 32 32 0 0 1 64 0 21.333333 21.333333 0 0 1-21.333333 21.333333z"
							fill="#d3d3d3" p-id="4402"></path>
						<path
							d="M700.245333 608a32.042667 32.042667 0 0 1-32-32 22.357333 22.357333 0 0 1 32-18.517333 22.314667 22.314667 0 0 1 32 18.517333 32.042667 32.042667 0 0 1-32 32z"
							fill="#d3d3d3" p-id="4403"></path>
					</svg>
					<text class="grid-text" style="color: #d3d3d3;">零钱</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="my-order">
			<u-cell-group>
				<u-cell title="我的订单" value="更多" isLink url="../orderList/orderList"></u-cell>
			</u-cell-group>
			<view class="order-cate">
				<u-grid :border="true" col="5">
					<u-grid-item @click="goOrderList(0)">
						<u-icon name="rmb-circle" size="25"></u-icon>
						<text class="grid-text">待付款</text>
						<view class="my-badge">
							<u-badge max="99" :value="statusList[0].length"></u-badge>
						</view>
					</u-grid-item>
					<u-grid-item @click="goOrderList(1)">
						<u-icon name="car" size="30"></u-icon>
						<text class="grid-text">待发货</text>
						<view class="my-badge">
							<u-badge max="99" :value="statusList[1].length"></u-badge>
						</view>
					</u-grid-item>
					<u-grid-item @click="goOrderList(2)">
						<u-icon name="checkmark-circle" size="25"></u-icon>
						<text class="grid-text">待收货</text>
						<view class="my-badge">
							<u-badge max="99" :value="statusList[2].length"></u-badge>
						</view>
					</u-grid-item>
					<u-grid-item @click="goOrderList(3)">
						<u-icon name="chat" size="30"></u-icon>
						<text class="grid-text">待评价</text>
						<view class="my-badge">
							<u-badge max="99" :value="statusList[3].length"></u-badge>
						</view>
					</u-grid-item>
					<u-grid-item @click="goOrderList(4)">
						<!-- <svg t="1700711306240" class="icon" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="4382" width="25" height="25">
							<path
								d="M704.13 576.11c42.74 0 82.92 16.64 113.14 46.86s46.86 70.4 46.86 113.14-16.64 82.92-46.86 113.14-70.4 46.86-113.14 46.86-82.91-16.65-113.13-46.87-46.86-70.4-46.86-113.14 16.64-82.92 46.86-113.14c30.22-30.21 70.39-46.85 113.13-46.85m0-64c-123.71 0-224 100.29-224 224s100.29 224 224 224 224-100.29 224-224-100.29-224-224-224zM641.01 223.5h-362c-17.67 0-32 14.33-32 32s14.33 32 32 32h362c17.67 0 32-14.33 32-32s-14.33-32-32-32zM542.77 400.75H279.01c-17.67 0-32 14.33-32 32s14.33 32 32 32h263.76c17.67 0 32-14.33 32-32s-14.33-32-32-32zM369.76 578h-90.75c-17.67 0-32 14.33-32 32s14.33 32 32 32h90.75c17.67 0 32-14.33 32-32s-14.33-32-32-32z"
								p-id="4383" fill="#2c2c2c"></path>
							<path
								d="M411.42 960h-198.4c-61.76 0-112-50.24-112-112V176c0-61.76 50.24-112 112-112H707c61.76 0 112 50.24 112 112v242.21c0 17.67-14.33 32-32 32s-32-14.33-32-32V176c0-26.47-21.53-48-48-48H213.02c-26.47 0-48 21.53-48 48v672c0 26.47 21.53 48 48 48h198.4c17.67 0 32 14.33 32 32s-14.33 32-32 32z"
								p-id="4384" fill="#2c2c2c"></path>
							<path
								d="M688.56 827.75c-1.53 0-3.06-0.07-4.6-0.21-14.62-1.3-28.07-8.78-36.91-20.5l-47.97-63.65c-10.64-14.11-7.82-34.18 6.3-44.81 14.11-10.64 34.18-7.82 44.81 6.3l39.98 53.05 91.72-84.94c12.97-12.01 33.21-11.23 45.22 1.74 12.01 12.97 11.23 33.21-1.74 45.22L723.91 813.9a52.096 52.096 0 0 1-35.35 13.85z"
								p-id="4385" fill="#2c2c2c"></path>
						</svg> -->
						<image src="../../static/icon/order-confirm.png" style="width: 25px;height: 25px;"></image>
						<text class="grid-text">已完成</text>
						<view class="my-badge">
							<u-badge max="99" :value="statusList[4].length"></u-badge>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="my-other">
			<u-cell-group>
				<u-cell title="我的收货地址" @click="goAddressList"></u-cell>
				<u-cell title="我的收藏" @click="goFav"></u-cell>
				<u-cell title="关于我们" @click="goAbout"></u-cell>
			</u-cell-group>
		</view>
		<login :loginShow="loginShow" :registerShow.sync="registerShow" @afterLogin="afterLogin"></login>
		<register :registerShow.sync="registerShow" :loginShow="loginShow"></register>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				registerShow: false,
				statusOrder: [],
				statusList: [{
					name: "noPay",
					code: 0,
					length: 0
				}, {
					name: "noDelivery",
					code: 1,
					length: 0
				}, {
					name: "noReceive",
					code: 2,
					length: 0
				}, {
					name: "noJudge",
					code: 3,
					length: 0
				}, {
					name: "complate",
					code: 4,
					length: 0
				}],
				username: ""
			}
		},
		computed: {
			...mapGetters(["getUser", "getLoginShow"]),
			loginShow: {
				get() {
					return this.$store.getters.getLoginShow;
				}
			}
		},
		onShow() {
			this.initData();
		},

		created() {
			this.initData();
		},
		methods: {
			...mapActions(["setUser", "setShowLogin"]),
			initData() {
				if (uni.getStorageSync("userid") == '') {
					uni.$u.toast('未登录，请先登录');
					// this.setShowLogin(true);
					this.username = "";
					this.statusList.forEach(function(item) {
						item.length = 0;
					})
				} else {
					let userid = uni.getStorageSync("userid");
					this.username = uni.getStorageSync("username");
					let statusOrder = this.statusOrder;
					for (var i = 0; i < 5; i++) {
						uni.request({
							url: this.$baseUrl + '/api/order/list?userid=' + userid + '&status=' + i,
							method: 'GET',
							success: (res => {
								if (!res.data.errno) {
									if (res.data.data.length > 0) {
										this.handleDefault(res.data.data[0].status, res.data.data
											.length);
									}
								}
							}),
							error: (err => {
								console.log(err);
							})
						})
					}
				}
			},
			goLogin() {
				this.setShowLogin(true);
			},
			handleDefault(status, length) {
				this.statusList.forEach(function(item) {
					if (item.code == status) {
						item.length = length;
					}
				})
			},
			goRegister() {
				this.registerShow = true;
			},
			logout() {
				this.setUser("");
				uni.setStorageSync("userid", "");
				uni.setStorageSync("username", "");
				uni.$u.toast('退出成功');
				this.initData();
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			goAddressList() {
				if (uni.getStorageSync("userid") == '') {
					uni.$u.toast('未登录，请先登录');
					this.setShowLogin(true);
				} else {
					uni.navigateTo({
						url: '/pages/addressList/addressList'
					})
				}
			},
			goFav() {
				if (uni.getStorageSync("userid") == '') {
					uni.$u.toast('未登录，请先登录');
					this.setShowLogin(true);
				} else {
					uni.navigateTo({
						url: '/pages/productLists/productLists?fav=true'
					})
				}
			},
			goOrderList(status) {
				uni.navigateTo({
					url: '/pages/orderList/orderList?status=' + status
				})
			},
			afterLogin() {
				this.initData();
			}
		}
	}
</script>

<style lang="scss">
	.my-content {
		.personal-info {
			width: 90%;
			margin: 10px auto;

			.info-avatar {
				display: inline-block;
				margin-right: 15px;
			}

			.info-text {
				display: inline-block;
				vertical-align: top;

				.gologin {
					cursor: pointer;
					font-size: 14px;
					color: blue;
					text-decoration: underline;
				}
			}
		}

		.my-common {
			margin: 20px auto;
		}

		.my-order {
			.order-cate {
				margin: 10px auto;
			}
		}

		.my-badge {
			position: absolute;
			right: 18%;
			top: -5px;
		}

		.my-dot {
			position: absolute;
			right: 25%;
			top: 2px;
		}
	}
</style>