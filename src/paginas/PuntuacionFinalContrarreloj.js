import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const PuntuacionContrarreloj = () => {


  const { score } = useSelector(state => state);
  const { cantidadPreguntas } = useSelector(state => state);
  const [questionIndex, setQuestionIndex] = useState(0);
  
  
  return (
    <div className='container puntuacion_final'>
      <p className='animate__animated animate__pulse titulopuntosfinal'>¡Has finalizado la partida!</p>
      <hr />
      <div className='mt-5 estadisticas'>
      <h2>Estadísticas Modo Contrarreloj</h2>
      <hr />
      <p>Puntuacion Obtenida: <b>{score} Puntos</b></p>
      </div>
      <br/>
      <a href='/'><button className="btn botonpuntuacionfinal" >Volver a Inicio</button></a>
    </div>
  )
};

export default PuntuacionContrarreloj;