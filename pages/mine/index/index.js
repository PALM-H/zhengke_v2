//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo:false,
    userInfo: null,
    avatarUrl:'',
    nickName:''
  },
  onLoad: function () {
    wx.hideShareMenu()
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getUserAvatar();
    }else{
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = () => {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        console.log(app.globalData.uid,'app.globalData.uid');
        this.getUserAvatar();
      }
    }
  },
  onShow(){
    if(app.globalData.uid){
      this.getUserAvatar();
    }
  },
  getUserAvatar(){
    // wx.showLoading({
    //   title:'加载中...',
    //   mask: true,
    // })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=get_user',
      method: "POST",
      data: {
        user_id:app.globalData.uid
        
      },
      success: (res)=> {
        console.log(res,'获取用户信息（头像、昵称）')
        if(res.data.code==1000){
          this.setData({
            avatarUrl:res.data.user.avatarUrl,
            nickName:res.data.user.nickName ||''
          })
        }
        // wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  getUserInfo(e){
    console.log(e.detail.userInfo,'用户点击按钮获取微信授权');
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
              "为了能正常使用该小程序，请允许将信息授权给我们信息仅作登录使用，我们服务器并不保存任何信息，请放心授权",
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
  goMsg: function(e) {
    wx.navigateTo({
      url: '../msg/msg'
    })
  },
  goNews: function(e) {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  btnToOrder: function(e) {
    // type 0-待付款 1-待发货 2-待收货 3-待评价 4-已完成 可酌情调整
    wx.navigateTo({
      url: '../order/order?index='+e.currentTarget.dataset.type
    })
  },
  goCollection: function(e) {
    wx.navigateTo({
      url: '../collection/collection'
    })
  },
  goService: function(e) {
    wx.makePhoneCall({  
      phoneNumber: '020-38889989'
    })  
    // wx.navigateTo({
    //   url: '../service/service'
    // })
  },
  goAddressPage: function(e) {
    wx.navigateTo({
      url: '../address/address?status=0'
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
