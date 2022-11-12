import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useProduto } from '../../hooks/useProduto'
import { useCategoriaProduto } from '../../hooks/useCategoriaProduto'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const ProdutoDashboard = () => {
    const produtoHook = useProduto()
    const categoriasProdutoHook = useCategoriaProduto()
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            produtoHook.getOne(id)
        }
        categoriasProdutoHook.get()
    }, [])

    if (produtoHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => produtoHook.produtoInput.idproduto ? produtoHook.update(e) : produtoHook.create(e)} className={styles.DashboardForm}>
                <h2>{produtoHook.produtoInput.idproduto ? 'Editando produto' : 'Criando produto'}</h2>

                {produtoHook.produtoInput.foto !== "" && <img src={produtoHook.produtoInput.foto} alt="Produto" />}

                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder='Ex: Coleira para gato'
                    value={produtoHook.produtoInput.nome}
                    onChange={(e) => produtoHook.setProdutoInput({ ...produtoHook.produtoInput, nome: e.target.value })}
                />

                <label htmlFor="descricao">Descrição</label>
                <textarea
                    id="descricao"
                    name="descricao"
                    placeholder='Ex: Tamanho, peso, dimensões...'
                    value={produtoHook.produtoInput.descricao}
                    onChange={(e) => produtoHook.setProdutoInput({ ...produtoHook.produtoInput, descricao: e.target.value })}
                    cols={30}
                    rows={10}
                />

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="valor">Valor</label>
                        <input
                            id="valor"
                            name="valor"
                            type="number"
                            placeholder='Ex: R$00,00'
                            value={produtoHook.produtoInput.valor}
                            onChange={(e) => produtoHook.setProdutoInput({ ...produtoHook.produtoInput, valor: e.target.value as unknown as number })}
                        />
                    </div>

                    <div>
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            id="quantidade"
                            name="quantidade"
                            type="number"
                            placeholder='Ex: 15'
                            value={produtoHook.produtoInput.quantidade}
                            onChange={(e) => produtoHook.setProdutoInput({ ...produtoHook.produtoInput, quantidade: e.target.value as unknown as number })}
                        />
                    </div>
                </div>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="datareposicao">Data de reposição</label>
                        <input
                            id="datareposicao"
                            name="datareposicao"
                            type="date"
                            value={produtoHook.produtoInput.datareposicao?.toLocaleString().substring(0, 10)}
                            onChange={(e) => produtoHook.setProdutoInput({ ...produtoHook.produtoInput, datareposicao: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Escolha a categoria</label>
                        <select name="categoria" id="categoria" onChange={(e) => {
                            produtoHook.setProdutoInput({ ...produtoHook.produtoInput, idcategoriaproduto: e.target.value })
                        }}>
                            {(produtoHook.produtoInput.idcategoriaproduto === undefined || produtoHook.produtoInput.idcategoriaproduto === null) && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {categoriasProdutoHook.categoriaProdutos.map((categoria) => {
                                if (categoria.idcategoriaproduto === produtoHook.produtoInput.idcategoriaproduto) return <option selected key={categoria.idcategoriaproduto} value={categoria.idcategoriaproduto}>{categoria.nome}</option>
                                return <option value={categoria.idcategoriaproduto} key={categoria.idcategoriaproduto}>{categoria.nome}</option>
                            })}
                        </select>
                    </div>
                </div>

                <label htmlFor="image">Foto do produto</label>
                <input type="file" name="image" id="image" onChange={(e) => {
                    const files = e.target.files
                    if (files === null) return;

                    const reader = new FileReader()
                    reader.readAsDataURL(files[0])
                    reader.onload = function () {
                        produtoHook.setProdutoInput({ ...produtoHook.produtoInput, foto: reader.result as string });
                    }
                }} />

                <input type="submit" value={produtoHook.produtoInput.idproduto ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
