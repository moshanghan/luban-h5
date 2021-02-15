/*
 * @Author: ly525
 * @Date: 2020-04-06 13:02:04
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-06 23:31:49
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/data-source/index.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import { mapState, mapActions } from 'vuex'

import RenderDataSource from './data-source'
import RenderVariablePool from './variable-pool'

export default {
  name: 'dataSourceIndex',
  components: {

  },
  data: () => ({
    text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
    activeKey: ['1']
  }),
  computed: {
    ...mapState('editor', {
      // editingPage: state => state.editingPage,
      // editingElement: state => state.editingElement,
      // elements: state => state.editingPage.elements,
      // pages: state => state.work.pages,
      // work: state => state.work
    }),
    ...mapState('loading', [
      // 'saveWork_loading',
      // 'previewWork_loading',
      // 'setWorkAsTemplate_loading',
      // 'uploadWorkCover_loading'
    ])
  },
  methods: {
    ...mapActions('editor', [
      // 'dataSourceManager'
      // 'elementManager',
      // 'saveWork',
      // 'createWork',
      // 'fetchWork',
      // 'setWorkAsTemplate',
      // 'setEditingElement',
      // 'setEditingPage'
    ]),
    ...mapActions('loading', {
      // updateLoading: 'update'
    })
  },
  render (h) {
    return (
      <div>
        <RenderVariablePool></RenderVariablePool>
        <RenderDataSource></RenderDataSource>
      </div>
    )
  },
  created () {
    // // event bus for editor
    // window.getEditorApp = this
    // let workId = this.$route.params.workId
    // if (workId) {
    //   this.fetchWork(workId).then(() => this.setActiveTab('background'))
    // } else {
    //   this.$message.error('no work id!')
    // }

    // window.getEditorApp.$on('setEditingElement', ({ name }) => {
    //   this.setActiveTab(name === 'lbp-background' ? 'background' : '属性')
    // })
  }
}
