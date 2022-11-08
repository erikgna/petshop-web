import { useEffect } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { formatDateFromBack } from '../../global/utils/DataFormat'
import { useNotaVenda } from '../../hooks/useNotaVenda'

import styles from '../../global/styles/ListDashboard.module.scss'

export const NotaVendasDashboard = () => {
    const notaVendasHook = useNotaVenda()

    useEffect(() => {
        notaVendasHook.get()
        notaVendasHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Notas de Venda</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { notaVendasHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/nota-venda/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de Notas de Venda</h3>
                        <button onClick={notaVendasHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => notaVendasHook.changePage(notaVendasHook.page - 1)} />
                        {notaVendasHook.pages.map((page) => {
                            if (page === notaVendasHook.page) {
                                return <p key={page} onClick={() => notaVendasHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => notaVendasHook.changePage(page)}>{page}..</p>
                            }
                            if (notaVendasHook.page - page === 2 || notaVendasHook.page - page === 1) {
                                return <p key={page} onClick={() => notaVendasHook.changePage(page)}>{page}</p>
                            }
                            if (notaVendasHook.page - page === -2 || notaVendasHook.page - page === -1) {
                                return <p key={page} onClick={() => notaVendasHook.changePage(page)}>{page}</p>
                            }
                            if (page === notaVendasHook.pages[notaVendasHook.pages.length - 1]) {
                                return <p key={page} onClick={() => notaVendasHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => notaVendasHook.changePage(notaVendasHook.page + 1)} />
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
                                    checked={notaVendasHook.notaVendas.length === notaVendasHook.selecteds.length && notaVendasHook.notaVendas.length !== 0}
                                    onChange={notaVendasHook.checkAll}
                                />
                            </th>
                            <th>Serviço</th>
                            <th>Produto</th>
                            <th>Cliente</th>
                            <th>Funcionário</th>
                            <th>Valor</th>
                            <th>Quantidade</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notaVendasHook.notaVendas.map((notavenda) => (
                            <tr key={notavenda.idnotavenda}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={notavenda.idnotavenda}
                                        id={notavenda.idnotavenda}
                                        checked={notaVendasHook.selecteds.includes(notavenda.idnotavenda as string)}
                                        onChange={() => notaVendasHook.changeSelection(notavenda.idnotavenda as string)}
                                    />
                                </td>
                                <td>{notavenda.servico?.nome}</td>
                                <td>{notavenda.produto?.nome}</td>
                                <td>{notavenda.cliente?.nome}</td>
                                <td>{notavenda.funcionario?.nome}</td>
                                <td>R${notavenda.valor}</td>
                                <td>{notavenda.quantidade}</td>
                                <td>{formatDateFromBack(notavenda.data as string)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
