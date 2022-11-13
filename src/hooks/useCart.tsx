import { useState, useContext } from 'react'

import { APIGetOne, APIUpdate } from "../api"
import { AuthContext } from '../contexts/Auth'

export function useCart() {
    const { cart, setCart, user, removeFromCart } = useContext(AuthContext)

    const [cep, setCep] = useState<string>('')

    const calculateDelivery = async () => {
        const result = await APIGetOne(user?.uid as string, `/cart/cep/${cep}`)
        if (cart) {
            setCart({ ...cart, delivery: result.data.replace(',', '.') })
        }
    }

    const addQuantity = async (id: string) => {
        if (!cart) return
        const index = cart?.produtos.findIndex((val) => val.idproduto === id) as number

        cart.produtos[index].quantity++
        setCart({ ...cart, subtotal: cart.subtotal + cart.produtos[index].valor, total: cart.total + cart.produtos[index].valor })

        await APIUpdate({ ...cart, subtotal: cart.subtotal + cart.produtos[index].valor, total: cart.total + cart.produtos[index].valor }, `/cart`)
    }
    const removeQuantity = async (id: string) => {
        if (!cart) return
        const index = cart?.produtos.findIndex((val) => val.idproduto === id) as number
        if (cart.produtos[index].quantity === 0) return

        cart.produtos[index].quantity--
        setCart({ ...cart, subtotal: cart.subtotal - cart.produtos[index].valor, total: cart.total - cart.produtos[index].valor })

        await APIUpdate({ ...cart, subtotal: cart.subtotal - cart.produtos[index].valor, total: cart.total - cart.produtos[index].valor }, `/cart`)
    }

    return {
        cart, cep, setCep, calculateDelivery, addQuantity, removeQuantity, removeFromCart, user
    }
}