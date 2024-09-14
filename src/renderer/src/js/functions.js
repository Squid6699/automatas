import { getTokenParser } from "./tablaParser";

export function esId(token){
    var regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    return regex.test(token);
}

export function esNumero(token){
    var regex = /^-?\d+(\.\d+)?$/;
    return regex.test(token);
}

function expresionValido(palabras, pos){
    const EXPRESION_REGULAR = /\b[a-zA-Z0-9]+\s+([-+*]|\/)\s+[a-zA-Z0-9]+(?:\s+([-+*]|\/)\s+[a-zA-Z0-9]+)*\s+;/;
    const EXPRESION_REGULAR2 = /\s*[0-9]+\s*\/\s*[0-9]+\s*;/;

    var nuevaConcatenacion = "";
    var newPos = 0;
    for (var i = pos; i < palabras.length; i++) {
        if (getTokenParser(palabras[i]) == 7){ // ;
            nuevaConcatenacion += " " + palabras[i];
            newPos++;
            break;
        }else{
            nuevaConcatenacion += " " + palabras[i];
            newPos++;
        }
    }

    var concatenacion = nuevaConcatenacion.trim();
    if (EXPRESION_REGULAR.test(concatenacion) || EXPRESION_REGULAR2.test(concatenacion)) {
        return newPos;
    }

    return 0;

}

function vlbValida(palabras, pos){
    const EXPRESION_REGULAR = /\(\s+[a-zA-Z]+\d*\s*\)\s+;/;

    var nuevaConcatenacion = "";
    
    for (var i = pos; i < palabras.length; i++) {
        if (getTokenParser(palabras[i]) == 21) { //)
            if (i+1 < palabras.length && getTokenParser(palabras[i + 1]) == 7) { //;
                nuevaConcatenacion += " " + palabras[i] + " " + palabras[i + 1];
                break;
            }
        } else {
            nuevaConcatenacion += " " + palabras[i];
        }
    }
    
    var concatenacion = nuevaConcatenacion.trim();
    if (EXPRESION_REGULAR.test(concatenacion)) {
        return 4;
    }

    return 0;
}

export function obtenerOut(palabras, pos){
    if (pos+1 < palabras.length && getTokenParser(palabras[pos + 1]) == 20) { // (
        var newPos = vlbValida(palabras, pos+1);
        if (newPos > 0){
            return newPos;
        }else{
            console.log("ERROR EN ID CERCA DE: "+ palabras[pos + 1]);
        }
    }else{
        console.log("SIN ( DESPUES DEL OUT");
    }
    return 0;
}

export function obtenerAsignacion(palabras, pos){
    if (pos + 1 < palabras.length && getTokenParser(palabras[pos + 1]) == 5){ // ID

        // PARA VALIDAR QUE HAYA UN ; SIN IGUAL Y QUE SEA UNA ASIGNACION VACIA
        if (pos + 2 < palabras.length && getTokenParser(palabras[pos + 2]) == 7) { // ;
            var newPos = 2 ;
            return newPos;
        }

        // SI NO ES VACIA ENTONCES SERA UNA ASIGNACION
        if (pos + 2 < palabras.length && getTokenParser(palabras[pos + 2]) == 17){ // =
            if (pos + 3 < palabras.length){
                var newPos = expresionValido(palabras, pos + 3);
                if (newPos > 0){
                    return newPos + 2;
                }else{
                    console.log("ERROR EN ARIT CERCA DE: " + palabras[pos + 3]);
                }
                
            }
        }else{
            console.log("ERROR CERCA DE: " + palabras[pos + 2]);
        }
    }else{
        console.log("ERROR EN ID DE: " + palabras[pos + 1]);
    }
    return 0;
}

export function obtenerReemplazoAsignacion(palabras, pos){
    if (pos + 1 < palabras.length && getTokenParser(palabras[pos + 1]) == 17){ // =
        if (pos + 2 < palabras.length){
            var newPos = expresionValido(palabras, pos + 2);
            if (newPos > 0){
                return newPos + 1;
            }else{
                console.log("ERROR EN ARIT CERCA DE: " + palabras[pos + 2]);
            }
        }
    }else{
        console.log("ERROR FALTA = CERCA DE: " + palabras[pos + 1]);
    }

    return 0;
}

export function obtenerLeer(palabras, pos){
    if (pos+1 < palabras.length && getTokenParser(palabras[pos + 1]) == 20) { // (
        var newPos = vlbValida(palabras, pos+1);
        if (newPos > 0){
            return newPos;
        }else{
            console.log("ERROR EN ID CERCA DE: "+ palabras[pos + 1]);
        }
    }else{
        console.log("SIN ( DESPUES DEL LEER");
    }
    return 0;
}

function condicionValido(palabras, pos){
    const EXPRESION_REGULAR = /\s*[a-zA-Z][\w]*\s*(===|>|<|<=|>=|<>)\s*[a-zA-Z][\w]*\s*\)/;

    var nuevaConcatenacion = "";
    var newPos = 0;
    for (var i = pos; i < palabras.length; i++) {
        if (getTokenParser(palabras[i]) == 21){
            nuevaConcatenacion += " " + palabras[i];
            newPos++;
            break;
        }else{
            nuevaConcatenacion += " " + palabras[i];
            newPos++;
        }
    }

    var concatenacion = nuevaConcatenacion.trim();
    if (EXPRESION_REGULAR.test(concatenacion)) {
        return newPos + 2;
    }

    return 0;
}

