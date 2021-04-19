
//配置别名
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      },
    }
  }
}
//vue3写法
// const path = require('path')
// function resolve(dir) {
//  return path.join(__dirname, dir)
// }
// module.exports = {
//  lintOnSave: true,
//  chainWebpack: config => {
//   config.resolve.alias
//    .set('@', resolve('src'))
//    .set('assets', resolve('src/assets'))
//    .set('components', resolve('src/components'))
//  }
// }




