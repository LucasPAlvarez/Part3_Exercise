const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/', (request, response) =>{
    response.send("<h1>Hello, it is on</h1>")
})

app.get('/api/persons', (request, response) => {
    response.json(personList)
})

app.get('/info', (request, response) =>{
    const today = new Date(Date.now())
    console.log("date", today)
    response.send(
        `<p>Phonebook has info of ${personList.length} persons</p><p>${today}</p>`
    )
})

app.get('/api/persons/:id', (request,response) =>{
    const id = Number(request.params.id)
    //console.log('id', id)
    const person = personList.find(p => p.id == id)
    if(!person){
        response.status(404).end()
    }else{
        response.json(personList.filter(p => p.id === id))
    }
})

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    console.log('id', id)
    personList = personList.filter(p => p.id !== id)
    
    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})