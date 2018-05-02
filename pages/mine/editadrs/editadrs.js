
Page({
  data: {
    type: 0,
    status:0,
    region: ['全部', '全部', '全部'],
    customItem: '全部',
    name: '',
    tel: '',
    adrs: '',
    pick: false
  },
  onLoad: function (options) {
    this.setData({
      type: options.type,
      status: options.status
    });
    if(options.type==1){
      wx.setNavigationBarTitle({
        title: "添加地址"
      })
    }else if(options.type==2){
      wx.setNavigationBarTitle({
        title: "修改地址"
      })
      this.setData({
        region: ['广东省', '广州市', '天河区'],
        name: "融融",
        tel: "17620895422",
        adrs: "广州天河区东澳创意小镇D2 103"
      });
    }
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
  save: function () {
    if(this.data.status==0){
      wx.navigateBack({
        delta: 1
      })
    }else if(this.data.status==1){
      wx.navigateBack({
        delta: 2
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
