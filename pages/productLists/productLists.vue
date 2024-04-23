<template>
	<view class="product-lists-content">
		<topSearch></topSearch>
		<view class="lists-container">
			<view class="container-inner">
				<view class="inner-filter">
				</view>
				<view class="inner-list">
					<proList :products="products"></proList>
					<u-empty v-if="!products.length&&fav==''&&word==''">
					</u-empty>
					<u-empty mode="favor" v-if="!products.length&&fav!=''&&word==''">
					</u-empty>
					<u-empty mode="search" v-if="!products.length&&fav==''&&word!=''">
					</u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				products: "",
				fav: "",
				word: ""
			}
		},
		onLoad(options) {
			if (options.fav) {
				this.fav = options.fav;
				console.log("fav");
				let userid = uni.getStorageSync("userid");
				uni.request({
					url: this.$baseUrl + '/api/fav/list?userid=' + userid,
					method: 'GET',
					success: (res => {
						// console.log(JSON.stringify(res.data));
						this.products = res.data.data;
						this.changeImage();
						this.checkFav();
					}),
					error: (err => {
						console.log(err);
					})
				})
			} else if (options.keyword) {
				let keyword = options.keyword;
				this.word = options.keyword;
				console.log("keyword:" + keyword);
				uni.request({
					url: this.$baseUrl + '/api/products/list?keyword=' + keyword,
					method: 'GET',
					success: (res => {
						// console.log(JSON.stringify(res.data));
						this.products = res.data.data;
						this.changeImage();
						this.checkFav();
					}),
					error: (err => {
						console.log(err);
					})
				})
			} else {
				if (uni.getStorageSync("categoryid") != -1) {
					console.log("yes");
					let categoryid = uni.getStorageSync("categoryid");
					console.log("categoryid:" + categoryid);
					uni.request({
						url: this.$baseUrl + '/api/category/list',
						method: 'GET',
						success: (res => {
							// console.log(JSON.stringify(res.data));
							this.category = res.data.data;
							this.getProducts();
						}),
						error: (err => {
							console.log(err);
						})
					})
				} else {
					console.log("else");
					uni.request({
						url: this.$baseUrl + '/api/products/list',
						method: 'GET',
						success: (res => {
							// console.log(JSON.stringify(res.data.data));
							this.products = res.data.data;
							this.changeImage();
							this.checkFav();
						}),
						error: (err => {
							console.log(err);
						})
					})
				}
			}
		},
		created() {

		},
		onReachBottom() {
			uni.$u.toast('没有更多啦');
		},
		methods: {
			getProducts() {
				let category = this.category;
				let categoryid = uni.getStorageSync("categoryid");
				let categoryName = "";
				if (category) {
					category.forEach(function(item) {
						if (item.id == categoryid) {
							categoryName = item.name;
						}
					})
				}
				console.log("name:" + categoryName);
				let self = this;
				uni.request({
					url: this.$baseUrl + '/api/products/list?category=' + categoryName,
					method: 'GET',
					success: (res => {
						// console.log(JSON.stringify(res.data.data));
						this.products = res.data.data;
						this.changeImage();
						this.checkFav();
					}),
					error: (err => {
						console.log(err);
					})
				})
			},
			changeImage() {
				this.products.forEach(function(item) {
					let image = item.image;
					image = '/' + image;
					item.image = image;
				})
			},
			checkFav() {
				let data = this.products;
				if (this.fav) {
					for (var x = 0; x < this.products.length; x++) {
						this.products[x].fav = true;
					}
				} else if (uni.getStorageSync("userid") != '') {
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
						}
						data[i].fav = favFlag;
					}
					this.products = data;
				}
			},
		}
	}
</script>

<style lang="scss">
	.product-lists-content {
		.lists-container {
			.container-inner {
				margin-top: 10px;

				.inner-filter {
					.filter-list {
						ul {
							width: 95%;
							margin: 0 auto;
							padding: 0;

							li {
								list-style: none;
								font-size: 15px;
								display: inline-block;
								vertical-align: top;
								padding: 0 10px;

								span {
									display: inline-block;
								}

								.u-icon {
									display: inline-block;
									vertical-align: middle;
								}

								svg {
									display: inline-block;
									vertical-align: middle;
								}
							}
						}
					}
				}

				.inner-list {
					margin-top: 10px;
				}
			}
		}
	}
</style>