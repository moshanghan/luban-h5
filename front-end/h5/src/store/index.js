/*
 * @Author: ly525
 * @Date: 2020-02-09 15:22:35
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-03 15:54:40
 * @FilePath: /luban-h5/front-end/h5/src/store/index.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor'
import user from './modules/user'
import loading from './modules/loading'
import dialog from './modules/dialog'
import i18n from './modules/i18n'
import dataCenter from './modules/data-center'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    editor,
    user,
    loading,
    dialog,
    i18n,
    dataCenter
  }
})
