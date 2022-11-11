const PersonForm = (props) => {
    const {addNewPerson,handelNameChange,handelNewPhone,newName,newNumber} = props
    return(
            <form onSubmit={addNewPerson}>
                <table>
                    <tbody>
                        <tr>
                            <td>name:</td>
                            <td><input 
                                value={newName}
                                onChange={handelNameChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>phone:</td>
                            <td><input
                                 value={newNumber}
                                onChange={handelNewPhone} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">add</button>
            </form>
    )
}
export default PersonForm;