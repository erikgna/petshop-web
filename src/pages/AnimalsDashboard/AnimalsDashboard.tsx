import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { formatDateFromBack } from '../../global/utils/DataFormat'
import { useAnimal } from '../../hooks/useAnimal'

import styles from '../../global/styles/ListDashboard.module.scss'

export const AnimalsDashboard = () => {
    const animalHook = useAnimal()

    useEffect(() => {
        animalHook.get()
        animalHook.getPagination(0, 20)
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Animais</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { animalHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/animal/new">
                    <button>Criar novo</button>
                </Link>
            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de Animais</h3>
                        <button onClick={animalHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => animalHook.changePage(animalHook.page - 1)} />
                        {animalHook.pages.map((page) => {
                            if (page === animalHook.page) {
                                return <p key={page} onClick={() => animalHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => animalHook.changePage(page)}>{page}..</p>
                            }
                            if (animalHook.page - page === 2 || animalHook.page - page === 1) {
                                return <p key={page} onClick={() => animalHook.changePage(page)}>{page}</p>
                            }
                            if (animalHook.page - page === -2 || animalHook.page - page === -1) {
                                return <p key={page} onClick={() => animalHook.changePage(page)}>{page}</p>
                            }
                            if (page === animalHook.pages[animalHook.pages.length - 1]) {
                                return <p key={page} onClick={() => animalHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => animalHook.changePage(animalHook.page + 1)} />
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
                                    checked={animalHook.animals.length === animalHook.selecteds.length && animalHook.animals.length !== 0}
                                    onChange={animalHook.checkAll}
                                />
                            </th>
                            <th>Nome</th>
                            <th>Genêro</th>
                            <th>Cor</th>
                            {/* <th>Espécie</th> */}
                            <th>Raça</th>
                            <th>Data de Nascimento</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {animalHook.animals.map((animal) => (
                            <tr key={animal.idanimal}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={animal.idanimal}
                                        id={animal.idanimal}
                                        checked={animalHook.selecteds.includes(animal.idanimal as string)}
                                        onChange={() => animalHook.changeSelection(animal.idanimal as string)}
                                    />
                                </td>
                                <td>{animal.nome}</td>
                                <td>{animal.genero}</td>
                                <td>{animal.cor}</td>
                                {/* <td>{animal.especie?.nome}</td> */}
                                <td>{animal.raca?.nome}</td>
                                <td>{formatDateFromBack(animal.datanascimento as string)}</td>
                                <td>
                                    <Link to={`/dashboard/animal/${animal.idanimal}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
