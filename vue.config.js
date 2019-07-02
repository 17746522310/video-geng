const proxy = require('http-proxy-middleware');
module.exports= {
    // publicPath  type:{string} default:'/' 
    // 部署应用包时的基本 URL
    // 部署应用包时的基本 URL
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。

    publicPath: process.env.NODE_ENV === 'production' ? '/video-geng/' : '/',

    // outputDir: 当运行 vue-cli-service build 时生成的生产环境构建文件的目录(type:string, default:'dist')。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。在npm run build时 生成文件的目录 type:string, default:'dist'

    outputDir: 'dist',

    // pages:{ type:Object,Default:undfind } 
    /*
      构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
      个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
      的字符串，
      注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
    */
    // pages: {
    // index: {
    // entry for the page
    // entry: 'src/index/main.js',
    // the source template
    // template: 'public/index.html',
    // output as dist/index.html
    // filename: 'index.html'
    // },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
    // },

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: false,

    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,

    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项

    devServer: {
        port: 8090, // 端口号
        host: '192.168.2.233',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: 'https://www.ruyutrip.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' 
                    //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
                    //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
                    // https://www.ruyutrip.com/wp/visa/index
                }
            },
            '/foo': {
                target: '<other_url>'
            }
        },  // 配置多个代理
    },

    css: {
      loaderOptions: {
        stylus: {
          'resolve url': true,
          'import': [
            './src/theme'
          ]
        }
      }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
}
