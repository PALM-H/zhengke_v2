
Page({
  data: {
    resultList:[],
    p:1,//页码，默认第一页
    page_size:15,//每一页的数量
    totalPage:0,//总页码数
    keyword:'',
    resultListArr: [
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'},
      {url:'../../../images/shop/exp-item.jpg',price:'3589.00',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动联通电信4G全网通手机',sales:'5479'}
    ]
  },
  goDetail: function(e){  
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  goSearch(){
    this.getResultList(init);
  },
  bindinput(e){
    this.setData({
      keyword:e.detail.value
    })
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
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
