//获取应用实例
const app = getApp()

Page({
  data: {
    gid:'',//从地址栏商品id,
    goodsInfo:[],//商品详情信息
    selectSpec:[],//已选的规格
    selectedSpec:[],//选中的规格
    pro_num:1,//对应规格要购买的数量
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
    isVerHide: true,//是否隐藏产品规格选择窗口
    verArr: [
      {title:'版本',activeNum:'1',defaultNum:'1',ver:[{id:'1',name:'低配'},{id:'2',name:'标准'},{id:'3',name:'高贵'},{id:'4',name:'尊享'}]},
      {title:'颜色',activeNum:'9',defaultNum:'9',ver:[{id:'5',name:'银色'},{id:'6',name:'黑色'},{id:'7',name:'白色'},{id:'8',name:'灰色'},{id:'9',name:'粉色'}]},
      {title:'内存',activeNum:'12',defaultNum:'12',ver:[{id:'10',name:'3+32G'},{id:'11',name:'4+64G'},{id:'12',name:'6+128G'}]}
    ]
  },
  onLoad(options){
    console.log(options,3);
    this.setData({
      gid:options.id
    })

    this.getGoodsInfo();
  },
  addShoppingCart(){
    // console.log(this.data.selectSpec);
    let selectSpec=this.data.selectSpec;
    let selectLabel=[];
    selectSpec.forEach(ele=>{
      selectLabel.push(ele.selectedId);
    })
    selectLabel.join(',');
    // console.log(selectLabel,77777);
    
    let buy_info=this.data.goodsInfo.buy_info;
    buy_info.forEach(ele=>{
      if(ele.split(',#,')[0].indexOf(selectLabel)!=-1){
        wx.showToast({
          title: '库存为0',
          icon:'none',
          duration: 2000
        })
      }
    })
    let pro_id='';//标签id
    buy_info.forEach(ele=>{
      if(ele.split(',#,')[0].indexOf(selectLabel)!=-1){
        pro_id=ele.split(',#,')[1].slice(ele.split(',#,')[1].lastIndexOf(',')+1)
      }
    })
    console.log(pro_id,6666);
  },
  getGoodsInfo(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      url: `${app.globalData.apiUrl}con=mallapi&act=goods_info&gid=${this.data.gid}&uid=${app.globalData.uid}`,
      method: "GET",
      
      success: (res)=> {
        if(res.statusCode==200){
          console.log(res,'获取商品详情');
          
            this.setData({
              goodsInfo:res.data.goods_info
            })
            let fakeSpec=res.data.goods_info.specs;
            fakeSpec.forEach(ele => {
              ele.selectedId=ele.value[0].id
            });
            this.setData({
              selectSpec:fakeSpec
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
    // var that = this;
    // var len = this.data.verArr.length;
    // var changeObj = {};
    // for(var i = 0; i < len; i++) {
    //   var changeData = "verArr["+i+"].activeNum";
    //   changeObj[changeData]=that.data.verArr[i].defaultNum;
    // }
    // this.setData(changeObj)


    let fakeSpec=this.data.selectSpec;
    fakeSpec.forEach(ele => {
      ele.selectedId=ele.value[0].id
    });
    this.setData({
      selectSpec:fakeSpec,
      pro_num:1
    })


  },
  hideVer: function(e){  
    this.setData({  
      isVerHide: true 
    })  
  },
  //版本切换点击
  changetab: function(e) {
    let index = e.currentTarget.dataset.parentindex;
    let id = e.currentTarget.dataset.id;
    let selectSpec = `selectSpec[${index}].selectedId`;
    this.setData({
      [selectSpec]: id
    });
  },
  //数量输入框离开焦点
  bindKeyInput: function(e) {
    if(e.detail.value>0 && e.detail.value!=""){
      this.setData({
        pro_num: e.detail.value
      });
    }else{
      this.setData({
        pro_num: 1
      });
    }
  },
  //减少数量
  reduceNum: function(e) {
    if(this.data.pro_num>1){
      var originalNum = parseInt(this.data.pro_num);
      this.setData({
        pro_num: originalNum-1
      });
    }
  },
  //增加数量
  addNum: function(e) {
    var originalNum = parseInt(this.data.pro_num);
    this.setData({
      pro_num: originalNum+1
    });
  },
  onShareAppMessage() {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/shop/detail/detail?id='+this.data.gid
    }
  }
})

  