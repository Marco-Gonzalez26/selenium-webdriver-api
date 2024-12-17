const { Builder, By } = require('selenium-webdriver')
const proxyChain = require('proxy-chain')
const proxy = require('selenium-webdriver/proxy')
const fs = require('fs')
const path = require('path')
const chrome = require('selenium-webdriver/chrome')
require('dotenv').config()
async function scraper() {
  // define your proxy details
  const proxyUsername = process.env.PROXY_USERNAME
  const proxyPassword = process.env.PROXY_PASSWORD
  const ipHost = process.env.PROXY_HOST
  const port = process.env.PROXY_PORT
  const proxyUrl = `http://${proxyUsername}:${proxyPassword}@${ipHost}:${port}`

  // anonymize proxyUrl
  const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl)

  // parse anonymized proxy URL
  const parsedUrl = new URL(anonymizedProxy)

  // extract the host and port
  const proxyHost = parsedUrl.hostname
  const proxyPort = parsedUrl.port

  // construct the new proxy string
  const newProxyString = `${proxyHost}:${proxyPort}`

  // set the browser options

  // initialize the webdriver
  const driver = new Builder()
    .forBrowser('firefox')
    .usingServer('http://45.76.164.130:4445')
    // add the proxy to the webdriver
    .setProxy(
      proxy.manual({
        http: newProxyString,
        https: newProxyString
      })
    )
    .build()

  console.log({ driver, session: await driver.getSession() })
  try {
    // navigate to target website
    await driver.get('https://google.com')

    await driver.sleep(8000)

    // get the page text content
    const pageText = await driver.findElement(By.css('body')).getText()
    console.log(pageText)
  } catch (error) {
    console.error('An error occurred:', error)
  } finally {
    await driver.quit()

    // clean up, forcibly close all pending connections
    await proxyChain.closeAnonymizedProxy(newProxyString, true)
  }
}

module.exports = {
  scraper
}
