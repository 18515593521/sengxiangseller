// pages/work/index/work.js
const app = getApp()
var urls = app.globalData.domainName;        //请求域名
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
        url: 'client.jpg',
        title: '活动管理',
        go_to_url: '/pages/work/customer_manager/user_file/user_file?types=1',
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
  
  
 
})