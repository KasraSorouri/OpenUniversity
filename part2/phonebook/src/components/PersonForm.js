const PersonForm = (props) => {
    const {addNewPerson,handelNameChange,handelNewPhone,newName,newNumber} = props
    return(
        <div>
            <form onSubmit={addNewPerson}>
                <div>
                   name: <input 
                   value={newName}
                   onChange={handelNameChange}
                />
                </div>
                <div>
                 phone: <input
                value={newNumber}
                onChange={handelNewPhone} 
                />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}
export default PersonForm;