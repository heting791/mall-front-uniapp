<template>
	<view class="pro-list-content">
		<view class="list-inner">
			<ul>
				<li class="pro-item" v-for="(item, index) in products" :class="[cartFlag ? 'cartItem' : '']">
					<view class="item-inner">
						<view class="item-check" v-if="cartFlag" @click="changeChecked(index)">
							<u-icon name="checkmark-circle" size="20" v-if="!item.checked"></u-icon>
							<u-icon name="checkmark-circle-fill" color="red" v-else size="20"></u-icon>
						</view>
						<view class="item-img" :class="[cartFlag ? 'cartImg' : '']">
							<image :src="item.image"></image>
						</view>
						<view class="item-text" :class="[cartFlag ? 'cartText' : '']" @click="goDetails(item.id)">
							<view class="text-title"><span
									style="font-weight: bolder;font-size: 18px;color: blue;">{{item.id}}</span> -
								{{item.title}}
							</view>
							<view class="text-oprice" v-if="!cartFlag">
								<view class="oprice">￥{{item.category}}</view>
							</view>
							<view class="text-option" v-else @click.stop="showOpt(index)">
								<span>{{item.args}}</span>
								<u-icon name="arrow-down"></u-icon>
							</view>
							<view class="text-bottom">
								<view class="bottom-price">
									￥{{item.price}}
								</view>
								<view class="bottom-count" v-if="cartFlag">
									<!-- <u-number-box v-model="item.count" @change="" button-size="21"></u-number-box> -->
									<span @click.stop="subtract(index)" :class="[item.subDis?'disabled':'']">-</span>
									<span>{{item.count}}</span>
									<span @click.stop="add(index)">+</span>
								</view>
								<view class="text-star" v-if="!cartFlag" @click="changeFav(index, item.id)">
									<u-icon name="star" size="25" v-if="!item.fav"></u-icon>
									<u-icon name="star-fill" size="25" color="red" v-if="item.fav"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</li>
			</ul>
		</view>
		<login :loginShow="loginShow" :registerShow.sync="sonRegiShow" @afterLogin="afterLogin"></login>
		<register :registerShow.sync="sonRegiShow" :loginShow="loginShow"></register>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		name: "proList",
		props: ['cartFlag', 'products', 'edit'],
		data() {
			return {
				sonRegiShow: false
			};
		},
		computed: {
			...mapGetters(["getUser", "getLoginShow"]),
			loginShow: {
				get() {
					return this.$store.getters.getLoginShow;
				}
			}
		},
		created() {

		},
		methods: {
			...mapActions(["setShowLogin", "setChecked", "updateCart", "setChecked1"]),
			changeFav(index, id) {
				console.log("index:" + index + ",id:" + id);
				if (uni.getStorageSync("userid") == "") {
					uni.$u.toast('未登录，请先登录');
					this.setShowLogin(true);
				} else {
					let fav = this.products[index].fav;
					let userid = uni.getStorageSync("userid");
					let productid = this.products[index].id;
					if (fav) {
						uni.request({
							url: this.$baseUrl + '/api/fav/delete?userid=' + userid + '&productid=' + productid,
							method: 'GET',
							success: (res) => {
								if (!res.data.errno) {
									console.log("success");
									this.changeFavUser(index, id);
								} else {
									console.log("error");
								}
							},
							error: (err => {
								console.log(err);
							})
						})
					} else {
						uni.request({
							url: this.$baseUrl + '/api/fav/new?userid=' + userid + '&productid=' + productid,
							method: 'GET',
							success: (res) => {
								if (!res.data.errno) {
									console.log("success");
									this.changeFavUser(index, id);
								} else {
									console.log("error");
								}
							},
							error: (err => {
								console.log(err);
							})
						})
					}
				}
			},
			changeFavUser(index, id) {
				let fav = this.products[index].fav;
				let userid = uni.getStorageSync("userid");
				let productid = this.products[index].id;
				if (fav) {
					let favUserList = this.products[index].favuser.split(";");
					let replaceChar = this.products[index].favuser.replace(userid + ';', '');
					console.log("replaceChar:" + JSON.stringify(replaceChar));
					uni.request({
						url: this.$baseUrl + '/api/products/update?id=' + productid + '&favUserList=' +
							replaceChar,
						method: 'GET',
						success: (res) => {
							if (!res.data.errno) {
								uni.$u.toast("已取消收藏");
								this.products[index].fav = false;
								this.products[index].favuser = replaceChar;
								this.$forceUpdate();
							} else {
								uni.$u.toast("操作失败，请稍后再试");
							}
						},
						error: (err => {
							console.log(err);
						})
					})
				} else {
					let favUserList = this.products[index].favuser;
					favUserList += (userid + ';');
					console.log("favUserList:" + favUserList);
					uni.request({
						url: this.$baseUrl + '/api/products/update?id=' + productid + '&favUserList=' +
							favUserList,
						method: 'GET',
						success: (res) => {
							if (!res.data.errno) {
								uni.$u.toast("已收藏");
								this.products[index].fav = true;
								this.products[index].favuser = favUserList;
								this.$forceUpdate();
								console.log("this.products[index].fav:" + this.products[index].fav);
							} else {
								uni.$u.toast("操作失败，请稍后再试");
							}
						},
						error: (err => {
							console.log(err);
						})
					})
				}
			},
			goDetails(id) {
				uni.navigateTo({
					url: '/pages/productDetails/productDetails?productid=' + id
				})
			},
			changeChecked(index) {
				this.setChecked(index);
				this.$emit('statistics');
			},
			showOpt(index) {
				this.$emit('showOpt', index);
			},
			subtract(index) {
				let count = this.products[index].count;
				if (count > 1) {
					uni.request({
						url: this.$baseUrl + '/api/cart/update?id=' + this.products[index].cartid,
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							count: count - 1,
							price: this.products[index].price,
							args: this.products[index].args,
							ttprice: (this.products[index].price * (count - 1)).toFixed(2)
						},
						success: (res) => {
							if (!res.data.errno) {
								this.updateCart({
									index: index,
									count: count - 1
								});
								this.setChecked1(index);
								this.$emit('statistics');
							} else {
								uni.$u.toast('操作失败，请稍后再试')
							}
						},
						error: (err) => {
							console.log(err);
						},
					});
				}
			},
			add(index) {
				let count = this.products[index].count;
				uni.request({
					url: this.$baseUrl + '/api/cart/update?id=' + this.products[index].cartid,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						count: count + 1,
						price: this.products[index].price,
						args: this.products[index].args,
						ttprice: (this.products[index].price * (count + 1)).toFixed(2)
					},
					success: (res) => {
						if (!res.data.errno) {
							this.updateCart({
								index: index,
								count: count + 1
							});
							this.setChecked1(index);
							this.$emit('statistics');
						} else {
							uni.$u.toast('操作失败，请稍后再试')
						}
					},
					error: (err) => {
						console.log(err);
					},
				});
			},
			afterLogin() {}
		}
	}
