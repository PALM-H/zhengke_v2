
Page({
  data: {
    name: '融融',
    phone: '176****5422',
    address: '广东省广州市天河区  广州市天河区奥体南路东澳创意小镇D2 103',
    count: 2,
    total: '12178.00',
    itemListArr: [
      {url:'../../../images/mine/itemexp1.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',ver:'标准  黑色  4+46G',price:'3589.00',num:1},
      {url:'../../../images/mine/itemexp2.jpg',name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',ver:'版本：游戏之王  16+1T+225 SSD',price:'8589.00',num:1}
    ]
  },
  goAddress: function(e) {
    wx.navigateTo({
      url: '../../mine/address/address?status=1'
    })
  },
  goPay: function(e) {
    wx.redirectTo({
      url: '../../mine/tips/tips?type=1'
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
