# video-geng
只是一个关于短视频内容平台
该项目主要功能短视频列表，视频详情，用户评论，用户收藏/取消收藏，搜索视频，登录/退出登录，用户信息，我的收藏列表等功能

＃技术栈
====
* Vue: 用于构建用户界面的MVVM框架它的核心是响应的数据绑定和组件系统<br><br>
* VUE路由器：为单页面应用提供的路由系统<br><br>
* vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷<br><br>
* better-scroll：iscroll 的优化版，使移动端滑动体验更加流畅<br><br>
* LESS: css预编译处理器<br><br>
* AXIOS：服务端通讯，获取数据<br><br>
* VUE-CLI：Vue的的脚手架工具，快速搭建项目<br>

页面实现
====

*首页AXIOS获取数据，并使用第三方库> better-scroll辅助实现页面的上拉加载更多效果<br><br>
*为了更好的用户体检，当数据未请求到时，显示加载组件<br><br>
*详情页：通过AXIOS获取数据，用vuex管理用户是否登录状态，判断用户是否可以收藏与评论,如果未登录使用toast组件提示并跳转到登录页面<br><br>
*搜索页：对搜索历史进行了> sessionStorage缓存，清空搜索历史使用了确认组件<br><br>
*个人中心页：根据vuex用户登录状态，判断是否显示用户信息和未登录提示<br><br>
*登录页：使用了cube-ui的input组件来显示密码的不可见，当用户登录成功返回上一页<br><br>

其他
====
  全局引入 fastclick 库，消除 click 移动浏览器300ms延迟<br><br>
  页面是响应式的，适配常见的移动端屏幕，采用 flex 布局

安装与运行
====
    
  git clone https://github.com/17746522310/video-geng.git <br><br>
  cd video-geng <br><br>
  npm install //安装依赖 <br><br>
  npm run serve //服务端运行 访问 http://localhost:8090 <br><br>
  npm run build  //项目打包

项目地址
====
http://api.joybike.com.cn/video-geng/
（如果您使用电脑查看，请使用谷歌模拟移动端查看）
