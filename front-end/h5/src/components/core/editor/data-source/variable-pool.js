/*
 * @Author: ly525
 * @Date: 2020-04-06 12:52:33
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-07 18:23:13
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/data-source/variable-pool.js
 * @Github: https://github.com/ly525/luban-h5
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 * @Description: 数据源面板
 */

export default {
  props: {
    pages: {
      required: false,
      type: Array,
      default: () => []
    },
    editingPage: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    hoverIndex: -1, // 显示编辑按钮
    editingTitle: '', // 临时缓存当前编辑的 title，点击 Yes 再真正用其更新 page title
    dialog: {
      visible: false,
      confirmLoading: false

    }
  }),
  methods: {
    getTitle (page, index) {
      return page.title || this.$t('editor.pageManager.title', { index })
    },
    showAddDialog () {

    },
    handleSelectDataSourceType (type) {
      // this.showAddDialog()
      this.dialog.visible = true
    },
    _renderEditTitle (page, index) {
      return (
        <a-popconfirm
          placement="bottom"
          onConfirm={() => {
            this.$emit('editTitle', { newTitle: this.editingTitle, pageIndexForEditingTitle: index })
          }}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <a-input
            slot="title"
            value={this.editingTitle}
            size="small"
            onChange={e => {
              this.editingTitle = e.target.value
            }}
          >
          </a-input>
          <a-icon type="edit" onClick={(e) => {
            e.stopPropagation() // 将 click icon 与 click page item 隔离开。编辑标题的同时不要切换页面
            this.editingTitle = this.getTitle(page, index)
          }}/>
        </a-popconfirm>
      )
    },
    renderAddAction (page, index) {
      // const addPageText = this.$t('editor.pageManager.action.add')
      // const copyPageText = this.$t('editor.pageManager.action.copy')
      // const deletePageText = this.$t('editor.pageManager.action.delete')
      const types = [
        {
          'value': 'static',
          'label': '静态数据源'
        },
        {
          'value': 'http-api',
          'label': 'http/https'
        },
        {
          'value': 'csv',
          'label': 'CSV'
        }
      ]
      return (
        <a-dropdown trigger={['click']} placement='bottomCenter' slot="extra">
          <a-icon type="plus" onClick={e => e.stopPropagation()}></a-icon>
          <a-menu slot="overlay" onClick={this.handleSelectDataSourceType}>
            {
              types.map(type => (
                <a-menu-item key={type.value} index={type.value}>{type.label}</a-menu-item>
              ))
            }
          </a-menu>
        </a-dropdown>
      )
    },
    onLeave () {
      this.hoverIndex = -1
    }
  },
  render (h) {
    return (
      <div>
        <a-collapse
          activeKey={this.activeKey}
          onChange={val => { this.activeKey = val }}
          expandIconPosition="right"
          bordered={false}
        >
          <a-collapse-panel header="变量池(todo)" key="2">
            {/* {this.renderAddAction()} */}
            <p>{this.text}</p>
          </a-collapse-panel>
        </a-collapse>
        <a-modal
          title="Title"
          visible={this.dialog.visible}
          onOk={() => {

          }}
          onCancel={() => {

          }}
          confirmLoading={this.dialog.confirmLoading}
        >
          <p>ddd</p>
        </a-modal>
      </div>
    )
  }
}
