import {
    getAuth,
    signInWithEmailAndPassword,
    User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth'
import React, { useState, createContext, PropsWithChildren, ReactNode } from 'react'

import { IAuthContext } from '../interfaces/auth'

type AuthContextProps = {
    children: ReactNode
}

export const AuthContext = createContext<IAuthContext>(null!)

export const AuthContextCmpnt = ({ children }: AuthContextProps) => {
    const [loading, setLoading] = useState<boolean>(false)

    const signUp = async (
        email: string,
        name: string,
        password: string,
    ) => {
        console.log('dasdas')
        // try {
        //     setLoading(true)

        //     const auth = getAuth()
        //     const userCredential = await createUserWithEmailAndPassword(
        //         auth,
        //         email,
        //         password
        //     )
        //     await sendEmailVerification(userCredential.user)

        //     if (auth.currentUser) {
        //         updateProfile(auth.currentUser, {
        //             displayName: name
        //         }).then(async () => {

        //         })
        //     }

        //     setLoading(false)

        //     callback()
        // } catch (error) {

        //     setLoading(false)
        // }
    }

    const signIn = async (
        email: string,
        password: string
    ) => {
        console.log('dasdas')
        // try {
        //     setLoading(true)

        //     const auth = getAuth()
        //     const userCredential = await signInWithEmailAndPassword(
        //         auth,
        //         email,
        //         password
        //     )
        //     if (userCredential.user !== null) {
        //         setLoading(false)

        //         callback()
        //     }
        // } catch (error) {
        //     setLoading(false)
        // }
    }

    // const signWithGoogle = async (callback: VoidFunction) => {
    //   try {
    //     setLoading(true)
    //     const auth = getAuth()
    //     const provider = new GoogleAuthProvider()
    //     auth.useDeviceLanguage()
    //     const result = await signInWithPopup(auth, provider)
    //     if (result.user !== null) {
    //       setUser(result.user)
    //       writeSessionStorage<User>(result.user, 'user')
    //     }

    //     const token = result.user as unknown as IToken
    //     const status = await payments.getStatus(token.stsTokenManager.accessToken)
    //     if (status?.status !== "AUTHORIZED") {
    //       await payments.registerOrEdit(null, token.stsTokenManager.accessToken)
    //     }

    //     const tempCustomer = await payments.getCustomer(token.stsTokenManager.accessToken)
    //     setCustomer(tempCustomer)
    //     writeSessionStorage(tempCustomer, 'customer')

    //     setLoading(false)

    //     callback()
    //   } catch (error) {
    //     setError(true)
    //     setLoading(false)
    //   }
    // }

    // const signOut = async () => {
    //   try {
    //     const auth = getAuth()
    //     await firebaseSignOut(auth)
    //     writeSessionStorage(null, 'user')
    //     setUser(null)
    //   } catch (error) {
    //     setError(true)
    //   }
    // }

    // const recoverPassword = async (email: string) => {
    //   try {
    //     const auth = getAuth()
    //     await sendPasswordResetEmail(auth, email)
    //   } catch (error) {
    //     setError(true)
    //   }
    // }
    const initState: IAuthContext = {
        signUp,
        signIn,
        //   signWithGoogle,
        //   signOut,
        //   recoverPassword,
        //   updateUser,
        loading
    }

    return (
        <AuthContext.Provider value={initState} >
            {children}
        </AuthContext.Provider>
    )
}