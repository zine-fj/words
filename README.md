# 个人小程序
>素商  

[二维码](https://zine-fj.github.io/images/xcx.png)
## 豆瓣电影
```shell
let dbUrl = https://api.douban.com
// 如不可用，可改为：
let dbUrl = https://douban.uieee.com
```
1、参数说明
```shell
// 正在上映，前 10 部电影，城市如不选，默认北京
${dbUrl}/v2/movie/in_theaters?start=0&count=10&city=${city}
```
2、正在上映：
```shell
${dbUrl}/v2/movie/in_theaters
```
3、即将上映：
```shell
${dbUrl}/v2/movie/coming_soon
```
4、新片榜：
```shell
${dbUrl}/v2/movie/new_movies
```
5、前250电影
```shell
${dbUrl}/v2/movie/top250
```
6、搜索：
```shell
// 名称搜索，电影名、演员名
${dbUrl}/v2/movie/search?q=${name}
// 类型搜索
${dbUrl}/v2/movie/search?tag=${name}
```
7、详情：
```shell
https://api.douban.com/v2/movie/subject/${id}
```

## 每日一文
```shell
let wordUrl = https://interface.meiriyiwen.com
```
1、每日一文
```shell
${wordUrl}/article/today?dev=1
```
2、特定某一天
```shell
${wordUrl}/article/day?dev=1&date=20170216
```
3、随机某一天
```shell
${wordUrl}/article/random?dev=1
```
