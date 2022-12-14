import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';
const auth = getAuth(app);

const Login = () => {

    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail]= useState('')
    const handelSubmit = event => {
        setSuccess(false)

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
            })
            .catch(error => {
            console.error('error', error)
            })
        

    }

    const handelForgetPassword = () => {
        if (!userEmail) {
            alert('please enter your email address')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
            alert('password reset email sent, please check your email.')
            })
            .catch(error => {
            console.error(error)
        })
    }
    const handelEmailBlur = (event) => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email)
    }

    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-primary'>Please Log in</h1>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor=''for="exampleInputEmail1" className="form-label">Email address</label>
                    <input onBlur={handelEmailBlur} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Email' required />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor='' for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder='Your password' required />
                </div>
                
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            {
                success && <p className='text-primary'>SuccessFully log in to  the account</p>
            }
            <small>  <p>New to this website ? please <Link to='/register'>Register</Link></p></small>
            <p> <small>Forget Password ? <button onClick={handelForgetPassword} type="button" className="btn btn-link">Reset Password</button></small> </p>
           
        </div>
    );
};

export default Login;