import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiSearch } from 'react-icons/fi'

import { APIGetPagination, APIGetSearch } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { IPostCategories, IPostUser } from '../../interfaces/post'
import { BigPost } from './components/BigPost/BigPost'
import { NormalPost } from './components/NormalPost/NormalPost'

import styles from './Blog.module.scss'

export const Blog = () => {
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const [searchResult, setSearchResult] = useState<IPostCategories[] | null>(null)

    const postQuery = useQuery({
        queryKey: ['posts', page], queryFn: () => APIGetPagination(page, '/post/page'), keepPreviousData: true
    })

    const search = async () => {
        setLoading(true)
        try {
            const { data, status } = await APIGetSearch(searchText, '/post/search')
            if (status !== 200) {
                setSearchResult(null)
                return;
            }

            setSearchResult(data as IPostCategories[])
        } catch (error) {
            setSearchResult(null)
        }
        setLoading(false)
    }

    if (postQuery.isLoading || loading) {
        return <Loading />
    }

    const posts = postQuery.data?.data as IPostUser
    return (
        <section className={styles.Posts}>

            <div className={styles.SearchBar}>
                <input type="text" placeholder='Search..' onChange={(e) => {
                    if (e.target.value === "") setSearchResult(null)
                    setSearchText(e.target.value)
                }} value={searchText} />
                <FiSearch onClick={search} />
            </div>

            {!searchResult && posts.posts.map((item, index) => {
                if (index % 2 === 0) return <BigPost item={item} key={item.idpost} />
                else return <NormalPost item={item} key={item.idpost} />
            })}

            {(searchResult && searchResult?.length > 0) && searchResult.map((item, index) => {
                if (index % 2 === 0) return <BigPost item={item} key={item.idpost} />
                else return <NormalPost item={item} key={item.idpost} />
            })}

            {(searchResult?.length === 0) && <h1>No posts</h1>}

            <div className={styles.Navigation}>
                {page !== 1 && <p onClick={() => setPage(page - 1)}><FiArrowLeft /> Previous</p>}
                {posts.page > 0 && <p onClick={() => setPage(page + 1)}>Next <FiArrowRight /></p>}
            </div>
        </section >
    )
}
