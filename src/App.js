import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {

  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  const [ consultar, guardarConsultar ] = useState(false);
  const [ resultado, setResultado ] = useState({});
  const [ error, setError ] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const ConsultarApi = async () => {
      if(consultar){
        const appId = '871d7a43b7bfc4f5c430e0f1d8e6960c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        guardarConsultar(false);

        if(resultado.cod === '404'){
          setError(true);
        }else{
          setError(false);
        }
      }
    }
    ConsultarApi();
    // eslint-disable-next-line
  }, [consultar])

  let componente
  if(error){
    componente = <Error message="No hay resultados"/>
  }else{
    componente = <Clima 
                  resultado={resultado}    
                />
  }
  

  return (
    <Fragment>
        <Header
          titulo="Clima React App"
        />
        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario 
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}
                />
              </div>
              <div className="col m6 s12">
                {componente}
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
