var app = getApp();
var softstarhttps = app.globalData.softStraHttps;

Page({
  data: {
    pageData: '',
    shenghuoList:[],
    hideview: false,
    zhishuname: '',
    open: false,
    zhishudengji:'无'
  },
  /**
   * 生命周期函数--监听
   * 
   * 
   * 页面加载
   */
  onLoad: function (options) {
    var that = this
    var session_key = wx.getStorageSync('session_key')
    var allData = JSON.parse(wx.getStorageSync('allData'))
    var ad_info = JSON.parse(wx.getStorageSync('ad_info'))
    var shenghuoList = wx.getStorageSync('shenghuoList')
    var zhishuname = options.name
    var zhishuid = options.id
    console.log(shenghuoList)
    that.setData({
      shenghuoList: shenghuoList,
      zhishuname: zhishuname
    })
    var weatherIndexsvalueall = allData.data.indexs.weatherIndexs
    for (var i = 0; i < weatherIndexsvalueall.length; i++) {
      if (weatherIndexsvalueall[i].name == zhishuname) {
        var weatherIndexsvalue = weatherIndexsvalueall[i].value
        console.log(weatherIndexsvalue)
        that.setData({
          zhishudengji: weatherIndexsvalue
        })
        wx.request({
          url: softstarhttps + '/api/wechat/miniprogram/weather/index/detail?session_key=' + session_key,
          method: 'post',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            index: zhishuid,
            value: weatherIndexsvalue,
            country: ad_info.nation,
            province: ad_info.province,
            city: ad_info.city
          },
          success: function (res) {
            console.log(res)
            // console.log(res.data.data)
            if (res.data.data){
              var viewContent = res.data.data.content
              that.setData({
                pageData: viewContent,
              })
            }else{
              wx.showToast({
                title: '暂无数据',
                duration: 1000,
                icon:'none'
              })
            }
          },
          fail: function (fail) {
            console.log(fail)
          }
        })
      }else{
        wx.request({
          url: softstarhttps + '/api/wechat/miniprogram/weather/index/detail?session_key=' + session_key,
          method: 'post',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            index: zhishuid,
            country: ad_info.nation,
            province: ad_info.province,
            city: ad_info.city
          },
          success: function (res) {
            if (res.data.data) {
              var viewContent = res.data.data.content
              that.setData({
                pageData: viewContent,
              })
            } else {
              wx.showToast({
                title: '暂无数据',
                duration: 1000,
                icon: 'none'
              })
            }
          },
          fail: function (fail) {
            console.log(fail)
          }
        })
      }
    }
  },
  showitem: function () {
    this.setData({
      open: !this.data.open,
      hideview: false
    })
  },
  hideview() {
    this.setData({
      hideview: true
    })
  },
  onUnload: function () {
    wx.switchTab({
      url: '../shenghuozhishu/shenghuozhishu'
    });
  }
})