//获取应用实例
const app = getApp()

Page({
  data: {
    collectionList:[],
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
  },
  onShow(){
    this.getCollectionList()
  },
  goDetailPage: function(e){  
    wx.navigateTo({
      url: '/pages/shop/detail/detail?id='+e.currentTarget.dataset.goods_id
    })
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
        if(res.data.code==1000){
          this.setData({
            collectionList:res.data.attention_list
          })
        }
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  cancelStar(e){
    let goods_id=e.currentTarget.dataset.goods_id;
    console.log(goods_id);
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
		wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=add_attention',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        goods_id:goods_id,
      },
      success: (res)=> {//添加收藏
        wx.hideLoading()
        console.log('取消收藏:',res)
        if(res.data.code==1002){//取消收藏
          wx.showToast({
            title: res.data.msg,
            icon:'success',
            duration: 2000
          })
          this.getCollectionList();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            image:'/images/error.png',
            duration: 2000
          })
        }
        
        
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
