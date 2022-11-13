import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IoMdRemoveCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { APIGetOne } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { Modal } from '../../components/Modal/Modal'
import { useCart } from '../../hooks/useCart'
import { IAddress } from '../../interfaces/address'

import styles from './Checkout.module.scss'

export const Checkout = () => {
    const { user, cart, calculateDelivery, addQuantity, removeQuantity, setCep, removeFromCart } = useCart()

    const { data, isLoading } = useQuery({
        queryKey: ['addresses'], queryFn: () => APIGetOne(user?.uid as string, '/address/all')
    })

    const [modal, setModal] = useState<boolean>(false)

    if (isLoading) {
        return <Loading />
    }

    const addressData = data?.data as IAddress[]
    const address = <div>
        {addressData.map((item) => (
            <div key={item.idaddress}>
                <p>{item.addressone}</p>
                <p>{item.addresstwo}</p>
                <p>{item.city}</p>
                <p>{item.state}</p>
                <p>{item.postalcode}</p>
            </div>
        ))}
    </div>

    return (
        <section className={styles.Cart}>
            {modal && <Modal title='Choose address' content={address} cancel={() => setModal(false)} confirm={() => setModal(false)} />}
            <h2>Order Confirmation</h2>
            <div className={styles.OrderInfo}>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Your Information</h4>
                    </div>
                    <p>{user?.email}</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Payment</h4>
                        <strong onClick={() => setModal(true)}>Edit</strong>
                    </div>
                    <img src="" alt="" />
                    <p>Visa card ending in 1234</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Shipping Address</h4>
                        <strong onClick={() => {
                            console.log(data?.data)
                            setModal(true)
                        }}>Edit</strong>
                    </div>
                    <p>{addressData[0].addressone}</p>
                    <p>{addressData[0].addresstwo}</p>
                    <p>{addressData[0].city}</p>
                    <p>{addressData[0].state}</p>
                    <p>{addressData[0].postalcode}</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Billing Address</h4>
                        <strong onClick={() => setModal(true)}>Edit</strong>
                    </div>
                    <p>{addressData[0].addressone}</p>
                    <p>{addressData[0].addresstwo}</p>
                    <p>{addressData[0].city}</p>
                    <p>{addressData[0].state}</p>
                    <p>{addressData[0].postalcode}</p>
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
                    {cart?.produtos.map((item) => (
                        <tr className={styles.Item} key={item.idproduto}>
                            <td className={styles.Description}>
                                <img src={item.foto} alt="erro" />
                                <div>
                                    <h5>{item.nome}</h5>
                                </div>
                            </td>
                            <td className={styles.Details}>
                                {item?.options?.map((option) => (
                                    <p key={option.nome}>{option.nome}: {option.value}</p>
                                ))}
                            </td>
                            <td className={styles.Quantity}>
                                <AiOutlineMinus onClick={() => removeQuantity(item.idproduto as string)} />
                                <strong>{item.quantity}</strong>
                                <AiOutlinePlus onClick={() => addQuantity(item.idproduto as string)} />
                            </td>
                            <td className={styles.Remove}>
                                <IoMdRemoveCircle onClick={() => removeFromCart(item.idproduto as string, item.quantity, item.valor)} />
                            </td>
                            <td className={styles.Value}>${item.valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.AmountInformations}>
                <div>
                    <p>Discount</p>
                    <strong>${cart?.discount ? cart?.discount : '0'}</strong>
                </div>
                <div>
                    <p>Delivery</p>
                    <strong>${cart?.delivery ? cart?.delivery : '0'}</strong>
                </div>
                <div>
                    <p>Subtotal</p>
                    <strong>${cart?.subtotal ? cart?.subtotal : '0'}</strong>
                </div>
                <div>
                    <p>Total</p>
                    <strong>${cart?.total ? cart?.total : '0'}</strong>
                </div>
            </div>

            <div className={styles.Actions}>
                <div className={styles.Discount}>
                    <label htmlFor="discount">Calculate shipping value:</label>
                    <div>
                        <input type="text" name='cupon' placeholder='Please enter you CEP' onChange={(e) => setCep(e.target.value)} />
                        <button className="ButtonPrimary" onClick={calculateDelivery}>Calculate</button>
                    </div>
                </div>
                <div className={styles.Buttons}>
                    <Link to="/checkout"><button className="ButtonPrimary">Finish</button></Link>
                </div>
            </div>
        </section>
    )
}
