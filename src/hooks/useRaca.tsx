import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'

import { IRaca } from '../interfaces/raca'

export function useRaca() {
    const [racas, setRacas] = useState<IRaca[]>([])
    const [racaInput, setRacaInput] = useState<IRaca>({ nome: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [racaTemp, setRacaTemp] = useState<IRaca[]>([])

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/raca')
            if (result.status === 200) {
                const data = result.data as IRaca[]
                setRacas(data)
                setRacaTemp(data)

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

            const result = await APIGetOne(id, '/raca')
            if (result.status === 200) {
                setRacaInput(result.data as IRaca)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/raca')
            if (result.status === 200) {
                const data = result.data as IRaca[]
                setRacas(data)
                setRacaTemp(data)
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
            const result = await APICreate(racaInput, '/raca')
            if (result.status !== 200) return;

            setRacas([result.data, ...racas,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(racaInput, '/raca')
            if (result.status !== 200) return;

            const index = racas.findIndex((value) => value.idraca == racaInput.idraca)
            racas[index] = racaInput
            setRacaInput({ idraca: undefined, nome: '' })
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/raca')
            if (result.status !== 200) return;

            setRacas((value) => value.filter((item) => item.idraca !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/raca')
                if (result.status !== 200) return;

                setRacas((value) => value.filter((item) => item.idraca !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (racas.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of racas) {
            setSelecteds((value) => [...value, obj.idraca as string])
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
            setRacas(racaTemp)
            return
        }

        const filtered = racaTemp.filter((value) =>
            value.idespecie?.toLowerCase().includes(text.toLowerCase())
        )

        setRacas(filtered)
    }

    return {
        racas,
        racaInput,
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
        setRacaInput
    }
}