//获取应用实例
const app = getApp()
const util = require("../../utils/util.js");

//article.js

var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    //其它页面传参数进来
    id: null,
    type:null,

    title: '',
    user: '',
    time: '',
    content: '',
    store:null,//广告
    

    

    //swiper
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    swiperCurrent: 0,
    
    imgUrls: [],//底部广告
  },
  onLoad(options) {
    console.log(options,'options');
    this.setData({
      id: options.id,
      type:options.type
    });
   //获取文章详情
    this.getInfo();
    //获取文章底部广告
    this.get_foot_banner();
  
  
  },
  get_foot_banner(){
    wx.request({
      url: `${app.globalData.apiUrl}con=contentapi&act=get_foot_banner`,
      method: "GET",
      success: (res)=> {
        console.log(res,'底部广告');
        this.setData({
          imgUrls: res.data.list
        });
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  getInfo(){
    wx.showLoading({
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=contentapi&act=get_info',
      method: "POST",
      data: {
        m_id:app.globalData.merchant_id,
        id: this.data.id,
        type: this.data.type
      },
      success:(res)=> {
        wx.hideLoading()
        console.log(res,'获取文章/广告详情');
       
        if(res.data.code==1000){
          this.setData({
            store:res.data.info.store,
            title: res.data.info.title,
            user: res.data.info.author,
            time: res.data.info.add_time,
            // content: res.data.info.content,
          });
          WxParse.wxParse('article', 'html', res.data.info.content, this, 5);
        }
        
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },


  //轮播切换相关
  swiperChange(e){  
    this.setData({  
      swiperCurrent: e.detail.current  
    })  
	},
  onShareAppMessage(){
    return {
      title: app.globalData.store_name,
      // imageUrl: app.globalData.logo_path,
      path: util.getCurrentPageUrlWithArgs()
    }
  }
})
