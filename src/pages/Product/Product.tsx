import { useQuery } from '@tanstack/react-query'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'
import { useParams } from 'react-router'

import { APIGetOne } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { IProduto } from '../../interfaces/produto'

import styles from './Product.module.scss'

export const Product = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['product'], queryFn: () => APIGetOne(id as string, '/produto')
    })

    if (isLoading) {
        return <Loading />
    }

    const product = data?.data as IProduto
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
                    <strong>${product.valor}</strong>
                    {
                        product.options.map((option) => {
                            return <div key={option.nome}>
                                <label htmlFor={option.nome}>{option.nome}</label>
                                <select name={option.nome}>
                                    <option value="null" hidden>Select one</option>
                                    {option.value.map((value) => (
                                        <option value={value} key={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        })
                    }
                    <button className='ButtonPrimary'>Add To Cart</button>
                </div>
            </div>
            <h2>Description</h2>
            <p>{product.descricao}</p>
        </section>
    )
}
