//获取应用实例
const app = getApp()

Page({
  data: {
    gid:'',
    selectSpecStr:'',
    name:'',
    img:'',
    sell_price:'',

    remarkList:[],
  },
  onLoad(options){
    wx.hideShareMenu()
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];  //上一个页面

    this.setData({
      gid:prevPage.data.gid,
      selectSpecStr:prevPage.data.selectSpecStr,
      name:prevPage.data.goodsInfo.name,
      img:prevPage.data.goodsInfo.img,
      sell_price:prevPage.data.goodsInfo.sell_price,
    })

    //获取所有商品评价内容
    this.getGoodsEvaluateInfo();
  },
  goCartPage: function(e){  
    wx.navigateTo({
      url: '../cart/cart'
    })
  },
  
    //获取所有商品评价内容
    getGoodsEvaluateInfo(){
      wx.showLoading({
        title:'加载中...',
        mask: true,
      })
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: `${app.globalData.apiUrl}con=mallapi&act=goods_evaluate_info`,
        method: "POST",
        data:{
            gid:this.data.gid,
            uid:app.globalData.uid
        },
        success: (res)=> {
          if(res.data.code==1000){
            console.log(res,'获取商品评价内容');
            this.setData({
              remarkList:res.data.evaluate_list
            })
                          
              wx.hideLoading()
          }
         
        },
        fail: (err)=>{
          console.log(err);
        }
      })
    },

  onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})

  