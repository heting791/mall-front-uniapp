<template>
	<view class="address-list-content">
		<view class="address-list-title">
			<view class="address-list-title-inner" @click="goManage()">
				<view class="cancel" @click="cancel()" v-if="confirm">取消</view>
				<view class="manage" v-if="manage && addressList.length>0">管理</view>
				<view class="complate" v-else-if="addressList.length>0">完成</view>
			</view>
		</view>
		<view class="address-list-container">
			<scroll-view :style="{height: scrollHeight + 'px'}" scroll-y="true"
				v-if="addressList.length>0">
				<view class="address-item default-address" v-if="defaultAddress != ''">
					<view class="item-inner">
						<view class="address-top">
							<view class="map-icon"
								v-if="confirm && checkedAddress!='' && checkedAddress.id==defaultAddress.id"
								@click="changeCheck(defaultAddress.id, false)">
								<u-icon name="checkmark-circle-fill" color="red" size="25"></u-icon>
							</view>
							<view class="map-icon" v-else-if="confirm" @click="changeCheck(defaultAddress.id, true)">
								<u-icon name="checkmark-circle" size="25"></u-icon>
							</view>
							<view class="map-icon" v-else>
								<u-icon name="home-fill" color="red" size="25"></u-icon>
							</view>
							<view class="item-text">
								<view class="text-name">
									<span
										style="font-weight: bolder;font-size: 18px;color: blue;">{{defaultAddress.id}}</span>
									- <span v-if="confirm"
										style="display: inline-block;width: 36px;margin-right: 10px;"><u-tag text="默认"
											type="error" plain size="mini"></u-tag></span>{{defaultAddress.name}} -
									{{defaultAddress.phone}}
								</view>
								<view class="text-address">
									{{defaultAddress.area}} {{defaultAddress.deatailad}}
								</view>
							</view>
							<view class="item-edit" @click="goEdit(defaultAddress.id)">
								<u-icon name="edit-pen" size="20"></u-icon>
							</view>
						</view>
						<view class="address-operate" v-if="!manage">
							<view class="set-default" @click="setDefault(defaultAddress.id)">
								<u-icon name="checkmark-circle-fill" color="red" size="20"></u-icon>
								<span>设为默认</span>
							</view>
							<view class="single-delete" @click="del(defaultAddress.id)">删除</view>
						</view>
					</view>
				</view>
				<view class="address-item" v-for="item in addressList" v-if="item.id!=defaultAddress.id">
					<view class="item-inner">
						<view class="address-top">
							<view class="map-icon" v-if="confirm && checkedAddress!='' && checkedAddress.id == item.id"
								@click="changeCheck(item.id, false)">
								<u-icon name="checkmark-circle-fill" color="red" size="25"></u-icon>
							</view>
							<view class="map-icon" v-else-if="confirm" @click="changeCheck(item.id, true)">
								<u-icon name="checkmark-circle" size="25"></u-icon>
							</view>
							<view class="map-icon" v-else>
								<u-icon name="map-fill" color="red" size="25"></u-icon>
							</view>
							<view class="item-text">
								<view class="text-name">
									<span style="font-weight: bolder;font-size: 18px;color: blue;">{{item.id}}</span> -
									{{item.name}} - {{item.phone}}
								</view>
								<view class="text-address">
									{{item.area}} {{item.deatailad}}
								</view>
							</view>
							<view class="item-edit">
								<u-icon name="edit-pen" size="20" @click="goEdit(item.id)"></u-icon>
							</view>
						</view>
						<view class="address-operate" v-if="!manage">
							<view class="set-default" @click="setDefault(item.id)">
								<u-icon name="checkmark-circle" size="20"></u-icon>
								<span>设为默认</span>
							</view>
							<view class="single-delete" @click="del(item.id)">删除</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view v-else>
				<u-empty mode="address" style="margin-bottom: 10px;"></u-empty>
			</view>
			<u-button type="primary" :plain="true" text="添加收货地址" v-if="confirm" @click="goNew"
				style="margin: 0 auto;width: 200px;"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "addressList",
		props: ['manage', 'scrollHeight', 'addressList', 'defaultAddress', 'checkedAddress', "confirm", "orderId", "orderIds"],
		data() {
			return {

			};
		},
		created() {},
		methods: {
			goManage() {
				this.$emit("update:manage", !this.manage);
			},
			cancel() {
				this.$emit("cancel");
			},
			goEdit(id) {
				console.log("id:" + id);
				console.log("confirm:" + this.confirm);
				if (this.confirm) {
					if (this.orderId != '-1') {
						uni.navigateTo({
							url: '/pages/addressEdit/addressEdit?addressid=' + id + '&confirm=' + this.confirm +
								'&orderId=' + this.orderId
						})
					} else {
						uni.navigateTo({
							url: '/pages/addressEdit/addressEdit?addressid=' + id + '&confirm=' + this.confirm + '&orderIds=' + this.orderIds
						})
					}
				} else {
					uni.navigateTo({
						url: '/pages/addressEdit/addressEdit?addressid=' + id
					})
				}
			},
			goNew() {
				if (this.confirm) {
					if (this.orderId != '-1') {
						uni.navigateTo({
							url: '/pages/addressEdit/addressEdit?confirm=' + this.confirm +
								'&orderId=' + this.orderId
						})
					} else {
						uni.navigateTo({
							url: '/pages/addressEdit/addressEdit?confirm=' + this.confirm + '&orderIds=' + this.orderIds
						})
					}
				} else {
					uni.navigateTo({
						url: '/pages/addressEdit/addressEdit'
					})
				}
			},
			setDefault(id) {
				let addressList = this.addressList;
				let address = {};
				let index = -1;
				for (var i = 0; i < addressList.length; i++) {
					if (addressList[i].id == id) {
						address = addressList[i];
						index = i;
						break;
					}
				}
				if (address.defaultad == 0) {
					for (var i = 0; i < addressList.length; i++) {
						this.addressList[i].defaultad = 0;
					}
				}
				address.defaultad = address.defaultad ? 0 : 1;
				this.addressList[index].defaultad = address.defaultad;
				if (address.defaultad == 1) {
					this.$emit('update:defaultAddress', address);
				} else {
					this.$emit('update:defaultAddress', "");
				}
				console.log("defaultAddress:" + JSON.stringify(this.defaultAddress));
				uni.request({
					url: this.$baseUrl + '/api/address/addressUpdate?id=' + id + '&userid=' + uni.getStorageSync(
						"userid"),
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						area: address.area,
						name: address.name,
						deatailad: address.deatailad,
						phoneprefix: address.phoneprefix,
						phone: address.phone,
						tag: address.tag,
						defaultad: address.defaultad ? 1 : 0
					},
					success: (res) => {
						console.log("res:" + JSON.stringify(res.data));
						if (res.data.errno) {
							uni.$u.toast('操作失败，请稍后重试')
						}
					},
					error: (err) => {
						console.log(err);
					}
				})
			},
			del(id) {
				uni.request({
					url: this.$baseUrl + '/api/address/deleteAddress?id=' + id,
					method: 'GET',
					success: (res) => {
						if (res.data.errno) {
							uni.$u.toast('操作失败，请稍后重试')
						} else {
							for (var i = 0; i < this.addressList.length; i++) {
								if (this.addressList[i].id == id) {
									this.addressList.splice(i, 1);
									break;
								}
							}
							if (id == this.defaultAddress.id) {
								this.$emit('update:defaultAddress', "");
							}
							uni.$u.toast('删除成功')
						}
					},
					error: (err) => {
						console.log(err);
					}
				})
			},
			changeCheck(id, bool) {
				let addressList = this.addressList;
				let address = {};
				let index = -1;
				for (var i = 0; i < addressList.length; i++) {
					if (addressList[i].id == id) {
						address = addressList[i];
						index = i;
						break;
					}
				}
				if (bool) {
					this.$emit('update:checkedAddress', address);
					this.$emit("cancel");
				} else {
					this.$emit('update:checkedAddress', "");
				}
				console.log("checkedAddress:" + JSON.stringify(this.checkedAddress));
			}
		}
	}
