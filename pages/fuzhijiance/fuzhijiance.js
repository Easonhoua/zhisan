var app = getApp();
var softstarhttps = app.globalData.softStraHttps;
var openID = wx.getStorageSync('openid')
var session_key = wx.getStorageSync('session_key')
var that;
var naishouxing = [{ val: '十分耐受', detail: '基本没有什么成分能让你过敏。观察肌肤状况，适当使用功效显著但需要皮肤具有一定耐受性的产品，会使你获得事半功倍的效果。' }, {
  val: '比较耐受', detail: '你的皮肤大部分时间都不受过敏侵扰，挑选护肤品时不用过多考虑成分的问题。'
}, { val: '轻度敏感', detail: '你的皮肤对外界的刺激稍稍有一点敏感。选择护肤品时注意选择成分简单具有修复功效的产品，逐步重建皮肤屏障。' }, { val: '重度敏感', detail: '你的皮肤对外界刺激非常敏感。当务之急就是修复受损的皮肤屏障，让皮肤恢复健康状态，谨慎使用护肤品，必要时请就医，遵医嘱对皮肤进行护理。' },]

var doudoushuliang = [{ val: '无', detail: '恭喜你，你并没有最多人困扰的面部问题，请继续保持。' }, { val: '轻度（1~3个）', detail: '你有轻度的痘痘问题，但并不严重。注意调节心情，清淡饮食，做好防晒工作，不管是痘痘还是后续的痘印问题，都能很快地得到解决。' }, { val: '中度（4~6个）', detail: '痘痘的问题有点严重了，注意不要用手去触摸痘痘，以免造成二次感染。使用点涂类祛痘产品能够更有效精准地消灭痘痘。' }, { val: '重度（6~∞）', detail: '痘痘的问题变得严重了，急需处理。建议就医听从医嘱治疗，避免过度用药导致皮肤受损。按时作息，清淡饮食，注意清洁，皮肤会逐步恢复。' },]

var heitoushuliang = [{ val: '无', detail: '你的皮肤完全没有黑头问题，平时适当地去角质、疏通毛孔，能有效预防黑头的生成。' }, { val: '轻度（1~15个）', detail: '你有轻度的黑头问题，但无需特别在意。饮食清淡，注意清洁，能有效抑制黑头的生成。' }, { val: '中度（16~35个）', detail: '黑头问题稍微有一点严重了，肌肤状态允许的情况下使用果酸类产品清洁毛孔抑制黑头生成，少吃辛辣刺激类食品以避免让油脂过度分泌，令黑头状况更为严重。' }, { val: '重度（36~∞）', detail: '黑头问题比较严重了，但也无需太过担心。不要因为问题严重就用手去挤压黑头，这样很容易导致皮肤感染。注意清洁、作息正常、清淡饮食通过自身循环一点一点地消灭黑头，如有需要，也可以就医寻求医生的帮助。' },]

var maokong = [{ val: '细致', detail: '你的皮肤细致度非常高，堪称“肤若凝脂”。' }, { val: '较细致', detail: '你的皮肤还是比较细致的，基本没有毛孔粗大的情况，可以适当做一些去角质的工作，使脸上的皮肤更为通透。' }, { val: '较粗大', detail: '你有一点毛孔粗大的问题，但相比于痘痘而言，毛孔粗大只是小问题，不用特别担心。疏通毛孔，积极去除黑头，能让毛孔在视觉上“隐形”。' }, { val: '粗大', detail: '毛孔粗大的问题有一点严重了。首先当然是要做好每日的清洁工作，再根据皮肤状况选用果酸类产品去除脸上多余的角质，如有需要，也可以寻求医美的帮助。' },]

