const proxyChain = require('proxy-chain')

require('dotenv').config()
const PROXY_USERNAME = process.env.PROXY_USERNAME
const PROXY_PASSWORD = process.env.PROXY_PASSWORD
const PROXY_HOST = process.env.PROXY_HOST
const PROXY_PORT = 8080
const PROXY_URL = `http://${PROXY_USERNAME}:${PROXY_PASSWORD}@${PROXY_HOST}:${PROXY_PORT}`

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
