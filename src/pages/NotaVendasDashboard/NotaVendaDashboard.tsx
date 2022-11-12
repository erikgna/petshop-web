import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useNotaVenda } from '../../hooks/useNotaVenda'
import { useCliente } from '../../hooks/useCliente'
import { useProduto } from '../../hooks/useProduto'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const NotaVendaDashboard = () => {
    const notaVendaHook = useNotaVenda()
    const clienteHook = useCliente()
    const produtoHook = useProduto()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            notaVendaHook.getOne(id)
        }
        clienteHook.get()
        produtoHook.get()
    }, [])

    if (notaVendaHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => notaVendaHook.notaVendaInput.idnotavenda ? notaVendaHook.update(e) : notaVendaHook.create(e)} className={styles.DashboardForm}>
                <h2>{notaVendaHook.notaVendaInput.idnotavenda ? 'Editando nota de venda' : 'Criando nota de venda'}</h2>
                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="produto">Escolha o produto</label>
                        <select name="produto" id="produto" onChange={(e) => notaVendaHook.setNotaVendaInput({ ...notaVendaHook.notaVendaInput, idproduto: e.target.value })}>
                            {notaVendaHook.notaVendaInput.idproduto === undefined && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {produtoHook.produtos.map((produto) => {
                                if (produto.idproduto === notaVendaHook.notaVendaInput.idproduto) return <option selected key={produto.idproduto} value={produto.idproduto}>{produto.nome}</option>
                                return <option value={produto.idproduto} key={produto.idproduto}>{produto.nome}</option>
                            })}
                        </select>
                    </div>
                </div>


                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="valor">Valor</label>
                        <input
                            id="valor"
                            name="valor"
                            type="number"
                            placeholder='Ex: R$00,00'
                            value={notaVendaHook.notaVendaInput.valor}
                            onChange={(e) => notaVendaHook.setNotaVendaInput({ ...notaVendaHook.notaVendaInput, valor: e.target.value as unknown as number })}
                        />
                    </div>

                    <div>
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            id="quantidade"
                            name="quantidade"
                            type="number"
                            placeholder='Ex: 15'
                            value={notaVendaHook.notaVendaInput.quantidade}
                            onChange={(e) => notaVendaHook.setNotaVendaInput({ ...notaVendaHook.notaVendaInput, quantidade: e.target.value as unknown as number })}
                        />
                    </div>
                </div>

                <label htmlFor="data">Data</label>
                <input
                    id="data"
                    name="data"
                    type="date"
                    value={notaVendaHook.notaVendaInput.data?.toLocaleString().substring(0, 10)}
                    onChange={(e) => notaVendaHook.setNotaVendaInput({ ...notaVendaHook.notaVendaInput, data: e.target.value })}
                />

                <input type="submit" value={notaVendaHook.notaVendaInput.idnotavenda ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
