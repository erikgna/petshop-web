import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import styles from './Auth.module.scss'
import { AuthContext } from '../../contexts/Auth'

export const Auth = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const { signIn } = useContext(AuthContext)

    return (
        <section className={styles.AuthSec}>
            <div className={styles.Content}>
                <h2>Login</h2>
                <p>See your growth and get consulting support!</p>
                <p className={styles.Separator}><div /> Or Sign in with Email <div /></p>
                <button className={styles.GoogleSign}>
                    <FcGoogle />
                    Sign in with Google
                </button>
                <form>
                    {!isLogin && <label htmlFor="name">Name*</label>}
                    {!isLogin && <input type="text" name="name" placeholder='John Doe' />}

                    <label htmlFor="email">Email*</label>
                    <input type="email" name="email" placeholder='john@email.com' />

                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" placeholder='Min 8 Character' />

                    {!isLogin && <label htmlFor="confirmPassword">Confirm Password*</label>}
                    {!isLogin && <input type="password" name="confirmPassword" placeholder='Min 8 Character' />}

                    <div className={styles.Utils}>
                        <div>
                            <input type="checkbox" name="remember" id="remember" />
                            <p>Remember me</p>
                        </div>
                        {isLogin && <Link to='/forgot-password'>Forgot password?</Link>}
                    </div>
                    <button className='ButtonPrimary' onClick={(e) => {
                        e.preventDefault()
                        signIn('', '')
                    }}>{isLogin ? 'Login' : 'Register'}</button>
                </form>
                {isLogin ? <p>Not registred yet? <strong onClick={() => setIsLogin(false)}>Create an Account</strong></p> :
                    <p>Already has an account? <strong onClick={() => setIsLogin(true)}>Login with Account</strong></p>}
            </div>
            <div className={styles.Image}>
            </div>
        </section>
    )
}