</script>

<style lang="scss">
	.address-list-content {
		padding-top: 10px;

		.address-list-title {

			width: 95%;
			margin: 0 auto;
			height: 30px;

			.address-list-title-inner {
				font-size: 13px;
				color: red;

				.cancel {
					float: left;
					width: 48%;
				}

				.manage,
				.complate {
					float: right;
				}
			}
		}

		.address-list-container {
			font-size: 14px;
			background-color: whitesmoke;
			padding-top: 5px;

			.address-item {
				width: 100%;
				margin: 10px auto;
				background-color: white;
				border-radius: 10px;
				padding: 10px 0;

				.item-inner {
					width: 95%;
					margin: 0 auto;

					.address-top {
						.map-icon {
							display: inline-block;
						}

						.item-text {
							display: inline-block;
							vertical-align: middle;
							width: 83%;
							margin: 0 1.5%;

							.text-name {
								font-weight: bolder;
								font-size: 15px;
							}
						}

						.item-edit {
							display: inline-block;
							vertical-align: middle;
							float: right;
							margin-top: 10px
						}
					}

					.address-operate {
						border-top: 1px solid gray;
						margin-top: 5px;
						padding-top: 5px;

						.set-default {
							display: inline-block;

							.u-icon {
								display: inline-block;
							}

							span {
								display: inline-block;
								vertical-align: top;
							}
						}

						.single-delete {
							display: inline-block;
							vertical-align: top;
							float: right;
						}
					}
				}
			}
		}

		.address-bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
			background: white;

			.u-button {
				width: 98%;
				margin: 0 auto;
			}
		}
	}
</style>