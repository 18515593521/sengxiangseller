// pages/myself/myself/myself.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySeleftData: null , //登陆的数据
    phone:null, //电话
    isCommercial: true   // 扫一扫的显示与隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phones = app.globalData.userInfo.phone;
    var phone = phones.substr(0, 3) + '****' + phones.substr(7);
    this.setData({
      mySeleftData: app.globalData.userInfo,
      phone: phone
    }) 
    
  },
//跳转
  skinUp:function(e){
  var current = e.currentTarget.dataset;
  var urls = current.url;
  app.skipUpTo(urls,1);
  },
  //扫码
  scanCode: function (e) {
    app.scanCode('mySelf');
  },
  //退出
  exit:function(e){
    wx.clearStorage();
    var skipUp = "/pages/login/login";
    app.skipUpTo(skipUp,4);
  },
})