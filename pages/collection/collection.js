// pages/collection/collection.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
      name: '中国色',
      id: 'zgs'
    }, {
      name: '每日一文',
      id: 'mryw'
    }],
    videoCancelImg: '/images/close.png', 
    colorsArr: [], // 颜色列表
    nowNav: 'zgs', // 当前的列表
    wordsList: [], // 文章列表
    videosList: [], // 视频列表
    nowClickWord: -1, // 当前点击的小红心
    isNoCollec: true, // 是否暂无收藏，默认是
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

  // 点击navlist
  bindCollecNav(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      nowNav: id
    })
    if (id == 'mryw') {
      this.getWords();
    } else if (id == 'zgs') {
      this.getColorSync();
    }
  },

  // 获取每日一文
  getWords() {
    let self = this;
    let wordsArr = wx.getStorageSync('wordsArr');
    let wordsList = this.data.wordsList;
    let nowNav = this.data.nowNav;
    if (wordsArr) {
      wordsArr = wordsArr.reverse();
      let _isNoCollec;
      if (wordsArr.length > 0) {
        _isNoCollec = false;
      } else {
        _isNoCollec = true;
      }
      this.setData({
        wordsList: wordsArr,
        isNoCollec: _isNoCollec,
      })
    } else{
      this.setData({
        isNoCollec: true,
      })
    }
  },
  // 点击每日一文取消按钮
  bindWordsLove(e) {
    let self = this;
    let index = e.currentTarget.dataset.index;
    let wordsList = wx.getStorageSync('wordsArr');
    wordsList[wordsList.indexOf(wordsList[index])] = null;
    wordsList.splice(wordsList.indexOf(null), 1);
    this.setData({
      nowClickWord: index
    })

    this.animation.opacity(0).step({
      duration: 500
    });
    this.setData({
      animatWrod: this.animation.export()
    })
    this.animation.opacity(1).step();
    this.setData({
      animatWrodLove: this.animation.export()
    })
    console.log(wordsList)
    wx.setStorageSync('wordsArr', wordsList)
    setTimeout(() => {
      self.setData({
        wordsList,
        nowClickWord: -1,
      })

      let _isNoCollec;
      if (wordsList.length > 0) {
        _isNoCollec = false;
      } else {
        _isNoCollec = true;
      }
      this.setData({
        isNoCollec: _isNoCollec
      })

    }, 500)
  },
  // 点击收藏的文章
  bindWords(e) {
    let id = e.currentTarget.dataset.id;
    // 将日期2019 - 01 - 01变为20190101
    id = id.split('-').join('')
    console.log(id);
    wx.navigateTo({
      url: `/pages/words/words?id=${id}`,
    })
  },

  // 点击收藏的颜色
  bindColors(e) {
    let color = e.currentTarget.dataset.color;
    console.log(color);
    wx.navigateTo({
      url: `/pages/colors/colors?color=${color}`,
    })
  },

  // 暂无收藏去添加
  bindToAdd() {
    let nowNav = this.data.nowNav;
    console.log(nowNav)
    if (nowNav == 'zgs') {
      wx.navigateTo({
        url: '/pages/colors/colors',
      })
    } else if (nowNav == 'mryw') {
      wx.navigateTo({
        url: '/pages/words/words',
      })
    }
  },

  // 获取颜色
  getColorSync() {
    let _colorsArr = wx.getStorageSync('colorsArr');
    let _isNoCollec;
    console.log(_colorsArr)
    if (_colorsArr) {
      _colorsArr = _colorsArr.reverse();
      if (_colorsArr.length > 0) {
        _isNoCollec = false;
      } else {
        _isNoCollec = true;
      }
      // _colorsArr.forEach((item,index)=>{
      //   console.log(item.arr)
      //   if(item.arr) {
      //     item.arr = item.arr.reverse()
      //   }
      // })
      this.setData({
        colorsArr: _colorsArr,
        isNoCollec: _isNoCollec
      })
    } else {
      this.setData({
        isNoCollec: true
      })
    }

  },

  drawStart: function(e) {
    let _startX = e.changedTouches[0].clientX;
    let _startY = e.changedTouches[0].clientY;
    this.setData({
      startX: _startX,
      startY: _startY
    })
  },
  // 手指滑动
  drawMove: function(e) {
    let self = this;
    let colorsArr = self.data.colorsArr;
    let index = e.currentTarget.dataset.index; // 当前索引
    let startX = self.data.startX; // 开始X坐标
    let startY = self.data.startY; // 开始y坐标
    let touchMoveX = e.changedTouches[0].clientX; // 滑动变化坐标
    let touchMoveY = e.changedTouches[0].clientY; // 滑动变化坐标
    let angle = self.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
    colorsArr.forEach((item, i) => {
      item.isTouchMove = false;
      // 滑动超过 30°角 return
      if (Math.abs(angle) > 30) {
        return;
      }

      if (index == i) {
        if (touchMoveX > startX) { // 右滑
          item.isTouchMove = false;
        } else {
          item.isTouchMove = true;
        }
      }
    })

    // 更新数据
    self.setData({
      colorsArr: self.data.colorsArr
    })
  },
  // 角度
  angle(start, end) {
    let _X = end.X - start.X;
    let _Y = end.Y - start.Y;
    // 返回角度 Math.atan() 返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  // 中国色 取消按钮
  delItem: function(e) {
    let self = this;
    let id = e.currentTarget.dataset.id;
    let colorsArr = this.data.colorsArr;
    colorsArr[colorsArr.indexOf(colorsArr[id])] = null;
    colorsArr.splice(colorsArr.indexOf(null), 1);
    console.log(colorsArr);
    this.animation.opacity(0).step({
      duration: 500
    });
    this.setData({
      animat: this.animation.export()
    })
    wx.setStorageSync('colorsArr', colorsArr)
    setTimeout(() => {
      self.setData({
        colorsArr,
      })
      setTimeout(() => {
        this.animation.opacity(1).step();
        this.setData({
          animat: this.animation.export()
        })

        let _isNoCollec;
        if (colorsArr.length > 0) {
          _isNoCollec = false;
        } else {
          _isNoCollec = true;
        }
        this.setData({
          isNoCollec: _isNoCollec
        })
      }, 300)
    }, 500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let nowNav = this.data.nowNav;
    console.log(nowNav)
    if (nowNav == 'zgs') {
      this.getColorSync()
    } else if (nowNav == 'mryw') {
      this.getWords()
    }
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

  // 时间转换
  timeFormat(time) {
    let y = time.substring(0, 4);
    let m = time.substring(4, 6);
    let n = time.substring(6, 8);
    let endInfo = `${y}-${m}-${n}`
    return endInfo
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})