import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AuthContext } from '../../../contexts/Auth'
import { APICreate, APIGetOne, APIUpdate } from '../../../api'

import styles from '../Profile.module.scss'
import { IAddress } from '../../../interfaces/address'

type DetailProps = {
    feedback: string;
    setFeedback: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Address = ({ feedback, setLoading, setFeedback }: DetailProps) => {
    const { user } = useContext(AuthContext)

    const [address, setAddress] = useState<IAddress>({
        idcliente: user!.uid,
        addressone: '',
        addresstwo: '',
        city: '',
        state: '',
        postalcode: 0
    })

    const query = useQuery({
        queryKey: ['address'], queryFn: async () => {
            const data = await APIGetOne(user!.uid, '/address')
            if (data.data === null) return null

            const formatedData = data.data as IAddress
            setAddress(formatedData)

            return formatedData
        }
    })

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }

    const saveAddress = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setLoading(false)
        try {
            const result = query.data ? await APIUpdate(address, '/address') : await APICreate(address, '/address')
            if (result.status === 200) {
                setFeedback('Your address was update.')
                return
            }
            throw Error('Not updated.')
        } catch (error) {
            setFeedback("Couldn't update your address, please try again later.")
        }
        setLoading(false)
    }
    return (
        <div className={styles.Address}>
            <h2>My address</h2>
            <form>
                <div>
                    <div>
                        <label htmlFor="addressone">Address Line 1*</label>
                        <input type="text" name='addressone' onChange={inputChange} value={address.addressone ? address.addressone : ''} />
                    </div>
                    <div>
                        <label htmlFor="addresstwo">Address Line 2</label>
                        <input type="text" name='addresstwo' onChange={inputChange} value={address.addresstwo ? address.addresstwo : ''} />
                    </div>

                </div>

                <label htmlFor="city">City</label>
                <input type="text" name='city' onChange={inputChange} value={address.city ? address.city : ''} />

                <label htmlFor="state">State/Province</label>
                <input type="text" name='state' onChange={inputChange} value={address.state ? address.state : ''} />

                <label htmlFor="postalcode">Zip/Postal Code</label>
                <input type="text" name='postalcode' onChange={inputChange} value={address.postalcode ? address.postalcode : ''} />

                {feedback && <p>{feedback}</p>}

                <button className='ButtonPrimary' onClick={saveAddress}>Save</button>
            </form>
        </div>
    )
}
