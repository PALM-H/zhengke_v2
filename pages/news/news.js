//获取应用实例
const app = getApp()

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

    //list
		itemArr: [
			
		]
  },
	onLoad() {
    wx.showLoading({
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
        console.log(res.data.data,'21tabTitle')
        this.setData({
          tabs: res.data.data,
          tabWidth: res.data.data.length*120+120
        });
				this.getAtcList(0)
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
	//获取分类文章
	getAtcList(id){
		var that = this;
		wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=contentapi&act=get_article_list',
      method: "POST",
      data: {
        cid: id,
        m_id:app.globalData.merchant_id,
        page: 1
      },
      success: function(res) {
        console.log(res.data,'22article')
        that.setData({
          itemArr: res.data.info.list,
					imgUrls: res.data.banner_list
        });
        wx.hideLoading()
      },
      fail: function(err){
        console.log(err);
      }
    })
	},
	//navbar点击事件
  tabClick: function(e) {
		wx.showLoading({
      mask: true,
    })
    this.setData({
			activeIndex: e.currentTarget.id
		});
		if(e.currentTarget.id == 0){
			this.getAtcList(0)
		}else{
			this.getAtcList(this.data.tabs[e.currentTarget.id-1].c_id)
		}
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
      url: `../article/article?id=${e.currentTarget.dataset.id}`
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
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
});