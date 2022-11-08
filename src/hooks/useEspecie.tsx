import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'

import { IEspecie } from '../interfaces/especie'

export function useEspecie() {
    const [especies, setEspecies] = useState<IEspecie[]>([])
    const [especieInput, setEspecieInput] = useState<IEspecie>({ nome: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [especiesTemp, setEspeciesTemp] = useState<IEspecie[]>([])

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/especie')
            if (result.status === 200) {
                const data = result.data as IEspecie[]
                setEspecies(data)
                setEspeciesTemp(data)

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

            const result = await APIGetOne(id, '/especie')
            if (result.status === 200) {
                setEspecieInput(result.data as IEspecie)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/especie')
            if (result.status === 200) {
                const data = result.data as IEspecie[]
                setEspecies(data)
                setEspeciesTemp(data)
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
            const result = await APICreate(especieInput, '/especie')
            if (result.status !== 200) return;

            setEspecies([result.data, ...especies,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(especieInput, '/especie')
            if (result.status !== 200) return;

            const index = especies.findIndex((value) => value.idespecie == especieInput.idespecie)
            especies[index] = especieInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/especie')
            if (result.status !== 200) return;

            setEspecies((value) => value.filter((item) => item.idespecie !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/especie')
                if (result.status !== 200) return;

                setEspecies((value) => value.filter((item) => item.idespecie !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (especies.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of especies) {
            setSelecteds((value) => [...value, obj.idespecie as string])
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
            setEspecies(especiesTemp)
            return
        }

        const filtered = especiesTemp.filter((value) =>
            value.nome.toLowerCase().includes(text.toLowerCase())
        )

        setEspecies(filtered)
    }

    return {
        especies,
        especieInput,
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
        setEspecieInput
    }
}