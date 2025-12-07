import Countries from "./Countries.jsx"
import Country from "./Country"

const Content = ({ countries, selectCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1 && countries.length <= 10) {
    return <Countries countries={countries} selectCountry={selectCountry} />
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return <p>No matches</p>
}

export default Content;