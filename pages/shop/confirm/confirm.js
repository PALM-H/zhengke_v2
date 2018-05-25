//获取应用实例
const app = getApp()
Page({
  data: {
    cartList:[],
    total: 0,
    pro_ids:[],
    product_info:[],
    coupon_code:'',//优惠码
    isCheck:false,//优惠码是否被检测过
    codeTips:'* 优惠码领取需要从商家处进行获取，暂不使用时请勿输入',

    name: '',
    phone: '',
    address: '',
    addressid:'',
    desc:'',
    
    itemListArr: [
      {url:'../../../images/mine/itemexp1.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',ver:'标准  黑色  4+46G',price:'3589.00',num:1},
      {url:'../../../images/mine/itemexp2.jpg',name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',ver:'版本：游戏之王  16+1T+225 SSD',price:'8589.00',num:1}
    ]
  },
  onLoad(options){
   this.getCartListForCartPage();
  },
  onShow(){
    this.setData({
      name:app.globalData.userName,
      phone:app.globalData.userPhone,
      address:app.globalData.address,
      addressid:app.globalData.addressid
    })
  },
  //从购物车页面获取购物车商品数据
  getCartListForCartPage(){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];  //上一个页面
    let cartList=[];
    let pro_ids=[];
    let product_info=[];
    prevPage.data.cartList.forEach(ele => {
      if(ele.isSelect===1){
        cartList.push(ele)
        pro_ids.push(ele.pro_id);
        product_info.push({
          product_id:ele.pro_id,
          buy_num:ele.pro_num
        })
      }
      
    });
    this.setData({
      cartList:cartList,
      pro_ids:pro_ids,
      product_info:product_info
    })
    let total=0;
    cartList.forEach(ele=>{
      total+=ele.sell_price*ele.pro_num;
    })
    this.setData({
      total:total
    })
    console.log(this.data.cartList,'购物车商品数据');
  },
  handlebindinput(e){
    this.setData({
      coupon_code:e.detail.value,
      isCheck:false,
    })
  },

  //检测优惠券是否可用
  checkCode(){
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    console.log(this.data.pro_ids);
    console.log(this.data.coupon_code);
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: `${app.globalData.apiUrl}con=mallapi&act=coupon_code_ispass`,
      method: "POST",
      data:{
        merchant_id: app.globalData.merchant_id,
        pro_ids:this.data.pro_ids,
        coupon_code:this.data.coupon_code
      },
      success: res => {
        wx.hideLoading();
        console.log(res,'检测优惠码');
       if(res.data.code==1000){
        this.setData({
          isCheck:true,
          coupon_code:'',
          codeTips:res.data.msg
         })
       }else if(res.data.code==1001){
        this.setData({
          isCheck:false,
          coupon_code:'',
          codeTips:'请输入优惠码'
         })
       }
       else{
         this.setData({
          isCheck:false,
          coupon_code:'',
          codeTips:res.data.msg
         })
       }
        
      },
      fail: err => {
        this.setData({
          cartList: []
        });
        console.log(err);
      }
    });
  },
  goAddress: function(e) {
    wx.navigateTo({
      url: '../../mine/address/address?status=1'
    })
  },
  bindinputdesc(e){
    let desc=e.detail.value;
    this.setData({
      desc:desc
    })
  },
  goPay: function(e) {
   if(this.data.coupon_code.trim()!=''){
    if(!this.data.isCheck){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请先检测你的优惠码',
        success: function(res) {
         
        }
      })
      return;
    }
   }
    let params={
      merchant_id: app.globalData.merchant_id,
      user_id: app.globalData.uid,
      address_id:app.globalData.addressid,
      product_info:this.data.product_info,
      md5_sign:`${app.globalData.merchant_id}${app.globalData.uid}***zk3c***order#*`,
      user_remark:this.data.desc
    }
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    //添加订单
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=add_order',
      method: "POST",
      data:params,
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'添加订单')
        // if(res.data.code==1000){
        //   this.getAddressList(); 
        // }else{
        //   wx.showModal({
        //     title: '提示',
        //     showCancel:false,
        //     content: '删除失败'
        //   })
         
        // }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
    // wx.redirectTo({
    //   url: '../../mine/tips/tips?type=1'
    // })
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
