//获取应用实例
const app = getApp()

Page({
  data: {
    cid:'',//二级分类分类id

    goodsList:[],
    p:1,//页码，默认第一页
    page_size:15,//每一页的数量
    totalPage:0,//总页码数
    activeNav: 0,
    filterHide: true 
    
    
  },
  onLoad: function (options) {
    this.setData({
      cid:this.options.id
    })
    this.getGoodsList(true);
  },
 
  //获取商品列表
  //用的是搜索商品接口
  getGoodsList(init) {
    //init 表示p从第一页开始
    if(init){
      this.setData({
        p:1,
        totalPage:0,
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
    }
    let sort=0;
    if(this.data.activeNav==0){
      sort=0;
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
        wx.hideLoading();
        if(res.data.code==1000){
         if(this.data.goodsList.length>0){
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
  goSearchPage: function(e){  
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
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})

  