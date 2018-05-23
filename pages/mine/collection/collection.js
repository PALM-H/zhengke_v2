//获取应用实例
const app = getApp()

Page({
  data: {
    itemArr: [
      {url:'../../../images/mine/itemexp1.jpg',ver:'标准 黑色 4+46G',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url:'../../../images/mine/itemexp2.jpg',ver:'游戏之王  16+1T+225 SSD',price:'8589.00',name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置'},
      {url:'../../../images/mine/itemexp1.jpg',ver:'标准 黑色 4+46G',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url:'../../../images/mine/itemexp2.jpg',ver:'游戏之王  16+1T+225 SSD',price:'8589.00',name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置'},
      {url:'../../../images/mine/itemexp1.jpg',ver:'标准 黑色 4+46G',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url:'../../../images/mine/itemexp2.jpg',ver:'游戏之王  16+1T+225 SSD',price:'8589.00',name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置'},
      {url:'../../../images/mine/itemexp1.jpg',ver:'标准 黑色 4+46G',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机'},
      {url:'../../../images/mine/itemexp2.jpg',ver:'游戏之王  16+1T+225 SSD',price:'8589.00',name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置'}
    ]
  },
  onLoad: function () {
    this.getCollectionList()
  },
  //查看已收藏商品
  getCollectionList(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=attention_list',
      method: "POST",
      data: {
        user_id:app.globalData.uid
        
      },
      success: (res)=> {
        console.log(res,'查看已收藏商品')
        wx.hideLoading()
      },
      fail: (err)=>{
        console.log(err);
      }
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
