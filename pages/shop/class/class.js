//获取应用实例
const app = getApp()

Page({
  data: {
    categoryList:null,
    subCategoryList:null,
    activeClass: 0
  },
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      activeClass: options.id
    });
    this.getCategoryList();
    
  },
  getSubCategoryList(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=category_list',
      method: "POST",
      data: {
        merchant_id: app.globalData.merchant_id,
        cid:this.data.activeClass,
        p:1,
        page_size:10000
        
      },
      success: (res)=> {
        console.log(res,'获取所有商品二级分类')
        wx.hideLoading()
        if(res.data.code==1000){
            this.setData({
              subCategoryList:res.data.cat_list.data
            })
           
        }else{
          this.setData({
            subCategoryList:[]
          })
        }
       console.log(1111111,this.data.subCategoryList)
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  //获取商品分类 一级分类
  getCategoryList(){
    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=mallapi&act=category_list',
      method: "POST",
      data: {
        merchant_id: app.globalData.merchant_id,
        p:1,
        page_size:10000
        
      },
      success: (res)=> {
        console.log(res,'获取所有商品一级分类')
        wx.hideLoading()
        if(res.data.code==1000){
            this.setData({
              categoryList:res.data.cat_list.data
            })
            
            this.getSubCategoryList();
            
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },
  changeClassList(e) {
    this.setData({
			activeClass: e.currentTarget.dataset.id
    });
    this.getSubCategoryList();
  },
  goItemListPage: function(e) {
    wx.navigateTo({
      url: `../itemlist/itemlist?id=${e.currentTarget.dataset.id}`
    })
  },
  onShareAppMessage() {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: '/pages/index/index'
    }
  }
})

  