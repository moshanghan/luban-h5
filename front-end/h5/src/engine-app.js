/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-04 08:15:43
 * @FilePath: /luban-h5/front-end/h5/src/engine-app.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
    #!zh: 页面预览引擎入口
      构建 engine 页面的入口，作用与 src/main.js 类似，都是页面入口
      作用：作品预览的渲染引擎，原理：遍历 work(作品) 的 pages 以及 elements，显示即可
      使用场景：预览弹窗中预览 和 在手机上查看作品使用
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

import Vue from 'vue'
// import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
// import 'font-awesome/css/font-awesome.min.css'
import message from 'ant-design-vue/lib/message' // 加载 JS
import 'ant-design-vue/lib/message/style/css' // 加载 CSS
import './engine.scss'

import { pluginsList } from './mixins/load-plugins.js'
import Element from './components/core/models/element'
import NodeWrapper from '@/components/preview/node-wrapper.js'
import { getVMVal } from '@/utils/core.js'
import DS_STAIC from '@/constants/data-source'
import DataSourceModel from '@/components/core/models/data-source'
import { scaleViewPort } from './app/preview/utils'

Vue.config.productionTip = true
Vue.prototype.$message = message

const install = function (Vue) {
  // Vue.component(Engine.name, Engine)
  pluginsList.forEach(plugin => {
    Vue.component(plugin.name, plugin.component)
  })
}

install(Vue)

