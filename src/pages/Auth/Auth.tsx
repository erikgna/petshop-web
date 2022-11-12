import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import styles from './Auth.module.scss'
import { AuthContext } from '../../contexts/Auth'
import { Loading } from '../../components/Loading/Loading'

type ICredential = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

const initialValue: ICredential = {
    email: '',
    password: ''
}

export const Auth = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [credential, setCredential] = useState<ICredential>(initialValue)
    const [feedback, setFeedback] = useState<string | null>(null)

    const { loading, error, signIn, signUp, signWithGoogle } = useContext(AuthContext)

    const sendRequest = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        isLogin ?
            await signIn(credential.email, credential.password)
            :
            await signUp(credential.firstName!, credential.lastName!, credential.email, credential.password, credential.confirmPassword!)
                .then(() => {
                    setIsLogin(true)
                    setFeedback('Email verification sent! Please check your spam.')
                })

        setCredential(initialValue)
    }

    if (loading) {
        <Loading />
    }

    return (
        <section className={styles.AuthSec}>
            <div className={styles.Content}>
                <h2>Login</h2>
                <p>See your growth and get consulting support!</p>
                <p className={styles.Separator}>Or Sign in with Email</p>
                <button className={styles.GoogleSign} onClick={signWithGoogle}>
                    <FcGoogle />
                    Sign in with Google
                </button>
                <form>
                    {!isLogin && <label htmlFor="firstName">First Name*</label>}
                    {!isLogin && <input type="text" name="firstName" placeholder='John' onChange={(e) => setCredential({ ...credential, [e.target.name]: e.target.value })} />}

                    {!isLogin && <label htmlFor="lastName">Last Name*</label>}
                    {!isLogin && <input type="text" name="lastName" placeholder='Doe' onChange={(e) => setCredential({ ...credential, [e.target.name]: e.target.value })} />}

                    <label htmlFor="email">Email*</label>
                    <input type="email" name="email" placeholder='john@email.com' onChange={(e) => setCredential({ ...credential, [e.target.name]: e.target.value })} />

                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" placeholder='Min 8 Character' onChange={(e) => setCredential({ ...credential, [e.target.name]: e.target.value })} />

                    {!isLogin && <label htmlFor="confirmPassword">Confirm Password*</label>}
                    {!isLogin && <input type="password" name="confirmPassword" placeholder='Min 8 Character' onChange={(e) => setCredential({ ...credential, [e.target.name]: e.target.value })} />}

                    <div className={styles.Utils}>
                        {isLogin && <Link to='/forgot-password'>Forgot password?</Link>}
                    </div>
                    {error && <p>{error}</p>}
                    {feedback && <p>{feedback}</p>}
                    <button className='ButtonPrimary' onClick={sendRequest}>{isLogin ? 'Login' : 'Register'}</button>
                </form>
                {isLogin ? <p>Not registred yet? <strong onClick={() => setIsLogin(false)}>Create an Account</strong></p> :
                    <p>Already has an account? <strong onClick={() => setIsLogin(true)}>Login with Account</strong></p>}
            </div>
            <div className={styles.Image}>
            </div>
        </section>
    )
}
