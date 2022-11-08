import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Profile.module.scss'

type MenuShow = {
    detail: boolean,
    address: boolean,
    order: boolean,
    payment: boolean
}

export const Profile = () => {
    const [toShow, setToShow] = useState<MenuShow>({
        detail: true,
        address: false,
        order: false,
        payment: false
    })

    const changeCurrent = (name: string) => {
        setToShow({
            [name || 'detail']: true,
            detail: false,
            address: false,
            order: false,
            payment: false
        })
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

            {toShow.detail &&
                <div className={styles.Details}>
                    <h2>My details</h2>
                    <h3>Personal Information</h3>
                    <form>
                        <div>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name='firstName' placeholder='John' />
                            </div>

                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name='lastName' placeholder='Doe' />
                            </div>
                        </div>

                        <label htmlFor="birth">Birth Date</label>
                        <input type="date" name='birth' />

                        <label htmlFor="phone">Phone Number</label>
                        <input type="phone" name='phone' placeholder='(99) 999999999' />

                        <button className='ButtonPrimary'>Save</button>
                    </form>
                    <form>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name='email' placeholder='john@email.com' />

                        <button className='ButtonPrimary'>Save</button>
                    </form>

                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <button className='ButtonPrimary'>Delete account</button>
                </div>}

            {toShow.address &&
                <div className={styles.Address}>
                    <h2>My address</h2>
                    <form>
                        <div>
                            <div>
                                <label htmlFor="addressOne">Address Line 1*</label>
                                <input type="text" name='addressOne' />
                            </div>
                            <div>
                                <label htmlFor="addressTwo">Address Line 2</label>
                                <input type="text" name='addressTwo' />
                            </div>

                        </div>

                        <label htmlFor="city">City</label>
                        <input type="text" name='city' />

                        <label htmlFor="state">State/Province</label>
                        <input type="text" name='state' />

                        <label htmlFor="postalCode">Zip/Postal Code</label>
                        <input type="text" name='postalCode' />

                        <button className='ButtonPrimary'>Save</button>
                    </form>
                </div>
            }

            {toShow.order &&
                <div className={styles.Orders}>
                    <h2>My Orders</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order</th>
                                <th>Delivery Date</th>
                                <th>Price</th>
                                <th>Delivery Status</th>
                                <th>Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Order ID:</strong> AKN1239H</td>
                                <td><strong>Order: </strong> Order #2</td>
                                <td><strong>Delivery Date:</strong> 23/04/2022</td>
                                <td><strong>Price: </strong> $23,90</td>
                                <td className={styles.Complete}><strong>Delivery Status: </strong> Complete</td>
                                <td><strong>Payment Method: </strong> Credit Card</td>
                            </tr>
                            <tr>
                                <td><strong>Order ID:</strong> AKN1239H</td>
                                <td><strong>Order: </strong> Order #2</td>
                                <td><strong>Delivery Date:</strong> 23/04/2022</td>
                                <td><strong>Price: </strong> $23,90</td>
                                <td className={styles.Complete}><strong>Delivery Status: </strong> Complete</td>
                                <td><strong>Payment Method: </strong> Credit Card</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            {toShow.payment &&
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
            }
        </section>
    )
}