export default {
  name: 'engine',
  components: {
    NodeWrapper
  },
  data: () => ({
    work: {
      id: undefined,
      pages: [],
      dataSource: []
    },
    loading: false,
    requestQueueLen: 0
  }),
  computed: {
    ...mapState('dataCenter', {
      $ds: 'storage'
    })
  },
  methods: {
    bindData (pluginProps) {
      // 插值替换 <span>{{a}}<spam> + {a: 10} => <span>10</span>
      // const reg = /.*\{\{(.*)\}\}.*/g
      const reg = /\{\{(.*?)\}\}/g
      for (let key in pluginProps) {
        const propValue = pluginProps[key]
        // console.log(reg.exec(propValue), '======')
        if (!reg.test(propValue)) continue
        pluginProps[key] = propValue.replace(reg, (match, p1, p2) => {
          // 表达式包含数组：dataCenter.page[0].title
          // https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arays-by-string-path
          // console.log('p1', p1, p2)
          p1 = p1.trim().replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
          p1 = p1.replace(/^\./, '') // strip a leading dot
          // if (/storage\./.test(p1)) {
          //   return getVMVal(store.state.dataCenter, p1)
          // }
          if (/\$ds\./.test(p1)) {
            // console.log(this.$ds)
            // console.log(getVMVal(this, p1), '----', this.LubanDataCenter.ds4)
            return JSON.stringify(getVMVal(this, p1))
          }
          return p1
          // if (/\$dataSource\./.test(p1)) {
          //   return getVMVal(window.dataSource, p1)
          // }
          // return getVMVal(window.dataCenter, p1)
        })
      }
      return pluginProps
    },
    ...mapMutations('dataCenter', [
      'updateStorage'
    ]),
    renderPreview (h, _elements) {
      const elements = _elements.map(element => new Element(element))
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          {
            elements.map((element, index) => {
              // const style = element.getStyle({ position: 'absolute', isRem: true })
              // const data = {
              //   style,
              //   props: element.getProps({ mode: 'preview' })
              // }
              // return h(element.name, data)
              const data = element.getPreviewData()
              return <node-wrapper element={element}>
                {h(element.name, {
                  ...data,
                  props: this.bindData(data.props)
                })}
              </node-wrapper>
            })
          }
        </div>
      )
    },
    dispatchRequest () {
      const dsList = (window.__work.dataSources || []).filter(ds => ds.type === DS_STAIC.TYPES.HTTP_API)
      if (!dsList.length) return
      this.requestQueueLen = dsList.length
      this.loading = true
      dsList.forEach(ds => {
        new DataSourceModel(ds, this).request().then(() => {
          this.requestQueueLen--
          if (this.requestQueueLen === 0) {
            this.loading = false
          }
        })
      })
    },
    handlePostMessage ({ origin, data }) {
      console.log('handlePostMessage')
      if (!data && typeof data !== 'string') return
      const work = JSON.parse(data)
      this.updateWork(work)
    },
    updateWork (work) {
      console.log('updateWork')
      window.__work = work
      this.work = Object.freeze(work)
      this.dispatchRequest()
    }
  },
  render (h) {
    // debugger
    // const work = window.__work
    // if (!window.__work) return
    const work = this.work
    console.log('render', work)
    return (
      <div id="app">
        <div class="lds-ripple-wrapper"><div class="lds-ripple" v-show={this.loading}><div></div><div></div></div></div>
        <div v-show={!this.loading} id="work-container" data-work-id={work.id} >
          <div class="swiper-container">
            <div class="swiper-wrapper">{
              work.pages.map(page => {
                return (
                  <section class="swiper-slide flat">
                    {/* this.walk(h, page.elements) */}
                    {this.renderPreview(h, page.elements)}
                  </section>
                )
              })
            }</div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    )
  },
  created () {
    // if (window.location.search) {
    //   this.$lubanUtils.request.get('/works/1')
    //     .then(res => res.data)
    //     .then(work => {
    //       window.__work = work
    //       this.work = Object.freeze(work)
    //     })
    //     .then(this.dispatchRequest)
    //   // .finally(() => {
    //   //   console.log(new Date(), '=')
    //   //   this.loading = false
    //   // })
    // } else {
    //   this.updateWork(window.__work || { 'id': 8243, 'title': null, 'description': null, 'cover_image_url': null, 'pages': [{ 'uuid': 1584088008344, 'title': '', 'elements': [{ 'name': 'lbp-background', 'uuid': 1583416419247, 'pluginProps': { 'uuid': 1583416419247, 'imgSrc': '/uploads/a7515672707e4edda0c004648d04d57b.jpg', 'backgroundColor': 'rgba(255, 255, 255, 0.2)' }, 'commonStyle': { 'top': 100, 'left': 100, 'width': 100, 'height': 40, 'textAlign': 'center', 'color': '#000000', 'backgroundColor': 'rgba(255, 255, 255, 0)', 'fontSize': 14 }, 'events': [], 'animations': [] }, { 'name': 'lbp-picture', 'uuid': 1583416452456, 'pluginProps': { 'uuid': 1583416452456, 'imgSrc': '/uploads/e22ce5a2c11346d0ae5f429761fcd62c.jpg' }, 'commonStyle': { 'top': 2, 'left': 0, 'width': 318, 'height': 564, 'textAlign': 'center', 'color': '#000000', 'backgroundColor': 'rgba(255, 255, 255, 0)', 'fontSize': 14 }, 'events': [], 'animations': [] }, { 'name': 'lbp-picture', 'uuid': 1583416475193, 'pluginProps': { 'uuid': 1583416475193, 'imgSrc': '/uploads/d96e56054e9f4580a8e35bb334d522cd.jpg' }, 'commonStyle': { 'top': 191, 'left': 20, 'width': 274, 'height': 53, 'textAlign': 'center', 'color': '#000000', 'backgroundColor': 'rgba(255, 255, 255, 0)', 'fontSize': 14 }, 'events': [], 'animations': [{ 'type': 'fadeInDown', 'duration': 1, 'delay': 0, 'interationCount': 1, 'infinite': false }] }, { 'name': 'lbp-picture', 'uuid': 1583416560393, 'pluginProps': { 'uuid': 1583416560393, 'imgSrc': '/uploads/d96e56054e9f4580a8e35bb334d522cd.jpg' }, 'commonStyle': { 'top': 263, 'left': 20, 'width': 274, 'height': 53, 'textAlign': 'center', 'color': '#000000', 'backgroundColor': 'rgba(255, 255, 255, 0)', 'fontSize': 14 }, 'events': [], 'animations': [{ 'type': 'fadeInDown', 'duration': 1, 'delay': 1, 'interationCount': 1, 'infinite': false }] }, { 'name': 'lbp-picture', 'uuid': 1583416587369, 'pluginProps': { 'uuid': 1583416587369, 'imgSrc': '/uploads/d96e56054e9f4580a8e35bb334d522cd.jpg' }, 'commonStyle': { 'top': 335, 'left': 20, 'width': 274, 'height': 53, 'textAlign': 'center', 'color': '#000000', 'backgroundColor': 'rgba(255, 255, 255, 0)', 'fontSize': 14 }, 'events': [], 'animations': [{ 'type': 'fadeInDown', 'duration': 1, 'delay': 2, 'interationCount': 1, 'infinite': false }] }] }], 'is_publish': null, 'is_template': false, 'dataSources': null, 'created_at': '2020-05-03T05:30:22.089Z', 'updated_at': '2020-05-03T05:30:22.100Z' })
    // }
    window.addEventListener('message', this.handlePostMessage.bind(this), false)
    // console.log('000000')
    // window.__work = workJSON
  },
  mounted () {
    scaleViewPort()
  }
}

// // auto install
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }
