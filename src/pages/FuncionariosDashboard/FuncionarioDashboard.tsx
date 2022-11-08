import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useFuncionario } from '../../hooks/useFuncionario'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const FuncionarioDashboard = () => {
    const funcionarioHook = useFuncionario()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            funcionarioHook.getOne(id)
        }
    }, [])

    if (funcionarioHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => funcionarioHook.funcionarioInput.idfuncionario ? funcionarioHook.update(e) : funcionarioHook.create(e)} className={styles.DashboardForm}>
                <h2>{funcionarioHook.funcionarioInput.idfuncionario ? 'Editando funcionário' : 'Criando funcionário'}</h2>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            placeholder='Ex: John Doe'
                            value={funcionarioHook.funcionarioInput.nome}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, nome: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder='Ex: 000.000.000-00'
                            value={funcionarioHook.funcionarioInput.cpf}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, cpf: e.target.value })}
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
                            value={funcionarioHook.funcionarioInput.endereco}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, endereco: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            id="telefone"
                            name="telefone"
                            type="text"
                            placeholder='Ex: (00) 00000-0000'
                            value={funcionarioHook.funcionarioInput.telefone}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, telefone: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="salario">Salário</label>
                        <input
                            id="salario"
                            name="salario"
                            type="text"
                            placeholder='Ex: R$2200'
                            value={funcionarioHook.funcionarioInput.salario}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, salario: e.target.value as unknown as number })}
                        />
                    </div>

                    <div>
                        <label htmlFor="funcao">Função</label>
                        <input
                            id="funcao"
                            name="funcao"
                            type="text"
                            placeholder='Ex: Vendedor'
                            value={funcionarioHook.funcionarioInput.funcao}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, funcao: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="situacao">Situação</label>
                        <input
                            id="situacao"
                            name="situacao"
                            type="text"
                            placeholder='Ex: Contratado'
                            value={funcionarioHook.funcionarioInput.situacao}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, situacao: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="dataentrada">Data de Entrada</label>
                        <input
                            id="dataentrada"
                            name="dataentrada"
                            type="date"
                            value={funcionarioHook.funcionarioInput.dataentrada?.toLocaleString().substring(0, 10)}
                            onChange={(e) => funcionarioHook.setFuncionarioInput({ ...funcionarioHook.funcionarioInput, dataentrada: e.target.value })}
                        />
                    </div>
                </div>

                <input type="submit" value={funcionarioHook.funcionarioInput.idfuncionario ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
