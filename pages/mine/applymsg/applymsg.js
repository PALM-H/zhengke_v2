
Page({
  data: {
    
  },
  onLoad: function () {
    wx.hideShareMenu()
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
