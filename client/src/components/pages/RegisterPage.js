import {useCallback, useState}  from "react"
import {api, errorHandler} from '../Utils'
import {Redirect} from "react-router"
import {Link} from "react-router-dom"
import {isAuth, login} from '../Auth'

const RegisterView = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = useCallback(() => {
        api
        .post('/register', {
            name: name, email: email, password: password
        })
        .then(response => login(response))
        .catch(error => {
            errorHandler(error)
        })        
    }, [name, email, password])

    // When the user already authenticated
    if(isAuth()){
        return <Redirect to={'/'}/>
    }
    return (<>
        <input type="text" name="name" value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder={'Name'}/>

        <input type="email" name="email" value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Email'}/>

        <input type="password" name="email" value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder={'Password'}/>
        <br/>
        <button type="button" onClick={register}>
            Register
        </button>
        <p>
            Already have account? <Link to="/login">Log in here</Link>
        </p>
    </>)
}

export default RegisterView