const express = require('express')
const bodyParser = require('body-parser')
const db = require('./query')
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extend: true
  })
)

app.get('/', (request, response) => {
  response.send('Welcome to Contact Finder')
})

app.get('/api/contacts', db.getContacts)
app.get('/api/contacts/:id', db.getContactById)
app.post('/api/contacts', db.addContact)
app.put('/api/contacts/:id', db.updateContact)
app.delete('/api/contacts/:id', db.deleteContact)

app.listen(port, host, function() {
  console.log("Server started...");
});

