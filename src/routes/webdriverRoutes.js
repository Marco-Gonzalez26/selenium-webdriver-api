const { createWebDriverSession } = require('../services/webdriverService.js')
const express = require('express')
const { scraper } = require('../services/scrape')
const axios = require('axios')

const router = express.Router()

router.post('/session', async (req, res) => {
  console.log('POST /session')
  try {
    const result = await createWebDriverSession()
    console.log({ result })
    if (result.success) {
      res.status(201).json({
        status: 'success',
        sessionId: result.sessionId
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: result.error
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

router.get('/scrape', async (req, res) => {
  console.log('GET /scrape')
  return await scraper()
})

router.post('/multilogin', async (req, res) => {
  console.log('POST /multilogin')
  try {
    const response = await axios.post(
      'https://launcher.mlx.yt:45001/api/v1/cookie_import',
      {
        profile_id: '2163929a-896b-4838-92b7-683ac19afb98',
        folder_id: 'c2f668e4-5da2-4a4e-b8f3-522f951bb674',
        import_advanced_cookies: true
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJicGRzLmJ1Y2tldCI6Im1seC1icGRzLXByb2QtZXUtMSIsIm1hY2hpbmVJRCI6IiIsInByb2R1Y3RJRCI6IiIsIndvcmtzcGFjZVJvbGUiOiJvd25lciIsInZlcmlmaWVkIjp0cnVlLCJwbGFuTmFtZSI6IlNvbG8gKE1vbnRobHkpIiwic2hhcmRJRCI6ImNiZTEzODAwLWJiYWYtNGM4Zi04MGIzLTE5N2Y4OTYzOTRmMiIsInVzZXJJRCI6IjYxMzQxMWRlLWExODgtNDE3OS05YzlhLTNkZjk0MTM3YTFmOCIsImVtYWlsIjoiYWxnaGFtZGltbzg5QGdtYWlsLmNvbSIsImlzQXV0b21hdGlvbiI6ZmFsc2UsIndvcmtzcGFjZUlEIjoiYzJmNjY4ZTQtNWRhMi00YTRlLWI4ZjMtNTIyZjk1MWJiNjc0IiwianRpIjoiYTQ1YTNmOWItM2FmNy00OGQ4LTk0YjQtYTVlZmUwZmYwNTdjIiwic3ViIjoiTUxYIiwiaXNzIjoiNjEzNDExZGUtYTE4OC00MTc5LTljOWEtM2RmOTQxMzdhMWY4IiwiaWF0IjoxNzMzODQ2MjkyLCJleHAiOjE3MzM4NDk4OTJ9.WVzjP-DIBuWmmMBdhmetvpaiKt9PZzXAi4Pfsm63NFCGUJ_zRB_w-94Ul-2ETfOrSfzfdMxGpAeTzF9vmUz1SQ'
        }
      }
    )
    const data = await response.json()
    console.log({ data: data.data })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
