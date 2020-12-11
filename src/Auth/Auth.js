import Button from '@material-ui/core/Button';
import {auth, provider} from '../firebase/Firebase'

import './Auth.css'
const Auth = ()=> {
    const signupHandler = ()=>{
        auth.signInWithPopup(provider).catch(err=>console.log(err))
    }
    return (
        <div className="auth">
        <Button onClick={signupHandler}
            color="primary"> Sign in with Google </Button>
        </div>
    )
}

export default Auth
