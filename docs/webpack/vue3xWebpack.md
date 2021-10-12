<!--
 * @Author: lcz
 * @Date: 2021-06-11 17:38:36
 * @LastEditTime: 2021-10-12 17:23:34
 * @LastEditors: Please set LastEditors
 * @Description: webpack5.x封装
 * @FilePath: \lcz_document\docs\webpack\vue3xWebpack.md
-->


## vue3.x + webpack 2021-06-01
```js
const path = require('path')
// 分析包内容
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = (dir) => path.join(__dirname, dir)

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

const assetsCDN = {
  // webpack build externals
  // npm ls pagejson中的包名查看版本  key pageJSON中的key  value为cdn中export的模块
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    vant: 'vant',
    axios: 'axios',
  },
  css: ['https://cdn.bootcdn.net/ajax/libs/vant/3.0.7/index.min.css'],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    'https://unpkg.com/vue@3.0.1/dist/vue.global.js',
    'https://unpkg.com/vue-router@4.0.8/dist/vue-router.global.js',
    'https://unpkg.com/vuex@4.0.1/dist/vuex.global.js',
    'https://unpkg.com/vant@3.0.17/lib/vant.min.js',
    'https://unpkg.com/axios@0.21.1/dist/axios.min.js',
  ],
}

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_DOMAIN : './',
  outputDir: 'dist',
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  productionSourceMap: !IS_PROD, // 生产环境是否生成 sourceMap 文件
  parallel: require('os').cpus().length > 1, //多线程引用babel解析
  css: {
    extract: IS_PROD,
    sourceMap: !IS_PROD,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "@scss/variables.scss";
          @import "@scss/mixin.scss";
          $src: "${process.env.VUE_APP_OSS_SRC}";
        `,
      },
    },
  },
  configureWebpack: (config) => {
    //忽略打包文件
    config.externals = IS_PROD ? assetsCDN.externals : {}
    // externals: IS_PROD ? assetsCDN.externals : {}
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@utils', resolve('src/utils'))
      .set('@store', resolve('src/store'))
      .set('@router', resolve('src/router'))
      .set('@components', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
      .set('@scss', resolve('src/assets/scss'))
      .set('@directive', resolve('src/directive'))
    //打包模块分析test 包
    if (IS_PROD && process.env.VUE_APP_BUILD_SEE_SIZE == 'true') {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ])
    }
    //CND
    if (IS_PROD) {
      config.plugin('html').tap((args) => {
        // html中添加cdn
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  // webpack配置
  devServer: {
    disableHostCheck: true,
    // development server port 8000
    // host: '0.0.0.0',
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/test': {
        target: 'http://api.chuangyeyun.weixue.ltd',
        changeOrigin: true,
        pathRewrite: {
          '^/test': '',
        },
      },
    },
  },
}
```