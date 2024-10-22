import { consolaError, getContenidoVariable } from "./functions";
import { addVariable, getVariables, vaciarVariables, variableExistente } from "./Variables";
import { getTokenParser } from "./tablaParser";

export function obtenerSemantico(palabras, parser){
    var semantico = false;

    if (!parser){
        return;
    }

    getVariables();
    vaciarVariables();

    for (var i = 2; i < palabras.length-1;i++) {

        //VALIDAR QUE NO SE REPITAN VARIABLES
        if (getTokenParser(palabras[i]) == 4 || getTokenParser(palabras[i]) == 29 || getTokenParser(palabras[i]) == 28){ // $ Ó # Ó STR
            var tipo = palabras[i];
            var variable = palabras[i + 1]; // Sacar el siguiente token despues del tipo
            if (variableExistente(variable)){
                consolaError(variable.toUpperCase() + " YA SE ENCUENTRA DEFINIDA");
                semantico = false;
                break;
            }else{
                var contenidoVariable = getContenidoVariable(palabras, i + 2);
                semantico = true;
                var bits;
                if (tipo == "str"){
                    bits = 8
                } else if (tipo == "$"){
                    bits = 32
                }else if (tipo == "#"){
                    bits = 16
                }
                addVariable({"tipo": tipo ,"id": variable, "valor": contenidoVariable.trim(), "Bits": bits });
            }
        }


        
        // VALIDAR QUE UNA VARIABLE ESTA DEFINIDA
        if (getTokenParser(palabras[i]) == 5) { // ID
            if (i > 0 && getTokenParser(palabras[i - 1]) != 4 || i > 0 && getTokenParser(palabras[i - 1]) != 29 || i > 0 && getTokenParser(palabras[i - 1]) != 28) { // $ Ó # Ó STR
                var variable = palabras[i]; // Se guarda el token que no tiene tipo antes.
                if (!variableExistente(variable)) {
                    consolaError(variable.toUpperCase() + " NO ESTA DEFINIDA");
                    semantico = false;
                    break;
                }else{
                    semantico = true;
                }
            }
        }

        //IGNORAR EL CONTENIDO DE LA CADENA
        if ( getTokenParser(palabras[i]) == 27){ // "
            if (i + 3 < palabras.length )
            i += 3;
        }
    }

    return semantico;
}