/*
 * @Author: ly525
 * @Date: 2020-04-08 19:00:20
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-03 20:53:03
 * @FilePath: /luban-h5/front-end/h5/src/work.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
export default {
  'id': 7,
  'title': '标题',
  'description': '描述',
  'cover_image_url': '/uploads/d2e96af2864546c5b59d185d3b8f91c9.png',
  'dataSources': [
    {
      name: 'ds1',
      url: 'http://localhost:8083/admin/init',
      type: 'http-api'
    },
    {
      name: 'ds2',
      url: 'https://strapi.io/videos',
      type: 'http-api'
    },
    {
      name: 'ds3',
      url: 'https://blog.strapi.io/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=1f260788b4ec&limit=1',
      type: 'http-api'
    },
    {
      name: 'ds4',
      url: 'https://lab.isaaclin.cn/nCoV/api/overall?latest=true',
      type: 'http-api',
      pipe: `
      function handler(response){
        return response.data.results[0]
      }
      `
    }
  ],
  'pages': [
    {
      'uuid': 1585469695660,
      'title': '',
      'elements': [
        {
          'name': 'lbp-background',
          'pluginType': 'lbp-background',
          'uuid': 1585469695660,
          'pluginProps': {
            'uuid': 1585469695660,
            'imgSrc': '',
            'backgroundColor': 'rgba(255, 255, 255, 0.2)'
          },
          'commonStyle': {
            'top': 100,
            'left': 100,
            'width': 100,
            'height': 40,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14,
            'zindex': 1
          },
          'events': [],
          'scripts': [],
          'animations': []
        },
        {
          'name': 'lbp-text',
          'pluginType': 'lbp-text',
          'uuid': 1586440976518,
          'pluginProps': {
            'uuid': 1586440976518,
            'backgroundColor': 'rgba(255, 255, 255, 0.2)',
            'borderWidth': 1,
            'borderRadius': 0,
            'borderColor': '#ced4da',
            'text': '<p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;"><span style="background-color: rgb(255, 255, 255); color: rgb(34, 34, 34); user-select: auto;">较上日 </span>{{LubanDataCenter.ds4.confirmedIncr}}</p><h2 style="user-select: auto;"><span style="color: rgb(230, 0, 0); user-select: auto;">{{LubanDataCenter.ds4.confirmedCount}}</span></h2><p style="user-select: auto;"><span style="color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); user-select: auto;">累计确诊</span></p>'
          },
          'commonStyle': {
            'top': 100,
            'left': 0,
            'width': 108,
            'height': 61,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14
          },
          'events': [],
          'scripts': [],
          'animations': []
        },
        {
          'name': 'lbp-text',
          'pluginType': 'lbp-text',
          'uuid': 1586443982121,
          'pluginProps': {
            'uuid': 1586443982121,
            'backgroundColor': 'rgba(255, 255, 255, 0.2)',
            'borderWidth': 1,
            'borderRadius': 0,
            'borderColor': '#ced4da',
            'text': '<p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;"><span style="background-color: rgb(255, 255, 255); color: rgb(34, 34, 34); user-select: auto;">较上日 </span>{{LubanDataCenter.ds4.<span style="color: rgb(136, 19, 145); user-select: auto;">curedIncr</span>}}</p><h2><span style="color: rgb(230, 0, 0); user-select: auto;">{{LubanDataCenter.ds4.curedCount}}</span>累计治愈</h2>'
          },
          'commonStyle': {
            'top': 100,
            'left': 108,
            'width': 99,
            'height': 61,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14
          },
          'events': [],
          'scripts': [],
          'animations': []
        },
        {
          'name': 'lbp-text',
          'pluginType': 'lbp-text',
          'uuid': 1586443988971,
          'pluginProps': {
            'uuid': 1586443988971,
            'backgroundColor': 'rgba(255, 255, 255, 0.2)',
            'borderWidth': 1,
            'borderRadius': 0,
            'borderColor': '#ced4da',
            'text': '<p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;"><span style="background-color: rgb(255, 255, 255); color: rgb(34, 34, 34); user-select: auto;">较上日 </span>{{LubanDataCenter.ds4.deadIncr}}</p><h2><span style="color: rgb(230, 0, 0); user-select: auto;">{{LubanDataCenter.ds4.deadCount}}</span></h2><p style="user-select: auto;"><span style="color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); user-select: auto;">累计死亡</span></p>'
          },
          'commonStyle': {
            'top': 100,
            'left': 207,
            'width': 117,
            'height': 61,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14
          },
          'events': [],
          'scripts': [],
          'animations': []
        },
        {
          'name': 'lbp-text',
          'pluginType': 'lbp-text',
          'uuid': 1586444132491,
          'pluginProps': {
            'uuid': 1586444132491,
            'backgroundColor': 'rgba(255, 255, 255, 0.2)',
            'borderWidth': 1,
            'borderRadius': 0,
            'borderColor': '#ced4da',
            'text': '<p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;">较上日 {{LubanDataCenter.ds4.currentConfirmedIncr}}</p><p><span style="color: rgb(230, 0, 0); user-select: auto;">{{LubanDataCenter.ds4.currentConfirmedCount}}</span></p><p style="user-select: auto;">当前确诊</p>'
          },
          'commonStyle': {
            'top': 171,
            'left': 0,
            'width': 107,
            'height': 55,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14
          },
          'events': [],
          'scripts': [],
          'animations': []
        },
        {
          'name': 'lbp-text',
          'pluginType': 'lbp-text',
          'uuid': 1586444207305,
          'pluginProps': {
            'uuid': 1586444207305,
            'backgroundColor': 'rgba(255, 255, 255, 0.2)',
            'borderWidth': 1,
            'borderRadius': 0,
            'borderColor': '#ced4da',
            'text': '<p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;">较上日 {{LubanDataCenter.ds4.suspectedIncr}}</p><h2 style="user-select: auto;"><span style="color: rgb(230, 0, 0);">{{LubanDataCenter.ds4.suspectedCount}}</span></h2><p style="user-select: auto;">疑似感染者</p>'
          },
          'commonStyle': {
            'top': 171,
            'left': 108,
            'width': 97,
            'height': 56,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14
          },
          'events': [],
          'scripts': [],
          'animations': []
        },
        {
          'name': 'lbp-text',
          'pluginType': 'lbp-text',
          'uuid': 1586444211407,
          'pluginProps': {
            'uuid': 1586444211407,
            'backgroundColor': 'rgba(255, 255, 255, 0.2)',
            'borderWidth': 1,
            'borderRadius': 0,
            'borderColor': '#ced4da',
            'text': '<p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;"><span style="color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); user-select: auto;">较上日</span> {{LubanDataCenter.ds4.seriousIncr}}</p><h2><span style="color: rgb(230, 0, 0); user-select: auto;">{{LubanDataCenter.ds4.seriousCount}}</span></h2><p style="user-select: auto;">病危人数</p>'
          },
          'commonStyle': {
            'top': 161,
            'left': 207,
            'width': 111,
            'height': 63,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14
          },
          'events': [],
          'scripts': [],
          'animations': []
        },
        {
          'name': 'lbp-text',
          'pluginType': 'lbp-text',
          'uuid': 1586445430050,
          'pluginProps': {
            'uuid': 1586445430050,
            'backgroundColor': 'rgba(255, 255, 255, 0.2)',
            'borderWidth': 0,
            'borderRadius': 0,
            'borderColor': '#ced4da',
            'text': '<h1 class="ql-align-center" style="user-select: auto;">累积确认人数</h1><p class="ql-align-center" style="user-select: auto;"><br style="user-select: auto;"></p><p class="ql-align-center" style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;" class="ql-align-center">{{LubanDataCenter.ds4.confirmedCount}}</p><p style="user-select: auto;"><br style="user-select: auto;"></p>'
          },
          'commonStyle': {
            'top': 253,
            'left': 0,
            'width': 322,
            'height': 176,
            'textAlign': 'center',
            'color': '#000000',
            'backgroundColor': 'rgba(255, 255, 255, 0)',
            'fontSize': 14
          },
          'events': [],
          'scripts': [],
          'animations': []
        }
      ]
    }
  ],
  'is_publish': false,
  'is_template': false,
  'created_at': '2020-03-29T08:14:55.714Z',
  'updated_at': '2020-04-02T16:18:47.244Z'
}
