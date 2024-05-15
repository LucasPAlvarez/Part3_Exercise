require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Contact = require('./model/contact')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

//token creation
morgan.token('json_body', (request, response) =>{
    const body = JSON.stringify(request.body)
    //console.log('inside the token, body as a string -> ', body)
    return body
})

app.use(morgan('tiny', {
        skip: (request,response) => request.method === 'POST'
    })
)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json_body', {
    skip: (request, response) => request.method !== 'POST'
}))

let personList = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// app.get('/', (request, response) =>{
//     response.send("<h1>Hello, it is on</h1>")
// })

app.get('/api/persons', (request, response) => {
    //response.json(personList)
    Contact.find({}).then(result => {
        response.json(result)
    })
})

app.get('/info', (request, response) =>{
    Contact.find({}).then(result => {
        const today = new Date(Date.now())
        //console.log("date", today, "result", result.length)
        response.send(
            `<p>Phonebook has info of ${result.length} persons</p><p>${today}</p>`
        )
    })
})

app.get('/api/persons/:id', (request,response) =>{
    const id = request.params.id
    // console.log('id', id)
    // const person = personList.find(p => p.id == id)
    // if(!person){
    //     response.status(404).end()
    // }else{
    //     response.json(personList.filter(p => p.id === id))
    // }

    Contact.findById(id).then(result => {
        response.json(result)
    }).catch(error => {
        response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request,response) => {
    const id = request.params.id
    //console.log(id)
    Contact.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    })
})

const maxId = 10000

app.post('/api/persons', (request,response) => {
    console.log("request", request.body)
    const name = request.body.name
    const number = request.body.tel
    console.log('name', name, 'phone', number, 'logic', name && number)

    if(name && number){
        console.log("entro")
        if(!personList.find(p => p.name.toLowerCase() === name.toLowerCase())){
            console.log("entro 2")
            //const pId = Math.floor(Math.random() * maxId)
            // const person = {
            //     id: pId,
            //     name: name,
            //     number: number       
            // }
            // console.log('person', person)
            // personList = personList.concat(person)
            // response.json(person)
            const contact = new Contact({name: name, number: number})
            contact.save().then(result => {
                console.log(result)
                response.json(result)
            })
        }else{
            console.log("paso2")
        response.status(400).json({
            error: 'name must be unique'
        })
        }
    }else{
        console.log("paso")
        response.status(400).json({
            error: 'number or name is missing'
        })
    }
})


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})