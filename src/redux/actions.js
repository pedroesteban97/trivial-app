
import {
    CambiarCategoria,
    CambiarDificultad,
    CambiarCantidadPreguntas,
    CambiarTipo,
    CambiarScore

} from './actionsType'

export const handleCategoryChange = payload => ({
    type: CambiarCategoria,
    payload,
});

export const handleDifficultyChange = payload => ({
    type: CambiarDificultad,
    payload,
});

export const handleAmountChange = payload => ({
    type: CambiarCantidadPreguntas,
    payload,
});

export const handleTypeChange = payload => ({
    type: CambiarTipo,
    payload,
});

export const handleScoreChange = payload => ({
    type: CambiarScore,
    payload,
});
