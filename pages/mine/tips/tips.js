
Page({
  data: {
    type: 0,
    title: '',
    action: ''
  },
  onLoad: function (options) {
    this.setData({
      type: options.type
    });
    if(options.type==1){
      wx.setNavigationBarTitle({
        title: "支付成功"
      })
      this.setData({
        title: '订单已支付成功',
        action: '查看订单'
      })
    }else if(options.type==2){
      wx.setNavigationBarTitle({
        title: "提交成功"
      })
      this.setData({
        title: '申请已提交成功',
        action: '查看进度'
      })
    }
    
  },
  goDetail: function(e) {
    if(this.data.type==1){
      wx.redirectTo({
        url: '../detail/detail?status=1'
      })
    }else if(this.data.type==2){
      wx.redirectTo({
        url: '../applymsg/applymsg'
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
