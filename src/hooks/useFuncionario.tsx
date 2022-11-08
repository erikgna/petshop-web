import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'

import { IFuncionario } from '../interfaces/funcionario'

export const defaultFuncionario: IFuncionario = {
    idfuncionario: undefined,
    cpf: "",
    nome: "",
    endereco: "",
    salario: 0,
    situacao: "",
    telefone: "",
    funcao: "",
    dataentrada: undefined
}

export function useFuncionario() {
    const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])
    const [funcionarioInput, setFuncionarioInput] = useState<IFuncionario>(defaultFuncionario)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [funcionariosTemp, setFuncionariosTemp] = useState<IFuncionario[]>([])

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/funcionario')
            if (result.status === 200) {
                const data = result.data as IFuncionario[]
                setFuncionarios(data)
                setFuncionariosTemp(data)

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

            const result = await APIGetOne(id, '/funcionario')
            if (result.status === 200) {
                setFuncionarioInput(result.data as IFuncionario)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/funcionario')
            if (result.status === 200) {
                const data = result.data as IFuncionario[]
                setFuncionarios(data)
                setFuncionariosTemp(data)
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
            const result = await APICreate(funcionarioInput, '/funcionario')
            if (result.status !== 200) return;

            setFuncionarios([result.data, ...funcionarios,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(funcionarioInput, '/funcionario')
            if (result.status !== 200) return;

            const index = funcionarios.findIndex((value) => value.idfuncionario == funcionarioInput.idfuncionario)
            funcionarios[index] = funcionarioInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/funcionario')
            if (result.status !== 200) return;

            setFuncionarios((value) => value.filter((item) => item.idfuncionario !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/produto')
                if (result.status !== 200) return;

                setFuncionarios((value) => value.filter((item) => item.idfuncionario !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (funcionarios.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of funcionarios) {
            setSelecteds((value) => [...value, obj.idfuncionario as string])
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
            setFuncionarios(funcionariosTemp)
            return
        }

        const filtered = funcionariosTemp.filter((value) =>
            value.nome.toLowerCase().includes(text.toLowerCase())
        )

        setFuncionarios(filtered)
    }

    return {
        funcionarios,
        funcionarioInput,
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
        setFuncionarioInput
    }
}