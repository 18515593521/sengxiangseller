// pages/activity/activity_head_show/activity_head_show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImgNum:null,  //头像的数据
    img_show_hide:false   //头像显示与隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.setData({
        activityId: options.activityId,  //数据
      })
    this.getActivityData(options.activityId)
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //获取活动详情的信息
  getActivityData: function (activityId) {
    var thisPage = this;
    wx.request({
      url: app.globalData.domainName + 'app/selectActivityInfo',
      data: {           //请求参数      
        activity_id: activityId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        var resData = res.data;
        if (resData.code == 0) {
          thisPage.setData({
            activityData: resData.result
          })
        } else {
          console.log('活动详情接口请求失败！');
        }

      },
      fail: function (res) {
        console.log(res + '失败！');
      }
    })
  },
})