const mongo = require('mongoose')

const url = process.env.URI

mongo.connect(url).then(result => {
    console.log("Connected succesfully")
}).catch(error => {
    console.log("Fail to connect ", error)
})

const contactSchema = mongo.Schema({
    name: String,
    number: String
})

contactSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString(),
        delete returnObject._id,
        delete returnObject.__v
    }
})

module.exports = mongo.model('contact', contactSchema)