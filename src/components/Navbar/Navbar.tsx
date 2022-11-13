import { Link } from 'react-router-dom'
import { BsFillCartFill } from 'react-icons/bs'
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'

import styles from './Navbar.module.scss'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { useQuery } from '@tanstack/react-query'
import { APIGet } from '../../api'
import { Loading } from '../Loading/Loading'
import { ICategoriaProduto } from '../../interfaces/categoriaProduto'

export const Navbar = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const { user, cart } = useContext(AuthContext)

    const { data, isLoading } = useQuery({ queryKey: ['categories'], queryFn: () => APIGet('/categoria-produto') })

    if (isLoading) {
        return <Loading />
    }

    const categories = data?.data as ICategoriaProduto[]
    return (
        <nav className={styles.Navbar}>
            <h1>MyPetShop</h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li className={styles.Dropdown}>
                    <p>Category <IoIosArrowDown /></p>
                    <div>
                        {categories.map((item) => (
                            <Link key={item.idcategoriaproduto} to={`/shop/${item.idcategoriaproduto}`}>{item.nome}</Link>
                        ))}
                    </div>
                </li>
                <li>
                    <Link to='/blog'>Blog</Link>
                </li>
                <li>
                    <Link to='/shop'>Shop</Link>
                </li>
            </ul>
            <div className={styles.Utils}>
                {
                    showMenu ?
                        <AiFillCloseCircle className={styles.Menu} onClick={() => setShowMenu(!showMenu)} />
                        : <AiOutlineMenu className={styles.Menu} onClick={() => setShowMenu(!showMenu)} />
                }
                <Link to='/cart'>
                    <div className="cart">
                        <BsFillCartFill />
                        <p>{cart?.produtos.length}</p>
                    </div>
                </Link>
                {user ?
                    <Link to='/profile'>
                        <button className='ButtonPrimary'>Profile</button>
                    </Link> :
                    <Link to='/auth'>
                        <button className='ButtonPrimary'>Login</button>
                    </Link>
                }
            </div>
            <div className={styles.MobileMenu} style={{ display: showMenu ? 'flex' : 'none' }}>
                <Link to='/'>Home</Link>
                <Link to='/especie'>Especies</Link>
                <Link to='/raca'>Racas</Link>
                <Link to='/fornecedor'>Fornecedores</Link>
            </div>
        </nav>
    )
}
