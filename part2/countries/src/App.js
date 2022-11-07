import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [serach, setSearch] = useState('')

  useEffect(() => {
    console.log('fetch')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  },[])

  return (
    <div>
      <Search search={serach} setSearch={setSearch}/>
      <Display  countries={countries.filter(country => country.name.common.toLowerCase().includes(serach.toLocaleLowerCase()))} />
    </div>
  );
}

export default App;

const Search = ({search,setSearch}) => {

  return(
    <div>
      find countries <input 
        value={search}
        onChange={(event) => setSearch(event.target.value)} 
      />
    </div>
  )
}

const Display = ({countries}) => {
  console.log('Search result length -> ',countries.length);

  if (countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (countries.length > 1) {
    return (countries.map(country => <p key={country.cca2}>{country.name.common}</p>))
  } else if (countries.length === 1) {
    const country = countries[0]
    console.log('country ->' , country.flags.svg);
    return (
      <div>
          <h1>{country.name.common} </h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages:</h3>
          {Object.values(country.languages).map(lang =><li>{lang}</li>)}
          <br />
          <img src={country.flags.png} alt="Flag" />
      </div>
    );
  }
}
