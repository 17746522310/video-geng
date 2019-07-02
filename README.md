# video-geng
只是一个关于短视频内容平台
该项目主要功能短视频列表，视频详情，用户评论，用户收藏/取消收藏，搜索视频，登录/退出登录，用户信息，我的收藏列表等功能

＃技术栈
====
（1）的Vue的公司：用于构建用户界面的MVVM框架它的核心是响应的数据绑定和组件系统<br>

（2）VUE路由器：为单页面应用提供的路由系统<br>
 (3)vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷<br>
 (4)better-scroll：iscroll 的优化版，使移动端滑动体验更加流畅<br>
（5）LESS css预编译处理器<br>
（6）AXIOS：服务端通讯，获取数据<br>
（7）VUE-CLI：Vue的的脚手架工具，快速搭建项目<BR>

页面实现
====
首页AXIOS获取数据，并使用第三方库> better-scroll辅助实现页面的上拉加载更多效果
*为了更好的用户体检，当数据未请求到时，显示加载组件
*详情页：通过AXIOS获取数据，用vuex管理用户是否登录状态，判断用户是否可以收藏与评论
*搜索页：对搜索历史进行了> sessionStorage缓存，清空搜索历史使用了确认组件
