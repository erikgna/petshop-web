import { Link } from 'react-router-dom'

import { formatDateFromBack } from '../../../../global/utils/DataFormat'
import { IPostCategories } from '../../../../interfaces/post'

import styles from '../../Blog.module.scss'

export const NormalPost = ({ item }: { item: IPostCategories }) => {
    return (
        <div className={styles.Post}>
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
    )
}
