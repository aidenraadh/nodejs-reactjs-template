import {useState, useCallback}  from "react"
import {api, errorHandler} from '../Utils'
import {saveUser,} from '../Auth'

function ProfileView({user}){
    const [newName, setNewName] = useState(user.name)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const updateProfile = useCallback(() => {
        api
        .put(`/profile`, {
            name: newName, newPassword: newPassword,
            oldPassword: oldPassword
        })
        .then(response => {
            // Save new user
            saveUser(response.data.user)
            // Refresh the page
            window.location.reload()
        })
        .catch(error => errorHandler(error))    
    }, [newName, oldPassword, newPassword])

    if(!user){
        return 'Loading ...'
    }
    return (<>
        <h1>Profile</h1>
        <p>
            Name: {user.name}<br/>
            Email: {user.email}<br/>
        </p>
        <section>
            <h3>Update Profile</h3>
            <input type="text" value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            placeholder={'Name'}/> 

            <input type="password" value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder={'Old password'}/>            

            <input type="password" value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={'New password'}/>        

            <br/>         

            <button type="button" onClick={updateProfile}>
                Update profile
            </button>

        </section>
    </>)
}

export default ProfileView