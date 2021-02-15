/*
 * @Author: ly525
 * @Date: 2020-04-07 23:26:23
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-12 10:57:29
 * @FilePath: /luban-h5/front-end/h5/src/main.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import './plugins/index'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
