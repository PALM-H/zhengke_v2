//获取应用实例
const app = getApp()

Page({
  data: {
    headImg: '../../../images/mine/exp-headimg.jpg',
    name: '测试nickName'
  },
  onLoad: function () {
    
  },
  save: function () {
    wx.navigateBack({
      delta: 1
    })
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
          url: `${app.globalData.apiUrl}con=public&act=img_upload`, //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'img',
          success:(res)=>{
            wx.hideLoading();
            let data=JSON.parse(res.data)
            console.log(data,2323);
            if(data.code==1000){
              this.setData({
                headImg: data.imgUrl
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
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
