
Page({
  data: {
    resultListArr: [
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'}
    ]
  },
  goDetail: function(e){  
    wx.navigateTo({
      url: '../detail/detail'
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
