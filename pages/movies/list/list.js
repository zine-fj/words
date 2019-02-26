// pages/movies/list/list.js
let whitch;
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies_list: [],
    hasMore: true,
    subtitle: '加载中...',
    countNum: 10,
    total: 20, // 假设每页有电影20个
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    whitch = options;
    this.getMoviesList(options.id);
  },

  // 获取电影
  getMoviesList(param) {
    let that = this;
    let countNum = this.data.countNum;
    wx.showLoading({
      title: '拼命加载中...'
    })
    if(param == 'search') {
      util.myRequest({
        url: `${param}?q = ${e.searchId}?count= 10`,
        success(res) {
          console.log(res);
          wx.hideLoading({});
          wx.setNavigationBarTitle({
            title: res.data.title
          });
          that.setData({
            movies_list: res.data.subjects,
          });
          wx.stopPullDownRefresh({});
        }
      })
    } else {
      util.myRequest({
        url: `${param}?count=10`,
        success(res) {
          console.log(res);
          wx.hideLoading({});
          wx.setNavigationBarTitle({
            title: res.data.title
          });
          that.setData({
            movies_list: res.data.subjects,
          });
          wx.stopPullDownRefresh({});
        }
      })
    }
    
  },

  // 加载更多
  loadMore(whitch) {
    console.log(whitch)
    let hasMore = this.data.hasMore;
    let countNum = this.data.countNum;
    let total = this.data.total;
    let that = this;
    let movies_list = this.data.movies_list;
    
    if (countNum < total) {
      that.setData({
        hasMore: true
      })
      countNum += 10;
    } else {
      that.setData({
        hasMore: false
      })
    }
    wx.showLoading({
      title: '拼命加载中...',
    });
    if (whitch.id == "search") {
      util.myRequest({
        url: `${whitch.id}?q=${whitch.searchId}&count=${countNum}`,
        success(res) {
          wx.hideLoading({});
          let data = res.data.subjects;
          let total = res.data.total;
          that.setData({
            movies_list: data,
            countNum,
            total: total
          });
        }
      })
    } else {
      util.myRequest({
        url: `${whitch.id}?count=${countNum}`,
        success(res) {
          wx.hideLoading({});
          let data = res.data.subjects;
          let total = res.data.total;
          that.setData({
            movies_list: data,
            countNum,
            total: total
          });

        }
      })
    }
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getMoviesList(whitch.id)
    this.setData({
      hasMore: true
    })
  },
  /**
   * 页面相关事件处理函数--上拉加载
   */
  onReachBottom(e) {
    console.log('上拉')
    this.loadMore(whitch);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
})