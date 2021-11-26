import fs from 'fs-extra'
import { isDev, port, r } from '../scripts/utils'
import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 2,
    name: (pkg.displayName || pkg.name) + (isDev ? ' Dev' : ''),
    version: pkg.version,
    description: pkg.description,
    background: {
      page: './dist/background/index.html',
      persistent: false,
    },
    icons: {
      16: './assets/icon-512.png',
      48: './assets/icon-512.png',
      128: './assets/icon-512.png',
    },
    content_scripts: [
      {
        matches: ['https://web.okjike.com/*'],
        js: ['./dist/contentScripts/index.global.js'],
      },
    ],
    permissions: [],
    web_accessible_resources: ['dist/contentScripts/style.css'],
  }

  if (isDev) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('webNavigation')
    manifest.permissions?.push('https://web.okjike.com/*')

    // this is required on dev for Vite script to load
    manifest.content_security_policy = `script-src 'self' http://localhost:${port}; object-src 'self'`
  }

  return manifest
}
