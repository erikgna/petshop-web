import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AuthContext } from '../../../contexts/Auth'
import { ICliente } from '../../../interfaces/cliente'
import { APIGetOne, APIUpdate } from '../../../api'

import styles from '../Profile.module.scss'
import { Modal } from '../../../components/Modal/Modal'

type DetailProps = {
    feedback: string;
    setFeedback: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Detail = ({ feedback, setLoading, setFeedback }: DetailProps) => {
    const { user, deleteAccount } = useContext(AuthContext)

    const [modal, setModal] = useState<boolean>(false)
    const [cliente, setCliente] = useState<ICliente>({
        firstname: '',
        lastname: '',
        email: '',
        telefone: '',
    })

    useQuery({
        queryKey: ['client'], queryFn: async () => {
            const data = await APIGetOne(user!.uid, '/cliente')
            if (!data.data) return null

            const formatedData = data.data as ICliente
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

    const cancel = () => {
        setModal(false)
    }

    const confirm = async () => {
        await deleteAccount()
        setModal(false)
    }

    return (
        <div className={styles.Details}>
            <h2>My details</h2>
            <h3>Personal Information</h3>
            <form>
                <div>
                    <div>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name='firstname' placeholder='John' onChange={inputChange} value={cliente.firstname} />
                    </div>

                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name='lastname' placeholder='Doe' onChange={inputChange} value={cliente.lastname} />
                    </div>
                </div>

                <label htmlFor="birth">Birth Date</label>
                <input type="date" name='birth' onChange={inputChange} />

                <label htmlFor="telefone">Phone Number</label>
                <input type="phone" name='telefone' placeholder='(99) 999999999' onChange={inputChange} value={cliente.telefone ? cliente.telefone : ''} />
                {feedback !== '' && <p>{feedback}</p>}
                <button className='ButtonPrimary' onClick={saveProfile}>Save</button>
            </form>
            {modal && <Modal title='Confirm delete' content={<p>Are you sure that you want to delete you account?</p>} cancel={cancel} confirm={confirm} />}
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <button className='ButtonPrimary' onClick={() => { setModal(true) }}>Delete account</button>
        </div>
    )
}
