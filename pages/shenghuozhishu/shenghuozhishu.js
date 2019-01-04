var app = getApp();
var softstarhttps = app.globalData.softStraHttps;

var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shenghuoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var session_key = wx.getStorageSync('session_key');
    that = this;
    wx; wx.request({
      url: softstarhttps + '/api/wechat/miniprogram/weather/index/list?session_key=' + session_key,
      data: {
        name: '生活指数'
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'post',
      success: function (res) {
        var shenghuoList = res.data.data;
        that.setData({
          shenghuoList: shenghuoList
        })
        wx.setStorage({
          key: 'shenghuoList',
          data: shenghuoList,
        })
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },


})