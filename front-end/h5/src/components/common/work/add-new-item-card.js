/*
 * @Author: ly525
 * @Date: 2020-04-19 23:16:48
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-19 23:16:58
 * @FilePath: /luban-h5/front-end/h5/src/components/common/work/add-new-item-card.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

export default {
  functional: true,
  render (h, { props, parent }) {
    return (
      <a-card hoverable>
        <div slot="cover" class="flex-center" style="height: 405px;background: #f7f5f557;" onClick={props.handleCreate}>
          <a-icon type="plus" />
        </div>
        <template class="ant-card-actions" slot="actions">
          {/** 创建新作品 */}
          {/** https://kazupon.github.io/vue-i18n/guide/component.html#translation-in-functional-component */}
          <span onClick={props.handleCreate}>{parent.$t('workCard.createNewWork')}</span>
        </template>
      </a-card>
    )
  }
}
