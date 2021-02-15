/*
 * @Author: ly525
 * @Date: 2020-05-03 15:52:55
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-03 16:23:24
 * @FilePath: /luban-h5/front-end/h5/src/store/modules/dialog.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
// initial state
const state = {
  viewScript_dialog: false,
  editScript_dialog: false,
  createScript_dialog: false,
  allScriptList_dialog: false,
  editDataSource: false,
  createDataSource: false
}

// getters
const getters = {

}

// actions
const actions = {
  update ({ commit }, payload) {
    commit('update', payload)
  }
}

// mutations
const mutations = {
  update (state, { type, value }) {
    state[type] = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
