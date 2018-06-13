
Page({
  data: {
    activeIndex: 0
  },
  onLoad: function () {
    wx.hideShareMenu()
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
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
