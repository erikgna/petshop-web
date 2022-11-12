import { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { AuthContext } from '../../../contexts/Auth'
import { APIUserGetPagination } from '../../../api'
import { Loading } from '../../../components/Loading/Loading'
import { INotaVenda } from '../../../interfaces/notaVenda'
import { formatDateFromBack } from '../../../global/utils/DataFormat'

import styles from '../Profile.module.scss'

export const Orders = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [orders, setOrders] = useState<INotaVenda[]>([])

    const query = useQuery({
        queryKey: ['nota-venda'], queryFn: async () => {
            const data = await APIUserGetPagination(user!.uid, 0, 100, '/nota-venda')
            const formatedData = data.data as INotaVenda[]

            setOrders(formatedData)

            return formatedData
        }
    })

    const deliveryStatus = (id: number): string => {
        switch (id) {
            case 1:
                return 'Incoming';
            case 2:
                return 'Complete';
            default:
                return 'Preparing';
        }
    }

    if (query.isLoading) {
        return <Loading />
    }

    return (
        <div className={styles.Orders}>
            <h2>My Orders</h2>

            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delivery Date</th>
                        <th>Delivery Status</th>
                        <th>Payment Method</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item) => (
                        <tr key={item.idnotavenda} onClick={() => navigate(`/order/${item.idnotavenda}`)}>
                            <td><strong>Order ID: </strong>{item.idnotavenda}</td>
                            <td><strong>Price: </strong> ${item.total}</td>
                            <td><strong>Order: </strong> {item.quantidade}</td>
                            <td><strong>Delivery Date: </strong> {formatDateFromBack(item.data.toString())}</td>
                            <td className={styles.Complete}><strong>Delivery Status: </strong>{deliveryStatus(item.deliverystatus)}</td>
                            <td><strong>Payment Method: </strong>{item.paymentmethod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
