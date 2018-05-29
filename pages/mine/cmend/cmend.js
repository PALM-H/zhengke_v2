
Page({
  data: {
    prMark: [4,5,3], //总体评价数组
    itemMark: [4,5] //注意：itemMark为商品打分数组，对接后台时应根据后台数据重新赋值，例如3个商品请赋值 [0,0,0] ，或根据自己思路修改
  },
  onLoad: function () {
    
  },
 
  onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
