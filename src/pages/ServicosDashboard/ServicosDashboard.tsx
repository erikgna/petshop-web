import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useServico } from '../../hooks/useServico'
import { useCategoriaServico } from '../../hooks/useCategoriaServico'

import styles from '../../global/styles/ListDashboard.module.scss'

export const ServicosDashboard = () => {
    const servicoHook = useServico()
    const categoriasServicoHook = useCategoriaServico()

    useEffect(() => {
        servicoHook.get()
        servicoHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Serviços</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { servicoHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/servico/new">
                    <button>Criar novo</button>
                </Link>

                <select className={styles.Select} name="categoria" id="categoria" onChange={(e) => {
                    servicoHook.filterByCategory(e.target.value)
                }}>
                    <option value='null' selected>Todas categorias</option>
                    {categoriasServicoHook.categoriaServicos.map((categoria) => {
                        return <option value={categoria.idcategoriaservico} key={categoria.idcategoriaservico}>{categoria.nome}</option>
                    })}
                </select>

            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de servicos</h3>
                        <button onClick={servicoHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => servicoHook.changePage(servicoHook.page - 1)} />
                        {servicoHook.pages.map((page) => {
                            if (page === servicoHook.page) {
                                return <p key={page} onClick={() => servicoHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => servicoHook.changePage(page)}>{page}..</p>
                            }
                            if (servicoHook.page - page === 2 || servicoHook.page - page === 1) {
                                return <p key={page} onClick={() => servicoHook.changePage(page)}>{page}</p>
                            }
                            if (servicoHook.page - page === -2 || servicoHook.page - page === -1) {
                                return <p key={page} onClick={() => servicoHook.changePage(page)}>{page}</p>
                            }
                            if (page === servicoHook.pages[servicoHook.pages.length - 1]) {
                                return <p key={page} onClick={() => servicoHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => servicoHook.changePage(servicoHook.page + 1)} />
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
                                    checked={servicoHook.servicos.length === servicoHook.selecteds.length && servicoHook.servicos.length !== 0}
                                    onChange={servicoHook.checkAll}
                                />
                            </th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicoHook.servicos.map((servico) => (
                            <tr key={servico.idservico}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={servico.idservico}
                                        id={servico.idservico}
                                        checked={servicoHook.selecteds.includes(servico.idservico as string)}
                                        onChange={() => servicoHook.changeSelection(servico.idservico as string)}
                                    />
                                </td>
                                <td>{servico.nome}</td>
                                <td>{servico.categoriaservico?.nome}</td>
                                <td>R${servico.valor}</td>
                                <td>
                                    <Link to={`/dashboard/servico/${servico.idservico}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
