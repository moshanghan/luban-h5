/*
 * @Author: ly525
 * @Date: 2020-02-09 15:22:35
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-06 23:25:19
 * @FilePath: /luban-h5/front-end/h5/src/store/modules/editor.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
// initial state
import Work from 'core/models/work'
import { actions as workActions, mutations as workMutations } from './work'

const state = {
  works: [],
  work: new Work(),
  formDetailOfWork: {
    uuidMap2Name: {},
    formRecords: []
  },
  workTemplates: [],
  scripts: []
}

// getters
const getters = {}

// actions
const actions = {
  ...workActions
}

// mutations
const mutations = {
  ...workMutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
