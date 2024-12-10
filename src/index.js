// transfrom this to imports

const express = require('express')
const webdriverRoutes = require('./routes/webdriverRoutes.js')

const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

// Routes
app.use('/webdriver', webdriverRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
