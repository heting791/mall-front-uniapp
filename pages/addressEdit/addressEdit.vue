<template>
	<view class="address-edit-content">
		<view class="address-edit-content-inner">
			<u--form labelPosition="left" labelWidth="80" :model="model" :rules="rules" ref="uForm">
				<view class="inner-normal">
					<view class="inner-normal-inner">
						<u-form-item label="收货人" prop="address.name" borderBottom ref="item1">
							<u--input v-model="model.address.name" border="none"></u--input>
						</u-form-item>
						<u-form-item label="手机号码" prop="address.phone" borderBottom ref="item1" rightIcon="+86">
							<u--input v-model="model.address.phone" border="none"></u--input>
							<view class="phone-prefix" slot="right" @click="phonePrefixShow = true">
								<span>+{{model.address.phoneprefix}}</span>
								<u-icon name="arrow-right"></u-icon>
							</view>
						</u-form-item>
						<u-form-item label="所在地区" prop="address.area" borderBottom ref="item1"
							@click="areaPickerShow = true">
							<u--input v-model="model.address.area" border="none"></u--input>
							<u-icon slot="right" name="map-fill" color="orange" size="20"></u-icon>
						</u-form-item>
						<u-form-item label="详细地址" prop="address.deatailad" borderBottom ref="item1">
							<textarea v-model="model.address.deatailad" style="width: 99%;"></textarea>
						</u-form-item>
					</view>
				</view>
				<view class="inner-other">
					<view class="other-tags">
						<u-form-item label="标签" prop="address.tag" borderBottom ref="item1">
							<u-tag text="家" plain type="warning" v-if="model.address.tag!='家'" @click="model.address.tag='家'"></u-tag>
							<u-tag text="家" type="warning" v-if="model.address.tag=='家'" @click="model.address.tag=''"></u-tag>
							<u-tag text="公司" type="warning" v-if="model.address.tag=='公司'" @click="model.address.tag=''"></u-tag>
							<u-tag text="公司" plain type="warning" v-if="model.address.tag!='公司'" @click="model.address.tag='公司'"></u-tag>
						</u-form-item>
					</view>
					<view class="other-setdefault">
						<u-form-item label="设为默认地址" labelWidth="120" prop="address.defaultad" borderBottom ref="item1">
							<u-switch v-model="model.address.defaultad?true:false" activeColor="orange"
								@change="change"></u-switch>
						</u-form-item>
					</view>
				</view>
				<view class="inner-submit">
					<u-button shape="circle" text="提交" @click="submit"
						color="linear-gradient(to right,#FFC41D,#FF9218)"></u-button>
				</view>
				<view class="inner-popup">
					<view class="phone-prefix-list">
						<u-popup :show="phonePrefixShow" mode="center" :round="10">
							<view class="list">
								<ul>
									<li v-for="item in phonePrefixList" @click="changePrefix(item.value)">
										<span>{{item.name}}</span>
										<u-icon name="checkmark-circle-fill" size="25" color="blue"
											v-if="item.checked"></u-icon>
										<u-icon name="checkmark-circle" size="25" v-else></u-icon>
									</li>
								</ul>
							</view>
							<view class="list-bottom" @click="phonePrefixShow = false">
								<p>取消</p>
							</view>
						</u-popup>
					</view>
					<view>
						<!-- 户籍所在地 -->
						<u-picker ref="uPicker" :show="areaPickerShow" :columns="addressColumns"
							:defaultIndex="areaDetault" :closeOnClickOverlay="true" @confirm="nationSel($event, 'area')"
							@cancel="areaPickerShow=false" @close="areaPickerShow=false" @change="changeHandler" />
					</view>
				</view>
			</u--form>
		</view>
	</view>
</template>

