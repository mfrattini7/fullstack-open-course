const NumbersList = ({persons, handleDelete}) => {

    return <>
    <h2>Numbers</h2>
      {persons.map(it => <div key={it.name}>{it.name} {it.number} <button onClick={() => handleDelete(it.id, it.name)}>delete</button></div>)}
    </>   
}

export default NumbersList