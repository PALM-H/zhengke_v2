const util = require("./utils/util.js");
//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    this.initLogin();
  },
  checkSettingStatus() {
    wx.getSetting({
      success: res => {
        let authSetting = res.authSetting;
        if (util.isEmptyObject(authSetting)) {
          console.log("首次授权");
          this.login();
        } else {
          console.log("不是第一次授权", authSetting);
          // 没有授权的提醒

          if (authSetting["scope.userInfo"] === false) {
            wx.showModal({
              title: "用户未授权",
              content:
                "如需正常使用阅读记录功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。",
              showCancel: false,
              success: (res)=> {
                if (res.confirm) {
                  console.log("用户点击确定");
                  wx.openSetting({
                    success: (res)=> {
                      console.log("openSetting success", res.authSetting);
                      this.login();
                    },
                    fail:(err)=>{
                      this.checkSettingStatus();
                    }
                  });
                }
              }
            });
          }else{
            this.login();
          }
        }
      }
    });
  },
  initLogin() {
    //调用登录接口
    //1.小程序调用wx.login得到code.
    wx.login({
      success: res => {
        let code = res.code;
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          withCredentials: true, //是否带上登录态信息
          lang: "zh_CN", //返回用户信息的语言
          success: info => {
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(info)
            }
            this.globalData.userInfo = info.userInfo;
            let rawData = info.rawData;
            let signature = info.signature;
            let encryptedData = info.encryptedData;
            let iv = info.iv;
            console.log(this.globalData.userInfo, 111);
            //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            wx.request({
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: this.globalData.apiUrl + "con=loginapi&act=wx_login",
              method: "POST",
              data: {
                merchant_id: 670,
                code: code,
                rawData: rawData, //非必填
                signature: signature, //非必填
                iv: iv,
                encrypted_data: encryptedData
              },
              success: res => {
                if (res.statusCode != 200) {
                  wx.showModal({
                    title: "登录失败",
                    showCancel: false
                  });
                } else {
                  this.globalData.uid = res.data.userInfo.uid;
                  this.globalData.hasGetUserInfo = true;
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              },
              fail: err => {
                console.log(err);
              }
            });
          },
          fail:(err)=>{
            console.log('用户取消授权')
          }
        });
      }
    });
  },
  login() {
    //调用登录接口
    //1.小程序调用wx.login得到code.
    wx.login({
      success: res => {
        let code = res.code;
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          withCredentials: true, //是否带上登录态信息
          lang: "zh_CN", //返回用户信息的语言
          success: info => {
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(info)
            }
            this.globalData.userInfo = info.userInfo;
            let rawData = info.rawData;
            let signature = info.signature;
            let encryptedData = info.encryptedData;
            let iv = info.iv;
            console.log(this.globalData.userInfo, 111);
            //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            wx.request({
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: this.globalData.apiUrl + "con=loginapi&act=wx_login",
              method: "POST",
              data: {
                merchant_id: this.globalData.merchant_id,
                code: code,
                rawData: rawData, //非必填
                signature: signature, //非必填
                iv: iv,
                encrypted_data: encryptedData
              },
              success: res => {
                if (res.statusCode != 200) {
                  wx.showModal({
                    title: "登录失败",
                    showCancel: false
                  });
                } else {
                  this.globalData.uid = res.data.userInfo.uid;
                  this.globalData.hasGetUserInfo = true;
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              },
              fail: err => {
                console.log(err);
              }
            });
          },
          fail:(err)=>{
            console.log('用户取消授权')
            this.checkSettingStatus();
          }
        });
      }
    });
  },
  globalData: {
    uid: null,
    userInfo: null, //用户信息
    hasGetUserInfo: false,
    merchant_id:670, //商人ID
    apiUrl: "https://www.znnkee.com/smallprogram_mall/zk3c/index.php?"
  }
});
