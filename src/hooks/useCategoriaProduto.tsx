import { useState } from 'react'

import { APICreate, APIDelete, APIGet, APIGetOne, APIUpdate } from '../api'

import { ICategoriaProduto } from '../interfaces/categoriaProduto'

export function useCategoriaProduto() {
    const [categoriaProdutos, setCategoriaProdutos] = useState<ICategoriaProduto[]>([])
    const [categoriaProdutosInput, setCategoriaProdutosInput] = useState<ICategoriaProduto>({ nome: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/categoria-produto')
            if (result.status === 200) {
                const data = result.data as ICategoriaProduto[]
                setCategoriaProdutos(data)
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

            const result = await APIGetOne(id, '/categoria-produto')
            if (result.status === 200) {
                setCategoriaProdutosInput(result.data as ICategoriaProduto)
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
            const result = await APICreate(categoriaProdutosInput, '/categoria-produto')
            if (result.status !== 200) return;

            setCategoriaProdutos([result.data, ...categoriaProdutos,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(categoriaProdutosInput, '/categoria-produto')
            if (result.status !== 200) return;

            const index = categoriaProdutos.findIndex((value) => value.idcategoriaproduto == categoriaProdutosInput.idcategoriaproduto)
            categoriaProdutos[index] = categoriaProdutosInput
            setCategoriaProdutosInput({ idcategoriaproduto: undefined, nome: '' })
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/categoria-produto')
            if (result.status !== 200) return;

            setCategoriaProdutos((value) => value.filter((item) => item.idcategoriaproduto !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    return {
        categoriaProdutos,
        categoriaProdutosInput,
        isLoading,
        get,
        getOne,
        create,
        update,
        deleteOne,
        setCategoriaProdutosInput
    }
}