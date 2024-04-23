<template>
	<view class="judge-edit-content">
		<view class="product-info">
			<proInfo :judgeFlag="true" :product="product"></proInfo>
		</view>
		<view class="judge-container">
			<view class="container-inner">
				<form>
					<view class="inner-rate">
						<span>综合评分：</span>
						<u-rate v-model="value" size="20"></u-rate>
					</view>
					<view class="inner-content">
						<textarea placeholder="请填写评价" v-model="content" name="content"></textarea>
						<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" @oversize="oversize"
							name="files" multiple :maxCount="10" :maxSize="1048576"></u-upload>
					</view>
					<view class="submit">
						<u-button type="primary" shape="circle" color="red" text="提交评价" @click="onSubmit"></u-button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				product: {},
				fileList: [],
				content: "",
				tempFileList: []
			}
		},
		onLoad(options) {
			if (options.id) {
				let id = options.id;
				uni.request({
					url: this.$baseUrl + '/api/order/details?id=' + id,
					method: 'GET',
					success: (res) => {
						if (res.data.errno) {
							uni.$u.toast('操作失败，请稍后重试');
						} else {
							res.data.data[0].image = '/' + res.data.data[0].image;
							this.product = res.data.data[0];
						}
					},
					error: (err) => {
						console.log(err);
					}
				})
			}
		},
		methods: {
			deletePic(event) {
				// this[`fileList${event.name}`].splice(event.index, 1);
				uni.$u.toast('删除功能正在开发中，敬请期待~');
			},
			// 新增图片
			async afterRead(event) {
				console.log(event);
				let files = event.file;
				let breakLoop = false;
				for (var i = 0; i < files.length; i++) {
					if (!breakLoop) {
						uni.uploadFile({
							url: this.$baseUrl1 + '/upload', // 仅为示例，非真实的接口地址
							filePath: files[i].url,
							name: 'judge',
							formData: {
								user: 'test'
							},
							success: (res) => {
								console.log(res);
								if (res.statusCode == 200) {
									this.checkAfterRead(res.data, files.length);
								} else {
									breakLoop = true;
									uni.$u.toast('出错啦！请稍后再试');
								}
							}
						})
					}
				}
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				// let lists = [].concat(event.file)
				// let fileListLen = this[`fileList${event.name}`].length
				// lists.map((item) => {
				// 	this[`fileList${event.name}`].push({
				// 		...item,
				// 		status: 'uploading',
				// 		message: '上传中'
				// 	})
				// })
				// for (let i = 0; i < lists.length; i++) {
				// 	const result = await this.uploadFilePromise(lists[i].url)
				// 	let item = this[`fileList${event.name}`][fileListLen]
				// 	this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
				// 		status: 'success',
				// 		message: '',
				// 		url: result
				// 	}))
				// 	fileListLen++
				// }
			},
			checkAfterRead(resdata, filesLen) {
				let tempFileList = this.tempFileList;
				let obj1 = {
					url: resdata
				}
				tempFileList.unshift(obj1);
				resdata = this.$baseUrl1 + '/uploads/' + resdata;
				let obj = {
					url: resdata
				}
				let fileList = this.fileList;
				fileList.unshift(obj);
				this.fileList = fileList;
				if (fileList.length == filesLen) {
					uni.$u.toast('上传成功！');
				}
			},
			// uploadFilePromise(url) {
			// 	return new Promise((resolve, reject) => {
			// 		let a = uni.uploadFile({
			// 			url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
			// 			filePath: url,
			// 			name: 'file',
			// 			formData: {
			// 				user: 'test'
			// 			},
			// 			success: (res) => {
			// 				setTimeout(() => {
			// 					resolve(res.data.data)
			// 				}, 1000)
			// 			}
			// 		});
			// 	})
			// },
			oversize(e) {
				console.log(e);
				uni.$u.toast('上传失败，请选择小于1MB的文件');
			},
			onSubmit(e) {
				console.log(e);
				if (this.value == 0) {
					uni.$u.toast('请评分');
					return false;
				} else {
					let fileList = this.tempFileList;
					let fileList1 = "";
					if (fileList.length > 0) {
						for (var i = 0; i < fileList.length; i++) {
							fileList1 += fileList[i].url + ';';
						}
					}
					uni.request({
						url: this.$baseUrl1 + '/api/judge/addJudge',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
						},
						data: {
							orderid: this.product.id,
							rate: this.value,
							content: this.content,
							images: fileList1
						},
						success: (res) => {
							console.log("successs");
							console.log(res);
							if (res.statusCode == 200) {
								uni.request({
									url: this.$baseUrl + '/api/order/update?id=' + this.product.id + '&status=4',
									method: 'GET',
									success: (res) => {
										console.log(res);
										if (res.data.errno) {
											uni.$u.toast('操作失败inner，请稍后重试');
										} else {
											uni.$u.toast('操作成功！');
											setTimeout(function() {
												uni.navigateBack();
											},1000);
										}
									},
									error: (err) => {
										console.log(err);
									}
								})
							} else {
								uni.$u.toast('操作失败，请稍后重试');
							}
						},
						error: (err) => {
							console.log(err);
						},
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.judge-edit-content {
		.judge-container {
			width: 95%;
			margin: 10px auto;

			.inner-rate {
				margin-bottom: 10px;

				span {
					font-size: 14px;
					font-weight: bolder;
				}

				.u-rate {
					display: inline-block;
				}
			}

			.inner-content {
				border: 1px solid lightgray;
				padding: 10px;
				margin-bottom: 10px;

				textarea {
					font-size: 13px;
				}
			}

			.submit {
				.u-button {
					height: 33px;
				}
			}
		}
	}
</style>