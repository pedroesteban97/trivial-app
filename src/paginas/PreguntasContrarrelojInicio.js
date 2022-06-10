import React from 'react'
import '../styles/styles.css'
import { useNavigate } from "react-router-dom";
import useAxios from '../hooks/useAxios';
import { CircularProgress, Typography } from '@mui/material';
import Reloj from '../components/Reloj';
import { handleAmountChange, handleScoreChange } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';


const PreguntasContrarrelojInicio = () => {

  
  const dispatch = useDispatch();
  const {loading} = useAxios({url: "/api_category.php" });
  const navigate = useNavigate()

  if(loading) {
    return (
      <div className='cargando'>
        <CircularProgress />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate("/preguntascontrarreloj");

  };

  const handleVolverInicio= (e) => {
    e.preventDefault();
    navigate("/");
  };

  
  return (
      <div className="iniciocontrarreloj">
        <abbr title="Inicio"><BiArrowBack className='iconovolver' onClick={handleVolverInicio}/></abbr>
        <h1 className="tituloportada"><b>Modo Contrarreloj</b></h1>
        <hr/>
        
        <form onSubmit={handleSubmit}>
          <div className="modocontrarreloj">
              <p>Ponte a prueba con el modo contrarreloj.</p>
              <p>¿Cuántas preguntas eres capaz de responder en 1 minuto?</p>
              <p>(En este modo de juego aparecerán preguntas de todas las categorías)</p>
          </div>
          <div className='text-center'>
          <button className="btn boton_personalizadoinicio" type="submit">Comenzar</button>
          </div>
        </form>
      </div>
  )
}

export default PreguntasContrarrelojInicio;