
Page({
  data: {
    prMark: [0,0,0], //总体评价数组
    itemMark: [0,0] //注意：itemMark为商品打分数组，对接后台时应根据后台数据重新赋值，例如3个商品请赋值 [0,0,0] ，或根据自己思路修改
  },
  onLoad: function () {
    
  },
  save: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //主项目评分 
  primaryMark: function(e) {
    var index = e.currentTarget.dataset.type;
    var changeData = "prMark["+index+"]";
    this.setData({
			[changeData]: e.currentTarget.dataset.num
    });
  },
  //商品评分 
  itemMark: function(e) {
    var index = e.currentTarget.dataset.type;
    var changeData = "itemMark["+index+"]";
    this.setData({
			[changeData]: e.currentTarget.dataset.num
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
