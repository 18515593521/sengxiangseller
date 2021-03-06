//app.js
App({
  globalData: {
    userInfo: null,
    //domainName: 'http://192.168.1.11:8080/dekor/',
    //domainName: 'http://39.107.152.217:8095/dekor_test/',
    domainName: 'https://www.kaolaj.com/dekor/',
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
  //跳转  
  skipUpTo: function (skipUrl, type) {
    if (type == 1) {      //保留当前页面，跳转
      wx.navigateTo({
        url: skipUrl
      })
    } else if (type == 2) { //关闭当前页，（重定向）
      wx.redirectTo({
        url: skipUrl
      })
    } else if (type == 3) {  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      wx.switchTab({
        url: skipUrl
      })
    } else if (type == 4) {  //关闭所有的页面，跳转
      wx.reLaunch({
        url: skipUrl
      })
    } else if (type == 5) {   //关闭当前页面，返回上一页面或多级页面
      wx.reLaunch({
        url: skipUrl
      })
    }
  },
  //显示警告信息
  showWarnMessage: function (message) {
    if (message) {
      wx.showToast({
        title: message,
        icon: 'loading',
        image: "/pages/images/warn.png",
        duration: 2000,
        mask: true
      })
    }
  },
  //扫码
  scanCode: function (detail) {
    var thisPage = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res.result);
        var result = JSON.parse(res.result);

        var activityId = result.activityId;
        var customerId = result.customerId;
        console.log(activityId, customerId);
          if (activityId  && customerId) {
            var skinUp = "/pages/activity_process/activity_process?activityId=" + activityId + "&customerId=" + customerId + "&detail=" + detail;
            thisPage.skipUpTo(skinUp, 1);
          } else if (result.P1) {
            if (result.P1 == 'M') {
              var skinUp = "/pages/member/member?customerId=" + result.P2;
              thisPage.skipUpTo(skinUp, 1);
            }
          }

       


      }
    })
  },
})