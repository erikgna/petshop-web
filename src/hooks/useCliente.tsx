import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'
import { ICliente } from '../interfaces/cliente'

export function useCliente() {
    const [clientes, setClientes] = useState<ICliente[]>([])
    const [clienteInput, setClienteInput] = useState<ICliente>({ cpf: '', nome: '', endereco: '', telefone: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [clientesTemp, setClientesTemp] = useState<ICliente[]>([])

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/cliente')
            if (result.status === 200) {
                const data = result.data as ICliente[]
                setClientes(data)
                setClientesTemp(data)
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

            const result = await APIGetOne(id, '/cliente')
            if (result.status === 200) {
                setClienteInput(result.data as ICliente)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/cliente')
            if (result.status === 200) {
                const data = result.data as ICliente[]
                setClientes(data)
                setClientesTemp(data)
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
            const result = await APICreate(clienteInput, '/cliente')
            if (result.status !== 200) return;

            setClientes([result.data, ...clientes,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(clienteInput, '/cliente')
            if (result.status !== 200) return;

            const index = clientes.findIndex((value) => value.idcliente == clienteInput.idcliente)
            clientes[index] = clienteInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }


    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/cliente')
            if (result.status !== 200) return;

            setClientes((value) => value.filter((item) => item.idcliente !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/cliente')
                if (result.status !== 200) return;

                setClientes((value) => value.filter((item) => item.idcliente !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (clientes.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of clientes) {
            setSelecteds((value) => [...value, obj.idcliente as string])
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
            setClientes(clientesTemp)
            return
        }

        const filtered = clientesTemp.filter((value) =>
            value.nome.toLowerCase().includes(text.toLowerCase())
        )

        setClientes(filtered)
    }

    return {
        clientes,
        clienteInput,
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
        setClienteInput
    }
}