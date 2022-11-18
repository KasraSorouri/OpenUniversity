import axios from 'axios'

const url = '/api/persons';

const getAll = () => {
    const request = axios.get(url)
    return request.then(res => res.data)
}

const addPerson = (newPerson) => {
    const request = axios.post(url,newPerson)
     return request.then(res => res.data)
}

const removePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(res => res.data)
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`${url}/${id}`, newPerson)
    return request.then(res => res.data)
}
export default {getAll , addPerson , removePerson , updatePerson}