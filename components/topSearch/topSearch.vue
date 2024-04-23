<template>
	<u-sticky>
		<view class="search">
			<u-search shape="round" v-model="keyword" @custom="submit(keyword)"></u-search>
		</view>
	</u-sticky>
</template>

<script>
	export default {
		name: "topSearch",
		data() {
			return {
				keyword: ""
			};
		},
		methods: {
			submit(value) {
				console.log("value:" + value);
				if (value == "") {
					uni.$u.toast('请输入搜索关键字');
				} else {
					uni.navigateTo({
						url: '/pages/productLists/productLists?keyword=' + this.keyword
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.search {
		width: 100%;
		padding-bottom: 2px;
		background-color: white;

		.u-search {
			width: 95%;
			margin: 5px auto !important;
		}
	}
</style>