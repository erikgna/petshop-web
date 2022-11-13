import { useQuery } from '@tanstack/react-query'
import { useContext, useState, useEffect } from 'react'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'
import { useParams } from 'react-router'

import { APIGetOne } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { AuthContext } from '../../contexts/Auth'
import { ICartProduto, IProduto } from '../../interfaces/produto'

import styles from './Product.module.scss'

export const Product = () => {
    const { id } = useParams();
    const { addToCart } = useContext(AuthContext)
    const [product, setProduct] = useState<IProduto | null>(null)
    const [tempProduct, setTempProduct] = useState<ICartProduto | null>(null)

    const getOne = async () => {
        const { data } = await APIGetOne(id as string, '/produto')
        setProduct(data as IProduto)
        setTempProduct({ ...data as ICartProduto, options: [] })
    }

    useEffect(() => {
        getOne()
    }, [])

    const addOption = (key: string, name: string, subtotal: number) => {
        if (product && tempProduct) {
            const options = tempProduct.options.filter((val) => val.nome !== key)
            options.push({ nome: key, value: name })
            setTempProduct({ ...tempProduct, valor: product.valor + subtotal, options })
        }
    }

    if (product === null) {
        return <Loading />
    }

    return (
        <section className={styles.Product}>
            <div className={styles.FirstInfo}>
                <div className={styles.Image}>
                    <div className={styles.Actions}>
                        <SlArrowUp />
                        <p>02</p>
                        <p>/</p>
                        <p>05</p>
                        <SlArrowDown />
                    </div>
                    <img src={product.foto} alt="Error" />
                </div>
                <div className={styles.Infos}>
                    <h1>{product.nome}</h1>
                    <p>{product.categoriaproduto?.nome}</p>
                    <strong>${tempProduct?.valor}</strong>
                    {
                        product.options.map((option) => {
                            return <div key={option.nome}>
                                <label htmlFor={option.nome}>{option.nome}</label>
                                <select name={option.nome} >
                                    <option value="null" hidden>Select one</option>
                                    {option.value.map((value) => (
                                        <option onClick={() => addOption(option.nome, value.name, value.subtotal)} value={value.name} key={value.name}>{value.name} - ${value.subtotal}</option>
                                    ))}
                                </select>
                            </div>
                        })
                    }
                    <button className='ButtonPrimary' onClick={() => {
                        if (product.options.length !== tempProduct?.options.length) {
                            return;
                        }
                        addToCart(tempProduct)
                    }}>Add To Cart</button>
                </div>
            </div>
            <h2>Description</h2>
            <p>{product.descricao}</p>
        </section>
    )
}
