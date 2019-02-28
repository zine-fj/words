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
    circular: false, // 是否衔接
    interval: 5000, // 自动切换
    duration: 1000, // 过渡时间
    swiTitle: [],
    swiAvra: [],
    swiYear: [],
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
    isMovieTypeShow: true, // 默认显示
    isTypeFocus: false, //侧滑出现时是否自动获取焦点,默认否
    getType: '', // 当前选择的type
    // 
    movieList: [{
      type: '类型',
      list: [{
        li: '剧情'
      },
      {
        li: '喜剧'
      },
      {
        li: '动作'
      },
      {
        li: '爱情'
      },
      {
        li: '科幻'
      },
      {
        li: '动画'
      },
      {
        li: '悬疑'
      },
      {
        li: '惊悚'
      },
      {
        li: '恐怖'
      },
      {
        li: '犯罪'
      },
      {
        li: '同性'
      },
      {
        li: '音乐'
      },
      {
        li: '歌舞'
      }, {
        li: '传记'
      },
      {
        li: '历史'
      }, {
        li: '战争'
      },
      {
        li: '西部'
      }, {
        li: '奇幻'
      },
      {
        li: '冒险'
      }, {
        li: '灾难'
      },
      {
        li: '武侠'
      }, {
        li: '情色'
      }
      ]
    },
    {
      type: '地区',
      list: [{
        li: '中国'
      }, {
        li: '大陆'
      }, {
        li: '美国'
      }, {
        li: '香港'
      }, {
        li: '台湾'
      }, {
        li: '日本'
      }, {
        li: '韩国'
      }, {
        li: '英国'
      }, {
        li: '法国'
      }, {
        li: '德国'
      }, {
        li: '意大利'
      }, {
        li: '西班牙'
      }, {
        li: '印度'
      }, {
        li: '泰国'
      }, {
        li: '俄罗斯'
      }, {
        li: '伊朗'
      }, {
        li: '加拿大'
      }, {
        li: '澳大利亚'
      }, {
        li: '瑞典'
      }, {
        li: '巴西'
      }, {
        li: '爱尔兰'
      }, {
        li: '丹麦'
      },]
    },
    {
      type: '年代',
      list: [{
        li: '2019'
      }, {
        li: '2018'
      }, {
        li: '2010年代'
      }, {
        li: '2000年代'
      }, {
        li: '90年代'
      }, {
        li: '80年代'
      }, {
        li: '70年代'
      }, {
        li: '60年代'
      }, {
        li: '更早'
      },]
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    util.getLocation().then((suc)=>{
      util.getCity(suc.latitude, suc.longitude).then((suc)=>{
        console.log(suc)
        let city = suc.data.result.ad_info.city.replace('市','');
        that.getMovies(city);
      })
    }).catch((err)=>{
      that.getMovies('北京');
    })
  },
  // 获取电影
  getMovies(city) {
    let that = this;
    let moviesType = this.data.moviesType;
    let imgUrls = this.data.imgUrls;
    let swiTitle = this.data.swiTitle;
    let swiAvra = this.data.swiAvra;
    let swiYear = this.data.swiYear;
    wx.showLoading({
      title: '拼命加载中...'
    });
    let urlNow = `movie/in_theaters?start=0&count=10&city=${city}`;
    let urlSoon = 'movie/coming_soon?start=0&count=10';
    let urlNew = 'movie/new_movies?start=0&count=10';
    let urltop250 = 'movie/top250?start=0&count=10';
    moviesType.forEach((item, index) => {
      let url = `movie/${item.id}?start=0&count=6&city=${city}`;
      util.myRequest({
        url: url,
        success(res) {
          moviesType[index].title = res.data.title;
          moviesType[index].cont = res.data.subjects;
          that.setData({
            moviesType,
          });

          if (item.id == 'in_theaters') {
            for (let i = 0; i < 4; i++) {
              imgUrls.push(moviesType[0].cont[i].images.large);
              swiTitle.push(moviesType[0].cont[i].title)
              swiAvra.push(moviesType[0].cont[i].rating.average)
              swiYear.push(moviesType[0].cont[i].year)
            }
            that.setData({
              imgUrls,
              swiTitle,
              swiAvra,
              swiYear
            });
          }
          wx.hideLoading({});
        }
      })
    })
  },
  bindSearch(e) {
    console.log(e);
    let type = e.detail.value;
    this.getSearch('q', type)
  },

  // 搜索
  getSearch(type,param) {
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
    wx.navigateTo({
      url: `../list/list?id=${id}`,
    })
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