import api from ".";

export const APIReportNotaCompra = (dataInicio: string, dataFim: string) =>
  api.get(`/nota-compra/information/${dataInicio}/${dataFim}`);
export const APIReportNotaVenda = (dataInicio: string, dataFim: string) =>
  api.get(`/nota-venda/information/${dataInicio}/${dataFim}`);
export const APIReportAnimal = () => api.get(`/animal/information`);
