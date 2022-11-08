import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { CiSquareRemove } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import styles from './Checkout.module.scss'

export const Checkout = () => {
    return (
        <section className={styles.Cart}>
            <h2>Order Confirmation</h2>
            <div className={styles.OrderInfo}>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Your Information</h4>
                        <Link to='/'>Edit</Link>
                    </div>
                    <h6>John Doe</h6>
                    <p>johndoe@gmail.com</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Payment</h4>
                        <Link to='/'>Edit</Link>
                    </div>
                    <img src="" alt="" />
                    <p>Visa card ending in 1234</p>
                </div>



                <div className={styles.InfoSec}>
                    <div>
                        <h4>Shipping Address</h4>
                        <Link to='/'>Edit</Link>
                    </div>
                    <h6>John Doe</h6>
                    <p>710 Manda Island Dsd</p>
                    <p>Apt 210</p>
                    <p>San Meteo Ca 92342</p>
                    <p>Unisted State</p>
                    <p>(513) 4343-4343</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Billing Address</h4>
                        <Link to='/'>Edit</Link>
                    </div>
                    <h6>John Doe</h6>
                    <p>710 Manda Island Dsd</p>
                    <p>Apt 210</p>
                    <p>San Meteo Ca 92342</p>
                    <p>Unisted State</p>
                    <p>(513) 4343-4343</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Details</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.Item}>
                        <td className={styles.Description}>
                            <img src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" alt="erro" />
                            <div>
                                <h5>Streamile Legs Sea</h5>
                                <p>Product Code: 45DGR5</p>
                            </div>
                        </td>
                        <td className={styles.Details}>
                            <p>Color: Red</p>
                            <p>Size: M</p>
                        </td>
                        <td className={styles.Quantity}>
                            <AiOutlineMinus />
                            <strong>0</strong>
                            <AiOutlinePlus />
                        </td>
                        <td className={styles.Remove}>
                            <CiSquareRemove />
                        </td>
                        <td className={styles.Value}>$55</td>
                    </tr>
                    <tr className={styles.Item}>
                        <td className={styles.Description}>
                            <img src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" alt="erro" />
                            <div>
                                <h5>Streamile Legs Sea</h5>
                                <p>Product Code: 45DGR5</p>
                            </div>
                        </td>
                        <td className={styles.Details}>
                            <p>Color: Red</p>
                            <p>Size: M</p>
                        </td>
                        <td className={styles.Quantity}>
                            <AiOutlineMinus />
                            <strong>0</strong>
                            <AiOutlinePlus />
                        </td>
                        <td className={styles.Remove}>
                            <CiSquareRemove />
                        </td>
                        <td className={styles.Value}>$55</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.AmountInformations}>
                <div>
                    <p>Discount</p>
                    <strong>$0.00</strong>
                </div>
                <div>
                    <p>Delivery</p>
                    <strong>$0.00</strong>
                </div>
                <div>
                    <p>Subtotal</p>
                    <strong>$110.00</strong>
                </div>
                <div>
                    <p>Total</p>
                    <strong>$110.00</strong>
                </div>
            </div>

            <div className={styles.Actions}>
                <div className={styles.Discount}>
                    <label htmlFor="discount">If you have a promotion code, please enter it here</label>
                    <div>
                        <input type="text" name='cupon' placeholder='Please enter promo code' />
                        <button className="ButtonPrimary">Apply Discount</button>
                    </div>
                </div>
                <div className={styles.Buttons}>
                    <button className="ButtonPrimary">Checkout</button>
                    <button className="ButtonSecondary">Continue Shopping</button>
                </div>
            </div>
        </section>
    )
}
