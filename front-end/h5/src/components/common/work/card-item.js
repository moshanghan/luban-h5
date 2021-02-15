/*
 * @Author: ly525
 * @Date: 2020-04-19 21:08:06
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-19 23:48:16
 * @FilePath: /luban-h5/front-end/h5/src/components/common/work/card-item.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

import QRCode from 'qrcode'
import CardCover from './card-cover'

export default {
  props: {
    isTemplate: {
      type: Boolean,
      default: false
    },
    work: {
      type: Object,
      default: () => ({})
    },
    handleClickEdit: {
      type: Function,
      default: () => {}
    },
    handleClickPreview: {
      type: Function,
      default: () => {}
    },
    handleUseTemplate: {
      type: Function,
      default: () => {}
    },
    handleClickDelete: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    qrcodeUrl: ''
  }),
  methods: {
    timeFmt (date) {
      const dateTime = new Date(date)
      const displayTime = `${dateTime.getFullYear()}-${dateTime.getMonth() +
        1}-${dateTime.getDate()}`
      return displayTime
    },
    genQRCodeUrl (work) {
      const url = `${window.location.origin}/works/preview/${work.id}`
      QRCode.toDataURL(url, (err, url) => {
        if (err) console.log(err)
        this.qrcodeUrl = url
      })
    }
  },
  render (h) {
    return (
      <a-card hoverable >
        <CardCover slot="cover" qrcodeUrl={this.qrcodeUrl} coverImageUrl={this.work.cover_image_url} />
        <template class="ant-card-actions" slot="actions">
          {/** 编辑 */}
          {
            this.isTemplate
              ? <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.useNow')}>
                <a-icon type="plus-square" title={this.$t('workCard.useNow')} onClick={() => {
                  this.handleUseTemplate(this.work)
                }} />
              </a-tooltip>
              : <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.edit')}>
                <router-link to={{ name: 'editor', params: { workId: this.work.id } }} target="_blank">
                  <a-icon type="edit" title={this.$t('workCard.edit')}/>
                </router-link>
              </a-tooltip>
          }
          {/** 预览 */}
          <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.preview')}>
            <a-icon type="eye" title={this.$t('workCard.preview')} onClick={this.handleClickPreview} />
          </a-tooltip>
          <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.delete')}>
            <a-icon type="delete" title={this.$t('workCard.delete')} onClick={this.handleClickDelete } />
          </a-tooltip>
          {
            this.qrcodeUrl
              ? <a-icon type="close-circle" onClick={() => { this.qrcodeUrl = '' }} />
              : <a-icon type="qrcode" onClick={() => this.genQRCodeUrl(this.work)} />
          }
          {/**
          <a-icon type="setting" />
          <a-icon type="ellipsis" />
           */}
        </template>
        <a-card-meta
        >
          <div slot="title" class="ant-card-meta-title" style="font-size: 14px;">
            {this.work.title}({this.work.id})
          </div>
          <div slot="description" style="font-size: 12px;">
            {/** 描述 时间 */}
            <div>{this.$t('workCard.description')}: {this.work.description}</div>
            <div>{this.$t('workCard.createTime')}: {this.timeFmt(this.work.created_at)}</div>
          </div>
        </a-card-meta>
      </a-card>
    )
  }
}
