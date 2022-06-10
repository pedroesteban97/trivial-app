
import React, { useEffect, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { BiExit } from 'react-icons/bi';


import { handleScoreChange } from '../redux/actions';
import { decode } from 'html-entities';
import Swal from 'sweetalert2';


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const Preguntas = () => {
  const {
    categoriaPregunta,
    dificultadPregunta,
    tipoPregunta,
    cantidadPreguntas,
    score,
    
  } = useSelector((state) => state);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${cantidadPreguntas}`;

  if (categoriaPregunta) {
    apiUrl = apiUrl.concat(`&category=${categoriaPregunta}`)
  }
  if (dificultadPregunta) {
    apiUrl = apiUrl.concat(`&difficulty=${dificultadPregunta}`)
  }
  if (tipoPregunta) {
    apiUrl = apiUrl.concat(`&type=${tipoPregunta}`)
  }

  

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

  if (response.response_code !== 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Vaya... algo salió mal',
      text: 'Se ha producido un error a la hora de cargar las preguntas. Por favor, inicia una nueva partida',
      showDenyButton: false,
      denyButtonText: `NO`,
      confirmButtonText: 'Volver',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/preguntasclasicoinicio");
        window.location.replace('');
      }
    })
  }

  const handleClickAnswer = (e) => {

    const question = response.results[preguntaIndice];
    setDisable(true);
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 10));
      e.target.classList.add("correcto");
    } else {
      e.target.classList.add("incorrecto");
    }

      setTimeout(() => {
        if (preguntaIndice + 1 < response.results.length) {
          setDisable(false);
          setPreguntaIndice(preguntaIndice + 1);
          e.target.classList.remove("correcto");
          e.target.classList.remove("incorrecto");
        } else {
          navigate("/puntuacionfinal");
        }
      }, 1500);
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
      }
    })
  }

  return (
    <div className='container preguntas'>
      <h1>Pregunta {preguntaIndice + 1}</h1>
      <h4 className='iconoexit'><BiExit onClick={handleClickSalir} /></h4>
      <hr />

      <p>
        <b>{decode(response.results[preguntaIndice].question)}</b>
      </p>

      {opciones.map((data, id) => (
        <div key={id}>
          <button disabled={disable} onClick={handleClickAnswer} className="my-2 botonrespuestas">{decode(data)}</button>
        </div>
      ))}
      <p>Pregunta {preguntaIndice + 1} / {response.results.length} </p>
      <p className='mt-4'>PUNTOS: <b>{score}</b></p>
    </div>
  )
}

export default Preguntas;