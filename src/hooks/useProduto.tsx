import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'

import { IProduto } from '../interfaces/produto'

export const defaultProduto: IProduto = {
    idproduto: undefined,
    idcategoriaproduto: undefined,
    nome: "",
    descricao: "",
    foto: "",
    valor: 0,
    quantidade: 0,
    datareposicao: undefined
}

export function useProduto() {
    const [produtos, setProdutos] = useState<IProduto[]>([])
    const [produtoInput, setProdutoInput] = useState<IProduto>(defaultProduto)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [produtosTemp, setProdutosTemp] = useState<IProduto[]>([])

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/produto')
            if (result.status === 200) {
                const data = result.data as IProduto[]
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

            const result = await APIGetOne(id, '/produto')
            if (result.status === 200) {
                setProdutoInput(result.data as IProduto)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, '/produto')
            if (result.status === 200) {
                const data = result.data as IProduto[]
                setProdutos(data)
                setProdutosTemp(data)
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
            const result = await APICreate(produtoInput, '/produto')
            if (result.status !== 200) return;

            setProdutos([result.data, ...produtos,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(produtoInput, '/produto')
            if (result.status !== 200) return;

            const index = produtos.findIndex((value) => value.idproduto == produtoInput.idproduto)
            produtos[index] = produtoInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/produto')
            if (result.status !== 200) return;

            setProdutos((value) => value.filter((item) => item.idproduto !== id))
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

                setProdutos((value) => value.filter((item) => item.idproduto !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (produtos.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of produtos) {
            setSelecteds((value) => [...value, obj.idproduto as string])
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
            setProdutos(produtosTemp)
            return
        }

        const filtered = produtosTemp.filter((value) =>
            value.nome.toLowerCase().includes(text.toLowerCase())
        )

        setProdutos(filtered)
    }

    function filterByCategory(text: string) {
        if (text === 'null') {
            setProdutos(produtosTemp)
            return
        }

        const filtered = produtosTemp.filter((value) =>
            value.idcategoriaproduto?.includes(text)
        )

        setProdutos(filtered)
    }

    return {
        produtos,
        produtoInput,
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
        setProdutoInput,
        filterByCategory
    }
}