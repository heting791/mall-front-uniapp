<template>
	<view v-if="!judgeFlag">
		<li class="list-item" v-for="item in list">
			<view class="item-inner">
				<view @click="goDetails(item.id)">
					<view class="pro-info">
						<view class="info-img" :class="[judgeFlag ? 'judgeImg' : '']">
							<image :src="item.image"></image>
						</view>
						<view class="info-text">
							<view class="text-title">
								<span style="font-weight: bolder;font-size: 18px;color: blue;">{{item.id}}</span>
								-{{item.title}}
							</view>
							<view class="text-option">
								{{item.args}}
							</view>
							<view class="text-price" v-if="!judgeFlag">
								￥{{item.price}}
							</view>
							<view class="text-count" v-if="!judgeFlag">
								X{{item.count}}
							</view>
						</view>
					</view>
					<view class="item-status" v-if="oList">
						<p>{{item.statustxt}}</p>
					</view>
				</view>
				<view class="item-operate" v-if="oList">
					<u-button type="primary" shape="circle" plain v-for="(items, index) in item.buttontxt" size="mini" :text="items.name" @click="changeStatus(item.id, index)"></u-button>
				</view>
			</view>
		</li>
	</view>
	<view v-else>
		<view class="list-item">
			<view class="item-inner">
				<view>
					<view class="pro-info">
						<view class="info-img" :class="[judgeFlag ? 'judgeImg' : '']">
							<image :src="product.image"></image>
						</view>
						<view class="info-text">
							<view class="text-title">
								<span style="font-weight: bolder;font-size: 18px;color: blue;">{{product.productid}}</span>
								-{{product.title}}
							</view>
							<view class="text-option">
								{{product.args}}
							</view>
							<view class="text-price" v-if="!judgeFlag">
								￥{{product.price}}
							</view>
							<view class="text-count" v-if="!judgeFlag">
								X{{product.count}}
							</view>
						</view>
					</view>
					<view class="item-status" v-if="oList">
						<p>{{item.statustxt}}</p>
					</view>
				</view>
				<view class="item-operate" v-if="oList">
					<u-button type="primary" shape="circle" plain v-for="(items, index) in item.buttontxt" size="mini" :text="items.name" @click="changeStatus(item.id, index)"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "proInfo",
		props: ['oList', 'judgeFlag', 'list', 'product'],
		data() {
			return {

			};
		},
		methods: {
			changeStatus(id, btnIndex){
				this.$emit('changeStatus', id, btnIndex);
			},
			goDetails(id) {
				this.$emit('goDetails', id);
			}
		}
	}
</script>

<style lang="scss">
	li {
		list-style: none;
	}

	.list-item {
		margin-bottom: 10px;

		.item-inner {
			width: 95%;
			margin: 0 auto;

			.pro-info {
				.info-img {
					display: inline-block;
					width: 80px;
					height: 80px;
					margin-right: 5px;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.judgeImg {
					width: 70px;
					height: 70px;
				}

				.info-text {
					display: inline-block;
					vertical-align: top;
					font-size: 13px;
					width: calc(100% - 88px);

					.text-title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.text-option {
						margin: 3px 0;
					}

					.text-price {
						font-size: 15px;
						font-weight: bolder;
						color: red;
					}

					.text-count {
						border: 1px solid gray;
						border-radius: 5px;
						padding: 2px 5px;
						float: right;
					}
				}
			}

			.item-status {
				width: 100%;
				height: 35px;
				line-height: 35px;
				padding-left: 10px;
				margin: 10px 0;
				background-color: whitesmoke;
				border-radius: 10px;
				font-size: 13px;
				font-weight: bolder;
			}

			.item-operate {
				width: 100%;
				height: 40px;

				.u-button {
					width: 60px;
					float: right;
				}
			}
		}
	}
</style>