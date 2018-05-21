//获取应用实例
const app = getApp()

Page({
  data: {
    cid:'',
    aaa:'',
    goodsList:[],
    p:1,
    page_size:1,
    totalPage:0,
    activeNav: 0,
    filterHide: true 
    
    
  },
  onLoad: function (options) {
    this.setData({
      cid:this.options.id
    })
    this.getGoodsList(true);
  },
  onShow:function(){
      console.log(this.data.aaa,667);
  },
  //获取商品列表
  //用的是搜索商品接口
  getGoodsList(init) {
    //init 表示p从第一页开始
    if(init){
      this.setData({
        p:1,
        goodsList:[]
      })
    }else{
      if(this.data.p>=this.data.totalPage){
        console.log('已经到总页面数');
        return;
      }
      this.setData({
        p:this.data.p+1
      })
      console.log(this.data.p,2323232);
    }
    let sort=0;
    if(this.data.activeNav==0){

    }else if(this.data.activeNav==1){
      sort=1;//以销售量降序排列
     
    }else if(this.data.activeNav==2){
      sort=4;//以销售价格正序排列
    }
    let params={
      merchant_id: app.globalData.merchant_id,
      keyword:'',
      p:this.data.p,
      page_size:this.data.page_size
    }
    if(sort){
      params.sort=sort;
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
        if(res.data.code==1000){
         if(this.data.goodsList.length){
          this.setData({
            goodsList:this.data.goodsList.concat(res.data.goods_list.data)
          })
         }else{
          this.setData({
            goodsList:res.data.goods_list.data
          })
         }
         this.setData({
          totalPage:res.data.goods_list.page.totalPage
         })
         
        }
        console.log(res,777);
        console.log(this.data.goodsList,'获取商品列表');
        wx.hideLoading();
      },
      fail: err => {
        console.log(err);
      }
    });
  },

  scrollToLower:function(){
    this.getGoodsList();
  },

  changeNav: function(e) {
    this.setData({
			activeNav: e.currentTarget.dataset.num
    });
    this.getGoodsList(true);
  },
  goSearch: function(e){  
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //跳转到筛选
  goToFilterPage: function(e){  
    wx.navigateTo({
      url: '../filter/filter'
    })
  },

  goDetailPage: function(e){  
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id
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

  