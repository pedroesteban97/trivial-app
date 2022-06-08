import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './styles/styles.css'
import PreguntasClasicoInicio from './paginas/PreguntasClasicoInicio';
import PreguntasClasico from './paginas/PreguntasClasico';
import PreguntasContrarreloj from './paginas/PreguntasContrarreloj';
import PreguntasContrarrelojInicio from './paginas/PreguntasContrarrelojInicio';
import PuntuacionFinal from './paginas/PuntuacionFinal';
import { Error } from "./paginas/Error";
import MaximasPuntuaciones from "./paginas/MaximasPuntuaciones";
import PuntuacionFinalContrarreloj from "./paginas/PuntuacionFinalContrarreloj";
import Inicio from "./paginas/Inicio";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/"element={<Inicio />} />
        <Route exact path="/preguntasclasicoinicio"element={<PreguntasClasicoInicio />} />
        <Route exact path="/preguntasclasico" element={<PreguntasClasico />} />
        <Route exact path="/preguntascontrarrelojinicio" element={<PreguntasContrarrelojInicio />} />
        <Route exact path="/preguntascontrarreloj" element={<PreguntasContrarreloj />} />
        <Route exact path="/puntuacionfinal" element={<PuntuacionFinal />} />
        <Route exact path="/puntuacionfinalcontrarreloj" element={<PuntuacionFinalContrarreloj />} />
        <Route exact path="/maximaspuntuaciones" element={<MaximasPuntuaciones />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}


export default App;


