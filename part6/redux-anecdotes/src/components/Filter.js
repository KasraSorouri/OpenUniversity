//import { useDispatch } from "react-redux"
import { connect } from 'react-redux'
import { filter } from "../reducers/filterReducer"


const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
  // dispatch(filter(event.target.value))
     props.filter(event.target.value)
  // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filter,
}

//export default Filter
const ConnectedFilter = connect(null,mapDispatchToProps)(Filter)
export default ConnectedFilter
