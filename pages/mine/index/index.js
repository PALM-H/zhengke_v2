//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null
  },
  onLoad: function () {
    if(!app.globalData.hasGetUserInfo){
      app.checkSettingStatus();
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        });
      }
    }else{
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
  },
  goMsg: function(e) {
    wx.navigateTo({
      url: '../msg/msg'
    })
  },
  goNews: function(e) {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  btnToOrder: function(e) {
    // type 0-待付款 1-待发货 2-待收货 3-待评价 4-已完成 可酌情调整
    wx.navigateTo({
      url: '../order/order?index='+e.currentTarget.dataset.type
    })
  },
  goCollection: function(e) {
    wx.navigateTo({
      url: '../collection/collection'
    })
  },
  goService: function(e) {
    wx.makePhoneCall({  
      phoneNumber: '020-38889989'
    })  
    // wx.navigateTo({
    //   url: '../service/service'
    // })
  },
  goAddressPage: function(e) {
    wx.navigateTo({
      url: '../address/address?status=0'
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
