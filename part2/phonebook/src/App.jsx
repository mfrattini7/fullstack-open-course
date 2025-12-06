import { useState, useEffect } from 'react'

import NumbersList from './components/NumbersList'
import Form from './components/Form'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'

import personsService  from './services/persons'

import './index.css'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const personsToShow = persons.filter(it => it.name.toLowerCase().startsWith(filter.toLowerCase()))

  useEffect(() => {
    personsService.getAll().then(p => setPersons(p))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(it => it.name)
    if (names.includes(newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const p = persons.filter(it => it.name === newName)[0]
        personsService.update(p.id, {...p, number:newNumber})
        .then(() =>{
          setPersons(personsToShow.map(it => it.id === p.id ? {...p, number: newNumber} : it))
          setNotification("Number changed")
          setTimeout(() => {setNotification(null)}, 5000)
        }
        )
        .catch(() => {
          setError("Information of " + p.name + " has already been removed from the server")
          setTimeout(() => {setError(null)}, 5000)
          hasError = true
        }
        )
        return
      } else {
        return
      }
    }
    personsService.create({name: newName, number: newNumber})
    .then(it => setPersons(persons.concat(it)))
        setNotification("Added " + newName)
        setTimeout(() => {setNotification(null)}, 5000)
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

  const handleDelete = (id, name) => {
    if (confirm("delete " + name + "?")) {
      personsService.erase(id).then(
        setPersons(personsToShow.filter(it => it.id != id))
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <Notification message={notification}/>
      <Error message={error}/>

      <Form addPerson={addPerson}
         newName={newName}
         handleNameChange={handleNameChange}
         newNumber={newNumber}
         handleNumberChange={handleNumberChange}
      />

      <NumbersList persons={personsToShow} handleDelete={handleDelete}/>

    </div>
  )
}

export default App