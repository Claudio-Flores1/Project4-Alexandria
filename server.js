// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
const userRoutes = require('./app/routes/user_routes')
// const commentRoutes = require('./app/routes/comment_routes')
const exhibitRoutes = require('./app/routes/exhibit_routes')
const middleware = require('./utils/middleware')

// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

const app = express()

middleware(app)


const serverDevPort = 8000
const clientDevPort = 3000

mongoose.connect(db, {
	useNewUrlParser: true,
})

app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
	})
)

const port = process.env.PORT || serverDevPort

app.use(replaceToken)

app.use(auth)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)

// app.use(commentRoutes)
app.use(exhibitRoutes)
app.use(userRoutes)

app.use(errorHandler)

app.listen(port, () => {
	console.log('listening on port ' + port)
})

module.exports = app
