/*
 * @Author: ly525
 * @Date: 2020-05-03 13:39:45
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-03 22:34:12
 * @FilePath: /luban-h5/front-end/h5/src/app/preview/utils.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
function isMobile () {
  var mobileDeviceReg = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i
  return mobileDeviceReg.test(navigator.userAgent) || window.innerWidth < 500
}

function updateViewport () {
  var scale = 1
  var w = document.documentElement.clientWidth || 320
  // var h = document.documentElement.clientHeight || 568
  // scale = w / h >= 320 / 568 ? h / 568 : w / 320
  scale = w / 320
  // console.log(`w: ${w}, h: ${h}, w/h: ${w / h}, 320 / 568: ${320 / 568}, w / 320: ${w / 320}`)
  var viewport = 'width=320, initial-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no'
  document.getElementById('viewport').setAttribute('content', viewport)
}

function doMobileActions () {
  updateViewport()
  var app = document.getElementById('app')
  document.body.innerHTML = ''
  document.body.appendChild(app)
}

var loadJS = function (url, callback, location) {
  location = location || document.head

  var scriptTag = document.createElement('script')
  scriptTag.onload = callback
  // scriptTag.onreadystatechange = callback;
  scriptTag.src = url
  location.appendChild(scriptTag)
}

function drawQRcode () {
  var canvas = document.getElementById('qrcode-canvas')
  // eslint-disable-next-line
  QRCode.toCanvas(canvas, window.location.href, {
    scale: 4
  })
}

function doPCActions () {
  loadJS('https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js', drawQRcode)
}

export function scaleViewPort () {
  isMobile() ? doMobileActions() : doPCActions()
}
