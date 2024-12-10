// import { Builder } from 'selenium-webdriver'
// import { getProxyUrl } from '../config/webdriver.config'
// import proxy from 'selenium-webdriver/proxy'
const firefox = require('selenium-webdriver/firefox')
const { Builder } = require('selenium-webdriver')
const { getProxyUrl } = require('../config/webdriverConfig.js')
const proxy = require('selenium-webdriver/proxy')

async function createWebDriverSession() {
  try {
    const anonymizedProxy = await getProxyUrl()
    const newProxyString = '199.102.107.145:4145'
    const driver = await new Builder()
      .forBrowser('firefox')
      .usingServer('http://45.76.164.130:4444')
      .setProxy(
        proxy.manual({
          http: newProxyString,
          https: newProxyString
        })
      )

      .build()

    await driver.get('https://react.dev')
    await driver.sleep(1000)
    const title = await driver.getTitle()
    console.log({ title })

    return {
      success: true,
      sessionId: await driver.getSession().toJSON(),
      driver
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

module.exports = {
  createWebDriverSession
}
