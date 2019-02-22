// pages/work/index/work.js
const app = getApp()
Page({

  /* 页面的初始数据*/
  data: {
    page: 1,//当前页
    pageSize: 6, //一页展示几个
    total: 0,  //总页数
    isTureFalsePage: true,  // 是否分页
    taskListData:[],  //销售任务列表
    activityListData:[],//活动任务列表
    taskList:true,  //导购下显示
    adminList: true, //昨日概况（后台账号显示）
    _name:null,  //客户姓名
    _phone:null, //客户电话
    _popUp:true,  //客户宝贝弹框的显示与隐藏
    todayDatas:null, //今日数据
    typeModels:null,  //当前的权限
    isCommercial:false,  //扫一扫显示与隐藏
    product_center_guide:'/pages/work/product_center/product_list/product_list',  //导购状态下产品中心进入
    product_center_admin: '/pages/work/product_center/shop_list/shop_list',  //后台状态下产品中心进入
    paramObj:null,  //转发带的参数
    icon_all_data:[   //icon的展示
      {
        url: 'repository.png',
        title: '知识库',
        go_to_url: '/pages/work/knowledge/new_list/new_list',
        indexPage: '1',
        types: 'new',
      }, 
      {
        url: 'client.jpg',
        title: '客户管理',
        go_to_url: '/pages/work/customer_manager/user_file/user_file?types=1',
        indexPage: '1',
        types: 'product',
      },
      {
        url: 'daily.jpg',
        title: '活动管理',
        go_to_url: '/pages/activity/activity_list/activity_list',
        indexPage: '1',
        types: 'product',
      },
      {
        url: 'integral.jpg',
        title: '积分管理',
        go_to_url: '/pages/work/integral_manager/my_integral_detail/my_integral_detail',
        indexPage: '1',
        types: 'code',
      },
      
                         
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisPage = this;
    
    thisPage.getTodayData(); //获取今日数据

  },
  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {
    var thisPage = this;
    thisPage.getTodayData(); //获取今日数据
    wx.stopPullDownRefresh();  //页面自己回去！！
  },
  //弹框
  user_phone_pop: function () {
    var thisPage = this;
    thisPage.setData({
      _popUp: false   //数据
    })
  },
  //输入客户姓名
  user_infos: function (e) {
    var current = e.currentTarget;
    var key = current.dataset.param;
    var value = e.detail.value;
    var obj = {};
    obj[key] = value;
    this.setData(obj);
  },

  //取消客户报备
  cancel_operation: function () {
    var thisPage = this;
    thisPage.setData({
      _popUp: true,  //数据
      _name: null,
      _phone: null
    })
  },
  //确定客户报备
  sure_operation: function () {
    var thisPage = this;
    if (!thisPage.data._name) {
      app.showWarnMessage("请输入客户姓名！");  //失败
      return;
    }
    if (!thisPage.data._phone) {
      app.showWarnMessage("请输入联系方式！");  //失败
      return;
    }

    wx.request({
      url: app.globalData.domainName + 'app/related/addCustomerReport',
      data: {           //请求参数 
        usermanager_id: app.globalData.userInfo.id, //用户id
        customer_name: thisPage.data._name,  //用户姓名
        phone: thisPage.data._phone//电话
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        var resData = res.data;
        console.log(resData.code + '返回来的参数');
        console.log(resData.message + '返回来的值');
        if (resData.code == 0) {

          app.showSuccessMessage(resData.message);  //成功
          thisPage.setData({
            _popUp: true,   //数据
            _name: null,
            _phone: null
          })

        } else if (resData.code == 1) {
          console.log('请求失败！！');
          app.showWarnMessage("提交失败！");  //失败
        } else {
          app.showWarnMessage(resData.message);  //失败
        }
      },
      fail: function (res) {
        app.showWarnMessage("提交失败！");  //失败
      }
    })
  },
  //获取今日数据
  getTodayData: function () {
    var thisPage = this;
    wx.request({
      url: app.globalData.domainName + 'app/selectStatistics',
      data: {           //请求参数      
        sellerId: app.globalData.userInfo.id  //用户id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        var resData = res.data;
        console.log(resData + "获取今日数据");
        if (resData.code == 0) {
          thisPage.setData({
            todayDatas: resData.result   //数据
          })

        } else if (resData.code == 1) {
          console.log("获取今日数据失败");
        }
      },
      fail: function (res) {
        console.log(res + '失败！');
      }
    })
  },
  //点击icon 跳转
  skipUpTo: function (e) {
    var thisPage = this;
    var skipUpContent = e.currentTarget.dataset;
    var skipUrl = skipUpContent.url;   //路径
    var skipType = skipUpContent.type;  //类型
    var types = skipUpContent.types;  //类型
    console.log(skipUrl)
    app.skipUpTo(skipUrl, skipType);
  
  },
  //扫码
  scanCode: function (e) {

    app.scanCode('work');
  },
})