import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { APIGetOne } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { INotaVendaUser } from '../../interfaces/notaVenda'

import styles from './Order.module.scss'

export const Order = () => {
    const [order, setOrder] = useState<INotaVendaUser>()
    const { id } = useParams()

    const query = useQuery({
        queryKey: ['nota-venda'], queryFn: async () => {
            const data = await APIGetOne(id as string, '/nota-venda/user')
            const formatedData = data.data as INotaVendaUser

            setOrder(formatedData)

            return formatedData
        }
    })

    if (query.isLoading) {
        return <Loading />
    }

    return (
        <section className={styles.Cart}>
            <h2>Order Confirmation</h2>
            <div className={styles.OrderInfo}>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Your Information</h4>
                    </div>
                    <h6>{`${order?.cliente.firstname} ${order?.cliente.lastname}`}</h6>
                    <p>{order?.cliente.email}</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Payment</h4>
                    </div>
                    <img src="" alt="" />
                    <p>Visa card ending in 1234</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Shipping Address</h4>
                    </div>
                    <h6>{`${order?.cliente.firstname} ${order?.cliente.lastname}`}</h6>
                    <p>{`${order?.shippingAddress.addressone} ${order?.shippingAddress.addresstwo}`}</p>
                    <p>{order?.shippingAddress.city}</p>
                    <p>{order?.shippingAddress.state}</p>
                    <p>{order?.shippingAddress.postalcode}</p>
                    <p>{order?.cliente.telefone}</p>
                </div>

                <div className={styles.InfoSec}>
                    <div>
                        <h4>Billing Address</h4>
                    </div>
                    <h6>{`${order?.cliente.firstname} ${order?.cliente.lastname}`}</h6>
                    <p>{`${order?.billingAddress.addressone} ${order?.billingAddress.addresstwo}`}</p>
                    <p>{order?.billingAddress.city}</p>
                    <p>{order?.billingAddress.state}</p>
                    <p>{order?.billingAddress.postalcode}</p>
                    <p>{order?.cliente.telefone}</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.produtos.map((item) => (
                        <tr className={styles.Item} key={item.id}>
                            <td className={styles.Description}>
                                <img src={item.photo} alt="erro" />
                            </td>
                            <td className={styles.Value}>{item.name}</td>
                            {item.options ? <td className={styles.Details}>
                                {item.options.map((option: any) => (
                                    <p key={option.nome}>{option.nome}: {option.value}</p>
                                ))}
                            </td> : <td></td>}
                            <td className={styles.Value}>${item.total}</td>
                            <td className={styles.Value}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.AmountInformations}>
                <div>
                    <p>Discount</p>
                    <strong>${order?.discount}</strong>
                </div>
                <div>
                    <p>Delivery</p>
                    <strong>${order?.delivery}</strong>
                </div>
                <div>
                    <p>Subtotal</p>
                    <strong>${order?.subtotal}</strong>
                </div>
                <div>
                    <p>Total</p>
                    <strong>${order?.total}</strong>
                </div>
            </div>
        </section>
    )
}
