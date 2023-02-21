import httpClient from 'core/utils/service'

export const getList = async (schemas: string, params: any) => {
  const response = await httpClient.get(`${schemas}`, { params })
  return response.data.response.results
}

export const getListInfinite = async (schemas: string, params: any) => {
  const response = await httpClient.get(`${schemas}`, { params })
  return response.data.response
}

export const getByID = async (schemas: string, params: any) => {
  const response = await httpClient.get(`${schemas}`, { params })
  return response.data.response.content
}
