import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const InputPuntuacion = () => {
    const navigate = useNavigate();
    const { score } = useSelector(state => state);
    const { cantidadPreguntas } = useSelector(state => state);
    const [nombre, setNombre] = useState('')
    let posicion = "➜";

    function saveall() {

        let puntos = JSON.parse(localStorage.getItem('puntos') || "[]")
        let punto = {
            nombre: nombre,
            puntuacion: score,
            numeropreguntas: cantidadPreguntas,
            posicion: posicion,
        }

        if (nombre.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'DEBES ESCRIBIR UN NOMBRE',
                showConfirmButton: false,
                timer: 2500
            })
            return false;
        } else if (nombre.length > 15) {
            Swal.fire({
                icon: 'warning',
                title: 'ELIGE UN NOMBRE MÁS CORTO',
                showConfirmButton: false,
                timer: 2500
            })
            return false;
        };

        puntos.push(punto)
        localStorage.setItem('puntos', JSON.stringify(puntos))
        navigate("/maximaspuntuaciones");

    }

    return (
        <div className='guardapuntuacion'>
            <p>¿Quieres guardar tu puntuacion?</p>
            <input
                className='guardapuntosinput'
                onChange={(e) => { setNombre(e.target.value) }}
                value={nombre}
                placeholder='Ingresa tu nombre:'
            />
            <button type='submit' className='btn btn_guardapuntos' onClick={saveall}>Guardar</button>
        </div>
    )
}

export default InputPuntuacion;


































/* 

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const InputPuntuacion = props => {

    const navigate = useNavigate();
    const { score } = useSelector(state => state);
    const [nuevaPuntuacion, setNuevaPuntuacion] = useState('')

    const updateNuevaPuntuacionValor = e => setNuevaPuntuacion(e.target.value);

    const creaNuevaPuntuacion = () => {
        console.log(nuevaPuntuacion + ": " +score+ " puntos");
        props.callback(nuevaPuntuacion);
        setNuevaPuntuacion('')
        navigate("/maximaspuntuaciones");
    }

    return (
        <div className='guardapuntosinput'>
            <p>Escribe tu nombre para guardar la puntuación: </p>
            <input
                type="text"
                className="form-control"
                value={nuevaPuntuacion}
                onChange={updateNuevaPuntuacionValor}
            />
            
            <button className='btn btn-primary mt-1' onClick={creaNuevaPuntuacion}>
                Add
            </button>

        </div>
    )
} */