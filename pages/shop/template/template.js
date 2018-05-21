//获取应用实例
const app = getApp()

Page({
    data:{

    },
    onload:function(options){

    },
    onShareAppMessage: function () {
        return {
          title: '挣客3C行业平台服务商',
          imageUrl: '/images/share.jpg',
          path: '/pages/index/index'
        }
      }
})