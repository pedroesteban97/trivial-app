import React, { useEffect, useRef, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { BiExit } from 'react-icons/bi';
import '../styles/styles.css'
import Swal from 'sweetalert2';

import { handleScoreChange } from '../redux/actions';
import { decode } from 'html-entities';
import Reloj from '../components/Reloj';


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const PreguntasContrarreloj = () => {
  const {
    cantidadPreguntas,
    score,
  } = useSelector((state) => state);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${cantidadPreguntas}`;




  const { response, loading } = useAxios({ url: apiUrl });
  const [preguntaIndice, setPreguntaIndice] = useState(0);
  const [opciones, setOpciones] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {

    if (response?.results.length) {
      const question = response.results[preguntaIndice];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOpciones(answers);
    }
  }, [response, preguntaIndice]);

  if (loading) {
    return (
      <div className='cargando'>
        <CircularProgress />
      </div>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[preguntaIndice];
    setDisable(true);
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 10));
      e.target.classList.add("correcto");
    } else {
      e.target.classList.add("incorrecto");
    };

      setTimeout(() => {
        if (preguntaIndice + 1 < response.results.length) {
          setDisable(false);
          setPreguntaIndice(preguntaIndice + 1)
          e.target.classList.remove("correcto");
          e.target.classList.remove("incorrecto");
        } else {
          navigate("/puntuacionfinalcontrarreloj");
        }
      }, 1100);

  };

  const handleClickSalir = (e) => {
    Swal.fire({
      icon: 'question',
      title: '¿Quieres abandonar la partida?',
      text: 'Perderás la puntuación conseguida hasta ahora',
      showDenyButton: true,
      denyButtonText: `NO`,
      confirmButtonText: 'SI',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        window.location.replace('');
      } 
    })
  }

  return (
    <div className='container preguntas'>
      <h1>Pregunta {preguntaIndice + 1}</h1>
      <h4 className='iconoexit'><BiExit onClick={handleClickSalir} /></h4>
      <hr />
      <div>
        <Reloj />
      </div>
      <p>
        <b>{decode(response.results[preguntaIndice].question)}</b>
      </p>

      {opciones.map((data, id) => (
        <div key={id}>
          <button disabled={disable} onClick={handleClickAnswer} className="my-2 botonrespuestas">{decode(data)}</button>
        </div>
      ))}

      <p>Pregunta {preguntaIndice + 1} / {response.results.length}</p>

      <p className='mt-5'>PUNTOS TOTALES: <b>{score}</b></p>
    </div>
  )
}

export default PreguntasContrarreloj;