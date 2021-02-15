/*
 * @Author: ly525
 * @Date: 2020-04-07 23:29:30
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-10 23:35:42
 * @FilePath: /luban-h5/front-end/h5/src/engine-entry.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
    #!zh: 页面预览引擎入口
      构建 engine 页面的入口，作用与 src/main.js 类似，都是页面入口
      作用：作品预览的渲染引擎，原理：遍历 work(作品) 的 pages 以及 elements，显示即可
      使用场景：预览弹窗中预览 和 在手机上查看作品使用
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import Vue from 'vue'
// // import 'font-awesome/css/font-awesome.min.css'
// import message from 'ant-design-vue/lib/message' // 加载 JS
// import 'ant-design-vue/lib/message/style/css' // 加载 CSS

// import { pluginsList } from './mixins/load-plugins.js'
// import { PAGE_MODE } from './constants/work.js'
// import Element from './components/core/models/element'
// import RenderPreview from '@/components/core/editor/canvas/preview'
// import NodeWrapper from '@/components/preview/node-wrapper.js'
// import { pluginsList } from './mixins/load-plugins.js'
// import Element from './components/core/models/element'
// import NodeWrapper from '@/components/preview/node-wrapper.js'

// Vue.config.productionTip = true
// Vue.prototype.$message = message

// const Engine = {
//   name: 'engine',
//   components: {
//     NodeWrapper
//   },
//   data () {
//     return {
//       isLongPage: window.__work.page_mode === PAGE_MODE.LONG_PAGE
//     }
//   },
//   methods: {
//     renderLongPage () {
//       if (!window.__work.pages.length) return
//       const work = window.__work
//       return this.renderPreview(work.pages[0].elements)
//     },
//     renderSwiperPage () {
//       const work = window.__work
//       return (
//         <div class="swiper-container">
//           <div class="swiper-wrapper">{
//             work.pages.map(page => {
//               return (
//                 <section class="swiper-slide flat">
//                   {/* this.walk(h, page.elements) */}
//                   { this.renderPreview(page.elements) }
//                 </section>
//               )
//             })
//           }</div>
//           <div class="swiper-pagination"></div>
//         </div>
//       )
//     },
//     renderPreview (pageElements = []) {
//       const height = this.isLongPage ? window.__work.height + 'px' : '100%'
//       const elements = pageElements.map(element => new Element(element))
//       // src/components/core/editor/canvas/preview
//       return <RenderPreview elements={elements} height={height} />
//     },
//     getContainerStyle (work) {
//       const containerStyle = {
//         position: 'relative',
//         height: '100%'
//       }

//       if (this.isLongPage) {
//         containerStyle['overflow-y'] = 'scroll'
//       }
//       return containerStyle
//     },
//     renderUnPublishTip () {
//       return <div style="box-sizing: border-box;min-height: 568px;line-height: 568px;text-align: center;">页面可能暂未发布</div>
//     }
//   },
//   render (h) {
//     const work = window.__work

//     // 预览模式 或者 已经发布 的页面可以正常渲染，否则提示用户暂未发布
//     const query = new URLSearchParams(window.location.search)
//     const canRender = query.get('view_mode') === 'preview' || work.is_publish
//     if (!canRender) return this.renderUnPublishTip()

//     const containerStyle = this.getContainerStyle(work)
//     return <div id="work-container" data-work-id={work.id} style={containerStyle}>
//       {
//         this.isLongPage ? this.renderLongPage() : this.renderSwiperPage()
//       }
//     </div>
//   }
// }
// const Engine = {
//   name: 'engine',
//   components: {
//     NodeWrapper
//   },
//   methods: {
//     renderPreview (h, _elements) {
//       const isLongPage = window.__work.mode === 'h5_long_page'
//       const elements = _elements.map(element => new Element(element))
//       let pageWrapperStyle = {
//         height: '100%',
//         position: 'relative'
//       }

//       if (isLongPage) {
//         pageWrapperStyle = {
//           ...pageWrapperStyle,
//           'overflow-y': 'scroll'
//         }
//       }

//       return (
//         <div style={pageWrapperStyle}>
//           {
//             elements.map((element, index) => {
//               // const style = element.getStyle({ position: 'absolute', isRem: true })
//               // const data = {
//               //   style,
//               //   props: element.getProps({ mode: 'preview' })
//               // }
//               // return h(element.name, data)
//               return <node-wrapper element={element}>
//                 {h(element.name, element.getPreviewData())}
//               </node-wrapper>
//             })
//           }
//         </div>
//       )
//     }
//   },
//   render (h) {
//     const work = window.__work
//     return (
//       <div id="work-container" data-work-id={work.id}>
//         <div class="swiper-container">
//           <div class="swiper-wrapper">{
//             work.pages.map(page => {
//               return (
//                 <section class="swiper-slide flat">
//                   {/* this.walk(h, page.elements) */}
//                   { this.renderPreview(h, page.elements) }
//                 </section>
//               )
//             })
//           }</div>
//           <div class="swiper-pagination"></div>
//         </div>
//       </div>
//     )
//   }
// }

// const install = function (Vue) {
//   Vue.component(Engine.name, Engine)
//   pluginsList.forEach(plugin => {
//     Vue.component(plugin.name, plugin.component)
//   })
// }
import App from './engine-app'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$lubanUtils = {
  request: axios
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
