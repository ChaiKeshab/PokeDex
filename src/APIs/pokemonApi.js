import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const getPokemonAPI = async () => {

    try {
        const url = `${baseURL}/pokemon`
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const getSpecificPokemonAPI = async (url) => {

    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return error
    }
}