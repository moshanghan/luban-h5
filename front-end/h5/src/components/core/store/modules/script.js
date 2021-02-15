import strapi from '@/utils/strapi'
import { AxiosWrapper } from '../../../../utils/http.js'

export const actions = {
  /**
   * isSaveCover {Boolean} 保存作品时，是否保存封面图
   * loadingName {String} saveScript_loading, previewScript_loading
   * 预览作品之前需要先保存，但希望 用户点击保存按钮 和 点击预览按钮 loading_name 能够不同（虽然都调用了 saveScript）
   * 因为 loading 效果要放在不同的按钮上
   */
  saveScript ({ commit, dispatch, state }, { isSaveCover = false, loadingName = 'saveScript_loading', successMsg = '保存作品成功' } = {}) {
    return new AxiosWrapper({
      dispatch,
      commit,
      loading_name: loadingName,
      successMsg,
      customRequest: strapi.updateEntry.bind(strapi)
    }).put('scripts', state.work.id, state.work)
  },
  fetchScript ({ commit, state }, workId) {
    return strapi.getEntry('scripts', workId).then(entry => {
      commit('setScript', entry)
      commit('setEditingPage')
    })
  },
  deleteScript ({ commit, state }, workId) {
    return strapi.deleteEntry('scripts', workId)
  },
  fetchScripts ({ commit, dispatch, state }, payload = { _limit: 100 }) {
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setScripts',
      loading_name: 'fetchScripts_loading',
      successMsg: '获取作品列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('scripts', payload)
  }
}

// mutations
export const mutations = {
  /**
   * payload: {
   *  type:   @params {String} "editor/setScripts",
   *  value:  @params {Array}  work list
   * }
   */
  setScripts (state, { type, value }) {
    // value.sort((a, b) => b.id - a.id)
    state.scripts = value
  }
}
