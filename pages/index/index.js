Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    time: '',
    nowTime: '',
    _url: '', 
    showTime: '', // 页面中要显示的 time
    timeList: {},
    isAllShow: true, // 页面全部加载完毕
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTime();
    this.getUrl();
  },

  getTime(){
    let that = this;
    let theTime = new Date();
    let year = theTime.getFullYear();
    let month = theTime.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let date = theTime.getDate();
    date = date < 10 ? '0' + date : date;
    let nowTime = year + '' + month + date;
    that.setData({
      time: nowTime,
      nowTime: nowTime
    })
  },

  getUrl() {
    let that = this;
    let time = this.data.time;
    let _url = this.data._url;
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      success(res) {
        let _nowTime = res.data.data.date.curr;
        if (_nowTime != time) {
          that.setData({
            time: _nowTime
          })
        } else {
          that.setData({
            time
          })
        }
      }
    })
  },

  // 获取数据
  getData() {
    let that = this;
    let time = this.data.time;
    let _url = this.data._url;
    wx.showLoading({
      title: '文章加载中...',
    });
    wx.request({
      url: `https://interface.meiriyiwen.com/article/day?dev=1&date=${time}`,
      success(res) {
        wx.hideLoading();
        let data = res.data.data;
        let _content = data.content; // 内容
        _content = _content.replace(/<\/p>/g, '\n');
        _content = _content.replace(/<p>/g, '\t\t\t');
        let a = time.substring(0, 4);
        let b = time.substring(4, 6);
        let c = time.substring(6, 8);
        let _showTime = a + '-' + b + '-' + c;
        that.setData({
          isAllShow: false,
          title: data.title,
          author: data.author,
          wc: data.wc,
          content: _content,
          timeList: data.date,
          showTime: _showTime
        })
      }
    })
  },

  // 点击选择昨天今天
  clickTime(e) {
    let that = this;
    let time = this.data.time;
    let nowTime = this.data.nowTime;
    let timeList = this.data.timeList;
    let prev = e.currentTarget.dataset.time;
    let next = e.currentTarget.dataset.time;
    console.log(timeList)
    if (prev == 'prev') {
      that.setData({
        time: timeList.prev
      })
    } else if(next == 'next') {
      console.log(timeList.next,nowTime)
      if (parseInt(timeList.next) > parseInt(nowTime)) {
        timeList.next = nowTime
      } else {
        timeList.next = timeList.curr
      }
      that.setData({
        time: timeList.next
      })
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
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let time = this.data.time
    let that = this;
    let timeStamp = this.data.timeStamp;
    setTimeout(function () {
      that.getData();
    }, 1000)
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