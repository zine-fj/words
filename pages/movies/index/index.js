// pages/movies/index/index.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrowrightImg: '../../../images/arrowright.png',
    imgUrls: [], // 轮播图效果
    indicatorDots: true,
    autoplay: true,
    circular: true, // 是否衔接
    interval: 5000, // 自动切换
    duration: 1000, // 过渡时间
    swiTitle: [],
    swiAvra: [],
    swiYear: [],
    search: '', // 搜索
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
        id: 'top250',
        cont: [],
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovies()
  },

  // 搜索
  inputSearch(e) {
    let search = this.data.search;
    this.setData({
      search: e
    })
  },
  getSearch() {
    let searchId = this.data.search.detail.value;
    wx.navigateTo({
      url: `../list/list?id=search&searchId=${searchId}`,
    })
  },

  // 获取电影
  getMovies() {
    let that = this;
    let moviesType = this.data.moviesType;
    let imgUrls = this.data.imgUrls;
    let swiTitle = this.data.swiTitle;
    let swiAvra = this.data.swiAvra;
    let swiYear = this.data.swiYear;
    wx.showLoading({
      title: '拼命加载中...'
    })

    // 正在热映
    util.myRequest({
      url: 'in_theaters?start=0&count=10',
      success(res) {
        moviesType[0].title = res.data.title;
        moviesType[0].cont = res.data.subjects;
        that.setData({
          moviesType,
        });
        wx.hideLoading({});
      }
    })
    // 即将上映
    util.myRequest({
      url: 'coming_soon?start=0&count=10',
      success(res) {
        let data = res.data.subjects;
        moviesType[1].title = res.data.title;
        moviesType[1].cont = res.data.subjects;
        that.setData({
          moviesType,
        });
        wx.hideLoading({});
      }
    })
    // top250
    util.myRequest({
      url: 'top250?start=0&count=10',
      success(res) {
        let data = res.data.subjects;
        // 轮播图
        for (let i = 0; i < 4; i++) {
          imgUrls.push(data[i].images.large);
          swiTitle.push(data[i].title)
          swiAvra.push(data[i].rating.average)
          swiYear.push(data[i].year)
        }
        moviesType[2].title = res.data.title;
        moviesType[2].cont = res.data.subjects;
        that.setData({
          moviesType,
          imgUrls,
          swiTitle,
          swiAvra,
          swiYear
        });
        wx.hideLoading({});
      }
    })
  },
  // 跳转到不同页面
  toMovie(e) {
    let id = e.currentTarget.dataset.id;
    this.navigateTo(id)
  },
  navigateTo(param) {
    wx.navigateTo({
      url: `../list/list?id=${param}`,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '豆瓣电影',
      path: 'pages/movies/index/index'
    }
  }
})