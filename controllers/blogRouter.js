const blogRouter = require('express').Router()
const { MongoCryptKMSRequestNetworkTimeoutError } = require('mongodb')
const Blog = require('../models/blog')
const logger = require('../utils/logger')




blogRouter.get('/',(req ,res) => {

    Blog.find({})
        .then(
          blogs => {
            res.json(blogs)

            logger.info(`get request complete`)
            
            
          }  
        )

})


blogRouter.get('/:id',(req ,res , next)  => {

    Blog.findById(req.params.id)
        .then(
            (blog) => {

                if (blog){
                    res.status(200).json(blog)
                } else {
                    res.status(404).end()
                }
            }  
        )
        .catch(error => next(error))

})


blogRouter.post('/',(req,res,next) => {

    const newBlog = new Blog(req.body)

    newBlog
        .save()
        .then(result => {
            res.status(201).json(result)}
        )



})




module.exports = blogRouter

