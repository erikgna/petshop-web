import { useState } from 'react'

import styles from './Profile.module.scss'
import { Loading } from '../../components/Loading/Loading'
import { Detail } from './components/Detail'
import { Address } from './components/Address'
import { Orders } from './components/Orders'
import { Payment } from './components/Payment'
import { SavedPosts } from './components/SavedPosts'

type IMenuShow = {
    detail: boolean,
    address: boolean,
    order: boolean,
    payment: boolean,
    posts: boolean
}

export const Profile = () => {
    const [toShow, setToShow] = useState<string>()

    const [feedback, setFeedback] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    if (loading) {
        return <Loading />
    }

    return (
        <section className={styles.Profile}>
            <div className={styles.Menu}>
                <p onClick={() => setToShow('details')}>Details</p>
                <p onClick={() => setToShow('address')}>Address</p>
                <p onClick={() => setToShow('orders')}>Orders</p>
                <p onClick={() => setToShow('payments')}>Payment Methods</p>
                <p onClick={() => setToShow('posts')}>Saved Posts</p>
            </div>

            {toShow === 'details' && <Detail feedback={feedback} setLoading={setLoading} setFeedback={setFeedback} />}
            {toShow === 'addess' && <Address feedback={feedback} setLoading={setLoading} setFeedback={setFeedback} />}
            {toShow === 'orders' && <Orders />}
            {toShow === 'payments' && <Payment feedback={feedback} setLoading={setLoading} setFeedback={setFeedback} />}
            {toShow === 'posts' && <SavedPosts />}
        </section>
    )
}
