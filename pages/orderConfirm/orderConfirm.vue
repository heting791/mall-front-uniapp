<template>
	<view class="confirm-content">
		<view class="address-container" @click="addressShow=true"
			:style="checkedAddress!=''?'':'height:60px;line-height:60px;'">
			<view class="address-container-inner" :style="checkedAddress!=''?'padding-top:10px':''">
				<view class="address-icon" :style="checkedAddress!=''?'':'height:50px;'">
					<svg t="1692148685623" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="4282" width="25" height="25">
						<path
							d="M511.449009 213.858462a179.278769 179.278769 0 1 1 0 358.557538 179.278769 179.278769 0 0 1 0-358.557538z m393.294769 179.357538A393.294769 393.294769 0 1 0 182.036086 608.098462l294.203077 392.270769a39.384615 39.384615 0 0 0 70.498462 0l294.754461-392.270769c39.699692-61.912615 63.251692-135.483077 63.251692-214.882462z"
							fill="#d81e06" p-id="4283"></path>
					</svg>
				</view>
				<view class="address-text" v-if="checkedAddress != ''"
					:style="checkedAddress!=''?'line-height:22px;':''">
					<view v-if="checkedAddress.id==defaultAddress.id"
						style="display: inline-block;width: 36px;margin-right: 10px;vertical-align: top;margin-top: 5px;">
						<span><u-tag text="默认" type="error" plain size="mini"></u-tag></span>
					</view>
					<view
						:style="checkedAddress.id==defaultAddress.id?'display: inline-block;width: calc(100% - 50px);vertical-align: top;':''">
						<view class="text-province">{{checkedAddress.area}}</view>
						<view class="text-address-details">{{checkedAddress.deatailad}}</view>
						<view class="text-name">{{checkedAddress.name}} {{checkedAddress.phone}}</view>
					</view>
				</view>
				<view class="address-text" v-else style="width: 80%;">
					<view style="font-size: 16px;width: 100%;text-align: center;">请选择收货地址</view>
				</view>
				<view class="address-right">
					<u-icon name="arrow-right" size="25"></u-icon>
				</view>
			</view>
		</view>
		<view class="order-container">
			<view class="order-list">
				<view class="order-item" v-for="(item, index) in orderList">
					<view class="order-item-inner">
						<view class="product-info">
							<view class="info-img">
								<image :src="item.image"></image>
							</view>
							<view class="info-text">
								<view class="text-title">{{item.title}}
								</view>
								<view class="text-option">{{item.args}}</view>
								<view class="text-bottom">
									<view class="bottom-price">￥{{item.price}}</view>
									<view class="bottom-count">X {{item.count}}</view>
								</view>
							</view>
						</view>
						<view class="other-info">
							<u-cell-group>
								<u-cell title="配送方式" :value="item.delivery" isLink
									@click="changeDelivery(index)"></u-cell>
								<u-cell title="订单备注" :value="item.remark==''?'无备注':item.remark.slice(0,12)" isLink
									@click="changeRemark(index)"></u-cell>
							</u-cell-group>
						</view>
					</view>
				</view>
			</view>
			<view class="confirm-popup-container">
				<view class="action-way">
					<u-action-sheet :actions="wayActions" :round="10" title="配送方式" :show="wayShow" @select="selectWay"
						@close="wayShow = false"></u-action-sheet>
				</view>
				<view class="popup-msg">
					<u-popup :show="msgShow" :round="10" mode="bottom" @close="" @open="">
						<view class="msg-content">
							<view class="popup-title">
								<view class="title">
									订单备注
								</view>
								<view class="popup-close" @click="msgShow = false">X</view>
							</view>
							<view class="popup-content">
								<view class="content-main">
									<textarea placeholder-style="color:gray" placeholder="选填,需与商家协商一致"
										v-model="remark" />
								</view>
								<view class="content-submit">
									<u-button shape="circle" text="确定" color="linear-gradient(to right,#FFC41D,#FF9218)"
										@click="submitRemark"></u-button>
								</view>
							</view>
						</view>
					</u-popup>
				</view>
			</view>
		</view>
		<u-gap height="30" bgColor="white"></u-gap>
		<view class="confirm-bottom">
			<view class="confirm-bottom-inner">
				<view class="bottom-count">
					<span>共<span class="count">{{totalCount}}</span>件</span>
				</view>
				<view class="bottom-right">
					<view class="bottom-total">
						合计：<span class="total">￥{{totalPrice}}</span>
					</view>
					<view class="bottom-button">
						<u-button shape="circle" text="提交订单" color="linear-gradient(to right,#FFC41D,#FF9218)"
							@click="goPay()"></u-button>
					</view>
				</view>
			</view>
		</view>
		<u-popup :round="10" mode="bottom" :show="addressShow" @close="addressShow=false">
			<addressList :addressList="addressList" :defaultAddress.sync="defaultAddress" :orderId="id" :orderIds="ids"
				:checkedAddress.sync="checkedAddress" :manage.sync="manage" :confirm="confirm" @cancel="cancelAddress">
			</addressList>
		</u-popup>
		<u-modal :title="title" :show="modalShow" @confirm="confirmFunc" @cancel="modalShow=false"
			:closeOnClickOverlay="true" :showCancelButton="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgShow: false,
				wayShow: false,
				addressShow: false,
				orderList: [],
				checkedAddress: "",
				defaultAddress: "",
				addressList: "",
				closeable: true,
				manage: true,
				remark: "",
				totalCount: 0,
				totalPrice: 0,
				confirm: true,
				modalShow: false,
				title: "确认支付吗？",
				confirmLen: 0,
				clickIndex: -1,
				id: -1,
				ids: [],
				wayActions: [{
						name: "快递配送"
					},
					{
						name: "到店自取"
					},
					{
						name: "快递配送1"
					},
					{
						name: "到店自取1"
					},
				]
			};
		},
		onLoad(options) {
			let userid = uni.getStorageSync("userid");
			uni.request({
				url: this.$baseUrl + '/api/address/list?userid=' + userid,
				method: 'GET',
				success: (res) => {
					this.addressList = res.data.data;
					console.log("addressList:" + this.addressList);
					for (var i = 0; i < this.addressList.length; i++) {
						if (this.addressList[i].defaultad == 1) {
							this.defaultAddress = this.addressList[i];
							break;
						}
					}
				},
				error: (err) => {
					console.log(err);
				}
			})
			if (options.id) {
				let id = options.id;
				this.id = id;
				uni.request({
					url: this.$baseUrl + '/api/order/details?id=' + id,
					method: 'GET',
					success: (res) => {
						if (res.data.errno) {
							uni.$u.toast('操作失败，请稍后重试');
						} else {
							this.orderList = res.data.data;
							this.handleDefault();
						}
					},
					error: (err) => {
						console.log(err);
					}
				})
			} else {
				if (options.ids) {
					this.ids = options.ids;
					let ids = JSON.parse(options.ids);
					let breakLoop = false;
					console.log("length:" + ids.length);
					for (var i = 0; i < ids.length; i++) {
						if (!breakLoop) {
							uni.request({
								url: this.$baseUrl + '/api/order/details?id=' + ids[i],
								method: 'GET',
								success: (res) => {
									if (res.data.errno) {
										uni.$u.toast('操作失败，请稍后重试');
									} else {
										this.checkOrders(res.data.data[0], ids.length);
									}
								},
								error: (err) => {
									console.log(err);
								}
							})
						}
					}
				}
			}
			if (options.checkedAddressId) {
				this.checkedAddressId = options.checkedAddressId;
			}
		},
		
		created() {},
		methods: {
			handleDefault() {
				this.orderList.forEach(function(item) {
					let image = item.image;
					image = '/' + image;
					item.image = image;
				})
				this.totalCount = this.orderList.length;
				let totalPrice = 0;
				for (var i = 0; i < this.orderList.length; i++) {
					totalPrice += this.orderList[i].ttprice;
				}
				totalPrice = totalPrice.toFixed(2);
				this.totalPrice = totalPrice;
				if (this.checkedAddressId) {
					for (var i = 0; i < this.addressList.length; i++) {
						if (this.checkedAddressId == this.addressList[i].id) {
							this.checkedAddress = this.addressList[i];
							break;
						}
					}
				} else if (this.orderList[0].addressid != 0) {
					for (var i = 0; i < this.addressList.length; i++) {
						if (this.addressList[i].id == this.orderList[0].addressid) {
							this.checkedAddress = this.addressList[i];
							break;
						}
					}
				} else if (this.checkedAddress == "") {
					if (this.defaultAddress != "") {
						this.checkedAddress = this.defaultAddress;
					}
				}
			},
			checkOrders(res, len) {
				this.orderList.push(res);
				if (len == this.orderList.length) {
					this.handleDefault();
				}
			},
			cancelAddress() {
				this.addressShow = false;
			},
			goPay() {
				if (this.checkedAddress == '') {
					uni.$u.toast('请选择收货地址');
				} else {
					this.modalShow = true;
					let interrupt = false;
					for (var i = 0; i < this.orderList.length; i++) {
						if (!interrupt) {
							uni.request({
								url: this.$baseUrl + '/api/order/update?id=' + this.orderList[i].id,
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded',
								},
								data: {
									addressid: this.checkedAddress.id,
									delivery: this.orderList[i].delivery,
									remark: this.orderList[i].remark
								},
								success: (res) => {},
								error: (err) => {
									console.log(err);
								}
							})
						}
					}
				}
			},
			confirmFunc() {
				this.modalShow = false;
				let interrupt = false;
				for (var i = 0; i < this.orderList.length; i++) {
					if (!interrupt) {
						uni.request({
							url: this.$baseUrl + '/api/order/update?id=' + this.orderList[i].id + '&status=1',
							method: 'GET',
							success: (res) => {
								if (res.data.errno) {
									interrupt = true;
								} else {
									this.checkConfirm(true);
								}
							},
							error: (err) => {
								console.log(err);
							}
						})
					}
				}
			},
			checkConfirm(bool) {
				if (bool) {
					this.confirmLen++;
				}
				if (this.confirmLen == this.orderList.length) {
					this.confirmLen = 0;
					uni.$u.toast('支付成功!');
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 1500)
				}
			},
			changeDelivery(index) {
				this.clickIndex = index;
				this.wayShow = true;
			},
			selectWay(obj) {
				console.log("obj:" + JSON.stringify(obj));
				this.orderList[this.clickIndex].delivery = obj.name;
			},
			changeRemark(index) {
				this.clickIndex = index;
				this.remark = this.orderList[index].remark;
				this.msgShow = true;
			},
			submitRemark() {
				this.orderList[this.clickIndex].remark = this.remark;
				this.remark = "";
				this.msgShow = false;
			}
		}
	}
