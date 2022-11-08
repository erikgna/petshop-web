import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useCliente } from '../../hooks/useCliente'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const ClienteDashboard = () => {
    const clienteHook = useCliente()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            clienteHook.getOne(id)
        }
    }, [])

    if (clienteHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => clienteHook.clienteInput.idcliente ? clienteHook.update(e) : clienteHook.create(e)} className={styles.DashboardForm}>
                <h2>{clienteHook.clienteInput.idcliente ? 'Editando cliente' : 'Criando cliente'}</h2>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            placeholder='Ex: John Doe'
                            value={clienteHook.clienteInput.nome}
                            onChange={(e) => clienteHook.setClienteInput({ ...clienteHook.clienteInput, nome: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder='Ex: 000.000.000-00'
                            value={clienteHook.clienteInput.cpf}
                            onChange={(e) => clienteHook.setClienteInput({ ...clienteHook.clienteInput, cpf: e.target.value })}
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
                            value={clienteHook.clienteInput.endereco}
                            onChange={(e) => clienteHook.setClienteInput({ ...clienteHook.clienteInput, endereco: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            id="telefone"
                            name="telefone"
                            type="text"
                            placeholder='Ex: (00) 00000-0000'
                            value={clienteHook.clienteInput.telefone}
                            onChange={(e) => clienteHook.setClienteInput({ ...clienteHook.clienteInput, telefone: e.target.value })}
                        />
                    </div>
                </div>

                <input type="submit" value={clienteHook.clienteInput.idcliente ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
