import { useState } from 'react'

import styles from './Profile.module.scss'
import { Loading } from '../../components/Loading/Loading'
import { Detail } from './components/Detail'
import { Address } from './components/Address'
import { Orders } from './components/Orders'
import { Payment } from './components/Payment'

type IMenuShow = {
    detail: boolean,
    address: boolean,
    order: boolean,
    payment: boolean
}

export const Profile = () => {
    const [toShow, setToShow] = useState<IMenuShow>({
        detail: true,
        address: false,
        order: false,
        payment: false
    })

    const [feedback, setFeedback] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    if (loading) {
        return <Loading />
    }

    return (
        <section className={styles.Profile}>
            <div className={styles.Menu}>
                <p onClick={() => setToShow({
                    detail: true,
                    address: false,
                    order: false,
                    payment: false
                })}>Details</p>
                <p onClick={() => setToShow({
                    detail: false,
                    address: true,
                    order: false,
                    payment: false
                })}>Address</p>
                <p onClick={() => setToShow({
                    detail: false,
                    address: false,
                    order: true,
                    payment: false
                })}>Orders</p>
                <p onClick={() => setToShow({
                    detail: false,
                    address: false,
                    order: false,
                    payment: true
                })}>Payment Methods</p>
            </div>

            {toShow.detail && <Detail feedback={feedback} setLoading={setLoading} setFeedback={setFeedback} />}
            {toShow.address && <Address feedback={feedback} setLoading={setLoading} setFeedback={setFeedback} />}
            {toShow.order && <Orders />}
            {toShow.payment && <Payment feedback={feedback} setLoading={setLoading} setFeedback={setFeedback} />}
        </section>
    )
}
