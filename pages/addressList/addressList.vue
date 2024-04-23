<template>
	<view class="address-list-content">
		<addressList :manage.sync="manage" :addressList="addressList" :scrollHeight="scrollHeight" :defaultAddress.sync="defaultAddress" :checkedAddress="checkedAddress"></addressList>
		<u-gap height="35" bgColor="white"></u-gap>
		<view class="address-bottom">
			<navigator url="../addressEdit/addressEdit">
				<u-button shape="circle" text="添加收货地址" color="linear-gradient(to right,#FC5332,#F01926)"></u-button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				manage: true,
				addressList: "",
				defaultAddress: "",
				checkedAddress: "",
				scrollHeight: 0
			};
		},
		created() {
			let userid = uni.getStorageSync("userid");
			let info = uni.getSystemInfoSync();
			console.log('设备的屏幕高度：' + info.windowHeight);
			this.scrollHeight = info.windowHeight - 90;
			uni.request({
				url: this.$baseUrl + '/api/address/list?userid=' + userid,
				method: 'GET',
				success: (res) => {
					this.addressList = res.data.data;
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
		},
	}
</script>

<style lang="scss">
	.address-list-content {
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