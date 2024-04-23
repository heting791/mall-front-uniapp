<template>
	<view class="order-list-content">
		<view v-if="orderList.length>0">
			<view class="content-list">
				<ul>
					<proInfo :oList="true" :list="orderList" @changeStatus="changeStatus" @goDetails="goDetails">
					</proInfo>
				</ul>
			</view>
			<u-gap height="30" bgColor="#ffffff"></u-gap>
			<view class="content-bottom">
				<u-button type="primary" shape="circle" plain size="mini" text="返回" @click="goBack"></u-button>
			</view>
			<u-modal :title="confirmTitle" :show="modalShow" @confirm="confirmFunc" @cancel="modalShow=false"
				:closeOnClickOverlay="true" :showCancelButton="true"></u-modal>
		</view>
		<view v-else style="margin-top: 30%;">
			<u-empty mode="order"></u-empty>
			<u-button type="primary" text="去购物" style="width: 150px;margin-top: 20px;" @click="goShopping"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [],
				confirmTitle: "",
				modalShow: false,
				clickedId: -1,
				clickedStatus: -1,
				options: {},
				statusButtons: [{
					name: '待支付',
					code: 0,
					list: [{
						name: '去支付',
						url: '/pages/orderConfirm/orderConfirm'
					}]
				}, {
					name: '待发货',
					code: 1,
					list: [{
						name: '发货',
						url: ''
					}]
				}, {
					name: '待收货',
					code: 2,
					list: [{
						name: '确认收货',
						url: ''
					}]
				}, {
					name: '待评价',
					code: 3,
					list: [{
						name: '去评价',
						url: '/pages/judgeEdit/judgeEdit'
					}]
				}, {
					name: '已完成',
					code: 4,
					list: [{
						name: '返回',
						url: ''
					}]
				}]
			};
		},
		onLoad(options) {
			this.initData(options);
		},
		created() {},
		methods: {
			initData(options) {
				let userid = uni.getStorageSync("userid");
				this.options = options;
				if (options.status) {
					let status = options.status;
					console.log("status:" + status);
					uni.request({
						url: this.$baseUrl + '/api/order/list?userid=' + userid + '&status=' + status,
						method: 'GET',
						success: (res) => {
							if (res.data.errno) {
								uni.$u.toast('操作失败，请稍后重试');
							} else {
								this.handleDefault(res.data.data);
							}
						},
						error: (err) => {
							console.log(err);
						}
					})
				} else {
					let status = options.status;
					uni.request({
						url: this.$baseUrl + '/api/order/list?userid=' + userid,
						method: 'GET',
						success: (res) => {
							if (res.data.errno) {
								uni.$u.toast('操作失败，请稍后重试');
							} else {
								this.handleDefault(res.data.data);
							}
						},
						error: (err) => {
							console.log(err);
						}
					})
				}
			},
			handleDefault(data) {
				data.forEach(function(item) {
					item.image = '/' + item.image;
					// this.statusButtons.forEach(function(items) {
					// 	if (item.status == items.code) {
					// 		console.log("yes!code:" + items.code);
					// 	}
					// })
				})
				for (var i = 0; i < data.length; i++) {
					for (var j = 0; j < this.statusButtons.length; j++) {
						if (this.statusButtons[j].code == data[i].status) {
							data[i].buttontxt = this.statusButtons[j].list;
							data[i].statustxt = this.statusButtons[j].name;
						}
					}
				}
				this.orderList = data;
			},
			goDetails(id) {
				console.log("id:" + id);
				uni.navigateTo({
					url: '/pages/orderDetails/orderDetails?id=' + id
				})
			},
			changeStatus(id, btnIndex) {
				console.log("id:" + id + ",btnIndex:" + btnIndex);
				this.clickedId = id;
				let status = -1;
				this.orderList.forEach(function(item) {
					if (item.id == id) {
						status = item.status;
					}
				})
				console.log("status:" + status);
				this.clickedStatus = status;
				let list = "";
				this.statusButtons.forEach(function(item) {
					if (item.code == status) {
						list = item.list;
					}
				})
				console.log("list:" + JSON.stringify(list));
				let btn = list[btnIndex];
				if (btn.url != "") {
					uni.navigateTo({
						url: btn.url + '?id=' + id
					})
				} else {
					if (btn.name == '发货') {
						this.confirmTitle = '确认发货吗？';
					} else if (btn.name == '收货') {
						this.confirmTitle = '确认收货吗？';
					} else {
						uni.navigateBack();
					}
					this.modalShow = true;
				}
			},
			confirmFunc() {
				this.modalShow = false;
				uni.request({
					url: this.$baseUrl + '/api/order/update?id=' + this.clickedId + '&status=' + (this
						.clickedStatus + 1),
					method: 'GET',
					success: (res) => {
						if (!res.data.errno) {
							// for (var i = 0; i < this.orderList.length; i++) {
							// 	if (this.orderList[i].id == this.clickedId) {
							// 		this.orderList.splice(i, 1);
							// 		break;
							// 	}
							// }
							uni.$u.toast('操作成功！');
							let that = this;
							setTimeout(function() {
								let options = that.options;
								if (options.status) {
									uni.redirectTo({
										url: '/pages/orderList/orderList?status=' + options
											.status
									})
								} else {
									uni.redirectTo({
										url: '/pages/orderList/orderList'
									})
								}
							}, 1000)
						} else {
							uni.$u.toast('操作失败，请稍后重试');
						}
					},
					error: (err) => {
						console.log(err);
					}
				})
			},
			goBack() {
				uni.switchTab({
					url: '/pages/my/my'
				})
			},
			goShopping() {
				uni.navigateTo({
					url: '/pages/productLists/productLists'
				})
			}
		}
	}
</script>

<style lang="scss">
	.order-list-content {
		margin-top: 10px;

		.content-list {
			ul {
				margin: 0;
				padding: 0;


			}
		}

		.content-bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 30px;
			background-color: white;

			.u-button {
				width: 100px;
				height: 30px;
				margin: 0 auto;
			}
		}
	}
</style>