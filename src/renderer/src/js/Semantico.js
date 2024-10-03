import { consolaError, getContenidoVariable } from "./functions";
import { addVariable, getSetVarialbles, vaciarSet, variableExistente } from "./Set";
import { getTokenParser } from "./tablaParser";

export function obtenerSemantico(palabras, parser){
    var semantico = false;

    if (!parser){
        return;
    }

    vaciarSet();

    for (var i = 2; i < palabras.length-1;i++) {

        //VALIDAR QUE NO SE REPITAN VARIABLES
        if (getTokenParser(palabras[i]) == 4){ // $
            var variable = palabras[i + 1]; // Sacar el siguiente token despues del $
            if (variableExistente(variable)){
                consolaError(variable.toUpperCase() + " YA SE ENCUENTRA DEFINIDA");
                semantico = false;
                break;
            }else{
                var contenidoVariable = getContenidoVariable(palabras, i + 2);
                semantico = true;
                addVariable({"id": variable, "contenido": contenidoVariable});
            }
        }

        // VALIDAR QUE UNA VARIABLE ESTA DEFINIDA
        if (getTokenParser(palabras[i]) == 5) { // ID
            if (i > 0 && getTokenParser(palabras[i - 1]) != 4) { // $
                var variable = palabras[i]; // Se guarda el token que no tiene $ antes.
                if (!variableExistente(variable)) {
                    consolaError(variable.toUpperCase() + " NO ESTA DEFINIDA");
                    semantico = false;
                    break;
                }else{
                    semantico = true;
                }
            }
        }

    }
    getSetVarialbles();
    return semantico;
}