</script>

<style lang="scss">
	.pro-list-content {
		.list-inner {
			ul {
				margin: 0;
				padding: 0;

				li {
					list-style: none;
				}

				.pro-item {
					margin-bottom: 10px;
					background-color: white;
					border-radius: 10px;

					.item-inner {
						width: 95%;
						margin: 0 auto;

						.item-check {
							display: inline-block;
							width: 20px;
						}

						.item-img {
							display: inline-block;
							vertical-align: middle;
							width: 70px;
							height: 70px;
							margin: 0 5px;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.cartImg {
							width: 80px;
							height: 80px;
						}

						.item-text {
							display: inline-block;
							vertical-align: top;
							width: calc(100% - 80px);

							.text-title {
								font-size: 13px;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}

							.text-oprice {
								margin: 1px 0;

								.oprice {
									font-size: 12px;
									color: gray;
									text-decoration: line-through;
								}
							}

							.text-option {
								margin: 5px 0 10px 0;
								font-size: 12.5px;

								.u-icon {
									display: inline-block;
								}
							}

							.text-bottom {
								.bottom-price {
									display: inline-block;
									font-size: 15px;
									font-weight: bolder;
									color: red;
								}

								.text-star {
									float: right;
									margin-top: -13px;
								}

								.bottom-count {
									display: inline-block;
									vertical-align: top;
									float: right;
									margin-right: 3px;

									span {
										display: inline-block;
										width: 30px;
										height: 22px;
										line-height: 22px;
										text-align: center;
										background-color: #EBECEE;
										font-weight: bolder;
									}

									span:nth-child(2) {
										width: 33px;
										margin: 0 3px;
										font-weight: normal;
									}

									span.disabled {
										background-color: #F7F8FA;
										color: lightgray;
									}
								}
							}
						}

					}
				}

				.cartText {
					width: calc(100% - 110px) !important;
				}

				.cartItem {
					padding: 5px 0;
					margin-bottom: 15px;
				}
			}
		}
	}
</style>