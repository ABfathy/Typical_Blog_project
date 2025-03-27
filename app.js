const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')


mongoose.set('strictQuery',false)

mongoose.connect(config.MONGO_URI)
  .then(
    () => {
        logger.info('Connected to database successfully')
    })
  .catch(
    (error) => {
        logger.error(`Error while connecting ${error.message}`)
    })

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/blogs' , blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app