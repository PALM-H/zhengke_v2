//获取应用实例
const app = getApp()

Page({
    data:{

    },
    onload:function(options){

    },
    onShareAppMessage: function () {
        return {
          title: app.globalData.store_name,
          imageUrl: app.globalData.logo_path,
          path: '/pages/index/index'
        }
      }
})