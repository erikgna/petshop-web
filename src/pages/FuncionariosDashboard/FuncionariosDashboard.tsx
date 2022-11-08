import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useFuncionario } from '../../hooks/useFuncionario'
import { formatDateFromBack } from '../../global/utils/DataFormat'

import styles from '../../global/styles/ListDashboard.module.scss'

export const FuncionariosDashboard = () => {
    const funcionarioHook = useFuncionario()

    useEffect(() => {
        funcionarioHook.get()
        funcionarioHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Funcionários</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { funcionarioHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/funcionario/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de Funcionários</h3>
                        <button onClick={funcionarioHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => funcionarioHook.changePage(funcionarioHook.page - 1)} />
                        {funcionarioHook.pages.map((page) => {
                            if (page === funcionarioHook.page) {
                                return <p key={page} onClick={() => funcionarioHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => funcionarioHook.changePage(page)}>{page}..</p>
                            }
                            if (funcionarioHook.page - page === 2 || funcionarioHook.page - page === 1) {
                                return <p key={page} onClick={() => funcionarioHook.changePage(page)}>{page}</p>
                            }
                            if (funcionarioHook.page - page === -2 || funcionarioHook.page - page === -1) {
                                return <p key={page} onClick={() => funcionarioHook.changePage(page)}>{page}</p>
                            }
                            if (page === funcionarioHook.pages[funcionarioHook.pages.length - 1]) {
                                return <p key={page} onClick={() => funcionarioHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => funcionarioHook.changePage(funcionarioHook.page + 1)} />
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
                                    checked={funcionarioHook.funcionarios.length === funcionarioHook.selecteds.length && funcionarioHook.funcionarios.length !== 0}
                                    onChange={funcionarioHook.checkAll}
                                />
                            </th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>Função</th>
                            <th>Salário</th>
                            <th>Data de Entrada</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarioHook.funcionarios.map((funcionario) => (
                            <tr key={funcionario.idfuncionario}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={funcionario.idfuncionario}
                                        id={funcionario.idfuncionario}
                                        checked={funcionarioHook.selecteds.includes(funcionario.idfuncionario as string)}
                                        onChange={() => funcionarioHook.changeSelection(funcionario.idfuncionario as string)}
                                    />
                                </td>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.cpf}</td>
                                <td>{funcionario.endereco}</td>
                                <td>{funcionario.telefone}</td>
                                <td>{funcionario.funcao}</td>
                                <td>{funcionario.salario}</td>
                                <td>{formatDateFromBack(funcionario.dataentrada as string)}</td>
                                <td>
                                    <Link to={`/dashboard/funcionario/${funcionario.idfuncionario}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
