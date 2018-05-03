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

    logo: '',
    name: '',
    phone: '',
    address: '',

    //swiper
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    swiperCurrent: 0,
    
    imgUrls: [],
  },
  onLoad(options) {
    console.log(options,'options');
    this.setData({
      id: options.id,
      type:options.type
    });
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
        id: options.id,
        type: this.data.type
      },
      success:(res)=> {
        console.log(res,333);
        this.setData({
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
        
       
        wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
    })
    wx.request({
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/NewsApi/article_store',
      method: "GET",
      success: (res)=> {
        this.setData({
          logo: res.data.info.logo,
          name: res.data.info.name,
          phone: res.data.info.phone,
          address: res.data.info.address,
        });
      },
      fail: (err)=>{
        console.log(err);
      }
    })
    wx.request({
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/NewsApi/article_banners',
      method: "GET",
      success: (res)=> {
        this.setData({
          imgUrls: res.data.info
        });
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
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
