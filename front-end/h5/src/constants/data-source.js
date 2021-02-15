/*
 * @Author: ly525
 * @Date: 2020-04-12 15:05:29
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-12 15:39:11
 * @FilePath: /luban-h5/front-end/h5/src/constants/data-source.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

const HTTP_API = 'http-api'
const STATIC = 'static'
const CSV = 'csv'

const REFRESH_TYPE_FIXED = 'fixed'
const REFRESH_TYPE_ONCE = 'once'
const REFRESH_DEFAULT_INTERVAL = 2

export default {
  TYPES: {
    STATIC,
    HTTP_API,
    CSV
  },
  TYPE_LIST: [
    {
      'value': STATIC,
      'label': '静态数据源'
    },
    {
      'value': HTTP_API,
      'label': 'http/https'
    },
    {
      'value': CSV,
      'label': 'CSV'
    }
  ],
  // TYPE_MAP: {
  //   STATIC,
  //   HTTP_API,
  //   CSV
  // },
  REFRESH: {
    TYPES: {
      ONCE: REFRESH_TYPE_ONCE,
      FIXED: REFRESH_TYPE_FIXED
    },
    TYPE_LIST: [
      {
        label: REFRESH_TYPE_FIXED,
        value: REFRESH_TYPE_FIXED
      },
      {
        label: REFRESH_TYPE_ONCE,
        value: REFRESH_TYPE_ONCE
      }
    ],
    DEFAULT_INTERVAL: REFRESH_DEFAULT_INTERVAL
  }
}
