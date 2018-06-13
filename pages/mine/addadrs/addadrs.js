//获取应用实例
const app = getApp()

let area = require('../../../data/area');
let p = 0, c = 0, d = 0;
Page({
  data:{
    init:true,//省区选择一开始没有数据
    province:[],
    provinceSelIndex: 0,
    city:[],
    citySelIndex: 0,
    district:[],
    districtSelIndex: 0,
    is_default:0,//是否选中
    isFirstAdrs:false,//是否用户第一个地址
    isHasDefaultAdrs:false,//是否有默认地址,有的话隐藏设置默认地址选项
    showMessage: false,
    messageContent: '',
    showDistpicker: false
  },
  onLoad:function(options){
    wx.hideShareMenu()
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];  //上一个页面
    if(!prevPage.data.addressList.length){
    this.setData({
      isFirstAdrs:true
    }) 
    }else{
      prevPage.data.addressList.some(ele=>{
        if(ele.is_default==1){
          this.setData({
            isHasDefaultAdrs:true
          })
            return true;
        }
      })
    }
    


    // 初始化数据
    this.setAreaData()
  },
  setAreaData: function(sel={}){
    
    sel.p = sel.p || 0 // provinceSelIndex
    sel.c = sel.c || 0 // citySelIndex
    sel.d = sel.d || 0 // districtSelIndex
    // 设置省的数据
    let province = []
    area.forEach((ele,i)=>{
      if(ele.parent_id==0){
        province.push(ele);
      }
    })
    this.setData({
      province:province
    })
    
   
    // 设置市的数据
    let pid=province[sel.p].id;
    let city=[]
    area.forEach((ele,i)=>{
      if(ele.parent_id==pid){
        city.push(ele);
      }
    })
    this.setData({
      city:city
    })

    // 设置区的数据
    let cid=city[sel.c].id;
    let district=[];
    area.forEach((ele,i)=>{
      if(ele.parent_id==cid){
        district.push(ele);
      }
    })
    this.setData({
      district:district
    })

    this.setData({
      provinceSelIndex:sel.p,
      citySelIndex:sel.c,
      districtSelIndex:sel.d
    })
    console.log(province[this.data.provinceSelIndex].name,111);
  },
  changeArea: function(e) {
    p = e.detail.value[0]
    c = e.detail.value[1]
    d = e.detail.value[2]
    this.setAreaData({p:p,c:c,d:d})
    console.log(e.detail.value);
  },
  showDistpicker: function() {
    this.setData({
      init:false
    })
    this.setData({
      showDistpicker: true
    })
  },
  distpickerCancel: function() {
    this.setData({
      showDistpicker: false
    })
  },
  distpickerSure: function() {
    this.setData({
      provinceSelIndex: p,
      citySelIndex: c,
      districtSelIndex: d
    })
    this.distpickerCancel()
  },

  bindswitchchange(e){
    if(e.detail.value){
      this.setData({
        is_default:1
      })
    }else{
      this.setData({
        is_default:0
      })
    }
    console.log(e.detail.value);
  },
  savePersonInfo: function(e) {
    console.log(this.data.province[this.data.provinceSelIndex].id);
    console.log(e.detail.value);
    var data = e.detail.value
    var telRule = /^1[3|4|5|7|8]\d{9}$/, nameRule = /^[\u2E80-\u9FFF]+$/
    if (data.name == '') {
      this.showMessage('请输入姓名')
      return;
    } else if (! nameRule.test(data.name)) {
      this.showMessage('请输入中文名')
      return;
    } else if (data.tel == '') {
      this.showMessage('请输入手机号码')
      return;
    } else if (! telRule.test(data.tel)) {
      this.showMessage('手机号码格式不正确')
      return;
    } else if (this.data.init) {
      this.showMessage('请选择所在地区')
      return;
    } else if (data.address == '') {
      this.showMessage('请输入详细地址')
      return;
    }

    if(this.data.isFirstAdrs){
      if(!this.data.is_default){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '你的第一个地址必须设置为默认地址'
        })
        return;
      }
    }

    // if(this.data.is_default==1){
    //   app.globalData.userName=data.name;
    //   app.globalData.userPhone=data.tel;
    //   app.globalData.address=`${this.data.province[this.data.provinceSelIndex].name}${this.data.city[this.data.citySelIndex].name}${this.data.district[this.data.districtSelIndex].name} ${data.address}`;
    //   app.globalData.addressid=data.id;
    //   console.log(app.globalData,'globalData');
    // }
    
      

    wx.showLoading({
      title:'加载中...',
      mask: true,
    })
    
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.apiUrl+'con=zkapi&act=address_add',
      method: "POST",
      data: {
        user_id: app.globalData.uid,
        accept_name:data.name,
        mobile:data.tel,
        province_id:this.data.province[this.data.provinceSelIndex].id,
        city_id:this.data.city[this.data.citySelIndex].id,
        county_id:this.data.district[this.data.districtSelIndex].id,
        addr:data.address,
        is_default:this.data.is_default
      },
      success: (res)=> {
        wx.hideLoading()
        console.log(res,'添加收货地址')
        if(res.data.code==1000){
          wx.navigateBack();
        }else if(res.data.code==1002){
          wx.showToast({
            title: "添加失败",
            icon: "none",
            image: "/images/error.png",
            duration: 2000
          });
        }
       
      },
      fail: (err)=>{
        console.log(err);
      }
    })



  },
  showMessage: function(text) {
    var that = this
    that.setData({
      showMessage: true,
      messageContent: text
    })
    setTimeout(function(){
      that.setData({
        showMessage: false,
        messageContent: ''
      })
    }, 3000)
  }
})