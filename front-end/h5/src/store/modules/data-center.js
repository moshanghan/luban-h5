/*
 * @Author: ly525
 * @Date: 2020-04-08 14:12:33
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-12 16:01:50
 * @FilePath: /luban-h5/front-end/h5/src/store/modules/data-center.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

window.dataCenter1 = {
  ds: {}
}
const state = {
  storage: {}
}

// getters
const getters = {

}

// actions
const actions = {
}

// mutations
const mutations = {
  updateStorage (state, payload) {
    console.log('updateStorage', '=======')
    state.storage = {
      ...state.storage,
      ...payload
    }
    // window.dataCenter1.ds.a = payload
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
