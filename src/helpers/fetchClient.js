import axios from 'axios'

const fetchClient = () => {
    const instance = axios.create({
        baseURL: "https://keeper-app-backend.herokuapp.com/notes"
        //baseURL: "http://localhost:5000/notes"
    })
    return instance
}

export default fetchClient()
