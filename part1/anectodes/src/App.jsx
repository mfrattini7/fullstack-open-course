import { useState } from 'react'

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getIndexOfMax(array) {
  if (array.length === 0) {
    return -1
  }
  let idxMax = 0
  let max = array[1]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      idxMax = i
      max = array[i]
    }
  }
  return idxMax
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  function selectRandom() {
    const randomIndex = getRandomInt(0, anecdotes.length - 1)
    setSelected(randomIndex)
  }

  function vote() {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    console.log(updatedVotes)
    setVotes(updatedVotes)

    const mostVoted = getIndexOfMax(updatedVotes)
    setMostVoted(mostVoted)
  }
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)


  return <>
    <h1>Anectode of the day</h1>
    <div>
      {anecdotes[selected]}
    </div>
    <p>has {votes[selected]} votes</p>
    <button onClick={vote}>vote</button>
    <button onClick={selectRandom}>next anectode</button>
    <h1>Anectode with most votes</h1>
    <div>
      {anecdotes[mostVoted]}
    </div>
  </>
}

export default App