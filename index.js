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


const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})