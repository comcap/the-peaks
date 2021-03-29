import { AxiosRequestConfig } from 'axios'
import httpClient from 'core/utils/service'

export const getList = async (schemas: String, params: any) => {
  try {
    const response = await httpClient.get(`${schemas}`, { params })

    if (response.status === 200 || response.status === 201) {
      return response.data.response.results
    }
  } catch (err) {
    return []
  }
}
