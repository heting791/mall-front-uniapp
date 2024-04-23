<template>
	<view class="details-content">
		<!-- <view class="details-tabs"> -->
		<u-sticky bgColor="#fff">
			<u-tabs :list="tabs" @click="changeTabs"></u-tabs>
		</u-sticky>
		<!-- </view> -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="{height: scrollHeight + 'px'}">
			<view class="details-content-box">
				<view class="products-intro">
					<view class="details-swiper">
						<swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="2000"
							:duration="500">
							<swiper-item>
								<image :src="optionImage"></image>
							</swiper-item>
						</swiper>
					</view>
					<view class="products-intro-text">
						<view class="intro-text-cprice">￥{{optionPrice}}</view>
						<view class="intro-text-title">{{product.title}}
						</view>
					</view>
					<view class="sku-title">
						<u-cell-group>
							<u-cell :value="value" icon="../../static/icon/cate.png" isLink @click="optionShow = true">
								<!-- <svg t="1691982404152" class="icon" slot="icon" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="5070" width="20" height="20">
									<path
										d="M320.545707 479.179085H116.47185A116.610043 116.610043 0 0 1 0 362.707235V158.633378a116.610043 116.610043 0 0 1 116.47185-116.47185h204.073857a116.610043 116.610043 0 0 1 116.471849 116.47185v204.073857a116.610043 116.610043 0 0 1-116.471849 116.47185zM116.47185 88.745243a69.976076 69.976076 0 0 0-69.888135 69.888135v204.073857a69.976076 69.976076 0 0 0 69.888135 69.888135h204.073857a69.976076 69.976076 0 0 0 69.888135-69.888135V158.633378a69.976076 69.976076 0 0 0-69.888135-69.888135zM320.633648 1024H116.559791A116.610043 116.610043 0 0 1 0.087941 907.578402V703.44173a116.610043 116.610043 0 0 1 116.47185-116.484412h204.073857a116.622606 116.622606 0 0 1 116.484413 116.484412v204.136672a116.610043 116.610043 0 0 1-116.484413 116.421598zM116.559791 633.553595a69.976076 69.976076 0 0 0-69.888135 69.888135v204.136672a69.976076 69.976076 0 0 0 69.888135 69.837883h204.073857a69.963513 69.963513 0 0 0 69.888135-69.837883V703.44173a69.963513 69.963513 0 0 0-69.888135-69.888135zM865.906832 1024H661.795286a116.610043 116.610043 0 0 1-116.43416-116.421598V703.44173a116.622606 116.622606 0 0 1 116.43416-116.484412h204.111546a116.622606 116.622606 0 0 1 116.484413 116.484412v204.136672a116.610043 116.610043 0 0 1-116.484413 116.421598zM661.795286 633.553595a69.963513 69.963513 0 0 0-69.888135 69.888135v204.136672a69.963513 69.963513 0 0 0 69.888135 69.837883h204.111546a69.963513 69.963513 0 0 0 69.888135-69.837883V703.44173a69.963513 69.963513 0 0 0-69.888135-69.888135zM763.781963 521.340613a115.680379 115.680379 0 0 1-82.350661-34.008122L537.119778 343.03353a116.635169 116.635169 0 0 1 0-164.726447L681.431302 34.008122a116.710547 116.710547 0 0 1 164.701321 0l144.311524 144.298961a116.635169 116.635169 0 0 1 0 164.726447L846.132623 487.332491a115.579875 115.579875 0 0 1-82.35066 34.008122z m0-474.744335a69.435866 69.435866 0 0 0-49.410397 20.352108L570.085169 211.247347a69.976076 69.976076 0 0 0 0 98.845919l144.286397 144.298961c26.269295 26.281858 72.589186 26.231606 98.820793 0l144.311524-144.298961a69.976076 69.976076 0 0 0 0-98.845919L813.192359 66.948386a69.398177 69.398177 0 0 0-49.410396-20.352108z"
										p-id="5071" fill="#2c2c2c"></path>
								</svg> -->
							</u-cell>
						</u-cell-group>
					</view>
					<view class="service-title">
						<view>
							<!-- <svg t="1691982926048" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="8903" width="20" height="20">
								<path
									d="M675.328 117.717A425.43 425.43 0 0 0 512 85.333C276.352 85.333 85.333 276.352 85.333 512S276.352 938.667 512 938.667 938.667 747.648 938.667 512c0-56.747-11.094-112-32.384-163.328a21.333 21.333 0 0 0-39.403 16.341A382.763 382.763 0 0 1 896 512c0 212.075-171.925 384-384 384S128 724.075 128 512s171.925-384 384-384c51.115 0 100.8 9.984 146.987 29.12a21.333 21.333 0 0 0 16.341-39.403zM461.995 586.325L356.33 480.683a21.248 21.248 0 0 0-30.123 0.042c-8.32 8.32-8.213 21.974-0.064 30.102l120.81 120.832a21.248 21.248 0 0 0 30.123-0.086l211.158-211.157a21.29 21.29 0 0 0 0-30.187 21.397 21.397 0 0 0-30.251 0.107l-196.01 195.99z"
									fill="#d81e06" p-id="8904"></path>
							</svg> -->
							<image src="../../static/icon/right.png"></image>
							<span>七天无理由退款</span>
						</view>
						<view>
							<!-- <svg t="1691982926048" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="8903" width="20" height="20">
								<path
									d="M675.328 117.717A425.43 425.43 0 0 0 512 85.333C276.352 85.333 85.333 276.352 85.333 512S276.352 938.667 512 938.667 938.667 747.648 938.667 512c0-56.747-11.094-112-32.384-163.328a21.333 21.333 0 0 0-39.403 16.341A382.763 382.763 0 0 1 896 512c0 212.075-171.925 384-384 384S128 724.075 128 512s171.925-384 384-384c51.115 0 100.8 9.984 146.987 29.12a21.333 21.333 0 0 0 16.341-39.403zM461.995 586.325L356.33 480.683a21.248 21.248 0 0 0-30.123 0.042c-8.32 8.32-8.213 21.974-0.064 30.102l120.81 120.832a21.248 21.248 0 0 0 30.123-0.086l211.158-211.157a21.29 21.29 0 0 0 0-30.187 21.397 21.397 0 0 0-30.251 0.107l-196.01 195.99z"
									fill="#d81e06" p-id="8904"></path>
							</svg> -->
							<image src="../../static/icon/right.png"></image>
							<span>48小时发货</span>
						</view>
					</view>
					<proOptions :optionShow.sync="optionShow" :checked="checked" :totalPassFlag.sync="totalPassFlag"
						:optionPrice.sync="optionPrice" :optionImage.sync="optionImage" :checkedOpt.sync="checkedOpt"
						:count.sync="count" :argsList="argsList" @goBuy="goBuy()" @addCart="addCart()"></proOptions>
				</view>
				<view class="products-desc">
					<view class="desc-title">
						<span class="line"></span><span>商品描述</span>
					</view>
					<view class="desc-content">
						<ul>
							<li><strong>品牌：</strong>{{product.brand}}</li>
							<li><strong>商品编号：</strong>{{product.idnumber}}</li>
							<li><strong>分类：</strong>{{product.category}}</li>
							<li v-for="item in detailsArgs"><strong>{{item.key}}：</strong>{{item.value}}</li>
						</ul>
						<image :src="product.image"></image>
					</view>
				</view>
				<view class="products-judge">
					<view class="judge-title">
						<span class="line"></span><span>商品评价</span>
					</view>
					<view class="judge-list">
						<view class="judge-item" v-for="item in judgeList" style="width: 95%;margin: 20px auto;">
							<view class="judge-top">
								<view class="judge-top-left">
									<u-avatar></u-avatar>
								</view>
								<view class="judge-top-right">
									<view class="user-info">
										<p>{{item.username}}</p>
										<span>普通用户</span>
									</view>
									<view class="rate-info">
										<u-rate size="25" v-model="item.rate" :allowHalf="allowHalf" readonly></u-rate>
									</view>
								</view>
							</view>
							<view class="judge-content">
								<view style="margin: 20px 0;">{{item.content}}</view>
								<view>
									<image v-for="items in item.images1" :src="items" style="max-width: 30%;max-height: 100px;margin: 0 5rpx 10rpx 0;"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-gap height="60"></u-gap>
		<view class="bottom-action">
			<view class="action-icons" style="padding-top: 10rpx;">
				<view class="icon-item" @click="goHome">
					<!-- <u-icon name="home" size="30"></u-icon> -->
					<image src="../../static/icon/inner-index.png" style="width: 23px;height: 23px;"></image>
					<span>首页</span>
				</view>
				<view class="icon-item" @click="changeFav">
					<!-- <u-icon name="star" size="30" v-if="!fav"></u-icon> -->
					<image src="../../static/icon/fav.png" style="width: 23px;height: 23px;" v-if="!fav"></image>
					<!-- <u-icon name="star-fill" color="red" size="30" v-if="fav"></u-icon> -->
					<image src="../../static/icon/fav-on.png" style="width: 23px;height: 23px;" v-if="fav"></image>
					<span>收藏</span>
				</view>
				<view class="icon-item" @click="goCart">
					<!-- <u-icon name="shopping-cart" size="30"></u-icon> -->
					<image src="../../static/icon/cart.png" style="width: 23px;height: 23px;"></image>
					<span>购物车</span>
				</view>
			</view>
			
			<view class="action-buttons">
				<view class="button-item" @click="addCart()">
					<u-button shape="circle" text="加入购物车" color="linear-gradient(to right,#FFC41D,#FF9218)"></u-button>
				</view>

				<view class="button-item">
					<!-- <navigator url="../orderConfirm/orderConfirm"> -->
					<u-button shape="circle" text="立即购买" color="linear-gradient(to right,#FC5332,#F01926)"
						@click="goBuy()"></u-button>
					<!-- </navigator> -->
				</view>
			</view>
		</view>
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
				tabs: [{
						name: '商品简介'
					},
					{
						name: '商品详情'
					},
					{
						name: '商品评价'
					}
				],
				value: '请选择 颜色 套餐',
				optionShow: false,
				count: 1,
				allowHalf: true,
				product: {},
				scrollTop: 0,
				scrollHeight: 0,
				fav: false,
				registerShow: false,
				argsList: "",
				optionPrice: "",
				optionImage: "",
				checkedOpt: "",
				totalPassFlag: false,
				checked: [],
				productid: -1,
				judgeList: []
			}
		},
		onLoad(options) {
			console.log("onLoad-options:" + JSON.stringify(options));
			if (options.productid) {
				this.productid = options.productid;
				uni.request({
					url: this.$baseUrl + '/api/products/details?id=' + options.productid,
					method: 'GET',
					success: (res => {
						this.product = res.data.data;
						this.handleDefault();
						// console.log("product:" + JSON.stringify(this.product));
					}),
					error: (err => {
						console.log(err);
					})
				})
			} else {
				console.log("created-else");
				this.productid = uni.getStorageSync("productid");
				uni.request({
					url: this.$baseUrl + '/api/products/details?id=' + uni.getStorageSync("productid"),
					method: 'GET',
					success: (res => {
						this.product = res.data.data;
						this.handleDefault();
						// console.log("product:" + JSON.stringify(this.product));
					}),
					error: (err => {
						console.log(err);
					})
				})
			}
		},
		
		onShow() {
			this.scrollHeight = this.setScrollHeight();
		},
		computed: {
			...mapGetters(["getUser", "getLoginShow"]),
			loginShow: {
				get() {
					return this.$store.getters.getLoginShow;
				}
			}
		},
		watch: {
			checkedOpt: function() {
				console.log("checkedOpt:" + this.checkedOpt);
				if (this.checkedOpt != "") {
					this.value = this.checkedOpt;
				}
			}
		},
		created() {			
			let platform = uni.getSystemInfoSync().platform;
			console.log("platform:" + platform);
		},
		methods: {
			...mapActions(["setShowLogin"]),
			handleDefault() {
				uni.request({
					url: this.$baseUrl1 + '/api/judge/listJudge?productid=' + this.productid,
					method: 'GET',
					success: (res => {
						console.log("judgeList:");
						console.log(res);
						console.log("data:" + JSON.stringify(res.data));
						this.judgeList = res.data;
						console.log("length:" + this.judgeList);
						if (this.judgeList.length) {
							for (var i = 0; i < this.judgeList.length; i++) {
								let tempImages = this.judgeList[i].images.split(";");
								let tempImages1 = [];
								for (var j = 0; j < tempImages.length - 1; j++) {
									tempImages1[j] = this.$baseUrl1 + '/uploads/' + tempImages[j];
								}
								this.judgeList[i].images1 = tempImages1;
							}
						}
						// console.log("product:" + JSON.stringify(this.product));
					}),
					error: (err => {
						console.log(err);
					})
				})
				let userid = uni.getStorageSync("userid");
				let product = this.product;
				this.product.image = '/' + this.product.image;
				let argsname = product.argsname.split(';');
				let detailsarg = product.detailsarg.replace("[", "");
				let favUser = product.favuser;
				if (favUser != "") {
					favUser = favUser.split(";");
					for (var i = 0; i < favUser.length; i++) {
						if (favUser[i] == userid) {
							this.fav = true;
							break;
						}
					}
				}
				detailsarg = detailsarg.replace("]", "");
				detailsarg = detailsarg.split(";");
				let detailsArgs = [];
				for (var i = 0; i < argsname.length; i++) {
					let obj = {
						key: argsname[i],
						value: detailsarg[i]
					}
					detailsArgs.push(obj);
				}
				this.detailsArgs = detailsArgs;
				this.handleDefault1();
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			changeTabs(item) {
				console.log(item);
				if (item.index == 0) {
					this.scrollTop = 0;
				} else {
					this.scrollTop = 1000;
				}
			},
			setScrollHeight() {
				let scrollHeight = 0;
				uni.getSystemInfo({
					success: function(res) {
						scrollHeight = res.windowHeight - 44;
					}
				})
				return scrollHeight;
			},
			handleDefault1() {
				let argsNameList = this.product.argsname.split(";");
				let argsvalue = this.product.argsvalue.split(";");
				let tempList = []
				let argsList = {};
				for (var i = 0; i < argsNameList.length; i++) {
					let list = argsvalue[i].split(",");
					let obj = {
						name: argsNameList[i],
						list: list
					};
					tempList[i] = obj;
				}
				argsList.image = this.product.image;
				argsList.defaultImage = this.product.image;
				argsList.title = this.product.title;
				argsList.price = this.product.price;
				argsList.defaultPrice = this.product.price;
				argsList.argsassemblyvalue = this.product.argsassemblyvalue;
				argsList.count = this.count;
				argsList.tempList = tempList;
				this.argsList = argsList;
				this.optionPrice = this.product.price;
				this.optionImage = this.product.image;
			},
			changeFav() {
				if (uni.getStorageSync("userid") != "") {
					let fav = this.fav;
					let userid = uni.getStorageSync("userid");
					let productid = this.productid;
					if (fav) {
						uni.request({
							url: this.$baseUrl + '/api/fav/delete?userid=' + userid + '&productid=' + productid,
							method: 'GET',
							success: (res) => {
								if (!res.data.errno) {
									console.log("success");
									this.changeFavUser();
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
									this.changeFavUser();
								} else {
									console.log("error");
								}
							},
							error: (err => {
								console.log(err);
							})
						})
					}
				} else {
					uni.setStorageSync("productid", productid);
					this.setShowLogin(true);
				}
			},
			changeFavUser() {
				let fav = this.fav;
				let userid = uni.getStorageSync("userid");
				let productid = this.productid;
				if (fav) {
					let favUserList = this.product.favuser.split(";");
					let replaceChar = this.product.favuser.replace(userid + ';', '');
					console.log("replaceChar:" + JSON.stringify(replaceChar));
					uni.request({
						url: this.$baseUrl + '/api/products/update?id=' + productid + '&favUserList=' +
							replaceChar,
						method: 'GET',
						success: (res) => {
							if (!res.data.errno) {
								uni.$u.toast("已取消收藏");
								this.fav = !this.fav;
							} else {
								uni.$u.toast("操作失败，请稍后再试");
							}
						},
						error: (err => {
							console.log(err);
						})
					})
				} else {
					let favUserList = this.product.favuser;
					favUserList += (userid + ';');
					console.log("favUserList:" + favUserList);
					uni.request({
						url: this.$baseUrl + '/api/products/update?id=' + productid + '&favUserList=' +
							favUserList,
						method: 'GET',
						success: (res) => {
							if (!res.data.errno) {
								uni.$u.toast("已收藏");
								this.fav = !this.fav;
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
			goBuy() {
				if (uni.getStorageSync("userid") == '') {
					uni.$u.toast('未登录，请先登录');
					this.setShowLogin(true);
				} else {
					if (this.checkedOpt != "") {

						let orderid = "";
						let username = uni.getStorageSync("username");
						let productIDNumber = this.product.idnumber;
						let date = new Date();
						const year = date.getFullYear();
						const month = ('0' + (date.getMonth() + 1)).slice(-2);
						const day = ('0' + date.getDate()).slice(-2);
						const hours = ('0' + date.getHours()).slice(-2);
						const minutes = ('0' + date.getMinutes()).slice(-2);
						const seconds = ('0' + date.getSeconds()).slice(-2);
						let createtime = year + month + day + hours + minutes;
						console.log("createtime:" + createtime.toString());
						orderid = createtime + username + productIDNumber;

						console.log("orderid:" + orderid);

						uni.request({
							url: this.$baseUrl + '/api/order/new',
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							data: {
								orderid: orderid,
								userid: uni.getStorageSync("userid"),
								productid: this.productid,
								addressid: 0,
								args: this.checkedOpt,
								price: this.optionPrice,
								count: this.count,
								ttprice: (this.optionPrice * this.count).toFixed(2),
								delivery: "快递配送",
								remark: "",
								createtime: createtime.toString()
							},
							success: (res) => {
								if (res.data.errno) {
									uni.$u.toast('操作失败，请稍后重试');
								} else {
									let result = res.data.data;
									let id = result.id;
									uni.navigateTo({
										url: '/pages/orderConfirm/orderConfirm?id=' + id
									})
								}
							},
							error: (err) => {
								console.log(err);
							}
						})
					} else {
						uni.$u.toast('请选择 商品参数');
						this.optionShow = true;
					}
				}
			},
			addCart() {
				if (uni.getStorageSync("userid") == '') {
					uni.$u.toast('未登录，请先登录');
					this.setShowLogin(true);
				} else {
					if (this.checkedOpt != "") {
						uni.request({
							url: this.$baseUrl + '/api/cart/new',
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							data: {
								userid: uni.getStorageSync("userid"),
								productid: this.productid,
								args: this.checkedOpt,
								price: this.optionPrice,
								count: this.count,
								ttprice: (this.optionPrice * this.count).toFixed(2)
							},
							success: (res) => {
								if (res.data.errno) {
									uni.$u.toast('操作失败，请稍后重试');
								} else {
									uni.$u.toast('添加成功');
									this.optionShow = false;
								}
							},
							error: (err) => {
								console.log(err);
							}
						})
					} else {
						uni.$u.toast('请选择 商品参数');
						this.optionShow = true;
					}
				}
			},
			goCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			afterLogin() {
				this.optionShow = true;
			}
		}
	}
</script>

<style lang="scss">
	.details-content {

		li {
			list-style-type: none;
			display: inline-block;
		}

		.details-tabs {
			width: 100%;
		}

		.products-intro {
			margin: 10px 0;

			.details-swiper {
				height: 240px;

				uni-swiper {
					height: 100%;
				}

				image {
					width: 100%;
				}
			}

			.products-intro-text {
				width: 97%;
				margin: 10px auto;

				.intro-text-cprice {
					font-weight: bolder;
					font-size: 18px;
					color: red;
				}

				.intro-text-title {
					font-size: 15px;
				}
			}

			.service-title view {
				display: inline-block;
				font-size: 12px;
				margin-right: 10px;

				svg,
				span {
					display: inline-block;
					vertical-align: top;
				}
				
				image {
					display: inline-block;
					vertical-align: top;
					width: 20px;
					height: 20px;
				}
			}


		}

		.products-desc {
			.desc-title {
				margin: 10px 0;

				span {
					display: inline-block;
					vertical-align: top;
				}

				.line {
					width: 4px;
					height: 20px;
					background: red;
					margin-right: 8px;
				}
			}

			.desc-content {
				ul {
					margin: 0;
					padding: 0;
					font-size: 14px;
					text-align: left;

					li {
						width: 48%;
						vertical-align: top;
						margin-bottom: 10px;
						margin-left: 5px;
					}
				}

			}
		}

		.products-judge {
			.judge-title {
				margin: 10px 0;

				span {
					display: inline-block;
					vertical-align: top;
				}

				.line {
					width: 4px;
					height: 20px;
					background: red;
					margin-right: 8px;
				}
			}

			.judge-list {
				.judge-item {
					width: 98%;
					margin: 10px auto;

					.judge-top-left,
					.judge-top-right {
						display: inline-block;
						vertical-align: top;
					}

					.judge-top-right {
						view {
							display: inline-block;
							vertical-align: top;
						}

						.user-info {
							margin: 0 15px;

							span {
								color: gray;
								font-size: 13px;
							}
						}
					}

					.judge-content {
						margin-top: 10px;
					}
				}
			}
		}

		.bottom-action {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 55px;
			background: white;

			.action-icons {
				display: inline-block;
				width: 35%;

				view {
					display: inline-block;
					width: 33.3%;
					vertical-align: top;

					span {
						display: block;
						font-size: 13px;
					}
				}
			}

			.action-buttons,
			.action-buttons view {
				display: inline-block;
				vertical-align: top;
			}

			.action-buttons {
				width: 60%;
				float: right;
				margin-right: 5px;
				margin-top: 5px;
			}

			.action-buttons view {
				width: 48%;
			}

			.action-buttons view:first-child {
				margin-right: 5px;
			}
		}
		
		.u-icon {
			width: 30px !important;
		}
	}
</style>