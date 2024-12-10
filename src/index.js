// transfrom this to imports

const express = require('express')
const webdriverRoutes = require('./routes/webdriverRoutes.js')

const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())
app.get('/api', (req, res) => res.send('Express on Vercel'))
// Routes
app.use('/api/webdriver', webdriverRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
