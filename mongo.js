const mongo = require('mongoose')

//console.log(process.argv)
if(process.argv.length >= 3 && process.argv.length < 6){
    console.log("in start")

    const password = process.argv[2]
        
    const url = `mongodb+srv://lucasP:${password}@test.nxukuu6.mongodb.net/phonebook?retryWrites=true&w=majority`
        
    mongo.set('strictQuery', false)
        
    mongo.connect(url)
        
    const contactSchema = mongo.Schema({
        name: String,
        number: String
    })
        
    const Contact = mongo.model('contact', contactSchema)

    if(process.argv.length == 5){
        console.log("in 5")

        const contact = new Contact({
            name: process.argv[3],
            number: process.argv[4]
        })
        
        contact.save().then(result => {
            console.log("added ", result.name, " number ", result.number, " to phonebook")
            mongo.connection.close()
        })
    }else{
        console.log("in 3")
        console.log("bonebook:")
        Contact.find({}).then(result => {
            result.forEach(contact => {
                console.log(contact.name, contact.number)
            })
            mongo.connection.close()
        })
    }
        
}else{
    console.log("incorrect ammount of parameters")
}



