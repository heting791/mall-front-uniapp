<template>
	<view class="content">
		<topSearch></topSearch>
		<view class="banner-swiper">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="2000" :duration="500">
				<swiper-item @click="bannerGo('/pages/productDetails/productDetails?productid=2')">
					<image src="../../static/index/banner1.jpg"></image>
				</swiper-item>
				<swiper-item @click="bannerGo('/pages/productDetails/productDetails?productid=3')">
					<image src="../../static/index/banner2.jpeg"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice" @click="goAbout">
			<u-notice-bar :text="text1" icon="volume" mode="link"></u-notice-bar>
		</view>
		<view class="category">
			<u-grid :border="false">
				<u-grid-item @click="toProList(1)">
					<!-- <svg t="1696816076362" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="4112" width="30" height="30">
						<path
							d="M545.607422 959.000614 107.016339 959.000614c-14.549368 0-26.324552-11.754718-26.324552-26.314319L80.691787 90.582041c0-14.528901 11.775184-26.314319 26.324552-26.314319l438.591083 0c14.528901 0 26.304086 11.785417 26.304086 26.314319l0 842.104253C571.910485 947.245895 560.136324 959.000614 545.607422 959.000614zM133.319401 906.362766l385.963469 0L519.28287 116.906593 133.319401 116.906593 133.319401 906.362766z"
							fill="#1296db" p-id="4113"></path>
						<path
							d="M334.603731 887.35383c-31.503505 0-57.149605-25.593911-57.149605-57.117882 0-31.493272 25.6461-57.128115 57.149605-57.128115 31.480992 0 57.107649 25.635867 57.107649 57.128115C391.71138 861.758895 366.084723 887.35383 334.603731 887.35383zM334.603731 825.746704c-2.5071 0-4.520967 2.013867-4.520967 4.489244 0 4.932336 8.999978 4.963035 8.999978 0C339.082742 827.76057 337.068875 825.746704 334.603731 825.746704z"
							fill="#1296db" p-id="4114"></path>
						<path d="M659.198503 81.817424l280.70824 0 0 52.628638-280.70824 0 0-52.628638Z" fill="#1296db"
							p-id="4115"></path>
						<path d="M659.198503 346.684884l280.70824 0 0 52.628638-280.70824 0 0-52.628638Z" fill="#1296db"
							p-id="4116"></path>
						<path d="M659.198503 611.55439l280.70824 0 0 52.627614-280.70824 0 0-52.627614Z" fill="#1296db"
							p-id="4117"></path>
						<path d="M659.198503 876.42185l280.70824 0 0 52.627614-280.70824 0 0-52.627614Z" fill="#1296db"
							p-id="4118"></path>
					</svg> -->
					<image src="../../static/index/icon/phone.png" />
					<text class="grid-text">手机</text>
				</u-grid-item>
				<u-grid-item @click="toProList(2)">
					<!-- <svg t="1696816279527" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="5143" width="30" height="30">
						<path
							d="M681.30133333 213.8112h118.51093334c85.74293333 0 155.648 69.90506667 155.648 155.648v451.10613333c0 85.74293333-69.90506667 155.648-155.648 155.648h-573.44c-85.74293333 0-155.648-69.90506667-155.648-155.648V369.4592c0-85.74293333 69.90506667-155.648 155.648-155.648h114.14186666L278.80106667 98.03093333c-8.192-16.384-1.6384-36.0448 14.7456-44.2368 15.83786667-7.64586667 34.95253333-2.18453333 43.14453333 13.65333334l77.55093333 146.36373333h192.78506667l77.55093333-146.36373333c8.192-15.83786667 28.39893333-22.39146667 44.2368-13.65333334s22.39146667 28.39893333 13.65333334 44.2368L681.30133333 213.8112z m-454.92906666 65.536c-49.69813333 0-90.112 40.41386667-90.112 90.112v451.10613333c0 49.69813333 40.41386667 90.112 90.112 90.112h573.98613333c49.69813333 0 90.112-40.41386667 90.112-90.112V369.4592c0-49.69813333-40.41386667-90.112-90.112-90.112H226.37226667z"
							p-id="5144" fill="#1296db"></path>
						<path
							d="M389.66613333 483.05493333c-18.0224 1.09226667-27.30666667 9.8304-27.30666666 27.30666667V577.536H263.50933333V510.3616c-1.09226667-16.93013333-9.8304-26.2144-26.2144-27.30666667-17.47626667 1.09226667-25.66826667 9.8304-25.66826666 27.30666667v186.7776c0 16.384 8.73813333 24.576 26.2144 24.576 16.384 0 25.12213333-8.192 26.2144-24.576v-69.90506667h98.85013333v69.90506667c0 16.384 9.28426667 24.576 27.30666667 24.576 16.384 0 25.12213333-8.192 26.2144-24.576V510.3616c-1.6384-16.93013333-10.37653333-26.2144-26.76053334-27.30666667zM545.31413333 481.96266667c-70.4512 6.00746667-109.22666667 46.96746667-114.14186666 121.78773333 4.36906667 75.91253333 42.5984 115.78026667 114.14186666 119.05706667 70.4512-3.2768 109.22666667-43.69066667 114.14186667-119.6032-5.46133333-74.27413333-43.69066667-115.23413333-114.14186667-121.2416z m0.54613334 195.51573333c-38.22933333-1.6384-57.89013333-25.66826667-59.52853334-73.728 1.6384-46.96746667 21.2992-70.99733333 59.52853334-73.728 37.6832 2.73066667 57.344 26.76053333 60.6208 73.728-2.18453333 48.05973333-22.39146667 72.0896-60.6208 73.728zM802.54293333 485.7856H681.30133333c-13.1072 1.09226667-19.6608 8.73813333-20.75306666 23.48373333 1.09226667 16.384 8.192 24.576 20.75306666 24.576h33.86026667v163.29386667c0 16.384 8.73813333 24.576 26.2144 24.576 16.384 0 25.66826667-8.192 27.30666667-24.576V533.84533333h33.86026666c14.7456 0 22.39146667-8.192 23.48373334-25.12213333-1.6384-14.19946667-9.8304-21.84533333-23.48373334-22.9376z"
							p-id="5145" fill="#1296db"></path>
					</svg> -->
					<image src="../../static/index/icon/hot-household.png"></image>
					<text class="grid-text">热门家电</text>
				</u-grid-item>
				<u-grid-item @click="toProList(3)">
					<!-- <svg t="1696816350472" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="6269" width="30" height="30">
						<path
							d="M874.45 216.69H398.37L577.8 88.54l-16.28-22.79-207.63 148.31L234.73 94.89l-19.8 19.8 102 102H153.85a88.24 88.24 0 0 0-88.24 88.24v485.3a88.24 88.24 0 0 0 88.24 88.24h720.6a88.24 88.24 0 0 0 88.24-88.24v-485.3a88.24 88.24 0 0 0-88.24-88.24z m46.24 573.54a46.29 46.29 0 0 1-46.24 46.24h-720.6a46.29 46.29 0 0 1-46.24-46.24v-485.3a46.29 46.29 0 0 1 46.24-46.24h720.6a46.29 46.29 0 0 1 46.24 46.24zM131.79 929.94h117.65v29.41H131.79zM778.86 929.94h117.65v29.41H778.86z"
							fill="#1296db" p-id="6270"></path>
						<path
							d="M852.39 313a43.41 43.41 0 1 0 43.41 43.4 43.46 43.46 0 0 0-43.41-43.4z m0 58.82a15.41 15.41 0 1 1 15.41-15.42 15.43 15.43 0 0 1-15.41 15.42zM852.39 430.64a43.41 43.41 0 1 0 43.41 43.41 43.46 43.46 0 0 0-43.41-43.41z m0 58.82a15.41 15.41 0 1 1 15.41-15.41 15.43 15.43 0 0 1-15.41 15.41zM675.92 297.58H234.73a88.24 88.24 0 0 0-88.24 88.24v323.53a88.24 88.24 0 0 0 88.24 88.24h441.19a88.24 88.24 0 0 0 88.24-88.24V385.82a88.24 88.24 0 0 0-88.24-88.24z m60.24 411.77a60.31 60.31 0 0 1-60.24 60.24H234.73a60.31 60.31 0 0 1-60.24-60.24V385.82a60.31 60.31 0 0 1 60.24-60.24h441.19a60.31 60.31 0 0 1 60.24 60.24z"
							fill="#1296db" p-id="6271"></path>
					</svg> -->
					<image src="../../static/index/icon/tv.png"></image>
					<text class="grid-text">电视影音</text>
				</u-grid-item>
				<u-grid-item @click="toProList(4)">
					<!-- <svg t="1696816429847" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="7421" width="30" height="30">
						<path
							d="M748.101818 240.942545a17.361455 17.361455 0 0 1-11.52-4.352C674.071273 181.620364 594.315636 151.365818 512 151.365818s-162.071273 30.277818-224.581818 85.248a17.384727 17.384727 0 0 1-27.415273-5.911273c-8.797091-19.386182-25.506909-41.076364-34.676364-41.076363a17.454545 17.454545 0 0 1 0-34.909091c24.878545 0 44.357818 23.389091 55.808 41.774545A374.458182 374.458182 0 0 1 512 116.48c83.828364 0 165.213091 28.416 231.400727 80.430545 12.218182-18.734545 32.162909-42.193455 55.272728-42.193454a17.431273 17.431273 0 0 1 0 34.909091c-6.144 0.023273-23.505455 19.339636-35.025455 41.821091a17.408 17.408 0 0 1-15.546182 9.495272z"
							fill="#1296db" p-id="7422"></path>
						<path
							d="M919.970909 672.325818a17.454545 17.454545 0 0 1-16.360727-23.552 430.917818 430.917818 0 0 0 26.600727-148.596363c0-230.586182-187.624727-418.187636-418.210909-418.187637-230.609455 0-418.210909 187.601455-418.210909 418.187637 0 50.455273 9.192727 101.841455 26.600727 148.596363a17.454545 17.454545 0 0 1-32.721454 12.194909 466.059636 466.059636 0 0 1-28.765091-160.768C58.88 250.344727 262.144 47.080727 512 47.080727c249.832727 0 453.12 203.264 453.12 453.096728a466.618182 466.618182 0 0 1-28.765091 160.768 17.501091 17.501091 0 0 1-16.384 11.380363z"
							fill="#1296db" p-id="7423"></path>
						<path
							d="M241.082182 976.919273c-62.580364 0-132.305455-20.666182-169.797818-91.275637-26.577455-50.013091-31.860364-100.561455-15.662546-150.272 22.225455-68.258909 79.965091-116.782545 122.670546-137.541818a17.477818 17.477818 0 0 1 23.668363 8.797091l142.778182 332.008727a17.408 17.408 0 0 1-10.402909 23.412364c-23.761455 8.075636-57.320727 14.871273-93.253818 14.871273zM177.501091 638.114909c-35.514182 22.039273-73.425455 61.090909-88.715636 108.078546-13.125818 40.331636-8.657455 81.757091 13.288727 123.089454 47.825455 89.949091 158.743273 74.845091 202.635636 64.651636L177.501091 638.114909zM782.917818 976.919273c-35.909818 0-69.469091-6.795636-93.230545-14.894546a17.454545 17.454545 0 0 1-10.426182-23.412363l142.778182-332.008728a17.477818 17.477818 0 0 1 23.691636-8.820363c42.705455 20.805818 100.468364 69.306182 122.670546 137.565091 16.174545 49.710545 10.914909 100.258909-15.662546 150.272-37.515636 70.632727-107.240727 91.298909-169.821091 91.298909z m-63.720727-42.845091c43.938909 10.519273 154.321455 26.251636 202.705454-64.791273 21.946182-41.332364 26.437818-82.757818 13.288728-123.112727-15.290182-46.964364-53.178182-85.992727-88.738909-108.055273l-127.255273 295.959273z"
							fill="#1296db" p-id="7424"></path>
					</svg> -->
					<image src="../../static/index/icon/attachment.png"></image>
					<text class="grid-text">配件</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>
		<view class="recommended">
			<view class="recommended-title">
				<h4>{{this.$store.state.recommended}}</h4>
				<view class="recommended-title-right" @click="goMorePro">
					<text>更多</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="recommended-image">
				<image src="../../static/index/recommended1_1.jpg" class="big" @click="bannerGo('/pages/productDetails/productDetails?productid=31')"></image>
				<view class="small">
					<image src="../../static/index/pro23.jpg" @click="bannerGo('/pages/productDetails/productDetails?productid=24')"></image>
					<image src="../../static/index/pro55.jpg" @click="bannerGo('/pages/productDetails/productDetails?productid=66')"></image>
				</view>
			</view>
		</view>
		<view class="pro-list">
			<view class="pro-list-ttile">
				<h4>商品列表</h4>
			</view>
			<view class="pro-list-container">
				<view class="pro-list-inner">
					<view class="pro-list-item" v-for="(item,index) in products" :key="index" @click="goDetails(item.id)">
						<!-- <navigator url="../productDetails/productDetails"> -->
							<view class="img-box">
								<image :src="item.image"></image>
							</view>
							<view class="detail-box">
								<view class="detail-title">
									<span style="font-weight: bolder;font-size: 18px;color: blue;">{{item.id}}</span> -
									{{item.title}}
								</view>
								<view class="price">
									<view class="cur-price">￥{{item.price}}</view>
									<view class="ori-price">￥{{item.oprice}}</view>
								</view>
							</view>
						<!-- </navigator> -->

					</view>
				</view>
			</view>
		</view>
		<login :loginShow="loginShow" :registerShow.sync="registerShow"></login>
		<register :registerShow.sync="registerShow" :loginShow="loginShow"></register>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		data() {
			return {
				registerShow: false,
				title: 'Hello',
				text1: "点我！点我！！点我查看系统说明",
				products: "",
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
			}
		},
		onLoad() {
			// uni.request({
			//   url: this.$baseUrl + '/api/user/register',
			//   method: 'POST',
			//   data: {
			// 	  username: 'wangwu1',
			// 	  pwd: 'wangwu1123'
			//   },
			//   success: (res) => {
			//     console.log(res.data);
			//   },
			//   error: (err) => {
			// 	  console.log(err);
			//   }
			// })
			uni.request({
				url: this.$baseUrl + '/api/products/list',
				method: 'GET',
				success: (res) => {
					// console.log(JSON.stringify(res.data));
					let products = res.data.data;
					this.tempProducts = products;
					this.paging(products);
					this.handleDefault();
				},
				error: (err) => {
					console.log(err);
				}
			})
		},

		onReachBottom() {
			console.log("到底啦");
			this.showToast(this.toast, 500);
			this.goNextPage();
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
			console.log("baseUrl:" + this.$baseUrl);
		},

		methods: {
			...mapActions(["setUser", "setShowLogin"]),
			
			bannerGo(path) {
				uni.navigateTo({
					url: path
				})
			},
			
			toProList(num) {
				uni.setStorageSync("categoryid", num);
				uni.navigateTo({
					url: '/pages/productLists/productLists'
				})
			},
			goMorePro() {
				uni.setStorageSync("categoryid", -1);
				uni.navigateTo({
					url: '/pages/productLists/productLists'
				})
			},
			handleDefault() {
				this.products.forEach(function(item) {
					let image = item.image;
					image = '/' + image;
					item.image = image;
				})
			},
			goDetails(id) {
				uni.navigateTo({
					url: '/pages/productDetails/productDetails?productid=' + id
				})
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			paging(products) {
				let totalLen = products.length;
				let pageSize = 10;
				let x = 0;
				if (totalLen % pageSize) {
					x = 1
				};
				let totalPage = parseInt(totalLen / pageSize) + x;
				let currentPage = 0;
				let nextPage = false;
				if (totalPage < 2) {
					this.products = products;
				} else {
					this.products = [];
					nextPage = true;
					for (var i = 0; i < pageSize; i++) {
						this.products.push(products[i]);
					}
				}
				this.totalLen = totalLen;
				this.pageSize = pageSize;
				this.totalPage = totalPage;
				this.currentPage = currentPage;
				this.nextPage = nextPage;
			},
			goNextPage() {
				let currentPage = this.currentPage;
				let totalPage = this.totalPage;
				let pageSize = this.pageSize;
				let nextPage = this.nextPage;
				let tempProducts = this.tempProducts;
				let tempData = [];
				if (!nextPage) {
					this.showToast(this.toast1, 1500);
				} else {
					currentPage += 1;
					tempData = tempProducts.filter(function(item, index, products) {
						return index >= pageSize * currentPage && index <= pageSize * (currentPage + 1) - 1;
					})
					tempData.forEach(function(item) {
						let image = item.image;
						image = '/' + image;
						item.image = image;
					})
					this.products = this.products.concat(tempData);
					this.currentPage = currentPage;
					if (currentPage == totalPage - 1) {
						nextPage = false;
					}
					this.nextPage = nextPage;
				}
			},
			showToast(toast, duration) {
				this.$refs.uToast.show({
					...toast,
					duration: duration,
					complete() {}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {

		.banner-swiper {
			width: 100%;
			height: 240px;
			margin-top: 10px;

			uni-swiper {
				height: 100%;
			}

			image {
				width: 100%;
			}
		}

		.notice {
			width: 100%;
		}

		.category {
			width: 100%;
			margin-top: 10px;

			.u-grid-item {
				width: 24% !important;
				
				image {
					width: 30px;
					height: 30px;
				}
			}
		}

		.recommended {
			width: 100%;
			margin-top: 10px;

			.recommended-title {
				width: 95%;
				height: 40px;
				line-height: 40px;
				margin: 0 auto;

				h4,
				.recommended-title-right {
					display: inline-block;
				}

				.recommended-title-right {
					float: right;

					text,
					.u-icon {
						display: inline-block;
					}
				}
			}

			.recommended-image {
				width: 95%;
				margin: 0 auto;

				.big {
					width: 100%;
					height: 130px;
					border-radius: 10px;
				}

				.small {
					width: 100%;

					image {
						width: 49%;
						height: 160px;
						border-radius: 10px;
					}
				}
			}
		}

		.pro-list {
			width: 95%;
			margin: 10px auto;

			.pro-list-ttile {
				width: 100%;
				text-align: center;
			}

			.pro-list-container {
				width: 100%;
				margin: 10px auto;
				background: whitesmoke;
				padding-top: 10px;

				.pro-list-inner {
					width: 98%;
					margin: 0 auto;
				}

				.pro-list-item {
					display: inline-block;
					width: 49%;
					background: white;
					margin-bottom: 15px;
					border-radius: 10px;

					.img-box,
					.img-box image {
						width: 100%;
						height: 150px;
					}

					.img-box image {
						border-radius: 10px;
					}

					.detail-title {
						width: 98%;
						font-size: 15px;
						line-height: 16px;
						margin: 8px auto;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}

					.price view {
						display: inline-block;
					}

					.price {
						.cur-price {
							font-size: 18px;
							color: red;
							font-weight: bolder;
							margin-right: 5px;
						}

						.ori-price {
							font-size: 12px;
							color: gray;
							text-decoration: line-through;
						}
					}
				}

				.pro-list-item:nth-child(2n+1) {
					margin-right: 1.5%;
				}
			}
		}
	}
</style>