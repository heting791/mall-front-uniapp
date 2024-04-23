<template>
	<view class="order-details-content">
		<view class="content-inner">
			<view class="inner-status">
				<svg t="1692926540160" class="icon" viewBox="0 0 1024 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="4092" width="80" height="80">
					<path
						d="M948.224 534.528V190.464c0-49.152-40.96-90.112-92.16-90.112H167.936c-51.2 0-92.16 40.96-92.16 90.112V821.248c0 57.344 47.104 104.448 104.448 104.448h663.552c57.344 0 104.448-47.104 104.448-104.448v-286.72z m-40.96 145.408H647.168c-34.816 0-61.44-28.672-61.44-61.44s28.672-61.44 61.44-61.44h260.096v122.88zM167.936 141.312h688.128c28.672 0 51.2 22.528 51.2 49.152v30.72c-18.432-14.336-38.912-22.528-63.488-22.528H180.224c-24.576 0-45.056 8.192-63.488 22.528V190.464c0-28.672 22.528-49.152 51.2-49.152z m675.84 741.376H180.224c-34.816 0-63.488-28.672-63.488-63.488V303.104c0-34.816 28.672-63.488 63.488-63.488h663.552c34.816 0 63.488 28.672 63.488 63.488v210.944H647.168c-57.344 0-102.4 47.104-102.4 102.4s47.104 102.4 102.4 102.4h260.096V819.2c0 34.816-28.672 63.488-63.488 63.488z"
						fill="#ffffff" p-id="4093"></path>
					<path d="M659.456 616.448m-28.672 0a28.672 28.672 0 1 0 57.344 0 28.672 28.672 0 1 0-57.344 0Z"
						fill="#ffffff" p-id="4094"></path>
				</svg>
				<span class="status-text">{{order.status1}}</span>
			</view>
			<view class="inner-other">
				<view class="inner-address">
					<view class="address-inner" v-if="order.addressid!=0">
						<view class="address-title">
							{{order.name}} - {{order.phone}}
						</view>
						<view class="address-details">
							{{order.area}} {{order.deatailad}}
						</view>
					</view>
					<view class="address-inner" v-else>
						<view class="address-title">
							暂无收货地址
						</view>
					</view>
				</view>
				<view class="pro-info">
					<proInfo></proInfo>
				</view>
				<view class="order-details-box">
					<view class="box-default">
						<u-cell-group>
							<u-cell title="商品总价" :value="'￥' + order.ttprice"></u-cell>
							<u-cell title="运费" value="¥0.00"></u-cell>
							<u-cell title="运费险" value="¥0.00"></u-cell>
							<u-cell title="实付款" :value="'￥' + order.ttprice"></u-cell>
						</u-cell-group>
					</view>
					<view class="box-hide" v-if="unfold">
						<u-cell-group>
							<u-cell title="订单编号" :value="order.orderid"></u-cell>
							<u-cell title="配送方式" :value="order.delivery"></u-cell>
							<u-cell title="订单备注" :value="order.remark!=''?order.remark:'无备注'"></u-cell>
							<u-cell title="创建时间" :value="order.createtime"></u-cell>
						</u-cell-group>
					</view>
					<view class="box-flag" @click="unfold=!unfold">
						<view class="flag-show" v-if="!unfold">
							<u-icon name="arrow-down"></u-icon>
							<span>展开</span>
						</view>
						<view class="flag-hide" v-else>
							<u-icon name="arrow-up"></u-icon>
							<span>收起</span>
						</view>
					</view>
				</view>
				<u-gap height="30" bgColor="#ffffff"></u-gap>
			</view>
		</view>
		<view class="odetails-bottom">
			<!-- <navigator url="../judgeEdit/judgeEdit"> -->
			<view class="odetails-bottom-inner">
				<u-button type="primary" shape="circle" plain size="mini" text="返回" @click="goBack"></u-button>
			</view>
			<!-- </navigator> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unfold: false,
				order: ''
			};
		},
		onLoad(options) {
			console.log("id:" + options.id);
			let id = options.id;
			uni.request({
				url: this.$baseUrl + '/api/order/details?id=' + id,
				method: 'GET',
				success: (res) => {
					if (res.data.errno) {
						uni.$u.toast('操作失败，请稍后重试');
					} else {
						// console.log("res:" + JSON.stringify(res.data.data));
						let resdata = res.data.data[0];
						let result = res.data.data[0];
						switch(resdata.status) {
							case 0: {
								result.status1 = '待支付';
								break;
							}
							case 1: {
								result.status1 = '待发货';
								break;
							}
							case 2: {
								result.status1 = '待收货';
								break;
							}
							case 3: {
								result.status1 = '待评价';
								break;
							}
							case 4: {
								result.status1 = '已完成';
								break;
							}
						}
						this.order = result;
					}
				},
				error: (err) => {
					console.log(err);
				}
			})
		},
		
		created() {},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.order-details-content {

		.content-inner {
			.inner-status {
				background-color: #F0E68C;
				height: 110px;

				svg {
					display: inline-block;
					margin-left: 20px;
					margin-right: 5px;
				}

				span {
					display: inline-block;
					vertical-align: top;
					margin-top: 32px;
					color: white;
					font-weight: bolder;
				}
			}

			.inner-other {
				background-color: whitesmoke;
				position: absolute;
				width: 100%;

				.inner-address {
					position: relative;
					top: -15px;

					.address-inner {
						width: 90%;
						margin: 0 auto;
						border-radius: 8px;
						background-color: white;
						padding: 10px;
						font-size: 15px;
						line-height: 20px;

						.address-title {
							font-weight: bolder;
							margin-bottom: 5px;
						}

						.address-details {
							font-size: 14px;
						}
					}
				}

				.pro-info {
					width: 95%;
					background-color: white;
					margin: 0 auto;
					padding: 10px 0 1px 0;
					border-radius: 5px;
				}

				.order-details-box {
					margin-top: 15px;

					.box-default,
					.box-hide {
						width: 95%;
						margin: 3px auto;
						border-radius: 5px;
						background-color: white;
					}

					.box-flag {
						width: 95%;
						margin: 0 auto;
						border-radius: 5px;
						background-color: white;
						text-align: center;

						.u-icon {
							display: inline-block;
						}

						span {
							display: inline-block;
							vertical-align: top;
							font-size: 13px;
						}
					}
				}
			}
		}

		.odetails-bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: white;

			.odetails-bottom-inner {
				width: 100px;
				height: 30px;
				margin: 0 auto;

				.u-button {
					height: 100%;
				}
			}
		}
	}
</style>