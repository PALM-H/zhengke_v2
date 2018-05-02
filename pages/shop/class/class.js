
Page({
  data: {
    activeClass: 0,
    classArr: [
      {url:'../../../images/shop/icon11.png',name:'安卓手机',num:'1'},
      {url:'../../../images/shop/icon12.png',name:'平板电脑',num:'2'},
      {url:'../../../images/shop/icon13.png',name:'笔记本',num:'3'},
      {url:'../../../images/shop/icon14.png',name:'台式电脑',num:'4'},
      {url:'../../../images/shop/icon15.png',name:'数码相机',num:'5'},
      {url:'../../../images/shop/icon16.png',name:'USB线缆',num:'6'},
      {url:'../../../images/shop/icon17.png',name:'音视频线',num:'7'},
      {url:'../../../images/shop/icon18.png',name:'耳机',num:'8'},
      {url:'../../../images/shop/icon19.png',name:'音响',num:'9'},
      {url:'../../../images/shop/icon20.png',name:'U盘',num:'10'},
      {url:'../../../images/shop/icon21.png',name:'数据线',num:'11'},
      {url:'../../../images/shop/icon22.png',name:'硬盘',num:'12'},
      {url:'../../../images/shop/icon22.png',name:'显卡',num:'13'},
      {url:'../../../images/shop/icon22.png',name:'CPU',num:'14'},
      {url:'../../../images/shop/icon22.png',name:'内存条',num:'15'}
    ],
    subClassArr: [
      {url:'../../../images/shop/icon23.png',name:'小米'},
      {url:'../../../images/shop/icon24.png',name:'苹果'},
      {url:'../../../images/shop/icon25.png',name:'VIVO'},
      {url:'../../../images/shop/icon26.png',name:'三星'},
      {url:'../../../images/shop/icon27.png',name:'华为'},
      {url:'../../../images/shop/icon28.png',name:'魅族'},
      {url:'../../../images/shop/icon29.png',name:'OPPO'},
      {url:'../../../images/shop/icon30.png',name:'中兴'},
      {url:'../../../images/shop/icon23.png',name:'小米'},
      {url:'../../../images/shop/icon24.png',name:'苹果'},
      {url:'../../../images/shop/icon25.png',name:'VIVO'},
      {url:'../../../images/shop/icon26.png',name:'三星'},
      {url:'../../../images/shop/icon27.png',name:'华为'},
      {url:'../../../images/shop/icon28.png',name:'魅族'},
      {url:'../../../images/shop/icon29.png',name:'OPPO'},
      {url:'../../../images/shop/icon30.png',name:'中兴'}
    ]
  },
  onLoad: function (options) {
    this.setData({
      activeClass: options.status
    });
  },
  changeClass: function(e) {
    this.setData({
			activeClass: e.currentTarget.dataset.num
		});
  },
  goItemList: function(e) {
    wx.navigateTo({
      url: '../itemlist/itemlist'
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

  