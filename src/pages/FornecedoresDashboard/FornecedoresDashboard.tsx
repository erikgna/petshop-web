import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useFornecedor } from '../../hooks/useFornecedor'

import styles from '../../global/styles/ListDashboard.module.scss'

export const FornecedoresDashboard = () => {
    const fornecedorHook = useFornecedor()

    useEffect(() => {
        fornecedorHook.get()
        fornecedorHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Fornecedores</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { fornecedorHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/fornecedor/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de Fornecedores</h3>
                        <button onClick={fornecedorHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => fornecedorHook.changePage(fornecedorHook.page - 1)} />
                        {fornecedorHook.pages.map((page) => {
                            if (page === fornecedorHook.page) {
                                return <p key={page} onClick={() => fornecedorHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => fornecedorHook.changePage(page)}>{page}..</p>
                            }
                            if (fornecedorHook.page - page === 2 || fornecedorHook.page - page === 1) {
                                return <p key={page} onClick={() => fornecedorHook.changePage(page)}>{page}</p>
                            }
                            if (fornecedorHook.page - page === -2 || fornecedorHook.page - page === -1) {
                                return <p key={page} onClick={() => fornecedorHook.changePage(page)}>{page}</p>
                            }
                            if (page === fornecedorHook.pages[fornecedorHook.pages.length - 1]) {
                                return <p key={page} onClick={() => fornecedorHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => fornecedorHook.changePage(fornecedorHook.page + 1)} />
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
                                    checked={fornecedorHook.fornecedors.length === fornecedorHook.selecteds.length && fornecedorHook.fornecedors.length !== 0}
                                    onChange={fornecedorHook.checkAll}
                                />
                            </th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fornecedorHook.fornecedors.map((fornecedor) => (
                            <tr key={fornecedor.idfornecedor}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={fornecedor.idfornecedor}
                                        id={fornecedor.idfornecedor}
                                        checked={fornecedorHook.selecteds.includes(fornecedor.idfornecedor as string)}
                                        onChange={() => fornecedorHook.changeSelection(fornecedor.idfornecedor as string)}
                                    />
                                </td>
                                <td>{fornecedor.nome}</td>
                                <td>{fornecedor.cpf}</td>
                                <td>{fornecedor.endereco}</td>
                                <td>{fornecedor.telefone}</td>
                                <td>
                                    <Link to={`/dashboard/fornecedor/${fornecedor.idfornecedor}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
