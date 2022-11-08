import { FiArrowLeft, FiArrowRight, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import styles from './Blog.module.scss'

const textExample = "In this project, we are going to create an Lorem Ipsum generator with JavaScript. Lorem Ipsum is the dummy text, used by almost all developers to show in place of data in their project. We are going to use a variance of it called Hipster Ipsum."

export const Blog = () => {
    return (
        <section className={styles.Posts}>

            <div className={styles.SearchBar}>
                <input type="text" placeholder='Search..' />
                <FiSearch />
            </div>
            <div className={styles.BigPost}>
                <img className={styles.BigImage} src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" />
                <div className={styles.Content}>
                    <p><strong>Product . </strong>July 24, 2020</p>
                    <h2>Interview - WWhat it's like to work remotely in big-sized product development?</h2>
                    <p>{textExample.length > 180 ? `${textExample.substring(0, 180)}...` : textExample}</p>
                    <div className={styles.Profile}>
                        <img src="https://static.diverseui.com/male-1.jpg" alt="" />
                        <div>
                            <h4>Bruno Teixeira</h4>
                            <p>Lead Product Owner</p>
                        </div>
                    </div>
                </div>
            </div>
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className={styles.Post}>
                    <img className={styles.PostImage} src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" />
                    <div>
                        <p><strong>Product . </strong>July 24, 2020</p>
                        <Link key={item} to={`/post/${item}`}><h2>Interview - WWhat it's like to work remotely in big-sized product development?</h2></Link>
                        <p>In this project, we are going to create an Lorem Ipsum generator with JavaScript. Lorem Ipsum is the dummy text, used by almost all developers to show in place of data in their project. We are going to use a variance of it called Hipster Ipsum.</p>
                        <div className={styles.Profile}>
                            <img src="https://static.diverseui.com/male-1.jpg" alt="" />
                            <div>
                                <h6>Bruno Teixeira</h6>
                                <p>Lead Product Owner</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className={styles.Navigation}>
                <p><FiArrowLeft /> Previous</p>
                <p>Next <FiArrowRight /></p>
            </div>
        </section >
    )
}
