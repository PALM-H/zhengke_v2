
Page({
  data: {
    searchFill: false,
    imgUrls: [
      {url:'../../../images/shop/exp-banner.jpg'},
      {url:'../../../images/shop/exp-banner.jpg'},
      {url:'../../../images/shop/exp-banner.jpg'},
      {url:'../../../images/shop/exp-banner.jpg'},
      {url:'../../../images/shop/exp-banner.jpg'}
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    swiperCurrent: 0,
    quickArr: [
      {url:'../../../images/shop/icon1.png',text:'安卓手机',status:'1'},
      {url:'../../../images/shop/icon2.png',text:'平板电脑',status:'2'},
      {url:'../../../images/shop/icon3.png',text:'笔记本',status:'3'},
      {url:'../../../images/shop/icon4.png',text:'台式电脑',status:'4'},
      {url:'../../../images/shop/icon5.png',text:'数码相机',status:'5'},
      {url:'../../../images/shop/icon6.png',text:'USB线缆',status:'6'},
      {url:'../../../images/shop/icon7.png',text:'音视频线',status:'7'},
      {url:'../../../images/shop/icon8.png',text:'更多',status:'0'},
    ],
    recommendArr: [
      {url:'../../../images/shop/exp-item.jpg',price:'5889',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url:'../../../images/shop/exp-item.jpg',price:'5889',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url:'../../../images/shop/exp-item.jpg',price:'5889',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'}
    ],
    itemArr: [
      {url: '../../../images/shop/exp-item-big.jpg',price:'5899.00',sales:'35000',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机 全新出品'},
      {url: '../../../images/shop/exp-item-big.jpg',price:'5899.00',sales:'300',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url: '../../../images/shop/exp-item-big.jpg',price:'5899.00',sales:'3500',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url: '../../../images/shop/exp-item-big.jpg',price:'5899.00',sales:'5000',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机 全新出品'},
      {url: '../../../images/shop/exp-item-big.jpg',price:'5899.00',sales:'35000',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url: '../../../images/shop/exp-item-big.jpg',price:'5899.00',sales:'35000',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url: '../../../images/shop/exp-item-big.jpg',price:'5899.00',sales:'35000',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'}
    ]
  },
  goSearch: function(e){  
    wx.navigateTo({
      url: '../search/search'
    })
	},
  //滚动监听
  scroll: function(e) {
    var sTop = e.detail.scrollTop;
    if(sTop>120 && !this.data.searchFill){
      this.setData({
        searchFill: true
      })
    }else if(sTop<=120 && this.data.searchFill){
      this.setData({
        searchFill: false
      })
    }
  },
  //轮播切换相关
  swiperChange: function(e){  
    this.setData({  
      swiperCurrent: e.detail.current  
    })  
	},
  goCart: function(e){  
    wx.navigateTo({
      url: '../cart/cart'
    })
	},
  //点击分类进入分类页
  goClass: function(e){  
    wx.navigateTo({
      url: '../class/class?status='+e.currentTarget.dataset.status
    })
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

  