//Aqui haremos la llamada axios a la API
import axios from 'axios';
import React, { useEffect, useState } from 'react'

axios.defaults.baseURL = "https://opentdb.com/"

const useAxios = ({ url }) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            axios
                .get(url)
                .then(res => setResponse(res.data))
                .catch(err => setError(err))
                .finally(() => setLoading(false))
    }, [url])

    return { response, error, loading }
}


export default useAxios;