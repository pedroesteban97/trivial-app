import React from 'react'
import SeleccionaOpcion from '../components/SeleccionaOpcion';
import '../styles/styles.css'
import { useNavigate } from "react-router-dom";
import NumeroPreguntas from '../components/NumeroPreguntas';
import useAxios from '../hooks/useAxios';
import { CircularProgress, Typography } from '@mui/material';
import { GrScorecard } from "react-icons/gr";
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Opciones = () => {

  const { response, error, loading} = useAxios({url: "/api_category.php" });
  const navigate = useNavigate();
  const {
    cantidadPreguntas,  
  } = useSelector((state) => state);

  if(loading) {
    return (
      <div className='cargando'>
        <CircularProgress />
      </div>
    );
  }

  const OpcionesDificultad = [
    {id: "easy", name: "Fácil" },
    {id: "medium", name: "Media" },
    {id: "hard", name: "Difícil" },
  ];

  const OpcionesTipo = [
    {id: "boolean", name: "Verdadero/Falso" },
    {id: "multiple", name: "Eleccion Multiple" }, 
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cantidadPreguntas === undefined || cantidadPreguntas < 1 || cantidadPreguntas > 50) {
      Swal.fire({
        icon: 'error',
        title: 'Número de preguntas ngito válido',
        text: 'El número de preguntas debe ser entre 1 y 50',
        showConfirmButton: false,
        timer: 2000,
      })
    } else {
      navigate("/preguntasclasico");
    }
  };

  const handleVolverInicio = () => {
    navigate("/");
  };

  const handlePuntuaciones = () => {
    navigate("/maximaspuntuaciones");
  };

  
  return (
      <div className="inicioclasico">
        <abbr title="PUNTUACIONES"><GrScorecard className='iconotabla' onClick={handlePuntuaciones} /></abbr>
        <h1 className="tituloportada"><b>Modo clásico</b></h1>
        <hr/>
        <form onSubmit={handleSubmit}>
          <SeleccionaOpcion opciones={response.trivia_categories} label="Categoria" />
          <SeleccionaOpcion opciones={OpcionesDificultad} label="Dificultad" />
          <SeleccionaOpcion opciones={OpcionesTipo} label="Tipo" />
          <NumeroPreguntas />
          <div className="text-center">
          <button className="btn boton_personalizadoinicio mt-4" type="submit">Comenzar</button>
          <button onClick={handleVolverInicio} className="btn boton_personalizadoinicio" >Volver a Inicio</button>
          </div>
        </form>
      </div>
  )
}
export default Opciones;

