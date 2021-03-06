//获取应用实例
const app = getApp()

Page({
  data: {
    autofocus:false,
    resultList:null,
    p:1,//页码，默认第一页
    page_size:15,//每一页的数量
    totalPage:0,//总页码数
    keyword:''
   
  },
  onLoad(){
    wx.hideShareMenu()
    console.log(!this.data.resultList,11111);
    this.setData({
      autofocus:true
    })
  },
  goDetail: function(e){  
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  goSearch(){
    
    this.getResultList(true);
  },
  bindinput(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  scrollToLower(){
    this.getResultList();
  },
    //获取搜索列表
  getResultList(init) {
    //init 表示p从第一页开始
    if(init){
      this.setData({
        p:1,
        totalPage:0,
        resultList:[]
      })
    }else{
      if(this.data.p>=this.data.totalPage){
        console.log('已经到总页面数');
        return;
      }
      this.setData({
        p:this.data.p+1
      })
    }
    
    let params={
      merchant_id: app.globalData.merchant_id,
      keyword:this.data.keyword,
      sort:0,
      p:this.data.p,
      page_size:this.data.page_size
    }
   
    
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url:`${app.globalData.apiUrl}con=mallapi&act=search`,
      method: "POST",
      data: params,
      success: res => {
        wx.hideLoading();
        if(res.data.code==1000){
         if(this.data.resultList.length>0){
          this.setData({
            resultList:this.data.resultList.concat(res.data.goods_list.data)
          })
         }else{
          this.setData({
            resultList:res.data.goods_list.data
          })
         }
         this.setData({
          totalPage:res.data.goods_list.page.totalPage
         })
        }
        console.log(res,777);
        console.log(this.data.resultList,'获取商品列表');
        
      },
      fail: err => {
        console.log(err);
      }
    });
  },

  onShareAppMessage: function () {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})