<script>
	import areaData from '@/utils/region.json'
	export default {
		data() {
			return {
				default: {
					name: "",
					phone: "",
					phoneprefix: 86,
					area: "",
					deatailad: "",
					tag: "",
					defaultad: false
				},
				areaPickerShow: false, //控制弹窗显示与隐藏
				areaData: areaData, //原始数据
				addressColumns: [], //数据数组
				areaDetault: [], //数据回显时的默认数据
				model: {
					address: {},
				},
				rules: {
					'address.name': [{
						required: true,
						message: '此为必填字段',
						// blur和change事件触发检验
						trigger: ['blur', 'change'],
					}],
					'address.phone': [{
							required: true,
							message: '此为必填字段',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
						// 正则判断为字母或数字
						{
							pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '手机号码格式不正确，请重新输入',
							trigger: ['blur', 'change'],
						},
					],
					'address.area': [{
						required: true,
						message: '此为必填字段',
						// blur和change事件触发检验
						trigger: ['blur', 'change'],
					}],
				},
				phonePrefixShow: false,
				phonePrefixList: [{
						name: "中国大陆 +86",
						value: 86
					},
					{
						name: "中国香港 +852",
						value: 852
					},
					{
						name: "中国澳门 +853",
						value: 853,
						checked: true
					},
					{
						name: "中国台湾 +886",
						value: 886
					},
					{
						name: "韩国 +82",
						value: 82
					},
					{
						name: "日本 +81",
						value: 81
					},
					{
						name: "美国 +1",
						value: 1
					},
					{
						name: "加拿大 +1",
						value: 1
					},
					{
						name: "英国 +44",
						value: 44
					},
					{
						name: "澳大利亚 +61",
						value: 61
					},
				],
				showLocation: false,
				addressid: -1,
				confirm: false,
				orderId: -1,
				orderIds: []
			};
		},
		onLoad(options) {
			if (options.addressid) {
				this.addressid = options.addressid;
				console.log("id:" + options.addressid);
				uni.request({
					url: this.$baseUrl + '/api/address/goEdit?id=' + options.addressid,
					method: 'GET',
					success: (res => {
						console.log("res:" + JSON.stringify(res.data.data));
						this.model.address = res.data.data;
						this.getAreaList();
						this.setDefault();
					}),
					error: (err) => {
						console.log(err);
					}
				})
				if (options.confirm) {
					console.log("yes!confirm");
					this.confirm = options.confirm;
					if (options.orderId) {
						this.orderId = options.orderId;
					} else if (options.orderIds) {
						console.log("yes!orderIds");
						this.orderIds = options.orderIds;
					}
				}
			} else {
				this.model.address = this.default;
				this.getAreaList();
				if (options.confirm) {
					this.confirm = options.confirm;
					if (options.orderId) {
						this.orderId = options.orderId;
					} else if (options.orderIds) {
						console.log("yes!orderIds");
						this.orderIds = options.orderIds;
					}
				}
			}
		},
		created() {
			
		},
		methods: {
			// 户籍所在地数据初始化
			getAreaList() {
				//省的数组
				const provinceData = this.areaData.map(e => {
					return e.name
				})
				//市的数组
				const cityData = this.areaData.map(e => {
					const arr = []
					arr.push(
						e.children.map(c => {
							return c.name
						})
					)
					return arr
				})
				//区的数组
				const areaData = this.areaData.map(e => {
					const arr = []
					arr.push(
						e.children.map(c =>
							c.children.map(d => {
								return d.name
							})
						)
					)
					return arr
				})
				const arr = [provinceData, cityData[0][0], areaData[0][0][0]] //组装
				this.addressColumns = arr
			},
			// 选中时执行
			changeHandler(e) {
				const {
					columnIndex,
					index,
					indexs,
					picker = this.$refs.uPicker
				} = e
				if (columnIndex === 0) {
					const children1 = this.areaData[index].children.map(e => {
						return e.name
					})
					picker.setColumnValues(1, children1)
					const children2 = this.areaData[index].children[indexs[1]].children.map(e => {
						return e.name
					})
					picker.setColumnValues(2, children2)
				}
				if (columnIndex === 1) {
					const children3 = this.areaData[indexs[0]].children[indexs[1]].children.map(e => {
						return e.name
					})
					picker.setColumnValues(2, children3)
				}
			},
			change(e) {
				console.log(e);
				this.model.address.defaultad = e;
			},
			
			nationSel(event, type) {
				let value = event.value;
				this.model.address.area = value.join(' ');
				this.areaPickerShow = false;
			},
			// 根据回显数据设置默认选中项
			setDefault() {
				// 户籍所在地
				let temp = [];
				console.log("area:" + this.model.address.area);
				temp = this.model.address.area.split(' ')
				let index, index1, index2 = 0
				let arr, arr1, arr2 = []
				//市区对应每列的第几个
				this.areaData.forEach((item, i) => {
					if (item.name == temp[0]) {
						index = i
						item.children.forEach((val, ind) => {
							if (val.name == temp[1]) {
								index1 = ind
								val.children.forEach((e, n) => {
									if (e.name == temp[2]) {
										index2 = n
									}
								})
							}
						})
					}
				})
				//匹配省市区对应每列的第几个
				arr = this.areaData.map(e => {
					return e.name
				})
				arr1 = this.areaData[index].children.map(e => {
					return e.name
				})
				arr2 = this.areaData[index].children[index1].children.map(e => {
					return e.name
				})
				this.addressColumns = [arr, arr1, arr2]
				this.areaDetault = [index, index1, index2]
			},
			submit() {
				console.log("orderIds:" + JSON.stringify(this.orderIds));
				console.log("submit-addressid:" + this.addressid);
				this.$refs.uForm.validate().then(res => {
					let detailad = this.model.address.deatailad;
					let defaultad = this.model.address.defaultad;
					this.model.address.defaultad = defaultad ? 1 : 0;
					if (detailad != "") {
						uni.$u.toast('校验成功')
						if (this.addressid != -1) {
							console.log("yes-if");
							uni.request({
								url: this.$baseUrl + '/api/address/addressUpdate?id=' + this.addressid + '&userid=' + uni.getStorageSync('userid'),
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded',
								},
								data: {
									area: this.model.address.area,
									name: this.model.address.name,
									deatailad: this.model.address.deatailad,
									phoneprefix: this.model.address.phoneprefix,
									phone: this.model.address.phone,
									tag: this.model.address.tag,
									defaultad: this.model.address.defaultad
								},
								success: (res) => {
									if (this.confirm) {
										if (this.orderId != -1) {
											this.setChecked(this.orderId, this.addressid);
										} else {
											let orderIds = JSON.parse(this.orderIds);
											this.setChecked(orderIds, this.addressid);
										}
									} else {
										uni.navigateTo({
											url: '/pages/addressList/addressList'
										})
									}
								},
								error: (err) => {
									console.log(err);
								}
							})
						} else {
							console.log("yes-else");
							uni.request({
								url: this.$baseUrl + '/api/address/newAddress?' + 'userid=' + uni.getStorageSync('userid'),
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded',
								},
								data: {
									area: this.model.address.area,
									name: this.model.address.name,
									deatailad: this.model.address.deatailad,
									phoneprefix: this.model.address.phoneprefix,
									phone: this.model.address.phone,
									tag: this.model.address.tag,
									defaultad: this.model.address.defaultad
								},
								success: (res) => {
									if (!res.data.errno) {
										console.log(res);
										let addressId = res.data.data;
										console.log("new addressid:" + addressId);
										if (this.confirm) {
											if (this.orderId != -1) {
												this.setChecked(this.orderId, addressId);
											} else {
												let orderIds = JSON.parse(this.orderIds);
												this.setChecked(orderIds, addressId);
											}
										} else {
											uni.navigateTo({
												url: '/pages/addressList/addressList'
											})
										}
									} else {
										uni.$u.toast('操作失败，请稍后重试');
									}
								},
								error: (err) => {
									console.log(err);
								}
							})
						}
					} else {
						uni.$u.toast('请输入详细地址')
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			setChecked(orderIds, addressId) {
				console.log("orderIds:" + JSON.stringify(orderIds));
				console.log("type:" + typeof(orderIds));
				let paramType = typeof(orderIds);
				if (paramType === 'string') {
					uni.navigateTo({
						url: '/pages/orderConfirm/orderConfirm?id=' + orderIds + '&checkedAddressId=' + addressId
					})
				} else if (paramType === 'object') {
					orderIds = JSON.stringify(orderIds);
					uni.navigateTo({
						url: '/pages/orderConfirm/orderConfirm?ids=' + orderIds + '&checkedAddressId=' + addressId
					})
				}
			},
			changePrefix(value) {
				console.log("value:" + value);
				let phonePrefixList = this.phonePrefixList;
				for (var i = 0; i < phonePrefixList.length; i++) {
					phonePrefixList[i].checked = false;
					if (phonePrefixList[i].value == value) {
						phonePrefixList[i].checked = true;
						this.model.address.phoneprefix = value;
						this.phonePrefixShow = false;
					}
				}
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
	};
</script>

<style lang="scss">
	.address-edit-content {
		margin-top: 10px;
		background-color: whitesmoke;

		.address-edit-content-inner {
			.inner-normal {
				background-color: white;

				.inner-normal-inner {
					width: 94%;
					margin: 0 auto;

					.phone-prefix {
						span {
							display: inline-block;
							margin-right: 3px;
						}

						.u-icon {
							display: inline-block;
							vertical-align: top;
							margin-top: 2px;
						}
					}
				}
			}

			.inner-other {
				margin: 20px 0;
				background-color: white;

				.other-tags {
					width: 94%;
					margin: 0 auto;

					.u-transition {
						margin-right: 15px;
					}
				}

				.other-setdefault {
					width: 94%;
					margin: 0 auto;
				}
			}

			.inner-submit {
				position: fixed;
				bottom: 0;
				width: 100%;
				background-color: white;

				.u-button {
					width: 93%;
					margin: 0 auto;
				}
			}

			.inner-popup {
				.phone-prefix-list {
					.list {
						width: 650rpx;

						ul {
							margin: 0;
							padding: 0;
							width: 90%;
							margin: 0 auto;

							li {
								list-style-type: none;
								height: 40px;
								line-height: 40px;

								span {
									display: inline-block;
									width: calc(100% - 30px);
								}

								.u-icon {
									display: inline-block;
									float: right;
									margin-top: 5px;
								}
							}
						}
					}

					.list-bottom {
						width: 100%;
						height: 45px;
						line-height: 45px;
						text-align: center;
						color: blue;
						border-top: 1px solid lightgray;
					}
				}
			}
		}
	}
</style>