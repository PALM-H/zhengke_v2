//获取应用实例
const app = getApp()
const util = require("../../utils/util.js");
//news.js

Page({
  data: {
    //tab
		tabs: [],
    tabWidth: 750,
		activeIndex: 0,

    //carousel
    imgUrls: [],//banner
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
		swiperCurrent: 0,

    //文章list
    itemArr: [],
    page:1,
    pageNum:15,
    page_count:0,

    //window高度
    windowHeight:0
  },
	onLoad() {
   this.getTab();
  
  },
  onShow(){
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          windowHeight:res.windowHeight
        })
        console.log(this.data.windowHeight,111);
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.platform)
      }
    })
  },

  //获取tab
  getTab(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=contentapi&act=get_category_list',
      method: "POST",
      data: {
        m_id: app.globalData.merchant_id
      },
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'获取tab标题 ')
        if(res.data.code==1000){
          this.setData({
            tabs: res.data.data,
            tabWidth: res.data.data.length*120+120
          });
          //一开始默认是推荐
				this.getAtcList(true)
        }
        
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },

	//获取分类文章
	getAtcList(init){
    if(init){
      this.setData({
        page:1,
        itemArr:[],
        imgUrls:[]
      })
    }else{
      if(this.data.page>=this.data.page_count){
        console.log('已经到总页面数');
        return;
      }
      this.setData({
        page:this.data.page+1
      })
    }



		wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=contentapi&act=get_article_list',
      method: "POST",
      data: {
        c_id: this.data.activeIndex,
        m_id:app.globalData.merchant_id,
        page: this.data.page,
        pageNum:this.data.pageNum
      },
      success: (res)=> {
        console.log(res,'获取分类文章')
        wx.hideLoading()
        if(res.data.code==1000){
          this.setData({
            imgUrls: res.data.banner_list,
            page_count:res.data.info.page_count
          });
          if(this.data.itemArr.length>0){
            this.setData({
              itemArr: this.data.itemArr.concat(res.data.info.list)
            })
          }else{
            this.setData({
              itemArr: res.data.info.list
            })
          
        }
        console.log(this.data.page_count,111);
      }
    },
      
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //滑动底部
  scrollToLower(){
    console.log('已经滑到底部了');
    this.getAtcList();
  },
	//navbar点击事件
  tabClick: function(e) {
		wx.showLoading({
      mask: true,
    })
    this.setData({
			activeIndex: e.currentTarget.dataset.id
		});
    this.getAtcList(true)
  },
	//轮播切换相关
  swiperChange: function(e){  
    this.setData({  
        swiperCurrent: e.detail.current  
    })  
  },
  //轮播图点击
  handleBannerClick(e){
    wx.navigateTo({
      url: `../bannerDetails/bannerDetails?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}`
    })
  },
	//文章点击事件
  itemClick: function(e) {
    wx.navigateTo({
      url: `../article/article?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}`
    })
  },
	onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      // imageUrl: app.globalData.logo_path,
      path: util.getCurrentPageUrlWithArgs()
    }
  }
});