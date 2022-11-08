import { useState } from 'react'

import { APICreate, APIDelete, APIGet, APIGetOne, APIUpdate } from '../api'

import { ICategoriaServico } from '../interfaces/categoriaServico'

export function useCategoriaServico() {
    const [categoriaServicos, setCategoriaServicos] = useState<ICategoriaServico[]>([])
    const [categoriaServicosInput, setCategoriaServicosInput] = useState<ICategoriaServico>({ nome: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/categoria-servico')
            if (result.status === 200) {
                const data = result.data as ICategoriaServico[]
                setCategoriaServicos(data)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIGetOne(id, '/categoria-servico')
            if (result.status === 200) {
                setCategoriaServicosInput(result.data as ICategoriaServico)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function create(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APICreate(categoriaServicosInput, '/categoria-servico')
            if (result.status !== 200) return;

            setCategoriaServicos([result.data, ...categoriaServicos,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(categoriaServicosInput, '/categoria-servico')
            if (result.status !== 200) return;

            const index = categoriaServicos.findIndex((value) => value.idcategoriaservico == categoriaServicosInput.idcategoriaservico)
            categoriaServicos[index] = categoriaServicosInput
            setCategoriaServicosInput({ idcategoriaservico: undefined, nome: '' })
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/categoria-servico')
            if (result.status !== 200) return;

            setCategoriaServicos((value) => value.filter((item) => item.idcategoriaservico !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    return {
        categoriaServicos,
        categoriaServicosInput,
        isLoading,
        get,
        getOne,
        create,
        update,
        deleteOne,
        setCategoriaServicosInput
    }
}