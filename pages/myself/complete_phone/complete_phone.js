const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newPhone:null, //输入的新电话
    phoneValue: '点击获取验证码',
    countCode: 60, //记录
    canCall: true,//如果是true 则可以点击验证 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
//获取新电话
  getNewPhone:function(e){
    var value = e.detail.value;
    this.setData({
      newPhone: value
    })
  },
  //获取验证码
  getCode: function (e) {
    var thisPage = this;
    var value = null;
    var countCode = parseInt(thisPage.data.countCode);
    if (thisPage.data.newPhone){
      if (thisPage.data.canCall) {
        var thisPage = this;
        wx.request({
          url: app.globalData.domainName + 'app/sendSMS',
          data: {           //请求参数      
            phone: thisPage.data.newPhone
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          success: function (res) {
            var resData = res.data;
            if (resData.code == 0) {
              app.showWarnMessage('发送成功！');
              thisPage.setData({
                canCall: false
              })
            } else {
              console.log('请求失败！');
            }

          },
          fail: function (res) {
            console.log(res + '失败！');
          }
        })
      }
      if (countCode == 0) {
        value = '重新发送验证码';
        countCode = 60;
        thisPage.setData({
          canCall: true
        })
      } else {
        value = '剩余' + countCode + 's';
        countCode--;
        setTimeout(function () {
          thisPage.getCode();
        }, 1000)
      }
      thisPage.setData({
        phoneValue: value,
        countCode: countCode
      })
    }else{
      app.showWarnMessage('请输入新的手机号后！');
      return;
    }

  },  
//点击确定
sure:function(){
  var thisPage = this;
  wx.request({
    url: app.globalData.domainName + 'app/updateSellerPhone',
    data: {           //请求参数      
      phone: thisPage.data.newPhone,
      vcode: thisPage.data.verificationCode,
      sellerId: app.globalData.userInfo.id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'POST',
    success: function (res) {
      var resData = res.data;
      if (resData.code ==0) {
        var skinUp = '/pages/myself/myself/myself';
        app.skipUpTo(skinUp, 1);
      } else {
        app.showWarnMessage('验证码错误！');
        return;
      }

    },
    fail: function (res) {
      console.log(res + '失败！');
    }
  })  
},
  //输入验证码
  importCode: function (e) {
    var code = e.detail.value;
    this.setData({
      verificationCode: code
    })
  },
})