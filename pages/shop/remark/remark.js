
Page({
  data: {
    url:'../../../images/mine/itemexp1.jpg',
    name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',
    ver:'标准  黑色  4+46G',
    price:'3589.00',
    remarkListArr: [
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'4',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买 很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'5',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'4',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'5',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'3',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'5',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'2',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买 很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'1',time:'2018.02.22',ver:'3 + 32 G  黑色'}
    ]
  },
  goCart: function(e){  
    wx.navigateTo({
      url: '../cart/cart'
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

  