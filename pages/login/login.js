// pages/login/login.js
var app = getApp();   //获取应用实例
Page({
  data: {
    '_name': '',   //账号
    '_password': '',   //密码
    '_bmh':'',
    '_zzh':'',
    'tipsInfo_Message': {
      tipsInfo: null,    //提示信息
      gifts: true  //等待的菊花效果
    },
    showMes: true,
    binding : 0
  },

  onLoad: function (options) {
    var thisPage = this;
   
    var userInfo = wx.getStorageSync('userInfo');

    thisPage.setData({
      gifts: true  //等待的菊花效果
    })
    if (userInfo) {
      app.globalData.userInfo = userInfo;
      console.log(1111111111)
      console.log(userInfo)
      thisPage.setData({
        '_name': userInfo.user_name,   //账号
        '_password': userInfo.user_pwd,   //密码
        '_zzh': userInfo.zzh,   //组织号
        '_bmh': userInfo.bmh,   //部门号
      })
      thisPage.loginToUp();
    }
  },

  onReady: function () {

  },
  //账号以及密码
  accent_input: function (e) {
    var current = e.currentTarget;
    var key = current.dataset.param;
    var value = e.detail.value;
    var obj = {};
    obj[key] = value;
    this.setData(obj);
  },
  //点击登录
  loginToUp: function (e) {
    var thisPage = this;
    var objectData = {};
    wx.login({  //微信登录
      success: function (result) {
        // console.log("【微信登录信息】：", result);
        if (result.code) {
          objectData.js_code = result.code;
          objectData.user_name = thisPage.data._name;
          objectData.user_pwd = thisPage.data._password;
          objectData.zzh = thisPage.data._zzh;
          objectData.bmh = thisPage.data._bmh;

          // objectData.zzh ='028041';
          // objectData.bmh = 'SCDD01';
          // objectData.user_name = '13882011576';
          // objectData.user_pwd = '123456';

          if (objectData.user_name && objectData.user_pwd && objectData.zzh && objectData.bmh) {
            
            wx.request({
              url: app.globalData.domainName + 'app/sellerLogin',
              data: objectData,
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'POST',
              success: function (res) {

                var resData = res.data;
                if (resData.code == 0) {
                
                  wx.setStorageSync('userInfo', resData.result);
                  
                  app.globalData.userInfo = resData.result;  //用户信息
                  
                  app.showSuccessMessage(resData.message);  //成功

                  wx.switchTab({              //跳转
                    url: '../work/index/work',
                    success: function (res) {
                      console.log(res);
                    },
                    fail: function (res) {
                      console.log(res);
                    }
                  })
                } else if (resData.code == 2){
                  thisPage.showSubmitBtn()
                } else if (resData.code == 1) {
                  app.showWarnMessage(resData.message);  //失败
                } else if (resData.code == 3) {
                  app.showWarnMessage(resData.message);  //失败
                }

              },
              fail: function (res) {
                console.log(res + '失败！');
              }
            })
          } else {
            app.showWarnMessage('请输入完整的信息！');  //失败
          }

        } else {
          console.log('获取用户登录态失败！' + result.errMsg);
        };
      }
    });



  },

  //获取Logo图片
  getLogoImage: function () {
    var thisPage = this;

    wx.request({
      url: app.globalData.domainName + '/app/selectNode3Image',  //接口地址
      data: {
        node3: app.globalData.user_Info.factoryId
      },
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {  //成功
        var returnData = res.data;

        if (returnData.code == 0 && returnData.result) { //成功
          app.globalData.logoImage = returnData.result;  //赋值 店铺id

        } else {  //失败
          console.log("【获取Logo图片】fail！");
        }
      },
      fail: function (res) {     //失败
        console.log('请求失败：', res.errMsg);
      },
      complete: function (res) { //完成
        console.log('请求完成：', res.errMsg);
      }
    })
  },
  //转发
  onShareAppMessage: function (res) {
    return {
      title: '魔方云助手',
      path: '/pages/login/login',
      imageUrl: '/pages/images/bg.jpg',
      success: function (res) {
        app.addPageSharePoint('登录分享');
        // 转发成功
      },
      fail: function (res) {

        // 转发失败
      }
    }
  },
  showSubmitBtn : function(){
    var thisPage = this;
    wx.showModal({

      title: '',

      content: '点击确认即可绑定当前小程序',

      success: function (res) {

        if (res.confirm) {

          thisPage.setData({
            binding : 1
          })
          thisPage.loginToUp()
          

        } else {//这里是点击了取消以后

          console.log('用户点击取消')

        }

      }

    })


  }

})

