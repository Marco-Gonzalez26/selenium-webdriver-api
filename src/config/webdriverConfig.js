const proxyChain = require('proxy-chain')

require('dotenv').config()
const PROXY_USERNAME = 'brd-customer-hl_83865ada-zone-residential_proxy1'
const PROXY_PASSWORD = 'hk3qi2shlu97'
const PROXY_HOST = 'brd.superproxy.io'
const PROXY_PORT = 33335
const PROXY_URL = `http://${PROXY_USERNAME}:${PROXY_PASSWORD}@${PROXY_HOST}:${PROXY_PORT}`
// brd-customer-hl_83865ada-zone-residential_proxy1:hk3qi2shlu97@:33335
async function getProxyUrl() {
  const anonymizedProxy = await proxyChain.anonymizeProxy(PROXY_URL)
  const parsedProxy = new URL(anonymizedProxy)

  const anonymizedProxyHost = parsedProxy.hostname
  const anonymizedProxyPort = parsedProxy.port

  const anonymizedProxyUrl = `${anonymizedProxyHost}:${anonymizedProxyPort}`
  return await anonymizedProxyUrl
}

module.exports = {
  getProxyUrl
}
