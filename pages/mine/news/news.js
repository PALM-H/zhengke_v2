//获取应用实例
const app = getApp()

Page({
  data: {
    newsList:[]
  },
  onLoad() {
    wx.hideShareMenu()
  },
  onShow(){
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
        if(res.data.code==1000){
          this.setData({
            newsList:res.data.msg_list
          })
          console.log(this.data.newsList)
        }
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  goArticlePage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../article/article?id=${id}`
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
