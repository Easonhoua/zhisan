var app = getApp();
var softstarhttps = app.globalData.softStraHttps;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mynewslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sessionkey = wx.getStorageSync('session_key');
    var openid = wx.getStorageSync('openid');
    var that = this;
    wx.request({
      url: softstarhttps + '/api/wechat/miniprogram//message/list?session_key=' + sessionkey,
      method:'post',
      data:{
        openid: openid
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success:function(res){
        // console.log(res)
        that.setData({
          mynewslist: res.data.data
        })
      }
    })
  },


})