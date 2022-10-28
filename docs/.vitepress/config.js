import sidebar from "./sidebar"

export default {
  lang: 'zh-CN',
  title: '首页',
  titleTemplate: '在线笔记',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  description: '个人学习笔记',

  themeConfig: {
    siteTitle: '在线笔记',
    outline: 'deep',
    outlineTitle: '目录',
    lastUpdatedText: 'Last updated',

    // 顶部导航
    nav: [
      // { text: '笔记', link: '/ecmascript/JS变量提升', activeMatch: '/' },
      { text: '工具站点', link: '/links', activeMatch: '/links' }
    ],

    // 侧边栏
    sidebar: {
      '/': sidebar,
      '/links/': { text: '常用链接', link: '/links' }
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bohecola' }
    ],

    // 底部
    footer: {
      message: '一些日常记录',
      copyright: 'Copyright © 2022-present bohecola'
    },

    // 上下翻页
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    }
  },
  lastUpdated: true
}