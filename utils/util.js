const app = getApp();

// 自己封装的请求函数
const myRequest = (options) => {
  let domain = app.globalData.movieUrl;
  options.header = {
    'content-type': 'application/xml'
  };
  options.method = 'GET';
  options.url = domain + options.url;
  let successCB = (res) => {
    successCB(res);
  };
  wx.request(options)
}

// 获取个人信息
const getUserInfo = ()=>{
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}
// 获取当前地址
const getLocation = (type)=>{
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    })
  })
}
// 加载
const showMsg = (msg)=>{
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1500,
    mask: true,
  })
}

// 获取城市
const getCity = (latitude, longitude) => {
  let mapUrl = `https://api.map.baidu.com/geocoder/v2/?location=${latitude},${longitude}&output=json&ak=B61195334f65b9e4d02ae75d24fa2c53`;
  return new Promise((resolve,reject)=>{
    wx.request({
      url: mapUrl,
      success: resolve,
      fail: reject
    })
  })
}

// 获取当前城市天气
const getWeather = (city) => {
  let weatherUrl = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=B61195334f65b9e4d02ae75d24fa2c53`;
  return new Promise((resolve, reject) => {
    wx.request({
      url: weatherUrl,
      success: resolve,
      fail: reject
    })
  })
}

// 当前时间
const nowTime = () => {
  let endInfo = {};
  let time = new Date();
  let nowY = time.getFullYear();
  let nowM = time.getMonth() + 1;
  nowM = nowM < 10 ? '0' + nowM : nowM;
  let nowD = time.getDate();
  nowD = nowD < 10 ? '0' + nowD : nowD;
  let nowH = time.getHours();
  nowH = nowH < 10 ? '0' + nowH : nowH;
  let nowMi = time.getMinutes();
  nowMi = nowMi < 10 ? '0' + nowMi : nowMi;
  let nowS = time.getSeconds();
  nowS = nowS < 10 ? '0' + nowS : nowS;
  let nowDay = time.getDay(); // 周几

  endInfo.nowY = nowY; // 年
  endInfo.nowM = nowM; // 月
  endInfo.nowD = nowD; // 日
  endInfo.nowH = nowH; // 时
  endInfo.nowMi = nowMi; // 分
  endInfo.nowS = nowS; // 秒
  endInfo.nowDay = nowDay; // 周几(0-6,周日-周六)
  endInfo.nows = Date.now(); // 毫秒数
  return endInfo;
}


module.exports = {
  myRequest: myRequest,
  getCity,
  getLocation,
  getWeather,
  getUserInfo,
  nowTime,
  showMsg,
}