import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'
import { APIReportNotaCompra } from '../api/reports'
import { randomRGBColor } from '../global/utils/Color'
import { formatDateFromBack } from '../global/utils/DataFormat'

import { INotaCompra, INotaCompraInfo } from '../interfaces/notaCompra'

export const defaultNotaCompra: INotaCompra = {
    idnotacompra: undefined,
    idproduto: undefined,
    idfornecedor: undefined,
    idfuncionario: undefined,
    valor: 0,
    quantidade: 0,
    datapedido: undefined,
    dataentrega: undefined
}

export function useNotaCompra() {
    const [notaCompras, setNotaCompras] = useState<INotaCompra[]>([])
    const [notaCompraInput, setNotaCompraInput] = useState<INotaCompra>(defaultNotaCompra)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [notaComprasTemp, setNotaComprasTemp] = useState<INotaCompra[]>([])

    const [dataInicio, setDataInicio] = useState<string>("0")
    const [dataFim, setDataFim] = useState<string>("0")
    const [reportData, setReportData] = useState<any>()

    async function generateNotaCompraReport(inicio?: string, fim?: string) {
        setIsLoading(true)

        try {
            let result;
            if (inicio === undefined || fim === undefined) {
                result = await APIReportNotaCompra(dataInicio, dataFim)
            }
            else {
                result = await APIReportNotaCompra(inicio, fim)
            }

            if (result.status !== 200) { return }
            const data = result.data as INotaCompraInfo[]

            const labels: string[] = []
            let datas: any;
            let dataset: any;
            const nomes: string[] = []

            data.forEach((item) => {
                const date = formatDateFromBack(item.datapedido as string)
                const index = labels.indexOf(date)

                if (index === -1) {
                    labels.push(date)
                }
                if (nomes.indexOf(item.nome) === -1) {
                    nomes.push(item.nome)
                    dataset = { ...dataset, [item.nome]: [] }
                }
                datas = { ...datas, [item.datapedido!]: [] }
            })

            data.forEach((item) => {
                datas[item.datapedido!].push({
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
            const result = await APIGet('/nota-compra')
            if (result.status === 200) {
                const data = result.data as INotaCompra[]
                setNotaCompras(data)
                setNotaComprasTemp(data)

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

            const result = await APIGetOne(id, '/nota-compra')
            if (result.status === 200) {
                setNotaCompraInput(result.data as INotaCompra)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/nota-compra')
            if (result.status === 200) {
                const data = result.data as INotaCompra[]
                setNotaCompras(data)
                setNotaComprasTemp(data)
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
            const result = await APICreate(notaCompraInput, '/nota-compra')
            if (result.status !== 200) return;

            setNotaCompras([result.data, ...notaCompras,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(notaCompraInput, '/nota-compra')
            if (result.status !== 200) return;

            const index = notaCompras.findIndex((value) => value.idnotacompra == notaCompraInput.idnotacompra)
            notaCompras[index] = notaCompraInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/nota-compra')
            if (result.status !== 200) return;

            setNotaCompras((value) => value.filter((item) => item.idnotacompra !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/nota-compra')
                if (result.status !== 200) return;

                setNotaCompras((value) => value.filter((item) => item.idnotacompra !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (notaCompras.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of notaCompras) {
            setSelecteds((value) => [...value, obj.idnotacompra as string])
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
            setNotaCompras(notaComprasTemp)
            return
        }

        const filtered = notaComprasTemp.filter((value) =>
            value.valor.toString().toLowerCase().includes(text.toLowerCase())
        )

        setNotaCompras(filtered)
    }

    return {
        notaCompras,
        notaCompraInput,
        isLoading,
        pages,
        page,
        selecteds,
        reportData,
        dataFim,
        dataInicio,
        setDataFim,
        setDataInicio,
        search,
        changePage,
        changeSelection,
        checkAll,
        generateNotaCompraReport,
        get,
        getOne,
        getPagination,
        create,
        update,
        deleteOne,
        deleteAll,
        setNotaCompraInput
    }
}