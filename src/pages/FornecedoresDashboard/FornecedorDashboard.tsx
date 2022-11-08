import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useFornecedor } from '../../hooks/useFornecedor'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const FornecedorDashboard = () => {
    const fornecedorHook = useFornecedor()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fornecedorHook.getOne(id)
        }
    }, [])

    if (fornecedorHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => fornecedorHook.fornecedorInput.idfornecedor ? fornecedorHook.update(e) : fornecedorHook.create(e)} className={styles.DashboardForm}>
                <h2>{fornecedorHook.fornecedorInput.idfornecedor ? 'Editando fornecedor' : 'Criando fornecedor'}</h2>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            placeholder='Ex: John Doe'
                            value={fornecedorHook.fornecedorInput.nome}
                            onChange={(e) => fornecedorHook.setFornecedorInput({ ...fornecedorHook.fornecedorInput, nome: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder='Ex: 000.000.000-00'
                            value={fornecedorHook.fornecedorInput.cpf}
                            onChange={(e) => fornecedorHook.setFornecedorInput({ ...fornecedorHook.fornecedorInput, cpf: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            id="endereco"
                            name="endereco"
                            type="text"
                            placeholder='Ex: Rua tal de tal'
                            value={fornecedorHook.fornecedorInput.endereco}
                            onChange={(e) => fornecedorHook.setFornecedorInput({ ...fornecedorHook.fornecedorInput, endereco: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            id="telefone"
                            name="telefone"
                            type="text"
                            placeholder='Ex: (00) 00000-0000'
                            value={fornecedorHook.fornecedorInput.telefone}
                            onChange={(e) => fornecedorHook.setFornecedorInput({ ...fornecedorHook.fornecedorInput, telefone: e.target.value })}
                        />
                    </div>
                </div>

                <input type="submit" value={fornecedorHook.fornecedorInput.idfornecedor ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
