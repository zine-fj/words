// pages/movies/item/item.js
const util = require('../../../utils/util.js');
Page({
  data: {
    movie: {}
  },
  onLoad: function(options) {
    console.log(options)
    this.getDetailMovie(options)
  },

  getDetailMovie(e) {
    let that = this;
    let movie_url = `movie/subject/${e.id}`;
    wx.showLoading({
      title: '拼命加载中...',
    });
    util.myRequest({
      url: movie_url,
      success(res) {
        console.log(res);
        that.setData({
          movie: res.data
        });
        wx.setNavigationBarTitle({
          title: res.data.title
        });
        wx.hideLoading();
      }
    })
  },
})