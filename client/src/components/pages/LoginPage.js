import {useCallback, useState}  from "react"
import {api} from '../Utils'
import {Redirect} from "react-router"
import {Link} from "react-router-dom"
import {isAuth, login} from '../Auth'
import {errorHandler} from '../Utils'

const LoginView = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const requestLogin = useCallback(() => {
        api
            .post('/login', {
                email: email, password: password
            })
            .then(response => login(response))
            .catch(error => {
                errorHandler(error)
            })
    }, [email, password])

    // When the user already authenticated
    if(isAuth()){
        return <Redirect to={'/'}/>
    }

    return (<>
        <input type="email" name="email" value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Email'}/>

        <input type="password" name="email" value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder={'Password'}/>
        <br/>
        <button type="button" onClick={requestLogin}>
            Login
        </button>
        <p>
            Doesn't have an account? <Link to="/register">Register here</Link>
        </p>
    </>)
}

export default LoginView