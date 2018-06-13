//获取应用实例
const app = getApp()

Page({
    data:{
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
    onload:function(options){
      wx.hideShareMenu()
    },
    backPage(){
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1];   //当前页面
      let prevPage = pages[pages.length - 2];  //上一个页面
      
      prevPage.setData({
        aaa: 3234324
      })
      wx.navigateBack();
    },
    onShareAppMessage: function () {
        return {
          title: app.globalData.store_name,
          imageUrl: app.globalData.logo_path,
          path: '/pages/index/index'
        }
      }
})