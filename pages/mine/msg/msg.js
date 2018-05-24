//获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: '',
    save_url:'',
    nickName: ''
  },
  onLoad: function () {
    this.getUserAvatar() 
  },
  bindinputnickname(e){
    this.setData({
      nickName:e.detail.value
    })
  },
  getUserAvatar(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
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
            nickName:res.data.user.nickName
          })
        }
        wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  save: function () {
    this.updateUserInfo();
  },
  chooseImage() {
    //注意：此处需要用户选择等宽高图片，或者后端裁剪，否则会压缩比例
    wx.chooseImage({
      count: 1, 
      sizeType: ['compressed'],//使用压缩图，可酌情更改
      success: (res)=> {
        console.log(res,111);
        
        wx.showLoading({
          title:'上传中...',
          mask: true,
        })
        wx.uploadFile({
          header: {
            "Content-Type": "multipart/form-data"
          },
          url: `${app.globalData.apiUrl}con=public&act=img_upload`,
          filePath: res.tempFilePaths[0],
          name: 'img',
          success:(res)=>{
            wx.hideLoading();
            let data=JSON.parse(res.data)
            console.log(data,2323);
            if(data.code==1000){
              this.setData({
                avatarUrl: data.img_path_arr.show_url,
                save_url: data.img_path_arr.save_url
              });
            }else{
              wx.showModal({
                title: '提示',
                showCancel:false,
                content: data.msg
              })
            }
            
          }
        })
      }
    })
  },
  //设置头像、昵称
  updateUserInfo(){
    let params= {
      user_id:app.globalData.uid,
      nickname:this.data.nickName
    };
    if(this.data.save_url){
      params.headimg=this.data.save_url
    }
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=set_user',
      method: "POST",
      data:params,
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'设置头像、昵称')
        if(res.data.code==1000){
          this.setData({
            avatarUrl:res.data.user.avatarUrl,
            nickName:res.data.user.nickName
          })
          wx.navigateBack();
        }else{
          wx.showModal({
            title: res.data.msg,
            showCancel: false
          });
        }
       
        
      },
      fail: (err)=>{
        console.log(err);
      }
    })  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
