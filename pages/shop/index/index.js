//获取应用实例
const app = getApp()
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

    
    categoryList: [],//商品分类
    recommendGoodsList:[],//推荐商品列表
    newGoodsList:[],//最新商品列表
   
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
  onLoad(){
    //验证有没有微信授权
    if (!app.globalData.hasGetUserInfo) {
      app.checkSettingStatus();
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        });
      }
    }

    //获取商品分类
    this.getCategoryList();

    //获取推荐商品列表
    this.getRecommendGoodsList(1);
    //获取最新商品列表
    this.getNewGoodsList(2);
   
  },

  //获取推荐商品列表
  getRecommendGoodsList(type){
    wx.showLoading({
      mask: true,
    })
    
    wx.request({
      url:`${app.globalData.apiUrl}con=mallapi&act=goods_list&merchant_id=${app.globalData.merchant_id}&type=${type}`,
      method: "GET",
      success: (res)=> {
        console.log(res,'3获取推荐商品列表')
        if(res.statusCode==200){
            this.setData({
              recommendGoodsList:res.data.product_list.data.slice(0,1)
            })
            wx.hideLoading()
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //获取最新商品列表
  getNewGoodsList(type){
    wx.showLoading({
      mask: true,
    })
    
    wx.request({
      url:`${app.globalData.apiUrl}con=mallapi&act=goods_list&merchant_id=${app.globalData.merchant_id}&type=${type}`,
      method: "GET",
      success: (res)=> {
        console.log(res,'3获取最新商品列表')
        if(res.statusCode==200){
            this.setData({
              newGoodsList:res.data.product_list.data
            })
            wx.hideLoading()
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },

  //获取商品分类
  getCategoryList(){
    wx.showLoading({
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=category_list',
      method: "POST",
      data: {
        merchant_id: app.globalData.merchant_id
        
      },
      success: (res)=> {
        console.log(res,'3获取商品分类')
        if(res.statusCode==200){
            this.setData({
              categoryList:res.data.cat_list.data.slice(0,7)
            })
            wx.hideLoading()
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
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
  goClassPage(e){
    wx.navigateTo({
      url: '../class/class?id='+e.currentTarget.dataset.id
    })
  },
  goDetailPage: function(e){  
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id
    })
  },
  onShareAppMessage() {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})

  