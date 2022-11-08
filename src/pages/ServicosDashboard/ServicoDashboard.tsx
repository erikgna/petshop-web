import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useServico } from '../../hooks/useServico'
import { useCategoriaServico } from '../../hooks/useCategoriaServico'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const ServicoDashboard = () => {
    const servicoHook = useServico()
    const categoriasServicoHook = useCategoriaServico()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            servicoHook.getOne(id)
        }
        categoriasServicoHook.get()
    }, [])

    if (servicoHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => servicoHook.servicoInput.idservico ? servicoHook.update(e) : servicoHook.create(e)} className={styles.DashboardForm}>
                <h2>{servicoHook.servicoInput.idservico ? 'Editando serviço' : 'Criando serviço'}</h2>

                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder='Ex: Banho'
                    value={servicoHook.servicoInput.nome}
                    onChange={(e) => servicoHook.setServicoInput({ ...servicoHook.servicoInput, nome: e.target.value })}
                />

                <label htmlFor="valor">Valor</label>
                <input
                    id="valor"
                    name="valor"
                    type="number"
                    placeholder='Ex: R$00,00'
                    value={servicoHook.servicoInput.valor}
                    onChange={(e) => servicoHook.setServicoInput({ ...servicoHook.servicoInput, valor: e.target.value as unknown as number })}
                />

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="categoria">Escolha a categoria</label>
                        <select name="categoria" id="categoria" onChange={(e) => {
                            servicoHook.setServicoInput({ ...servicoHook.servicoInput, idcategoriaservico: e.target.value })
                        }}>
                            {(servicoHook.servicoInput.idcategoriaservico === undefined || servicoHook.servicoInput.idcategoriaservico === null) && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {categoriasServicoHook.categoriaServicos.map((categoria) => {
                                if (categoria.idcategoriaservico === servicoHook.servicoInput.idcategoriaservico) return <option selected key={categoria.idcategoriaservico} value={categoria.idcategoriaservico}>{categoria.nome}</option>
                                return <option value={categoria.idcategoriaservico} key={categoria.idcategoriaservico}>{categoria.nome}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image">Foto do serviço</label>
                        <input type="file" name="image" id="image" onChange={(e) => {
                            const files = e.target.files
                            if (files === null) return;

                            const reader = new FileReader()
                            reader.readAsDataURL(files[0])
                            reader.onload = function () {
                                servicoHook.setServicoInput({ ...servicoHook.servicoInput, foto: reader.result as string });
                            }
                        }} />
                    </div>
                </div>

                <input type="submit" value={servicoHook.servicoInput.idservico ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
