import React, { useEffect } from 'react'
import { FiArrowLeft, FiArrowRight, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useProduto } from '../../hooks/useProduto'

import styles from './Shop.module.scss'

const categories = {
    categories: [
        'rain jackets',
        'insulated',
        'fleece',
        '3 in 1 intercharge',
        'shell e softsheel',
    ],
    specie: [
        'dog',
        'cat',
        'bird'
    ]
}

export const Shop = () => {
    const produtoHook = useProduto()

    useEffect(() => {
        produtoHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Center}>
            <div className={styles.SearchBar}>
                <input type="text" placeholder='Search..' onChange={(e) => produtoHook.search(e.target.value)} />
                <FiSearch />
            </div>
            <div className={styles.Shop}>
                <div className={styles.Categories}>
                    {Object.entries(categories).map((item) => {
                        return <ul key={item[0]} >
                            <li className={styles.Title}>{item[0]}</li>
                            {item[1].map((item) => (
                                <li key={item} className={styles.Subtitle}>{item}</li>
                            ))}
                        </ul>
                    })}
                </div>
                <div className={styles.Products}>
                    {
                        produtoHook.produtos.map((item, index) => {
                            if (index % 2 === 0) {
                                return <Link to={`/product/${item.idproduto}`} key={item.idproduto}>
                                    <div className={styles.FullProduct} style={{ backgroundImage: `url("${item.foto}")` }}>
                                        <div className={styles.OverDesc}>
                                            <blockquote>{item.descricao}</blockquote>
                                        </div>

                                        <div className={styles.NormalDesc}>
                                            <h4>{item.nome}</h4>
                                            <p>{item.categoriaproduto && 'No category'}</p>
                                            <strong>${item.valor}</strong>
                                        </div>
                                    </div>
                                </Link>
                            }

                            return <Link to={`/product/${item.idproduto}`} key={item.idproduto}>
                                <div className={styles.Product}>
                                    <div className={styles.ProductImage} style={{ backgroundImage: `url("${item.foto}")` }}>
                                        <div className={styles.OverDesc}>
                                            <blockquote>Interview - WWhat it's like to work remotely in big-sized product development?</blockquote>
                                        </div>
                                    </div>
                                    <h4>Woon Time</h4>
                                    <p>Men's watch</p>
                                    <strong>$1600</strong>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
            <div className={styles.Navigation}>
                {produtoHook.page === 1 ? <p></p> : <p onClick={() => produtoHook.changePage(produtoHook.page - 1)}><FiArrowLeft /> Previous</p>}
                <p onClick={() => produtoHook.changePage(produtoHook.page + 1)}>Next <FiArrowRight /></p>
            </div>
        </section >
    )
}
