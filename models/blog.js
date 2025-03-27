

mongoose = require('mongoose')


const urlRegex =  /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLength: 5
    },
    author: {

        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: (value) => urlRegex.test(value),
            message: (props) => `${props.values} is not a valid URL!`
        }
    },
    likes: Number
})

blogSchema.set('toJSON' , {
    transform: (document , returnedObject) => {

        returnedObject.id = document._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v

    }
})

module.exports = mongoose.model('blog',blogSchema)