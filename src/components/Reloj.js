
import React, { useEffect, useRef, useTransition } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";


const Reloj = () => {

    const Ref = useRef(null);
    const navigate = useNavigate();
    const [timer, setTimer] = useState('00:00:00');


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        return {
            total, seconds
        };
    }
    const startTimer = (e) => {
        let { total, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (seconds > 9 ? seconds : '0' + seconds)
            )
        }
        if (total < 0) {
            navigate("/puntuacionfinalcontrarreloj");
          }
    }

    const clearTimer = (e) => {
  
        setTimer('60');

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);


    return (
        <div className="reloj">
            <h2> <AiOutlineClockCircle/> Tiempo Restante:  <b>{timer} segundos</b></h2>
        </div>
    )
}

export default Reloj;