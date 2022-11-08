import { useEffect } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { formatDateFromBack } from '../../global/utils/DataFormat'
import { useNotaCompra } from '../../hooks/useNotaCompra'

import styles from '../../global/styles/ListDashboard.module.scss'

export const NotaComprasDashboard = () => {
    const notaCompraHook = useNotaCompra()

    useEffect(() => {
        notaCompraHook.get()
        notaCompraHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Notas de Compra</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { notaCompraHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/notas-compra/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de Notas de Compra</h3>
                        <button onClick={notaCompraHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => notaCompraHook.changePage(notaCompraHook.page - 1)} />
                        {notaCompraHook.pages.map((page) => {
                            if (page === notaCompraHook.page) {
                                return <p key={page} onClick={() => notaCompraHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => notaCompraHook.changePage(page)}>{page}..</p>
                            }
                            if (notaCompraHook.page - page === 2 || notaCompraHook.page - page === 1) {
                                return <p key={page} onClick={() => notaCompraHook.changePage(page)}>{page}</p>
                            }
                            if (notaCompraHook.page - page === -2 || notaCompraHook.page - page === -1) {
                                return <p key={page} onClick={() => notaCompraHook.changePage(page)}>{page}</p>
                            }
                            if (page === notaCompraHook.pages[notaCompraHook.pages.length - 1]) {
                                return <p key={page} onClick={() => notaCompraHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => notaCompraHook.changePage(notaCompraHook.page + 1)} />
                    </div>
                </div>
                <table className={styles.Table}>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    name="all"
                                    id="all"
                                    checked={notaCompraHook.notaCompras.length === notaCompraHook.selecteds.length && notaCompraHook.notaCompras.length !== 0}
                                    onChange={notaCompraHook.checkAll}
                                />
                            </th>
                            <th>Produto</th>
                            <th>Fornecedor</th>
                            <th>Funcionário</th>
                            <th>Valor</th>
                            <th>Quantidade</th>
                            <th>Data Entrega</th>
                            <th>Data Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notaCompraHook.notaCompras.map((notacompra) => (
                            <tr key={notacompra.idnotacompra}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={notacompra.idnotacompra}
                                        id={notacompra.idnotacompra}
                                        checked={notaCompraHook.selecteds.includes(notacompra.idnotacompra as string)}
                                        onChange={() => notaCompraHook.changeSelection(notacompra.idnotacompra as string)}
                                    />
                                </td>
                                <td>{notacompra.produto?.nome}</td>
                                <td>{notacompra.fornecedor?.nome}</td>
                                <td>{notacompra.funcionario?.nome}</td>
                                <td>R${notacompra.valor}</td>
                                <td>{notacompra.quantidade}</td>
                                <td>{formatDateFromBack(notacompra.dataentrega as string)}</td>
                                <td>{formatDateFromBack(notacompra.datapedido as string)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
