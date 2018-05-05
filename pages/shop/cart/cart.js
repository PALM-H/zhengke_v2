//获取应用实例
const app = getApp();

Page({
  data: {
    cartList: [],
    isSelectAll: false,
    total: 0,
    itemListArr: [
      {
        url: "../../../images/mine/itemexp1.jpg",
        name:
          "小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机",
        ver: "标准  黑色  4+46G",
        price: "3589.00",
        num: 1,
        isselect: "0"
      },
      {
        url: "../../../images/mine/itemexp2.jpg",
        name:
          "联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置",
        ver: "版本：游戏之王  16+1T+225 SSD",
        price: "8589.00",
        num: 3,
        isselect: "0"
      },
      {
        url: "../../../images/mine/itemexp1.jpg",
        name:
          "小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机",
        ver: "标准  黑色  4+46G",
        price: "3589.00",
        num: 1,
        isselect: "0"
      }
    ]
  },
  onLoad(options) {
    this.seeShoppingCart();
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
        user_id: app.globalData.uid,
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
          this.seeShoppingCart();
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
  seeShoppingCart() {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    wx.request({
      url: `${app.globalData.apiUrl}con=mallapi&act=cart_list&user_id=${
        app.globalData.uid
      }`,
      method: "GET",
      success: res => {
        let cart_list = res.data.cart_list;
        cart_list.forEach(ele => {
          ele.isSelect = 0;
          ele.price = 666;
        });
        this.setData({
          cartList: cart_list
        });
        console.log(this.data.cartList, 2312321312);
        wx.hideLoading();
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  goConfirm: function() {
    wx.navigateTo({
      url: "../confirm/confirm"
    });
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
        total += parseFloat(ele.price) * parseInt(ele.pro_num);
      }
    });
    this.setData({
      total: total
    });
  },

  onShareAppMessage() {
    return {
      title: "挣客3C行业平台服务商",
      imageUrl: "/images/share.jpg",
      path: "/pages/index/index"
    };
  }
});
