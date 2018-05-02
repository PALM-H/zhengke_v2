
Page({
  data: {
    activeAdrs: 0,
    status:0,
    adrsArr: [
      {name:'融融',phone:'176****5422',address:'广东省 广州市 天河区  广州市天河区奥体南路东澳创意小镇D2栋 103',index:0},
      {name:'融融',phone:'176****5422',address:'广东省 广州市 天河区  广州市天河区奥体南路东澳创意小镇D2栋 103',index:1},
      {name:'融融',phone:'176****5422',address:'广东省 广州市 天河区  广州市天河区奥体南路东澳创意小镇D2栋 103',index:2}
    ]
  },
  onLoad: function (options) {
    this.setData({
      status: options.status
    });
  },
  changeAdrs: function(e) {
    this.setData({
			activeAdrs: e.currentTarget.dataset.num
		});
  },
  addAdrs:function(){
    wx.navigateTo({
      url: '../editadrs/editadrs?type=1&status='+this.data.status
    })
  },
  editAdrs:function(){
    wx.navigateTo({
      url: '../editadrs/editadrs?type=2&status='+this.data.status
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
