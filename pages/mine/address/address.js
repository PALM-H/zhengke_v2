//获取应用实例
const app = getApp();


Page({
  data: {
    activeAdrs: 0,
    status:0,
    addressList:[],
    adrsArr: [
      {name:'融融',phone:'176****5422',address:'广东省 广州市 天河区  广州市天河区奥体南路东澳创意小镇D2栋 103',index:0},
      {name:'融融',phone:'176****5422',address:'广东省 广州市 天河区  广州市天河区奥体南路东澳创意小镇D2栋 103',index:1},
      {name:'融融',phone:'176****5422',address:'广东省 广州市 天河区  广州市天河区奥体南路东澳创意小镇D2栋 103',index:2}
    ]
  },
  onLoad: function (options) {
    // this.setData({
    //   status: options.status
    // });
      // this.getAddressList();
  },
  onShow(){
    this.getAddressList();
  },
  //delAdrs
  delAdrs(e){
    let id=e.currentTarget.dataset.id;
    let is_default=e.currentTarget.dataset.is_default;
    if(is_default==1&&this.data.addressList.length>1){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '默认地址无法删除'
      })
      return;
    }
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=address_del',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        id:id
      },
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'删除选中的收货地址')
        if(res.data.code==1000){
          this.getAddressList(); 
        }else{
          wx.showModal({
            title: '提示',
            showCancel:false,
            content: '删除失败'
          })
         
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
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
            ele.activeAdrs=ele.is_default
          });
          this.setData({
            addressList:addressList
          })
        }else if(res.data.code==1002){
          this.setData({
            addressList:[]
          })
          console.log(res.data.msg);
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  changeAdrs: function(e) {
    let item=e.currentTarget.dataset.item;
    
    if(item.is_default==1){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '该地址已经是默认地址'
      })
      return;
    }
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=address_default',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        id:item.id
      },
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'更改默认地址')
        if(res.data.code==1000){

          //把默认地址设置到全局里面
          app.globalData.userName=item.accept_name;
          app.globalData.userPhone=item.mobile;
          app.globalData.address=`${item.province_name}${item.city_name}${item.county_name} ${item.addr}`
          console.log(app.globalData,111)
          this.getAddressList();
        }else{
          wx.showModal({
            title: '提示',
            showCancel:false,
            content: '设置失败'
          })
          
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  addAdrs:function(e){
    wx.navigateTo({
      url: `../addadrs/addadrs`
    })
  },
  editAdrs:function(e){
    let id=e.currentTarget.dataset.id;
    let is_default=e.currentTarget.dataset.is_default;
    wx.navigateTo({
      url: `../editadrs/editadrs?id=${id}&is_default=${is_default}`
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
