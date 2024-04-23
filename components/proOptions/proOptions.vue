<template>
	<u-popup :round="10" mode="bottom" :show="optionShow">
		<view class="popup">
			<view class="close" @click="close">X</view>
			<view class="sku-content">
				<view class="content-top">
					<view class="top-img">
						<image :src="totalPassFlag?image:argsList.image"></image>
					</view>
					<view class="top-title">
						<span>{{argsList.title}}</span>
						<p class="che-price" v-if="!totalPassFlag">￥{{argsList.price}}</p>
						<p class="che-price" v-else>￥{{price}}</p>
					</view>
				</view>
				<view class="content-main">
					<view class="sku-box">
						<view class="sku-item" v-for="(item, index) in argsList.tempList">
							<view class="sku-title">
								{{item.name}}
							</view>
							<view class="option-list">
								<li v-for="(items, index1) in item.list" :class="item.checked==items?'cur':''"
									@click="changeOpt(index, index1)">{{items}}</li>
							</view>
						</view>
						<view class="sku-item" v-if="!cartFlag">
							<view class="sku-title">
								购买数量
							</view>
							<view class="count">
								<u-number-box v-model="argsList.count" @change="changeCount"
									button-size="25"></u-number-box>
							</view>
						</view>
					</view>
				</view>
				<view class="content-bottom">
					<view v-if="!cartFlag">
						<view class="button-item">
							<u-button shape="circle" text="加入购物车" color="linear-gradient(to right,#FFC41D,#FF9218)"
								@click="addCart()"></u-button>
						</view>
						<view class="button-item">
							<u-button shape="circle" text="立即购买" color="linear-gradient(to right,#FC5332,#F01926)"
								@click="goBuy()"></u-button>
						</view>
					</view>
					<view v-else>
						<u-button shape="circle" text="确定" color="linear-gradient(to right,#FC5332,#F01926)"
							@click="confirmOpt"></u-button>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "proOptions",
		props: ['optionShow', 'argsList', 'optionPrice', 'optionImage', 'cartFlag', 'checked', 'totalPassFlag'],
		data() {
			return {
				image: "",
				price: ""
			};
		},
		created() {

		},
		watch: {
			optionShow: function(val) {
				if (val == true) {
					if (this.totalPassFlag) {
						this.image = this.argsList.image;
						this.price = this.argsList.price;
					}
				}
			}
		},
		methods: {
			close() {
				this.$emit('update:optionShow', false);
			},
			changeOpt(index, index1) {
				console.log("index:" + index + ",index1:" + index1);
				this.argsList.tempList[index].checked = this.argsList.tempList[index].list[index1];
				this.checked[index] = this.argsList.tempList[index].checked;
				console.log("checked:" + JSON.stringify(this.checked));
				this.$forceUpdate();
				this.checkOpt(index, index1);
			},
			checkOpt(index, index1) {
				let argsassemblyvalue = this.argsList.argsassemblyvalue;
				let argsassemblyvalueList = argsassemblyvalue.split(";");
				let singleValueList = [];
				// console.log("argsassemblyvalueList:" + JSON.stringify(argsassemblyvalueList));
				for (var i = 0; i < argsassemblyvalueList.length; i++) {
					let tempList = argsassemblyvalueList[i].split(",");
					singleValueList.push(tempList);
				}
				console.log("singleValueList:" + JSON.stringify(singleValueList));
				let passFlag = false;
				let totalPassFlag = false;
				let checkedIndex = -1;
				if (this.checked.length == this.argsList.tempList.length) {
					this.$emit('update:checkedOpt', this.checked.toString());
					for (var z = 0; z < this.checked.length; z++) {
						if (this.checked[z] == null || this.checked[z] == '') {
							passFlag = false;
							break;
						}
					}
					if (z >= this.checked.length) {
						passFlag = true;
					}
				}
				console.log("passFlag:" + passFlag);
				if (passFlag) {
					totalPassFlag = true;
					for (var j = 0; j < singleValueList.length; j++) {
						for (var k = 0; k < this.argsList.tempList.length; k++) {
							console.log("singleValueList[j][k]:" + singleValueList[j][k] + ",this.checked[k]:" + this
								.checked[k]);
							if (singleValueList[j][k] != this.checked[k]) {
								break;
							}
						}
						if (k >= this.argsList.tempList.length) {
							checkedIndex = j;
							break;
						} else {

						}
					}
				}
				console.log("totalPassFlag:" + totalPassFlag);
				this.$emit('update:totalPassFlag', totalPassFlag);
				if (totalPassFlag) {
					if (checkedIndex != -1) {
						this.image = '/' + singleValueList[checkedIndex][this.argsList.tempList.length + 1];
						this.price = singleValueList[checkedIndex][this.argsList.tempList.length];
					} else {
						this.image = this.argsList.defaultImage;
						this.price = this.argsList.defaultPrice;
					}
					this.$emit('update:optionPrice', this.price);
					this.$emit('update:optionImage', this.image);
				}
			},
			changeCount(e) {
				console.log("e.value:" + e.value);
				this.$emit('update:count', e.value);
			},
			goBuy() {
				this.$emit('goBuy');
			},
			addCart() {
				this.$emit('addCart');
			},
			confirmOpt() {
				this.$emit('confirmOpt');
			}
		}
	}
</script>

<style lang="scss">
	.popup {
		.close {
			text-align: right;
			margin: 10px;
		}

		.sku-content {
			.content-top {
				width: 95%;
				margin: 0 auto;

				.top-img,
				.top-title {
					display: inline-block;
					vertical-align: top;
				}

				.top-img,
				.top-img image {
					width: 100px;
					height: 100px;
				}

				.top-title {
					width: 65%;
					font-size: 13px;
					margin-left: 10px;

					.che-price {
						font-size: 18px;
						font-weight: bolder;
						color: red;
						margin-top: 10px;
					}
				}
			}

			.content-main {
				margin: 10px;

				.sku-box {
					.sku-item {
						font-size: 15px;
						margin-bottom: 15px;

						.sku-title {
							font-weight: bolder;
							margin: 10px 0;
						}

						.option-list {
							font-size: 13px;

							li {
								list-style: none;
								display: inline-block;
								height: 20px;
								line-height: 20px;
								text-align: center;
								margin-right: 10px;
								margin-bottom: 10px;
								border: 1px solid lightgray;
								padding: 3px 5px;
							}

							li.cur {
								border-color: red;
								color: red;
							}
						}
					}

					.sku-item:last-child {

						.sku-title,
						.count {
							display: inline-block;
							vertical-align: top;
						}

						.count {
							float: right;
						}
					}
				}
			}

			.content-bottom {
				width: 98%;
				margin: 0 auto;

				.button-item {
					display: inline-block;
					vertical-align: top;
					width: 49%;
				}

				.button-item:first-child {
					margin-right: 3px;
				}
			}
		}
	}
</style>