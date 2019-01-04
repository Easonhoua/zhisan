var app = getApp();
var softstarhttps = app.globalData.softStraHttps;
var sessionkey = wx.getStorageSync('session_key')
var openid = wx.getStorageSync('openid')
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:'',
    hasUserInfo: false
  },
  onLoad: function () {
    // 查看是否授权
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang:'zh_CH',
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  loadtips:function(){
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 1000,
    })
  },
  gomeibaiBar(){
    wx.navigateTo({
      url: '../meibaizhishu/meibaizhishu'
    })
  },
  gofeedback(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  layout(){
    wx.showToast({
      title: '暂不能退出',
      icon: 'none',
      duration: 1000,
    })
  },
  jifenchaxun(){
    wx.showToast({
      title: '暂无积分',
      icon: 'none',
      duration: 1000,
    })
  },
  myxiaoxi(){
    wx.navigateTo({
      url: '../mynews/mynews',
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.request({
      url: softstarhttps + '/api/wechat/miniprogram/user/save?session_key=' + sessionkey,
      method:'post',
      data:{
        openid: openid,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        gender: e.detail.userInfo.gender,
        country: e.detail.userInfo.country,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city
      },
      success:function(res){
        console.log(res)
      },
    })
  }
})
