import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'

import { IFornecedor } from '../interfaces/fornecedor'

export const defaultFornecedor: IFornecedor = {
    idfornecedor: undefined,
    cpf: "",
    nome: "",
    endereco: "",
    telefone: ""
}

export function useFornecedor() {
    const [fornecedors, setFornecedors] = useState<IFornecedor[]>([])
    const [fornecedorInput, setFornecedorInput] = useState<IFornecedor>(defaultFornecedor)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [fornecedoresTemp, setFornecedoresTemp] = useState<IFornecedor[]>([])

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/fornecedor')
            if (result.status === 200) {
                const data = result.data as IFornecedor[]
                setFornecedors(data)
                setFornecedoresTemp(data)

                const tempPages = []

                const numberOfPages = data.length / 20
                if (numberOfPages < 1) {
                    setPages([1])
                    return
                }
                for (let index = 0; index < numberOfPages; index++) {
                    tempPages.push(index + 1)
                }
                setPages(tempPages)
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

            const result = await APIGetOne(id, '/fornecedor')
            if (result.status === 200) {
                setFornecedorInput(result.data as IFornecedor)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/fornecedor')
            if (result.status === 200) {
                const data = result.data as IFornecedor[]
                setFornecedors(data)
                setFornecedoresTemp(data)
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
            const result = await APICreate(fornecedorInput, '/fornecedor')
            if (result.status !== 200) return;

            setFornecedors([result.data, ...fornecedors,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(fornecedorInput, '/fornecedor')
            if (result.status !== 200) return;

            const index = fornecedors.findIndex((value) => value.idfornecedor == fornecedorInput.idfornecedor)
            fornecedors[index] = fornecedorInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/fornecedor')
            if (result.status !== 200) return;

            setFornecedors((value) => value.filter((item) => item.idfornecedor !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/fornecedor')
                if (result.status !== 200) return;

                setFornecedors((value) => value.filter((item) => item.idfornecedor !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (fornecedors.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of fornecedors) {
            setSelecteds((value) => [...value, obj.idfornecedor as string])
        }
    }

    async function changePage(newPage: number) {
        if (newPage > pages.length - 1) {
            setPage(pages.length - 1)
        }
        if (newPage < 1) return;
        await getPagination((newPage - 1) * 20, newPage * 20)
        setPage(newPage)
    }

    function changeSelection(id: string) {
        if (selecteds.indexOf(id) === -1) {
            setSelecteds((value) => [...value, id])
        }
        else {
            const newArray = selecteds.filter((item) => item !== id)
            setSelecteds(newArray)
        }
    }

    function search(text: string) {
        if (text === '') {
            setFornecedors(fornecedoresTemp)
            return
        }

        const filtered = fornecedoresTemp.filter((value) =>
            value.nome.toLowerCase().includes(text.toLowerCase())
        )

        setFornecedors(filtered)
    }


    return {
        fornecedors,
        fornecedorInput,
        isLoading,
        pages,
        page,
        selecteds,
        search,
        changePage,
        changeSelection,
        checkAll,
        get,
        getOne,
        getPagination,
        create,
        update,
        deleteOne,
        deleteAll,
        setFornecedorInput
    }
}