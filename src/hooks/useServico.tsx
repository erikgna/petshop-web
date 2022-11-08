import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'

import { IServico } from '../interfaces/servico'

export const defaultServico: IServico = {
    idservico: undefined,
    nome: "",
    valor: 0,
    descricao: ""
}

export function useServico() {
    const [servicos, setServicos] = useState<IServico[]>([])
    const [servicoInput, setServicoInput] = useState<IServico>(defaultServico)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [servicosTemp, setServicosTemp] = useState<IServico[]>([])

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/servico')
            if (result.status === 200) {
                const data = result.data as IServico[]
                setServicos(data)
                setServicosTemp(data)
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

            const result = await APIGetOne(id, '/servico')
            if (result.status === 200) {
                setServicoInput(result.data as IServico)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/servico')
            if (result.status === 200) {
                const data = result.data as IServico[]
                setServicos(data)
                setServicosTemp(data)
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
            const result = await APICreate(servicoInput, '/servico')
            if (result.status !== 200) return;

            setServicos([result.data, ...servicos,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(servicoInput, '/servico')
            if (result.status !== 200) return;

            const index = servicos.findIndex((value) => value.idservico == servicoInput.idservico)
            servicos[index] = servicoInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/servico')
            if (result.status !== 200) return;

            setServicos((value) => value.filter((item) => item.idservico !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/servico')
                if (result.status !== 200) return;

                setServicos((value) => value.filter((item) => item.idservico !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (servicos.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of servicos) {
            setSelecteds((value) => [...value, obj.idservico as string])
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
            setServicos(servicosTemp)
            return
        }

        const filtered = servicosTemp.filter((value) =>
            value.nome.toLowerCase().includes(text.toLowerCase())
        )

        setServicos(filtered)
    }

    function filterByCategory(text: string) {
        if (text === 'null') {
            setServicos(servicosTemp)
            return
        }

        const filtered = servicosTemp.filter((value) =>
            value.idcategoriaservico?.includes(text)
        )

        setServicos(filtered)
    }

    return {
        servicos,
        servicoInput,
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
        setServicoInput,
        filterByCategory
    }
}