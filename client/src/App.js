import React from "react";
import ErrorBoundary from './components/ErrorBoundary'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import {getUser} from './components/Auth'

import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'
import ProfilePage from './components/pages/ProfilePage'
import NotFoundPage from './components/pages/NotFoundPage'

function App(){
    const user = getUser()
    console.log(user)
    return (
        <ErrorBoundary>
            <Router>
                <Navigation/>
                <Switch>
                    <Route path="/register" exact component={RegisterPage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <ProtectedRoute path={'/'} exact component={HomePage}/>
                    <ProtectedRoute path={'/profile'} exact component={ProfilePage} props={{
                        user: user
                    }}/>                    
                    
                    <Route path={'*'} component={NotFoundPage}/>
                </Switch>
            </Router>
        </ErrorBoundary>
    )
}

export default App