//获取应用实例
const app = getApp()

Page({
  data: {
    order_id:0,
    prMark: [], //总体评价数组
    evaluates:[],
  },
  onLoad: function (options) {
    this.setData({
      order_id:options.order_id
    })
    this.look_order_evaluate()
  },
  //查看订单评价
  look_order_evaluate(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=look_order_evaluate',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        order_id:this.data.order_id
      },
      success: (res)=> {
        console.log(res,'查看订单评价')
       if(res.data.code==1000){
        this.setData({
          ['prMark[0]']:res.data.order_score.delivery_speed_score,
          ['prMark[1]']:res.data.order_score.integrity_score,
          ['prMark[2]']:res.data.order_score.service_attitude_score,
          evaluates:res.data.evaluates
        })
        console.log(this.data.prMark,11111);
       }
        wx.hideLoading()
        
       
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
