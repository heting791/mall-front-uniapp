<template>
	<view class="cart-content">
		<view class="cart-title">
			<view class="title-count">
				<p>共<span>8</span>件商品</p>
			</view>
			<view class="title-edit-box">
				<view class="box-edit" v-if="edit">
					<u-icon name="edit-pen" size="18"></u-icon>
					<span>编辑</span>
				</view>
				<view class="box-complate" v-else>
					<span>完成</span>
				</view>
			</view>
		</view>
		<view class="cart-content-box">
			<view class="box-list">
				<view class="list-item">
					<view class="item-check">
						<u-icon name="checkmark-circle" size="20"></u-icon>
					</view>
					<view class="item-info">
						<view class="info-img">
							<image src="../../static/index/product1.jpg"></image>
						</view>
						<view class="info-text">
							<view class="text-title">
								三星 Galaxy S21 5G（SM-G9910）双模5G 骁龙888 超高清专业摄像 120Hz护目屏 游戏手机 8G+128G
							</view>
							<view class="text-option">
								雾霾蓝,6GB,256GB
								<u-icon name="arrow-down"></u-icon>
							</view>
							<view class="text-bottom">
								<view class="bottom-price">
									￥6999.99
								</view>
								<view class="bottom-count">
									<u-number-box v-model="count" @change="" button-size="21"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-check">
						<u-icon name="checkmark-circle" size="20"></u-icon>
					</view>
					<view class="item-info">
						<view class="info-img">
							<image src="../../static/index/product1.jpg"></image>
						</view>
						<view class="info-text">
							<view class="text-title">
								三星 Galaxy S21 5G（SM-G9910）双模5G 骁龙888 超高清专业摄像 120Hz护目屏 游戏手机 8G+128G
							</view>
							<view class="text-option">
								<span>雾霾蓝,6GB,256GB</span>
								<u-icon name="arrow-down"></u-icon>
							</view>
							<view class="text-bottom">
								<view class="bottom-price">
									￥6999.99
								</view>
								<view class="bottom-count">
									<u-number-box v-model="count" @change="" button-size="21"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-check">
						<u-icon name="checkmark-circle" size="20"></u-icon>
					</view>
					<view class="item-info">
						<view class="info-img">
							<image src="../../static/index/product1.jpg"></image>
						</view>
						<view class="info-text">
							<view class="text-title">
								三星 Galaxy S21 5G（SM-G9910）双模5G 骁龙888 超高清专业摄像 120Hz护目屏 游戏手机 8G+128G
							</view>
							<view class="text-option">
								<span>雾霾蓝,6GB,256GB</span>
								<u-icon name="arrow-down"></u-icon>
							</view>
							<view class="text-bottom">
								<view class="bottom-price">
									￥6999.99
								</view>
								<view class="bottom-count">
									<u-number-box v-model="count" @change="" button-size="21"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-check">
						<u-icon name="checkmark-circle" size="20"></u-icon>
					</view>
					<view class="item-info">
						<view class="info-img">
							<image src="../../static/index/product1.jpg"></image>
						</view>
						<view class="info-text">
							<view class="text-title">
								三星 Galaxy S21 5G（SM-G9910）双模5G 骁龙888 超高清专业摄像 120Hz护目屏 游戏手机 8G+128G
							</view>
							<view class="text-option">
								<span>雾霾蓝,6GB,256GB</span>
								<u-icon name="arrow-down"></u-icon>
							</view>
							<view class="text-bottom">
								<view class="bottom-price">
									￥6999.99
								</view>
								<view class="bottom-count">
									<u-number-box v-model="count" @change="" button-size="21"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-check">
						<u-icon name="checkmark-circle" size="20"></u-icon>
					</view>
					<view class="item-info">
						<view class="info-img">
							<image src="../../static/index/product1.jpg"></image>
						</view>
						<view class="info-text">
							<view class="text-title">
								三星 Galaxy S21 5G（SM-G9910）双模5G 骁龙888 超高清专业摄像 120Hz护目屏 游戏手机 8G+128G
							</view>
							<view class="text-option">
								<span>雾霾蓝,6GB,256GB</span>
								<u-icon name="arrow-down"></u-icon>
							</view>
							<view class="text-bottom">
								<view class="bottom-price">
									￥6999.99
								</view>
								<view class="bottom-count">
									<u-number-box v-model="count" @change="" button-size="21"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="30" bgColor="#bbb"></u-gap>
		<view class="cart-bottom">
			<view class="cart-bottom-inner">
				<view class="bottom-all">
					<view class="check-all" v-if="!all">
						<u-icon name="checkmark-circle" size="20"></u-icon>
						<span>全选</span>
					</view>
					<view class="deselect-all" v-else>
						<u-icon name="checkmark-circle-fill" color="red" size="20"></u-icon>
						<span>取消全选</span>
					</view>
				</view>
				<view class="bottom-total">
					合计：
					<span class="total-price">￥6999.99</span>
				</view>
				<view class="bottom-button">
					<u-button shape="circle" v-if="edit" text="去结算(5)"
						color="linear-gradient(to right,#FC5332,#F01926)"></u-button>
					<u-button shape="circle" v-else text="删除(5)"
						color="linear-gradient(to right,#FC5332,#F01926)"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 5,
				edit: true,
				all: true
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.cart-content {
		background-color: whitesmoke;

		.cart-title {
			width: 93%;
			height: 25px;
			line-height: 35px;
			margin: 0 auto;
			font-size: 13px;
			

			.title-count {
				display: inline-block;
			}

			.title-edit-box {
				display: inline-block;
				vertical-align: top;
				float: right;

				.box-edit {
					.u-icon {
						display: inline-block;
					}
				}

				.box-complate {
					span {
						color: red;
					}
				}
			}
		}

		.cart-content-box {

			.box-list {
				width: 98%;
				margin: 10px auto;

				.list-item {
					background-color: white;
					margin-bottom: 15px;
					padding: 10px 0;

					.item-check {
						display: inline-block;
						width: 20px;
					}

					.item-info {
						display: inline-block;
						vertical-align: middle;
						width: calc(100% - 20px);

						.info-img {
							display: inline-block;
							width: 80px;
							height: 80px;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.info-text {
							display: inline-block;
							vertical-align: top;
							width: calc(100% - 80px);
							font-size: 13px;

							.text-title {
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							
							.text-option{
								margin: 5px 0;
								.u-icon{
									display: inline-block;
								}
							}
							.text-bottom{
								.bottom-price{
									display: inline-block;
									font-size: 15px;
									font-weight: bolder;
									color: red;
								}
								.bottom-count{
									display: inline-block;
									vertical-align: top;
									float: right;
									margin-right: 3px;
								}
							}
						}
					}
				}
			}
		}

		.cart-bottom {
			position: fixed;
			bottom: 50px;
			width: 100%;
			background-color: white;

			.cart-bottom-inner {
				width: 99%;
				margin: 0 auto;

				.bottom-all {
					display: inline-block;
					font-size: 14px;
					margin-right: 10px;
					margin-top: 10px;

					.u-icon {
						display: inline-block;
						margin-right: 3px;
					}

					span {
						display: inline-block;
						vertical-align: top;
					}
				}

				.bottom-total {
					font-size: 14px;
					display: inline-block;
					vertical-align: top;
					margin-top: 8px;

					.total-price {
						font-size: 18px;
						color: red;
						font-weight: bolder;
					}
				}

				.bottom-button {
					display: inline-block;
					vertical-align: middle;
					float: right;
				}
			}
		}
	}
</style>