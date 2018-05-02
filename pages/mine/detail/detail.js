
Page({
  data: {
    status: 0,
    confirmHide: 1
  },
  onLoad: function (options) {
    // 注意：此处仅仅为了演示需要，才把订单状态从订单列表页传到订单详情页，整合后台后应传递订单号，详情页中后台根据订单号返回状态
    this.setData({
      status: options.status
    });
  },
  goPay:function(){
    wx.navigateTo({
      url: '../tips/tips?type=1'
    })
  },
  goComment:function(){
    wx.navigateTo({
      url: '../remark/remark'
    })
  },
  goCmMsg:function(){
    wx.navigateTo({
      url: '../cmend/cmend'
    })
  },
  goService:function(){
    wx.navigateTo({
      url: '../service/service'
    })
  },
  //确认收货/取消
  confirm:function(){
    this.setData({
			confirmHide: 0
		});
  },
  cancel:function(){
    this.setData({
			confirmHide: 1
		});
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
