//获取应用实例
const app = getApp()


//article.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {
    id:0,
    articleList:[]
  },
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      id:options.id
    })
    this.getArticleList();
  },
  getArticleList(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=message_info',
      method: "POST",
      data: {
        msg_id: this.data.id
      },
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'系统消息详情')
        if(res.data.code==1000){
          this.setData({
            articleList:res.data.msg_info
          })
          WxParse.wxParse('article', 'html', res.data.msg_info.content,this,5)
        }
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
