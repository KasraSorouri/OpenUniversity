const Search = ({search,setSearch}) => {
    console.log('Search props -> ' ,);
    return(
        <div>
        filter shown with <input 
          value={search}
          onChange={(event)=>setSearch(event.target.value)}
          />
        </div>
    )
}

export default Search