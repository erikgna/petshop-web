import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useNotaCompra } from '../../hooks/useNotaCompra'
import { useFornecedor } from '../../hooks/useFornecedor'
import { useProduto } from '../../hooks/useProduto'
import { useFuncionario } from '../../hooks/useFuncionario'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const NotaCompraDashboard = () => {
    const notaCompraHook = useNotaCompra()
    const fornecedorHook = useFornecedor()
    const funcionarioHook = useFuncionario()
    const produtoHook = useProduto()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            notaCompraHook.getOne(id)
        }
        fornecedorHook.get()
        produtoHook.get()
        funcionarioHook.get()
    }, [])

    if (notaCompraHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => notaCompraHook.notaCompraInput.idnotacompra ? notaCompraHook.update(e) : notaCompraHook.create(e)} className={styles.DashboardForm}>
                <h2>{notaCompraHook.notaCompraInput.idnotacompra ? 'Editando nota de compra' : 'Criando nota de compra'}</h2>

                <label htmlFor="produto">Escolha o produto</label>
                <select name="produto" id="produto" onChange={(e) => notaCompraHook.setNotaCompraInput({ ...notaCompraHook.notaCompraInput, idproduto: e.target.value })}>
                    {notaCompraHook.notaCompraInput.idproduto === undefined && <option value="null" defaultValue="">Escolha uma opção</option>}
                    {produtoHook.produtos.map((produto) => {
                        if (produto.idproduto === notaCompraHook.notaCompraInput.idproduto) return <option selected key={produto.idproduto} value={produto.idproduto}>{produto.nome}</option>
                        return <option value={produto.idproduto} key={produto.idproduto}>{produto.nome}</option>
                    })}
                </select>


                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="valor">Valor</label>
                        <input
                            id="valor"
                            name="valor"
                            type="number"
                            placeholder='Ex: R$00,00'
                            value={notaCompraHook.notaCompraInput.valor}
                            onChange={(e) => notaCompraHook.setNotaCompraInput({ ...notaCompraHook.notaCompraInput, valor: e.target.value as unknown as number })}
                        />
                    </div>

                    <div>
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            id="quantidade"
                            name="quantidade"
                            type="number"
                            placeholder='Ex: 15'
                            value={notaCompraHook.notaCompraInput.quantidade}
                            onChange={(e) => notaCompraHook.setNotaCompraInput({ ...notaCompraHook.notaCompraInput, quantidade: e.target.value as unknown as number })}
                        />
                    </div>
                </div>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="fornecedor">Escolha o fornecedor</label>
                        <select name="fornecedor" id="fornecedor" onChange={(e) => notaCompraHook.setNotaCompraInput({ ...notaCompraHook.notaCompraInput, idfornecedor: e.target.value })}>
                            {notaCompraHook.notaCompraInput.idfornecedor === undefined && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {fornecedorHook.fornecedors.map((fornecedor) => {
                                if (fornecedor.idfornecedor === notaCompraHook.notaCompraInput.idfornecedor) return <option selected key={fornecedor.idfornecedor} value={fornecedor.idfornecedor}>{fornecedor.nome}</option>
                                return <option value={fornecedor.idfornecedor} key={fornecedor.idfornecedor}>{fornecedor.nome}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="funcionario">Escolha o funcionário</label>
                        <select name="funcionario" id="funcionario" onChange={(e) => notaCompraHook.setNotaCompraInput({ ...notaCompraHook.notaCompraInput, idfuncionario: e.target.value })}>
                            {notaCompraHook.notaCompraInput.idfuncionario === undefined && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {funcionarioHook.funcionarios.map((funcionario) => {
                                if (funcionario.idfuncionario === notaCompraHook.notaCompraInput.idfuncionario) return <option selected key={funcionario.idfuncionario} value={funcionario.idfuncionario}>{funcionario.nome}</option>
                                return <option value={funcionario.idfuncionario} key={funcionario.idfuncionario}>{funcionario.nome}</option>
                            })}
                        </select>
                    </div>

                </div>
                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="datapedido">Data do pedido</label>
                        <input
                            id="datapedido"
                            name="datapedido"
                            type="date"
                            value={notaCompraHook.notaCompraInput.datapedido?.toLocaleString().substring(0, 10)}
                            onChange={(e) => notaCompraHook.setNotaCompraInput({ ...notaCompraHook.notaCompraInput, datapedido: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="dataentrega">Data de entrega</label>
                        <input
                            id="dataentrega"
                            name="dataentrega"
                            type="date"
                            value={notaCompraHook.notaCompraInput.dataentrega?.toLocaleString().substring(0, 10)}
                            onChange={(e) => notaCompraHook.setNotaCompraInput({ ...notaCompraHook.notaCompraInput, dataentrega: e.target.value })}
                        />
                    </div>

                </div>

                <input type="submit" value={notaCompraHook.notaCompraInput.idnotacompra ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
