const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    timeList: {},
    theNowTime: '', // 今日日期
    nowDay: '', // 周几
    nowTime: '', // 当前选择文章的日期，
    nowCity: '', // 当前城市
    nowWemp: '', // 当前温度
    nowWeather: '', // 当前天气
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTime();
    this.getData();
    this.getWeather();
  },
  // 获取天气
  getWeather() {
    let that = this;
    // 获取当前城市 暂无合适地址，先注释
    util.getLocation().then((suc) => {
      util.getCity(suc.latitude, suc.longitude).then((suc) => {
        let city = suc.data.result.addressComponent.city.replace('市', '');
        util.getWeather(city).then((suc) => {
          let _info = suc.data.results[0].weather_data[0];
          console.log(_info)
          let _nowWemp = _info.date.split('：')[1].split(')')[0];
          let _nowWeather = _info.weather;
          that.setData({
            nowCity: city,
            nowWemp: _nowWemp,
            nowWeather: _nowWeather,
          })
        }).catch((err) => {
          console.log(err)
          util.getWeather('北京');
        });
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  // 获取时间
  getTime() {
    let that = this;
    let getTime = util.nowTime();
    console.log(getTime)
    let _nowTime = getTime.nowY + getTime.nowM + getTime.nowD;
    that.setData({
      nowTime: _nowTime,
      theNowTime: _nowTime,
      nowDay: getTime.nowDay
    })
  },

  // 获取数据
  getData() {
    let that = this;
    let nowTime = this.data.nowTime;
    wx.showLoading({
      title: '文章加载中...',
    });
    wx.request({
      url: `https://interface.meiriyiwen.com/article/day?dev=1&date=${nowTime}`,
      success(res) {
        console.log(res)
        wx.hideLoading();
        let data = res.data.data;
        let _content = data.content; // 内容
        _content = _content.replace(/<\/p>/g, '\n\n');
        _content = _content.replace(/<p>/g, '\t\t\t');
        that.setData({
          title: data.title,
          author: data.author,
          wc: data.wc,
          content: _content,
          timeList: data.date,
        })
      }
    })
  },

  // 点击选择昨天今天
  clickTime(e) {
    let that = this;
    let nowTime = this.data.nowTime;
    let timeList = this.data.timeList;
    let prev = e.currentTarget.dataset.time;
    let next = e.currentTarget.dataset.time;
    console.log(timeList)
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