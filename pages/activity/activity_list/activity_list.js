//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    activityList: null, //活动列表信息
    activityPage: null, //当前活动
    pullNum: 1, //当前页面的
    pageSize: 4, //一页的产品
    total: 0, //总条数
    isSearchNextPage: true, //是否查询
    isCommercial: false, //扫一扫显示与隐藏
    noActivity: true,
    activityType: null, //从哪里进来的  1 是从首页 2是从个人中心
    isType: 1, //是否是往期活动
    activeArr: ['active', ''], //菜单选中样式
    menuContentHiddenArr: ['', 'true'], //菜单对应内容显示、隐藏
    isOne: true, //正在进行的活动
    isTwo: true, //历史活动
    isAuthorizePhone: false, //获取电话号码
    activity_boxsss: ['', '', 'activity_box'],
    active:null   //颜色
  },

  //列表请求活动数据(个人中心)
  getListData: function(num) {
    var thisPage = this;
    var customerId = null;
    var homes ='';
    var param = null
    if (thisPage.data.isType == '1') {
      homes = "selectHelperActivityPage";
      param = {
        user_id: app.globalData.userInfo.shop_id
        
      };
    } else if (thisPage.data.isType == '2') {
      homes = "selectHelperHistoryActivityPage";
       param = {
         shop_id: app.globalData.userInfo.shop_id
      };
      
    }
    wx.request({
      url: app.globalData.domainName + 'app/' + homes, //
      data: { //请求参数
        page: num,
        pageSize: thisPage.data.pageSize,
        ispage: true, //是否分页
        param: param
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function(res) {
        var resData = res.data;
        var resDataList = null;
        if (thisPage.data.isType == '1') {
          resDataList = resData.result.data;
        } else if (thisPage.data.isType == '2') {
          resDataList = resData.data;
        }
        var isSearchNextPage = true;
          if (resDataList.length >= 0) {
            isSearchNextPage= true;
            if (resDataList.length < thisPage.data.pageSize) {
            isSearchNextPage = false;
            }
            if (num > 1) {
                resDataList = thisPage.data.activityList.concat(resDataList);
            }
            
            thisPage.setData({
              'activityList': resDataList, //总数据
              'pullNum': num,
              'isSearchNextPage': isSearchNextPage, //是否允许下拉
            })
            
          }
      },
      fail: function(res) {
        console.log(res + '失败！');
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //菜单选择
  chooseMenu: function(e) {
    var activeArr_copy = [];
    var menuContentHiddenArr_copy = [];
    var index = e.currentTarget.dataset.value;
    var thisPage = this;

    for (var i = 0; i < thisPage.data.activeArr.length; i++) {
      if (i == index) { //选中
        activeArr_copy.push('active');
        menuContentHiddenArr_copy.push('');
        thisPage.setData({
          isType: parseInt(i) + 1,
          pullNum : 1
        })
      } else {
        activeArr_copy.push('');
        menuContentHiddenArr_copy.push('true');
      }
    }

    thisPage.setData({
      activeArr: activeArr_copy,
      menuContentHiddenArr: menuContentHiddenArr_copy
    })
    thisPage.getListData(1);
  },
  //点击页面跳转
  skipUpTo: function(e) {
    var skipUpContent = e.currentTarget.dataset;
    var activityInfo = skipUpContent.item;
    var activityType = skipUpContent.activitytype; //活动类型 1精彩活动  2图文活动
    var thisPage = this;
    var activityId=null;
    if (thisPage.data.isType == 1){
      activityId = activityInfo.id
    } else if (thisPage.data.isType == 2){
      activityId = activityInfo.activity_id
    }
    var url = "/pages/activity/activity_head_show/activity_head_show?activityId=" + activityId 
      app.skipUpTo(url, 1);
  },
  //下拉拉加载
  onReachBottom: function() {
    var thisPage = this;
    if (thisPage.data.isSearchNextPage) {
      var pullNum = thisPage.data.pullNum + 1;
      this.getListData(pullNum);
    } else {
      app.showWarnMessage('没有更多数据了！');
    }
  },
  //上拉刷新
  onPullDownRefresh: function() {
    // app.showWarnMessage("刷新中！");
    this.getListData(1);
    wx.stopPullDownRefresh(); //页面自己回去！！
  },
  onLoad: function(options) {
    var thisPage = this;
    if (options.activity == 2) {
      var mername = '我的活动';
    } else {
      var mername = '活动列表';
    }
    wx.setNavigationBarTitle({
      title: mername //页面标题为路由参数
    })
   
    // this.getListData(1);
  },

  /*生命周期函数--监听页面显示*/
  onShow: function() {
    this.getListData(1);
  },

  //页面分享
  onShareAppMessage: function() {
    var param = "P1=G&P4=" + app.globalData.customerInfo.id;

    return {
      title: '活动内容',
      path: "/pages/index/index?" + param,
      success: function(res) {
        app.addPageSharePoint("活动内容");
      }
    };

  },
  //授权手机号
  authorizePhone: function(e) {
    app.authorizePhone(e);
  },


})