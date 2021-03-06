//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    version: '2.2.0',
    vName: '素商',
    userInfo: null,
    movieUrl: 'https://douban.uieee.com/v2/',
    wordsUrl: 'https://interface.meiriyiwen.com/',
    eyeUrl: 'https://baobab.kaiyanapp.com/',
    mwPicUrl: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public', // 漫威图片地址
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
    },{
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
    },{
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
    
  }
})