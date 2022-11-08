import { useState } from 'react'

import { APICreate, APIDelete, APIGetPagination, APIGet, APIGetOne, APIUpdate } from '../api'
import { APIReportAnimal } from '../api/reports'
import { randomRGBColor } from '../global/utils/Color'

import { IAnimal, IAnimalInfo } from '../interfaces/animal'

export const defaultAnimal: IAnimal = {
    idanimal: undefined,
    idraca: undefined,
    idcliente: undefined,
    nome: "",
    datanascimento: "",
    cor: "",
    foto: "",
    genero: "M",
}

export function useAnimal() {
    const [animals, setAnimals] = useState<IAnimal[]>([])
    const [animalInput, setAnimalInput] = useState<IAnimal>(defaultAnimal)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [selecteds, setSelecteds] = useState<string[]>([])
    const [animalsTemp, setAnimalsTemp] = useState<IAnimal[]>([])

    const [reportData, setReportData] = useState<any>()

    async function generateAnimalReport() {
        setIsLoading(true)

        try {
            const result = await APIReportAnimal()
            if (result.status !== 200) { return }
            const data = result.data as IAnimalInfo[]

            const labels: string[] = []
            const datas: number[] = []
            const backgrounds: string[] = []
            const datasets: any[] = [];

            data.forEach((item) => {
                const color = randomRGBColor()

                labels.push(item.nome)
                backgrounds.push(`rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.75)`)
                datas.push(item.quantidade_animais)
            })

            datasets.push({
                label: '# de animais',
                data: datas,
                backgroundColor: backgrounds,
                borderWidth: 1
            })

            setReportData({
                labels,
                datasets
            })
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function get() {
        setIsLoading(true)

        try {
            const result = await APIGet('/animal')
            if (result.status === 200) {
                const data = result.data as IAnimal[]
                setAnimals(data)
                setAnimalsTemp(data)

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

            const result = await APIGetOne(id, '/animal')
            if (result.status === 200) {
                setAnimalInput(result.data as IAnimal)
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function getPagination(start: number, end: number) {
        setIsLoading(true)

        try {
            const result = await APIGetPagination(start, end, '/animal')
            if (result.status === 200) {
                const data = result.data as IAnimal[]
                setAnimals(data)
                setAnimalsTemp(data)
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
            const result = await APICreate(animalInput, '/animal')
            if (result.status !== 200) return;

            setAnimals([result.data, ...animals,])
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function update(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await APIUpdate(animalInput, '/animal')
            if (result.status !== 200) return;

            const index = animals.findIndex((value) => value.idanimal == animalInput.idanimal)
            animals[index] = animalInput
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteOne(id: string | undefined) {
        setIsLoading(true)

        try {
            if (!id) return;

            const result = await APIDelete(id, '/animal')
            if (result.status !== 200) return;

            setAnimals((value) => value.filter((item) => item.idanimal !== id))
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    async function deleteAll() {
        setIsLoading(true)

        try {
            for (const id of selecteds) {
                const result = await APIDelete(id, '/animal')
                if (result.status !== 200) return;

                setAnimals((value) => value.filter((item) => item.idanimal !== id))
            }
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    function checkAll() {
        if (animals.length === selecteds.length) {
            setSelecteds([])
            return
        }
        setSelecteds((_) => [])
        for (const obj of animals) {
            setSelecteds((value) => [...value, obj.idanimal as string])
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
            setAnimals(animalsTemp)
            return
        }

        const filtered = animalsTemp.filter((value) =>
            value.nome.toLowerCase().includes(text.toLowerCase())
        )

        setAnimals(filtered)
    }

    return {
        animals,
        animalInput,
        isLoading,
        pages,
        page,
        selecteds,
        reportData,
        generateAnimalReport,
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
        setAnimalInput
    }
}