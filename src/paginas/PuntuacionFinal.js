
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import InputPuntuacion from '../components/InputPuntuacion';
import { handleAmountChange, handleScoreChange } from '../redux/actions';


const PuntuacionFinal = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score } = useSelector(state => state);
  const { cantidadPreguntas } = useSelector(state => state);

  const handleVolverInicio = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(0));
    navigate("/");
  };


  return (
    <div className='container puntuacion_final'>
      <p className='animate__animated animate__pulse titulopuntosfinal'>¡Has finalizado la partida!</p>
      <hr />
      <div className='mt-5 estadisticas'>
        <h2>Estadísticas Modo Clásico:</h2>
        <hr />
        <p>Has respondido un total de: <b>{cantidadPreguntas} preguntas</b></p>
        <p>Has conseguido una puntuación de: <b>{score} Puntos</b></p>
        <p>Tu porcentaje de acierto es del <b>{((score / 10) / cantidadPreguntas * 100).toFixed(0)}%</b></p>
      </div>
      <br />
      <div className='deseasguardar'>
        <InputPuntuacion />
        <br />
        <button onClick={handleVolverInicio} className="btn botonpuntuacionfinal mt-3" >Volver a Inicio</button>
      </div>
    </div>
  )
};

export default PuntuacionFinal;