/*
 * @Author: ly525
 * @Date: 2020-04-06 12:27:37
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-12 12:45:35
 * @FilePath: /luban-h5/front-end/h5/src/store/modules/data-source.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

// actions
export const actions = {
  dataSourceManager ({ commit }, payload) {
    commit('dataSourceManager', payload)
  }
}

// mutations
export const mutations = {
  dataSourceManager (state, { type, value }) {
    const dataSource = value

    function collectRelatedDataSource () {
      (dataSource.dependencies || []).forEach(dependency => {
        const ds = state.work.dataSources.find(ds => ds.name === dependency)
        if (ds) {
          ds.relatedDsList.push(dataSource.name)
        }
      })
    }

    switch (type) {
      case 'editTitle':
        const { pageIndexForEditingTitle, newTitle } = value
        state.work.dataSources[pageIndexForEditingTitle].title = newTitle
        break
      case 'add':
        // const page = new Page(value)
        // state.work.dataSources.push(page)

        collectRelatedDataSource()
        state.work.dataSources.push({
          ...dataSource
        })
        break
      case 'copy':
        state.work.dataSources.push(state.editingPage.clone())
        break
      case 'delete':
        const { work } = state
        let index = work.dataSources.findIndex(ds => ds.name === dataSource.name)
        if (index !== -1) {
          work.dataSources.splice(index, 1)
        }
        break
      default:
    }
  }
}
