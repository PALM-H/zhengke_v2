//获取应用实例
const app = getApp()

Page({
  data: {
    newsArr: [
      {title:'挣客3C门店2.0明天上线',time:'13:12',content:'挣客3C门店项目2.0版本明天正式上线，欢迎您继续使用，有任何意见欢迎提出，我们来改进'},
      {title:'挣客3C门店2.0明天上线',time:'昨天 13:12',content:'挣客3C门店项目2.0版本明天正式上线，欢迎您继续使用，有任何意见欢迎提出，我们来改进。挣客3C门店项目2.0版本明天正式上线，欢迎您继续使用，有任何意见欢迎提出，我们来改进。'},
      {title:'挣客3C门店2.0明天上线',time:'2016-03-12  13：12',content:'挣客3C门店项目2.0版本明天正式上线。'},
      {title:'挣客3C门店2.0明天上线',time:'2016-03-12  13：12',content:'挣客3C门店项目2.0版本明天正式上线。'},
      {title:'挣客3C门店2.0明天上线',time:'2016-03-12  13：12',content:'挣客3C门店项目2.0版本明天正式上线。'},
      {title:'挣客3C门店2.0明天上线',time:'2016-03-12  13：12',content:'挣客3C门店项目2.0版本明天正式上线。'}
    ]
  },
  onLoad: function () {
    this.getNewsList()
  },
  //系统消息列表
  getNewsList(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=message_list',
      method: "POST",
      data: {
        // user_id:app.globalData.uid
        
      },
      success: (res)=> {
        console.log(res,'系统消息列表')
        wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  goArticle:function(){
    wx.navigateTo({
      url: '../article/article'
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
