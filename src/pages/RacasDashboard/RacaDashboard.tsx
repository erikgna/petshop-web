import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useRaca } from '../../hooks/useRaca'
import { useEspecie } from '../../hooks/useEspecie'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const RacaDashboard = () => {
    const racaHook = useRaca()
    const especieHook = useEspecie()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            racaHook.getOne(id)
        }
        especieHook.get()
    }, [])

    if (racaHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => racaHook.racaInput.idespecie ? racaHook.update(e) : racaHook.create(e)} className={styles.DashboardForm}>
                <h2>{racaHook.racaInput.idespecie ? 'Editando raça' : 'Criando raça'}</h2>

                <label htmlFor="nome">Nome da raça</label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder='Ex: Golden Retriever'
                    value={racaHook.racaInput.nome}
                    onChange={(e) => racaHook.setRacaInput({ ...racaHook.racaInput, nome: e.target.value })}
                />

                <label htmlFor="especie">Escolha a espécie</label>
                <select name="especie" id="especie" onChange={(e) => racaHook.setRacaInput({ ...racaHook.racaInput, idespecie: e.target.value })}>
                    {racaHook.racaInput.idraca === undefined && <option value="null" defaultValue="">Escolha uma opção</option>}
                    {especieHook.especies.map((especie) => {
                        if (especie.idespecie === racaHook.racaInput.idespecie) return <option selected key={especie.idespecie} value={especie.idespecie}>{especie.nome}</option>
                        return <option value={especie.idespecie} key={especie.idespecie}>{especie.nome}</option>
                    })}
                </select>

                <input type="submit" value={racaHook.racaInput.idraca ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
