
Page({
  data: {
    activeIndex: 0
  },
  onLoad: function () {
    
  },
  //navbar点击事件
  tabClick: function(e) {
		var that = this;
    this.setData({
			activeIndex: e.currentTarget.id
		});
  },
  goApply:function(){
    wx.navigateTo({
      url: '../apply/apply'
    })
  },
  goApplymsg: function(e) {
    wx.navigateTo({
      url: '../applymsg/applymsg'
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
