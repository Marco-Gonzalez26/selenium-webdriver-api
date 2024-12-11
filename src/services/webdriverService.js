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
    capabilities.setProxy()
    const driver = await new Builder()
      .forBrowser('chrome')
      .usingServer('http://45.76.164.130:4444')
      .setProxy(
        proxy.manual({
          http: 'http://brd-customer-hl_83865ada-zone-residential_proxy1:hk3qi2shlu97@brd.superproxy.io:33335',
          https:
            'https://brd-customer-hl_83865ada-zone-residential_proxy1:hk3qi2shlu97@brd.superproxy.io:33335'
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
