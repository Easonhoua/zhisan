// pages/more/more.js
var app = getApp();
var interval;
// var varName;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    environment: '',
    shidu: '',
    windDirection: '',
    windPower: '',
    wendu: '',
    ziwaixian: '',       //强弱
    howziwaixian: ''     //等级
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var allData = JSON.parse(wx.getStorageSync('allData'))
    console.log(allData)
    var ziwaixian = allData.data.indexs.weatherIndexs[6].value
    var howziwaixian;
    if (ziwaixian == '') {
      howziwaixian = '0'
    } else if (ziwaixian == '最弱') {
      howziwaixian = '1'
    } else if (ziwaixian == '弱') {
      howziwaixian = '2'
    } else if (ziwaixian == '中等') {
      howziwaixian = '3'
    } else if (ziwaixian == '强') {
      howziwaixian = '4'
    } else if (ziwaixian == '很强') {
      howziwaixian = '5'
    }
    that.setData({
      environment: allData.data.environment,
      shidu: allData.data.humidity,
      windDirection: allData.data.windDirection,
      windPower: allData.data.windPower,
      wendu: allData.data.temperature,
      ziwaixian: ziwaixian,       //强弱
      howziwaixian: howziwaixian     //等级
    })

    //创建并返回绘图上下文context对象。
    var cxt_arc1 = wx.createCanvasContext('canvasCircle1');
    cxt_arc1.setLineWidth(8);
    cxt_arc1.setStrokeStyle('#f1f1f1');
    cxt_arc1.setLineCap('round');
    cxt_arc1.beginPath();
    cxt_arc1.arc(61, 64, 58, 0.75*Math.PI, 0.25 * Math.PI, false);
    cxt_arc1.stroke();
    cxt_arc1.draw();

    var cxt_arc2 = wx.createCanvasContext('canvasCircle2');
    cxt_arc2.setLineWidth(8);
    cxt_arc2.setStrokeStyle('#f1f1f1');
    cxt_arc2.setLineCap('round');
    cxt_arc2.beginPath(); 
    cxt_arc2.arc(61, 64, 58, 0.75 * Math.PI, 0.25 * Math.PI, false);
    cxt_arc2.stroke();
    cxt_arc2.draw();


    var ctx1 = wx.createCanvasContext('canvasArcCir1');
    ctx1.setLineWidth(8);
    ctx1.setStrokeStyle('#acce23');
    ctx1.setLineCap('round');
    ctx1.beginPath();
    if (allData.data.environment.aqi > 0 && allData.data.environment.aqi <= 100) {
      ctx1.arc(61, 64, 58, 0.75 * Math.PI, 1 * Math.PI, false);
    } else if (allData.data.environment.aqi > 100 && allData.data.environment.aqi <= 200){
      ctx1.arc(61, 64, 58, 0.75 * Math.PI, 1.25 * Math.PI, false);
    } else if (allData.data.environment.aqi > 200 && allData.data.environment.aqi <= 250){
      ctx1.arc(61, 64, 58, 0.75 * Math.PI, 1.5 * Math.PI, false);
    } else if (allData.data.environment.aqi > 250 && allData.data.environment.aqi <= 300){
      ctx1.arc(61, 64, 58, 0.75 * Math.PI, 1.75 * Math.PI, false);
    } else if (allData.data.environment.aqi > 300 && allData.data.environment.aqi <= 400){
      ctx1.arc(61, 64, 58, 0.75 * Math.PI, 0, false);
    } else if (allData.data.environment.aqi > 400 && allData.data.environment.aqi <= 450){
      ctx1.arc(61, 64, 58, 0.75 * Math.PI, 0.15 * Math.PI, false);
    } else if (allData.data.environment.aqi > 450 && allData.data.environment.aqi <= 500){
      ctx1.arc(61, 64, 58, 0.75 * Math.PI, 0.25 * Math.PI, false);
    }
    ctx1.stroke();
    ctx1.draw();

    var ctx2 = wx.createCanvasContext('canvasArcCir2');
    ctx2.setLineWidth(8);
    ctx2.setStrokeStyle('#acce23');
    ctx2.setLineCap('round');
    ctx2.beginPath();
    var textnum = allData.data.humidity.replace('%','')
    console.log(textnum)
    if (textnum > 0 && textnum <= 25){
      ctx2.arc(61, 64, 58, 0.75 * Math.PI, 1 * Math.PI, false);
    } else if (textnum > 25 && textnum <= 50 ){
      ctx2.arc(61, 64, 58, 0.75 * Math.PI, 1.5 * Math.PI, false);
    } else if (textnum > 50 && textnum <= 75){
      ctx2.arc(61, 64, 58, 0.75 * Math.PI, 1.80 * Math.PI, false);
    } else if (textnum > 75 && textnum <= 85){
      ctx2.arc(61, 64, 58, 0.75 * Math.PI, 0, false);
    } else if (textnum > 85 && textnum <= 98){
      ctx2.arc(61, 64, 58, 0.75 * Math.PI, 0.15*Math.PI, false);
    } else if (textnum > 98 && textnum <= 100){
      ctx2.arc(61, 64, 58, 0.75 * Math.PI, 0.25 * Math.PI, false);
    }
    ctx2.stroke();
    ctx2.draw();
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