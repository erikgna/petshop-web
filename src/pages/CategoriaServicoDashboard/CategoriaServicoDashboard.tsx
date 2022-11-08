import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useCategoriaServico } from '../../hooks/useCategoriaServico'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const CategoriaServicoDashboard = () => {
    const categoriaServicoHook = useCategoriaServico()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            categoriaServicoHook.getOne(id)
        }
    }, [])

    if (categoriaServicoHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => categoriaServicoHook.categoriaServicosInput.idcategoriaservico ? categoriaServicoHook.update(e) : categoriaServicoHook.create(e)} className={styles.DashboardForm}>
                <h2>{categoriaServicoHook.categoriaServicosInput.idcategoriaservico ? 'Editando categoria' : 'Criando categoria'}</h2>

                <label htmlFor="nome">Nome da categoria</label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder='Ex: Pestiscos'
                    value={categoriaServicoHook.categoriaServicosInput.nome}
                    onChange={(e) => categoriaServicoHook.setCategoriaServicosInput({ ...categoriaServicoHook.categoriaServicosInput, nome: e.target.value })}
                />

                <input type="submit" value={categoriaServicoHook.categoriaServicosInput.idcategoriaservico ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
