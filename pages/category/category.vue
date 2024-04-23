<template>
	<view class="cate-container">
		<topSearch></topSearch>
		<view class="cate-container-box">
			<view class="box-left">
				<scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}">
					<view v-for="item in category" @click="changeActive(item.id)"
						:class="active==view+item.id?'cur':''">
						<span></span>
						<li>{{item.id}} - {{item.name}}</li>
					</view>
				</scroll-view>
			</view>
			<view class="box-right">
				<scroll-view :scroll-into-view="active" scroll-y="true" :style="{height: scrollHeight + 'px'}"
					@scroll="rightScroll">
					<proList v-for="(item, index) in category" :products="item.list" :id="view+item.id"></proList>
				</scroll-view>
			</view>
		</view>
		<!-- <login :loginShow="loginShow" :registerShow.sync="registerShow"></login>
		<register :registerShow.sync="registerShow" :loginShow="loginShow"></register> -->
	</view>
</template>

<script>
	// import {
	// 	mapActions,
	// 	mapGetters
	// } from "vuex";
	export default {
		data() {
			return {
				scrollHeight: "",
				category: "",
				active: "view0",
				view: "view",
				products: "",
				cateData: "",
				toast: {
					type: 'loading',
					title: '正在加载',
					message: "正在加载",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/loading.png'
				},
				toast1: {
					type: 'error',
					title: '失败',
					message: "没有更多啦",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				// registerShow: false
			}
		},

		onLoad() {
			this.scrollHeight = this.setScorllHeight();
			// if (uni.getStorageSync("categoryid") == -1) {
			// 	// this.active = this.view + "0";
			// 	this.changeActive(0);
			// } else {
			// 	let categoryid = uni.getStorageSync("categoryid");
			// 	// this.active = this.view + categoryid;
			// 	this.changeActive(categoryid);
			// }
		},
		// computed: {
		// 	...mapGetters(["getUser", "getLoginShow"]),
		// 	loginShow: {
		// 		get() {
		// 			return this.$store.getters.getLoginShow;
		// 		}
		// 	}
		// },

		created() {
			uni.request({
				url: this.$baseUrl + '/api/category/list',
				method: 'GET',
				success: (res => {
					// console.log(JSON.stringify(res.data));
					this.category = res.data.data;
					this.handleDefault(true, -1);
					// this.changeImage();
				}),
				error: (err => {
					console.log(err);
				})
			})

			console.log("active:" + this.active);
		},

		methods: {
			// ...mapActions(["setShowLogin"]),
			setScorllHeight() {
				let scrollHeight = 0;
				uni.getSystemInfo({
					success: function(res) {
						scrollHeight = res.windowHeight - 56;
					}
				})
				return scrollHeight;
			},
			handleDefault(rear, active) {
				if (rear) {
					let products = "";
					uni.request({
						url: this.$baseUrl + '/api/products/list',
						method: 'GET',
						success: (res => {
							// console.log(JSON.stringify(res.data));
							// products = res.data.data;
							// products = products.reverse();
							// this.totalLen = products.length;
							// this.products = products;
							// this.products.forEach(function(item) {
							// 	let image = item.image;
							// 	image = '/' + image;
							// 	item.image = image;
							// })
							// this.handleDefault1();
							this.checkFav(res.data.data);
						}),
						error: (err => {
							console.log(err);
						})
					})
					// for (var i = 0; i < this.category.length; i++) {
					// 	let categoryName = this.category[i].name;
					// 	uni.request({
					// 		url: this.$baseUrl + '/api/products/list?category=' + this.category[i].name,
					// 		method: 'GET',
					// 		success: (res => {
					// 			// console.log(JSON.stringify(res.data));
					// 			products = products.concat(res.data.data);
					// 			let len = products.length;
					// 			this.products = this.products.concat(res.data.data);
					// 			this.checkLen(res.data.data);
					// 		}),
					// 		error: (err => {
					// 			console.log(err);
					// 		})
					// 	})
					// }
				} else {
					this.active = active;
					console.log("handle-active:" + active);
					let cateTotalHeight = this.cateTotalHeight;
					if (active == 0) {
						this.scrollTop = 0;
					} else {
						this.scrollTop = this.old.scrollTop;
						this.$nextTick(function() {
							this.scrollTop = cateTotalHeight[active - 1];
							this.scrollTop += 5;
						});
					}
				}
			},

			handleDefault1() {
				let proCate = [];
				let flag = false;
				let tempName = "";
				for (var i = 0; i < this.products.length; i++) {
					flag = false;
					let j;
					for (j = 0; j < this.category.length; j++) {
						if (this.products[i].category != this.category[j].name) {
							tempName = this.products[i].category;
						} else {
							for (var k = 0; k < proCate.length; k++) {
								if (this.category[j].name === proCate[k].name) {
									proCate[k].len++;
									flag = true;
								}
							}
						}
					}
					if (j == this.category.length && !flag) {
						let obj = {
							name: tempName,
							len: 1
						}
						proCate.unshift(obj);
					}
				}
				this.proCate = proCate;
				console.log("this.proCate:" + JSON.stringify(this.proCate));
				let cateHeight = [];
				let cateTotalHeight = [];
				for (var i = 0; i < this.proCate.length; i++) {
					cateHeight[i] = this.proCate[i].len * 80;
				}
				cateHeight.unshift(this.totalLen * 80);
				console.log("cateHeight:" + JSON.stringify(cateHeight));
				for (var j = 0; j < cateHeight.length; j++) {
					let temp = 0;
					for (var k = 0; k <= j; k++) {
						temp += cateHeight[k];
					}
					cateTotalHeight[j] = (temp + this.scrollHeight);
				}
				cateTotalHeight[0] = (this.totalLen * 80 + this.scrollHeight);
				console.log("cateTotalHeight:" + JSON.stringify(cateTotalHeight));
				this.cateTotalHeight = cateTotalHeight;
			},

			listCate(data) {
				// this.category[3].list = [{id: 1, name: "zhangsan"}];
				// for (var j = 0; j < this.category.length; j++) {
				// 	if (!this.category[j].list) {
				// 		console.log("j:" + j);
				// 	}
				// }
				let list, count;
				for (var i = 0; i < data.length; i++) {
					let jindex = -1;
					for (var j = 0; j < this.category.length; j++) {
						if (data[i].category == this.category[j].name) {
							jindex = j;
							break;
						}
					}
					if (!this.category[jindex].list) {
						list = [];
						count = 0;
					} else {
						list = this.category[jindex].list;
						count = this.category[jindex].count;
					}
					data[i].image = '/' + data[i].image;
					list.unshift(data[i]);
					count++;
					this.category[jindex].list = list;
					this.category[jindex].count = count;
				}
				let obj = {
					id: 0,
					name: '全部',
					list: data,
					count: data.length
				}
				this.category.unshift(obj);
				// this.changeImage();
				// for (var j = 0; j < this.category.length; j++) {
				// 	console.log("j:" + j + ",count:" + this.category[j].count);
				// }
			},

			checkFav(data) {
				if (uni.getStorageSync("userid") != '') {
					let userid = uni.getStorageSync("userid");
					for (var i = 0; i < data.length; i++) {
						let favFlag = false;
						let favUser = data[i].favuser;
						if (favUser != "") {
							favUser = favUser.split(";");
							for (var j = 0; j < favUser.length; j++) {
								if (favUser[j] == userid) {
									favFlag = true;
									break;
								}
							}
							data[i].fav = favFlag;
						}
					}
				}
				// for (var i = 0; i < 10; i++) {
				// 	console.log("favFlag:" + data[i].fav);
				// }
				this.listCate(data);
			},

			changeImage() {
				for (var i = 0; i < this.category.length; i++) {
					let list = this.category[i].list;
					for (var j = 0; j < list.length; j++) {
						let image = list[j].image;
						image = '/' + image;
						list[j].image = image;
					}
					this.category[i].list = list;
				}
			},

			changeActive(num) {
				this.active = this.view + num;
			},

			rightScroll(e) {
				let info = uni.createSelectorQuery().selectAll(".pro-list-content");
				let itemHeight = [];
				let scrollTop = e.detail.scrollTop;
				let scrollHeight = this.scrollHeight;
				let active = this.active;
				let view = this.view;
				// let active = this.active;
				// let activeList = active.split("view");
				// console.log("activeList:" + JSON.stringify(activeList));
				// console.log("scrollTop:" + e.detail.scrollTop);
				// console.log("view:" + this.view);
				info.boundingClientRect(function(data) {
					// let active1 = active;
					// console.log("active1:" + active1);
					// for (var i = 0; i < data.length; i++) {
					// 	itemHeight.push(data[i].height);
					// }
					// for (var j = 0; j < itemHeight.length; j++) {
					// 	itemHeight[j] -= scrollHeight;
					// }
					// console.log("itemHeight:" + JSON.stringify(itemHeight));
					// let totalHeight = [];
					// for (var k = 0; k < itemHeight.length; k++){
					// 	let temp = 0;
					// 	for (var x = 0; x <= k; x++) {
					// 		temp += itemHeight[x];
					// 	}
					// 	totalHeight[k] = temp;
					// }
					// for (var y = 0; y < totalHeight.length; y++) {
					// 	totalHeight[y] -= parseInt(scrollHeight / 2);
					// }
					// console.log("totalHeight:" + JSON.stringify(totalHeight));
					// let tempz = -1;
					// for (var z = 0; z < totalHeight.length - 1; z++) {
					// 	if (scrollTop > totalHeight[z] && scrollTop <= totalHeight[z+1]) {
					// 		console.log("z:" + z);
					// 		tempz = z;
					// 		break;
					// 	}
					// }
					// if (tempz != -1) {
					// 	active1 = view + ((tempz+1).toString());
					// }
					// console.log("after-active1:" + active1);
					// return data;
					// this.active = active;
					// Vue.set(this.active, active);
					// console.log("this.active:" + this.active);
					// this.$forceUpdate();
				}).exec()
			}

		}
	}
</script>

<style lang="scss">
	.cate-container {

		.cate-container-box {
			margin-top: 15px;

			.box-left {
				display: inline-block;
				width: 23%;
				background-color: whitesmoke;
				font-size: 13px;

				view {
					height: 50px;
					line-height: 50px;

					li {
						display: inline-block;
						vertical-align: top;
						width: calc(100% - 3px);
						text-align: center;
						list-style: none;
					}
				}

				view.cur {
					background-color: white;

					span {
						display: inline-block;
						width: 3px;
						height: 50px;
						background-color: red;
					}
				}
			}

			.box-right {
				display: inline-block;
				vertical-align: top;
				width: 77%;

			}
		}
	}
</style>