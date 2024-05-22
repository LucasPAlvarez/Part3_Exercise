const mongo = require('mongoose')

const url = process.env.URI

mongo.connect(url).then(result => {
    console.log("Connected succesfully")
}).catch(error => {
    console.log("Fail to connect ", error)
})

const contactSchema = mongo.Schema({
    name: {type:String, minLength:4, require: true},
    number: {
        type: String,
        validate: {
            validator: v => /\d{2}-\d{6}|\d{3}-\d{5}/.test(v),
            message: props => `${props.value} it's not valid phone number`
        },
        require: true}
})

contactSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString(),
        delete returnObject._id,
        delete returnObject.__v
    }
})

module.exports = mongo.model('contact', contactSchema)