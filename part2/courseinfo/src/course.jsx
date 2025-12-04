const Course = (props) => {
  const {id, name, parts} = props.course
  return <>
    <Header name={name}></Header>
    <Content parts={parts}></Content>
    <Total parts={parts}></Total>
  </>
}

const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = (props) => {
  return props.parts.map(
    (part) => <Part key={part.id} part={part}></Part>
    )
}

const Part = (props) => {
  const {id, name, exercises} = props.part
  return <p key={id}>{name} {exercises}</p>
}

const Total = (props) => {
  const sum = props.parts
                .map(it => it.exercises)
                .reduce((partial, it) => partial += it)
  return <h6>Total of {sum} exercises</h6>
}

export default Course
