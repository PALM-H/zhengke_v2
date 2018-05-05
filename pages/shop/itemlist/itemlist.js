//获取应用实例
const app = getApp()

Page({
  data: {
    cid:'',

    goodsList:[],

    activeNav: 0,
    filterHide: true,
    itemListArr: [
      {url:'../../../images/shop/exp-item-mid.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',price:'3589.00',sales:'5479'},
      {url:'../../../images/shop/exp-item-mid.jpg',name:'红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',price:'3589.00',sales:'5479'},
      {url:'../../../images/shop/exp-item-mid.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',price:'3589.00',sales:'5479'},
      {url:'../../../images/shop/exp-item-mid.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',price:'3589.00',sales:'5479'},
      {url:'../../../images/shop/exp-item-mid.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',price:'3589.00',sales:'5479'},
      {url:'../../../images/shop/exp-item-mid.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',price:'3589.00',sales:'5479'},
    ],
    tabArr: [
      {name:'全部'},
      {name:'红米 5A'},
      {name:'红米 5plus'},
      {name:'小米MIX'},
      {name:'小米MIX2'},
      {name:'小米6'},
      {name:'OPPO'},
      {name:'VIVO'},
      {name:'华为'},
      {name:'苹果'},
      {name:'三星'},
      {name:'魅族'},
      {name:'中兴'}
    ]
  },
  onLoad: function (options) {
    this.setData({
      cid:this.options.id
    })
    console.log(this.data.cid,666);
    this.getGoodsList();
  },
  getGoodsList() {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    wx.request({
      url:`${app.globalData.apiUrl}con=mallapi&act=goods_list&merchant_id=${app.globalData.merchant_id}&cid=${this.data.cid}`,
      method: "GET",
      success: res => {
        console.log(res,9999);
        wx.hideLoading();
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  changeNav: function(e) {
    this.setData({
			activeNav: e.currentTarget.dataset.num
		});
  },
  goSearch: function(e){  
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //产品筛选显示
  btnShowFilter: function(e){  
    this.setData({
			filterHide: false
		});
  },
  //产品筛选隐藏
  btnHideFilter: function(e){  
    this.setData({
			filterHide: true
		});
  },
  goDetail: function(e){  
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})

  