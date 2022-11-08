import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useRaca } from '../../hooks/useRaca'

import styles from '../../global/styles/ListDashboard.module.scss'

export const RacasDashboard = () => {
    const racaHook = useRaca()

    useEffect(() => {
        racaHook.get()
        racaHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Raças</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { racaHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/raca/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de raças</h3>
                        <button onClick={racaHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => racaHook.changePage(racaHook.page - 1)} />
                        {racaHook.pages.map((page) => {
                            if (page === racaHook.page) {
                                return <p key={page} onClick={() => racaHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => racaHook.changePage(page)}>{page}..</p>
                            }
                            if (racaHook.page - page === 2 || racaHook.page - page === 1) {
                                return <p key={page} onClick={() => racaHook.changePage(page)}>{page}</p>
                            }
                            if (racaHook.page - page === -2 || racaHook.page - page === -1) {
                                return <p key={page} onClick={() => racaHook.changePage(page)}>{page}</p>
                            }
                            if (page === racaHook.pages[racaHook.pages.length - 1]) {
                                return <p key={page} onClick={() => racaHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => racaHook.changePage(racaHook.page + 1)} />
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
                                    checked={racaHook.racas.length === racaHook.selecteds.length && racaHook.racas.length !== 0}
                                    onChange={racaHook.checkAll}
                                />
                            </th>
                            <th>Nome</th>
                            <th>Espécie</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {racaHook.racas.map((raca) => (
                            <tr key={raca.idraca}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={raca.idraca}
                                        id={raca.idraca}
                                        checked={racaHook.selecteds.includes(raca.idraca as string)}
                                        onChange={() => racaHook.changeSelection(raca.idraca as string)}
                                    />
                                </td>
                                <td>{raca.nome}</td>
                                <td>{raca.especie?.nome}</td>
                                <td>
                                    <Link to={`/dashboard/raca/${raca.idraca}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
