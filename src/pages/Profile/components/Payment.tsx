import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AuthContext } from '../../../contexts/Auth'
import { ICliente } from '../../../interfaces/cliente'
import { APIGetOne, APIUpdate } from '../../../api'

import styles from '../Profile.module.scss'

type DetailProps = {
    feedback: string;
    setFeedback: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Payment = ({ feedback, setLoading, setFeedback }: DetailProps) => {
    const { user, signOut } = useContext(AuthContext)

    const [cliente, setCliente] = useState<ICliente>({
        firstname: '',
        lastname: '',
        email: '',
        telefone: '',
    })
    useQuery({
        queryKey: ['client'], queryFn: async () => {
            const data = await APIGetOne(user!.uid, '/cliente')
            const formatedData = data.data as ICliente

            formatedData.telefone = formatedData.telefone || ''
            setCliente(formatedData)

            return formatedData
        }
    })

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    }

    const saveProfile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        setLoading(false)
        try {
            const result = await APIUpdate(cliente, '/cliente')
            if (result.status === 200) {
                setFeedback('Your profile was update.')
                return
            }
            throw Error('Not updated.')
        } catch (error) {
            setFeedback("Couldn't update your profile, please try again later.")
        }
        setLoading(false)
    }
    return (
        <div className={styles.Address}>
            <h2>My Cards</h2>
            <form>
                <label htmlFor="cardName">Name in Card</label>
                <input type="text" name='cardName' />

                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" name='cardNumber' />

                <label htmlFor="expirationDate">Expiration Date</label>
                <input type="text" name='expirattionDate' />

                <label htmlFor="cvv">CVV</label>
                <input type="text" name='cvv' />

                <button className='ButtonPrimary'>Save</button>
            </form>

            <div className={styles.Cards}>
                <div className={styles.Card}>
                    <h2>1111 2222 3333 ****</h2>
                    <h3>Name John Doe</h3>
                    <h1>VISA</h1>
                </div>
            </div>
        </div>
    )
}
