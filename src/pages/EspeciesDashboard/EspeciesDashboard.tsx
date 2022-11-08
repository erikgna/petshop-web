import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useEspecie } from '../../hooks/useEspecie'

import styles from '../../global/styles/ListDashboard.module.scss'

export const EspeciesDashboard = () => {
    const especieHook = useEspecie()

    useEffect(() => {
        especieHook.get()
        especieHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Espécies</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { especieHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/especie/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de espécies</h3>
                        <button onClick={especieHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => especieHook.changePage(especieHook.page - 1)} />
                        {especieHook.pages.map((page) => {
                            if (page === especieHook.page) {
                                return <p key={page} onClick={() => especieHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => especieHook.changePage(page)}>{page}..</p>
                            }
                            if (especieHook.page - page === 2 || especieHook.page - page === 1) {
                                return <p key={page} onClick={() => especieHook.changePage(page)}>{page}</p>
                            }
                            if (especieHook.page - page === -2 || especieHook.page - page === -1) {
                                return <p key={page} onClick={() => especieHook.changePage(page)}>{page}</p>
                            }
                            if (page === especieHook.pages[especieHook.pages.length - 1]) {
                                return <p key={page} onClick={() => especieHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => especieHook.changePage(especieHook.page + 1)} />
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
                                    checked={especieHook.especies.length === especieHook.selecteds.length && especieHook.especies.length !== 0}
                                    onChange={especieHook.checkAll}
                                />
                            </th>
                            <th>Nome</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {especieHook.especies.map((especie) => (
                            <tr key={especie.idespecie}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={especie.idespecie}
                                        id={especie.idespecie}
                                        checked={especieHook.selecteds.includes(especie.idespecie as string)}
                                        onChange={() => especieHook.changeSelection(especie.idespecie as string)}
                                    />
                                </td>
                                <td>{especie.nome}</td>
                                <td>
                                    <Link to={`/dashboard/especie/${especie.idespecie}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
