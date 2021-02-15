/*
 * @Author: ly525
 * @Date: 2020-04-19 23:15:07
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-19 23:26:33
 * @FilePath: /luban-h5/front-end/h5/src/views/work-manager/list-mixin.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    workList: []
  }),
  computed: {
    ...mapState('editor', []),
    ...mapState('loading', ['fetchWorks_loading'])
  },
  methods: {
    ...mapActions('editor', [
      'fetchWorks',
      'createWork',
      'deleteWork',
      'useTemplate',
      'fetchWorkTemplates'
    ]),
    handleDeleteWork (work) {
      this.deleteWork(work.id).then(res => {
        const index = this.workList.findIndex(item => item.id === work.id)
        this.workList.splice(index, 1)
      })
    }

  }
}
