import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAmountChange, handleScoreChange } from '../redux/actions';
import { GrScorecard } from "react-icons/gr";
import '../styles/styles.css';

const Inicio = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModoClasico = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate("/preguntasclasicoinicio");
  };

  const handleModoContrarreloj = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate("/preguntascontrarrelojinicio");
  };

  const handlePuntuaciones = () => {
    navigate("/maximaspuntuaciones");
  };

  return (
    <div className="inicio">
      <abbr title="PUNTUACIONES"><GrScorecard className='iconotabla' onClick={handlePuntuaciones}/></abbr>
      <h1 className="tituloportada"><b>TRIVIAL APP</b></h1>
      <hr />
      <div className="paginainicio mt-4">
        <p>Bienvenido a <b>TRIVIAL APP</b> </p>
        <p>Elige el modo de juego que más te guste: </p>
        <button onClick={handleModoClasico} className="boton_personalizadoinicio">Modo Clasico</button>
        <button onClick={handleModoContrarreloj} className="boton_personalizadoinicio">Modo Contrarreloj</button>
      </div>
    </div>
  )
}

export default Inicio;