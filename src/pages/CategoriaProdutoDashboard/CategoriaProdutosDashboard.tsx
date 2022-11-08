import { useEffect } from 'react'
import { FiDelete, FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { useCategoriaProduto } from '../../hooks/useCategoriaProduto'

import styles from '../../global/styles/ListDashboard.module.scss'

export const CategoriaProdutosDashboard = () => {
    const categoriaProdutoHook = useCategoriaProduto()

    useEffect(() => {
        categoriaProdutoHook.get()
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Categorias de Produtos</h1>
            <div className={styles.Search}>
                <Link to="/dashboard/categoria-produto/new">
                    <button className={styles.Button}>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de categorias</h3>
                    </div>
                </div>
                <table className={styles.Table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriaProdutoHook.categoriaProdutos.map((item) => (
                            <tr key={item.idcategoriaproduto}>
                                <td>{item.nome}</td>
                                <td>
                                    <Link to={`/dashboard/categoria-produto/${item.idcategoriaproduto}`}><FiEdit /></Link>
                                </td>
                                <td>
                                    <FiDelete />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
