//获取应用实例
const app = getApp()

var util = require('../../../utils/md5.js')

Page({
  data: {
    goods_id:'',//从order页面获取
    order_id:'',//从order页面获取
    order_goods:null,//从order页面获取

    prMark: [0,0,0], //总体评价数组
    itemMark: [0,0], //注意：itemMark为商品打分数组，对接后台时应根据后台数据重新赋值，例如3个商品请赋值 [0,0,0] ，或根据自己思路修改
    evaluate:[],
    product_scores:[],
  },
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      goods_id:options.goods_id,
      order_id:options.order_id
    })
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];  //上一个页面
    console.log(options,11);
    console.log(prevPage,111);
      this.setData({
        order_goods:prevPage.data.orders.order_goods
      })
    
  },
  writeEvaluate(e){
    let index=e.currentTarget.dataset.index;
    let evaluate=`evaluate[${index}]`;
    console.log(e.detail.value);
    this.setData({
      [evaluate]:e.detail.value
    })
  },
  //评价订单
  evaluateOrders(){
     
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    let params={
      order_id:this.data.order_id,
      goods_id:this.data.goods_id,
      user_id: app.globalData.uid,
      delivery_speed_score:this.data.prMark[0],
      service_attitude_score:this.data.prMark[1],
      integrity_score:this.data.prMark[2],
      product_scores:JSON.stringify(this.data.product_scores)
    }
    console.log(params,11);
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=evaluate',
      method: "POST",
      data: params,
      success: (res)=> {
        console.log(res,'评价订单')
        wx.hideLoading()
        if(res.data.code==1000){
          wx.showToast({
            title: "评价成功",
            icon: "success",
            duration: 2000
          });
          setTimeout(()=>{
            wx.navigateBack();
          },1000)
        }
        
        
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  save: function () {
  let product_scores=[];
   this.data.order_goods.forEach((ele,index) => {
     //产品id,商品与描述一致性评分,评论内容
     product_scores.push([ele.product_id,this.data.itemMark[index],this.data.evaluate[index]])
   });
   this.setData({
    product_scores:product_scores
   })
   console.log(product_scores,111);
   this.evaluateOrders()
  },
  //主项目评分 
  primaryMark: function(e) {
    var type = e.currentTarget.dataset.type;
    var changeData = "prMark["+type+"]";
    this.setData({
			[changeData]: e.currentTarget.dataset.num
    });
  },
  //商品评分 
  itemMark: function(e) {
    var type = e.currentTarget.dataset.type;
    var changeData = "itemMark["+type+"]";
    this.setData({
			[changeData]: e.currentTarget.dataset.num
    });
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
