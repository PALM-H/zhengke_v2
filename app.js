const util = require("./utils/util.js");
//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    this.login();

  },
  login() {
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    //1.小程序调用wx.login得到code.
    wx.login({
      success: res => {
        this.globalData.code = res.code;
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting["scope.userInfo"]) {
              console.log('之前已经授权成功过了');
              //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
              wx.getUserInfo({
                success: res => {
                  
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo;
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  
                  console.log(res,9999999);
                  //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
                  let params = {
                    merchant_id: this.globalData.merchant_id,
                    code:this.globalData.code,
                    rawData: res.rawData,//非必填
                    signature: res.signature,//非必填
                    encrypted_data: res.encryptedData,
                    iv: res.iv
                  };
                  wx.request({
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    url: this.globalData.apiUrl + "con=loginapi&act=wx_login",
                    method: "POST",
                    data: params,
                    success: res => {
                      wx.hideLoading();
                      if (res.statusCode != 200) {
                        wx.showModal({
                          title: "登录失败",
                          showCancel: false
                        });
                      } else {
                        
                        this.globalData.uid = res.data.userInfo.uid;
                        console.log(this.globalData.uid,'this.globalData.uid');
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback();
                        }
                        wx.showToast({
                          title: "登录成功",
                          icon: "success",
                          duration: 2000
                        });
                      }
                    },
                    fail: err => {
                      console.log(err);
                    }
                  });
                }
              });
            }
          }
        });
      }
    });
  },

  globalData: {
    code: "", //通过wx.login获取的code
    uid: null,
    userInfo: null, //用户信息
    merchant_id: 670, //商人ID
    apiUrl: "https://www.znnkee.com/smallprogram_mall/zk3c/index.php?",

    //用户选中的地址信息
    userName: "",
    userPhone: "",
    address: "",
    addressid:"",

  //小程序分享的信息
  logo_path:'',
  store_name:'',



  }
});
