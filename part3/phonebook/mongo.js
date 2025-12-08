const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://marcellofrattinigeneric_db_user:${password}@mycluster.vu4eylm.mongodb.net/phonebookApp?appName=phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Giuseppe Garibaldi',
  number: "1234 5678",
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
