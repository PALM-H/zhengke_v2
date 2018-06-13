//获取应用实例
const app = getApp()

var util = require('../../../utils/md5.js')  

Page({
  data: {
    cartList:[],
    total: 0,
    pro_ids:[],
    product_info:[],
    coupon_code:'',//优惠码
    isCheck:false,//优惠码是否被检测过
    codeTips:'* 优惠码领取需要从商家处进行获取，暂不使用时请勿输入',
    coupon_money:'',

    addressList:[],//收货地址列表
    name: '',//收货人名称
    phone: '',//收货手机
    address: '',//收货地址
    addressid:'',//收货地址id
    desc:'',

    order_id:0
    
  },
  onLoad(options){
    wx.hideShareMenu()
    
   this.getCartListForCartPage();
  },
  onShow(){
     //获取默认地址
     this.getAddressList();
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
    console.log(prevPage,111);
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
          // coupon_code:'',
          coupon_money:res.data.coupon_money,
          codeTips:res.data.msg
         })
       }else if(res.data.code==1001){
        this.setData({
          isCheck:false,
          coupon_code:'',
          coupon_money:0,
          codeTips:'请输入优惠码'
         })
       }
       else{
         this.setData({
          isCheck:false,
          coupon_code:'',
          coupon_money:0,
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

  //获取所有的收货地址
  getAddressList(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=address_list',
      method: "POST",
      data: {
        user_id: app.globalData.uid
      },
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'获取收货地址')
        if(res.data.code==1000){
          this.setData({
            addressList:res.data.address
          })
        
          let addressList=this.data.addressList;
          addressList.forEach(ele => {
            if(ele.is_default==1){
              console.log('把默认地址设置到全局里面');
          //把默认地址设置到全局里面
          app.globalData.userName=ele.accept_name;
          app.globalData.userPhone=ele.mobile;
          app.globalData.address=`${ele.province_name}${ele.city_name}${ele.county_name} ${ele.addr}`
          app.globalData.addressid=ele.id;
          this.setData({
            name:app.globalData.userName,
            phone:app.globalData.userPhone,
            address:app.globalData.address,
            addressid:app.globalData.addressid
          })
            }
          });
       
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //微信支付
  pay_order(){
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: `${app.globalData.apiUrl}con=mallapi&act=pay_order`,
      method: "POST",
      data:{
        merchant_id: app.globalData.merchant_id,
        user_id: app.globalData.uid,
        order_id:this.data.order_id,
        md5_sign:util.hexMD5(`${app.globalData.merchant_id}${app.globalData.uid}***zk3c***order#*`)
        
      },
      success: res => {
        wx.hideLoading();
        console.log(res,'微信支付');
       
        
      },
      fail: err => {
        this.setData({
          cartList: []
        });
        console.log(err);
      }
    });
  },






  goPay: function(e) {
    if(this.data.addressList.length==0){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请添加你的收货地址'
      })
      return;
    }
  
    let params={
      merchant_id: app.globalData.merchant_id,
      user_id: app.globalData.uid,
      address_id:app.globalData.addressid,
      product_info:JSON.stringify(this.data.product_info),
      // util.hexMD5(password)
      md5_sign:util.hexMD5(`${app.globalData.merchant_id}${app.globalData.uid}***zk3c***order#*`),
      user_remark:this.data.desc
    }
    if(this.data.coupon_code.trim()!=''){
      if(!this.data.isCheck){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '请先检测你的优惠码'
        })
        return;
      }else{
        params.coupon_code=this.data.coupon_code;
      }
     }
    console.log(params,33333333333);
    console.log(typeof this.data.product_info);
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
        console.log(res,'添加订单成功')
        if(res.data.code==1000){
          this.setData({
            order_id:res.data.order_list.order_id
          })
          console.log(this.data.order_id,1111);
          wx.showToast({
            title: '添加订单成功',
            icon: 'success',
            duration: 2000
          })
          // this.pay_order()
        }
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
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
