// pages/kaiyanli/kaiyanli.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eyeUrl: app.globalData.eyeUrl,
    videoLi: {},
    otherVideoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getCurrentVideo(options.id);
    this.getGroomVideo(options.id);
    let _bg = wx.getStorageSync('bg');
    this.setData({
      bg: _bg
    })
  },

  // 获取当前视频信息
  getCurrentVideo(id) {
    let self = this;
    let eyeUrl = this.data.eyeUrl;
    let videoLi = this.data.videoLi;
    wx.request({
      url: `${eyeUrl}api/v1/video/${id}`,
      data: {},
      success(res) {
        // console.log(res)
        let _videoLi;
        _videoLi = res.data;
        // 时间
        let min = parseInt(res.data.duration / 60);
        let sec = parseInt(res.data.duration % 60);
        if (min.toString().length == 1) {
          min = `0${min}`;
        };
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        };
        _videoLi.videoTime = `${min}′${sec}″`
        self.setData({
          videoLi: _videoLi
        })
      }
    })
  },

  // 获取推荐视频信息
  getGroomVideo(id) {
    let self = this;
    let eyeUrl = this.data.eyeUrl;
    let otherVideoList = this.data.otherVideoList;
    wx.showLoading({
      title: '视频加载中...',
    })
    wx.request({
      url: `${eyeUrl}api/v4/video/related?id=${id}`,
      data: {},
      success(res) {
        
        let _otherList = []; // 所有推荐
        let _otherArr = []; // 每个类型下视频
        let dataArr = res.data.itemList;
        let dataNum = res.data.count
        console.log(dataArr)
        let textCardArr = dataArr.filter((item,index)=>{
          return item.type == "textCard"
        })
        let theVideoCardArr = dataArr.filter((item,index)=>{
          return item.type == "videoSmallCard"
        })
        let videoCardArr = theVideoCardArr.map((item,index)=>{
          let _videoCardArr = {};
          _videoCardArr.img = item.data.cover.detail;
          _videoCardArr.authorImg = item.data.author.icon;
          _videoCardArr.author = item.data.author.name;
          _videoCardArr.title = item.data.title;
          _videoCardArr.id = item.data.id;
          // 时间
          let min = parseInt(item.data.duration / 60);
          let sec = parseInt(item.data.duration % 60);
          if (min.toString().length == 1) {
            min = `0${min}`;
          };
          if (sec.toString().length == 1) {
            sec = `0${sec}`;
          };
          _videoCardArr.videoTime = `${min}′${sec}″`
          return _videoCardArr
        })
        // console.log(textCardArr)
        // console.log(videoCardArr)
        var _otherVideoList = [];
        // 均分数组
        for (let i = 0, len = videoCardArr.length; i < len; i += 5) {
          _otherVideoList.push(videoCardArr.slice(i, i + 5));
        }
        // console.log(_otherVideoList)
        _otherVideoList.forEach((item,index)=>{
          textCardArr.forEach((text,i)=>{
            if(index == i) {
              _otherList.push({ title: text.data.text, videoArr: item})
            }
          })
        })
        // console.log(_otherList)
        
        self.setData({
          otherVideoList: _otherList
        })
        wx.hideLoading();
        // console.log(otherVideoList)
      }
    })
  },

  bindOtherVideo(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.redirectTo({
      url: `/pages/video/video_play/video_play?id=${id}`,
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