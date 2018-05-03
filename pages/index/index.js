//获取应用实例
const app = getApp()

//index.js

Page({
  data: {
    //swiper
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    store_imgs: null,//门店照片
    ad: null, //广告
    store_name: '',//门店名称
    logo_path:'',//门店logo
    the_main:null,//门店标签
    store_phone: '',
    store_address: '',
    latitude: '',
    longitude: '',
  },
  onLoad (options) {
    // wx.showLoading({
    //   mask: true,
    // })
    wx.request({
      url: app.globalData.apiUrl+'con=contentapi&act=get_merchant_message',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data:{
        m_id:app.globalData.merchant_id
      },
      success:(res)=> {
        console.log(res,'111门店信息');
        this.setData({
          store_imgs: res.data.info.store_imgs,
          ad: res.data.info.ad,
          store_name: res.data.info.store_name,
          logo_path: res.data.info.logo_path,
          the_main: res.data.info.the_main,
          store_phone: res.data.info.store_phone,
          store_address: res.data.info.store_address,
        //   latitude: res.data.info.latitude,
        //   longitude: res.data.info.longitude,
        });
        wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  callphone(e){
    wx.makePhoneCall({  
      phoneNumber: this.data.phone
    })  
  },
  clickToMap(e){
    wx.openLocation({
      latitude: parseFloat(this.data.latitude),
      longitude: parseFloat(this.data.longitude),
      scale: 28,
      name: this.data.name,
      address: this.data.address
    })
  },
  onShareAppMessage () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
