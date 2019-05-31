const pg = require('pg')
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'contactsdb',
  password: 'stratpoint',
  port: 5432,
})

const getContacts = (request, response) => {
  pool.query('SELECT * FROM contacts', (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getContactById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM contacts WHERE _id = $1', [id], (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addContact = (request, response) => {
  const { firstname, lastname, address, emailaddress, contactnumber} = request.body

  pool.query('INSERT INTO contacts (first_name, last_name, address, email_address, contact_number) VALUES ($1, $2, $3, $4, $5)', 
    [firstname, lastname, address, emailaddress, contactnumber], 
    (error, results) => {
      if(error){
        throw error
      }
      response.send(`Contact added`)
  })
}

const updateContact = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, lastname, address, emailaddress, contactnumber} = request.body

  pool.query(
    'UPDATE contacts SET first_name = $1, last_name = $2, address = $3, email_address = $4, contact_number = $5 WHERE _id = $6',
    [firstname, lastname, address, emailaddress, contactnumber, id], (error, results) => {
      if(error){
        throw error
      }
      response.status(200).send(`Contact updated for ${firstname}`)
    }
  )
}

const deleteContact = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM contacts WHERE _id = $1', [id], (error, results) => {
    if(error){
      throw error
    }
    response.status(200).send(`Deleted contact: ${id}`)
  })
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact
}