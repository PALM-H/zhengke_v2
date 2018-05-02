
Page({
  data: {
    headImg: '../../../images/mine/exp-headimg.jpg',
    name: '测试nickName'
  },
  onLoad: function () {
    
  },
  save: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  chooseImage: function () {
    //注意：此处需要用户选择等宽高图片，或者后端裁剪，否则会压缩比例
    var that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['compressed'],//使用压缩图，可酌情更改
      success: function (res) {
        that.setData({
          headImg: res.tempFilePaths[0]
        });
      }
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
