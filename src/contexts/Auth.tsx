import { FirebaseError } from 'firebase/app'
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    User,
    onAuthStateChanged,
    deleteUser
} from 'firebase/auth'
import { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { APICreate } from '../api'

import { AuthError } from '../errors/AuthError'
import { AuthContextProps, IAuthContext } from '../interfaces/auth'
import { ICliente } from '../interfaces/cliente'

const unknownError = "An unknown error has ocurred."

export const AuthContext = createContext<IAuthContext>(null!)

export const AuthContextCmpnt = ({ children }: AuthContextProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) as User : null)

    const auth = getAuth()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const sessionUser = sessionStorage.getItem('user');
            if (user && sessionUser === null) {
                sessionStorage.setItem('user', JSON.stringify(user))
                setUser(user)
            }
        })
    }, [])

    const navigate = useNavigate()

    const signUp = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        confirmPassword: string,
    ) => {
        setLoading(true)
        setError(null)
        try {
            if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
                throw new AuthError("Fill all the fields.")
            }
            if (password.length < 8) {
                throw new AuthError("Password length.")
            }
            if (password !== confirmPassword) {
                throw new AuthError("Passwords doesn't match.")
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            const data: ICliente = {
                idcliente: userCredential.user.uid,
                firstname: firstName,
                lastname: lastName,
                email
            }

            const result = await APICreate(data, '/cliente')
            if (result.status !== 200) {
                throw new AuthError("Couldn't save your name.")
            }

            await sendEmailVerification(userCredential.user)
        } catch (err) {
            if (err instanceof AuthError) {
                setError(err.message)
            } if (err instanceof FirebaseError) {
                if (err.code === 'auth/email-already-in-use') {
                    setError("Email already in use.")
                }
            }
            else {
                setError(unknownError)
            }
        }
        setLoading(false)
    }

    const signIn = async (
        email: string,
        password: string
    ) => {
        setLoading(true)
        setError(null)
        try {
            if (email === '' || password === '') {
                throw new AuthError("Fill all the fields.")
            }

            if (!auth.currentUser?.emailVerified) {
                throw new AuthError("Verify your email.")
            }
            const credentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            navigate('/shop')
        } catch (err) {
            if (err instanceof AuthError) {
                setError(err.message)
            } else {
                setError(unknownError)
            }
        }
        setLoading(false)
    }

    const signWithGoogle = async () => {
        setLoading(true)
        setError(null)
        try {
            const provider = new GoogleAuthProvider()
            auth.useDeviceLanguage()
            await signInWithPopup(auth, provider)

            navigate('/shop')
        } catch (error) {
            setError(unknownError)
        }
        setLoading(false)
    }

    const signOut = async () => {
        await firebaseSignOut(auth)
    }

    const recoverPassword = async (email: string) => {
        setError(null)
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (error) {
            setError(unknownError)
        }
    }

    const deleteAccount = async () => {
        try {
            if (auth.currentUser) {
                deleteUser(auth.currentUser).then(() => {
                    sessionStorage.removeItem('user')
                    setUser(null)
                    navigate('/')
                })
            }
            await firebaseSignOut(auth)
        } catch (error) {
            console.error(error)
            setError("Couldn't delete you user.")
        }
    }

    const initState: IAuthContext = {
        signUp,
        signIn,
        signWithGoogle,
        signOut,
        recoverPassword,
        deleteAccount,
        loading,
        error,
        user
    }

    return (
        <AuthContext.Provider value={initState} >
            {children}
        </AuthContext.Provider>
    )
}