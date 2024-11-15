import { useState } from "react"
import Botones from "./components/Botones"
import Consola from "./components/Consola"
import Entrada from "./components/Entrada"
import Parser from "./components/Parser"
import Scanner from "./components/Scanner"
import Semantico from "./components/Semantico"
import { obtenerTokens } from "./js/Scanner"
import { obtenerParser } from "./js/Parser"
import { obtenerSemantico } from "./js/Semantico"
import { borrarErrores, obtenerErrores } from "./js/functions"
import Intermedio from "./components/Intermedio"
import { obtenerCodigoIntermedio } from "./js/CodigoIntermedio"
import Binario from "./components/Binario"

function App() {
  const [txt, setTxt] = useState("");
  const [listaTokens, setListaTokens] = useState([]);
  const [parser, setParser] = useState("");
  const [semantico, setSemantico] = useState("");
  const [consola, setConsola] = useState("");
  const [codigoIntermedio, setCodigoIntermedio] = useState("");
  const [codigoBinario, setCodigoBinario] = useState("");

  const regex = /"([^"]+)"|([^\s"]+)|(")/g;
  const palabras = [];

  let match;  
  while ((match = regex.exec(txt)) !== null) {
    if (match[1]) {
      // Si es contenido entre comillas
      palabras.push('"');
      palabras.push(match[1].trim());
      palabras.push('"');
    } else if (match[2]) {
      // Si es una palabra fuera de comillas
      palabras.push(match[2]);
    } else if (match[3]) {
      // Si es una comilla suelta
      palabras.push(match[3]);
    }
  }

  const clickScan = () => {
    setListaTokens(obtenerTokens(palabras));
  }

  const clickParser = () => {
    if (obtenerParser(palabras)){
      setParser(true);
    }else{
      setParser(false);
    }
    setConsola(obtenerErrores());
  }

  const clickSemantico = () => {
    if (obtenerSemantico(palabras, parser)){
      setSemantico(true);
    }else{
      setSemantico(false);
    }
    setConsola(obtenerErrores());
  }

  const clickIntermedio = () => {
    setCodigoIntermedio(obtenerCodigoIntermedio());
  }

  const clickBinario = () => {
    console.log("TRADUICCION A BINARIO")
  }

  const handleOnChangePalabras = (e) => {
    setTxt(e.target.value);
  }

  const clickBorrar = () => {
    // setTxt("");
    setListaTokens([]);
    setParser("");
    setSemantico("");
    setConsola("");
    setCodigoIntermedio("");
    borrarErrores();
  }


  return (
    <>
      <header>
        <Botones clickScan = {clickScan} clickParser = {clickParser} clickSemantico = {clickSemantico} clickIntermedio={clickIntermedio} clickBorrar = {clickBorrar} txt = {txt} setTxt = {setTxt} clickBinario={clickBinario} />
      </header>
      
      <section className="container">
        <section className="containerApp">

          <div id="programa">
            <Entrada onChange = {handleOnChangePalabras} txt = {txt}/>
          </div>

          <div id = "scanner">
            <Scanner listaTokens = {listaTokens}/>
          </div>

          <div id = "parserSemantico">
            <Parser parser = {parser}/>
            <Semantico semantico={semantico}/>
          </div>

          <div id="codigoIntermedio">
            <Intermedio codigoIntermedio={codigoIntermedio}/>
          </div>

          <div id="codigoBinario">
            <Binario codigoBinario={codigoBinario}/>
          </div>

          <div id="consola">
            <Consola consola = {consola}/>
          </div>
        </section>
      </section>
      
    </>
  )
}

export default App

