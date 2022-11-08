import { AiFillHeart } from 'react-icons/ai'
import { FiBookmark } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import styles from './Post.module.scss'

export const Post = () => {
    return (
        <section className={styles.PostSection}>
            <div className={styles.PostContent}>
                <h1>Create a Lorem Ipsum Generator in JavaScript</h1>
                <img src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" alt="" />
                <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    <br />
                    <br />
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </p>
                <img src="https://miro.medium.com/max/640/1*1c16SHuSwzJTYQQJ_NelSg.gif" alt="" />

                <div className={styles.Icons}>
                    <AiFillHeart />
                    <FiBookmark />
                </div>
            </div>
            <div>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className={styles.Post}>
                        <div>
                            <p><strong>Product . </strong>July 24, 2020</p>
                            <Link key={item} to={`/post/${item}`}><h3>Interview - WWhat it's like to work remotely in big-sized product development?</h3></Link>
                            <p>In this project, we are going to create an Lorem Ipsum generator with JavaScript. Lorem Ipsum is the dummy text, used by almost all developers to show in place of data in their project. We are going to use a variance of it called Hipster Ipsum.</p>
                            <div className={styles.Profile}>
                                <img src="https://static.diverseui.com/male-1.jpg" alt="" />
                                <div>
                                    <h6>Bruno Teixeira</h6>
                                    <p>Lead Product Owner</p>
                                </div>
                            </div>
                        </div>
                        <img className={styles.PostImage} src="https://miro.medium.com/max/720/1*1AktzTtx2ZOH1kb8yv7Piw.jpeg" />
                    </div>
                ))}
            </div>
        </section>
    )
}
