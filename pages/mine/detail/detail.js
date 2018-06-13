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
    wx.hideShareMenu()
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
  //取消订单
  cancelOrder(){
    wx.showModal({
      title: '提示',
      content: '你确定要取消订单吗？',
      success: (res)=> {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: app.globalData.apiUrl+'con=mallapi&act=del_order',
            method: "POST",
            data: {
              order_id: this.data.order_id,
              md5_sign:util.hexMD5(`${this.data.order_id}***zk3c***order#*`),
            },
            success: (res)=> {
              console.log(res,'取消订单')
             if(res.data.code==1000){
                wx.navigateBack();
             }
              wx.hideLoading()
              
             
            },
            fail: (err)=>{
              console.log(err);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          return;
        }
      }
    })
    
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
  goComment:function(e){
    let goods_id=e.currentTarget.dataset.goods_id;
    let order_id=e.currentTarget.dataset.order_id;
    wx.navigateTo({
      url: `../remark2/remark2?goods_id=${goods_id}&order_id=${order_id}`
    })
  },
  goCmMsg:function(){
    wx.navigateTo({
      url: '../cmend/cmend?order_id='+this.data.order_id
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
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
