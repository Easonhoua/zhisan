var app = getApp();
var softstarhttps = app.globalData.softStraHttps;
var that;
Page({
  data: {
    chuxingList:[]
  },

  onLoad: function (options) {
    var sessionkey = wx.getStorageSync('session_key')
    that = this;
    app.getLogin().then(function (ret) {
      var sessionkey = ret.data.data.session_key
       wx.request({
         url: softstarhttps + '/api/wechat/miniprogram/weather/index/list?session_key=' + sessionkey,
        data: {
          name: '出行指数'
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'post',
        success: function (res) {
          var chuxingList = res.data.data;
          for (var i = 0; i < chuxingList.length;i++ ){
            if (chuxingList[i].name == '雨伞指数'){
              chuxingList[i].name ='备伞建议'
            }
          }
          that.setData({
            chuxingList: chuxingList
          })
          wx.setStorage({
            key: 'chuxingList',
            data: chuxingList,
          })
        },
        fail: function (res) {
          console.log(res)
        },
      })
    })  
  },

})