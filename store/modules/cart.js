import Vue from 'vue'

export default {
	state: {
		cart: []
	},
	getters: {
		getNum(state) {
			return state.cart.length;
		},
		getShoppingCart(state) {
			return state.cart;
		},
		getCheckedNum(state) {
			let checkedNum = 0;
			for (var i = 0; i < state.cart.length; i++) {
				let temp = state.cart[i];
				if (temp.checked) {
					checkedNum++;
				}
			}
			return checkedNum;
		},
		getCheckedItem(state) {
			let checkedItems = [];
			for (var i = 0; i < state.cart.length; i++) {
				let temp = state.cart[i];
				if (temp.checked) {
					checkedItems.push(temp);
				}
			}
			return checkedItems;
		},
		getTotalPrice(state) {
			let totalPrice = 0;
			for (let i = 0; i < state.cart.length; i++) {
				const temp = state.cart[i];
				if (temp.checked) {
					totalPrice += temp.price * temp.count;
				}
			}
			return totalPrice.toFixed(2);
		},
		getIsAllChecked(state) {
			let isAllChecked = true;
			for (let i = 0; i < state.cart.length; i++) {
				const temp = state.cart[i];
				if (!temp.checked) {
					isAllChecked = false;
					return isAllChecked;
				}
			}
			return isAllChecked;
		}
	},
	mutations: {
		setShoppingCart(state, cart) {
			state.cart = cart;
		},
		setChecked(state, index) {
			if (typeof(state.cart[index].checked) === "undefined" || state.cart[index].checked == false) {
				Vue.set(state.cart[index], "checked", true);
			} else {
				Vue.set(state.cart[index], "checked", false);
			}
		},
		setChecked1(state, index) {
			Vue.set(state.cart[index], "checked", true);
		},
		setAllChecked(state, bool) {
			for (var i = 0; i < state.cart.length; i++) {
				Vue.set(state.cart[i], "checked", bool);
			}
		},
		updateCart(state, payload) {
			if (payload.count) {
				Vue.set(state.cart[payload.index], "count", payload.count);
			}
			if (payload.args) {
				Vue.set(state.cart[payload.index], "args", payload.args);
			}
		},
		delCart(state, payload) {
			for (var i = 0; i < state.cart.length; i++) {
			  for (var j = 0; j < payload.checkedItems.length; j++) {
			    if (state.cart[i].cartid == payload.checkedItems[j].cartid) {
			      console.log("yes");
			      state.cart.splice(i, 1);
			    }
			  }
			}
		}
	},
	actions: {
		setShoppingCartSync({
			commit
		}, payload) {
			let _this = payload._this;
			let userid = payload.userid;
			uni.request({
				url: _this.$baseUrl + '/api/cart/list?userid=' + userid,
				method: 'GET',
				success: (res) => {
					if (res.data.errno) {
						uni.$u.toast('操作失败，请稍后重试');
					} else {
						commit('setShoppingCart', res.data.data);
					}
				},
				error: (err) => {
					console.log(err);
				}
			})
		},
		setChecked({
			commit
		}, index) {
			commit('setChecked', index);
		},
		setChecked1({
			commit
		}, index, bool) {
			commit('setChecked1', index, bool);
		},
		setAllChecked({
			commit
		}, bool) {
			commit('setAllChecked', bool);
		},
		updateCart({commit}, payload) {
			commit('updateCart', payload);
		},
		delCart({commit}, payload) {
			commit('delCart', payload);
		}
	}
}