// pages/colors/colors.js
const theColor = require('../../utils/colors.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rgb: '',
    colorName: '中国色',
    isSetColor: false, // 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation = wx.createAnimation()
  },
  bindChangeColor(e) {
    let self = this;
    let colors = theColor.colors();
    let mathNum = Math.round(Math.random() * 526);
    colors.forEach((item, index) => {
      if (index == mathNum) {
        console.log(item)
        let _rgb = (item.RGB.join(',') + ',' + 1);
        wx.setNavigationBarTitle({
          title: item.name
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: item.hex,
          // animation: {
          //   duration: 400,
          //   timingFunc: 'easeIn'
          // }
        })
        self.setData({
          colorName: item.name,
          rgb: _rgb
        })
      }
    });
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