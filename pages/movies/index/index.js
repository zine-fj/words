// pages/movies/index/index.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrowrightImg: '../../../images/arrowright.png',
    imgUrls: [{
      title: '', // 电影名
      average: '', // 评分
      year: '', // 上映年
      img: '', // 图片
    }], // 轮播图效果
    indicatorDots: true,
    autoplay: true,
    circular: false, // 是否衔接
    interval: 5000, // 自动切换
    duration: 1000, // 过渡时间
    moviesType: [{
        title: '',
        id: 'in_theaters',
        cont: [],
      },
      {
        title: '',
        id: 'coming_soon',
        cont: [],
      },
      {
        title: '',
        id: 'new_movies',
        cont: [],
      },
      {
        title: '',
        id: 'top250',
        cont: [],
      },
    ],
    city: '',
    isMovieTypeShow: true, // 默认显示
    isTypeFocus: false, //侧滑出现时是否自动获取焦点,默认否
    getType: '', // 当前选择的type
  },

  // 版本更新
  getUpdate() {
    //检查是否存在新版本
    wx.getUpdateManager().onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) { //如果有新版本
        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function() { //当新版本下载完成，会进行回调
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                wx.getUpdateManager().applyUpdate();
              }
            }
          })
        })

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateFailed(function() { //当新版本下载失败，会进行回调
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
          })
        })
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.getUpdate();
    // 获取当前城市 暂无合适地址，先注释
    util.getLocation().then((suc) => {
      util.getCity(suc.latitude, suc.longitude).then((suc) => {
        let city = suc.data.result.addressComponent.city.replace('市', '');
        that.getMovies(city);
        that.setData({
          city: city
        })
      })
    }).catch((err) => {
      that.getMovies('北京');
    })
    // 获取电影类型
    that.setData({
      movieList: app.globalData.movieList
    });


  },

  // 获取电影
  getMovies(city) {
    let that = this;
    let moviesType = this.data.moviesType;
    let imgUrls = this.data.imgUrls;
    wx.showLoading({
      title: '努力加载中...'
    });
    util.myRequest({
      url: 'movie/in_theaters',
      success(res) {
        if (!res.data.subjects) {
          wx.hideLoading({});
          wx.showModal({
            title: '服务器不稳定',
            content: '将跳转到我的页面',
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              }
            }
          })
        } else {
          moviesType.forEach((item, index) => {
            let url = `movie/${item.id}?start=0&count=10&city=${city}`;
            util.myRequest({
              url: url,
              success(res) {
                wx.hideLoading({});
                moviesType[index].title = res.data.title;
                moviesType[index].cont = res.data.subjects;
                that.setData({
                  moviesType,
                });
                if (item.id == 'in_theaters') {
                  let _imgUrls = [];
                  for (let i = 0; i < 4; i++) {
                    let theInfo = moviesType[0].cont[i];
                    _imgUrls.push(theInfo)
                  }
                  that.setData({
                    imgUrls: _imgUrls,
                  });
                }
                
              }
            })
          })
        }
      }
    })

  },
  // 输入时，下方按钮重置
  bindInput() {
    this.setData({
      getType: '',
    })
  },
  // 点击手机完成按钮
  bindSearch(e) {
    console.log(e);
    let type = e.detail.value;
    this.getSearch('q', type)
  },
  // 跳转到搜索列表页面
  getSearch(type, param) {
    wx.navigateTo({
      url: `../list/list?id=search&searchType=${type}&searchId=${param}`,
    })
  },
  // 选择类型
  bindMovieType(e) {
    let type = e.currentTarget.dataset.id;
    this.getSearch('tag', type)
    this.setData({
      getType: type
    })
  },
  // 侧滑
  movieTypeShow() {
    let that = this;
    let _isMovieTypeShow = this.data.isMovieTypeShow;
    that.setData({
      isMovieTypeShow: !_isMovieTypeShow,
      isTypeFocus: true,
    })
  },
  // 侧滑消失
  cancel() {
    this.setData({
      isMovieTypeShow: true,
      isTypeFocus: false,
      getType: '',
    })
  },

  // 跳转到不同的列表页面
  toMovie(e) {
    let id = e.currentTarget.dataset.id;
    let city = this.data.city;
    wx.navigateTo({
      url: `../list/list?id=${id}&city=${city}`,
    })
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
    let _path = '/pages/movies/index/index';
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