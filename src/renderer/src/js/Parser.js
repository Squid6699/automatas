import { obtenerAsignacion, obtenerLeer, obtenerOut, obtenerReemplazoAsignacion, obtenerSi } from "./functions";
import { getTokenParser } from "./tablaParser";

export function obtenerParser(palabras){
    var found = false;

    // VALIDAR PRIMEROS TOKENS SEA { B }
    if (palabras.length >= 3) {
        if (getTokenParser(palabras[0]) === 1){ //B
            if (getTokenParser(palabras[1]) === 2){ //{
                if (getTokenParser(palabras[palabras.length - 1]) === 3) { //}

                    for (let i = 2; i < palabras.length-1;i++) {
                        // console.log(palabras[i]);
                        if (getTokenParser(palabras[i]) != 4 && getTokenParser(palabras[i]) != 5 && getTokenParser(palabras[i]) != 22 && getTokenParser(palabras[i]) != 19 && getTokenParser(palabras[i]) != 23){
                            found = false;
                            break;
                        }

                        // $ ID = ARIT Ó $ ID ;
                        if (getTokenParser(palabras[i]) == 4){ // $
                            var newPos = obtenerAsignacion(palabras, i);
                            if (newPos > 0){
                                i += newPos;
                                found = true;
                            }else{
                                found = false;
                                break;
                            }
                        }

                        // // ID = ARIT ;
                        if (getTokenParser(palabras[i]) == 5){ // ID
                            var newPos = obtenerReemplazoAsignacion(palabras, i);
                            if (newPos > 0){
                                i += newPos;
                                found = true;
                            }else{
                                found = false;
                                break;
                            }
                        } 

                        //LEER ( id ) ;
                        if (getTokenParser(palabras[i]) == 22 ){ //LEER
                            var newPos = obtenerLeer(palabras, i);
                            if (newPos > 0){
                                i += newPos;
                                found = true;
                            }else{
                                found = false;
                                break;
                            }
                        }

                        //OUT ( id );
                        if (getTokenParser(palabras[i]) == 19 ){ //OUT
                            var newPos = obtenerOut(palabras, i);
                            if (newPos > 0){
                                i += newPos;
                                found = true;
                            }else{
                                found = false;
                                break;
                            }
                        }

                        // SI cond : Asig | Leer | Out sino Asig | Leer | Out finsi
                        if (getTokenParser(palabras[i]) == 23){
                            var newPos = obtenerSi(palabras, i);
                            if (newPos > 0){
                                i = newPos;
                                found = true;
                            }else{
                                found = false;
                                break;
                            }
                        }

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
    }else{
        alert("NO SE HA PODIDO INICIAR EL PROGRAMA");
        return;
    }

    return found;
}