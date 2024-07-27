import axios from 'axios'

// Set the base URL for Axios
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/' // In production, the API might be at /api/
    : 'http://localhost:3030/api/' // In development, your backend might be running on port 3030

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // Include credentials in cross-site Access-Control requests
})

export const httpService = {
    get(endpoint, params) {
        return instance.get(endpoint, { params })
            .then(res => res.data)
            .catch(handleError)
    },
    post(endpoint, data) {
        return instance.post(endpoint, data)
            .then(res => res.data)
            .catch(handleError)
    },
    put(endpoint, data) {
        return instance.put(endpoint, data)
            .then(res => res.data)
            .catch(handleError)
    },
    delete(endpoint) {
        return instance.delete(endpoint)
            .then(res => res.data)
            .catch(handleError)
    }
}

function handleError(error) {
    console.error('HTTP Error:', error.response)
    throw error.response || error.message
}
