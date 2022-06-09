import { CambiarCategoria, CambiarCantidadPreguntas, CambiarDificultad, CambiarScore, CambiarTipo } from "./actionsType";

const initialState = {
    categoriaPregunta: "",
    dificultadPregunta: "",
    tipoPregunta: "",
    cantidadPreguntas: "0",
    score: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CambiarCategoria:
            return {
                ...state,
                categoriaPregunta: action.payload,
            };
        case CambiarDificultad:
            return {
                ...state,
                dificultadPregunta: action.payload,
            };
        case CambiarTipo:
            return {
                ...state,
                tipoPregunta: action.payload,
            };
        case CambiarCantidadPreguntas:
            return {
                ...state,
                cantidadPreguntas: action.payload,
            };
        case CambiarScore:
            return {
                ...state,
                score: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;

