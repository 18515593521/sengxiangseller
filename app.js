//app.js
App({
  globalData: {
    userInfo: null,
    domainName : 'http://localhost:8080/dekor/',
  },
  //显示成功信息
  showSuccessMessage: function (message) {
    if (message) {
      wx.showToast({
        title: message,
        icon: 'success',
        duration: 2000,
        mask: true
      })
    }
  },
})