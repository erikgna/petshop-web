import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useEspecie } from '../../hooks/useEspecie'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const EspecieDashboard = () => {
    const especieHook = useEspecie()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            especieHook.getOne(id)
        }
    }, [])

    if (especieHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => especieHook.especieInput.idespecie ? especieHook.update(e) : especieHook.create(e)} className={styles.DashboardForm}>
                <h2>{especieHook.especieInput.idespecie ? 'Editando espécie' : 'Criando espécie'}</h2>

                <label htmlFor="nome">Nome da espécie</label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder='Ex: Cachorro'
                    value={especieHook.especieInput.nome}
                    onChange={(e) => especieHook.setEspecieInput({ ...especieHook.especieInput, nome: e.target.value })}
                />

                <input type="submit" value={especieHook.especieInput.idespecie ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
