import Botones from "./components/Botones"
import Consola from "./components/Consola"
import Entrada from "./components/Entrada"
import Parser from "./components/Parser"
import Scanner from "./components/Scanner"
import Semantico from "./components/Semantico"


function App() {

  return (
    <>
      <header>
        <Botones/>
      </header>
      
      <section className="container">
        <section className="containerApp">
          <div id="programa">
            <Entrada/>
          </div>

          <div id = "scanner">
            <Scanner/>
          </div>

          <div id = "parserSemantico">
            <Parser/>
            <Semantico/>
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

