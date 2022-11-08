import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'
import { APIReportNotaVenda } from '../api/reports'
import { randomRGBColor } from '../global/utils/Color'
import { formatDateFromBack } from '../global/utils/DataFormat'

import { INotaVenda, INotaVendaInfo } from '../interfaces/notaVenda'

export const defaultNotaVenda: INotaVenda = {
    idnotavenda: undefined,
    idproduto: undefined,
    idservico: undefined,
    idcliente: undefined,
    idfuncionario: undefined,
    valor: 0,
    quantidade: 0,
    data: undefined
}

export function useNotaVenda() {
    const [notaVendas, setNotaVendas] = useState<INotaVenda[]>([])
    const [notaVendaInput, setNotaVendaInput] = useState<INotaVenda>(defaultNotaVenda)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [notaVendasTemp, setNotaVendasTemp] = useState<INotaVenda[]>([])

    const [dataInicio, setDataInicio] = useState<string>("0")
    const [dataFim, setDataFim] = useState<string>("0")
    const [reportData, setReportData] = useState<any>()

    async function generateNotaVendaReport(inicio?: string, fim?: string) {
        setIsLoading(true)

        try {
            let result;
            if (inicio === undefined || fim === undefined) {
                result = await APIReportNotaVenda(dataInicio, dataFim)
            }
            else {
                result = await APIReportNotaVenda(inicio, fim)
            }

            if (result.status !== 200) { return }
            const data = result.data as INotaVendaInfo[]
            const labels: string[] = []
            let datas: any;
            let dataset: any;
            const nomes: string[] = []

            data.forEach((item) => {
                const date = formatDateFromBack(item.data as string)
                const index = labels.indexOf(date)

                if (index === -1) {
                    labels.push(date)
                }
                if (nomes.indexOf(item.nome) === -1) {
                    nomes.push(item.nome)
                    dataset = { ...dataset, [item.nome]: [] }
                }
                datas = { ...datas, [item.data!]: [] }
            })

            data.forEach((item) => {
                datas[item.data!].push({
                    nome: item.nome,
                    valor: item.valor_total,
                })
            })

            nomes.forEach((nome) => {
                Object.entries(datas).forEach((item: any, index: any) => {
                    item[1].forEach((valor: any) => {
                        if (valor.nome === nome) {
                            dataset[nome].push(valor.valor)
                        }
                    })
                    if (dataset[nome].length !== index + 1) {
                        dataset[nome].push(0)
                    }
                })
            })

            const final: any[] = []
            nomes.forEach((nome) => {
                final.push({
                    label: nome,
                    data: dataset[nome].map((valor: number) => valor),
                    borderColor: `rgb(${randomRGBColor()?.r}, ${randomRGBColor()?.g}, ${randomRGBColor()?.b})`,
                })
            })

            setReportData({
                labels,
                datasets: final
            })


        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

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
            const result = await APIGetPagination(start, end, '/nota-venda')
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

    async function create(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APICreate(notaVendaInput, '/nota-venda')
            if (result.status !== 200) return;

            setNotaVendas([result.data, ...notaVendas,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(notaVendaInput, '/nota-venda')
            if (result.status !== 200) return;

            const index = notaVendas.findIndex((value) => value.idnotavenda == notaVendaInput.idnotavenda)
            notaVendas[index] = notaVendaInput
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

    function search(text: string) {
        if (text === '') {
            setNotaVendas(notaVendasTemp)
            return
        }

        const filtered = notaVendasTemp.filter((value) =>
            value.valor.toString().toLowerCase().includes(text.toLowerCase())
        )

        setNotaVendas(filtered)
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
        generateNotaVendaReport,
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
        setNotaVendaInput
    }
}