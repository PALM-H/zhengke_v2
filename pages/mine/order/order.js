
Page({
  data: {
    activeIndex: 0,
    confirmHide: 1,
    orderArr :[
      {
        status:0,
        orderNum:'201805161315564585',
        count:2,
        total:'12178.00',
        items:[
          {
            name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',
            url:'../../../images/mine/itemexp1.jpg',
            ver:'标准 黑色 4+46G',
            price:'3589.00',
            num:'1'
          },{
            name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',
            url:'../../../images/mine/itemexp2.jpg',
            ver:'游戏之王  16+1T+225 SSD',
            price:'8589.00',
            num:'1'
          }
        ]
      },{
        status:1,
        orderNum:'201805161315564586',
        count:2,
        total:'12178.00',
        items:[
          {
            name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',
            url:'../../../images/mine/itemexp1.jpg',
            ver:'标准 黑色 4+46G',
            price:'3589.00',
            num:'1'
          },{
            name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',
            url:'../../../images/mine/itemexp2.jpg',
            ver:'游戏之王  16+1T+225 SSD',
            price:'8589.00',
            num:'1'
          }
        ]
      },{
        status:2,
        orderNum:'201805161315564587',
        count:2,
        total:'12178.00',
        express:'已到达顺丰黄村网点',
        items:[
          {
            name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',
            url:'../../../images/mine/itemexp1.jpg',
            ver:'标准 黑色 4+46G',
            price:'3589.00',
            num:'1'
          },{
            name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',
            url:'../../../images/mine/itemexp2.jpg',
            ver:'游戏之王  16+1T+225 SSD',
            price:'8589.00',
            num:'1'
          }
        ]
      },{
        status:3,
        orderNum:'201805161315564588',
        count:2,
        total:'12178.00',
        express:'已签收',
        items:[
          {
            name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',
            url:'../../../images/mine/itemexp1.jpg',
            ver:'标准 黑色 4+46G',
            price:'3589.00',
            num:'1'
          },{
            name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',
            url:'../../../images/mine/itemexp2.jpg',
            ver:'游戏之王  16+1T+225 SSD',
            price:'8589.00',
            num:'1'
          }
        ]
      },{
        status:4,
        orderNum:'201805161315564589',
        count:2,
        total:'12178.00',
        express:'已签收',
        items:[
          {
            name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',
            url:'../../../images/mine/itemexp1.jpg',
            ver:'标准 黑色 4+46G',
            price:'3589.00',
            num:'1'
          },{
            name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',
            url:'../../../images/mine/itemexp2.jpg',
            ver:'游戏之王  16+1T+225 SSD',
            price:'8589.00',
            num:'1'
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    var that = this;
    // activeIndex 0-待付款 1-待发货 2-待收货 3-待评价 4-已完成 可酌情调整
    if(options.index!=5){
      this.setData({
        activeIndex: options.index
      });
    }else{
      //注意：此处个人中心传过来的index若为5时，说明用户点击了个人中心的 订单中心 按钮，请跟据后台判断决定显示哪种状态的订单并给activeIndex赋对应值
      this.setData({
        activeIndex: 5
      });
    }
  },
  //navbar点击事件
  tabClick: function(e) {
		var that = this;
    this.setData({
			activeIndex: e.currentTarget.id
		});
  },
  goDetail: function(e) {
    // 注意：此处仅仅为了演示需要，才把订单状态传到订单详情页，整合后台后应传递订单号，详情页中后台根据订单号返回状态
    wx.navigateTo({
      url: '../detail/detail?status='+e.currentTarget.dataset.status
    })
  },
  goPay:function(){
    wx.navigateTo({
      url: '../tips/tips?type=1'
    })
  },
  goComment:function(){
    wx.navigateTo({
      url: '../remark/remark'
    })
  },
  confirm:function(){
    this.setData({
			confirmHide: 0
		});
  },
  cancel:function(){
    this.setData({
			confirmHide: 1
		});
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
