import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const getPokemonAPI = async (offset = 0, limit = 20) => {

    try {
        const url = `${baseURL}/pokemon?offset=${offset}&limit=${limit}`
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return {
            error: true,
            message: `Failed to fetch data for all pokemon. Please try again later.`,
            originalError: error,
        };
    }
}

export const getSpecificPokemonAPI = async (url) => {

    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return {
            error: true,
            message: `Failed to fetch data for specific pokemon. Please try again later.`,
            originalError: error,
        };
    }
}

export const getGenerationAPI = async (id = 1) => {

    try {
        const url = `${baseURL}/generation/${id}`
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return {
            error: true,
            message: `Failed to fetch data for generation ${id}. Please try again later.`,
            originalError: error,
        };
    }
}

export const getPokeSpeciesAPI = async (name) => {

    try {
        const url = `${baseURL}/pokemon-species/${name}`
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return {
            error: true,
            message: `Failed to fetch data for ${name} species. Please try again later.`,
            originalError: error,
        };
    }
}

export const getSearchPokeAPI = async (name) => {

    try {
        const url = `${baseURL}/pokemon/${name}`
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return {
            error: true,
            message: `Failed to fetch data for search: ${name}. Please enter correct pokemon name/id.`,
            originalError: error,
        };
    }
}