export function obtenerSi(palabras, pos){
    var newPosAsig1 = 0;
    var newPosAsig2 = 0;
    if (pos + 1 < palabras.length && getTokenParser(palabras[pos + 1]) == 20 ){ // (
        if (pos + 2 < palabras.length){
            var newPos = condicionValido(palabras, pos + 2); // Condicion
            if (newPos > 0){
                if (pos + newPos < palabras.length && getTokenParser(palabras[pos + newPos]) == 24 ){ // :
                    //VALIDAR PRIMERAS INSTRUCCIONES DENTRO DEL SI
                    for (var i = pos + newPos + 1; i < palabras.length-1; i++) {
                        if (getTokenParser(palabras[i]) == 25){ //SI ENCUENTRA SINO SE ROMPE EL CICLO
                            break;
                        }
                        // $ ID = ARIT Ó $ ID ;
                        if (getTokenParser(palabras[i]) == 4){ // $ EN PRIMER INSTRUCCION DE SI
                            newPosAsig1 = obtenerAsignacion(palabras, i);
                            if (newPosAsig1 > 0){
                                i += newPosAsig1;
                                newPosAsig1 = i;
                            }else{
                                console.log("ERROR DENTRO DE SI");
                                break;
                            }
                        }
                        // ID = ARIT ;
                        if (getTokenParser(palabras[i]) == 5){ // ID
                            newPosAsig1 = obtenerReemplazoAsignacion(palabras, i);
                            if (newPos > 0){
                                i += newPosAsig1;
                                newPosAsig1 = i;
                            }else{
                                console.log("ERROR DENTRO DE SI");
                                break;
                            }
                        } 
                        //LEER ( id ) ;
                        if (getTokenParser(palabras[i]) == 22 ){ //LEER
                            newPosAsig1 = obtenerLeer(palabras, i);
                            if (newPosAsig1 > 0){
                                i += newPosAsig1;
                                newPosAsig1 = i;
                            }else{
                                console.log("ERROR DENTRO DE SI");
                                break;
                            }
                        }
                        //OUT ( id );
                        if (getTokenParser(palabras[i]) == 19 ){ //OUT
                            newPosAsig1 = obtenerOut(palabras, i);
                            if (newPosAsig1 > 0){
                                i += newPosAsig1;
                                newPosAsig1 = i;
                            }else{
                                console.log("ERROR DENTRO DE SI");
                                break;
                            }
                        }
                    }
                    if (newPosAsig1 + 1 < palabras.length && getTokenParser(palabras[newPosAsig1 + 1]) == 25 ){ // SINO
                        for (var i = newPosAsig1 + 1; i < palabras.length-1; i++) {
                            if (getTokenParser(palabras[i]) == 26){ //SI ENCUENTRA SINO SE ROMPE EL CICLO
                                break;
                            }
                            // $ ID = ARIT Ó $ ID ;
                            if (getTokenParser(palabras[i]) == 4){ // $ EN SEGUNDA INSTRUCCION DE SI
                                newPosAsig2 = obtenerAsignacion(palabras, i);
                                if (newPosAsig2 > 0){
                                    i += newPosAsig2;
                                    newPosAsig2 = i;
                                }else{
                                    console.log("ERROR DENTRO DE SI");
                                    break;
                                }
                            }
                            // ID = ARIT ;
                            if (getTokenParser(palabras[i]) == 5){ // ID
                                
                                newPosAsig2 = obtenerReemplazoAsignacion(palabras, i);
                                if (newPosAsig2 > 0){
                                    i += newPosAsig2;
                                    newPosAsig2 = i;
                                }else{
                                    console.log("ERROR DENTRO DE SI");
                                    break;
                                }
                            } 
                            //LEER ( id ) ;
                            if (getTokenParser(palabras[i]) == 22 ){ //LEER
                                newPosAsig2 = obtenerLeer(palabras, i);
                                if (newPosAsig2 > 0){
                                    i += newPosAsig2;
                                    newPosAsig2 = i;
                                }else{
                                    console.log("ERROR DENTRO DE SI");
                                    break;
                                }
                            }
                            //OUT ( id );
                            if (getTokenParser(palabras[i]) == 19 ){ //OUT
                                newPosAsig2 = obtenerOut(palabras, i);
                                if (newPosAsig2 > 0){
                                    i += newPosAsig2;
                                    newPosAsig2 = i;
                                }else{
                                    console.log("ERROR DENTRO DE SI");
                                    break;
                                }
                            }
                        }
                        
                        if (newPosAsig2 + 1 < palabras.length && getTokenParser(palabras[newPosAsig2 + 1]) == 26){ // FINSI
                            return newPosAsig2 + 1;
                        }
                        
                    }
                }else{
                    console.log("FALTA : DESPUES DE LA CONDICION");
                }
            }else{
                console.log("ERROR EN LA CONDICION");
            }
        }
    }
    return 0;
}