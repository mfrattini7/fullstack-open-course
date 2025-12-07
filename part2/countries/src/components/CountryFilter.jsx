const CountryFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <span>find countries</span>
      <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default CountryFilter