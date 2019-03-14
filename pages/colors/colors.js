// pages/colors/colors.js
const theColor = require('../../utils/colors.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: [], // 所有颜色
    colorLogo: '../../images/colorLogo.png',
    rgba: '',
    colorName: '中国色',
    bg: '', // 小程序背景色
    mathNum: 0, // 随机数值 0 - 526
    touchStartTime: 0, // 触摸开始时间
    touchEndTime: 0, // 触摸结束时间
    lastTapTime: 0, // 最后一次单击事件点击发生时间
    lastTapTimeoutFunc: null, // 单击事件点击后要触发的函数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation = wx.createAnimation();
    this.theColors(options.color);
    this.poetryOpacity();
  },
  // 将颜色加是否收藏字段,默认false
  theColors(color) {
    let self = this;
    let colors = theColor.colors();
    let storageArr = wx.getStorageSync('colorsArr');
    if(color) {
      colors.forEach((item,index)=>{
        if(item.hex == color) {
          let _rgba = (item.RGB.join(',') + ',' + 1);
          self.setData({
            rgba: _rgba,
            mathNum: index
          })
          wx.setNavigationBarTitle({
            title: colors[index].name
          })
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: colors[index].hex,
          });
        }
      })
    } else {
      let mathNum = parseInt(Math.random() * 526);
      let _rgba = (colors[mathNum].RGB.join(',') + ',' + 1);
      console.log(colors[mathNum])
      self.setData({
        rgba: _rgba,
        mathNum: mathNum
      })
      wx.setNavigationBarTitle({
        title: colors[mathNum].name
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: colors[mathNum].hex,
      });
    }

    colors.forEach((item,index)=>{
      item.isCollection = false;
      if (storageArr) {
        storageArr.forEach((sItem, sIndex) => {
          if (item.hex == sItem.hex) {
            item.isCollection = sItem.isCollection;
          }
        })
      }
      
    })

    this.setData({
      colors
    })
    wx.hideLoading();
  },

  // 手指按下
  bindPoetryStart(e) {
    this.touchStartTime = e.timeStamp;

    this.animation.opacity(0).step();
    this.setData({
      poetryAnimat: this.animation.export()
    })
  },
  // 手指抬起
  bindPoetryEnd(e) {
    this.touchEndTime = e.timeStamp;
  },
  // 手指滑动
  bindPoetryMove(e) {
    this.poetryOpacity();
  },

  // 动画 字的显示
  poetryOpacity() {
    this.animation.opacity(1).step({ duration: 400 });
    this.setData({
      poetryAnimat: this.animation.export()
    })
  },

  // 触摸事件，判断单击还是双击
  bindPoetryTap(e) {
    let self = this;
    let colors = this.data.colors;
    // 控制点击事件在 350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if(self.touchEndTime - self.touchStartTime < 350) {
      // 当前点击时间
      let currentTime = e.timeStamp;
      let lastTapTime = self.lastTapTime;
      self.lastTapTime = currentTime;

      // 如果两次点击时间在300ms内，则认为是双击事件
      if(currentTime - lastTapTime < 300) {
        console.log('双击')
        self.catchCollection(e);
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(self.lastTapTimeoutFunc);
      } else {
        // 单击事件延迟 300ms 执行,这和最初的浏览器的点击300ms延时有点像
        self.lastTapTimeoutFunc = setTimeout(()=>{
          console.log('单击');
          let mathNum = parseInt(Math.random() * 526);
          colors.forEach((item, index) => {
            if (index == mathNum) {
              let _rgba = (item.RGB.join(',') + ',' + 1);
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
                mathNum,
                rgba: _rgba
              })
            }
          });

          this.poetryOpacity();
        },300)
      }
    }
  },

  // 长按
  longTap(e) {
    let self = this;
    console.log('长按');
    let id = e.currentTarget.dataset.id;
    let colors = this.data.colors;
    let _bg = colors[id].RGB.join(',') + ',' + 1;
    // console.log(_bg)
    this.poetryOpacity();
    wx.showModal({
      title: '提示',
      content: '是否将此颜色设置为您的小程序背景色',
      success(res) {
        if(res.confirm) {
          wx.setStorageSync('bg', _bg)
        }
      }
    })
  },

  // 点击 收藏 按钮
  catchCollection(e) {
    let self = this;
    let colors = this.data.colors;
    let id = e.currentTarget.dataset.id;
    id = id == "" ? 0 : id;
    console.log(id)
    let _isCollection = this.data.colors[id].isCollection;
    let colorsArr = wx.getStorageSync('colorsArr') || [];
    if (_isCollection == false) {
      let bool = "colors[" + id + "].isCollection";
      self.setData({
        [bool]: true
      })
      colorsArr.push(colors[id]);
    } else {
      let bool = "colors[" + id + "].isCollection";
      self.setData({
        [bool]: false
      })
      colorsArr.pop(colors[id]);
    }
    wx.setStorageSync('colorsArr', colorsArr);
    console.log(colorsArr)
    this.poetryOpacity();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation();
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