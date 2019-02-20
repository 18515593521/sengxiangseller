// pages/share/share/share.js
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: null,
    options: null,  //传过来的数据
    appId: null,
    positionInfo: null,  //定位信息
    type: null,
    value: null,
    customerInfoId: null,  //用户id
    filialeId: null,  //厂家id
    skinpUrl: null,  //跳转的地址
    shopId:null,  //店铺id
    isOpen:null,  //价格是不是显示
    payState:null,  //是否可以購買
    nick_name:null,   //名字
    clickNum:0 ,  //第几次点击
    gifts:false,  //等待的菊花
    positionInfo2:null,  //定位信息
    location:null,
    address:null,
    regionCode:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisPage = this;
    var type = null;//导购邀请 1  消费者邀请是2
    var value = null;
   
    thisPage.setData({
      options: options,
      type: type,
      value: value
    })
    
  },


  //跳转
  goTo: function () {
    var thisPage = this;
    var skinpUrl = null;
    var options = thisPage.data.options;

    skinpUrl = '/pages/activity/activity_details/activity_details?activityId=' + options.activity_id;
    
    wx.navigateToMiniProgram({
      appId: 'wx6fee74be826bb6fc',
      path: skinpUrl ,
      envVersion: 'trial',//trial体验  release 正式
      success(res) {
        thisPage.setData({
          clickNum:1  
        })
      },
      fail: function (res) {

        console.log(JSON.stringify(res) + '失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})