var app = getApp();
var softstarhttps = app.globalData.softStraHttps;
var openID = wx.getStorageSync('openid')
var session_key = wx.getStorageSync('session_key')
var that;
Page({
  data: {
    haveimg: false,
    noimg: false,
    datalist:[],
    current:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getphotoData()
  },

  getphotoData(){
    that = this
    wx.request({
      url: softstarhttps + '/api/wechat/miniprogram/photo/list?session_key=' + encodeURIComponent(session_key),
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'post',
      data: {
        openid: openID,
        pageNumber: 1,
        pageSize: 10
      },
      success: function (res) {
        console.log(res)
        if(res.data.code == 0){
          if (res.data.data == ''){
            that.setData({
              haveimg: false,
              noimg: true,
            })
          }else{
            var datalist = (res.data.data).reverse()
            that.setData({
              haveimg: true,
              noimg: false,
              datalist: res.data.data
            })
          }
        }
      },
      fail: function (fail) {
        console.log(fail)
      }
    })
  },
  // openCamera(){
  //   that = this;
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['compressed'], 
  //     sourceType: ['camera'],
  //     success: function (res) {
  //       let tempFilePaths = res.tempFilePaths[0]
  //       that.setData({
  //         tempFilePaths: tempFilePaths
  //       })
  //       wx.uploadFile({
  //         url: softstarhttps + '/api/wechat/miniprogram/material/uploadImage?session_key=' + encodeURIComponent(session_key),
  //         method:'post',
  //         header:{"Content-Type": "multipart/form-data"},
  //         filePath: tempFilePaths,
  //         name: 'file_data', 
  //         success:function(data){
  //           var imgUri = JSON.parse(data.data).message
  //           wx.request({
  //             url: softstarhttps + '/api/wechat/miniprogram/photo/upload?session_key=' + encodeURIComponent(session_key),
  //             header: { "Content-Type": "application/x-www-form-urlencoded" },
  //             method:"post",
  //             data: {
  //               openid: openID,
  //               url: imgUri
  //             },
  //             success:function(res){
  //               that.getphotoData();
  //             }
  //           })
  //         },
  //         fail:function(fail){
  //           console.log(fail)
  //         }
  //       })
  //     }
  //   })
  // },
  previewImage: function (e) {
    var urls = [];
    for (var i = 0; i < this.data.datalist.length;i++){
      urls[i] = this.data.datalist[i].url
    } 
    wx.previewImage({
      current: e.currentTarget.id,
      urls: urls
    })
  },
  deleteImage: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: softstarhttps + '/api/wechat/miniprogram/photo/delete?session_key=' + encodeURIComponent(session_key),
            method:'post',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data:{
              openid: openID,
              id: id
            },
            success:function(res){
              that.getphotoData()
            },
            fail:function(fail){
              console.log(fail)
            }
          })
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },

  onShareAppMessage: function () {

  }
})