import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SideNavigation.module.scss'

export const SideNavigation = () => {
    return (
        <nav className={styles.SideNav}>
            <h2>Pet Shop</h2>
            <ul>
                <h3>Loja</h3>
                <li>
                    <Link to='/'>Produtos</Link>
                </li>
                <li>
                    <Link to='/dashboard/servicos'>Serviços</Link>
                </li>
                <li>
                    <Link to='/dashboard/clientes'>Clientes</Link>
                </li>
                <li>
                    <Link to='/dashboard/animais'>Animais</Link>
                </li>
                <li>
                    <Link to='/dashboard/categoria-produto'>Categorias Produtos</Link>
                </li>
                <li>
                    <Link to='/dashboard/categoria-servico'>Categorias Serviços</Link>
                </li>
                <h3>Administrar</h3>
                <li>
                    <Link to='/dashboard/funcionarios'>Funcionários</Link>
                </li>
                <li>
                    <Link to='/dashboard/fornecedores'>Fornecedores</Link>
                </li>
                <li>
                    <Link to='/dashboard/especies'>Espécies</Link>
                </li>
                <li>
                    <Link to='/dashboard/racas'>Raças</Link>
                </li>
                <h3>Monetário</h3>
                <li>
                    <Link to='/dashboard/notas-venda'>Notas de Venda</Link>
                </li>
                <li>
                    <Link to='/dashboard/notas-compra'>Notas de Compra</Link>
                </li>
                <li>
                    <Link to='/dashboard/relatorios'>Relatórios</Link>
                </li>
            </ul>
        </nav>
    )
}
