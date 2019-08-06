const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        img: `${app.globalData.mwPicUrl}/p1524359776.jpg`,
        id: 1866479
      },
      {
        img: `${app.globalData.mwPicUrl}/p2237747953.jpg`,
        id: 10741834
      },
      {
        img: `${app.globalData.mwPicUrl}/p2517753454.jpg`,
        id: 24773958
      },
      {
        img: `${app.globalData.mwPicUrl}/p2552058346.jpg`,
        id: 26100958
      },
    ], // 轮播图效果
    indicatorDots: true,
    autoplay: true,
    circular: false, // 是否衔接
    interval: 5000, // 自动切换
    duration: 500, // 过渡时间
    vertical: false, // 纵向
    avengersList: [
      {
        time: 2008,
        list: [
          { id: '1432146', image: `${app.globalData.mwPicUrl}/p725871004.jpg`, title: '钢铁侠', en_title: 'Iron Man', genres: ['动作', '科幻', '冒险'], durations: '126分钟', rating: '8.2' },
          { id: '1866475', image: `${app.globalData.mwPicUrl}/p916263375.jpg`, title: '无敌浩克', en_title: 'The Incredible Hulk', genres: ['动作', '科幻', '惊悚'], durations: '112分钟', rating: '7' },
        ]
      },
      {
        time: 2010,
        list: [
          { id: '3066739', image: `${app.globalData.mwPicUrl}/p451885601.jpg`, title: '钢铁侠2', en_title: 'Iron Man 2', genres: ['动作', '科幻', '冒险'], durations: '124分钟', rating: '7.6' },
        ]
      },
      {
        time: 2011,
        list: [
          { id: '1866471', image: `${app.globalData.mwPicUrl}/p2159068249.jpg`, title: '雷神', en_title: 'Thor', genres: ['动作', '冒险', '奇幻'], durations: '115分钟', rating: '7' },
          { id: '2138838', image: `${app.globalData.mwPicUrl}/p1075448129.jpg`, title: '美国队长', en_title: 'Captain America: The First Avenger', genres: ['动作', '科幻', '冒险'], durations: '124分钟', rating: '7' },
        ]
      },
      {
        time: 2012,
        list: [
          { id: '1866479', image: `${app.globalData.mwPicUrl}/p1524359776.jpg`, title: '复仇者联盟', en_title: 'The Avengers', genres: ['动作', '科幻', '奇幻'], durations: '142分钟', rating: '8.2' },
        ]
      },
      {
        time: 2013,
        list: [
          { id: '3231742', image: `${app.globalData.mwPicUrl}/p1955027201.jpg`, title: '钢铁侠3', en_title: 'Iron Man 3', genres: ['动作', '科幻'], durations: '134分钟', rating: '7.8' },
          { id: '6560058', image: `${app.globalData.mwPicUrl}/p2156839164.jpg`, title: '雷神2：黑暗世界', en_title: 'Thor: The Dark World', genres: ['动作', '冒险', '奇幻'], durations: '112分钟', rating: '7.4' },
        ]
      },
      {
        time: 2014,
        list: [
          { id: '6390823', image: `${app.globalData.mwPicUrl}/p2174824694.jpg`, title: '美国队长2：冬日战士', en_title: 'Captain America: The Winter Soldier', genres: ['动作', '科幻', '冒险'], durations: '136分钟', rating: '8' },
          { id: '7065154', image: `${app.globalData.mwPicUrl}/p2198455702.jpg`, title: '银河护卫队', en_title: 'Guardians of the Galaxy', genres: ['动作', '科幻', '奇幻'], durations: '121分钟', rating: '8.1' },
        ]
      },
      {
        time: 2015,
        list: [
          { id: '10741834', image: `${app.globalData.mwPicUrl}/p2237747953.jpg`, title: '复仇者联盟2：奥创纪元', en_title: 'Avengers: Age of Ultron', genres: ['动作', '科幻', '奇幻'], durations: '142分钟', rating: '7.4' },
          { id: '1866473', image: `${app.globalData.mwPicUrl}/p2266823371.jpg`, title: '蚁人', en_title: 'Ant-Man', genres: ['动作', '科幻', '冒险'], durations: '117分钟', rating: '7.7' },
        ]
      },
      {
        time: 2016,
        list: [
          { id: '25820460', image: `${app.globalData.mwPicUrl}/p2332503406.jpg`, title: '美国队长3：内战', en_title: 'Captain America: Civil War', genres: ['动作', '科幻', '冒险'], durations: '148分钟', rating: '7.8' },
          { id: '3025375', image: `${app.globalData.mwPicUrl}/p2388501883.jpg`, title: '奇异博士', en_title: 'Doctor Strange', genres: ['动作', '冒险', '奇幻'], durations: '115分钟', rating: '7.6' },
        ]
      },
      {
        time: 2017,
        list: [
          { id: '25937854', image: `${app.globalData.mwPicUrl}/p2455261804.jpg`, title: '银河护卫队2', en_title: 'Guardians of the Galaxy Vol. 2', genres: ['动作', '科幻', '冒险'], durations: '136分钟', rating: '8' },
          { id: '24753477', image: `${app.globalData.mwPicUrl}/p2497756471.jpg`, title: '蜘蛛侠：英雄归来', en_title: 'Spider-Man: Homecoming', genres: ['动作', '科幻', '奇幻'], durations: '133分钟', rating: '7.4' },
          { id: '25821634', image: `${app.globalData.mwPicUrl}/p2500451074.jpg`, title: '雷神3：诸神黄昏', en_title: 'Thor: Ragnarok', genres: ['动作', '冒险', '奇幻'], durations: '130分钟', rating: '7.4' },
        ]
      },
      {
        time: 2018,
        list: [
          { id: '6390825', image: `${app.globalData.mwPicUrl}/p2512123434.jpg`, title: '黑豹', en_title: 'Black Panther', genres: ['动作', '科幻', '冒险'], durations: '134分钟', rating: '6.5' },
          { id: '24773958', image: `${app.globalData.mwPicUrl}/p2517753454.jpg`, title: '复仇者联盟3：无限战争', en_title: 'Avengers: Infinity War', genres: ['动作', '科幻', '奇幻'], durations: '149分钟', rating: '8.1' },
          { id: '26636712', image: `${app.globalData.mwPicUrl}/p2529389608.jpg`, title: '蚁人2：黄蜂女现身', en_title: '117分钟', genres: ['动作', '科幻', '冒险'], durations: '118分钟', rating: '7.3' },
        ]
      },
      {
        time: 2019,
        list: [
          { id: '26213252', image: `${app.globalData.mwPicUrl}/p2548870813.jpg`, title: '惊奇队长', en_title: 'Captain Marvel', genres: ['动作', '科幻', '冒险'], durations: '124分钟', rating: '6.9' },
          { id: '26100958', image: `${app.globalData.mwPicUrl}/p2552058346.jpg`, title: '复仇者联盟4：终局之战', en_title: 'Avengers: Endgame', genres: ['动作', '科幻', '奇幻'], durations: '181分钟', rating: '8.6' },
        ]
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let _path = '/pages/video/index/index';
    let _imageUrl = `${app.globalData.mwPicUrl}/p2552058346.jpg`
    return {
      title: 'Avengers',
      path: _path,
      imageUrl: _imageUrl,
    }
  }
})