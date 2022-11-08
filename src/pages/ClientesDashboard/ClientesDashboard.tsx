import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useCliente } from '../../hooks/useCliente'

import styles from '../../global/styles/ListDashboard.module.scss'

export const ClientesDashboard = () => {
    const clienteHook = useCliente()

    useEffect(() => {
        clienteHook.get()
        clienteHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Clientes</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { clienteHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/cliente/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de clientes</h3>
                        <button onClick={clienteHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => clienteHook.changePage(clienteHook.page - 1)} />
                        {clienteHook.pages.map((page) => {
                            if (page === clienteHook.page) {
                                return <p key={page} onClick={() => clienteHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => clienteHook.changePage(page)}>{page}..</p>
                            }
                            if (clienteHook.page - page === 2 || clienteHook.page - page === 1) {
                                return <p key={page} onClick={() => clienteHook.changePage(page)}>{page}</p>
                            }
                            if (clienteHook.page - page === -2 || clienteHook.page - page === -1) {
                                return <p key={page} onClick={() => clienteHook.changePage(page)}>{page}</p>
                            }
                            if (page === clienteHook.pages[clienteHook.pages.length - 1]) {
                                return <p key={page} onClick={() => clienteHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => clienteHook.changePage(clienteHook.page + 1)} />
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
                                    checked={clienteHook.clientes.length === clienteHook.selecteds.length && clienteHook.clientes.length !== 0}
                                    onChange={clienteHook.checkAll}
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
                        {clienteHook.clientes.map((cliente) => (
                            <tr key={cliente.idcliente}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={cliente.idcliente}
                                        id={cliente.idcliente}
                                        checked={clienteHook.selecteds.includes(cliente.idcliente as string)}
                                        onChange={() => clienteHook.changeSelection(cliente.idcliente as string)}
                                    />
                                </td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.telefone}</td>
                                <td>
                                    <Link to={`/dashboard/cliente/${cliente.idcliente}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
