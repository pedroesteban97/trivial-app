
import React, { useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from 'react-redux';
import { handleCategoryChange } from "../redux/actions";
import { handleDifficultyChange } from "../redux/actions";
import { handleTypeChange } from "../redux/actions";

const SeleccionaOpcion = (props) => {

    const { label, opciones } = props;
    const dispatch = useDispatch();
    const [value, setValue] = useState(" ");

    const handleChange = (e) => {
        setValue(e.target.value);
        switch (label) {
            case "Categoria":
                dispatch(handleCategoryChange(e.target.value));
                break;
            case "Dificultad":
                dispatch(handleDifficultyChange(e.target.value));
                break;
            case "Tipo":
                dispatch(handleTypeChange(e.target.value));
                break;
            default:
                return;
        }
    };
    return (
        <FormControl fullWidth className="mt-4">
            <InputLabel><b>{label}</b></InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}>
                {opciones.map(({ id, name }) => (
                    <MenuItem value={id} key={id}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SeleccionaOpcion;



