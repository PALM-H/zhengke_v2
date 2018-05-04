//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      {url:'../../../images/shop/exp-banner-mid.jpg'},
      {url:'../../../images/shop/exp-banner-mid.jpg'},
      {url:'../../../images/shop/exp-banner-mid.jpg'},
      {url:'../../../images/shop/exp-banner-mid.jpg'},
      {url:'../../../images/shop/exp-banner-mid.jpg'}
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    swiperCurrent: 0,
    remarkListArr: [
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'4',time:'2018.02.22',ver:'3 + 32 G  黑色'},
      {url:'../../../images/shop/exp-headimg.jpg',name:'火星人的地球',content:'很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买 很流畅、不卡、很好，下次还会再买，也会推荐其他朋友进行购买',mark:'5',time:'2018.02.22',ver:'3 + 32 G  黑色'}
    ],
    detailTabActive : 0,
    isVerHide: true,
    verArr: [
      {title:'版本',activeNum:'1',defaultNum:'1',ver:[{id:'1',name:'低配'},{id:'2',name:'标准'},{id:'3',name:'高贵'},{id:'4',name:'尊享'}]},
      {title:'颜色',activeNum:'9',defaultNum:'9',ver:[{id:'5',name:'银色'},{id:'6',name:'黑色'},{id:'7',name:'白色'},{id:'8',name:'灰色'},{id:'9',name:'粉色'}]},
      {title:'内存',activeNum:'12',defaultNum:'12',ver:[{id:'10',name:'3+32G'},{id:'11',name:'4+64G'},{id:'12',name:'6+128G'}]}
    ],
    itemnum: 1
  },
  onLoad(options){
    console.log(options,3);
  },
  getGoodsInfo(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      url: `${app.globalData.apiUrl}con=mallapi&act=goods_info`,
      method: "GET",
      
      success: (res)=> {
        console.log(res,'3-1-1获取所有商品列表')
        if(res.statusCode==200){
            this.setData({
              goodsList:res.data.cat_list.data
            })
            wx.hideLoading()
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //轮播切换相关
  swiperChange: function(e){  
    this.setData({  
      swiperCurrent: e.detail.current  
    })  
  },
  goMoreREmark: function(e){  
    wx.navigateTo({
      url: '../remark/remark'
    })
  },
  //详情部分切换事件
  changeDetail: function(e) {
    this.setData({
			detailTabActive: e.currentTarget.dataset.num
		});
  },
  goCart: function(e){  
    wx.navigateTo({
      url: '../cart/cart'
    })
  },
  goConfirm: function() {
    wx.navigateTo({
      url: '../confirm/confirm'
    })
  },
  //显示/隐藏版本选择
  showVer: function(e){  
    this.setData({  
      isVerHide: false 
    })  
  },
  reset: function(){
    var that = this;
    var len = this.data.verArr.length;
    var changeObj = {};
    for(var i = 0; i < len; i++) {
      var changeData = "verArr["+i+"].activeNum";
      changeObj[changeData]=that.data.verArr[i].defaultNum;
    }
    this.setData(changeObj)
  },
  hideVer: function(e){  
    this.setData({  
      isVerHide: true 
    })  
  },
  //版本切换点击
  changetab: function(e) {
    var index = e.currentTarget.dataset.parentindex;
    var id = e.currentTarget.dataset.id;
    var changeData = "verArr["+index+"].activeNum";
    this.setData({
      [changeData]: id
    });
  },
  //数量输入框离开焦点
  bindKeyInput: function(e) {
    if(e.detail.value>0 && e.detail.value!=""){
      this.setData({
        itemnum: e.detail.value
      });
    }else{
      this.setData({
        itemnum: 1
      });
    }
  },
  //减少数量
  reduceNum: function(e) {
    if(this.data.itemnum>1){
      var originalNum = parseInt(this.data.itemnum);
      this.setData({
        itemnum: originalNum-1
      });
    }
  },
  //增加数量
  addNum: function(e) {
    var originalNum = parseInt(this.data.itemnum);
    this.setData({
      itemnum: originalNum+1
    });
  },
  onShareAppMessage() {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})

  