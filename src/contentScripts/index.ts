/* eslint-disable no-console */
import { createApp } from 'vue'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import App from './views/App.vue'
;(() => {
  console.info('[vitesse-webext] Hello world from content script')

  // mount component to context window
  const container = document.createElement('div')
  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute(
    'href',
    browser.runtime.getURL('dist/contentScripts/style.css')
  )
  document.head.append(styleEl)
  document.body.append(container)
  createApp(App).mount(container)
})()
