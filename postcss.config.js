module.exports = {
  plugins: {
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    'postcss-pxtorem': {
      // 表示根元素字体大小，它会根据根元素大小进行单位转换
      rootValue: 37.5,
      // 用来设定可以从 px 转为 rem 的属性
      // * 就是所有属性都要转换，width 就是仅转换 width 属性
      // 例如： width:10px; => width:xxrem
      propList: ['*']
    }
  }
}
