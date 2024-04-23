export default {
  state: {
    userInfo: "",
    loginShow: false
  },

  getters: {
    getUser (state) {
      return state.userInfo;
    },
    getLoginShow (state) {
      return state.loginShow;
    }
  },
  mutations: {
    setUser (state, data) {
      state.userInfo = data;
    },
    setShowLogin (state, data) {
      state.loginShow = data;
    }
  },
  actions: {
    setUser ({ commit }, data) {
      commit('setUser', data);
    },
    setShowLogin ({  commit }, data) {
      commit('setShowLogin', data);
    }
  }

}
