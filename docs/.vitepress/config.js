import sidebar from "./sidebar"

export default {
  base: '/manual/',
  lang: 'zh-CN',
  title: 'Home',
  titleTemplate: 'Notes',
  description: 'notes，一个记录的地方',

  themeConfig: {

    siteTitle: '一个记录的地方',
    outline: 'deep',
    outlineTitle: '导航目录',
    lastUpdatedText: 'Last updated',

    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/ecmascript/JS变量提升', activeMatch: '/notes/' },
      { text: '工具站点', link: '/links' }
    ],

    sidebar: {
      '/notes/': sidebar,
      '/links/': { text: '常用链接', link: '/links' }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bohecola' }
    ],

    footer: {
      message: '一些日常记录',
      copyright: 'Copyright © 2022-present bohecola'
    },

    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    }
  },
  lastUpdated: true
}