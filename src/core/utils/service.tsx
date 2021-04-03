import axios from 'axios'

const httpClient = axios.create({
  baseURL: `https://content.guardianapis.com`,
  timeout: 5000,
  params: {
    'api-key': process.env.REACT_APP_API_KEY,
  },
})

export default httpClient
