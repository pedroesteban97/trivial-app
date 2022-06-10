import React, { useState, useEffect } from 'react'
import useAxios from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { GrScorecard } from "react-icons/gr";
import Swal from 'sweetalert2';
import { BiArrowBack } from 'react-icons/bi';


const MaximasPuntuaciones = () => {

  const [puntos, setPuntos] = useState([]);

  const getData = () => {
    let traePuntos = localStorage.getItem('puntos');
    return JSON.parse(traePuntos);
  }

  useEffect(() => {
    setPuntos(getData());
  }, []);

  const { loading } = useAxios({ url: "/maximaspuntuaciones" });
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className='cargando'>
        <CircularProgress />
      </div>
    );
  }

  if (puntos === null) {
    Swal.fire({
      icon: 'info',
      title: 'No hay puntuaciones disponibles',
      text: 'Se el primero en guardar una puntuación',
      showDenyButton: false,
      confirmButtonText: 'VOLVER A INICIO',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        window.location.replace('');
      }
    })
  }

  const handleClickVolver = (e) => {
    e.preventDefault();
    navigate("/");

  };

  return (
    <div className="inicio">
       <abbr title="Inicio"><BiArrowBack className='iconovolver' onClick={handleClickVolver}/></abbr>
      <h1 className="titulomaxpuntuaciones"><b>Puntuaciones Modo Clasico</b></h1>
      <hr />
      <br/>
      <table className="table tablamax">
        <thead>
          <tr>
            <th><GrScorecard/></th>
            <th scope="col">Nombre</th>
            <th scope="col">Preguntas Respondidas</th>
            <th scope="col">Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{puntos.map(punto => <p>{punto.posicion}</p>)}</td>
            <td>{puntos.map(punto => <p>{punto.nombre}</p>)}</td>
            <td>{puntos.map(punto => <p>{punto.numeropreguntas}</p>)}</td>
            <td>{puntos.map(punto => <p>{punto.puntuacion}</p>)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MaximasPuntuaciones;