import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FiBookmark } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

import { APIGetOne, APIUpdate } from '../../api'
import { Loading } from '../../components/Loading/Loading'
import { AuthContext } from '../../contexts/Auth'
import { formatDateFromBack } from '../../global/utils/DataFormat'
import { IPostCategories } from '../../interfaces/post'

import styles from './Post.module.scss'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { ICliente } from '../../interfaces/cliente'

export const Post = () => {
    const { id } = useParams()

    const { cliente, setCliente } = useContext(AuthContext)

    const postQuery = useQuery({
        queryKey: ['post'], queryFn: () => APIGetOne(id as string, '/post')
    })

    if (postQuery.isLoading) {
        return <Loading />
    }

    const post = postQuery.data?.data as { post: IPostCategories, similiarPosts: IPostCategories[] }
    return (
        <section className={styles.PostSection}>
            <div className={styles.PostContent}>
                <h1>{post.post.title}</h1>
                <img src={post.post.foto} alt="Post banner" />
                <p>{post.post.description}</p>

                <div className={styles.Icons}>
                    {cliente?.savedposts?.indexOf(post.post.idpost) === -1 ?
                        <FiBookmark onClick={async () => {
                            cliente?.savedposts?.push(post.post.idpost)
                            await APIUpdate(cliente!, `/cliente`)

                            setCliente({ ...cliente, savedposts: cliente.savedposts })
                        }} /> : <BsFillBookmarkFill onClick={async () => {
                            const updatedCliente = { ...cliente, savedposts: cliente?.savedposts?.filter((val) => val !== post.post.idpost) } as ICliente
                            await APIUpdate(updatedCliente, `/cliente`)

                            setCliente(updatedCliente)
                        }} />
                    }
                </div>
            </div>
            <div>
                {post.similiarPosts.map((item) => (
                    <div key={item.idpost} className={styles.Post}>
                        <div>
                            <p><strong>{item.categoriapost.name} . </strong>{formatDateFromBack(item.date.toString())}</p>
                            <Link to={`/post/${item.idpost}`}><h3>{item.title}</h3></Link>
                            <p>{item.description}</p>
                            <div className={styles.Profile}>
                                <img src="https://static.diverseui.com/male-1.jpg" alt="" />
                                <div>
                                    <h6>Bruno Teixeira</h6>
                                    <p>Lead Product Owner</p>
                                </div>
                            </div>
                        </div>
                        <img className={styles.PostImage} src={item.foto} />
                    </div>
                ))}
            </div>
        </section>
    )
}
