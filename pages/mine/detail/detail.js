//获取应用实例
const app = getApp()

var util = require('../../../utils/md5.js')  

Page({
  data: {
    order_id: 0,
    order_status:0,

    address_info:{},
    or_info:{},
    orders:[],
    exp:{},
    exp_info:[],

    confirmHide: 1
  },
  onLoad: function (options) {
    // 注意：此处仅仅为了演示需要，才把订单状态从订单列表页传到订单详情页，整合后台后应传递订单号，详情页中后台根据订单号返回状态
    this.setData({
      order_id: options.order_id,
      order_status: options.order_status
    });
    console.log(options,111);
    this.getOrderDetail();
    // if(this.data.order_status==2){
    //   this.changeOrderStatus();
    // }
    
  },
  
    //订单列表详情
    getOrderDetail(){
     
      wx.showLoading({
        title:'加载中...',
        mask: true,
      })
      
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.apiUrl+'con=mallapi&act=order_info',
        method: "POST",
        data: {
          order_id: this.data.order_id,
          md5_sign:util.hexMD5(`${this.data.order_id}***zk3c***order#*`),
        },
        success: (res)=> {
          console.log(res,'获取订单列表详情')
         if(res.data.code==1000){
           this.setData({
            address_info:res.data.address_info,
            or_info:res.data.or_info,
            orders:res.data.orders[0],
            exp:res.data.exp,
            exp_info:res.data.exp_info
           })
         }
          wx.hideLoading()
          
         
        },
        fail: (err)=>{
          console.log(err);
        }
      })
    },
  goPay:function(){
    wx.navigateTo({
      url: '../tips/tips?type=1'
    })
  },
  goComment:function(){
    wx.navigateTo({
      url: '../remark/remark'
    })
  },
  goCmMsg:function(){
    wx.navigateTo({
      url: '../cmend/cmend'
    })
  },
  goService:function(){
    wx.makePhoneCall({  
      phoneNumber: '020-38889989'
    }) 
    // wx.navigateTo({
    //   url: '../service/service'
    // })
  },
  //确认收货/取消
  showConfirm:function(){
    this.setData({
			confirmHide: 0
		});
  },
  cancel:function(){
    this.setData({
			confirmHide: 1
		});
  },
  comfirm(){
    this.changeOrderStatus()
  },
  //修改订单状态
  changeOrderStatus(){
    //修改订单状态
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=up_order_status',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        order_no: this.data.or_info.order_no,
        status:4,//确认收货
        md5_sign:util.hexMD5(`${this.data.or_info.order_no}***zk3c***order#*`),
      },
      success: (res)=> {
        console.log(res,'修改订单状态')
       if(res.data.code==1000){
        this.setData({
          confirmHide: 1
        });
        wx.navigateBack();
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
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
