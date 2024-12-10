// import { Builder } from 'selenium-webdriver'
// import { getProxyUrl } from '../config/webdriver.config'
// import proxy from 'selenium-webdriver/proxy'

const { Builder, Capabilities } = require('selenium-webdriver')
const { getProxyUrl } = require('../config/webdriverConfig.js')
const proxy = require('selenium-webdriver/proxy')
let capabilities = new Capabilities()

async function createWebDriverSession() {
  try {
    const p = proxy.socks('199.102.107.145:4145')
    const anonymizedProxy = await getProxyUrl()
    const newProxyString = '199.102.107.145:4145'

    capabilities.setSoc
    const driver = await new Builder()
      .forBrowser('firefox')
      .usingServer('http://45.76.164.130:4444')
      .setProxy(
        proxy.manual({
          http: '166.0.234.253:41492',
          https: '166.0.234.253:41492'
        })
      )
      .build()

    const session = await driver.getSession()
    console.log('session', session)
    await driver.get('https://www.google.com')
    await driver.sleep(10000)
    return {
      success: true,
      sessionId: await session.id_,
      driver
    }
  } catch (error) {
    console.error('Error creating WebDriver session:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

module.exports = {
  createWebDriverSession
}
