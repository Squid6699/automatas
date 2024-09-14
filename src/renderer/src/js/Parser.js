import { getTokenParser } from "./tablaParser";

export function obtenerParser(palabras){
    var found = false;

    // VALIDAR PRIMEROS TOKENS SEA { B }
    if (palabras.length >= 3) {
        if (getTokenParser(palabras[0]) === 1){ //B
            if (getTokenParser(palabras[1]) === 2){ //{
                if (getTokenParser(palabras[palabras.length - 1]) === 3) { //}











                }else{
                    alert("NO SE HA PODIDO INICIAR EL PROGRAMA");
                    return;
                }
            }else{
                alert("NO SE HA PODIDO INICIAR EL PROGRAMA");
                return;
            }

        }else{
            alert("NO SE HA PODIDO INICIAR EL PROGRAMA");
            return;
        }
    }else{
        alert("NO SE HA PODIDO INICIAR EL PROGRAMA");
        return;
    }

    return found;
}