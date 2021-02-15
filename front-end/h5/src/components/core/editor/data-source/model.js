/*
 * @Author: ly525
 * @Date: 2020-04-18 19:42:48
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-18 19:43:56
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/data-source/model.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

export class StaticDataSource {
  constructor (ds) {
    ['name', 'relatedDsList', 'dependencies', 'handler', 'type', 'resource', 'url', 'refreshInterval', 'refreshType'].forEach(key => {
      this[key] = ds[key]
    })
    this.handler = `function handler(deps) {\ndebugger\nreturn deps\n}`
    this.relatedDsList = this.relatedDsList || []
    this.dependencies = this.dependencies || []
  }
}

export class HttpDataSource {
  constructor (ds) {
    ['name', 'relatedDsList', 'dependencies', 'handler', 'type', 'resource', 'url', 'refreshInterval', 'refreshType'].forEach(key => {
      this[key] = ds[key]
    })

    this.relatedDsList = this.relatedDsList || []
    this.dependencies = this.dependencies || []
    this.handler = this.handler || `function handler(response){ \n return response.data \n}`
  }
}
