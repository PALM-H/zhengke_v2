
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
