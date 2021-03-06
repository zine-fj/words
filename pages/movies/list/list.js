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
    hasMoreFalse: '没有更多内容了',
    subtitle: '加载中...',
    countNum: 10,
    total: 20, // 假设一共有电影20个

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    whitch = options;
    this.getMoviesList(options);
  },

  // 获取电影
  getMoviesList(param) {
    let that = this;
    wx.showLoading({
      title: '努力加载中...'
    })
    let _url
    if (param.id == 'search') {
      if (param.searchType == 'tag') {
        _url = `movie/search?tag=${param.searchId}&count=10&city=${param.city}`
      } else if (param.searchType == 'q') {
        _url = `movie/search?q=${param.searchId}&count=10&city=${param.city}`
      }
    } else {
      _url = `movie/${param.id}?count=10&city=${param.city}`
    }
    util.myRequest({
      url: _url,
      success(res) {
        wx.hideLoading({});
        console.log(res);
        wx.setNavigationBarTitle({
          title: res.data.title
        });
        let _movies_list = res.data.subjects;
        if (_movies_list.length > 0) {
          that.setData({
            hasMore: true,
            movies_list: _movies_list,
            countNum: 10,
          });
        } else {
          that.setData({
            hasMore: false,
            hasMoreFalse: '没有更多内容了',
          });
        }
        wx.stopPullDownRefresh({});
      }
    })
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
      wx.showLoading({
        title: '努力加载中...',
      });
      that.setData({
        hasMore: true
      })
      countNum += 10;
    } else {
      that.setData({
        hasMore: false,
        hasMoreFalse: '没有更多内容了',
      })
    }
    let _url;
    if (whitch.id == "search") {
      if (whitch.searchType == 'tag') {
        _url = `movie/search?tag=${whitch.searchId}&count=${countNum}`
      } else if (whitch.searchType == 'q') {
        _url = `movie/search?q=${whitch.searchId}&count=${countNum}`
      }
      console.log(countNum, total)
      if (countNum >= 20) {
        that.setData({
          hasMore: false,
          hasMoreFalse: '截取搜索的前20条内容',
        })
      } else {
        that.setData({
          hasMore: true,
        })
      }
    } else {
      _url = `movie/${whitch.id}?count=${countNum}`
    }
    util.myRequest({
      url: _url,
      success(res) {
        console.log(res)
        wx.hideLoading({});
        let data = res.data.subjects;
        let total = res.data.total;
        if (!total) {
          total = data.length
        }
        that.setData({
          movies_list: data,
          countNum,
          total: total
        });
      }
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getMoviesList(whitch)
    this.setData({
      hasMore: true
    })
  },
  /**
   * 页面相关事件处理函数--上拉加载
   */
  onReachBottom(e) {
    this.loadMore(whitch);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let _path = '/pages/movies/item/item';
    return {
      title: '豆瓣电影',
      path: _path,
      // imageUrl: '/images/an.jpg',
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})