import { addVariable, vaciarSet, variableExistente } from "./Set";
import { getTokenParser } from "./tablaParser";

export function obtenerSemantico(palabras){
    vaciarSet();
    var semantico = false;

    for (var i = 2; i < palabras.length-1;i++) {

        //VALIDAR QUE NO SE REPITAN VARIABLES
        if (getTokenParser(palabras[i]) == 4){ // $
            var variable = palabras[i + 1]; // Sacar el siguiente token despues del $
            if (variableExistente(variable)){
                console.log(variable + " ya se encuentra definida");
                semantico = false;
                break;
            }else{
                semantico = true;
                addVariable(variable);
            }
        }

        // VALIDAR QUE UNA VARIABLE ESTA DEFINIDA
        if (getTokenParser(palabras[i]) == 5) { // ID
            if (i > 0 && getTokenParser(palabras[i - 1]) != 4) { // $
                var variable = palabras[i]; // Se guarda el token que no tiene $ antes.
                if (!variableExistente(variable)) {
                    console.log(variable+" no esta definida");
                    semantico = false;
                    break;
                }else{
                    semantico = true;
                }
            }
        }

        // VALIDAR QUE NO SE USAN PR COMO ID
    }
    
    return semantico;
}