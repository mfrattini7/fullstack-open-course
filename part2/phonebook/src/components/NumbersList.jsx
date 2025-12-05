const NumbersList = ({persons}) => {

    return <>
    <h2>Numbers</h2>
      {persons.map(it => <div key={it.name}>{it.name} {it.number} <button onClick={() => console.log("clicked")}>delete</button></div>)}
    </>   
}

export default NumbersList