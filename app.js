
App({
  onLaunch: function (e) {
    this.globalData.qr_code = e.scene
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  getLogin() {
    var that = this;
    return new Promise(function (resolve, reject) {
      // 登录
      wx.login({
        success: res => {
          //todo 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: that.globalData.softStraHttps +"/api/wechat/miniprogram/login/jscode2session",
            data: {
              appid:'wx6a4af4a3cdbdb625',
              secret:'01df46cc78f7579548924956c49ea386',
              js_code: res.code,
              qr_code: that.globalData.qr_code
            },
            method: 'get',
            success: function (ret) {
              if (ret.data.code === 0) {
                resolve(ret);
              } else {
                wx.showToast({
                  title: "登录失败，请重新启动小程序",
                  mask: true
                });
                reject('error');
              }
            },
            fail: function (data) {
              wx.hideLoading();
              console.log(data);
            }
          });
        }
      });
    });
  },
  globalData: {
    userInfo: null,
    softStraHttps:'https://smarthome.softstarnet.com',
    addressHttps:"https://apis.map.qq.com",
    openId:'',
    sessionkey:'',
    latitude:'',
    longitude:'',
    qr_code:''
  }
})
