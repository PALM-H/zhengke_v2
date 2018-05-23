
Page({
  data: {
    type: 0,
    status:0,
    region: ['请选择', '请选择', '请选择'],
    customItem: '请选择',
    name: '',
    tel: '',
    adrs: '',
    pick: false
  },
  onLoad(options) {
    console.log(options,1221212121);
    // this.setData({
    //   type: options.type,
    //   status: options.status
    // });
    // if(options.type==1){
    //   wx.setNavigationBarTitle({
    //     title: "添加地址"
    //   })
    // }else if(options.type==2){
    //   wx.setNavigationBarTitle({
    //     title: "修改地址"
    //   })
      
    // }
  },
  addAdrs(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=address_add',
      method: "POST",
      data: {
        user_id: app.globalData.uid
        
      },
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'获取收货地址')
        if(res.data.code==1000){
          
        }else if(res.data.code==1002){
          console.log(res.data.msg);
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //选择地区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  //设为默认/取消
  defaultChange: function (e) {
    var that = this;
    this.setData({
      pick: !that.data.pick
    })
  },
  bindnameinput(e){
    this.setData({
      name:e.detail.value,
    })
  },
  bindtelinput(e){
    this.setData({
      tel:e.detail.value,
    })
  },
  bindadrsinput(e){
    this.setData({
      adrs:e.detail.value,
    })
  },
  saveAdrs: function () {
    if(!this.data.name){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入姓名'
      })
      return;
    }
    if(!this.data.tel){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入手机号码'
      })
      return;
    }
    if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.tel)){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的手机格式'
      })
      return;
    }
    if(this.data.region[0]=='请选择'||this.data.region[1]=='请选择'||this.data.region[2]=='请选择'){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请选择所在区域'
      })
      return;
    }
    if(!this.data.tel){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入详情地址'
      })
      return;
    }
    console.log(this.data.region[0]);
    console.log(this.data.region[1]);
    console.log(this.data.region[2]);

    // if(this.data.status==0){
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // }else if(this.data.status==1){
    //   wx.navigateBack({
    //     delta: 2
    //   })
    // }
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
