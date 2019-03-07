// pages/kaiyanli/kaiyanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoLi: {},
    otherVideoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getCurrentVideo(options.id)
    // this.getCurrentVideo(152546)
  },

  getCurrentVideo(id) {
    let self = this;
    let itemList = wx.getStorageSync('infoList');
    let videoLi = this.data.videoLi;
    console.log(itemList)
    let _otherVideoList = [];
    itemList.forEach((item, index) => {
      if (item.id == id) {
        self.setData({
          videoLi: item
        })
        wx.setNavigationBarTitle({
          title: item.title
        });
      } else {
        _otherVideoList.push(item)
        self.setData({
          otherVideoList: _otherVideoList
        })
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