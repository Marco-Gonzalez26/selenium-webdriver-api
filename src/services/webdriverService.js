// import { Builder } from 'selenium-webdriver'
// import { getProxyUrl } from '../config/webdriver.config'
// import proxy from 'selenium-webdriver/proxy'

const { Builder, Capabilities } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const proxy = require('selenium-webdriver/proxy')
/*
https://brd-customer-hl_83865ada-zone-residential_proxy1:hk3qi2shlu97@brd.superproxy.io:33335
*/
async function createWebDriverSession() {
  // const proxy = {
  //   proxyType: 'manual',
  //   httpProxy: 'brd.superproxy.io:33335',
  //   sslProxy: 'brd.superproxy.io:33335'
  // }

  try {
    const capabilities = Capabilities.firefox()

    capabilities.setProxy(
      proxy.manual({
        http: 'gate.smartproxy.com:10001',
        https: 'gate.smartproxy.com:10001'
      })
    )

    const driver = await new Builder()
      .usingServer('http://207.148.19.206:4444/wd/hub')
      .forBrowser('firefox')
      .withCapabilities(capabilities)
      .build()

    const session = await driver.getSession()

    await driver.get(
      'http://spsmb6cjsp:X6Ja0gjclV~y9Oq7yg@gate.smartproxy.com:10001@accounts.google.com/signup'
    )
    await driver.sleep(8000)
    await driver.takeScreenshot().then(function (image, err) {
      require('fs').writeFile('out.png', image, 'base64', function (err) {
        console.log(err)
      })
    })

    // get page source
    const pageSource = await driver.getPageSource()
    console.log({ pageSource })

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

const phoneInput = document.querySelector(
  'input[name*="sms"], input[id*="reg-sms-button"], ' +
    'input[name*="phone"], input[placeholder*="phone"], input[id*="phone"], ' +
    'input[name*="mobile"], input[placeholder*="mobile"], input[id*="mobile"], ' +
    'input[name*="contact"], input[placeholder*="contact"], input[id*="contact"], ' +
    'input[name*="tel"], input[placeholder*="tel"], input[id*="tel"]'
)

const nextButton =
  document.getElementById('reg-sms-button') ||
  Array.from(document.querySelectorAll('button')).find(
    (btn) =>
      btn.textContent.toLowerCase().includes('next') ||
      btn.textContent.toLowerCase() === 'get code by text'
  )
setTimeout(() => {
  const nextButton =
    document.getElementById('reg-sms-button') ||
    Array.from(document.querySelectorAll('button')).find(
      (btn) =>
        btn.textContent.toLowerCase().includes('next') ||
        btn.textContent.toLowerCase() === 'get code by text'
    )
  if (nextButton) {
    nextButton.click()
    const divs = document.querySelectorAll('div')
    isUsedTooManyTimes = divs.some((el) =>
      el.innerText
        .toLowerCase()
        .includes('this phone number has been used too many times')
    )
  } else {
    console.error('Next button not found')
  }
}, 2000)
