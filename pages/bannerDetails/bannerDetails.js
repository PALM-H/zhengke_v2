//获取应用实例
const app = getApp()


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
    content: '',//文章内容，可能是图片或者链接
    h5Url:'',
    contentType:'',
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
   
    this.getInfo();

    
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
        console.log(res,'获取文章详情');
        this.setData({
          store:res.data.info.store,
          title: res.data.info.title,
					user: res.data.info.author,
					time: res.data.info.add_time,
					// content: res.data.info.content,
        });
        if(res.data.info.type==="article"){
          WxParse.wxParse('article', 'html', res.data.info.content, this, 5);
          this.setData({
            contentType:'article'
          })
          
        }else if(res.data.info.type==="img"){
          this.setData({
            content:'http://service.ixingtu.com/ixtres/news/image/20180413/1523587100332024657.jpg',
            contentType:'img'
          })
        }else if(res.data.info.type==="url"){
          this.setData({
            h5Url:'https://www.baidu.com',
            contentType:'url'
          })
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
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
