import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/http/request.js'
import URL from '@/http/url.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projectname: "所及后台管理系统",
    projectEnglishName: "operating-background",
    //noe active menu
    activeMenuIndex: "1",
    //if the menu collapse
    menuCollapse: false,
    menuWidth: 4,
    pageWidth: 20,

    logosrc: "/static/logo.png",
    adminsrc: "/static/admin.png",

    username: "用户名",
    password: "密码",
    userposition: "系统管理员",
    data: [],
  },
  mutations: {
    pageChange(state, index) {
      state.activeMenuIndex = index;
    },
    setData(state, payload) {
      state.data = payload
    },
  },
  actions: {
    // getdata({
    //   commit
    // }) {
    //   return  request({
    //       url: URL.userdata
    //     })
    //     .then(res => {
    //       commit('setData', res.data)
    //       console.log(res)
    //       return res
    //     })
    // },

    addOne({
      commit
    }, data) {
      return request({
          url: URL.userdata + '/add',
          method: 'post',
          data: {
            item: JSON.stringify(data)
          }
        })
        .then(res => {
          commit('setData', res.data)
          console.log(res.data)
          return res
        })
    },

    deletedata({
      commit
    }, data) {
      return request({
          url: URL.userdata + '/del',
          method: 'post',
          data: {
            userid: data
          }
        })
        .then(res => {
          commit('setData', res.data)
          console.log(res.data)
          return res
        })
    },
  }

})
