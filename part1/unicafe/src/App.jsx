import { useState } from 'react'


const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>
}

const StatisticsLine = (props) => {
  return <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>   
}

const Statistics = (props) => {

  const all = () => {
    return props.good + props.neutral + props.bad
  }

  const average = () => {
    return (props.good - props.bad) / (props.good + props.neutral + props.bad)
  }

  const positive = () => {
    return 100 * props.good / (props.good + props.neutral + props.bad)
  }

  if (!all()) return <p>No feedback given</p>

  return <>
      <StatisticsLine text="good" value={props.good}></StatisticsLine>
      <StatisticsLine text="neutral" value={props.neutral}></StatisticsLine>
      <StatisticsLine text="bad" value={props.bad}></StatisticsLine>
      <StatisticsLine text="all" value={props.all}></StatisticsLine>
      <StatisticsLine text="average" value={average().toFixed(1)}></StatisticsLine>
      <StatisticsLine text="positive" value={positive().toFixed(1) + "%"}></StatisticsLine>
    </>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => {
    setGood(good + 1)
  }

  const incNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={incGood}></Button>
      <Button name="neutral" handleClick={incNeutral}></Button>
      <Button name="bad" handleClick={incBad}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
