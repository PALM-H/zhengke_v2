//获取应用实例
const app = getApp()
const util = require("../../../utils/util.js");
Page({
  data: {
    hasUserInfo:false,
    userInfo: null,

    searchFill: false,
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    swiperCurrent: 0,

    
    categoryList: [],//商品分类
    recommendGoodsList:[],//推荐商品列表
    newGoodsList:[],//最新商品列表

      page:1,//最新商品列表分页
      pageSize:15,
      totalPage:0

   
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
      console.log(app.globalData.uid,'app.globalData.uid');
    }

    
    //获取banner
    this.getBanner();

    //获取商品分类
    this.getCategoryList();

    //获取推荐商品列表
    this.getRecommendGoodsList(1);
    //获取最新商品列表
    this.getNewGoodsList(2,true);

    
   
  },
  //滑动底部
  scrollToLower(){
    console.log('已经滑到底部了');
    this.getNewGoodsList(2);
  },
   //轮播图点击
   handleBannerClick(e){
    wx.navigateTo({
      url: `../../bannerDetails/bannerDetails?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}`
    })
  },
	//获取banner
	getBanner(){
		wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=contentapi&act=get_article_list',
      method: "POST",
      data: {
        c_id: 0,
        m_id:app.globalData.merchant_id,
      },
      success: (res)=> {
        console.log(res,'获取banner')
        wx.hideLoading()
        if(res.data.code==1000){
          this.setData({
            imgUrls: res.data.banner_list,
          });
        
        }
    },
      
      fail: (err)=>{
        console.log(err);
      }
    })
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
          // app.globalData.userInfo=e.detail.userInfo;
          // this.setData({
          //   userInfo: app.globalData.userInfo,
          //   hasUserInfo: true
          // })
          app.login();
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
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url:`${app.globalData.apiUrl}con=mallapi&act=goods_list`,
      method: "POST",
      data: {
        merchant_id:app.globalData.merchant_id,
        type:type,
        page_size:10000
      },
      success: (res)=> {
        console.log(res,'3获取推荐商品列表')
        if(res.data.code==1000){
            this.setData({
              recommendGoodsList:res.data.product_list.data
            })
            console.log(this.data.recommendGoodsList,88888888888)
            wx.hideLoading()
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //获取最新商品列表
  getNewGoodsList(type,init){
    if(this.data.page>=this.data.totalPage &&!init){
      console.log('已经加载完毕~')
      return;
    }
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
      this.setData({
        page:!init?this.data.page+1:1
      })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url:`${app.globalData.apiUrl}con=mallapi&act=goods_list`,
      method: "POST",
      data: {
        merchant_id:app.globalData.merchant_id,
        type:type,
        page_size:this.data.pageSize,
        p:this.data.page
      },
      success: (res)=> {
        console.log(res,'3获取最新商品列表')
        wx.hideLoading()
        if(res.data.code==1000){
            this.setData({
              newGoodsList:this.data.newGoodsList.concat(res.data.product_list.data),
              page:res.data.product_list.page.page,
              totalPage:res.data.product_list.page.totalPage
            })
            
            
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
  onReachBottom(){
    console.log(1111)
  },
  onShareAppMessage() {
    return {
      title: app.globalData.store_name,
      // imageUrl: app.globalData.logo_path,
      path: util.getCurrentPageUrlWithArgs()
    }
  }
})

  