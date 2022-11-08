import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { formatDateFromBack } from '../../global/utils/DataFormat'
import { useProduto } from '../../hooks/useProduto'
import { useCategoriaProduto } from '../../hooks/useCategoriaProduto'

import styles from '../../global/styles/ListDashboard.module.scss'

export const ProdutosDashboard = () => {
    const produtoHook = useProduto()
    const categoriasProdutoHook = useCategoriaProduto()

    useEffect(() => {
        produtoHook.get()
        produtoHook.getPagination(0, 20)
        categoriasProdutoHook.get()
    }, [])

    return (
        <section className={styles.Principal}>
            <h1>Produtos</h1>
            <div className={styles.Search}>
                <form>
                    <div>
                        <label htmlFor="search">O que você está procurando?</label>
                        <input type="search" name='search' placeholder='Procurar..' onChange={(e) => { produtoHook.search(e.target.value) }} />
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                <Link to="/dashboard/produto/new">
                    <button>Criar novo</button>
                </Link>

                <select className={styles.Select} name="categoria" id="categoria" onChange={(e) => {
                    produtoHook.filterByCategory(e.target.value)
                }}>
                    <option value='null' selected>Todas categorias</option>
                    {categoriasProdutoHook.categoriaProdutos.map((categoria) => {
                        return <option value={categoria.idcategoriaproduto} key={categoria.idcategoriaproduto}>{categoria.nome}</option>
                    })}
                </select>

            </div>
            <div className={styles.AllTable}>
                <div className={styles.TableHeader}>
                    <div>
                        <h3>Sumário de Produtos</h3>
                        <button onClick={produtoHook.deleteAll}>Excluir Selecionados</button>
                    </div>
                    <div className={styles.Pagination}>
                        <MdOutlineKeyboardArrowLeft onClick={() => produtoHook.changePage(produtoHook.page - 1)} />
                        {produtoHook.pages.map((page) => {
                            if (page === produtoHook.page) {
                                return <p key={page} onClick={() => produtoHook.changePage(page)} className={styles.ActivePage}>{page}</p>
                            }
                            if (page === 1) {
                                return <p key={page} onClick={() => produtoHook.changePage(page)}>{page}..</p>
                            }
                            if (produtoHook.page - page === 2 || produtoHook.page - page === 1) {
                                return <p key={page} onClick={() => produtoHook.changePage(page)}>{page}</p>
                            }
                            if (produtoHook.page - page === -2 || produtoHook.page - page === -1) {
                                return <p key={page} onClick={() => produtoHook.changePage(page)}>{page}</p>
                            }
                            if (page === produtoHook.pages[produtoHook.pages.length - 1]) {
                                return <p key={page} onClick={() => produtoHook.changePage(page)}>..{page}</p>
                            }
                        })}
                        <MdOutlineKeyboardArrowRight onClick={() => produtoHook.changePage(produtoHook.page + 1)} />
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
                                    checked={produtoHook.produtos.length === produtoHook.selecteds.length && produtoHook.produtos.length !== 0}
                                    onChange={produtoHook.checkAll}
                                />
                            </th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            {/* <th>Fornecedor</th> */}
                            <th>Valor</th>
                            <th>Quantidade</th>
                            <th>Data de Reposição</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtoHook.produtos.map((produto) => (
                            <tr key={produto.idproduto}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={produto.idproduto}
                                        id={produto.idproduto}
                                        checked={produtoHook.selecteds.includes(produto.idproduto as string)}
                                        onChange={() => produtoHook.changeSelection(produto.idproduto as string)}
                                    />
                                </td>
                                <td>{produto.nome}</td>
                                <td>{produto.categoriaproduto?.nome}</td>
                                {/* <td>{produto.fornecedor?.nome}</td> */}
                                <td>R${produto.valor}</td>
                                <td>{produto.quantidade}</td>
                                <td>{formatDateFromBack(produto.datareposicao as string)}</td>
                                <td>
                                    <Link to={`/dashboard/produto/${produto.idproduto}`}><FiEdit /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
