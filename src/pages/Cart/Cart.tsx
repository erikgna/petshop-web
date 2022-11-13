import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IoMdRemoveCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

import { useCart } from '../../hooks/useCart'

import styles from './Cart.module.scss'

export const Cart = () => {
    const { cart, calculateDelivery, addQuantity, removeQuantity, setCep, removeFromCart } = useCart()

    if (cart?.produtos.length === 0) {
        return <div>
            <h1>Cart is empty.</h1>
        </div>
    }

    return (
        <section className={styles.Cart}>
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
                    <Link to="/checkout"><button className="ButtonPrimary">Checkout</button></Link>
                    <Link to='/shop'><button className="ButtonSecondary">Continue Shopping</button></Link>
                </div>
            </div>
        </section>
    )
}
