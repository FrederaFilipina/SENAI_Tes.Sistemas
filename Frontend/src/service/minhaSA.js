import axios from "axios"

const minhaSA = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export default minhaSA