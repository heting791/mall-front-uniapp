<template>
	<view class="cart-content" :style="products.length>0?'background-color: whitesmoke;':''">
		<u-sticky v-if="products.length>0">
			<view class="cart-title">
				<view class="cart-title-inner">
					<view class="title-count">
						<p>共<span>{{totalCount}}</span>件商品</p>
					</view>
					<view class="title-edit-box" @click="changeEdit">
						<view class="box-edit" v-if="edit">
							<u-icon name="edit-pen" size="18"></u-icon>
							<span>编辑</span>
						</view>
						<view class="box-complate" v-else>
							<span>完成</span>
						</view>
					</view>
				</view>
			</view>
		</u-sticky>
		<view class="cart-content-box" v-if="products.length>0">
			<proList :cartFlag="true" :products="products" :edit.sync="edit" @showOpt="showOpt"
				@statistics="statistics"></proList>
		</view>
		<view class="cart-content-box" v-else style="margin-top: 40%;">
			<u-empty mode="car">
			</u-empty>
			<u-button type="primary" text="去购物" @click="goList" style="width: 200px;margin: 20px auto;" v-if="!logined"></u-button>
			<u-button type="primary" text="去登录" @click="goLogin" style="width: 200px;margin: 20px auto;" v-else></u-button>
		</view>
		<u-gap height="30" bgColor="white"></u-gap>
		<view class="cart-bottom" v-if="products.length>0">
			<view class="cart-bottom-inner">
				<view class="bottom-all" @click="changeAll">
					<view class="check-all" v-if="!isAllChecked">
						<u-icon name="checkmark-circle" size="20"></u-icon>
						<span>全选</span>
					</view>
					<view class="deselect-all" v-else>
						<u-icon name="checkmark-circle-fill" color="red" size="20"></u-icon>
						<span>取消全选</span>
					</view>
				</view>
				<view class="bottom-total" v-if="edit">
					合计：
					<span class="total-price">￥{{totalPrice}}</span>
				</view>
				<view class="bottom-button">
					<u-button shape="circle" :text="buttonText" color="linear-gradient(to right,#FC5332,#F01926)"
						@click="goTotal"></u-button>
				</view>
			</view>
		</view>
		<proOptions :optionShow.sync="optionShow" :cartFlag="cartFlag" :checked="checked"
			:totalPassFlag.sync="totalPassFlag" :optionPrice.sync="optionPrice" :optionImage.sync="optionImage"
			:checkedOpt.sync="checkedOpt" :count.sync="count" :argsList="argsList" @confirmOpt="confirmOpt()">
		</proOptions>
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
				edit: true,
				optionShow: false,
				registerShow: false,
				buttonText: "",
				optionPrice: 0,
				optionImage: "",
				checkedOpt: "",
				count: 1,
				argsList: "",
				cartFlag: true,
				checked: [],
				totalPassFlag: true,
				checkedIndex: -1,
				orderIdList: [],
				delNum: 0,
				logined: false
			}
		},
		computed: {
			...mapGetters(["getShoppingCart", "getUser", "getLoginShow", "getCheckedNum", "getIsAllChecked"]),
			products: {
				get() {
					let products = this.$store.getters.getShoppingCart;
					products = this.handleDefault(products);
					return products;
				}
			},
			getCheckedNum: {
				get() {
					return this.$store.getters.getCheckedNum;
				}
			},
			isAllChecked: {
				get() {
					return this.$store.getters.getIsAllChecked;
				}
			},
			totalCount: {
				get() {
					return this.$store.getters.getNum;
				}
			},
			totalPrice: {
				get() {
					return this.$store.getters.getTotalPrice;
				}
			},
			loginShow: {
				get() {
					return this.$store.getters.getLoginShow;
				}
			}
		},
		created() {
			this.initData();
		},
		activated() {
			this.setAllChecked(false);
			this.initData();
		},
		methods: {
			...mapActions(["setShoppingCartSync", "setShowLogin", "setAllChecked", "updateCart", "setChecked1",
			"delCart"]),
			initData() {
				let platform = uni.getSystemInfoSync().platform;
				if (uni.getStorageSync("userid") != '') {
					this.logined = false;
					let userid = uni.getStorageSync("userid");
					this.$store.dispatch('setShoppingCartSync', {
						_this: this,
						userid: userid
					});
					this.buttonText = "去结算（" + this.getCheckedNum + "）";
				} else {
					this.logined = true;
					uni.$u.toast('未登录，请先登录');
					this.products = "";
				}
			},
			goLogin() {
				this.setShowLogin(true);
			},
			handleDefault(products) {
				products.forEach(function(item) {
					if (item.image.charAt(0) == '/') {
						// item.image = item.image.slice(1);
					} else {
						let image = item.image;
						image = '/' + image;
						item.image = image;
						item.id = item.productid;
					}
					if (item.count == 1) {
						item.subDis = true;
					} else {
						item.subDis = false;
					}
				})
				return products;
			},
			goList() {
				uni.navigateTo({
					url: '/pages/productLists/productLists'
				})
			},
			showOpt(index) {
				console.log("opt-index:" + index);
				console.log("id:" + this.products[index].productid);
				this.optionPrice = this.products[index].price;
				this.optionImage = this.products[index].image;
				this.checkedOpt = this.products[index].args;
				this.count = this.products[index].count;
				uni.request({
					url: this.$baseUrl + '/api/products/details?id=' + this.products[index].productid,
					method: 'GET',
					success: (res => {
						let product = res.data.data;
						this.handleDefault1(product, index);
						this.optionShow = true;
					}),
					error: (err => {
						console.log(err);
					})
				})
			},
			handleDefault1(product, index) {

				let argsNameList = product.argsname.split(";");
				let argsvalue = product.argsvalue.split(";");
				let checkedArgs = this.products[index].args.split(',');
				this.checked = checkedArgs;
				this.checkedIndex = index;
				let tempList = []
				let argsList = {};
				for (var i = 0; i < argsNameList.length; i++) {
					let list = argsvalue[i].split(",");
					let obj = {
						name: argsNameList[i],
						list: list,
						checked: checkedArgs[i]
					};
					tempList[i] = obj;
				}
				argsList.image = this.products[index].image;
				argsList.defaultImage = '/' + product.image;
				argsList.title = product.title;
				argsList.price = this.products[index].price;
				argsList.defaultPrice = product.price;
				argsList.argsassemblyvalue = product.argsassemblyvalue;
				argsList.count = this.count;
				argsList.tempList = tempList;
				this.argsList = argsList;
			},
			statistics() {
				if (this.edit) {
					this.buttonText = "去结算（" + this.getCheckedNum + "）";
				} else {
					this.buttonText = "删除（" + this.getCheckedNum + "）";
				}
			},
			changeAll() {
				this.setAllChecked(!this.isAllChecked);
			},
			changeEdit() {
				this.edit = !this.edit;
				this.statistics();
			},
			confirmOpt() {
				console.log("checkedOpt:" + this.checkedOpt);
				uni.request({
					url: this.$baseUrl + '/api/cart/update?id=' + this.products[this.checkedIndex].cartid,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						count: this.products[this.checkedIndex].count,
						price: this.products[this.checkedIndex].price,
						args: this.checkedOpt,
						ttprice: (this.products[this.checkedIndex].price * this.products[this.checkedIndex].count)
							.toFixed(2)
					},
					success: (res) => {
						// if (!res.data.errno) {
						this.updateCart({
							index: this.checkedIndex,
							args: this.checkedOpt
						});
						this.setChecked1(this.checkedIndex);
						this.optionShow = false;
						this.statistics();
						// }
					},
					error: (err) => {
						console.log(err);
					},
				});
			},
			goTotal() {
				console.log("checkedNum:" + this.getCheckedNum);
				if (this.getCheckedNum > 0) {
					let checkedItem = this.$store.getters.getCheckedItem;
					if (this.edit) {
						let breakLoop = false;
						for (var i = 0; i < this.getCheckedNum; i++) {
							// console.log("checkedItem:" + JSON.stringify(checkedItem[i]));
							if (!breakLoop) {
								let orderid = "";
								let username = uni.getStorageSync("username");
								let productIDNumber = checkedItem[i].idnumber;
								let date = new Date();
								const year = date.getFullYear();
								const month = ('0' + (date.getMonth() + 1)).slice(-2);
								const day = ('0' + date.getDate()).slice(-2);
								const hours = ('0' + date.getHours()).slice(-2);
								const minutes = ('0' + date.getMinutes()).slice(-2);
								const seconds = ('0' + date.getSeconds()).slice(-2);
								let createtime = year + month + day + hours + minutes;
								// console.log("createtime:" + createtime.toString());
								orderid = createtime + username + productIDNumber;

								// console.log("orderid:" + orderid);

								uni.request({
									url: this.$baseUrl + '/api/order/new',
									method: 'POST',
									header: {
										'content-type': 'application/x-www-form-urlencoded',
									},
									data: {
										orderid: orderid,
										userid: uni.getStorageSync("userid"),
										productid: checkedItem[i].productid,
										addressid: 0,
										args: checkedItem[i].args,
										price: checkedItem[i].price,
										count: checkedItem[i].count,
										ttprice: (checkedItem[i].price * checkedItem[i].count).toFixed(2),
										delivery: "快递配送",
										remark: "",
										createtime: createtime.toString()
									},
									success: (res) => {
										if (res.data.errno) {
											uni.$u.toast('操作失败，请稍后重试');
											breakLoop = true;
										} else {
											let result = res.data.data;
											let id = result.id;
											this.checkTotal(id);
										}
									},
									error: (err) => {
										console.log(err);
									}
								})
							}
						}
					} else {
						let breakLoop = false;
						for (var i = 0; i < this.getCheckedNum; i++) {
							if (!breakLoop) {
								uni.request({
									url: this.$baseUrl + '/api/cart/delete?id=' + checkedItem[i].cartid,
									method: 'GET',
									success: (res) => {
										if (res.data.errno) {
											uni.$u.toast('操作失败，请稍后重试');
											breakLoop = true;
										} else {
											this.checkTotal1();
										}
									},
									error: (err) => {
										console.log(err);
									}
								})
							}
						}
					}
				} else {
					uni.$u.toast('请选择要操作的商品');
				}
			},
			checkTotal(orderid) {
				let ids = this.orderIdList;
				ids.push(orderid);
				this.orderIdList = ids;
				if (ids.length == this.getCheckedNum) {
					uni.navigateTo({
						url: '/pages/orderConfirm/orderConfirm?ids=' + JSON.stringify(this.orderIdList)
					})
					this.orderIdList = [];
					this.getCheckedNum = 0;
					this.statistics();
				}
			},
			checkTotal1() {
				let delNum = this.delNum;
				delNum += 1;
				this.delNum = delNum;
				if (delNum == this.getCheckedNum) {
					this.delCart({
						checkedItems: this.$store.getters.getCheckedItem
					});
					uni.$u.toast('删除成功！');
					this.delNum = 0;
					this.getCheckedNum = 0;
					this.statistics();
				}
			},
			afterLogin() {
				this.initData();
			}
		}
	}
</script>

<style lang="scss">
	.cart-content {

		.cart-title {
			width: 100%;
			height: 35px;
			background-color: whitesmoke;
			line-height: 35px;
			font-size: 13px;

			.cart-title-inner {
				width: 93%;
				margin: 0 auto;

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
		}

		.cart-bottom {
			position: fixed;
			bottom: 0;
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