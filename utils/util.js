const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 自己封装的请求函数
const myRequest = (options) => {
  let domain = 'https://douban.uieee.com/v2/';
  // let domain = 'https://api.douban.com/v2/';

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

const getUserInfo = ()=>{
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}

const getLocation = (type)=>{
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    })
  })
}

// 获取城市
const getCity = (latitude, longitude) => {
  let mapUrl = `http://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=XVLBZ-BSU66-ULJSQ-MFGXD-TM7GZ-55F2M&get_poi=1`;
  return new Promise((resolve,reject)=>{
    wx.request({
      url: mapUrl,
      success: resolve,
      fail: reject
    })
  })
}


module.exports = {
  formatTime: formatTime,
  myRequest: myRequest,
  getCity,
  getLocation,
  getUserInfo,
}