//获取应用实例
const app = getApp()

//article.js
var WxParse = require('../../../wxParse/wxParse.js');

Page({
  data: {
    gid:'',//从地址栏商品id,

    goodsInfo:[],//商品详情信息
    selectSpec:[],//已选的规格
    selectSpecStr:'',
    pro_num:1,//对应规格要购买的数量
    pro_id:'',//商品规格id
  
    remarkList:[],//商品评价
    goodsParams:[],//商品参数
    detailTabActive : 0,
    cartList: [],//立即购买
    

    //swiper
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    swiperCurrent: 0,

   
    
    isVerHide: true,//是否隐藏产品规格选择窗口
    verArr: [
      {title:'版本',activeNum:'1',defaultNum:'1',ver:[{id:'1',name:'低配'},{id:'2',name:'标准'},{id:'3',name:'高贵'},{id:'4',name:'尊享'}]},
      {title:'颜色',activeNum:'9',defaultNum:'9',ver:[{id:'5',name:'银色'},{id:'6',name:'黑色'},{id:'7',name:'白色'},{id:'8',name:'灰色'},{id:'9',name:'粉色'}]},
      {title:'内存',activeNum:'12',defaultNum:'12',ver:[{id:'10',name:'3+32G'},{id:'11',name:'4+64G'},{id:'12',name:'6+128G'}]}
    ]
  },
  onLoad(options){
    console.log(options);
    this.setData({
      gid:options.id
    })
    //获取商品详情
    this.getGoodsInfo();
    this.getGoodsEvaluateInfo();
    this.getGoodsParams();
  },
//设置商品规格字符串
  setSelectSpecStr(){
     //商品规格字符串
     let selectSpecStr='';
     this.data.selectSpec.forEach(ele1 => {
       ele1.value.forEach(ele2=>{
         if(ele1.selectedId==ele2.id){
           selectSpecStr+=ele2.name+' '
             }
       })
    
     });
     this.setData({
       selectSpecStr:selectSpecStr
     })
  },
  //添加收藏
  starGoods(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
		wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=add_attention',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        goods_id:this.data.gid,
      },
      success: (res)=> {//添加收藏
        wx.hideLoading()
        console.log('添加到购物车:',res)
        if(res.data.code==1000){
          wx.showToast({
            title: res.data.msg,
            icon:'success',
            duration: 2000
          })
          this.getGoodsInfo();
        }else if(res.data.code==1002){//取消收藏
          wx.showToast({
            title: res.data.msg,
            icon:'success',
            duration: 2000
          })
          this.getGoodsInfo();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            image:'/images/error.png',
            duration: 2000
          })
        }
        
        
        // this.getGoodsInfo();
      },
      fail: (err)=>{
        console.log(err);
      }
    })
	},
  //添加到购物车
  setGoodsToShoppingMart(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
		wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=cart_add',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        gid:this.data.gid,
        pro_id:this.data.pro_id,
        pro_num: this.data.pro_num
      },
      success: (res)=> {
        console.log('添加到购物车:',res)
        if(res.data.code==1000){
          wx.showToast({
            title: res.data.msg,
            icon:'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            image:'/images/error.png',
            duration: 2000
          })
        }
        
        wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },

  //加入到购物车
  addShoppingCart(){
    let selectSpec=this.data.selectSpec;
    let selectLabel=[];
    selectSpec.forEach(ele=>{
      selectLabel.push(ele.selectedId);
    })
    selectLabel.join(',');
    console.log(selectLabel,77777);
    let isNull=false;//判断库存是否为零
    let pro_id='';//标签id
    let buy_info=this.data.goodsInfo.buy_info;
    buy_info.forEach(ele=>{
      if(ele.split(',#,')[0].indexOf(selectLabel)!=-1){
        if(ele.split(',#,')[1].indexOf(',0,')!=-1){
          wx.showToast({
            title: '库存为0',
            icon:'none',
            image:'/images/error.png',
            duration: 2000
          })
          isNull=true;
        }else{
          //获取最后一个数字
          pro_id=ele.split(',#,')[1].slice(ele.split(',#,')[1].lastIndexOf(',')+1)
        }
        
      }
    })
    
    if(!isNull){
      this.setData({
        pro_id:pro_id
      })
      console.log(this.data.pro_id,'商品规格id');
      this.setGoodsToShoppingMart();
    }
  },

  //获取商品详情
  getGoodsInfo(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: `${app.globalData.apiUrl}con=mallapi&act=goods_info`,
      method: "POST",
      data:{
          gid:this.data.gid,
          user_id:app.globalData.uid
      },
      success: (res)=> {
        wx.hideLoading()
        if(res.data.code==1000){
          console.log(res,'获取商品详情');
          
            this.setData({
              goodsInfo:res.data.goods_info
            })


            //商品规格
            let selectSpec=res.data.goods_info.specs;
            selectSpec.forEach(ele => {
              ele.selectedId=ele.value[0].id
            });
            this.setData({
              selectSpec:selectSpec
            })

           this.setSelectSpecStr()

            
                        
           
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //获取商品评价内容
  getGoodsEvaluateInfo(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: `${app.globalData.apiUrl}con=mallapi&act=goods_evaluate_info`,
      method: "POST",
      data:{
          gid:this.data.gid,
          uid:app.globalData.uid
      },
      success: (res)=> {
        if(res.data.code==1000){
          console.log(res,'获取商品评价内容');
          this.setData({
            remarkList:res.data.evaluate_list
          })
                        
            wx.hideLoading()
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //获取商品图文详情、清单及参数
  getGoodsParams(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: `${app.globalData.apiUrl}con=mallapi&act=goods_info_view`,
      method: "POST",
      data:{
          gid:this.data.gid,
          type:this.data.detailTabActive
      },
      success: (res)=> {
        wx.hideLoading()        
        if(res.data.code==1000){
          console.log(res,'获取商品图文详情、清单及参数');

          if(this.data.detailTabActive==0){
            WxParse.wxParse('article', 'html', res.data.info,this,5)
          }else{
            WxParse.wxParse('article2', 'html', res.data.info,this,5)
          }
                        
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
  goMoreREmarkPage: function(e){  
   
    wx.navigateTo({
      url: `../remark/remark`
    })
  },
  //详情部分切换事件
  changeDetail: function(e) {
    this.setData({
			detailTabActive: e.currentTarget.dataset.num
    });
    this.getGoodsParams();
  },
  //查看购物车
  seeCartPage: function(e){  
    wx.navigateTo({
      url: '../cart/cart'
    })
  },

  //立即购买
  goConfirmPage: function() {
    let selectSpec=this.data.selectSpec;
    let selectLabel=[];
    selectSpec.forEach(ele=>{
      selectLabel.push(ele.selectedId);
    })
    selectLabel.join(',');
    let pro_id='';//标签id
    let buy_info=this.data.goodsInfo.buy_info;
    buy_info.forEach(ele=>{
      if(ele.split(',#,')[0].indexOf(selectLabel)!=-1){
        if(ele.split(',#,')[1].indexOf(',0,')==-1){
          //获取最后一个数字
          pro_id=ele.split(',#,')[1].slice(ele.split(',#,')[1].lastIndexOf(',')+1)
        }
        
      }
    })
    this.setData({
      pro_id:pro_id
    })


    let cartList=[{
      isSelect:1,
      pro_id:this.data.pro_id,
      pro_num:this.data.pro_num,
      spec:this.data.selectSpecStr,
      goods_pic:this.data.goodsInfo.img,
      goods_name:this.data.goodsInfo.name,
      sell_price:this.data.goodsInfo.sell_price,
    }]
    this.setData({
      cartList:cartList
    })
    console.log(this.data.cartList);
    wx.navigateTo({
      url: '../confirm/confirm'
    })
  },
  //显示/隐藏版本选择
  showSpecModal: function(e){ 
    this.setData({  
      isVerHide: false 
    })  
  },
  //重置规格
  resetSpec: function(){
    let fakeSpec=this.data.selectSpec;
    fakeSpec.forEach(ele => {
      ele.selectedId=ele.value[0].id
    });
    this.setData({
      selectSpec:fakeSpec,
      pro_num:1
    })


    this.setSelectSpecStr()
  },
  hideVer: function(e){  
    this.setData({  
      isVerHide: true 
    })  
  },
  //版本切换点击
  changeSpec: function(e) {
    let index = e.currentTarget.dataset.parentindex;
    let id = e.currentTarget.dataset.id;
    let selectSpec = `selectSpec[${index}].selectedId`;
    this.setData({
      [selectSpec]: id
    });

  this.setSelectSpecStr();
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
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/shop/detail/detail?id='+this.data.gid
    }
  }
})

  