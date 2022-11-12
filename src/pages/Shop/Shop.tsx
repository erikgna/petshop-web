import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { APIGet, APIGetCategory, APIGetPagination, APIGetSearch } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { ICategoriaProduto } from '../../interfaces/categoriaProduto'
import { ISimpleProduto } from '../../interfaces/produto'

import styles from './Shop.module.scss'

const categoryUrl = '/produto/category'
const searchUrl = '/produto/search'
const baseUrl = '/produto/page'
const categoriesUrl = '/categoria-produto'

export const Shop = () => {
    const [page, setPage] = useState<number>(1)
    const [searchText, setSearchText] = useState<string>('')
    const [searchResult, setSearchResult] = useState<ISimpleProduto[] | null>(null)
    const [selectCategory, setSelectCategory] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const productQuery = useQuery({
        queryKey: ['products', page], queryFn: () =>
            selectCategory !== '' ?
                APIGetCategory(selectCategory, page, categoryUrl) :
                APIGetPagination(page, baseUrl), keepPreviousData: true
    })

    const categoriesQuery = useQuery({
        queryKey: ['categories'], queryFn: () => APIGet(categoriesUrl)
    })

    const search = async () => {
        setLoading(true)
        try {
            const { data, status } = await APIGetSearch(searchText, searchUrl)
            if (status !== 200) {
                setSearchResult(null)
                return;
            }

            setSearchResult(data as ISimpleProduto[])
        } catch (error) {
            setSearchResult([])
        }
        setLoading(false)
    }

    const chooseCategory = (id: string) => {
        setPage(0)
        setSelectCategory(id)
    }

    if (productQuery.isLoading || loading || categoriesQuery.isLoading) {
        return <Loading />
    }

    return (
        <section className={styles.Center}>
            <div className={styles.SearchBar}>
                <input type="text" placeholder='Search..' onChange={(e) => setSearchText(e.target.value)} />
                <FiSearch onClick={search} />
            </div>
            <div className={styles.Shop}>
                <div className={styles.Categories}>
                    <h3>Categories</h3>
                    <ul>
                        {(categoriesQuery.data?.data as ICategoriaProduto[]).map((category) => (
                            <li
                                key={category.idcategoriaproduto}
                                onClick={() => chooseCategory(category.idcategoriaproduto as string)}
                            >{category.nome}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.Products}>
                    {searchResult?.length === 0 && <h1>No results found.</h1>}
                    {
                        (productQuery.data?.data as ISimpleProduto[]).map((item, index) => {
                            if (index % 2 === 0) {
                                return <Link to={`/product/${item.idproduto}`} key={item.idproduto}>
                                    <div className={styles.FullProduct} style={{ backgroundImage: `url("${item.foto}")` }}>
                                        <div className={styles.OverDesc}>
                                            <blockquote>{item.descricao}</blockquote>
                                        </div>

                                        <div className={styles.NormalDesc}>
                                            <h4>{item.nome}</h4>
                                            <p>{item.categoriaproduto?.nome}</p>
                                            <strong>${item.valor}</strong>
                                        </div>
                                    </div>
                                </Link>
                            }

                            return <Link to={`/product/${item.idproduto}`} key={item.idproduto}>
                                <div className={styles.Product}>
                                    <div className={styles.ProductImage} style={{ backgroundImage: `url("${item.foto}")` }}>
                                        <div className={styles.OverDesc}>
                                            <blockquote>{item.descricao}</blockquote>
                                        </div>
                                    </div>
                                    <h4>{item.nome}</h4>
                                    <p>{item.categoriaproduto?.nome}</p>
                                    <strong>${item.valor}</strong>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
            <div className={styles.Navigation}>
                {page === 1 ? <p></p> : <p onClick={() => setPage(page - 1)}><FiArrowLeft /> Previous</p>}
                {productQuery.data?.data.length === 20 && <p onClick={() => setPage(page + 1)}>Next <FiArrowRight /></p>}
            </div>
        </section >
    )
}