</script>

<style lang="scss">
	.confirm-content {
		background-color: whitesmoke;
		padding-top: 2px;

		.address-container {
			width: 100%;
			height: 100px;
			margin: 5px 0;
			border-radius: 15px;
			background-color: white;

			.address-container-inner {
				width: 95%;
				margin: 10px auto;

				.address-icon {
					display: inline-block;
					vertical-align: middle;
				}

				.address-text {
					display: inline-block;
					vertical-align: middle;
					font-size: 14px;
					margin: 0 5px;
					width: 82%;

					.text-province {
						font-weight: bolder;
					}

					.text-address-details {
						font-weight: bolder;
					}

					.text-name {
						font-size: 13px;
						color: gray;
					}
				}

				.address-right {
					display: inline-block;
					vertical-align: middle;
				}
			}

		}

		.order-container {
			margin-top: 18px;

			.order-list {
				width: 100%;
				margin: 0 auto;

				.order-item {
					width: 100%;
					margin-bottom: 10px;
					background-color: white;
					padding: 7px 0;
					border-radius: 15px;

					.order-item-inner {
						width: 97%;
						margin: 0 auto;

						.product-info {
							margin-bottom: 5px;

							.info-img {
								display: inline-block;
								width: 70px;
								height: 70px;

								image {
									width: 100%;
									height: 100%;
								}
							}

							.info-text {
								display: inline-block;
								vertical-align: top;
								width: calc(100% - 75px);
								margin-left: 5px;
								font-size: 14px;

								.text-title {
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
								}

								.text-option {
									color: gray;
									font-size: 13px;
									margin: 3px 0;
								}

								.text-bottom {
									.bottom-price {
										display: inline-block;
										font-size: 16px;
										font-weight: bolder;
										color: red;
									}

									.bottom-count {
										display: inline-block;
										vertical-align: top;
										float: right;
										border: 1px solid black;
										border-radius: 5px;
										margin-right: 15px;
										padding: 0 5px;
									}
								}
							}
						}
					}
				}
			}

			.confirm-popup-container {
				.popup-msg {
					.msg-content {
						.popup-title {
							width: 98%;
							margin: 5px auto;

							.title {
								display: inline-block;
								width: 95%;
								text-align: center;
							}

							.popup-close {
								display: inline-block;
								vertical-align: top;
							}
						}

						.popup-content {
							.content-main {
								textarea {
									width: 95%;
									margin: 20px auto;
									background-color: whitesmoke;
									border-radius: 20px;
									padding: 5px;
								}
							}

							.content-submit {
								width: 90%;
								margin: 0 auto;
							}
						}
					}
				}
			}
		}

		.confirm-bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
			background-color: white;

			.confirm-bottom-inner {
				width: 97%;
				margin: 0 auto;

				.bottom-count {
					display: inline-block;
					margin-top: 10px;
					font-size: 13px;

					.count {
						color: red;
						margin: 0 3px;
					}
				}

				.bottom-right {
					display: inline-block;
					vertical-align: middle;
					float: right;

					.bottom-total {
						display: inline-block;
						font-size: 13px;
						margin-right: 10px;

						.total {
							font-size: 17px;
							font-weight: bolder;
							color: red;
						}
					}

					.bottom-button {
						display: inline-block;
						vertical-align: middle;

						.u-button {
							width: 105px;
						}
					}
				}
			}
		}
	}
</style>