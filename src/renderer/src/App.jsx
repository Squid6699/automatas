import { useEffect, useState } from "react"
import Botones from "./components/Botones"
import Consola from "./components/Consola"
import Entrada from "./components/Entrada"
import Parser from "./components/Parser"
import Scanner from "./components/Scanner"
import Semantico from "./components/Semantico"
import { obtenerTokens } from "./js/Scanner"
import { obtenerParser } from "./js/Parser"
import { obtenerSemantico } from "./js/Semantico"

function App() {

  const [txt, setTxt] = useState("");
  const [listaTokens, setListaTokens] = useState([]);
  const [parser, setParser] = useState("");
  const [semantico, setSemantico] = useState("");

  // console.log(listaTokens);
  // console.log(parser);
  // console.log(semantico);




  const clickScan = () => {
    const palabras = txt.trim().split(/\s+/);
    setListaTokens(obtenerTokens(palabras));
  }

  const clickParser = () => {
    const palabras = txt.trim().split(/\s+/);
    if (obtenerParser(palabras)){
      setParser("PROGRAMA OK");
    }else{
      setParser("SINTAX ERROR");
    }
  }

  const clickBorrar = () => {

  }

  const clickSemantico = () => {
    const palabras = txt.trim().split(/\s+/);
    if (obtenerSemantico(palabras)){
      setSemantico("SEMANTICO OK");
    }else{
      setSemantico("ERROR SEMANTICO");
    }
  }

  const handleOnChangePalabras = (e) => {
    setTxt(e.target.value);
  }


  return (
    <>
      <header>
        <Botones clickScan = {clickScan} clickParser = {clickParser} clickSemantico = {clickSemantico} clickBorrar = {clickBorrar}/>
      </header>
      
      <section className="container">
        <section className="containerApp">

          <div id="programa">
            <Entrada onChange = {handleOnChangePalabras}/>
          </div>

          <div id = "scanner">
            <Scanner listaTokens = {listaTokens}/>
          </div>

          <div id = "parserSemantico">
            <Parser parser = {parser}/>
            <Semantico semantico={semantico}/>
          </div>

          <div id="consola">
            <Consola/>
          </div>
        </section>
      </section>
      
    </>
  )
}

export default App

