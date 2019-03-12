const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsUrl: app.globalData.wordsUrl,
    content: '',
    timeList: {},
    theNowTime: '', // 今日日期
    isNextShow: false, // 下一天是否显示，默认否
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let time = options.id;
    this.getTime();
    this.getData(time);
    let _bg = wx.getStorageSync('bg');
    this.setData({
      bg: _bg
    })
  },
  // 获取时间
  getTime() {
    let that = this;
    let getTime = util.nowTime();
    let _nowTime = getTime.nowY + getTime.nowM + getTime.nowD;
    that.setData({
      nowTime: _nowTime,
      theNowTime: _nowTime,
    })

  },

  // 获取数据
  getData(time) {
    let that = this;
    let _nowTime;
    if(time) {
      _nowTime = time
    } else {
      _nowTime = this.data.nowTime
    }
    let nowTime = _nowTime;
    let theNowTime = this.data.theNowTime;
    let wordsUrl = this.data.wordsUrl;
    wx.showLoading({
      title: '文章加载中...',
    });
    wx.request({
      url: `${wordsUrl}article/day?dev=1&date=${nowTime}`,
      success(res) {
        wx.hideLoading();
        let data = res.data.data;
        // 判断下一天按钮是否显示
        let resData = data.date.curr;
        let _isNextShow;
        if (theNowTime == resData) {
          _isNextShow = false;
        } else {
          _isNextShow = true;
        }
        // 获取数据中时间
        let resDate = data.date;
        resDate.isCollection = false;
        let wordsArr = wx.getStorageSync('wordsArr');
        if (wordsArr) {
          wordsArr.forEach((item,index)=>{
            if (item.time == resDate.curr) {
              resDate.isCollection = item.isCollection
            }
          })
        }
        let _content = data.content; // 内容
        _content = _content.replace(/<\/p>/g, '\n\n');
        _content = _content.replace(/<p>/g, '\t\t\t');
        that.setData({
          title: data.title,
          author: data.author,
          wc: data.wc,
          content: _content,
          timeList: data.date,
          isNextShow: _isNextShow,
          resDate,
        })

      }
    })
  },
  // 点击收藏
  catchCollection(e) {
    // resDate
    let self = this;
    let resDate = this.data.resDate;
    let author = this.data.author;
    let title = this.data.title;
    let _isCollection = e.currentTarget.dataset.id;
    let wordsArr = wx.getStorageSync('wordsArr') || [];
    if (_isCollection == false) {
      resDate.isCollection = true;
      self.setData({
        resDate
      })
      wordsArr.push({ time: resDate.curr, isCollection: true, author: author, title: title})
    } else {
      resDate.isCollection = false;
      self.setData({
        resDate
      })
      wordsArr.pop({ time: resDate.curr, isCollection: false, author: author, title: title})
    }
    wx.setStorageSync('wordsArr', wordsArr);
    console.log(wordsArr)
  },

  // 点击选择 昨天今天
  clickTime(e) {
    let that = this;
    let nowTime = this.data.nowTime;
    let timeList = this.data.timeList;
    let prev = e.currentTarget.dataset.time;
    let next = e.currentTarget.dataset.time;
    if (prev == 'prev') {
      that.setData({
        nowTime: timeList.prev
      })

    } else if (next == 'next') {
      let getTime = util.nowTime();
      let _nowTime = Number(getTime.nowY + getTime.nowM + getTime.nowD);
      let _timeNext = Number(timeList.next);
      console.log(_nowTime, _timeNext)
      if (_nowTime < _timeNext) {
        that.setData({
          nowTime: _nowTime
        })
      } else {
        that.setData({
          nowTime: _timeNext
        })
      }

    };
    this.getData();
    this.goTop();
  },
  // 返回顶部
  goTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
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
    let _path = '/pages/words/words';
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