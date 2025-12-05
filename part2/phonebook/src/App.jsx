import { useState, useEffect } from 'react'
import axios from 'axios'

import NumbersList from './components/NumbersList'
import Form from './components/Form'
import Filter from './components/Filter'
import personsService  from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then(p => setPersons(p))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(it => it.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    personsService.create({name: newName, number: newNumber})
    .then(it => setPersons(persons.concat(it)))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(it => it.name.toLowerCase().startsWith(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <Form addPerson={addPerson}
         newName={newName}
         handleNameChange={handleNameChange}
         newNumber={newNumber}
         handleNumberChange={handleNumberChange}
      />

      <NumbersList persons={personsToShow} />

    </div>
  )
}

export default App