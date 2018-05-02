
Page({
  data: {
    isSelectAll: false,
    total: 0,
    itemListArr: [
      {url:'../../../images/mine/itemexp1.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',ver:'标准  黑色  4+46G',price:'3589.00',num:1,isselect:'0'},
      {url:'../../../images/mine/itemexp2.jpg',name:'联想梦想系列、游戏之王台式机，可自行升级CPU、内存、显卡等硬件配置',ver:'版本：游戏之王  16+1T+225 SSD',price:'8589.00',num:3,isselect:'0'},
      {url:'../../../images/mine/itemexp1.jpg',name:'小米 红米手机5A 全网通 3+64G 全金属机身 移动、联通、电信4G全网通手机',ver:'标准  黑色  4+46G',price:'3589.00',num:1,isselect:'0'}
    ]
  },
  goConfirm: function() {
    wx.navigateTo({
      url: '../confirm/confirm'
    })
  },
  //单选
  selectThis: function(e) {
    var index = e.currentTarget.dataset.index;
    var changeData = "itemListArr["+index+"].isselect";
    var originalNum = this.data.itemListArr[index].isselect;
    this.setData({
      [changeData]: originalNum=='0'? '1':'0',
      isSelectAll: false
    });
    this.calTotle()
  },
  //数量输入框离开焦点
  bindKeyInput: function(e) {
    var index = e.currentTarget.dataset.index;
    var changeData = "itemListArr["+index+"].num";
    if(e.detail.value>0 && e.detail.value!=""){
      this.setData({
        [changeData]: e.detail.value
      });
    }else{
      this.setData({
        [changeData]: 1
      });
    }
    this.calTotle()
  },
  //减少数量
  reduceNum: function(e) {
    var index = e.currentTarget.dataset.index;
    if(this.data.itemListArr[index].num>1){
      var changeData = "itemListArr["+index+"].num";
      var originalNum = parseInt(this.data.itemListArr[index].num);
      this.setData({
        [changeData]: originalNum-1
      });
    }
    this.calTotle()
  },
  //增加数量
  addNum: function(e) {
    var index = e.currentTarget.dataset.index;
    var changeData = "itemListArr["+index+"].num";
    var originalNum = parseInt(this.data.itemListArr[index].num);
    this.setData({
      [changeData]: originalNum+1
    });
    this.calTotle()
  },
  //全选/反选
  selectAll: function(e) {
    var that = this;
    var len = this.data.itemListArr.length;
    var changeObj = {
      "isSelectAll": !this.data.isSelectAll
    }
    for(var i = 0; i < len; i++) {
      var changeData = "itemListArr["+i+"].isselect";
      changeObj[changeData]=that.data.isSelectAll==true? '0':'1';
    }
    this.setData(changeObj)
    this.calTotle()
  },
  //计算总价
  calTotle: function(e) {
    var totle = 0;
    var that = this;
    var len = this.data.itemListArr.length;
    for(var i = 0; i < len; i++) {
      var item = that.data.itemListArr[i];
      if(item.isselect=='1'){
        totle += parseFloat(item.price) * parseInt(item.num) 
      }
    }
    this.setData({
      "total": totle
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
