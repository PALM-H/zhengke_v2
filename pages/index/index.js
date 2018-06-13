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
        console.log(this.data.ad,'ad');
        app.globalData.store_name=res.data.info.store_name;
        app.globalData.logo_path=res.data.info.logo_path;
        wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  callphone(e){
    wx.makePhoneCall({  
      phoneNumber: this.data.store_phone
    })  
  },
  clickToMap(e){
    return;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          name:'测试名称',
          address:'测试地址'
        })
      }
    })
    // wx.openLocation({
    //   latitude: parseFloat(this.data.latitude),
    //   longitude: parseFloat(this.data.longitude),
    //   scale: 18,
    //   name: this.data.store_name,
    //   address: this.data.store_address
    // })
  },
  previewImage(e){
    console.log(1123);
    let current=e.target.dataset.src;  
    wx.previewImage({  
        current: current, // 当前显示图片的http链接  
        urls: this.data.store_imgs // 需要预览的图片http链接列表  
    })  
  },
 
  onShareAppMessage () {
    return {
      title: app.globalData.store_name,
      // imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
