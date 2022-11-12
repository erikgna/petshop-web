import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'
import { APIReportNotaVenda } from '../api/reports'
import { randomRGBColor } from '../global/utils/Color'
import { formatDateFromBack } from '../global/utils/DataFormat'

import { INotaVenda } from '../interfaces/notaVenda'

export function useNotaVenda() {
    const [notaVendas, setNotaVendas] = useState<INotaVenda[]>([])
    const [notaVendaInput, setNotaVendaInput] = useState<INotaVenda>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [notaVendasTemp, setNotaVendasTemp] = useState<INotaVenda[]>([])

    const [dataInicio, setDataInicio] = useState<string>("0")
    const [dataFim, setDataFim] = useState<string>("0")
    const [reportData, setReportData] = useState<any>()

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/nota-venda')
            if (result.status === 200) {
                const data = result.data as INotaVenda[]
                setNotaVendas(data)
                setNotaVendasTemp(data)

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

            const result = await APIGetOne(id, '/nota-venda')
            if (result.status === 200) {
                setNotaVendaInput(result.data as INotaVenda)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, '/nota-venda')
            if (result.status === 200) {
                const data = result.data as INotaVenda[]
                setNotaVendas(data)
                setNotaVendasTemp(data)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/nota-venda')
            if (result.status !== 200) return;

            setNotaVendas((value) => value.filter((item) => item.idnotavenda !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/nota-venda')
                if (result.status !== 200) return;

                setNotaVendas((value) => value.filter((item) => item.idnotavenda !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (notaVendas.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of notaVendas) {
            setSelecteds((value) => [...value, obj.idnotavenda as string])
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

    return {
        notaVendas,
        notaVendaInput,
        isLoading,
        pages,
        page,
        selecteds,
        reportData,
        dataFim,
        dataInicio,
        setDataFim,
        setDataInicio,
        changePage,
        changeSelection,
        checkAll,
        get,
        getOne,
        getPagination,
        deleteOne,
        deleteAll,
        setNotaVendaInput
    }
}