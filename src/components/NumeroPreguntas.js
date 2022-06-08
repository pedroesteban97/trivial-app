import React from 'react'
import { FormControl, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { handleAmountChange } from '../redux/actions';

const NumeroPreguntas = () => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(handleAmountChange(e.target.value))
    };

    return (
        <FormControl fullWidth className='mt-4'>
            <TextField
                onChange={handleChange}
                variant="outlined"
                label="Número de preguntas"
                type="number"
                id="demo-simple-select"
            />
        </FormControl>
    )
}
export default NumeroPreguntas;