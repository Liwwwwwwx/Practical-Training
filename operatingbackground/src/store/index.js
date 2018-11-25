import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/http/request.js'
import URL from '@/http/url.js'
import axios from 'axios'
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
    data: []
  },
  mutations: {
    pageChange(state, index) {
      state.activeMenuIndex = index;
    },
    setData(state, payload) {
      state.data = payload
      console.log(state.data)
    }
  },
  actions: {
    // getdata({ commit }) {
    //   var instance = axios.create({
    //     headers: {'content-type': 'application/x-www-form-urlencoded'}
    // });
    // instance.get(URL.data).then(res => {
    //   commit('setData',res.data)
    //   res.data
    // });
    // },
    async getdata({
      commit
    }) {
      return await request({
          url: URL.userdata
        })
        .then(res => {
          commit('setData', res.data)
          return res
        })
    },
    // deletedata({commit}) {
    //   var instance = axios.create({
    //   headers: {'content-type': 'application/x-www-form-urlencoded'}
    // })
    //   instance.delete(URL.data,use).then(res =>{
    //     commit('setData',res.data)
    //     return res
    //   })
    // }
  }

})
