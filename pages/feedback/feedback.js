var app = getApp();
var softstarhttps = app.globalData.softStraHttps;

Page({
  bindFormSubmit: function (e) {
    var sessionkey = wx.getStorageSync('session_key');
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: softstarhttps + '/api/wechat/miniprogram/suggestion/submit?session_key='+ sessionkey,
      method:'Post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        openid: openid,
        content: e.detail.value.textarea
      },
      success:function(res){
        if (res.data.code == 0){
          wx.showToast({
            title: '谢谢您的反馈，我们尽早处理',
            icon:'none',
            duration: 1000
          })
        }
      }
    })
  },
})