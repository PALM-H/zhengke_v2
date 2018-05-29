//获取应用实例
const app = getApp()

var util = require('../../../utils/md5.js')  

Page({
  data: {
   orders:[],
    activeIndex: 0,
    confirmHide: 1,
    order_no:''
    
  },
  onLoad: function (options) {
    
    // activeIndex 1-待付款 2-待发货 3-待收货 4-待评价 5-已完成 0-所有 可酌情调整
      this.setData({
        activeIndex: options.index
      });
     
  },
  onShow(){
    this.getOrders(this.data.activeIndex);
  },

   //订单列表
   getOrders(status){
     
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    let params={
      user_id: app.globalData.uid,
      md5_sign:util.hexMD5(`${app.globalData.uid}***zk3c***order#*`),
      p:1,
      page_size:15
    }
    if(status){
      params.status=status
    }
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=orders',
      method: "POST",
      data: params,
      success: (res)=> {
        console.log(res,'获取订单列表')
        if(res.data.code==1000){
          this.setData({
            orders:res.data.orders,
          })
        }
        wx.hideLoading()
        
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },















  //navbar点击事件
  tabClick: function(e) {
    this.setData({
			activeIndex: e.currentTarget.dataset.id
    });
    this.getOrders(this.data.activeIndex)
  },
  goDetailPage: function(e) {
    // 注意：此处仅仅为了演示需要，才把订单状态传到订单详情页，整合后台后应传递订单号，详情页中后台根据订单号返回状态
    wx.navigateTo({
      url: '../detail/detail?order_id='+e.currentTarget.dataset.order_id+'&order_status='+e.currentTarget.dataset.order_status
    })
  },
  goPay:function(){
    wx.navigateTo({
      url: '../tips/tips?type=1'
    })
  },
  goComment:function(e){
    let index=e.currentTarget.dataset.index;
    let goods_id=e.currentTarget.dataset.goods_id;
    let order_id=e.currentTarget.dataset.order_id;
    wx.navigateTo({
      url: `../remark/remark?goods_id=${goods_id}&order_id=${order_id}&index=${index}`
    })
  },
  showConfirm:function(e){
    let order_no=e.currentTarget.dataset.order_no;
    this.setData({
      confirmHide: 0,
      order_no:order_no
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
        order_no: this.data.order_no,
        status:4,//确认收货
        md5_sign:util.hexMD5(`${this.data.order_no}***zk3c***order#*`),
      },
      success: (res)=> {
        console.log(res,'修改订单状态')
       if(res.data.code==1000){
        this.setData({
          confirmHide: 1
        });
        this.getOrders();
       
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
