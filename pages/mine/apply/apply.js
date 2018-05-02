
Page({
  data: {
    activeTab: 0
  },
  onLoad: function () {
    
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['compressed'],//使用压缩图，可酌情更改
      success: function (res) {
        // res.tempFilePaths[0]
      }
    })
  },
  changeTab:function(e){
    this.setData({
			activeTab: e.currentTarget.dataset.num
    });
  },
  save:function(){
    wx.navigateTo({
      url: '../tips/tips?type=2'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
