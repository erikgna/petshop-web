import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { APIGetPagination } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { formatDateFromBack } from '../../global/utils/DataFormat'
import { IPost, IPostUser } from '../../interfaces/post'

import styles from './Blog.module.scss'

const textExample = "In this project, we are going to create an Lorem Ipsum generator with JavaScript. Lorem Ipsum is the dummy text, used by almost all developers to show in place of data in their project. We are going to use a variance of it called Hipster Ipsum."

export const Blog = () => {
    const [page, setPage] = useState<number>(1)

    const postQuery = useQuery({
        queryKey: ['posts', page], queryFn: () => APIGetPagination(page, '/post'), keepPreviousData: true
    })

    if (postQuery.isLoading) {
        return <Loading />
    }

    const posts = postQuery.data?.data as IPostUser
    return (
        <section className={styles.Posts}>

            <div className={styles.SearchBar}>
                <input type="text" placeholder='Search..' />
                <FiSearch />
            </div>

            {posts.posts.map((item, index) => {
                if (index % 2 === 0) return <div key={item.idpost} className={styles.BigPost}>
                    <img className={styles.BigImage} src={item.foto} />
                    <div className={styles.Content}>
                        <p><strong>{item.categoriapost.name} . </strong>{formatDateFromBack(item.date.toString())}</p>
                        <h2>{item.title}</h2>
                        <p>{item.description.length > 180 ? `${item.description.substring(0, 180)}...` : item.description}</p>
                        <div className={styles.Profile}>
                            <img src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" alt="" />
                            <div>
                                <h4>Bruno Teixeira</h4>
                                <p>Lead Product Owner</p>
                            </div>
                        </div>
                    </div>
                </div>
                else return <div key={item.idpost} className={styles.Post}>
                    <img className={styles.PostImage} src={item.foto} />
                    <div>
                        <p><strong>{item.categoriapost.name} . </strong>{formatDateFromBack(item.date.toString())}</p>
                        <Link to={`/post/${item.idpost}`}><h2>{item.title}</h2></Link>
                        <p>{item.description}</p>
                        <div className={styles.Profile}>
                            <img src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" alt="" />
                            <div>
                                <h6></h6>
                                <p>Lead Product Owner</p>
                            </div>
                        </div>
                    </div>
                </div>
            })}

            <div className={styles.Navigation}>
                {page !== 1 && <p><FiArrowLeft /> Previous</p>}
                {posts.page > 0 && <p>Next <FiArrowRight /></p>}
            </div>
        </section >
    )
}
