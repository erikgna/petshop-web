import { Line, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

import { useNotaCompra } from '../../hooks/useNotaCompra';
import { useNotaVenda } from '../../hooks/useNotaVenda';
import { useAnimal } from '../../hooks/useAnimal';

import styles from './ReportsDashboard.module.scss'
import { useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

export const ReportsDashboard = () => {
    const notaCompraHook = useNotaCompra()
    const notaVendaHook = useNotaVenda()
    const animalHook = useAnimal()

    const actualDate = () => {
        const date = new Date()
        const initialData = `${date.getFullYear()}-0${date.getMonth()}-01`
        const finalData = `${date.getFullYear()}-${date.getMonth() + 1}-01`

        notaCompraHook.setDataFim(finalData)
        notaVendaHook.setDataFim(finalData)

        notaCompraHook.setDataInicio(initialData)
        notaVendaHook.setDataInicio(initialData)

        return [initialData, finalData]
    }

    useEffect(() => {
        const datas = actualDate()
        notaCompraHook.generateNotaCompraReport(datas[0], datas[1])
        notaVendaHook.generateNotaVendaReport(datas[0], datas[1])
        animalHook.generateAnimalReport()
    }, [])

    return (
        <div className={styles.Reports}>
            <div className={styles.Inputs}>
                <div>
                    <label htmlFor="datainicio">Data inicial</label>
                    <input
                        id="datainicio"
                        name="datainicio"
                        type="date"
                        value={notaCompraHook.dataInicio}
                        onChange={(e) => { notaCompraHook.setDataInicio(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor="datafim">Data final</label>
                    <input
                        id="datafim"
                        name="datafim"
                        type="date"
                        value={notaCompraHook.dataFim}
                        onChange={(e) => { notaCompraHook.setDataFim(e.target.value) }}
                    />
                </div>
                <button onClick={() => notaCompraHook.generateNotaCompraReport()}>Confirmar</button>
                <button onClick={() => {
                    const datas = actualDate()
                    notaCompraHook.generateNotaCompraReport(datas[0], datas[1])
                }}>Redefinir</button>
            </div>

            <h2>Valor total de compras por cada funcionário</h2>
            {notaCompraHook.reportData !== undefined && <div className={styles.Chart}>
                <Line data={notaCompraHook.reportData} />
            </div >}

            <div className={styles.Inputs}>
                <div>
                    <label htmlFor="datainicio">Data inicial</label>
                    <input
                        id="datainicio"
                        name="datainicio"
                        type="date"
                        value={notaVendaHook.dataInicio}
                        onChange={(e) => { notaVendaHook.setDataInicio(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor="datafim">Data final</label>
                    <input
                        id="datafim"
                        name="datafim"
                        type="date"
                        value={notaVendaHook.dataFim}
                        onChange={(e) => { notaVendaHook.setDataFim(e.target.value) }}
                    />
                </div>
                <button onClick={() => notaVendaHook.generateNotaVendaReport()}>Confirmar</button>
                <button onClick={() => {
                    const datas = actualDate()
                    notaVendaHook.generateNotaVendaReport(datas[0], datas[1])
                }}>Redefinir</button>
            </div>

            <h2>Rendimento de cada tipo de serviço por data</h2>
            {notaVendaHook.reportData !== undefined &&
                <div className={styles.Chart}>
                    <Line data={notaVendaHook.reportData} />
                </div >
            }

            <h2>Distribuição de raças atendidas</h2>
            {animalHook.reportData !== undefined &&
                <div className={styles.Doug}>
                    <Doughnut
                        data={animalHook.reportData}
                    />
                </div >}
        </div>
    )
}
