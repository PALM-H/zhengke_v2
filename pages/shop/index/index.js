//获取应用实例
const app = getApp()
Page({
  data: {
    hasUserInfo:false,
    userInfo: null,

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
   
  },
  onLoad(){
   if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else{
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = () => {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }
    }

    


    //获取商品分类
    this.getCategoryList();

    //获取推荐商品列表
    this.getRecommendGoodsList(1);
    //获取最新商品列表
    this.getNewGoodsList(2);
   
  },


  getUserInfo(e){
    console.log(e.detail.userInfo);
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.getSetting({
      success: res => {
        wx.hideLoading();
        if (res.authSetting["scope.userInfo"]) {
          console.log("授权成功");
          app.globalData.userInfo=e.detail.userInfo;
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        } else {
          console.log("授权失败");
          wx.showModal({
            title: "用户未授权",
            content:
              "如需正常使用功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。",
            showCancel: false,
            success: res => {
              if (res.confirm) {
                console.log("用户点击确定");
                wx.openSetting({
                  success: res => {
                    console.log("openSetting success", res.authSetting);
                    if(res.authSetting['scope.userInfo']){
                      app.login();
                    }
                  },
                  fail: err => {
                  }
                });
              }
            }
          });
        }
      }
    });
  },

  //获取商品分类
  getCategoryList(){
    wx.showLoading({
      title:'加载中...',
      mask: true
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
        console.log(res,'获取商品分类')
        if(res.data.code==1000){
            this.setData({
              categoryList:res.data.cat_list.data.slice(0,7) //最多只显示7个
            })
            wx.hideLoading()
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //获取推荐商品列表
  getRecommendGoodsList(type){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      url:`${app.globalData.apiUrl}con=mallapi&act=goods_list&merchant_id=${app.globalData.merchant_id}&type=${type}`,
      method: "GET",
      success: (res)=> {
        console.log(res,'3获取推荐商品列表')
        if(res.data.code==1000){
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
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      url:`${app.globalData.apiUrl}con=mallapi&act=goods_list&merchant_id=${app.globalData.merchant_id}&type=${type}`,
      method: "GET",
      success: (res)=> {
        console.log(res,'3获取最新商品列表')
        if(res.data.code==1000){
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
  //点击进入分类页面
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

  