import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth'
import { Loading } from '../../components/Loading/Loading'

import styles from '../Auth/Auth.module.scss'

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("")
    const [feedback, setFeedback] = useState<string | null>(null)

    const { loading, error, recoverPassword } = useContext(AuthContext)

    const navigate = useNavigate()

    const sendRequest = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        await recoverPassword(email).then(() => {
            setFeedback('Email sent!')
            setEmail('')
            navigate('/auth')
        })
    }

    if (loading) {
        <Loading />
    }

    return (
        <section className={styles.AuthSec}>
            <div className={styles.Content}>
                <h2>Recover your password</h2>
                <form>
                    <label htmlFor="email">Email*</label>
                    <input type="email" name="email" placeholder='john@email.com' onChange={(e) => setEmail(e.target.value)} />

                    {error && <p>{error}</p>}
                    {feedback && <p>{feedback}</p>}
                    <button className='ButtonPrimary' onClick={sendRequest}>Send Email</button>
                </form>
            </div>
        </section>
    )
}
