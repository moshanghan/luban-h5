/*
 * @Author: ly525
 * @Date: 2020-04-12 15:41:14
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-12 17:59:02
 * @FilePath: /luban-h5/front-end/h5/src/components/core/models/data-source.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

import axios from 'axios'
import DS_STATIC from '@/constants/data-source'

export default class DataSource {
  constructor (ds, vm) {
    this.init(ds)
    this.vm = vm
  }

  init (ds) {
    this.name = ds.name
    this.url = ds.url
    this.type = ds.type
    this.dependencies = ds.dependencies || []
    this.relatedDsList = ds.relatedDsList || []
    this.refreshType = ds.refreshType || DS_STATIC.REFRESH.TYPES.ONCE
    this.refreshInterval = ds.refreshInterval || DS_STATIC.REFRESH.DEFAULT_INTERVAL
    this.pipe = this.getHandlerFn(ds.handler)
  }

  updateRelated () {
    const storage = (this.relatedDsList || []).reduce((storage, dsName) => {
      let ds = (window.__work.dataSources || []).find(ds => ds.name === dsName)
      if (!ds || ds.type !== DS_STATIC.TYPES.STATIC) return storage
      ds = new DataSource(ds, this.options)

      const deps = ds.dependencies.reduce((deps, name) => ({ ...deps, [name]: this.vm.$ds[name] }), {})
      return { ...storage, [dsName]: typeof ds.pipe === 'function' ? ds.pipe(deps) : {} }
    }, {})
    this.vm.updateStorage(storage)
  }

  getHandlerFn (handlerStr) {
    return new Function(`return ${handlerStr}`)()
  }

  _request () {
    const ds = this
    return new Promise((resolve, reject) => {
      axios(ds.url).then(response => {
        const storage = {
          [ds.name]: typeof ds.pipe === 'function' ? ds.pipe(response) : response.data
        }
        this.vm.updateStorage(storage)
        this.updateRelated()
        resolve()
      })
    })
  }

  request () {
    return this._request().then(() => {
      if (this.refreshType === DS_STATIC.REFRESH.TYPES.FIXED) {
        setInterval(() => {
          this._request()
        }, this.refreshInterval * 1000)
      }
    })
  }
}
