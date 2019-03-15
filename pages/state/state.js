// pages/state/state.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vImg: '/images/an.jpg',
    vName: app.globalData.vName,
    version: app.globalData.version,
    arrowRight: '../../images/arrowright.png',
    isGnjsShow: false, // 功能介绍是否显示，默认否
    isMzsmShow: false, // 免责声明是否显示，默认否
    isGywShow: false, // 关于我是否显示，默认否
  },

  bindState(e) {
    let type = e.currentTarget.dataset.type;
    let isGnjsShow = this.data.isGnjsShow;
    let isMzsmShow = this.data.isMzsmShow;
    let isGywShow = this.data.isGywShow;
    if(type == 'gnjs') {
      this.setData({
        isGnjsShow: !isGnjsShow
      })
    } else if (type == 'mzsm') {
      this.setData({
        isMzsmShow: !isMzsmShow
      })
    } else if (type == 'gyw') {
      this.setData({
        isGywShow: !isGywShow
      })
    }
    
    console.log(type)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _bg = wx.getStorageSync('bg');
    if (_bg) {
      this.setData({
        bg: _bg
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: _bg.hex,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})