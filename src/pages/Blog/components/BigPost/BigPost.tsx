import { Link } from 'react-router-dom'

import { formatDateFromBack } from '../../../../global/utils/DataFormat'
import { IPostCategories } from '../../../../interfaces/post'

import styles from '../../Blog.module.scss'

export const BigPost = ({ item }: { item: IPostCategories }) => {
    return (
        <div className={styles.BigPost}>
            <img className={styles.BigImage} src={item.foto} />
            <div className={styles.Content}>
                <p><strong>{item.categoriapost.name} . </strong>{formatDateFromBack(item.date.toString())}</p>
                <Link to={`/post/${item.idpost}`}><h2>{item.title}</h2></Link>
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
    )
}
