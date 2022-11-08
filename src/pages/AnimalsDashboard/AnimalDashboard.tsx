import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useAnimal } from '../../hooks/useAnimal'
import { useRaca } from '../../hooks/useRaca'
import { useEspecie } from '../../hooks/useEspecie'
import { useCliente } from '../../hooks/useCliente'

import styles from '../../global/styles/NewEditDashboard.module.scss'

export const AnimalDashboard = () => {
    const animalHook = useAnimal()
    const racaHook = useRaca()
    const especieHook = useEspecie()
    const clientesHook = useCliente()

    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            animalHook.getOne(id)
        }
        especieHook.get()
        racaHook.get()
        clientesHook.get()
    }, [])

    if (animalHook.isLoading) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <form onSubmit={(e) => animalHook.animalInput.idanimal ? animalHook.update(e) : animalHook.create(e)} className={styles.DashboardForm}>
                <h2>{animalHook.animalInput.idanimal ? 'Editando animal' : 'Criando animal'}</h2>

                {animalHook.animalInput.foto !== "" && <img src={animalHook.animalInput.foto} alt="Animal" />}

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            placeholder='Ex: Theodoro'
                            value={animalHook.animalInput.nome}
                            onChange={(e) => animalHook.setAnimalInput({ ...animalHook.animalInput, nome: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="cor">Cor</label>
                        <input
                            id="cor"
                            name="cor"
                            type="text"
                            placeholder='Ex: Marrom'
                            value={animalHook.animalInput.cor}
                            onChange={(e) => animalHook.setAnimalInput({ ...animalHook.animalInput, cor: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="datanascimento">Data de nascimento</label>
                        <input
                            id="datanascimento"
                            name="datanascimento"
                            type="date"
                            value={animalHook.animalInput.datanascimento?.toLocaleString().substring(0, 10)}
                            onChange={(e) => animalHook.setAnimalInput({ ...animalHook.animalInput, datanascimento: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="genero">Escolha o genêro</label>
                        <select name="genero" id="genero" onChange={(e) => animalHook.setAnimalInput({ ...animalHook.animalInput, genero: e.target.value })}>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                        </select>
                    </div>
                </div>

                {/* <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="especie">Escolha a espécie</label>
                        <select name="especie" id="especie" onChange={(e) => {
                            animalHook.setAnimalInput({ ...animalHook.animalInput, idespecie: e.target.value })
                            racaHook.search(e.target.value)
                        }}>
                            {animalHook.animalInput.idespecie === undefined && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {especieHook.especies.map((especie) => {
                                if (especie.id === animalHook.animalInput.idespecie) return <option selected key={especie.id} value={especie.id}>{especie.nome}</option>
                                return <option value={especie.id} key={especie.id}>{especie.nome}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        {animalHook.animalInput.idespecie !== undefined && <label htmlFor="raca">Escolha a raça</label>}
                        {animalHook.animalInput.idespecie !== undefined && <select name="raca" id="raca" onChange={(e) => animalHook.setAnimalInput({ ...animalHook.animalInput, idraca: e.target.value })}>
                            {animalHook.animalInput.idraca === undefined && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {racaHook.racas.map((raca) => {
                                if (raca.id === animalHook.animalInput.idraca) return <option selected key={raca.id} value={raca.id}>{raca.nome}</option>
                                return <option value={raca.id} key={raca.id}>{raca.nome}</option>
                            })}
                        </select>}
                    </div>
                </div> */}

                <div className={styles.DoubleInput}>
                    <div>
                        <label htmlFor="cliente">Escolha o cliente</label>
                        <select name="cliente" id="cliente" onChange={(e) => {
                            animalHook.setAnimalInput({ ...animalHook.animalInput, idcliente: e.target.value })
                        }}>
                            {(animalHook.animalInput.idcliente === undefined || animalHook.animalInput.idcliente === null) && <option value="null" defaultValue="">Escolha uma opção</option>}
                            {clientesHook.clientes.map((cliente) => {
                                if (cliente.idcliente === animalHook.animalInput.idcliente) return <option selected key={cliente.idcliente} value={cliente.idcliente}>{cliente.nome}</option>
                                return <option value={cliente.idcliente} key={cliente.idcliente}>{cliente.nome}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image">Foto do animal</label>
                        <input type="file" name="image" id="image" onChange={(e) => {
                            const files = e.target.files
                            if (files === null) return;

                            const reader = new FileReader()
                            reader.readAsDataURL(files[0])
                            reader.onload = function () {
                                animalHook.setAnimalInput({ ...animalHook.animalInput, foto: reader.result as string });
                            }
                        }} />
                    </div>
                </div>

                <input type="submit" value={animalHook.animalInput.idanimal ? 'Enviar Alterações' : 'Salvar Alterações'} />
            </form>
        </div>
    )
}
