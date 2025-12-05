const NumbersList = ({persons}) => {

    return <>
    <h2>Numbers</h2>
      {persons.map(it => <div key={it.name}>{it.name} {it.number}</div>)}
    </>   
}

export default NumbersList