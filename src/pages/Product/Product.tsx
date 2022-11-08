import React, { useEffect } from 'react'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'
import { useParams } from 'react-router'
import { useProduto } from '../../hooks/useProduto'

import styles from './Product.module.scss'

const options = {
    color: [
        'Red',
        'Blue',
        'Green'
    ],
    size: [
        'P',
        'M',
        'G',
        'GG'
    ]
}

export const Product = () => {
    const { id } = useParams();
    const produtoHook = useProduto()

    useEffect(() => {
        produtoHook.getOne(id)
    }, [])

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
                    <img src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" alt="" />
                </div>
                <div className={styles.Infos}>
                    <h1>{produtoHook.produtoInput.nome}</h1>
                    <p>{produtoHook.produtoInput.categoriaproduto && 'No Category'}</p>
                    <strong>${produtoHook.produtoInput.valor}</strong>
                    {
                        Object.entries(options).map((item) => {
                            return <div>
                                <label htmlFor={item[0]}>{item[0]}</label>
                                <select key={item[0]} name={item[0]}>
                                    <option value="null" hidden>Select one</option>
                                    {item[1].map((option) => (
                                        <option value={option} key={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        })
                    }
                    <button className='ButtonPrimary'>Add To Cart</button>
                </div>
            </div>
            <h2>Description</h2>
            <p>
                {produtoHook.produtoInput.descricao}
            </p>
        </section>
    )
}
