//获取应用实例
const app = getApp();

Page({
  data: {
    cartList: [],
    isSelectAll: false,
    total: 0
    
  },
  onLoad(options) {
   
  },
  onShow(){
    this.getShoppingCartGoods();
  },
  removeCart(id) {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl + "con=mallapi&act=cart_del",
      method: "POST",
      data: {
        user_id: app.globalData.uid,user_id: app.globalData.uid,
        id: id
      },
      success: res => {
        wx.hideLoading();
        console.log(res, "移除购物车");
        if (res.data.code == 1000) {
          wx.showToast({
            title: res.data.msg,
            icon: "success",
            duration: 2000
          });
          this.getShoppingCartGoods();
        } else {
          wx.showToast({
            title: "移除失败",
            icon: "none",
            image: "/images/error.png",
            duration: 2000
          });
        }
      },
      fail: err => {
        console.log(err);
      }
    });
  },

  //获取购物车的商品
  getShoppingCartGoods() {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: `${app.globalData.apiUrl}con=mallapi&act=cart_list`,
      method: "POST",
      data:{
        user_id:app.globalData.uid
      },
      success: res => {
        wx.hideLoading();
       if(res.data.code==1000){
        let cart_list = res.data.cart_list;
        cart_list.forEach(ele => {
          ele.isSelect = 0;//给每个商品加一个是否选中状态
        });
        this.setData({
          cartList: cart_list
        });
        console.log(this.data.cartList, '获取购物车商品');
       }else{
         console.log('获取失败');
       }
        
      },
      fail: err => {
        this.setData({
          cartList: []
        });
        console.log(err);
      }
    });
  },
  //去确认订单页面
  goConfirmPage: function() {
    let isSelect=this.data.cartList.some((ele)=>{
      return ele.isSelect==1;
    })
    if(isSelect){
      wx.navigateTo({
        url: "../confirm/confirm"
      });
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请先选择商品'
      
      })
    }
    
  },
  //单选
  selectThis: function(e) {
    let index = e.currentTarget.dataset.index;
    let changeData = "cartList[" + index + "].isSelect";
    let curSelect = this.data.cartList[index].isSelect;
    this.setData({
      [changeData]: curSelect === 0 ? 1 : 0
    });

    
    let isSelectAll;
    this.data.cartList.some(ele => {
      if (ele.isSelect === 0) {
        isSelectAll = false;
        return true;
      } else {
        isSelectAll = true;
      }
    });
    this.setData({
      isSelectAll: isSelectAll
    });

    this.calTotal();
  },
  //数量输入框离开焦点
  bindKeyInput: function(e) {
    var index = e.currentTarget.dataset.index;
    var changeData = "cartList[" + index + "].pro_num";
    if (e.detail.value > 0 && e.detail.value != "") {
      this.setData({
        [changeData]: e.detail.value
      });
    } else {
      this.setData({
        [changeData]: 1
      });
    }
    this.calTotal();
  },
  //减少数量
  reduceNum: function(e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.cartList[index].pro_num > 1) {
      var changeData = "cartList[" + index + "].pro_num";
      var originalNum = parseInt(this.data.cartList[index].pro_num);
      this.setData({
        [changeData]: originalNum - 1
      });
    }
    this.calTotal();
  },
  //增加数量
  addNum: function(e) {
    let index = e.currentTarget.dataset.index;
    let changeData = "cartList[" + index + "].pro_num";
    let originalNum = parseInt(this.data.cartList[index].pro_num);
    this.setData({
      [changeData]: originalNum + 1
    });
    this.calTotal();
  },
  //移除购物车
  handleRemoveCart() {
    let cartList = this.data.cartList;
    cartList.forEach(ele => {
      if (ele.isSelect === 1) {
        this.removeCart(ele.id);
      }
    });
  },
  //全选/反选
  handleSelectAll: function(e) {
    let cartList = this.data.cartList;
    if (this.data.isSelectAll === false) {
      cartList.forEach(ele => {
        ele.isSelect = 1;
      });
    } else {
      cartList.forEach(ele => {
        ele.isSelect = 0;
      });
    }
    this.setData({
      cartList: cartList,
      isSelectAll: !this.data.isSelectAll
    });
   
    this.calTotal();
  },
  //计算总价
  calTotal(e) {
    let cartList = this.data.cartList;
    let total = 0;
    cartList.forEach(ele => {
      if (ele.isSelect === 1) {
        total += parseFloat(ele.sell_price) * parseInt(ele.pro_num);
      }
    });
    this.setData({
      total: total
    });
  },

  onShareAppMessage() {
    return {
      title: app.globalData.store_name,
      imageUrl: app.globalData.logo_path,
      path: "/pages/index/index"
    };
  }
});
