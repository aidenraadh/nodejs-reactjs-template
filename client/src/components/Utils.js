import axios from 'axios'
import {logout} from './Auth'

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt_token')
    }    
})

// Handle errors from API request
export const errorHandler = (error) => {
    // Bad user input
    if(error.response.status === 400){
        alert(error.response.data.message)
    }            
    // User is not authenticated
    else if(error.response.status === 401){
        logout()
    }
    // Server error
    else{alert('Server error')
        console.log(error.response)
    }
}
