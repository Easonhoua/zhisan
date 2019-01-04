var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var softstarhttps = app.globalData.softStraHttps;
var addressHttps = app.globalData.addressHttps;
var that;
var qqmapsdk;
Page({
  data: {
    temperature: '',//温度
    innertemperature:'',
    ziwaixian:'',
    howziwaixian:'',
    frameClass1: 'frame z1',//默认正面在上面
    frameClass2: 'frame z2',
  },
  rotateFn: function (e) {
    var that = this
    if (this.data.frameClass1 == 'frame z1' && this.data.frameClass2 == 'frame z2') {
      that.setData({
        frameClass1: "frame front",
        frameClass2: "frame back",
      })
      setTimeout(function () {
        that.setData({
          frameClass1: "frame z2",
          frameClass2: "frame z1",
        })
      }, 1000);
    }else {
      that.setData({
        frameClass1: "frame back",
        frameClass2: "frame front",
      })
      setTimeout(function () {
        that.setData({
          frameClass1: "frame z1",
          frameClass2: "frame z2",
        })
      }, 1000);
    }
  },
  onLoad:function(e){
    wx.showLoading({
      title:"加载中..."
    })

    that = this;
      app.getLogin().then(function (ret) {
        var sessionkey = ret.data.data.session_key
        var openid = ret.data.data.openid
        wx.setStorage({
          key: 'session_key',
          data: sessionkey,
        })

        wx.setStorage({
          key: 'openid',
          data: ret.data.data.openid,
        })
        qqmapsdk = new QQMapWX({
          key: '2XTBZ-7NQ3X-LXN4G-ZBJ5W-7QP4Z-U4BFO'
        });
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function (res) {
                wx.setStorage({
                  key: 'ad_info',
                  data: JSON.stringify(res.result.address_component),
                })
                wx.request({
                  url: softstarhttps + '/api/wechat/miniprogram/weather/query?session_key=' + sessionkey,
                  method: 'get',
                  data: {
                    city: res.result.ad_info.city,
                    openid: openid
                  },
                  success: function (res) {
                    console.log(res)
                    wx.hideLoading()
                    wx.setStorage({
                      key: "allData",
                      data: JSON.stringify(res)
                    })
                    if (res.data.temperature >= 32){
                      var innertemperature = res.data.temperature - 3
                    } else if (res.data.temperature >= 28 && res.data.temperature<=31){
                      var innertemperature = res.data.temperature - 2
                    }else{
                      var innertemperature = res.data.temperature
                    }
                    var ziwaixian = res.data.indexs.weatherIndexs[6].value
                    var howziwaixian;
                    if (ziwaixian == ''){
                      howziwaixian = '0'
                    } else if (ziwaixian == '最弱'){
                      howziwaixian = '1'
                    } else if (ziwaixian == '弱'){
                      howziwaixian = '2'
                    } else if (ziwaixian == '中等'){
                      howziwaixian = '3'
                    } else if (ziwaixian == '强'){
                      howziwaixian = '4'
                    } else if (ziwaixian == '很强'){
                      howziwaixian = '5'
                    }
                    that.setData({
                      temperature: res.data.temperature,
                      innertemperature: innertemperature,
                      ziwaixian: res.data.indexs.weatherIndexs[6].value,
                      howziwaixian: howziwaixian,
                    })
                  },
                  fail: function (fail) {
                    console.log(fail)
                  }
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '获取定位信息失败',
                  icon: 'none',
                  duration: 1000
                })
              },
            });
          },
          fail: function (fail) {
            wx.showToast({
              title: '获取定位信息失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      })
  },
  goweather(){
    wx.navigateTo({
      url: '../weathers/weathers',
    })
  },
})
