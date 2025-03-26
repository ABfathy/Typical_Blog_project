const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery',false)

mongoose.connect(config.MONGO_URI)
  .then(
    () => {
        logger.info('Connected successfully')
    })
  .catch(
    () => {
        logger.error(`Error while connecting ${error.message}`)
    })

app.use(express.json)
app.use(middleware.morgan)

app.use('api/blogs' , blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app