var fuse = [{ val: '一级', detail: '恭喜你，你是色素最淡最为人羡慕的一白。白皮比起其他皮肤黑色素含量较低，并不容易晒黑，但却增加了晒伤、光老化的风险。打伞的同时选择合适的防晒做好双层防护也是很有必要的。' }, { val: '二级', detail: '你的皮肤已经非常接近最白的色号，虽然不像一白一样白到反光，但也足够在人群中脱颖而出。如果想要在这个基础上再白一点，良好的防晒工作是必不可少的，也可以适当使用一些成分温和的抗氧化产品，加速美白进程。' }, { val: '三级', detail: '你的肤色是常见的亚洲人肤色。如果有美白提亮肤色需求的话，可以选用一些含有美白抗氧化成分的护肤品，另外，良好的防晒工作更会令你的美白事业事半功倍。' }, { val: '四级', detail: '你的肤色是健康的小麦色，很多白皮都无法驾驭的颜色到你手上都服服帖帖的。如果你有美白的意向，首先要做好每日的防晒，在涂抹美白精华之前使用含有果酸类成分的产品去除脸上多余的角质，能令皮肤更好地吸收。' },]

var fuzhi = [{
  val: '干性肤质', detail: '整体偏干 轻微脱皮 红血丝明显你的皮肤比较干燥，平日里要注意补水保湿，预防干纹的形成。使用滋润度最强的油类产品搭配面霜，选用氨基酸类洁面保护皮脂腺，在皮肤健康的情况下也可以使用蒸脸器缓解干燥带来的紧绷感。'
}, {
    val: '混合偏干', detail: 'T区正常 脸颊偏干 有轻微红血丝当前皮肤分泌油脂较少，需注意加强保湿，以免干燥情况加剧出现皮肤出现干纹和裂伤。在感到肌肤紧绷时及时使用滋润型面霜，使用氨基酸类洁面，都是不错的选择。'
  }, {
    val: '中性肤质', detail: '状态稳定 水油平衡 无明显瑕疵皮肤柔软，毛孔细小，含水量适中，恭喜你，你是最多人渴望得到的中性皮肤。中性皮肤虽好，却容易受到季节影响，夏季注意控油，冬季注意保湿，还是很有必要的。'
  }, {
    val: '混合偏油', detail: 'T区偏油 脸颊正常 部分皮肤毛孔粗大当前皮肤分泌油脂较多，需注意加强控油、注意清洁，避免黑头增多导致的T区毛孔粗大的情况。T区出油可以使用吸油纸吸去多余油脂，保持皮肤干爽。' },]

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "/";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

Page({
  data: {
    haveimg: false,
    noimg: true,
    current: '',
    tempFilePaths:'',
    fuse: "",
    fuzhi: "",
    maokong: "",
    heitoushuliang: "",
    doudoushuliang: "",
    naishouxing: "",
    curTime: getNowFormatDate()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function getRandom(min, max) {
      var r = Math.random() * (max - min);
      var re = Math.round(r + min);
      re = Math.max(Math.min(re, max), min)
      return re;
    }
    var aaa = getRandom(85, 90)/100
    var suijishu = getRandom(0, 3)
    console.log(aaa)
    this.setData({
      fuse: fuse[suijishu],
      fuzhi: fuzhi[suijishu],
      maokong: maokong[suijishu],
      heitoushuliang: heitoushuliang[suijishu],
      doudoushuliang: doudoushuliang[suijishu],
      naishouxing: naishouxing[suijishu]
    })
  },

  openCamera() {
    that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          url: softstarhttps + '/api/wechat/miniprogram/material/uploadImage?session_key=' + encodeURIComponent(session_key),
          method: 'post',
          header: { "Content-Type": "multipart/form-data" },
          filePath: tempFilePaths,
          name: 'file_data',
          success: function (data) {
            var imgUri = JSON.parse(data.data).message
            wx.request({
              url: softstarhttps + '/api/wechat/miniprogram/photo/upload?session_key=' + encodeURIComponent(session_key),
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              method: "post",
              data: {
                openid: openID,
                url: imgUri
              },
              success: function (res) {
                console.log(res)
              }
            })
          },
          fail: function (fail) {
            console.log(fail)
          }
        })

        wx.showLoading({
          title: '报告生成中...',
        })
        setTimeout(function(){
          that.setData({
            haveimg: true,
            noimg: false,
            tempFilePaths: tempFilePaths
          })
          wx.hideLoading();
        },2000)
      }
    })
  },
 
  onShareAppMessage: function () {

  }
})