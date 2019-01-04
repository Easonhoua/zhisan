// pages/weathers/weathers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dagwendu:'',
    weatherlist:[],
    updatetime:'',
    cityname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      var allData = JSON.parse(wx.getStorageSync('allData'))
      var highwen = (allData.data.forecast.forecastWeathers[0].high).replace('高温', '')
      var lowwen = (allData.data.forecast.forecastWeathers[0].low).replace('低温', '')
      var weatherlist = allData.data.forecast.forecastWeathers
      that.setData({
        dagwendu: allData.data.temperature,
        weatherlist: weatherlist,
        updatetime: allData.data.updatetime,
        cityname: allData.data.city,
        highwen: highwen,
        lowwen: lowwen
      })
  },
  gomore(){
    wx.navigateTo({
      url: '../more/more',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})