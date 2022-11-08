import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useCategoriaProduto } from '../../hooks/useCategoriaProduto'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const CategoriaProdutoDashboard = () => {
    const categoriaProdutoHook = useCategoriaProduto()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            categoriaProdutoHook.getOne(id)
        }
    }, [])

    if (categoriaProdutoHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => categoriaProdutoHook.categoriaProdutosInput.idcategoriaproduto ? categoriaProdutoHook.update(e) : categoriaProdutoHook.create(e)} className={styles.DashboardForm}>
                <h2>{categoriaProdutoHook.categoriaProdutosInput.idcategoriaproduto ? 'Editando categoria' : 'Criando categoria'}</h2>

                <label htmlFor="nome">Nome da categoria</label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder='Ex: Pestiscos'
                    value={categoriaProdutoHook.categoriaProdutosInput.nome}
                    onChange={(e) => categoriaProdutoHook.setCategoriaProdutosInput({ ...categoriaProdutoHook.categoriaProdutosInput, nome: e.target.value })}
                />

                <input type="submit" value={categoriaProdutoHook.categoriaProdutosInput.idcategoriaproduto ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
