
const sidebar = [
  {
    text: 'EcmaScript',
    collapsible: true,
    items: [
      { text: 'JS变量提升', link: `/notes/ecmascript/JS变量提升` },
      { text: '方法重写', link: `/notes/ecmascript/方法重写` },
      { text: 'promise实现', link: `/notes/ecmascript/promise实现` },
      { text: '迭代器和生成器', link: `/notes/ecmascript/迭代器与生成器` },
      { text: '装饰器', link: `/notes/ecmascript/装饰器` },
      { text: 'proxy与defineProperty', link: `/notes/ecmascript/proxy与defineProperty` },
    ]
  },

  {
    text: 'NodeJS',
    collapsible: true,
    items: [
      { text: 'Node事件环', link: `/notes/nodejs/Node事件环` },
    ]
  },

  {
    text: '浏览器',
    collapsible: true,
    items: [
      { text: '浏览器事件环', link: `/notes/browser/浏览器事件环` },
    ]
  }
]

export default sidebar;

